/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @namespace The global gadgets namespace
 * @type {Object} 
 */
var gadgets = gadgets || {}; 

/** 
 * @namespace The global shindig namespace, used for shindig specific extensions and data
 * @type {Object} 
 */
var shindig = shindig || {};

/** 
 * @namespace The global osapi namespace, used for opensocial API specific extensions
 * @type {Object} 
 */
var osapi = osapi || {};
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview Provides unified configuration for all features.
 *
 *
 * <p>This is a custom shindig library that has not yet been submitted for
 * standardization. It is designed to make developing of features for the
 * opensocial / gadgets platforms easier and is intended as a supplemental
 * tool to Shindig's standardized feature loading mechanism.
 *
 * <p>Usage:
 * First, you must register a component that needs configuration:
 * <pre>
 *   var config = {
 *     name : gadgets.config.NonEmptyStringValidator,
 *     url : new gadgets.config.RegExValidator(/.+%mySpecialValue%.+/)
 *   };
 *   gadgets.config.register("my-feature", config, myCallback);
 * </pre>
 *
 * <p>This will register a component named "my-feature" that expects input config
 * containing a "name" field with a value that is a non-empty string, and a
 * "url" field with a value that matches the given regular expression.
 *
 * <p>When gadgets.config.init is invoked by the container, it will automatically
 * validate your registered configuration and will throw an exception if
 * the provided configuration does not match what was required.
 *
 * <p>Your callback will be invoked by passing all configuration data passed to
 * gadgets.config.init, which allows you to optionally inspect configuration
 * from other features, if present.
 *
 * <p>Note that the container may optionally bypass configuration validation for
 * performance reasons. This does not mean that you should duplicate validation
 * code, it simply means that validation will likely only be performed in debug
 * builds, and you should assume that production builds always have valid
 * configuration.
 */

/** @namespace */
gadgets.config = function() {
  var components = {};
  var configuration;

  return {
    'register':
    /**
     * Registers a configurable component and its configuration parameters.
     * Multiple callbacks may be registered for a single component if needed.
     *
     * @param {string} component The name of the component to register. Should
     *     be the same as the fully qualified name of the <Require> feature or
     *     the name of a fully qualified javascript object reference
     *     (e.g. "gadgets.io").
     * @param {Object=} opt_validators Mapping of option name to validation
     *     functions that take the form function(data) {return isValid(data);}
     * @param {function(Object)=} opt_callback A function to be invoked when a
     *     configuration is registered. If passed, this function will be invoked
     *     immediately after a call to init has been made. Do not assume that
     *     dependent libraries have been configured until after init is
     *     complete. If you rely on this, it is better to defer calling
     *     dependent libraries until you can be sure that configuration is
     *     complete. Takes the form function(config), where config will be
     *     all registered config data for all components. This allows your
     *     component to read configuration from other components.
     * @member gadgets.config
     * @name register
     * @function
     */
    function(component, opt_validators, opt_callback) {
      var registered = components[component];
      if (!registered) {
        registered = [];
        components[component] = registered;
      }

      registered.push({
        validators: opt_validators || {},
        callback: opt_callback
      });
    },

    'get':
    /**
     * Retrieves configuration data on demand.
     *
     * @param {string=} opt_component The component to fetch. If not provided
     *     all configuration will be returned.
     * @return {Object} The requested configuration, or an empty object if no
     *     configuration has been registered for that component.
     * @member gadgets.config
     * @name get
     * @function
     */
    function(opt_component) {
      if (opt_component) {
        return configuration[opt_component] || {};
      }
      return configuration;
    },

    /**
     * Initializes the configuration.
     *
     * @param {Object} config The full set of configuration data.
     * @param {boolean=} opt_noValidation True if you want to skip validation.
     * @throws {Error} If there is a configuration error.
     * @member gadgets.config
     * @name init 
     * @function
     */
    'init': function(config, opt_noValidation) {
      configuration = config;
      for (var name in components) {
        if (components.hasOwnProperty(name)) {
          var componentList = components[name],
              conf = config[name];

          for (var i = 0, j = componentList.length; i < j; ++i) {
            var component = componentList[i];
            if (conf && !opt_noValidation) {
              var validators = component.validators;
              for (var v in validators) {
                if (validators.hasOwnProperty(v)) {
                  if (!validators[v](conf[v])) {
                    throw new Error('Invalid config value "' + conf[v] +
                        '" for parameter "' + v + '" in component "' +
                        name + '"');
                  }
                }
              }
            }

            if (component.callback) {
              component.callback(config);
            }
          }
        }
      }
    },

    // Standard validators go here.

    /**
     * Ensures that data is one of a fixed set of items.
     * Also supports argument sytax: EnumValidator("Dog", "Cat", "Fish");
     *
     * @param {Array.<string>} list The list of valid values.
     *
     * @member gadgets.config
     * @name  EnumValidator
     * @function
     */
    'EnumValidator': function(list) {
      var listItems = [];
      if (arguments.length > 1) {
        for (var i = 0, arg; (arg = arguments[i]); ++i) {
          listItems.push(arg);
        }
      } else {
        listItems = list;
      }
      return function(data) {
        for (var i = 0, test; (test = listItems[i]); ++i) {
          if (data === listItems[i]) {
            return true;
          }
        }
        return false;
      };
    },

    /**
     * Tests the value against a regular expression.
     * @member gadgets.config
     * @name RegexValidator
     * @function
     */
    'RegExValidator': function(re) {
      return function(data) {
        return re.test(data);
      };
    },

    /**
     * Validates that a value was provided.
     * @param {*} data
     * @member gadgets.config
     * @name ExistsValidator
     * @function
     */
    'ExistsValidator': function(data) {
      return typeof data !== "undefined";
    },

    /**
     * Validates that a value is a non-empty string.
     * @param {*} data
     * @member gadgets.config
     * @name NonEmptyStringValidator
     * @function
     */
    'NonEmptyStringValidator': function(data) {
      return typeof data === "string" && data.length > 0;
    },

    /**
     * Validates that the value is a boolean.
     * @param {*} data
     * @member gadgets.config
     * @name BooleanValidator
     * @function
     */
    'BooleanValidator': function(data) {
      return typeof data === "boolean";
    },

    /**
     * Similar to the ECMAScript 4 virtual typing system, ensures that
     * whatever object was passed in is "like" the existing object.
     * Doesn't actually do type validation though, but instead relies
     * on other validators.
     *
     * This can be used recursively as well to validate sub-objects.
     *
     * @example
     *
     *  var validator = new gadgets.config.LikeValidator(
     *    "booleanField" : gadgets.config.BooleanValidator,
     *    "regexField" : new gadgets.config.RegExValidator(/foo.+/);
     *  );
     *
     *
     * @param {Object} test The object to test against.
     * @member gadgets.config
     * @name BooleanValidator
     * @function
     */
    'LikeValidator' : function(test) {
      return function(data) {
        for (var member in test) {
          if (test.hasOwnProperty(member)) {
            var t = test[member];
            if (!t(data[member])) {
              return false;
            }
          }
        }
        return true;
      };
    }
  };
}();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview Provides gadget/container configuration flags.
 */

/** @type {boolean} */
gadgets.config.isGadget = false;
/** @type {boolean} */
gadgets.config.isContainer = true;
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview General purpose utilities that gadgets can use.
 */

/**
 * @static
 * @class Provides general-purpose utility functions.
 * @name gadgets.util
 */

gadgets['util'] = function() {
  /**
   * Parses URL parameters into an object.
   * @param {string} url - the url parameters to parse
   * @return {Array.<string>} The parameters as an array
   */
  function parseUrlParams(url) {
    // Get settings from url, 'hash' takes precedence over 'search' component
    // don't use document.location.hash due to browser differences.
    var query;
    var queryIdx = url.indexOf("?");
    var hashIdx = url.indexOf("#");
    if (hashIdx === -1) {
      query = url.substr(queryIdx + 1);
    } else {
      // essentially replaces "#" with "&"
      query = [url.substr(queryIdx + 1, hashIdx - queryIdx - 1), "&",
               url.substr(hashIdx + 1)].join("");
    }
    return query.split("&");
  }

  var parameters = null;
  var features = {};
  var services = {};
  var onLoadHandlers = [];

  /**
   * @enum {boolean}
   * @const
   * @private
   * Maps code points to the value to replace them with.
   * If the value is "false", the character is removed entirely, otherwise
   * it will be replaced with an html entity.
   */
  
  var escapeCodePoints = {
   // nul; most browsers truncate because they use c strings under the covers.
   0 : false,
   // new line
   10 : true,
   // carriage return
   13 : true,
   // double quote
   34 : true,
   // single quote
   39 : true,
   // less than
   60 : true,
   // greater than
   62 : true,
   // Backslash
   92 : true,
   // line separator
   8232 : true,
   // paragraph separator
   8233 : true
  };

  /**
   * Regular expression callback that returns strings from unicode code points.
   *
   * @param {Array} match Ignored
   * @param {number} value The codepoint value to convert
   * @return {string} The character corresponding to value.
   */
  function unescapeEntity(match, value) {
    return String.fromCharCode(value);
  }

  /**
   * Initializes feature parameters.
   */
  function init(config) {
    features = config["core.util"] || {};
  }
  if (gadgets.config) {
    gadgets.config.register("core.util", null, init);
  }

  return /** @scope gadgets.util */ {

    /**
     * Gets the URL parameters.
     *
     * @param {string=} opt_url Optional URL whose parameters to parse.
     *                         Defaults to window's current URL.
     * @return {Object} Parameters passed into the query string
     * @member gadgets.util
     * @private Implementation detail.
     */
    'getUrlParameters' : function (opt_url) {
      var no_opt_url = typeof opt_url === "undefined";
      if (parameters !== null && no_opt_url) {
        // "parameters" is a cache of current window params only.
        return parameters;
      }
      var parsed = {};
      var pairs = parseUrlParams(opt_url || document.location.href);
      var unesc = window.decodeURIComponent ? decodeURIComponent : unescape;
      for (var i = 0, j = pairs.length; i < j; ++i) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) {
          continue;
        }
        var argName = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        // difference to IG_Prefs, is that args doesn't replace spaces in
        // argname. Unclear on if it should do:
        // argname = argname.replace(/\+/g, " ");
        value = value.replace(/\+/g, " ");
        parsed[argName] = unesc(value);
      }
      if (no_opt_url) {
        // Cache current-window params in parameters var.
        parameters = parsed;
      }
      return parsed;
    },

    /**
     * Creates a closure that is suitable for passing as a callback.
     * Any number of arguments
     * may be passed to the callback;
     * they will be received in the order they are passed in.
     *
     * @param {Object} scope The execution scope; may be null if there is no
     *     need to associate a specific instance of an object with this
     *     callback
     * @param {function(Object,Object)} callback The callback to invoke when this is run;
     *     any arguments passed in will be passed after your initial arguments
     * @param {Object} var_args Initial arguments to be passed to the callback
     *
     * @member gadgets.util
     * @private Implementation detail.
     */
    'makeClosure' : function (scope, callback, var_args) {
      // arguments isn't a real array, so we copy it into one.
      var baseArgs = [];
      for (var i = 2, j = arguments.length; i < j; ++i) {
       baseArgs.push(arguments[i]);
      }
      return function() {
        // append new arguments.
        var tmpArgs = baseArgs.slice();
        for (var i = 0, j = arguments.length; i < j; ++i) {
          tmpArgs.push(arguments[i]);
        }
        return callback.apply(scope, tmpArgs);
      };
    },

    /**
     * Utility function for generating an "enum" from an array.
     *
     * @param {Array.<string>} values The values to generate.
     * @return {Object.<string,string>} An object with member fields to handle
     *   the enum.
     *
     * @private Implementation detail.
     */
    'makeEnum' : function (values) {
      var i, v, obj = {};
      for (i = 0; (v = values[i]); ++i) {
        obj[v] = v;
      }
      return obj;
    },

    /**
     * Gets the feature parameters.
     *
     * @param {string} feature The feature to get parameters for
     * @return {Object} The parameters for the given feature, or null
     *
     * @member gadgets.util
     */
    'getFeatureParameters' : function (feature) {
      return typeof features[feature] === "undefined" ? null : features[feature];
    },

    /**
     * Returns whether the current feature is supported.
     *
     * @param {string} feature The feature to test for
     * @return {boolean} True if the feature is supported
     *
     * @member gadgets.util
     */
    'hasFeature' : function (feature) {
      return typeof features[feature] !== "undefined";
    },
    
    /**
     * Returns the list of services supported by the server
     * serving this gadget.
     *
     * @return {Object} List of Services that enumerate their methods
     *
     * @member gadgets.util
     */
    'getServices' : function () {
      return services;
    },

    /**
     * Registers an onload handler.
     * @param {function()} callback The handler to run
     *
     * @member gadgets.util
     */
    'registerOnLoadHandler' : function (callback) {
      onLoadHandlers.push(callback);
    },

    /**
     * Runs all functions registered via registerOnLoadHandler.
     * @private Only to be used by the container, not gadgets.
     */
    'runOnLoadHandlers' : function () {
      for (var i = 0, j = onLoadHandlers.length; i < j; ++i) {
        onLoadHandlers[i]();
      }
    },

    /**
     * Escapes the input using html entities to make it safer.
     *
     * If the input is a string, uses gadgets.util.escapeString.
     * If it is an array, calls escape on each of the array elements
     * if it is an object, will only escape all the mapped keys and values if
     * the opt_escapeObjects flag is set. This operation involves creating an
     * entirely new object so only set the flag when the input is a simple
     * string to string map.
     * Otherwise, does not attempt to modify the input.
     *
     * @param {Object} input The object to escape
     * @param {boolean=} opt_escapeObjects Whether to escape objects.
     * @return {Object} The escaped object
     * @private Only to be used by the container, not gadgets.
     */
    'escape' : function(input, opt_escapeObjects) {
      if (!input) {
        return input;
      } else if (typeof input === "string") {
        return gadgets.util.escapeString(input);
      } else if (typeof input === "array") {
        for (var i = 0, j = input.length; i < j; ++i) {
          input[i] = gadgets.util.escape(input[i]);
        }
      } else if (typeof input === "object" && opt_escapeObjects) {
        var newObject = {};
        for (var field in input) {
          if (input.hasOwnProperty(field)) {
            newObject[gadgets.util.escapeString(field)] = gadgets.util.escape(input[field], true);
          }
        }
        return newObject;
      }
      return input;
    },

    /**
     * Escapes the input using html entities to make it safer.
     *
     * Currently not in the spec -- future proposals may change
     * how this is handled.
     *
     * TODO: Parsing the string would probably be more accurate and faster than
     * a bunch of regular expressions.
     *
     * @param {string} str The string to escape
     * @return {string} The escaped string
     */
    'escapeString' : function(str) {
      if (!str) return str;
      var out = [], ch, shouldEscape;
      for (var i = 0, j = str.length; i < j; ++i) {
        ch = str.charCodeAt(i);
        shouldEscape = escapeCodePoints[ch];
        if (shouldEscape === true) {
          out.push("&#", ch, ";");
        } else if (shouldEscape !== false) {
          // undefined or null are OK.
          out.push(str.charAt(i));
        }
      }
      return out.join("");
    },

    /**
     * Reverses escapeString
     *
     * @param {string} str The string to unescape.
     * @return {string}
     */
    'unescapeString' : function(str) {
      if (!str) return str;
      return str.replace(/&#([0-9]+);/g, unescapeEntity);
    },


    /**
     * Attach an event listener to given DOM element (Not a gadget standard)
     * 
     * @param {Object} elem  DOM element on which to attach event.
     * @param {string} eventName  Event type to listen for.
     * @param {function()} callback  Invoked when specified event occurs.
     * @param {boolean} useCapture  If true, initiates capture.
     */
    'attachBrowserEvent': function(elem, eventName, callback, useCapture) {
      if (typeof elem.addEventListener != 'undefined') {
        elem.addEventListener(eventName, callback, useCapture);
      } else if (typeof elem.attachEvent != 'undefined') {
        elem.attachEvent('on' + eventName, callback);
      } else {
        gadgets.warn("cannot attachBrowserEvent: " + eventName);
      }
    },

    /**
     * Remove event listener. (Shindig internal implementation only)
     * 
     * @param {Object} elem  DOM element from which to remove event.
     * @param {string} eventName  Event type to remove.
     * @param {function()} callback  Listener to remove.
     * @param {boolean} useCapture  Specifies whether listener being removed was added with
     *                              capture enabled.
     */
    'removeBrowserEvent': function(elem, eventName, callback, useCapture) {
      if (elem.removeEventListener) {
        elem.removeEventListener(eventName, callback, useCapture);
      } else if (elem.detachEvent){
        elem.detachEvent('on' + eventName, callback);
      } else {
        gadgets.warn("cannot removeBrowserEvent: " + eventName);
      }
    }
  };
}();
// Initialize url parameters so that hash data is pulled in before it can be
// altered by a click.
gadgets['util'].getUrlParameters();

;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @class
 * Tame and expose core gadgets.* API to cajoled gadgets
 */
var tamings___ = tamings___ || [];
tamings___.push(function(imports) {
  caja___.whitelistFuncs([
    [gadgets.util, 'escapeString'],
    [gadgets.util, 'getFeatureParameters'],
    [gadgets.util, 'getUrlParameters'],
    [gadgets.util, 'hasFeature'],
    [gadgets.util, 'registerOnLoadHandler'],
    [gadgets.util, 'unescapeString']
  ]);
});
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview Support for basic logging capability for gadgets.
 *
 * This functionality replaces alert(msg) and window.console.log(msg).
 *
 * <p>Currently only works on browsers with a console (WebKit based browsers,
 * Firefox with Firebug extension, or Opera).
 *
 * <p>API is designed to be equivalent to existing console.log | warn | error
 * logging APIs supported by Firebug and WebKit based browsers. The only
 * addition is the ability to call gadgets.setLogLevel().
 */

/**
 * @static
 * @namespace Support for basic logging capability for gadgets.
 * @name gadgets.log
 */

gadgets['log'] = (function() {
   /** @const */
   var info_=1;
   /** @const */
   var warning_=2;
   /** @const */
   var error_=3;
   /** @const */
   var none_=4;

/**
 * Log an informational message
 * @param {Object} message - the message to log
 * @member gadgets
 * @name log
 * @function
 */
var log = function(message) {
  logAtLevel(info_, message);
};
 
/**
 * Log a warning
 * @param {Object} message - the message to log
 * @static 
 */
gadgets.warn = function(message) {
  logAtLevel(warning_, message);
};

/**
 * Log an error
 * @param {Object} message - The message to log
 * @static 
 */
gadgets.error = function(message) {
  logAtLevel(error_, message);
};

/**
 * Sets the log level threshold.
 * @param {number} logLevel - New log level threshold.
 * @static
 * @member gadgets.log
 * @name setLogLevel
 */
gadgets['setLogLevel'] = function(logLevel) {
  logLevelThreshold_ = logLevel;
};

/**
 * Logs a log message if output console is available, and log threshold is met.
 * @param {number} level - the level to log with. Optional, defaults to gadgets.log.INFO.
 * @param {Object} message - The message to log
 * @private
 */
 function logAtLevel(level, message) {
  if (level < logLevelThreshold_ || !_console) {
    return;
  }

  if (level === warning_ && _console.warn) {
    _console.warn(message);
  } else if (level === error_ && _console.error) {
    _console.error(message);
  } else if (_console.log) {
    _console.log(message);
  }
};

/**
 * Log level for informational logging.
 * @static
 * @const
 * @member gadgets.log
 * @name INFO
 */
log['INFO'] = info_;

/**
 * Log level for warning logging.
 * @static
 * @const
 * @member gadgets.log
 * @name WARNING
 */
log['WARNING'] = warning_;

/**
 * Log level for no logging
 * @static
 * @const
 * @member gadgets.log
 * @name NONE
 */
log['NONE'] = none_;

/**
 * Current log level threshold.
 * @type {number}
 * @private
 */
var logLevelThreshold_ = info_;



/**
 * Console to log to
 * @private
 * @static
 */
var _console = window.console ? window.console :
                       window.opera   ? window.opera.postError : undefined;

   return log; 
})();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @class
 * Tame and expose core gadgets.* API to cajoled gadgets
 */
var tamings___ = tamings___ || [];
tamings___.push(function(imports) {
  ___.grantRead(gadgets.log, 'INFO');
  ___.grantRead(gadgets.log, 'WARNING');
  ___.grantRead(gadgets.log, 'ERROR');
  ___.grantRead(gadgets.log, 'NONE');
  caja___.whitelistFuncs([
    [gadgets, 'log'],
    [gadgets, 'warn'],
    [gadgets, 'error'],
    [gadgets, 'setLogLevel']
  ]);
});
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview
 * The global object gadgets.json contains two methods.
 *
 * gadgets.json.stringify(value) takes a JavaScript value and produces a JSON
 * text. The value must not be cyclical.
 *
 * gadgets.json.parse(text) takes a JSON text and produces a JavaScript value.
 * It will return false if there is an error.
 */

/**
 * @static
 * @class Provides operations for translating objects to and from JSON.
 * @name gadgets.json
 */

/**
 * Port of the public domain JSON library by Douglas Crockford.
 * See: http://www.json.org/json2.js
 */
if (window.JSON && window.JSON.parse && window.JSON.stringify) {
  // HTML5 implementation, or already defined.
  // Not a direct alias as the opensocial specification disagrees with the HTML5 JSON spec.
  // JSON says to throw on parse errors and to support filtering functions. OS does not.
  gadgets['json'] = (function() {
    var endsWith___ = /___$/;
    return {
      /* documented below */
      'parse': function(str) {
        try {
          return window.JSON.parse(str);
        } catch (e) {
          return false;
        }
      },
      /* documented below */
      'stringify': function(obj) {
        try {
          return window.JSON.stringify(obj, function(k,v) {
            return !endsWith___.test(k) ? v : null;
          });
        } catch (e) {
          return null;
        }
      }
    };
  })();
} else {
/**
 * Port of the public domain JSON library by Douglas Crockford.
 * See: http://www.json.org/json2.js
 */
  gadgets['json'] = function () {
  
    /**
     * Formats integers to 2 digits.
     * @param {number} n
     * @private
     */
    function f(n) {
      return n < 10 ? '0' + n : n;
    }
  
    Date.prototype.toJSON = function () {
      return [this.getUTCFullYear(), '-',
             f(this.getUTCMonth() + 1), '-',
             f(this.getUTCDate()), 'T',
             f(this.getUTCHours()), ':',
             f(this.getUTCMinutes()), ':',
             f(this.getUTCSeconds()), 'Z'].join("");
    };
  
    // table of character substitutions
    /**
     * @const
     * @enum {string}
     */
    var m = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"' : '\\"',
      '\\': '\\\\'
    };
  
    /**
     * Converts a json object into a string.
     * @param {*} value
     * @return {string}
     * @member gadgets.json
     */
    function stringify(value) {
      var a,          // The array holding the partial texts.
          i,          // The loop counter.
          k,          // The member key.
          l,          // Length.
          r = /["\\\x00-\x1f\x7f-\x9f]/g,
          v;          // The member value.
  
      switch (typeof value) {
      case 'string':
      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we must also replace the offending characters with safe ones.
        return r.test(value) ?
            '"' + value.replace(r, function (a) {
              var c = m[a];
              if (c) {
                return c;
              }
              c = a.charCodeAt();
              return '\\u00' + Math.floor(c / 16).toString(16) +
                  (c % 16).toString(16);
              }) + '"' : '"' + value + '"';
      case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : 'null';
      case 'boolean':
      case 'null':
        return String(value);
      case 'object':
      // Due to a specification blunder in ECMAScript,
      // typeof null is 'object', so watch out for that case.
        if (!value) {
          return 'null';
        }
        // toJSON check removed; re-implement when it doesn't break other libs.
        a = [];
        if (typeof value.length === 'number' &&
            !value.propertyIsEnumerable('length')) {
          // The object is an array. Stringify every element. Use null as a
          // placeholder for non-JSON values.
          l = value.length;
          for (i = 0; i < l; i += 1) {
            a.push(stringify(value[i]) || 'null');
          }
          // Join all of the elements together and wrap them in brackets.
          return '[' + a.join(',') + ']';
        }
        // Otherwise, iterate through all of the keys in the object.
        for (k in value) {
          if (k.match('___$'))
            continue;
          if (value.hasOwnProperty(k)) {
            if (typeof k === 'string') {
              v = stringify(value[k]);
              if (v) {
                a.push(stringify(k) + ':' + v);
              }
            }
          }
        }
        // Join all of the member texts together and wrap them in braces.
        return '{' + a.join(',') + '}';
      }
      return "undefined";
    }
  
    return {
      'stringify': stringify,
      'parse': function (text) {
      // Parsing happens in three stages. In the first stage, we run the text against
      // regular expressions that look for non-JSON patterns. We are especially
      // concerned with '()' and 'new' because they can cause invocation, and '='
      // because it can cause mutation. But just to be safe, we want to reject all
      // unexpected forms.
      
      // We split the first stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace all backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
  
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
          return eval('(' + text + ')');
        }
        // If the text is not JSON parseable, then return false.
  
        return false;
      }
    };
  }();
}
/**
 * Flatten an object to a stringified values. Useful for dealing with
 * json->querystring transformations. 
 * 
 * @param obj {Object}
 * @return {Object} object with only string values
 * @private not in official specification yet
 */

gadgets['json'].flatten = function(obj) {
  var flat = {};

  if (obj === null || obj === undefined) return flat;

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var value = obj[k];
      if (null === value || undefined === value) {
        continue;
      }
      flat[k] = (typeof value === 'string') ? value : gadgets.json.stringify(value);
    }
  }
  return flat;
}
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @class
 * Tame and expose core gadgets.* API to cajoled gadgets
 */
var tamings___ = tamings___ || [];
tamings___.push(function(imports) {
    ___.tamesTo(gadgets.json.stringify, safeJSON.stringify);
    ___.tamesTo(gadgets.json.parse, safeJSON.parse);
});
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*global gadgets */

/**
 * @fileoverview
 *
 * Manages the gadget security token AKA the gadget auth token AKA the
 * social token.  Also provides an API for the container server to
 * efficiently pass authenticated data to the gadget at render time.
 *
 * The shindig.auth package is not part of the opensocial or gadgets spec,
 * and gadget authors should never use these functions or the security token
 * directly.  These APIs are an implementation detail and are for shindig
 * internal use only.
 *
 * Passing authenticated data into the gadget at render time:
 *
 * The gadget auth token is the only way for the container to allow the
 * gadget access to authenticated data.  gadgets.io.makeRequest for SIGNED
 * or OAUTH requests relies on the authentication token.  Access to social data
 * also relies on the authentication token.
 *
 * The authentication token is normally passed into the gadget on the URL
 * fragment (after the #), and so is not visible to the gadget rendering
 * server.  This keeps the token from being leaked in referer headers, but at
 * the same time limits the amount of authenticated data the gadget can view
 * quickly: fetching authenticated data requires an extra round trip.
 *
 * If the authentication token is passed to the gadget as a query parameter,
 * the gadget rendering server gets an opportunity to view the token during
 * the rendering process.  This allows the rendering server to quickly inject
 * authenticated data into the gadget, at the price of potentially leaking
 * the authentication token in referer headers.  That risk can be mitigated
 * by using a short-lived authentication token on the query string, which
 * the gadget server can swap for a longer lived token at render time.
 *
 * If the rendering server injects authenticated data into the gadget in the
 * form of a JSON string, the resulting javascript object can be accessed via
 * shindig.auth.getTrustedData.
 *
 * To access the security token:
 *   var st = shindig.auth.getSecurityToken();
 *
 * To update the security token with new data from the gadget server:
 *   shindig.auth.updateSecurityToken(newToken);
 *
 * To quickly access a javascript object that has been authenticated by the
 * container and the rendering server:
 *   var trusted = shindig.auth.getTrustedData();
 *   doSomething(trusted.foo.bar);
 */

/**
 * Class used to mange the gadget auth token.  Singleton initialized from
 * auth-init.js.
 *
 * @constructor
 */
shindig.Auth = function() {
  /**
   * The authentication token.
   */
  var authToken = null;

  /**
   * Trusted object from container.
   */
  var trusted = null;

  /**
   * Copy URL parameters into the auth token
   *
   * The initial auth token can look like this:
   *    t=abcd&url=$&foo=
   *
   * If any of the values in the token are '$', a matching parameter
   * from the URL will be inserted, for example:
   *    t=abcd&url=http%3A%2F%2Fsome.gadget.com&foo=
   *
   * Why do this at all?  The only currently known use case for this is
   * efficiently including the gadget URL in the auth token.  If you embed
   * the entire URL in the security token, you effectively double the size
   * of the URL passed on the gadget rendering request:
   *   /gadgets/ifr?url=<gadget-url>#st=<encrypted-gadget-url>
   *
   * This can push the gadget render URL beyond the max length supported
   * by browsers, and then things break.  To work around this, the
   * security token can include only a (much shorter) hash of the gadget-url:
   *  /gadgets/ifr?url=<gadget-url>#st=<xyz>
   *
   * However, we still want the proxy that handles gadgets.io.makeRequest
   * to be able to look up the gadget URL efficiently, without requring
   * a database hit.  To do that, we modify the auth token here to fill
   * in any blank values.  The auth token then becomes:
   *    t=<xyz>&url=<gadget-url>
   *
   * We send the expanded auth token in the body of post requests, so we
   * don't run into problems with length there.  (But people who put
   * several hundred characters in their gadget URLs are still lame.)
   * @param {Object} urlParams
   */
  function addParamsToToken(urlParams) {
    var args = authToken.split('&');
    for (var i = 0; i < args.length; i++) {
      var nameAndValue = args[i].split('=');
      if (nameAndValue.length === 2) {
        var name = nameAndValue[0];
        var value = nameAndValue[1];
        if (value === '$') {
          value = encodeURIComponent(urlParams[name]);
          args[i] = name + '=' + value;
        }
      }
    }
    authToken = args.join('&');
  }

  function init (configuration) {
    var urlParams = gadgets.util.getUrlParameters();
    var config = configuration["shindig.auth"] || {};

    // Auth token - might be injected into the gadget directly, or might
    // be on the URL (hopefully on the fragment).
    if (config.authToken) {
      authToken = config.authToken;
    } else if (urlParams.st) {
      authToken = urlParams.st;
    }
    if (authToken !== null) {
      addParamsToToken(urlParams);
    }

    // Trusted JSON.  We use eval directly because this was injected by the
    // container server and json parsing is slow in IE.
    if (config.trustedJson) {
      trusted = eval("(" + config.trustedJson + ")");
    }
  }

  gadgets.config.register("shindig.auth", null, init);

  return /** @scope shindig.auth */ {

    /**
     * Gets the auth token.
     *
     * @return {string} the gadget authentication token
     *
     * @member shindig.auth
     */
    getSecurityToken : function() {
      return authToken;
    },

    /**
     * Updates the security token with new data from the gadget server.
     *
     * @param {string} newToken the new auth token data.
     *
     * @member shindig.auth
     */
    updateSecurityToken : function(newToken) {
      authToken = newToken;
    },

    /**
     * Quickly retrieves data that is known to have been injected by
     * a trusted container server.
     * @return {Object}
     */
    getTrustedData : function() {
      return trusted;
    }
  };
};
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview
 *
 * Bootstraps auth.js.
 */

shindig.auth = new shindig.Auth();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

gadgets.rpctx = gadgets.rpctx || {};

/**
 * Transport for browsers that support native messaging (various implementations
 * of the HTML5 postMessage method). Officially defined at
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html.
 *
 * postMessage is a native implementation of XDC. A page registers that
 * it would like to receive messages by listening the the "message" event
 * on the window (document in DPM) object. In turn, another page can
 * raise that event by calling window.postMessage (document.postMessage
 * in DPM) with a string representing the message and a string
 * indicating on which domain the receiving page must be to receive
 * the message. The target page will then have its "message" event raised
 * if the domain matches and can, in turn, check the origin of the message
 * and process the data contained within.
 *
 *   wpm: postMessage on the window object.
 *      - Internet Explorer 8+
 *      - Safari 4+
 *      - Chrome 2+
 *      - Webkit nightlies
 *      - Firefox 3+
 *      - Opera 9+
 */
if (!gadgets.rpctx.wpm) {  // make lib resilient to double-inclusion

gadgets.rpctx.wpm = function() {
  var process, ready;
  var postMessage;
  var pmSync = false;
  var pmEventDomain = false;
  var isForceSecure = false;

  // Some browsers (IE, Opera) have an implementation of postMessage that is
  // synchronous, although HTML5 specifies that it should be asynchronous.  In
  // order to make all browsers behave consistently, we run a small test to detect
  // if postMessage is asynchronous or not.  If not, we wrap calls to postMessage
  // in a setTimeout with a timeout of 0.
  // Also, Opera's "message" event does not have an "origin" property (at least,
  // it doesn't in version 9.64;  presumably, it will in version 10).  If
  // event.origin does not exist, use event.domain.  The other difference is that
  // while event.origin looks like <scheme>://<hostname>:<port>, event.domain
  // consists only of <hostname>.
  //
  function testPostMessage() {
    var hit = false;
    
    function receiveMsg(event) {
      if (event.data == "postmessage.test") {
        hit = true;
        if (typeof event.origin === "undefined") {
          pmEventDomain = true;
        }
      }
    }
    
    gadgets.util.attachBrowserEvent(window, "message", receiveMsg, false);
    window.postMessage("postmessage.test", "*");
    
    // if 'hit' is true here, then postMessage is synchronous
    if (hit) {
      pmSync = true;
    }
    
    gadgets.util.removeBrowserEvent(window, "message", receiveMsg, false);
  }

  function onmessage(packet) {
    var rpc = gadgets.json.parse(packet.data);
    if (isForceSecure) {
      if (!rpc || !rpc.f) {
        return;
      }
    
      // for security, check origin against expected value
      var origRelay = gadgets.rpc.getRelayUrl(rpc.f) ||
                      gadgets.util.getUrlParameters()["parent"];
      var origin = gadgets.rpc.getOrigin(origRelay);
      if (!pmEventDomain ? packet.origin !== origin :
                           packet.domain !== /^.+:\/\/([^:]+).*/.exec( origin )[1]) {
        return;
      }
    }
    process(rpc);
  }

  return {
    getCode: function() {
      return 'wpm';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      process = processFn;
      ready = readyFn;

      testPostMessage();
      if (!pmSync) {
        postMessage = function(win, msg, origin) {
          win.postMessage(msg, origin);
        };
      } else {
        postMessage = function(win, msg, origin) {
          window.setTimeout( function() {
            win.postMessage(msg, origin);
          }, 0);
        };
      }
 
      // Set up native postMessage handler.
      gadgets.util.attachBrowserEvent(window, 'message', onmessage, false);

      ready('..', true);  // Immediately ready to send to parent.
      return true;
    },

    setup: function(receiverId, token, forceSecure) {
      isForceSecure = forceSecure;
      // If we're a gadget, send an ACK message to indicate to container
      // that we're ready to receive messages.
      if (receiverId === '..') {
        if (isForceSecure) {
          gadgets.rpc._createRelayIframe(token);
        } else {
          gadgets.rpc.call(receiverId, gadgets.rpc.ACK);
        }
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      var targetWin = gadgets.rpc._getTargetWin(targetId);
      // targetOrigin = canonicalized relay URL
      var origRelay = gadgets.rpc.getRelayUrl(targetId) ||
                      gadgets.util.getUrlParameters()["parent"];
      var origin = gadgets.rpc.getOrigin(origRelay);
      if (origin) {
        postMessage(targetWin, gadgets.json.stringify(rpc), origin);
      } else {
        gadgets.error("No relay set (used as window.postMessage targetOrigin)" +
            ", cannot send cross-domain message");
      }
      return true;
    },

    relayOnload: function(receiverId, data) {
      ready(receiverId, true);
    }
  };
}();

} // !end of double-inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

gadgets.rpctx = gadgets.rpctx || {};

/*
 * For Gecko-based browsers, the security model allows a child to call a
 * function on the frameElement of the iframe, even if the child is in
 * a different domain. This method is dubbed "frameElement" (fe).
 *
 * The ability to add and call such functions on the frameElement allows
 * a bidirectional channel to be setup via the adding of simple function
 * references on the frameElement object itself. In this implementation,
 * when the container sets up the authentication information for that gadget
 * (by calling setAuth(...)) it as well adds a special function on the
 * gadget's iframe. This function can then be used by the gadget to send
 * messages to the container. In turn, when the gadget tries to send a
 * message, it checks to see if this function has its own function stored
 * that can be used by the container to call the gadget. If not, the
 * function is created and subsequently used by the container.
 * Note that as a result, FE can only be used by a container to call a
 * particular gadget *after* that gadget has called the container at
 * least once via FE.
 *
 *   fe: Gecko-specific frameElement trick.
 *      - Firefox 1+
 */
if (!gadgets.rpctx.frameElement) {  // make lib resilient to double-inclusion

gadgets.rpctx.frameElement = function() {
  // Consts for FrameElement.
  var FE_G2C_CHANNEL = '__g2c_rpc';
  var FE_C2G_CHANNEL = '__c2g_rpc';
  var process;
  var ready;

  function callFrameElement(targetId, from, rpc) {
    try {
      if (from !== '..') {
        // Call from gadget to the container.
        var fe = window.frameElement;

        if (typeof fe[FE_G2C_CHANNEL] === 'function') {
          // Complete the setup of the FE channel if need be.
          if (typeof fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] !== 'function') {
            fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] = function(args) {
              process(gadgets.json.parse(args));
            };
          }

          // Conduct the RPC call.
          fe[FE_G2C_CHANNEL](gadgets.json.stringify(rpc));
          return true;
        }
      } else {
        // Call from container to gadget[targetId].
        var frame = document.getElementById(targetId);

        if (typeof frame[FE_G2C_CHANNEL] === 'function' &&
            typeof frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL] === 'function') {

          // Conduct the RPC call.
          frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL](gadgets.json.stringify(rpc));
          return true;
        }
      }
    } catch (e) {
    }
    return false;
  }

  return {
    getCode: function() {
      return 'fe';
    },

    isParentVerifiable: function() {
      return false;
    },
  
    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate OK to call to container. This will be true
      // by the end of this method.
      if (receiverId !== '..') {
        try {
          var frame = document.getElementById(receiverId);
          frame[FE_G2C_CHANNEL] = function(args) {
            process(gadgets.json.parse(args));
          };
        } catch (e) {
          return false;
        }
      }
      if (receiverId === '..') {
        ready('..', true);
        var ackFn = function() {
          window.setTimeout(function() {
            gadgets.rpc.call(receiverId, gadgets.rpc.ACK);
          }, 500);
        };
        // Setup to container always happens before onload.
        // If it didn't, the correct fix would be in gadgets.util.
        gadgets.util.registerOnLoadHandler(ackFn);
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      return callFrameElement(targetId, from, rpc);
    } 

  };
}();

} // !end of double-inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

gadgets.rpctx = gadgets.rpctx || {};

/**
 * For Internet Explorer before version 8, the security model allows anyone
 * parent to set the value of the "opener" property on another window,
 * with only the receiving window able to read it.
 * This method is dubbed "Native IE XDC" (NIX).
 *
 * This method works by placing a handler object in the "opener" property
 * of a gadget when the container sets up the authentication information
 * for that gadget (by calling setAuthToken(...)). At that point, a NIX
 * wrapper is created and placed into the gadget by calling
 * theframe.contentWindow.opener = wrapper. Note that as a result, NIX can
 * only be used by a container to call a particular gadget *after* that
 * gadget has called the container at least once via NIX.
 *
 * The NIX wrappers in this RPC implementation are instances of a VBScript
 * class that is created when this implementation loads. The reason for
 * using a VBScript class stems from the fact that any object can be passed
 * into the opener property.
 * While this is a good thing, as it lets us pass functions and setup a true
 * bidirectional channel via callbacks, it opens a potential security hole
 * by which the other page can get ahold of the "window" or "document"
 * objects in the parent page and in turn wreak havok. This is due to the
 * fact that any JS object useful for establishing such a bidirectional
 * channel (such as a function) can be used to access a function
 * (eg. obj.toString, or a function itself) created in a specific context,
 * in particular the global context of the sender. Suppose container
 * domain C passes object obj to gadget on domain G. Then the gadget can
 * access C's global context using:
 * var parentWindow = (new obj.toString.constructor("return window;"))();
 * Nulling out all of obj's properties doesn't fix this, since IE helpfully
 * restores them to their original values if you do something like:
 * delete obj.toString; delete obj.toString;
 * Thus, we wrap the necessary functions and information inside a VBScript
 * object. VBScript objects in IE, like DOM objects, are in fact COM
 * wrappers when used in JavaScript, so we can safely pass them around
 * without worrying about a breach of context while at the same time
 * allowing them to act as a pass-through mechanism for information
 * and function calls. The implementation details of this VBScript wrapper
 * can be found in the setupChannel() method below.
 *
 *   nix: Internet Explorer-specific window.opener trick.
 *     - Internet Explorer 6
 *     - Internet Explorer 7
 */
if (!gadgets.rpctx.nix) {  // make lib resilient to double-inclusion

gadgets.rpctx.nix = function() {
  // Consts for NIX. VBScript doesn't
  // allow items to start with _ for some reason,
  // so we need to make these names quite unique, as
  // they will go into the global namespace.
  var NIX_WRAPPER = 'GRPC____NIXVBS_wrapper';
  var NIX_GET_WRAPPER = 'GRPC____NIXVBS_get_wrapper';
  var NIX_HANDLE_MESSAGE = 'GRPC____NIXVBS_handle_message';
  var NIX_CREATE_CHANNEL = 'GRPC____NIXVBS_create_channel';
  var MAX_NIX_SEARCHES = 10;
  var NIX_SEARCH_PERIOD = 500;

  // JavaScript reference to the NIX VBScript wrappers.
  // Gadgets will have but a single channel under
  // nix_channels['..'] while containers will have a channel
  // per gadget stored under the gadget's ID.
  var nix_channels = {};
  var isForceSecure = {};

  // Store the ready signal method for use on handshake complete.
  var ready;
  var numHandlerSearches = 0;

  // Search for NIX handler to parent. Tries MAX_NIX_SEARCHES times every
  // NIX_SEARCH_PERIOD milliseconds.
  function conductHandlerSearch() {
    // Call from gadget to the container.
    var handler = nix_channels['..'];
    if (handler) {
      return;
    }

    if (++numHandlerSearches > MAX_NIX_SEARCHES) {
      // Handshake failed. Will fall back.
      gadgets.warn('Nix transport setup failed, falling back...');
      ready('..', false);
      return;
    }

    // If the gadget has yet to retrieve a reference to
    // the NIX handler, try to do so now. We don't do a
    // typeof(window.opener.GetAuthToken) check here
    // because it means accessing that field on the COM object, which,
    // being an internal function reference, is not allowed.
    // "in" works because it merely checks for the prescence of
    // the key, rather than actually accessing the object's property.
    // This is just a sanity check, not a validity check.
    if (!handler && window.opener && "GetAuthToken" in window.opener) {
      handler = window.opener;

      // Create the channel to the parent/container.
      // First verify that it knows our auth token to ensure it's not
      // an impostor.
      if (handler.GetAuthToken() == gadgets.rpc.getAuthToken('..')) {
        // Auth match - pass it back along with our wrapper to finish.
        // own wrapper and our authentication token for co-verification.
        var token = gadgets.rpc.getAuthToken('..');
        handler.CreateChannel(window[NIX_GET_WRAPPER]('..', token),
                              token);
        // Set channel handler
        nix_channels['..'] = handler;
        window.opener = null;

        // Signal success and readiness to send to parent.
        // Container-to-gadget bit flipped in CreateChannel.
        ready('..', true);
        return;
      }
    }

    // Try again.
    window.setTimeout(function() { conductHandlerSearch(); },
                      NIX_SEARCH_PERIOD);
  }

  // Returns current window location, without hash values
  function getLocationNoHash() {
    var loc = window.location.href;
    var idx = loc.indexOf('#');
    if (idx == -1) {
      return loc;
    }
    return loc.substring(0, idx);
  }

  // When "forcesecure" is set to true, use the relay file and a simple variant of IFPC to first
  // authenticate the container and gadget with each other.  Once that is done, then initialize
  // the NIX protocol. 
  function setupSecureRelayToParent(rpctoken) {
    // To the parent, transmit the child's URL, the passed in auth
    // token, and another token generated by the child.
    var childToken = (0x7FFFFFFF * Math.random()) | 0;    // TODO expose way to have child set this value
    var data = [
      getLocationNoHash(),
      childToken
    ];
    gadgets.rpc._createRelayIframe(rpctoken, data);
    
    // listen for response from parent
    var hash = window.location.href.split('#')[1] || '';
  
    function relayTimer() {
      var newHash = window.location.href.split('#')[1] || '';
      if (newHash !== hash) {
        clearInterval(relayTimerId);
        var params = gadgets.util.getUrlParameters(window.location.href);
        if (params.childtoken == childToken) {
          // parent has been authenticated; now init NIX
          conductHandlerSearch();
          return;
        }
        // security error -- token didn't match
        ready('..', false);
      }
    }
    var relayTimerId = setInterval( relayTimer, 100 );
  }

  return {
    getCode: function() {
      return 'nix';
    },

    isParentVerifiable: function(opt_receiverId) {
      // NIX is only parent verifiable if a receiver was setup with "forcesecure" set to TRUE.
      if (opt_receiverId) {
        return isForceSecure[opt_receiverId];
      }
      return false;
    },

    init: function(processFn, readyFn) {
      ready = readyFn;

      // Ensure VBScript wrapper code is in the page and that the
      // global Javascript handlers have been set.
      // VBScript methods return a type of 'unknown' when
      // checked via the typeof operator in IE. Fortunately
      // for us, this only applies to COM objects, so we
      // won't see this for a real Javascript object.
      if (typeof window[NIX_GET_WRAPPER] !== 'unknown') {
        window[NIX_HANDLE_MESSAGE] = function(data) {
          window.setTimeout(
              function() { processFn(gadgets.json.parse(data)); }, 0);
        };

        window[NIX_CREATE_CHANNEL] = function(name, channel, token) {
          // Verify the authentication token of the gadget trying
          // to create a channel for us.
          if (gadgets.rpc.getAuthToken(name) === token) {
            nix_channels[name] = channel;
            ready(name, true);
          }
        };

        // Inject the VBScript code needed.
        var vbscript =
          // We create a class to act as a wrapper for
          // a Javascript call, to prevent a break in of
          // the context.
          'Class ' + NIX_WRAPPER + '\n '

          // An internal member for keeping track of the
          // name of the document (container or gadget)
          // for which this wrapper is intended. For
          // those wrappers created by gadgets, this is not
          // used (although it is set to "..")
          + 'Private m_Intended\n'

          // Stores the auth token used to communicate with
          // the gadget. The GetChannelCreator method returns
          // an object that returns this auth token. Upon matching
          // that with its own, the gadget uses the object
          // to actually establish the communication channel.
          + 'Private m_Auth\n'

          // Method for internally setting the value
          // of the m_Intended property.
          + 'Public Sub SetIntendedName(name)\n '
          + 'If isEmpty(m_Intended) Then\n'
          + 'm_Intended = name\n'
          + 'End If\n'
          + 'End Sub\n'

          // Method for internally setting the value of the m_Auth property.
          + 'Public Sub SetAuth(auth)\n '
          + 'If isEmpty(m_Auth) Then\n'
          + 'm_Auth = auth\n'
          + 'End If\n'
          + 'End Sub\n'

          // A wrapper method which actually causes a
          // message to be sent to the other context.
          + 'Public Sub SendMessage(data)\n '
          + NIX_HANDLE_MESSAGE + '(data)\n'
          + 'End Sub\n'

          // Returns the auth token to the gadget, so it can
          // confirm a match before initiating the connection
          + 'Public Function GetAuthToken()\n '
          + 'GetAuthToken = m_Auth\n'
          + 'End Function\n'

          // Method for setting up the container->gadget
          // channel. Not strictly needed in the gadget's
          // wrapper, but no reason to get rid of it. Note here
          // that we pass the intended name to the NIX_CREATE_CHANNEL
          // method so that it can save the channel in the proper place
          // *and* verify the channel via the authentication token passed
          // here.
          + 'Public Sub CreateChannel(channel, auth)\n '
          + 'Call ' + NIX_CREATE_CHANNEL + '(m_Intended, channel, auth)\n'
          + 'End Sub\n'
          + 'End Class\n'

          // Function to get a reference to the wrapper.
          + 'Function ' + NIX_GET_WRAPPER + '(name, auth)\n'
          + 'Dim wrap\n'
          + 'Set wrap = New ' + NIX_WRAPPER + '\n'
          + 'wrap.SetIntendedName name\n'
          + 'wrap.SetAuth auth\n'
          + 'Set ' + NIX_GET_WRAPPER + ' = wrap\n'
          + 'End Function';

        try {
          window.execScript(vbscript, 'vbscript');
        } catch (e) {
          return false;
        }
      }
      return true;
    },

    setup: function(receiverId, token, forcesecure) {
      isForceSecure[receiverId] = !!forcesecure;
      if (receiverId === '..') {
        if (forcesecure) {
          setupSecureRelayToParent(token);
        } else {
          conductHandlerSearch();
        }
        return true;
      }
      try {
        var frame = document.getElementById(receiverId);
        var wrapper = window[NIX_GET_WRAPPER](receiverId, token);
        frame.contentWindow.opener = wrapper;
      } catch (e) {
        return false;
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      try {
        // If we have a handler, call it.
        if (nix_channels[targetId]) {
          nix_channels[targetId].SendMessage(gadgets.json.stringify(rpc));
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    
    // data = [child URL, child auth token]
    relayOnload: function(receiverId, data) {
      // transmit childtoken back to child to complete authentication
      var src = data[0] + '#childtoken=' + data[1];
      var childIframe = document.getElementById(receiverId);
      childIframe.src = src;
    }
  };
}();

} // !end of double-inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

gadgets.rpctx = gadgets.rpctx || {};

/*
 * For older WebKit-based browsers, the security model does not allow for any
 * known "native" hacks for conducting cross browser communication. However,
 * a variation of the IFPC (see below) can be used, entitled "RMR". RMR is
 * a technique that uses the resize event of the iframe to indicate that a
 * message was sent (instead of the much slower/performance heavy polling
 * technique used when a defined relay page is not avaliable). Simply put,
 * RMR uses the same "pass the message by the URL hash" trick that IFPC
 * uses to send a message, but instead of having an active relay page that
 * runs a piece of code when it is loaded, RMR merely changes the URL
 * of the relay page (which does not even have to exist on the domain)
 * and then notifies the other party by resizing the relay iframe. RMR
 * exploits the fact that iframes in the dom of page A can be resized
 * by page A while the onresize event will be fired in the DOM of page B,
 * thus providing a single bit channel indicating "message sent to you".
 * This method has the added benefit that the relay need not be active,
 * nor even exist: a 404 suffices just as well.
 *
 *   rmr: WebKit-specific resizing trick.
 *      - Safari 2+
 *      - Chrome 1
 */
if (!gadgets.rpctx.rmr) {  // make lib resilient to double-inclusion

gadgets.rpctx.rmr = function() {
  // Consts for RMR, including time in ms RMR uses to poll for
  // its relay frame to be created, and the max # of polls it does.
  var RMR_SEARCH_TIMEOUT = 500;
  var RMR_MAX_POLLS = 10;

  // JavaScript references to the channel objects used by RMR.
  // Gadgets will have but a single channel under
  // rmr_channels['..'] while containers will have a channel
  // per gadget stored under the gadget's ID.
  var rmr_channels = {};
  
  var process;
  var ready;

  /**
   * Append an RMR relay frame to the document. This allows the receiver
   * to start receiving messages.
   *
   * @param {Node} channelFrame Relay frame to add to the DOM body.
   * @param {string} relayUri Base URI for the frame.
   * @param {string} data to pass along to the frame.
   * @param {string=} opt_frameId ID of frame for which relay is being appended (optional).
   */
  function appendRmrFrame(channelFrame, relayUri, data, opt_frameId) {
    var appendFn = function() {
      // Append the iframe.
      document.body.appendChild(channelFrame);

      // Set the src of the iframe to 'about:blank' first and then set it
      // to the relay URI. This prevents the iframe from maintaining a src
      // to the 'old' relay URI if the page is returned to from another.
      // In other words, this fixes the bfcache issue that causes the iframe's
      // src property to not be updated despite us assigning it a new value here.
      channelFrame.src = 'about:blank';
      if (opt_frameId) {
        // Process the initial sent payload (typically sent by container to
        // child/gadget) only when the relay frame has finished loading. We
        // do this to ensure that, in processRmrData(...), the ACK sent due
        // to processing can actually be sent. Before this time, the frame's
        // contentWindow is null, making it impossible to do so.
        channelFrame.onload = function() {
          processRmrData(opt_frameId);
        };
      }
      channelFrame.src = relayUri + '#' + data;
    };

    if (document.body) {
      appendFn();
    } else {
      // Common gadget case: attaching header during in-gadget handshake,
      // when we may still be in script in head. Attach onload.
      gadgets.util.registerOnLoadHandler(function() { appendFn(); });
    }
  }

  /**
   * Sets up the RMR transport frame for the given frameId. For gadgets
   * calling containers, the frameId should be '..'.
   *
   * @param {string} frameId The ID of the frame.
   */
  function setupRmr(frameId) {
    if (typeof rmr_channels[frameId] === "object") {
      // Sanity check. Already done.
      return;
    }

    var channelFrame = document.createElement('iframe');
    var frameStyle = channelFrame.style;
    frameStyle.position = 'absolute';
    frameStyle.top = '0px';
    frameStyle.border = '0';
    frameStyle.opacity = '0';

    // The width here is important as RMR
    // makes use of the resize handler for the frame.
    // Do not modify unless you test thoroughly!
    frameStyle.width = '10px';
    frameStyle.height = '1px';
    channelFrame.id = 'rmrtransport-' + frameId;
    channelFrame.name = channelFrame.id;

    // Use the explicitly set relay, if one exists. Otherwise,
    // Construct one using the parent parameter plus robots.txt
    // as a synthetic relay. This works since browsers using RMR
    // treat 404s as legitimate for the purposes of cross domain
    // communication.
    var relayUri = gadgets.rpc.getRelayUrl(frameId);
    if (!relayUri) {
      relayUri =
          gadgets.rpc.getOrigin(gadgets.util.getUrlParameters()["parent"]) +
          '/robots.txt';
    }

    rmr_channels[frameId] = {
      frame: channelFrame,
      receiveWindow: null,
      relayUri: relayUri,
      searchCounter : 0,
      width: 10,

      // Waiting means "waiting for acknowledgement to be received."
      // Acknowledgement always comes as a special ACK
      // message having been received. This message is received
      // during handshake in different ways by the container and
      // gadget, and by normal RMR message passing once the handshake
      // is complete.
      waiting: true,
      queue: [],

      // Number of non-ACK messages that have been sent to the recipient
      // and have been acknowledged.
      sendId: 0,

      // Number of messages received and processed from the sender.
      // This is the number that accompanies every ACK to tell the
      // sender to clear its queue.
      recvId: 0
    };

    if (frameId !== '..') {
      // Container always appends a relay to the gadget, before
      // the gadget appends its own relay back to container. The
      // gadget, in the meantime, refuses to attach the container
      // relay until it finds this one. Thus, the container knows
      // for certain that gadget to container communication is set
      // up by the time it finds its own relay. In addition to
      // establishing a reliable handshake protocol, this also
      // makes it possible for the gadget to send an initial batch
      // of messages to the container ASAP.
      appendRmrFrame(channelFrame, relayUri, getRmrData(frameId));
    }
     
    // Start searching for our own frame on the other page.
    conductRmrSearch(frameId);
  }

  /**
   * Searches for a relay frame, created by the sender referenced by
   * frameId, with which this context receives messages. Once
   * found with proper permissions, attaches a resize handler which
   * signals messages to be sent.
   *
   * @param {string} frameId Frame ID of the prospective sender.
   */
  function conductRmrSearch(frameId) {
    var channelWindow = null;

    // Increment the search counter.
    rmr_channels[frameId].searchCounter++;

    try {
      var targetWin = gadgets.rpc._getTargetWin(frameId);
      if (frameId === '..') {
        // We are a gadget.
        channelWindow = targetWin.frames['rmrtransport-' + gadgets.rpc.RPC_ID];
      } else {
        // We are a container.
        channelWindow = targetWin.frames['rmrtransport-..'];
      }
    } catch (e) {
      // Just in case; may happen when relay is set to about:blank or unset.
      // Catching exceptions here ensures that the timeout to continue the
      // search below continues to work.
    }

    var status = false;

    if (channelWindow) {
      // We have a valid reference to "our" RMR transport frame.
      // Register the proper event handlers.
      status = registerRmrChannel(frameId, channelWindow);
    }

    if (!status) {
      // Not found yet. Continue searching, but only if the counter
      // has not reached the threshold.
      if (rmr_channels[frameId].searchCounter > RMR_MAX_POLLS) {
        // If we reach this point, then RMR has failed and we
        // fall back to IFPC.
        return;
      }

      window.setTimeout(function() {
        conductRmrSearch(frameId);
      }, RMR_SEARCH_TIMEOUT);
    }
  }

  /**
   * Attempts to conduct an RPC call to the specified
   * target with the specified data via the RMR
   * method. If this method fails, the system attempts again
   * using the known default of IFPC.
   *
   * @param {string} targetId Module Id of the RPC service provider.
   * @param {string} serviceName Name of the service to call.
   * @param {string} from Module Id of the calling provider.
   * @param {Object} rpc The RPC data for this call.
   */
  function callRmr(targetId, serviceName, from, rpc) {
    var handler = null;

    if (from !== '..') {
      // Call from gadget to the container.
      handler = rmr_channels['..'];
    } else {
      // Call from container to the gadget.
      handler = rmr_channels[targetId];
    }

    if (handler) {
      // Queue the current message if not ACK.
      // ACK is always sent through getRmrData(...).
      if (serviceName !== gadgets.rpc.ACK) {
        handler.queue.push(rpc);
      }

      if (handler.waiting ||
          (handler.queue.length === 0 &&
           !(serviceName === gadgets.rpc.ACK && rpc && rpc.ackAlone === true))) {
        // If we are awaiting a response from any previously-sent messages,
        // or if we don't have anything new to send, just return.
        // Note that we don't short-return if we're ACKing just-received
        // messages.
        return true;
      }

      if (handler.queue.length > 0) {
        handler.waiting = true;
      }

      var url = handler.relayUri + "#" + getRmrData(targetId);

      try {
        // Update the URL with the message.
        handler.frame.contentWindow.location = url;

        // Resize the frame.
        var newWidth = handler.width == 10 ? 20 : 10;
        handler.frame.style.width = newWidth + 'px';
        handler.width = newWidth;

        // Done!
      } catch (e) {
        // Something about location-setting or resizing failed.
        // This should never happen, but if it does, fall back to
        // the default transport.
        return false;
      }
    }

    return true;
  }

  /**
   * Returns as a string the data to be appended to an RMR relay frame,
   * constructed from the current request queue plus an ACK message indicating
   * the currently latest-processed message ID.
   *
   * @param {string} toFrameId Frame whose sendable queued data to retrieve.
   */
  function getRmrData(toFrameId) {
    var channel = rmr_channels[toFrameId];
    var rmrData = {id: channel.sendId};
    if (channel) {
      rmrData.d = Array.prototype.slice.call(channel.queue, 0);
      rmrData.d.push({s:gadgets.rpc.ACK, id:channel.recvId});
    }
    return gadgets.json.stringify(rmrData);
  }

  /**
   * Retrieve data from the channel keyed by the given frameId,
   * processing it as a batch. All processed data is assumed to have been
   * generated by getRmrData(...), pairing that method with this.
   *
   * @param {string} fromFrameId Frame from which data is being retrieved.
   */
  function processRmrData(fromFrameId) {
    var channel = rmr_channels[fromFrameId];
    var data = channel.receiveWindow.location.hash.substring(1);

    // Decode the RPC object array.
    var rpcObj = gadgets.json.parse(decodeURIComponent(data)) || {};
    var rpcArray = rpcObj.d || [];

    var nonAckReceived = false;
    var noLongerWaiting = false;

    var numBypassed = 0;
    var numToBypass = (channel.recvId - rpcObj.id);
    for (var i = 0; i < rpcArray.length; ++i) {
      var rpc = rpcArray[i];

      // If we receive an ACK message, then mark the current
      // handler as no longer waiting and send out the next
      // queued message.
      if (rpc.s === gadgets.rpc.ACK) {
        // ACK received - whether this came from a handshake or
        // an active call, in either case it indicates readiness to
        // send messages to the from frame.
        ready(fromFrameId, true);

        if (channel.waiting) {
          noLongerWaiting = true;
        }

        channel.waiting = false;
        var newlyAcked = Math.max(0, rpc.id - channel.sendId);
        channel.queue.splice(0, newlyAcked);
        channel.sendId = Math.max(channel.sendId, rpc.id || 0);
        continue;
      }

      // If we get here, we've received > 0 non-ACK messages to
      // process. Indicate this bit for later.
      nonAckReceived = true;

      // Bypass any messages already received.
      if (++numBypassed <= numToBypass) {
        continue;
      }

      ++channel.recvId;
      process(rpc);  // actually dispatch the message
    }

    // Send an ACK indicating that we got/processed the message(s).
    // Do so if we've received a message to process or if we were waiting
    // before but a received ACK has cleared our waiting bit, and we have
    // more messages to send. Performing this operation causes additional
    // messages to be sent.
    if (nonAckReceived ||
        (noLongerWaiting && channel.queue.length > 0)) {
      var from = (fromFrameId === '..') ? gadgets.rpc.RPC_ID : '..';
      callRmr(fromFrameId, gadgets.rpc.ACK, from, {ackAlone: nonAckReceived});
    }
  }

  /**
   * Registers the RMR channel handler for the given frameId and associated
   * channel window.
   *
   * @param {string} frameId The ID of the frame for which this channel is being
   *   registered.
   * @param {Object} channelWindow The window of the receive frame for this
   *   channel, if any.
   *
   * @return {boolean} True if the frame was setup successfully, false
   *   otherwise.
   */
  function registerRmrChannel(frameId, channelWindow) {
    var channel = rmr_channels[frameId];

    // Verify that the channel is ready for receiving.
    try {
      var canAccess = false;

      // Check to see if the document is in the window. For Chrome, this
      // will return 'false' if the channelWindow is inaccessible by this
      // piece of JavaScript code, meaning that the URL of the channelWindow's
      // parent iframe has not yet changed from 'about:blank'. We do this
      // check this way because any true *access* on the channelWindow object
      // will raise a security exception, which, despite the try-catch, still
      // gets reported to the debugger (it does not break execution, the try
      // handles that problem, but it is still reported, which is bad form).
      // This check always succeeds in Safari 3.1 regardless of the state of
      // the window.
      canAccess = 'document' in channelWindow;

      if (!canAccess) {
        return false;
      }

      // Check to see if the document is an object. For Safari 3.1, this will
      // return undefined if the page is still inaccessible. Unfortunately, this
      // *will* raise a security issue in the debugger.
      // TODO Find a way around this problem.
      canAccess = typeof channelWindow['document'] == 'object';

      if (!canAccess) {
        return false;
      }

      // Once we get here, we know we can access the document (and anything else)
      // on the window object. Therefore, we check to see if the location is
      // still about:blank (this takes care of the Safari 3.2 case).
      var loc = channelWindow.location.href;

      // Check if this is about:blank for Safari.
      if (loc === 'about:blank') {
        return false;
      }
    } catch (ex) {
      // For some reason, the iframe still points to about:blank. We try
      // again in a bit.
      return false;
    }

    // Save a reference to the receive window.
    channel.receiveWindow = channelWindow;

    // Register the onresize handler.
    function onresize() {
      processRmrData(frameId);
    };

    if (typeof channelWindow.attachEvent === "undefined") {
      channelWindow.onresize = onresize;
    } else {
      channelWindow.attachEvent("onresize", onresize);
    }

    if (frameId === '..') {
      // Gadget to container. Signal to the container that the gadget
      // is ready to receive messages by attaching the g -> c relay.
      // As a nice optimization, pass along any gadget to container
      // queued messages that have backed up since then. ACK is enqueued in
      // getRmrData to ensure that the container's waiting flag is set to false
      // (this happens in the below code run on the container side).
      appendRmrFrame(channel.frame, channel.relayUri, getRmrData(frameId), frameId);
    } else {
      // Process messages that the gadget sent in its initial relay payload.
      // We can do this immediately because the container has already appended
      // and loaded a relay frame that can be used to ACK the messages the gadget
      // sent. In the preceding if-block, however, the processRmrData(...) call
      // must wait. That's because appendRmrFrame may not actually append the
      // frame - in the context of a gadget, this code may be running in the
      // head element, so it cannot be appended to body. As a result, the
      // gadget cannot ACK the container for messages it received.
      processRmrData(frameId);
    }

    return true;
  }

  return {
    getCode: function() {
      return 'rmr';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      try {
        setupRmr(receiverId);
      } catch (e) {
        gadgets.warn('Caught exception setting up RMR: ' + e);
        return false;
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      return callRmr(targetId, rpc.s, from, rpc);
    }
  };
}();

} // !end of double-inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

gadgets.rpctx = gadgets.rpctx || {};

/*
 * For all others, we have a fallback mechanism known as "ifpc". IFPC
 * exploits the fact that while same-origin policy prohibits a frame from
 * accessing members on a window not in the same domain, that frame can,
 * however, navigate the window heirarchy (via parent). This is exploited by
 * having a page on domain A that wants to talk to domain B create an iframe
 * on domain B pointing to a special relay file and with a message encoded
 * after the hash (#). This relay, in turn, finds the page on domain B, and
 * can call a receipt function with the message given to it. The relay URL
 * used by each caller is set via the gadgets.rpc.setRelayUrl(..) and
 * *must* be called before the call method is used.
 *
 *   ifpc: Iframe-based method, utilizing a relay page, to send a message.
 *      - No known major browsers still use this method, but it remains
 *        useful as a catch-all fallback for the time being.
 */
if (!gadgets.rpctx.ifpc) {  // make lib resilient to double-inclusion

gadgets.rpctx.ifpc = function() {
  var iframePool = [];
  var callId = 0;
  var ready;

  /**
   * Encodes arguments for the legacy IFPC wire format.
   *
   * @param {Object} args
   * @return {string} the encoded args
   */
  function encodeLegacyData(args) {
    var argsEscaped = [];
    for(var i = 0, j = args.length; i < j; ++i) {
      argsEscaped.push(encodeURIComponent(gadgets.json.stringify(args[i])));
    }
    return argsEscaped.join('&');
  }

  /**
   * Helper function to emit an invisible IFrame.
   * @param {string} src SRC attribute of the IFrame to emit.
   * @private
   */
  function emitInvisibleIframe(src) {
    var iframe;
    // Recycle IFrames
    for (var i = iframePool.length - 1; i >=0; --i) {
      var ifr = iframePool[i];
      try {
        if (ifr && (ifr.recyclable || ifr.readyState === 'complete')) {
          ifr.parentNode.removeChild(ifr);
          if (window.ActiveXObject) {
            // For MSIE, delete any iframes that are no longer being used. MSIE
            // cannot reuse the IFRAME because a navigational click sound will
            // be triggered when we set the SRC attribute.
            // Other browsers scan the pool for a free iframe to reuse.
            iframePool[i] = ifr = null;
            iframePool.splice(i, 1);
          } else {
            ifr.recyclable = false;
            iframe = ifr;
            break;
          }
        }
      } catch (e) {
        // Ignore; IE7 throws an exception when trying to read readyState and
        // readyState isn't set.
      }
    }
    // Create IFrame if necessary
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.border = iframe.style.width = iframe.style.height = '0px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';
      iframe.onload = function() { this.recyclable = true; };
      iframePool.push(iframe);
    }
    iframe.src = src;
    window.setTimeout(function() { document.body.appendChild(iframe); }, 0);
  }

  return {
    getCode: function() {
      return 'ifpc';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      ready = readyFn;
      ready('..', true);  // Ready immediately.
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate readiness to send to receiver.
      ready(receiverId, true);
      return true;
    },

    call: function(targetId, from, rpc) {
      // Retrieve the relay file used by IFPC. Note that
      // this must be set before the call, and so we conduct
      // an extra check to ensure it is not blank.
      var relay = gadgets.rpc.getRelayUrl(targetId);
      ++callId;

      if (!relay) {
        gadgets.warn('No relay file assigned for IFPC');
        return false;
      }

      // The RPC mechanism supports two formats for IFPC (legacy and current).
      var src = null;
      if (rpc.l) {
        // Use legacy protocol.
        // Format: #iframe_id&callId&num_packets&packet_num&block_of_data
        var callArgs = rpc.a;
        src = [relay, '#', encodeLegacyData([from, callId, 1, 0,
               encodeLegacyData([from, rpc.s, '', '', from].concat(
                 callArgs))])].join('');
      } else {
        // Format: #targetId & sourceId@callId & packetNum & packetId & packetData
        src = [relay, '#', targetId, '&', from, '@', callId,
               '&1&0&', encodeURIComponent(gadgets.json.stringify(rpc))].join('');
      }

      // Conduct the IFPC call by creating the Iframe with
      // the relay URL and appended message.
      emitInvisibleIframe(src);
      return true;
    }
  };
}();

} // !end of double inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Remote procedure call library for gadget-to-container,
 * container-to-gadget, and gadget-to-gadget (thru container) communication.
 */

/**
 * gadgets.rpc Transports
 *
 * All transports are stored in object gadgets.rpctx, and are provided
 * to the core gadgets.rpc library by various build rules.
 * 
 * Transports used by core gadgets.rpc code to actually pass messages.
 * each transport implements the same interface exposing hooks that
 * the core library calls at strategic points to set up and use
 * the transport.
 *
 * The methods each transport must implement are:
 * + getCode(): returns a string identifying the transport. For debugging.
 * + isParentVerifiable(): indicates (via boolean) whether the method
 *     has the property that its relay URL verifies for certain the
 *     receiver's protocol://host:port.
 * + init(processFn, readyFn): Performs any global initialization needed. Called
 *     before any other gadgets.rpc methods are invoked. processFn is
 *     the function in gadgets.rpc used to process an rpc packet. readyFn is
 *     a function that must be called when the transport is ready to send
 *     and receive messages bidirectionally. Returns
 *     true if successful, false otherwise.
 * + setup(receiverId, token): Performs per-receiver initialization, if any.
 *     receiverId will be '..' for gadget-to-container. Returns true if
 *     successful, false otherwise.
 * + call(targetId, from, rpc): Invoked to send an actual
 *     message to the given targetId, with the given serviceName, from
 *     the sender identified by 'from'. Payload is an rpc packet. Returns
 *     true if successful, false otherwise.
 */

if (!gadgets.rpc) { // make lib resilient to double-inclusion

/**
 * @static
 * @namespace Provides operations for making rpc calls.
 * @name gadgets.rpc
 */

gadgets.rpc = function() {
  /** 
   * @const
   * @private
   */
  var CALLBACK_NAME = '__cb';

  /** 
   * @const
   * @private
   */
  var DEFAULT_NAME = '';

  /** Exported constant, for use by transports only.
   * @const
   * @type {string}
   * @member gadgets.rpc
   */
  var ACK = '__ack';

  /** 
   * Timeout and number of attempts made to setup a transport receiver.
   * @const
   * @private
   */
  var SETUP_FRAME_TIMEOUT = 500;

  /** 
   * @const
   * @private
   */
  var SETUP_FRAME_MAX_TRIES = 10;

  var services = {};
  var relayUrl = {};
  var useLegacyProtocol = {};
  var authToken = {};
  var callId = 0;
  var callbacks = {};
  var setup = {};
  var sameDomain = {};
  var params = {};
  var receiverTx = {};
  var earlyRpcQueue = {};

  // isGadget =~ isChild for the purposes of rpc (used only in setup).
  var isChild = (window.top !== window.self);

  // Set the current rpc ID from window.name immediately, to prevent
  // shadowing of window.name by a "var name" declaration, or similar.
  var rpcId = window.name;

  var securityCallback = function() {};
  var LOAD_TIMEOUT = 0;
  var FRAME_PHISH = 1;
  var FORGED_MSG = 2;

  // Fallback transport is simply a dummy impl that emits no errors
  // and logs info on calls it receives, to avoid undesired side-effects
  // from falling back to IFPC or some other transport.
  var fallbackTransport = (function() {
    function logFn(name) {
      return function() {
        gadgets.log("gadgets.rpc." + name + "(" +
                    gadgets.json.stringify(Array.prototype.slice.call(arguments)) +
                    "): call ignored. [caller: " + document.location +
                    ", isChild: " + isChild + "]");
      };
    }
    return {
      getCode: function() {
        return "noop";
      },
      isParentVerifiable: function() {
        return true;  // Not really, but prevents transport assignment to IFPC.
      },
      init: logFn("init"),
      setup: logFn("setup"),
      call: logFn("call")
    };
  })();

  // Load the authentication token for speaking to the container
  // from the gadget's parameters, or default to '0' if not found.
  if (gadgets.util) {
    params = gadgets.util.getUrlParameters();
  }

  /**
   * Return a transport representing the best available cross-domain
   * message-passing mechanism available to the browser.
   *
   * <p>Transports are selected on a cascading basis determined by browser
   * capability and other checks. The order of preference is:
   * <ol>
   * <li> wpm: Uses window.postMessage standard.
   * <li> dpm: Uses document.postMessage, similar to wpm but pre-standard.
   * <li> nix: Uses IE-specific browser hacks.
   * <li> rmr: Signals message passing using relay file's onresize handler.
   * <li> fe: Uses FF2-specific window.frameElement hack.
   * <li> ifpc: Sends messages via active load of a relay file.
   * </ol>
   * <p>See each transport's commentary/documentation for details.
   * @return {Object}
   * @member gadgets.rpc
   */
  function getTransport() {
    return typeof window.postMessage === 'function' ? gadgets.rpctx.wpm :
           typeof window.postMessage === 'object' ? gadgets.rpctx.wpm :
           window.ActiveXObject ? gadgets.rpctx.nix :
           navigator.userAgent.indexOf('WebKit') > 0 ? gadgets.rpctx.rmr :
           navigator.product === 'Gecko' ? gadgets.rpctx.frameElement :
           gadgets.rpctx.ifpc;
  }

  /**
   * Function passed to, and called by, a transport indicating it's ready to
   * send and receive messages.
   */
  function transportReady(receiverId, readySuccess) {
    var tx = transport;
    if (!readySuccess) {
      tx = fallbackTransport;
    }
    receiverTx[receiverId] = tx;

    // If there are any early-queued messages, send them now directly through
    // the needed transport.
    var earlyQueue = earlyRpcQueue[receiverId] || [];
    for (var i = 0; i < earlyQueue.length; ++i) {
      var rpc = earlyQueue[i];
      // There was no auth/rpc token set before, so set it now.
      rpc.t = getAuthToken(receiverId);
      tx.call(receiverId, rpc.f, rpc);
    }

    // Clear the queue so it won't be sent again.
    earlyRpcQueue[receiverId] = [];
  }

  //  Track when this main page is closed or navigated to a different location
  // ("unload" event).
  //  NOTE: The use of the "unload" handler here and for the relay iframe
  // prevents the use of the in-memory page cache in modern browsers.
  // See: https://developer.mozilla.org/en/using_firefox_1.5_caching
  // See: http://webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
  var mainPageUnloading = false,
      hookedUnload = false;
  
  function hookMainPageUnload() {
    if ( hookedUnload ) {
      return;
    }
    function onunload() {
      mainPageUnloading = true;
    }
    gadgets.util.attachBrowserEvent(window, 'unload', onunload, false);
    hookedUnload = true;
  }

  function relayOnload(targetId, sourceId, token, data, relayWindow) {
    // Validate auth token.
    if (!authToken[sourceId] || authToken[sourceId] !== token) {
      gadgets.error("Invalid auth token. " + authToken[sourceId] + " vs " + token);
      securityCallback(sourceId, FORGED_MSG);
    }
    
    relayWindow.onunload = function() {
      if (setup[sourceId] && !mainPageUnloading) {
        securityCallback(sourceId, FRAME_PHISH);
        gadgets.rpc.removeReceiver(sourceId);
      }
    };
    hookMainPageUnload();
    
    data = gadgets.json.parse(decodeURIComponent(data));
    transport.relayOnload(sourceId, data);
  }

  /**
   * Helper function to process an RPC request
   * @param {Object} rpc RPC request object
   * @private
   */
  function process(rpc) {
    //
    // RPC object contents:
    //   s: Service Name
    //   f: From
    //   c: The callback ID or 0 if none.
    //   a: The arguments for this RPC call.
    //   t: The authentication token.
    //
    if (rpc && typeof rpc.s === 'string' && typeof rpc.f === 'string' &&
        rpc.a instanceof Array) {

      // Validate auth token.
      if (authToken[rpc.f]) {
        // We don't do type coercion here because all entries in the authToken
        // object are strings, as are all url params. See setupReceiver(...).
        if (authToken[rpc.f] !== rpc.t) {
          gadgets.error("Invalid auth token. " + authToken[rpc.f] + " vs " + rpc.t);
          securityCallback(rpc.f, FORGED_MSG);
        }
      }

      if (rpc.s === ACK) {
        // Acknowledgement API, used to indicate a receiver is ready.
        window.setTimeout(function() { transportReady(rpc.f, true); }, 0);
        return;
      }

      // If there is a callback for this service, attach a callback function
      // to the rpc context object for asynchronous rpc services.
      //
      // Synchronous rpc request handlers should simply ignore it and return a
      // value as usual.
      // Asynchronous rpc request handlers, on the other hand, should pass its
      // result to this callback function and not return a value on exit.
      //
      // For example, the following rpc handler passes the first parameter back
      // to its rpc client with a one-second delay.
      //
      // function asyncRpcHandler(param) {
      //   var me = this;
      //   setTimeout(function() {
      //     me.callback(param);
      //   }, 1000);
      // }
      if (rpc.c) {
        rpc.callback = function(result) {
          gadgets.rpc.call(rpc.f, CALLBACK_NAME, null, rpc.c, result);
        };
      }

      // Call the requested RPC service.
      var result = (services[rpc.s] ||
                    services[DEFAULT_NAME]).apply(rpc, rpc.a);

      // If the rpc request handler returns a value, immediately pass it back
      // to the callback. Otherwise, do nothing, assuming that the rpc handler
      // will make an asynchronous call later.
      if (rpc.c && typeof result !== 'undefined') {
        gadgets.rpc.call(rpc.f, CALLBACK_NAME, null, rpc.c, result);
      }
    }
  }

  /**
   * Helper method returning a canonicalized protocol://host[:port] for
   * a given input URL, provided as a string. Used to compute convenient
   * relay URLs and to determine whether a call is coming from the same
   * domain as its receiver (bypassing the try/catch capability detection
   * flow, thereby obviating Firebug and other tools reporting an exception).
   *
   * @param {string} url Base URL to canonicalize.
   * @memberOf gadgets.rpc
   */

  function getOrigin(url) {
    if (!url) {
      return "";
    }
    url = url.toLowerCase();
    if (url.indexOf("//") == 0) {
      url = window.location.protocol + url;
    }
    if (url.indexOf("://") == -1) {
      // Assumed to be schemaless. Default to current protocol.
      url = window.location.protocol + "//" + url;
    }
    // At this point we guarantee that "://" is in the URL and defines
    // current protocol. Skip past this to search for host:port.
    var host = url.substring(url.indexOf("://") + 3);

    // Find the first slash char, delimiting the host:port.
    var slashPos = host.indexOf("/");
    if (slashPos != -1) {
      host = host.substring(0, slashPos);
    }

    var protocol = url.substring(0, url.indexOf("://"));

    // Use port only if it's not default for the protocol.
    var portStr = "";
    var portPos = host.indexOf(":");
    if (portPos != -1) {
      var port = host.substring(portPos + 1);
      host = host.substring(0, portPos);
      if ((protocol === "http" && port !== "80") ||
          (protocol === "https" && port !== "443")) {
        portStr = ":" + port;
      }
    }

    // Return <protocol>://<host>[<port>]
    return protocol + "://" + host + portStr;
  }

  function getTargetWin(id) {
    if (typeof id === "undefined" ||
        id === "..") {
      return window.parent;
    }

    // Cast to a String to avoid an index lookup.
    id = String(id);
    
    // Try window.frames first
    var target = window.frames[id];
    if (target) {
      return target;
    }
    
    // Fall back to getElementById()
    target = document.getElementById(id);
    if (target && target.contentWindow) {
      return target.contentWindow;
    }

    return null;
  }

  // Pick the most efficient RPC relay mechanism.
  var transport = getTransport();

  // Create the Default RPC handler.
  services[DEFAULT_NAME] = function() {
    gadgets.warn('Unknown RPC service: ' + this.s);
  };

  // Create a Special RPC handler for callbacks.
  services[CALLBACK_NAME] = function(callbackId, result) {
    var callback = callbacks[callbackId];
    if (callback) {
      delete callbacks[callbackId];
      callback(result);
    }
  };

  /**
   * Conducts any frame-specific work necessary to setup
   * the channel type chosen. This method is called when
   * the container page first registers the gadget in the
   * RPC mechanism. Gadgets, in turn, will complete the setup
   * of the channel once they send their first messages.
   */
  function setupFrame(frameId, token, forcesecure) {
    if (setup[frameId] === true) {
      return;
    }

    if (typeof setup[frameId] === 'undefined') {
      setup[frameId] = 0;
    }

    var tgtFrame = document.getElementById(frameId);
    if (frameId === '..' || tgtFrame != null) {
      if (transport.setup(frameId, token, forcesecure) === true) {
        setup[frameId] = true;
        return;
      }
    }

    if (setup[frameId] !== true && setup[frameId]++ < SETUP_FRAME_MAX_TRIES) {
      // Try again in a bit, assuming that frame will soon exist.
      window.setTimeout(function() { setupFrame(frameId, token, forcesecure) },
                        SETUP_FRAME_TIMEOUT);
    } else {
      // Fail: fall back for this gadget.
      receiverTx[frameId] = fallbackTransport;
      setup[frameId] = true;
    }
  }

  /**
   * Attempts to make an rpc by calling the target's receive method directly.
   * This works when gadgets are rendered on the same domain as their container,
   * a potentially useful optimization for trusted content which keeps
   * RPC behind a consistent interface.
   *
   * @param {string} target Module id of the rpc service provider
   * @param {Object} rpc RPC data
   * @return {boolean}
   */
  function callSameDomain(target, rpc) {
    if (typeof sameDomain[target] === 'undefined') {
      // Seed with a negative, typed value to avoid
      // hitting this code path repeatedly.
      sameDomain[target] = false;
      var targetRelay = gadgets.rpc.getRelayUrl(target);
      if (getOrigin(targetRelay) !== getOrigin(window.location.href)) {
        // Not worth trying -- avoid the error and just return.
        return false;
      }

      var targetEl = getTargetWin(target);
      try {
        // If this succeeds, then same-domain policy applied
        sameDomain[target] = targetEl.gadgets.rpc.receiveSameDomain;
      } catch (e) {
        // Shouldn't happen due to origin check. Caught to emit
        // more meaningful error to the caller.
        gadgets.error("Same domain call failed: parent= incorrectly set.");
      }
    }

    if (typeof sameDomain[target] === 'function') {
      // Call target's receive method
      sameDomain[target](rpc);
      return true;
    }

    return false;
  }

  /**
   * Sets the relay URL of a target frame.
   * @param {string} targetId Name of the target frame.
   * @param {string} url Full relay URL of the target frame.
   * @param {boolean=} opt_useLegacy True if this relay needs the legacy IFPC
   *     wire format.
   *
   * @member gadgets.rpc
   * @deprecated
   */
  function setRelayUrl(targetId, url, opt_useLegacy) {
    // make URL absolute if necessary
    if (!/http(s)?:\/\/.+/.test(url)) {
      if (url.indexOf("//") == 0) {
        url = window.location.protocol + url;
      } else if (url.charAt(0) == '/') {
        url = window.location.protocol + "//" + window.location.host + url;
      } else if (url.indexOf("://") == -1) {
        // Assumed to be schemaless. Default to current protocol.
        url = window.location.protocol + "//" + url;
      }
    }
    relayUrl[targetId] = url;
    useLegacyProtocol[targetId] = !!opt_useLegacy;
  }

  /**
   * Helper method to retrieve the authToken for a given gadget.
   * Not to be used directly.
   * @member gadgets.rpc
   * @return {string}
   */
  function getAuthToken(targetId) {
    return authToken[targetId];
  }

  /**
   * Sets the auth token of a target frame.
   * @param {string} targetId Name of the target frame.
   * @param {string} token The authentication token to use for all
   *     calls to or from this target id.
   *
   * @member gadgets.rpc
   * @deprecated
   */
  function setAuthToken(targetId, token, forcesecure) {
    token = token || "";

    // Coerce token to a String, ensuring that all authToken values
    // are strings. This ensures correct comparison with URL params
    // in the process(rpc) method.
    authToken[targetId] = String(token);

    setupFrame(targetId, token, forcesecure);
  }

  function setupContainerGadgetContext(rpctoken, opt_forcesecure) {
    /**
     * Initializes gadget to container RPC params from the provided configuration.
     */
    function init(config) {
      var configRpc = config ? config.rpc : {};
      var parentRelayUrl = configRpc.parentRelayUrl;

      // Allow for wild card parent relay files as long as it's from a
      // white listed domain. This is enforced by the rendering servlet.
      if (parentRelayUrl.substring(0, 7) !== 'http://' &&
          parentRelayUrl.substring(0, 8) !== 'https://' &&
          parentRelayUrl.substring(0, 2) !== '//') {
        // Relative path: we append to the parent.
        // We're relying on the server validating the parent parameter in this
        // case. Because of this, parent may only be passed in the query, not fragment.
        if (typeof params.parent === "string" && params.parent !== "") {
          // Otherwise, relayUrl['..'] will be null, signaling transport
          // code to ignore rpc calls since they cannot work without a
          // relay URL with host qualification.
          if (parentRelayUrl.substring(0, 1) !== '/') {
            // Path-relative. Trust that parent is passed in appropriately.
            var lastSlash = params.parent.lastIndexOf('/');
            parentRelayUrl = params.parent.substring(0, lastSlash + 1) + parentRelayUrl;
          } else {
            // Host-relative.
            parentRelayUrl = getOrigin(params.parent) + parentRelayUrl;
          }
        }
      }

      var useLegacy = !!configRpc.useLegacyProtocol;
      setRelayUrl('..', parentRelayUrl, useLegacy);

      if (useLegacy) {
        transport = gadgets.rpctx.ifpc;
        transport.init(process, transportReady);
      }

      // Sets the auth token and signals transport to setup connection to container.
      var forceSecure = opt_forcesecure || params.forcesecure || false;
      setAuthToken('..', rpctoken, forceSecure);
    }

    var requiredConfig = {
      parentRelayUrl : gadgets.config.NonEmptyStringValidator
    };
    gadgets.config.register("rpc", requiredConfig, init);
  }

  function setupContainerGenericIframe(rpctoken, opt_parent, opt_forcesecure) {
    // Generic child IFRAME setting up connection w/ its container.
    // Use the opt_parent param if provided, or the "parent" query param
    // if found -- otherwise, do nothing since this call might be initiated
    // automatically at first, then actively later in IFRAME code.
    var forcesecure = opt_forcesecure || params.forcesecure || false;
    var parent = opt_parent || params.parent;
    if (parent) {
      setRelayUrl('..', parent);
      setAuthToken('..', rpctoken, forcesecure);
    }
  }

  function setupChildIframe(gadgetId, opt_frameurl, opt_authtoken, opt_forcesecure) {
    if (!gadgets.util) {
      return;
    }
    var childIframe = document.getElementById(gadgetId);
    if (!childIframe) {
      throw new Error("Cannot set up gadgets.rpc receiver with ID: " + gadgetId +
          ", element not found.");
    }

    // The "relay URL" can either be explicitly specified or is set as
    // the child IFRAME URL verbatim.
    var relayUrl = opt_frameurl || childIframe.src;
    setRelayUrl(gadgetId, relayUrl);

    // The auth token is parsed from child params (rpctoken) or overridden.
    var childParams = gadgets.util.getUrlParameters(childIframe.src);
    var rpctoken = opt_authtoken || childParams.rpctoken;
    var forcesecure = opt_forcesecure || childParams.forcesecure;
    setAuthToken(gadgetId, rpctoken, forcesecure);
  }

  /**
   * Sets up the gadgets.rpc library to communicate with the receiver.
   * <p>This method replaces setRelayUrl(...) and setAuthToken(...)
   *
   * <p>Simplified instructions - highly recommended:
   * <ol>
   * <li> Generate &lt;iframe id="&lt;ID&gt;" src="...#parent=&lt;PARENTURL&gt;&rpctoken=&lt;RANDOM&gt;"/&gt;
   *      and add to DOM.
   * <li> Call gadgets.rpc.setupReceiver("&lt;ID>");
   *      <p>All parent/child communication initializes automatically from here.
   *         Naturally, both sides need to include the library.
   * </ol>
   *
   * <p>Detailed container/parent instructions:
   * <ol>
   * <li> Create the target IFRAME (eg. gadget) with a given &lt;ID> and params
   *    rpctoken=<token> (eg. #rpctoken=1234), which is a random/unguessbable
   *    string, and parent=&lt;url>, where &lt;url> is the URL of the container.
   * <li> Append IFRAME to the document.
   * <li> Call gadgets.rpc.setupReceiver(&lt;ID>)
   * <p>[Optional]. Strictly speaking, you may omit rpctoken and parent. This
   *             practice earns little but is occasionally useful for testing.
   *             If you omit parent, you MUST pass your container URL as the 2nd
   *             parameter to this method.
   * </ol>
   *
   * <p>Detailed gadget/child IFRAME instructions:
   * <ol>
   * <li> If your container/parent passed parent and rpctoken params (query string
   *    or fragment are both OK), you needn't do anything. The library will self-
   *    initialize.
   * <li> If "parent" is omitted, you MUST call this method with targetId '..'
   *    and the second param set to the parent URL.
   * <li> If "rpctoken" is omitted, but the container set an authToken manually
   *    for this frame, you MUST pass that ID (however acquired) as the 2nd param
   *    to this method.
   * </ol>
   *
   * @member gadgets.rpc
   * @param {string} targetId
   * @param {string=} opt_receiverurl
   * @param {string=} opt_authtoken
   * @param {boolean=} opt_forcesecure
   */
  function setupReceiver(targetId, opt_receiverurl, opt_authtoken, opt_forcesecure) {
    if (targetId === '..') {
      // Gadget/IFRAME to container.
      var rpctoken = opt_authtoken || params.rpctoken || params.ifpctok || "";
      if (window['__isgadget'] === true) {
        setupContainerGadgetContext(rpctoken, opt_forcesecure);
      } else {
        setupContainerGenericIframe(rpctoken, opt_receiverurl, opt_forcesecure);
      }
    } else {
      // Container to child.
      setupChildIframe(targetId, opt_receiverurl, opt_authtoken, opt_forcesecure);
    }
  }

  return /** @scope gadgets.rpc */ {
    config: function(config) {
      if (typeof config.securityCallback === 'function') {
        securityCallback = config.securityCallback;
      }
    },
    
    /**
     * Registers an RPC service.
     * @param {string} serviceName Service name to register.
     * @param {function(Object,Object)} handler Service handler.
     *
     * @member gadgets.rpc
     */
    register: function(serviceName, handler) {
      if (serviceName === CALLBACK_NAME || serviceName === ACK) {
        throw new Error("Cannot overwrite callback/ack service");
      }

      if (serviceName === DEFAULT_NAME) {
        throw new Error("Cannot overwrite default service:"
                        + " use registerDefault");
      }

      services[serviceName] = handler;
    },

    /**
     * Unregisters an RPC service.
     * @param {string} serviceName Service name to unregister.
     *
     * @member gadgets.rpc
     */
    unregister: function(serviceName) {
      if (serviceName === CALLBACK_NAME || serviceName === ACK) {
        throw new Error("Cannot delete callback/ack service");
      }

      if (serviceName === DEFAULT_NAME) {
        throw new Error("Cannot delete default service:"
                        + " use unregisterDefault");
      }

      delete services[serviceName];
    },

    /**
     * Registers a default service handler to processes all unknown
     * RPC calls which raise an exception by default.
     * @param {function(Object,Object)} handler Service handler.
     *
     * @member gadgets.rpc
     */
    registerDefault: function(handler) {
      services[DEFAULT_NAME] = handler;
    },

    /**
     * Unregisters the default service handler. Future unknown RPC
     * calls will fail silently.
     *
     * @member gadgets.rpc
     */
    unregisterDefault: function() {
      delete services[DEFAULT_NAME];
    },

    /**
     * Forces all subsequent calls to be made by a transport
     * method that allows the caller to verify the message receiver
     * (by way of the parent parameter, through getRelayUrl(...)).
     * At present this means IFPC or WPM.
     * @member gadgets.rpc
     */
    forceParentVerifiable: function() {
      if (!transport.isParentVerifiable()) {
        transport = gadgets.rpctx.ifpc;
      }
    },

    /**
     * Calls an RPC service.
     * @param {string} targetId Module Id of the RPC service provider.
     *                          Empty if calling the parent container.
     * @param {string} serviceName Service name to call.
     * @param {function()|null} callback Callback function (if any) to process
     *                                 the return value of the RPC request.
     * @param {*} var_args Parameters for the RPC request.
     *
     * @member gadgets.rpc
     */
    call: function(targetId, serviceName, callback, var_args) {
      targetId = targetId || '..';
      // Default to the container calling.
      var from = '..';

      if (targetId === '..') {
        from = rpcId;
      }

      ++callId;
      if (callback) {
        callbacks[callId] = callback;
      }

      var rpc = {
        s: serviceName,
        f: from,
        c: callback ? callId : 0,
        a: Array.prototype.slice.call(arguments, 3),
        t: authToken[targetId],
        l: useLegacyProtocol[targetId]
      };

      if (targetId !== '..' && !document.getElementById(targetId)) {
        // The target has been removed from the DOM. Don't even try.
        gadgets.log("WARNING: attempted send to nonexistent frame: " + targetId);
        return;
      }

      // If target is on the same domain, call method directly
      if (callSameDomain(targetId, rpc)) {
        return;
      }

      // Attempt to make call via a cross-domain transport.
      // Retrieve the transport for the given target - if one
      // target is misconfigured, it won't affect the others.
      var channel = receiverTx[targetId];

      if (!channel) {
        // Not set up yet. Enqueue the rpc for such time as it is.
        if (!earlyRpcQueue[targetId]) {
          earlyRpcQueue[targetId] = [ rpc ];
        } else {
          earlyRpcQueue[targetId].push(rpc);
        }
        return;
      }

      // If we are told to use the legacy format, then we must
      // default to IFPC.
      if (useLegacyProtocol[targetId]) {
        channel = gadgets.rpctx.ifpc;
      }

      if (channel.call(targetId, from, rpc) === false) {
        // Fall back to IFPC. This behavior may be removed as IFPC is as well.
        receiverTx[targetId] = fallbackTransport;
        transport.call(targetId, from, rpc);
      }
    },

    /**
     * Gets the relay URL of a target frame.
     * @param {string} targetId Name of the target frame.
     * @return {string|undefined} Relay URL of the target frame.
     *
     * @member gadgets.rpc
     */
    getRelayUrl: function(targetId) {
      var url = relayUrl[targetId];
      // Some RPC methods (wpm, for one) are unhappy with schemeless URLs.
      if (url && url.substring(0,1) === '/') {
        if (url.substring(1,2) === '/') {    // starts with '//'
          url = document.location.protocol + url;
        } else {    // relative URL, starts with '/'
          url = document.location.protocol + '//' + document.location.host + url;
        }
      }
      
      return url;
    },

    setRelayUrl: setRelayUrl,
    setAuthToken: setAuthToken,
    setupReceiver: setupReceiver,
    getAuthToken: getAuthToken,
    
    // Note: Does not delete iframe
    removeReceiver: function(receiverId) {
      delete relayUrl[receiverId];
      delete useLegacyProtocol[receiverId];
      delete authToken[receiverId];
      delete setup[receiverId];
      delete sameDomain[receiverId];
      delete receiverTx[receiverId];
    },

    /**
     * Gets the RPC relay mechanism.
     * @return {string} RPC relay mechanism. See above for
     *   a list of supported types.
     *
     * @member gadgets.rpc
     */
    getRelayChannel: function() {
      return transport.getCode();
    },

    /**
     * Receives and processes an RPC request. (Not to be used directly.)
     * Only used by IFPC.
     * @param {Array.<string>} fragment An RPC request fragment encoded as
     *        an array. The first 4 elements are target id, source id & call id,
     *        total packet number, packet id. The last element stores the actual
     *        JSON-encoded and URI escaped packet data.
     *
     * @member gadgets.rpc
     * @deprecated
     */
    receive: function(fragment, otherWindow) {
      if (fragment.length > 4) {
        process(gadgets.json.parse(
            decodeURIComponent(fragment[fragment.length - 1])));
      } else {
        relayOnload.apply(null, fragment.concat(otherWindow));
      }
    },

    /**
     * Receives and processes an RPC request sent via the same domain.
     * (Not to be used directly). Converts the inbound rpc object's
     * Array into a local Array to pass the process() Array test.
     * @param {Object} rpc RPC object containing all request params
     * @member gadgets.rpc
     */
    receiveSameDomain: function(rpc) {
      // Pass through to local process method but converting to a local Array
      rpc.a = Array.prototype.slice.call(rpc.a);
      window.setTimeout(function() { process(rpc); }, 0);
    },

    // Helper method to get the protocol://host:port of an input URL.
    // see docs above
    getOrigin: getOrigin,

    getReceiverOrigin: function(receiverId) {
      var channel = receiverTx[receiverId];
      if (!channel) {
        // not set up yet
        return null;
      }
      if (!channel.isParentVerifiable(receiverId)) {
        // given transport cannot verify receiver origin
        return null;
      }
      var origRelay = gadgets.rpc.getRelayUrl(receiverId) ||
                      gadgets.util.getUrlParameters().parent;
      return gadgets.rpc.getOrigin(origRelay);
    },

    /**
     * Internal-only method used to initialize gadgets.rpc.
     * @member gadgets.rpc
     */
    init: function() {
      // Conduct any global setup necessary for the chosen transport.
      // Do so after gadgets.rpc definition to allow transport to access
      // gadgets.rpc methods.
      if (transport.init(process, transportReady) === false) {
        transport = fallbackTransport;
      }
      if (isChild) {
        setupReceiver('..');
      }
    },

    /** Returns the window keyed by the ID. null/".." for parent, else child */
    _getTargetWin: getTargetWin,

    /** Create an iframe for loading the relay URL. Used by child only. */ 
    _createRelayIframe: function(token, data) {
      var relay = gadgets.rpc.getRelayUrl('..');
      if (!relay) {
        return null;
      }
      
      // Format: #targetId & sourceId & authToken & data
      var src = relay + '#..&' + rpcId + '&' + token + '&' +
          encodeURIComponent(gadgets.json.stringify(data));
  
      var iframe = document.createElement('iframe');
      iframe.style.border = iframe.style.width = iframe.style.height = '0px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';

      function appendFn() {
        // Append the iframe.
        document.body.appendChild(iframe);
  
        // Set the src of the iframe to 'about:blank' first and then set it
        // to the relay URI. This prevents the iframe from maintaining a src
        // to the 'old' relay URI if the page is returned to from another.
        // In other words, this fixes the bfcache issue that causes the iframe's
        // src property to not be updated despite us assigning it a new value here.
        iframe.src = 'javascript:"<html></html>"';
        iframe.src = src;
      }
      
      if (document.body) {
        appendFn();
      } else {
        gadgets.util.registerOnLoadHandler(function() { appendFn(); });
      }
      
      return iframe;
    },

    ACK: ACK,

    RPC_ID: rpcId,
    
    SEC_ERROR_LOAD_TIMEOUT: LOAD_TIMEOUT,
    SEC_ERROR_FRAME_PHISH: FRAME_PHISH,
    SEC_ERROR_FORGED_MSG : FORGED_MSG
  };
}();

// Initialize library/transport.
gadgets.rpc.init();

} // !end of double-inclusion guard
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*global ActiveXObject, DOMParser */
/*global shindig */

/**
 * @fileoverview Provides remote content retrieval facilities.
 *     Available to every gadget.
 */

/**
 * @static
 * @class Provides remote content retrieval functions.
 * @name gadgets.io
 */

gadgets.io = function() {
  /**
   * Holds configuration-related data such as proxy urls.
   */
  var config = {};

  /**
   * Holds state for OAuth.
   */
  var oauthState;

  /**
   * Internal facility to create an xhr request.
   */
  function makeXhr() {
    var x; 
    if (typeof shindig != 'undefined' &&
        shindig.xhrwrapper &&
        shindig.xhrwrapper.createXHR) {
      return shindig.xhrwrapper.createXHR();
    } else if (typeof ActiveXObject != 'undefined') {
      x = new ActiveXObject("Msxml2.XMLHTTP");
      if (!x) {
        x = new ActiveXObject("Microsoft.XMLHTTP");
      }
      return x;
    }
    // The second construct is for the benefit of jsunit...
    else if (typeof XMLHttpRequest != 'undefined' || window.XMLHttpRequest) {
      return new window.XMLHttpRequest();
    }
    else throw("no xhr available");
  }

  /**
   * Checks the xobj for errors, may call the callback with an error response
   * if the error is fatal.
   *
   * @param {Object} xobj The XHR object to check
   * @param {function(Object)} callback The callback to call if the error is fatal
   * @return {boolean} true if the xobj is not ready to be processed
   */
  function hadError(xobj, callback) {
    if (xobj.readyState !== 4) {
      return true;
    }
    try {
      if (xobj.status !== 200) {
      	var error = ("" + xobj.status);
      	if(xobj.responseText) {
      	  error = error + " " + xobj.responseText;
      	}
        callback({
          errors : [error],
          rc : xobj.status,
          text : xobj.responseText
          });
        return true;
      }
    } catch(e) {
      callback({
         errors : [e.number + " Error not specified"],
          rc : e.number,
          text : e.description
      });
      return true;
    }
    return false;
  }

  /**
   * Handles non-proxied XHR callback processing.
   *
   * @param {string} url
   * @param {function(Object)} callback
   * @param {Object} params
   * @param {Object} xobj
   */
  function processNonProxiedResponse(url, callback, params, xobj) {
    if (hadError(xobj, callback)) {
      return;
    }
    var data = {
      body: xobj.responseText
    };
    callback(transformResponseData(params, data));
  }

  var UNPARSEABLE_CRUFT = "throw 1; < don't be evil' >";

  /**
   * Handles XHR callback processing.
   *
   * @param {string} url
   * @param {function(Object)} callback
   * @param {Object} params
   * @param {Object} xobj
   */ 
  function processResponse(url, callback, params, xobj) {
    if (hadError(xobj, callback)) {
      return;
    }
    var txt = xobj.responseText;
    
    // remove unparseable cruft used to prevent cross-site script inclusion
    var offset = txt.indexOf(UNPARSEABLE_CRUFT) + UNPARSEABLE_CRUFT.length;

    // If no cruft then just return without a callback - avoid JS errors
    // TODO craft an error response?
    if (offset < UNPARSEABLE_CRUFT.length) return;
    txt = txt.substr(offset)

    // We are using eval directly here  because the outer response comes from a
    // trusted source, and json parsing is slow in IE.
    var data = eval("(" + txt + ")");
    data = data[url];
    // Save off any transient OAuth state the server wants back later.
    if (data.oauthState) {
      oauthState = data.oauthState;
    }
    // Update the security token if the server sent us a new one
    if (data.st) {
      shindig.auth.updateSecurityToken(data.st);
    }
    callback(transformResponseData(params, data));
  }

  /**
   * @param {Object} params
   * @param {Object} data
   * @return {Object}
   */

  function transformResponseData(params, data) {
    // Sometimes rc is not present, generally when used
    // by jsonrpccontainer, so assume 200 in its absence.
    var resp = {
     text: data.body,
     rc: data.rc || 200,
     headers: data.headers,
     oauthApprovalUrl: data.oauthApprovalUrl,
     oauthError: data.oauthError,
     oauthErrorText: data.oauthErrorText,
     errors: []
    };

    if (resp.rc < 200 || resp.rc >= 400){
    	resp.errors = [resp.rc + " Error"];
    } else if (resp.text) {
      if (resp.rc >= 300 && resp.rc < 400) {
        // Redirect pages will usually contain arbitrary
        // HTML which will fail during parsing, inadvertently
        // causing a 500 response. Thus we treat as text.
        params.CONTENT_TYPE = "TEXT";
      }
      switch (params.CONTENT_TYPE) {
        case "JSON":
        case "FEED":
          resp.data = gadgets.json.parse(resp.text);
          if (!resp.data) {
            resp.errors.push("500 Failed to parse JSON");
            resp.rc = 500;
            resp.data = null;
          }
          break;
        case "DOM":
          var dom;
          if (typeof ActiveXObject != 'undefined') {
            dom = new ActiveXObject("Microsoft.XMLDOM");
            dom.async = false;
            dom.validateOnParse = false;
            dom.resolveExternals = false;
            if (!dom.loadXML(resp.text)) {
              resp.errors.push("500 Failed to parse XML");
              resp.rc = 500;
            } else {
              resp.data = dom;
            }
          } else {
            var parser = new DOMParser();
            dom = parser.parseFromString(resp.text, "text/xml");
            if ("parsererror" === dom.documentElement.nodeName) {
              resp.errors.push("500 Failed to parse XML");
              resp.rc = 500;
            } else {
              resp.data = dom;
            }
          }
          break;
        default:
          resp.data = resp.text;
          break;
      }
  }
    return resp;
  }

  /**
   * Sends an XHR post or get request
   *
   * @param {string} realUrl The url to fetch data from that was requested by the gadget
   * @param {string} proxyUrl The url to proxy through
   * @param {function()} callback The function to call once the data is fetched
   * @param {Object} paramData The params to use when processing the response
   * @param {function(string,function(Object),Object,Object)} 
   *     processResponseFunction The function that should process the
   *     response from the sever before calling the callback
   * @param {string=} opt_contentType - Optional content type defaults to
   *     'application/x-www-form-urlencoded'
   */
  function makeXhrRequest(realUrl, proxyUrl, callback, paramData, method,
      params, processResponseFunction, opt_contentType) {
    var xhr = makeXhr();

    if (proxyUrl.indexOf('//') == 0) {
      proxyUrl = document.location.protocol + proxyUrl;
    }
    
    xhr.open(method, proxyUrl, true);
    if (callback) {
      xhr.onreadystatechange = gadgets.util.makeClosure(
          null, processResponseFunction, realUrl, callback, params, xhr);
    }
    if (paramData !== null) {
      xhr.setRequestHeader('Content-Type', opt_contentType || 'application/x-www-form-urlencoded');
      xhr.send(paramData);
    } else {
      xhr.send(null);
    }
  }



  /**
   * Satisfy a request with data that is prefetched as per the gadget Preload
   * directive. The preloader will only satisfy a request for a specific piece
   * of content once.
   *
   * @param {Object} postData The definition of the request to be executed by the proxy
   * @param {Object} params The params to use when processing the response
   * @param {function(Object)} callback The function to call once the data is fetched
   * @return {boolean} true if the request can be satisfied by the preloaded 
   *         content false otherwise
   */
  function respondWithPreload(postData, params, callback) {
    if (gadgets.io.preloaded_ && postData.httpMethod === "GET") {
      for (var i = 0; i < gadgets.io.preloaded_.length; i++) {
        var preload = gadgets.io.preloaded_[i];
        if (preload && (preload.id === postData.url)) {
          // Only satisfy once
          delete gadgets.io.preloaded_[i];

          if (preload.rc !== 200) {
            callback({rc: preload.rc, errors : [preload.rc + " Error"]});
          } else {
            if (preload.oauthState) {
              oauthState = preload.oauthState;
            }
            var resp = {
              body: preload.body,
              rc: preload.rc,
              headers: preload.headers,
              oauthApprovalUrl: preload.oauthApprovalUrl,
              oauthError: preload.oauthError,
              oauthErrorText: preload.oauthErrorText,
              errors: []
            };
            callback(transformResponseData(params, resp));
          }
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @param {Object} configuration Configuration settings
   * @private
   */
  function init (configuration) {
    config = configuration["core.io"] || {};
  }

  var requiredConfig = {
    proxyUrl: new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),
    jsonProxyUrl: gadgets.config.NonEmptyStringValidator
  };
  gadgets.config.register("core.io", requiredConfig, init);

  return /** @scope gadgets.io */ {
    /**
     * Fetches content from the provided URL and feeds that content into the
     * callback function.
     *
     * Example:
     * <pre>
     * gadgets.io.makeRequest(url, fn,
     *    {contentType: gadgets.io.ContentType.FEED});
     * </pre>
     *
     * @param {string} url The URL where the content is located
     * @param {function(Object)} callback The function to call with the data from
     *     the URL once it is fetched
     * @param {Object.<gadgets.io.RequestParameters, Object>=} opt_params
     *     Additional
     *     <a href="gadgets.io.RequestParameters.html">parameters</a>
     *     to pass to the request
     *
     * @member gadgets.io
     */
    makeRequest : function (url, callback, opt_params) {
      // TODO: This method also needs to respect all members of
      // gadgets.io.RequestParameters, and validate them.

      var params = opt_params || {};

      var httpMethod = params.METHOD || "GET";
      var refreshInterval = params.REFRESH_INTERVAL;

      // Check if authorization is requested
      var auth, st;
      if (params.AUTHORIZATION && params.AUTHORIZATION !== "NONE") {
        auth = params.AUTHORIZATION.toLowerCase();
        st = shindig.auth.getSecurityToken();
      } else {
        // Unauthenticated GET requests are cacheable
        if (httpMethod === "GET" && refreshInterval === undefined) {
          refreshInterval = 3600;
        }
      }

      // Include owner information?
      var signOwner = true;
      if (typeof params.OWNER_SIGNED !== "undefined") {
        signOwner = params.OWNER_SIGNED;
      }

      // Include viewer information?
      var signViewer = true;
      if (typeof params.VIEWER_SIGNED !== "undefined") {
        signViewer = params.VIEWER_SIGNED;
      }

      var headers = params.HEADERS || {};
      if (httpMethod === "POST" && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
      }

      var urlParams = gadgets.util.getUrlParameters();

      var paramData = {
        url: url,
        httpMethod : httpMethod,
        headers: gadgets.io.encodeValues(headers, false),
        postData : params.POST_DATA || "",
        authz : auth || "",
        st : st || "",
        contentType : params.CONTENT_TYPE || "TEXT",
        numEntries : params.NUM_ENTRIES || "3",
        getSummaries : !!params.GET_SUMMARIES,
        signOwner : signOwner,
        signViewer : signViewer,
        gadget : urlParams.url,
        container : urlParams.container || urlParams.synd || "default",
        // should we bypass gadget spec cache (e.g. to read OAuth provider URLs)
        bypassSpecCache : gadgets.util.getUrlParameters().nocache || "",
        getFullHeaders : !!params.GET_FULL_HEADERS
      };

      // OAuth goodies
      if (auth === "oauth" || auth === "signed") {
        if (gadgets.io.oauthReceivedCallbackUrl_) {
          paramData.OAUTH_RECEIVED_CALLBACK = gadgets.io.oauthReceivedCallbackUrl_;
          gadgets.io.oauthReceivedCallbackUrl_ = null;
        }
        paramData.oauthState = oauthState || "";
        // Just copy the OAuth parameters into the req to the server
        for (var opt in params) {
          if (params.hasOwnProperty(opt)) {
            if (opt.indexOf("OAUTH_") === 0) {
              paramData[opt] = params[opt];
            }
          }
        }
      }

      var proxyUrl = config.jsonProxyUrl.replace("%host%", document.location.host);

      // FIXME -- processResponse is not used in call
      if (!respondWithPreload(paramData, params, callback, processResponse)) {
        if (httpMethod === "GET" && refreshInterval > 0) {
          // this content should be cached
          // Add paramData to the URL
          var extraparams = "?refresh=" + refreshInterval + '&'
              + gadgets.io.encodeValues(paramData);

          makeXhrRequest(url, proxyUrl + extraparams, callback,
              null, "GET", params, processResponse);

        } else {
          makeXhrRequest(url, proxyUrl, callback,
              gadgets.io.encodeValues(paramData), "POST", params,
              processResponse);
        }
      }
    },

    /**
     * @private
     */
    makeNonProxiedRequest : function (relativeUrl, callback, opt_params, opt_contentType) {
      var params = opt_params || {};
      makeXhrRequest(relativeUrl, relativeUrl, callback, params.POST_DATA,
          params.METHOD, params, processNonProxiedResponse, opt_contentType);
    },

    /**
     * Used to clear out the oauthState, for testing only.
     *
     * @private
     */
    clearOAuthState : function () {
      oauthState = undefined;
    },

    /**
     * Converts an input object into a URL-encoded data string.
     * (key=value&amp;...)
     *
     * @param {Object} fields The post fields you wish to encode
     * @param {boolean=} opt_noEscaping An optional parameter specifying whether
     *     to turn off escaping of the parameters. Defaults to false.
     * @return {string} The processed post data in www-form-urlencoded format.
     *
     * @member gadgets.io
     */
    encodeValues : function (fields, opt_noEscaping) {
      var escape = !opt_noEscaping;

      var buf = [];
      var first = false;
      for (var i in fields) {
        if (fields.hasOwnProperty(i) && !/___$/.test(i)) {
          if (!first) {
            first = true;
          } else {
            buf.push("&");
          }
          buf.push(escape ? encodeURIComponent(i) : i);
          buf.push("=");
          buf.push(escape ? encodeURIComponent(fields[i]) : fields[i]);
        }
      }
      return buf.join("");
    },

    /**
     * Gets the proxy version of the passed-in URL.
     *
     * @param {string} url The URL to get the proxy URL for
     * @param {Object.<gadgets.io.RequestParameters, Object>=} opt_params Optional Parameter Object.
     *     The following properties are supported:
     *       .REFRESH_INTERVAL The number of seconds that this
     *           content should be cached.  Defaults to 3600.
     *
     * @return {string} The proxied version of the URL
     * @member gadgets.io
     */
    getProxyUrl : function (url, opt_params) {
      var params = opt_params || {};
      var refresh = params.REFRESH_INTERVAL;
      if (refresh === undefined) {
        refresh = "3600";
      }

      var urlParams = gadgets.util.getUrlParameters();

      var rewriteMimeParam =
          params.rewriteMime ? "&rewriteMime=" + encodeURIComponent(params.rewriteMime) : "";
      var ret = config.proxyUrl.replace("%url%", encodeURIComponent(url)).
          replace("%host%", document.location.host).
          replace("%rawurl%", url).
          replace("%refresh%", encodeURIComponent(refresh)).
          replace("%gadget%", encodeURIComponent(urlParams.url)).
          replace("%container%", encodeURIComponent(urlParams.container || urlParams.synd || "default")).
          replace("%rewriteMime%", rewriteMimeParam);
      if (ret.indexOf('//') == 0) {
        ret = window.location.protocol + ret;
      }
      return ret;
    }
  };
}();

gadgets.io.RequestParameters = gadgets.util.makeEnum([
  "METHOD",
  "CONTENT_TYPE",
  "POST_DATA",
  "HEADERS",
  "AUTHORIZATION",
  "NUM_ENTRIES",
  "GET_SUMMARIES",
  "GET_FULL_HEADERS",
  "REFRESH_INTERVAL",
  "OAUTH_SERVICE_NAME",
  "OAUTH_USE_TOKEN",
  "OAUTH_TOKEN_NAME",
  "OAUTH_REQUEST_TOKEN",
  "OAUTH_REQUEST_TOKEN_SECRET",
  "OAUTH_RECEIVED_CALLBACK"
]);

/**
 * @const
 */
gadgets.io.MethodType = gadgets.util.makeEnum([
  "GET", "POST", "PUT", "DELETE", "HEAD"
]);

/**
 * @const
 */
gadgets.io.ContentType = gadgets.util.makeEnum([
  "TEXT", "DOM", "JSON", "FEED"
]);

/**
 * @const
 */
gadgets.io.AuthorizationType = gadgets.util.makeEnum([
  "NONE", "SIGNED", "OAUTH"
]);
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @class
 * Tame and expose core gadgets.io.* API to cajoled gadgets
 */
var tamings___ = tamings___ || [];
tamings___.push(function(imports) {
  caja___.whitelistFuncs([
    [gadgets.io, 'encodeValues'],
    [gadgets.io, 'getProxyUrl'],
    [gadgets.io, 'makeRequest']
  ]);
});
;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Pure JS code for processing Uris.
 *
 * Unlike Java Shindig and other code, these Uris are mutable. While
 * this introduces some challenges, ultimately the confusion introduced
 * by passing around a Uri versus a UriBuilder in an untyped language
 * is too great.
 *
 * The class only implements core methods associated with Uris -
 * essentially the minimum required for various helper routines. Lazy evalution
 * of query and fragment params is chosen to avoid undue performance hit.
 * Further, only set operations are provided for query/fragment params,
 * in order to keep the API relatively small, yet sufficiently flexible. Values set to
 * null are equivalent to being removed, for instance.
 * 
 * Limitations include, but are not limited to:
 * + Multiple params with the same key not supported via set APIs.
 * + Full RPC-compliant parsing not supported. A "highly useful" subset is impl'd.
 * + Helper methods are all provided in the shindig.uri.full feature.
 * + Query and fragment do not contain their preceding ? and # chars.
 *
 * Example usage:
 * var uri = shindig.uri("http://www.apache.org");
 * uri.setPath("random.xml");
 * alert(uri.toString());  // Emits "http://www.apache.org/random.xml"
 * var other =  // resolve() provided in shindig.uri.full
 *     shindig.uri("http://www.other.com/foo").resolve("/bar").setQP({ hi: "bye" });
 * alert(other);  // Emits "http://other.com/bar?hi=bye"
 */
shindig.uri = (function() {
  var PARSE_REGEX = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");

  return function(opt_in) {
    var schema_ = "";
    var authority_ = "";
    var path_ = "";
    var query_ = "";
    var qparms_ = null;
    var fragment_ = "";
    var fparms_ = null;
    var unesc = window.decodeURIComponent ? decodeURIComponent : unescape;
    var esc = window.encodeURIComponent ? encodeURIComponent : escape;
    var bundle = null;

    function parseFrom(url) {
      if (url.match(PARSE_REGEX) === null) {
        throw "Malformed URL: " + url;
      }
      schema_ = RegExp.$1;
      authority_ = RegExp.$2;
      path_ = RegExp.$3;
      query_ = RegExp.$4;
      fragment_ = RegExp.$5;
    }

    function serializeParams(params) {
      var str = [];
      for (var i = 0, j = params.length; i < j; ++i) {
        var key = params[i][0];
        var val = params[i][1];
        if (val === undefined) {
          continue;
        }
        str.push(esc(key) + (val !== null ? '=' + esc(val) : ""));
      }
      return str.join('&');
    }

    function getQuery() {
      if (qparms_) {
        query_ = serializeParams(qparms_);
        qparms_ = null;
      }
      return query_;
    }

    function getFragment() {
      if (fparms_) {
        fragment_ = serializeParams(fparms_);
        fparms_ = null;
      }
      return fragment_;
    }

    function getQP(key) {
      qparms_ = qparms_ || parseParams(query_);
      return getParam(qparms_, key);
    }

    function getFP(key) {
      fparms_ = fparms_ || parseParams(fragment_);
      return getParam(fparms_, key);
    }

    function setQP(argOne, argTwo) {
      qparms_ = setParams(qparms_ || parseParams(query_), argOne, argTwo);
      return bundle;
    }

    function setFP(argOne, argTwo) {
      fparms_ = setParams(fparms_ || parseParams(fragment_), argOne, argTwo);
      return bundle;
    }
    
    function getOrigin() {
      return [
          schema_,
          schema_ !== "" ? ":" : "",
          authority_ !== "" ? "//" : "",
          authority_
      ].join("");
    }

    /**
     * Returns a readable representation of the URL.
     * 
     * @return {string} A readable URL.
     */
    function toString() {
      var query = getQuery();
      var fragment = getFragment();
      return [
        getOrigin(),
        path_,
        query !== "" ? "?" : "",
        query,
        fragment !== "" ? "#" : "",
        fragment
      ].join("");
    }

    function parseParams(str) {
      var params = [];
      var pairs = str.split("&");
      for (var i = 0, j = pairs.length; i < j; ++i) {
        var kv = pairs[i].split('=');
        var key = kv.shift();
        var value = null;
        if (kv.length > 0) {
          value = kv.join('').replace(/\+/g, " ");
        }
        params.push([ key, value != null ? unesc(value) : null ]);
      }
      return params;
    }

    function getParam(pmap, key) {
      for (var i = 0, j = pmap.length; i < j; ++i) {
        if (pmap[i][0] == key) {
          return pmap[i][1];
        }
      }
      // undefined = no key set
      // vs. null = no value set and "" = value is empty
      return undefined;
    }

    function setParams(pset, argOne, argTwo) {
      // Assume by default that we're setting by map (full replace).
      var newParams = argOne;
      if (typeof argOne === 'string') {
        // N/V set (single param override)
        newParams = {};
        newParams[argOne] = argTwo;
      }
      for (var key in newParams) {
        var found = false;
        for (var i = 0, j = pset.length; !found && i < j; ++i) {
          if (pset[i][0] == key) {
            pset[i][1] = newParams[key];
            found = true;
          }
        }
        if (!found) {
          pset.push([ key, newParams[key] ]);
        }
      }
      return pset;
    }

    function stripPrefix(str, pfx) {
      str = str || "";
      if (str[0] === pfx) {
        str = str.substr(pfx.length);
      }
      return str;
    }

    // CONSTRUCTOR
    if (typeof opt_in === "object" &&
        typeof opt_in.toString === "function") {
      // Assume it's another shindig.uri, or something that can be parsed from one.
      parseFrom(opt_in.toString());
    } else if (opt_in) {
      parseFrom(opt_in);
    }

    bundle = {
      // Getters
      getSchema: function() { return schema_; },
      getAuthority: function() { return authority_; },
      getOrigin: getOrigin,
      getPath: function() { return path_; },
      getQuery: getQuery,
      getFragment: getFragment,
      getQP: getQP,
      getFP: getFP,

      // Setters
      setSchema: function(schema) { schema_ = schema; return bundle; },
      setAuthority: function(authority) { authority_ = authority; return bundle; },
      setPath: function(path) { path_ = (path[0] === "/" ? "" : "/") + path; return bundle; },
      setQuery: function(query) { qparms_ = null; query_ = stripPrefix(query, '?'); return bundle; },
      setFragment: function(fragment) { fparms_ = null; fragment_ = stripPrefix(fragment, '#'); return bundle; },
      setQP: setQP,
      setFP: setFP,
      setExistingP: function(key, val) {
        if (getQP(key, val) !== undefined) {
          setQP(key, val);
        }
        if (getFP(key, val) !== undefined) {
          setFP(key, val);
        }
        return bundle;
      },

      // Core utility methods.
      toString: toString
    };

    return bundle;
  }
})();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

(function() {
  /**
   * Called by the transports for each service method that they expose
   * @param {string} method  The method to expose e.g. "people.get"
   * @param {Object.<string,Object>} transport The transport used to execute a call for the method
   */
  osapi._registerMethod = function (method, transport) {
    var has___ = typeof ___ !== 'undefined';

    // Skip registration of local newBatch implementation.
    if (method == "newBatch") {
        return;
    }

    // Lookup last method value.
    var parts = method.split(".");
    var last = osapi;
    for (var i = 0; i < parts.length - 1; i++) {
      last[parts[i]] = last[parts[i]] || {};
      last = last[parts[i]];
    }

    // Use the batch as the actual executor of calls.
    var apiMethod = function(rpc) {
      var batch = osapi.newBatch();
      var boundCall = {};
      boundCall.execute = function(callback) {
        var feralCallback = has___ ? ___.untame(callback) : callback;
        var that = has___ ? ___.USELESS : this;
        batch.add(method, this);
        batch.execute(function(batchResult) {
          if (batchResult.error) {
            feralCallback.call(that, batchResult.error);
          } else {
            feralCallback.call(that, batchResult[method]);
          }
        });
      }
      if (has___) {
          ___.markInnocent(boundCall.execute, 'execute');
      }
      // TODO: This shouldnt really be necessary. The spec should be clear enough about
      // defaults that we dont have to populate this.
      rpc = rpc || {};
      rpc.userId = rpc.userId || "@viewer";
      rpc.groupId = rpc.groupId || "@self";

      // Decorate the execute method with the information necessary for batching
      boundCall.method = method;
      boundCall.transport = transport;
      boundCall.rpc = rpc;

      return boundCall;
    };
    if (has___ && typeof ___.markInnocent !== 'undefined') {
      ___.markInnocent(apiMethod, method);
    }

    if (last[parts[parts.length - 1]]) {
      gadgets.warn("Skipping duplicate osapi method definition " + method + " on transport " + transport.name);
    } else {
      last[parts[parts.length - 1]] = apiMethod;
    }
  };
})();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

(function() {

  /**
   * It is common to batch requests together to make them more efficient.
   *
   * Note: the container config specified endpoints at which services are to be found.
   * When creating a batch, the calls are split out into separate requests based on the
   * transport, as it may get sent to a different server on the backend.
   */
  var newBatch = function() {
    var that = {};

    // An array of requests where each request is
    // { key : <key>
    //   request : {
    //     method : <service-method>
    //     rpc  : <request params>
    //     transport : <rpc dispatcher>
    //  }
    // }

    /** @type {Array.<Object>} */
    var keyedRequests = [];

    /**
     * Create a new request in the batch
     * @param {string} key id for the request
     * @param {Object} request the opensocial request object which is of the form
     * { method : <service-method>
     *   rpc  : <request>
     *   transport : <rpc dispatcher>
     * }
     */
    var add = function(key, request) {
      if (request && key) {
        keyedRequests.push({"key" : key, "request" : request});
      }
      return that;
    };

    /**
     * Convert our internal request format into a JSON-RPC
     * @param {Object} request
     */
    var toJsonRpc = function(request) {
      var jsonRpc = {method : request.request.method, id : request.key};
      if (request.request.rpc) {
        jsonRpc.params = request.request.rpc;
      }
      return jsonRpc;
    };

    /**
     * Call to make a batch execute its requests. Batch will distribute calls over their
     * bound transports and then merge them before calling the userCallback. If the result
     * of an rpc is another rpc request then it will be chained and executed.
     *
     * @param {function(Object)} userCallback the callback to the gadget where results are passed.
     */
    var execute =  function(userCallback) {
      var batchResult = {};

      var perTransportBatch = {};

      // Break requests into their per-transport batches in call order
      /** @type {number} */
      var latchCount = 0;
      var transports = [];
      for (var i = 0; i < keyedRequests.length; i++) {
        // Batch requests per-transport
        var transport = keyedRequests[i].request.transport;
        if (!perTransportBatch[transport.name]) {
          transports.push(transport);
          latchCount++;
        }
        perTransportBatch[transport.name] = perTransportBatch[transport.name] || [];

        // Transform the request into JSON-RPC form before sending to the transport
        perTransportBatch[transport.name].push(toJsonRpc(keyedRequests[i]));
      }

      // Define callback for transports
      var transportCallback = function(transportBatchResult) {
        if (transportBatchResult.error) {
          batchResult.error = transportBatchResult.error;
        }
        // Merge transport results into overall result and hoist data.
        // All transport results are required to be of the format
        // { <key> : <JSON-RPC response>, ...}
        for (var i = 0; i < keyedRequests.length; i++) {
          var key = keyedRequests[i].key;
          var response = transportBatchResult[key];
          if (response) {
            if (response.error) {
              // No need to hoist error responses
              batchResult[key] = response;
            } else {
              // Handle both compliant and non-compliant JSON-RPC data responses.
              batchResult[key] = response.data || response.result;
            }
          }
        }

        // Latch on no. of transports before calling user callback
        latchCount--;
        if (latchCount === 0) {
          userCallback(batchResult);
        }
      };

      // For each transport execute its local batch of requests
      for (var j = 0; j < transports.length; j++) {
        transports[j].execute(perTransportBatch[transports[j].name], transportCallback);
      }

      // Force the callback to occur asynchronously even if there were no actual calls
      if (latchCount == 0) {
        window.setTimeout(function(){userCallback(batchResult)}, 0);
      }
    };

    that.execute = execute;
    that.add = add;
    return that;
  };

  osapi.newBatch = newBatch;
})();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * Provide a transport of osapi requests over JSON-RPC. Exposed JSON-RPC endpoints and
 * their associated methods are available from config in the "osapi.services" field.
 */
(function() {

  /**
   * Called by a batch to execute all requests
   * @param {Object} requests
   * @param {function(Object)} callback
   */
  function execute(requests, callback) {

    function processResponse(response) {
      // Convert an XHR failure to a JSON-RPC error
      if (response.errors[0]) {
        callback({
          error : {
            code : response.rc,
            message : response.text
          }
        });
      } else {
        var jsonResponse = response.result || response.data;
        if (jsonResponse.error) {
          callback(jsonResponse);
        } else {
          var responseMap = {};
          for (var i = 0; i < jsonResponse.length; i++) {
            responseMap[jsonResponse[i].id] = jsonResponse[i];
          }
          callback(responseMap);
        }
      }
    }

    var request = {
      "POST_DATA" : gadgets.json.stringify(requests),
      "CONTENT_TYPE" : "JSON",
      "METHOD" : "POST",
      "AUTHORIZATION" : "SIGNED"
    };

    var url = this.name;
    var token = shindig.auth.getSecurityToken();
    if (token) {
      url += "?st=";
      url += encodeURIComponent(token);
    }
    gadgets.io.makeNonProxiedRequest(url, processResponse, request, "application/json");
  }

  function init(config) {
    var services = config["osapi.services"];
    if (services) {
      // Iterate over the defined services, extract the http endpoints and
      // create a transport per-endpoint
      for (var endpointName in services) if (services.hasOwnProperty(endpointName)) {
        if (endpointName.indexOf("http") == 0 ||
            endpointName.indexOf("//") == 0) {
          // Expand the host & append the security token
          var endpointUrl = endpointName.replace("%host%", document.location.host);
          var transport = { name : endpointUrl, "execute" : execute };
          var methods = services[endpointName];
          for (var i=0; i < methods.length; i++) {
            osapi._registerMethod(methods[i], transport);
          }
        }
      }
    }
  }

  // We do run this in the container mode in the new common container
  if (gadgets.config) {
    gadgets.config.register("osapi.services", null, init);
  }

})();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * A transport for osapi based on gadgets.rpc. Allows osapi to expose APIs requiring container
 * and user UI mediation in addition to allowing data oriented APIs to be implemented using
 * gadgets.rpc instead of XHR/JSON-RPC/REST etc..
 */
if (gadgets && gadgets.rpc) { //Dont bind if gadgets.rpc not defined
  (function() {

    /**
     * Execute the JSON-RPC batch of gadgets.rpc. The container is expected to implement
     * the method osapi._handleGadgetRpcMethod(<JSON-RPC batch>)
     *
     * @param {Object} requests the opensocial JSON-RPC request batch
     * @param {function(Object)} callback to the osapi batch with either an error response or
     * a JSON-RPC batch result
     * @private
     */
    function execute(requests, callback) {
        var rpcCallback = function(response) {
        if (!response) {
          callback({ code : 500, message : 'Container refused the request' });
        } else if (response.error) {
          callback(response);
        } else {
          var responseMap = {};
          for (var i = 0; i < response.length; i++) {
            responseMap[response[i].id] = response[i];
          }
          callback(responseMap);
        }
      };
      gadgets.rpc.call('..', 'osapi._handleGadgetRpcMethod', rpcCallback, requests);
      // TODO - Timeout handling if rpc silently fails?
    }

    function init(config) {
      var transport = { name : "gadgets.rpc", "execute" : execute };
      var services = config["osapi.services"];
      if (services) {
        // Iterate over the defined services, extract the gadget.rpc endpoint and
        // bind to it
        for (var endpointName in services) if (services.hasOwnProperty(endpointName)) {
          if (endpointName === "gadgets.rpc") {
            var methods = services[endpointName];
            for (var i=0; i < methods.length; i++) {
              osapi._registerMethod(methods[i], transport);
            }
          }
        }
      }

      // Check if the container.listMethods is bound? If it is then use it to
      // introspect the container services for available methods and bind them
      // Because the call is asynchronous we delay the execution of the gadget onLoad
      // handler until the callback has completed. Containers wishing to avoid this
      // behavior should not specify a binding for container.listMethods in their
      // container config but rather list out all the container methods they want to
      // expose directly which is the preferred option for production environments
      if (osapi.container && osapi.container.listMethods) {

        // Swap out the onload handler with a latch so that it is not called
        // until two of the three following events occur
        // 1 - gadgets.util.runOnLoadHandlers called at end of gadget content
        // 2 - callback from container.listMethods
        // 3 - callback from window.setTimeout
        var originalRunOnLoadHandlers = gadgets.util.runOnLoadHandlers;
        var count = 2;
        var newRunOnLoadHandlers = function() {
          count--;
          if (count == 0) {
            originalRunOnLoadHandlers();
          }
        };
        gadgets.util.runOnLoadHandlers = newRunOnLoadHandlers;

        // Call for the container methods and bind them to osapi.
        osapi.container.listMethods({}).execute(function(response) {
          if (!response.error) {
            for (var i = 0; i < response.length; i++) {
              // do not rebind container.listMethods implementation
              if (response[i] != "container.listMethods") {
                osapi._registerMethod(response[i], transport);
              }
            }
          }
          // Notify completion
          newRunOnLoadHandlers();
        });

        // Wait 500ms for the rpc. This should be a reasonable upper bound
        // even for slow transports while still allowing for reasonable testing
        // in a development environment
        window.setTimeout(newRunOnLoadHandlers, 500);
      }
    }

    // Do not run this in container mode.
    if (gadgets.config && gadgets.config.isGadget) {
      gadgets.config.register("osapi.services", null, init);
    }
  })();
}
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * Service to retrieve People via JSON RPC opensocial calls.
 * Called in onLoad handler as osapi.people.get could be defined by
 * the container over the gadgets.rpc transport.
 */
gadgets.util.registerOnLoadHandler(function() {

  // No point defining these if osapi.people.get doesn't exist
  if (osapi && osapi.people && osapi.people.get) {
    /**
    * Helper functions to get People.
    * Options specifies parameters to the call as outlined in the
    * JSON RPC Opensocial Spec
    * http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol
    * @param {object.<JSON>} The JSON object of parameters for the specific request
    */
       /**
      * Function to get Viewer profile.
      * Options specifies parameters to the call as outlined in the
      * JSON RPC Opensocial Spec
      * http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol
      * @param {object.<JSON>} The JSON object of parameters for the specific request
      */
      osapi.people.getViewer = function(options) {
        options = options || {};
        options.userId = "@viewer";
        options.groupId = "@self";
        return osapi.people.get(options);
      };

      /**
      * Function to get Viewer's friends'  profiles.
      * Options specifies parameters to the call as outlined in the
      * JSON RPC Opensocial Spec
      * http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol
      * @param {object.<JSON>} The JSON object of parameters for the specific request
      */
      osapi.people.getViewerFriends = function(options) {
        options = options || {};
        options.userId = "@viewer";
        options.groupId = "@friends";
        return osapi.people.get(options);
      };

      /**
      * Function to get Owner profile.
      * Options specifies parameters to the call as outlined in the
      * JSON RPC Opensocial Spec
      * http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol
      * @param {object.<JSON>} The JSON object of parameters for the specific request
      */
      osapi.people.getOwner = function(options) {
        options = options || {};
        options.userId = "@owner";
        options.groupId = "@self";
        return osapi.people.get(options);
      };

      /**
      * Function to get Owner's friends' profiles.
      * Options specifies parameters to the call as outlined in the
      * JSON RPC Opensocial Spec
      * http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol
      * @param {object.<JSON>} The JSON object of parameters for the specific request
      */
      osapi.people.getOwnerFriends = function(options) {
        options = options || {};
        options.userId = "@owner";
        options.groupId = "@friends";
        return osapi.people.get(options);
      };
  }
});
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @class
 * Tame and expose core osapi.* API to cajoled gadgets
 */
var tamings___ = tamings___ || [];
tamings___.push(function(imports) {

  ___.tamesTo(osapi.newBatch, ___.markFuncFreeze(function () {
    var result = osapi.newBatch();
    ___.markInnocent(result['add'], 'add');
    ___.markInnocent(result['execute'], 'execute');
    return ___.tame(result);
  }));

  // OSAPI functions are marked as simple funcs as they are registered
  imports.outers.osapi = ___.tame(osapi);
  ___.grantRead(imports.outers, 'osapi');

  // Forced to tame in an onload handler because peoplehelpers does
  // not define some functions till runOnLoadHandlers runs
  var savedImports = imports;
  gadgets.util.registerOnLoadHandler(function() {
    if (osapi && osapi.people && osapi.people.get) {
      caja___.whitelistFuncs([
        [osapi.people, 'getViewer'],
        [osapi.people, 'getViewerFriends'],
        [osapi.people, 'getOwner'],
        [osapi.people, 'getOwnerFriends']
      ]);
      // Careful not to clobber osapi.people which already has tamed functions on it
      savedImports.outers.osapi.people.getViewer = ___.tame(osapi.people.getViewer);
      savedImports.outers.osapi.people.getViewerFriends = ___.tame(osapi.people.getViewerFriends);
      savedImports.outers.osapi.people.getOwner = ___.tame(osapi.people.getOwner);
      savedImports.outers.osapi.people.getOwnerFriends = ___.tame(osapi.people.getOwnerFriends);
    }
  });

});
;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Augments shindig.uri class with various useful helper methods.
 */

shindig._uri = shindig.uri;
shindig.uri = (function() {
  var oldCtor = shindig._uri;
  shindig._uri = null;

  /**
   * Checks that a Uri has the same origin as this Uri.
   *
   * Two Uris have the same origin if they point to the same schema, server
   * and port.
   *
   * @param {Url} other The Uri to compare to this Uri.
   * @return {boolean} Whether the Uris have the same origin.
   */
  function hasSameOrigin(self, other) {
    return self.getOrigin() == other.getOrigin();
  }

  /**
   * Fully qualifies this Uri if it is relative, using a given base Uri.
   * 
   * @param {Uri} self The base Uri.
   * @param {Uri} base The Uri to resolve.
   */
  function resolve(self, base) {
    if (self.getSchema() == '') {
      self.setSchema(base.getSchema());
    }
    if (self.getAuthority() == '') {
      self.setAuthority(base.getAuthority());
    }
    var selfPath = self.getPath();
    if (selfPath == '' || selfPath.charAt(0) != '/') {
      var basePath = base.getPath(); 
      var lastSlash = basePath.lastIndexOf('/');
      if (lastSlash != -1) {
        basePath = basePath.substring(0, lastSlash + 1);
      }
      self.setPath(base.getPath() + selfPath);
    }
  }

  return function(opt_in) {
    var self = oldCtor(opt_in);
    self.hasSameOrigin = function(other) {
      return hasSameOrigin(self, other);
    };
    self.resolve = function(other) {
      return resolve(self, other);
    };
    return self;
  };
})();
;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Utility functions for the Open Gadget Container
 */

Function.prototype.inherits = function(parentCtor) {
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  this.superClass_ = parentCtor.prototype;
  this.prototype = new tempCtor();
  this.prototype.constructor = this;
};;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Functions for setting, getting and deleting cookies
 */

/**
 * Namespace for cookie functions
 */

// TODO: find the official solution for a cookies library
shindig.cookies = {};


shindig.cookies.JsType_ = {
  UNDEFINED: 'undefined'
};

shindig.cookies.isDef = function(val) {
  return typeof val != shindig.cookies.JsType_.UNDEFINED;
};


/**
 * Sets a cookie.
 * The max_age can be -1 to set a session cookie. To remove and expire cookies,
 * use remove() instead.
 *
 * @param {string} name The cookie name.
 * @param {string} value The cookie value.
 * @param {number} opt_maxAge The max age in seconds (from now). Use -1 to set
 *                            a session cookie. If not provided, the default is
 *                            -1 (i.e. set a session cookie).
 * @param {string} opt_path The path of the cookie, or null to not specify a
 *                          path attribute (browser will use the full request
 *                          path). If not provided, the default is '/' (i.e.
 *                          path=/).
 * @param {string} opt_domain The domain of the cookie, or null to not specify
 *                            a domain attribute (browser will use the full
 *                            request host name). If not provided, the default
 *                            is null (i.e. let browser use full request host
 *                            name).
 */
shindig.cookies.set = function(name, value, opt_maxAge, opt_path, opt_domain) {
  // we do not allow '=' or ';' in the name
  if (/;=/g.test(name)) {
    throw new Error('Invalid cookie name "' + name + '"');
  }
  // we do not allow ';' in value
  if (/;/g.test(value)) {
    throw new Error('Invalid cookie value "' + value + '"');
  }

  if (!shindig.cookies.isDef(opt_maxAge)) {
    opt_maxAge = -1;
  }

  var domainStr = opt_domain ? ';domain=' + opt_domain : '';
  var pathStr = opt_path ? ';path=' + opt_path : '';

  var expiresStr;

  // Case 1: Set a session cookie.
  if (opt_maxAge < 0) {
    expiresStr = '';

  // Case 2: Expire the cookie.
  // Note: We don't tell people about this option in the function doc because
  // we prefer people to use ExpireCookie() to expire cookies.
  } else if (opt_maxAge === 0) {
    // Note: Don't use Jan 1, 1970 for date because NS 4.76 will try to convert
    // it to local time, and if the local time is before Jan 1, 1970, then the
    // browser will ignore the Expires attribute altogether.
    var pastDate = new Date(1970, 1 /*Feb*/, 1);  // Feb 1, 1970
    expiresStr = ';expires=' + pastDate.toUTCString();

  // Case 3: Set a persistent cookie.
  } else {
    var futureDate = new Date((new Date).getTime() + opt_maxAge * 1000);
    expiresStr = ';expires=' + futureDate.toUTCString();
  }

  document.cookie = name + '=' + value + domainStr + pathStr + expiresStr;
};


/**
 * Returns the value for the first cookie with the given name
 * @param {string} name The name of the cookie to get
 * @param {string} opt_default If not found this is returned instead.
 * @return {string|undefined} The value of the cookie. If no cookie is set this
 *                            returns opt_default or undefined if opt_default is
 *                            not provided.
 */
shindig.cookies.get = function(name, opt_default) {
  var nameEq = name + "=";
  var cookie = String(document.cookie);
  for (var pos = -1; (pos = cookie.indexOf(nameEq, pos + 1)) >= 0;) {
    var i = pos;
    // walk back along string skipping whitespace and looking for a ; before
    // the name to make sure that we don't match cookies whose name contains
    // the given name as a suffix.
    while (--i >= 0) {
      var ch = cookie.charAt(i);
      if (ch == ';') {
        i = -1;  // indicate success
        break;
      }
    }
    if (i == -1) {  // first cookie in the string or we found a ;
      var end = cookie.indexOf(';', pos);
      if (end < 0) {
        end = cookie.length;
      }
      return cookie.substring(pos + nameEq.length, end);
    }
  }
  return opt_default;
};


/**
 * Removes and expires a cookie.
 *
 * @param {string} name The cookie name.
 * @param {string} opt_path The path of the cookie, or null to expire a cookie
 *                          set at the full request path. If not provided, the
 *                          default is '/' (i.e. path=/).
 * @param {string} opt_domain The domain of the cookie, or null to expire a
 *                            cookie set at the full request host name. If not
 *                            provided, the default is null (i.e. cookie at
 *                            full request host name).
 */
shindig.cookies.remove = function(name, opt_path, opt_domain) {
  var rv = shindig.cookies.containsKey(name);
  shindig.cookies.set(name, '', 0, opt_path, opt_domain);
  return rv;
};


/**
 * Gets the names and values for all the cookies
 * @private
 * @return {Object} An object with keys and values
 */
shindig.cookies.getKeyValues_ = function() {
  var cookie = String(document.cookie);
  var parts = cookie.split(/\s*;\s*/);
  var keys = [], values = [], index, part;
  for (var i = 0; part = parts[i]; i++) {
    index = part.indexOf('=');

    if (index == -1) { // empty name
      keys.push('');
      values.push(part);
    } else {
      keys.push(part.substring(0, index));
      values.push(part.substring(index + 1));
    }
  }
  return {keys: keys, values: values};
};


/**
 * Gets the names for all the cookies
 * @return {Array} An array with the names of the cookies
 */
shindig.cookies.getKeys = function() {
  return shindig.cookies.getKeyValues_().keys;
};


/**
 * Gets the values for all the cookies
 * @return {Array} An array with the values of the cookies
 */
shindig.cookies.getValues = function() {
  return shindig.cookies.getKeyValues_().values;
};


/**
 * Whether there are any cookies for this document
 * @return {boolean}
 */
shindig.cookies.isEmpty = function() {
  return document.cookie === '';
};


/**
 * Returns the number of cookies for this document
 * @return {number}
 */
shindig.cookies.getCount = function() {
  var cookie = String(document.cookie);
  if (cookie === '') {
    return 0;
  }
  var parts = cookie.split(/\s*;\s*/);
  return parts.length;
};


/**
 * Returns whether there is a cookie with the given name
 * @param {string} key The name of the cookie to test for
 * @return {boolean}
 */
shindig.cookies.containsKey = function(key) {
  var sentinel = {};
  // if get does not find the key it returns the default value. We therefore
  // compare the result with an object to ensure we do not get any false
  // positives.
  return shindig.cookies.get(key, sentinel) !== sentinel;
};


/**
 * Returns whether there is a cookie with the given value. (This is an O(n)
 * operation.)
 * @param {string} value The value to check for
 * @return {boolean}
 */
shindig.cookies.containsValue = function(value) {
  // this O(n) in any case so lets do the trivial thing.
  var values = shindig.cookies.getKeyValues_().values;
  for (var i = 0; i < values.length; i++) {
    if (values[i] == value) {
      return true;
    }
  }
  return false;
};


/**
 * Removes all cookies for this document
 */
shindig.cookies.clear = function() {
  var keys = shindig.cookies.getKeyValues_().keys;
  for (var i = keys.length - 1; i >= 0; i--) {
    shindig.cookies.remove(keys[i]);
  }
};

/**
 * Static constant for the size of cookies. Per the spec, there's a 4K limit
 * to the size of a cookie. To make sure users can't break this limit, we
 * should truncate long cookies at 3950 bytes, to be extra careful with dumb
 * browsers/proxies that interpret 4K as 4000 rather than 4096
 * @type number
 */
shindig.cookies.MAX_COOKIE_LENGTH = 3950;
;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Open Gadget Container
 */

shindig.errors = {};
shindig.errors.SUBCLASS_RESPONSIBILITY = 'subclass responsibility';
shindig.errors.TO_BE_DONE = 'to be done';

/**
 * Calls an array of asynchronous functions and calls the continuation
 * function when all are done.
 * @param {Array} functions Array of asynchronous functions, each taking
 *     one argument that is the continuation function that handles the result
 *     That is, each function is something like the following:
 *     function(continuation) {
 *       // compute result asynchronously
 *       continuation(result);
 *     }
 * @param {Function} continuation Function to call when all results are in.  It
 *     is pass an array of all results of all functions
 * @param {Object} opt_this Optional object used as "this" when calling each
 *     function
 */
shindig.callAsyncAndJoin = function(functions, continuation, opt_this) {
  var pending = functions.length;
  var results = [];
  for (var i = 0; i < functions.length; i++) {
    // we need a wrapper here because i changes and we need one index
    // variable per closure
    var wrapper = function(index) {
      var fn = functions[index];
      if (typeof fn === 'string') {
        fn = opt_this[fn];
      }
      fn.call(opt_this, function(result) {
        results[index] = result;
        if (--pending === 0) {
          continuation(results);
        }
      });
    };
    wrapper(i);
  }
};


// ----------
// Extensible

shindig.Extensible = function() {
};

/**
 * Sets the dependencies.
 * @param {Object} dependencies Object whose properties are set on this
 *     container as dependencies
 */
shindig.Extensible.prototype.setDependencies = function(dependencies) {
  for (var p in dependencies) {
    this[p] = dependencies[p];
  }
};

/**
 * Returns a dependency given its name.
 * @param {String} name Name of dependency
 * @return {Object} Dependency with that name or undefined if not found
 */
shindig.Extensible.prototype.getDependencies = function(name) {
  return this[name];
};



// -------------
// UserPrefStore

/**
 * User preference store interface.
 * @constructor
 */
shindig.UserPrefStore = function() {
};

/**
 * Gets all user preferences of a gadget.
 * @param {Object} gadget Gadget object
 * @return {Object} All user preference of given gadget
 */
shindig.UserPrefStore.prototype.getPrefs = function(gadget) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

/**
 * Saves user preferences of a gadget in the store.
 * @param {Object} gadget Gadget object
 * @param {Object} prefs User preferences
 */
shindig.UserPrefStore.prototype.savePrefs = function(gadget) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};


// -------------
// DefaultUserPrefStore

/**
 * User preference store implementation.
 * TODO: Turn this into a real implementation that is production safe
 * @constructor
 */
shindig.DefaultUserPrefStore = function() {
  shindig.UserPrefStore.call(this);
};
shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);

shindig.DefaultUserPrefStore.prototype.getPrefs = function(gadget) { };

shindig.DefaultUserPrefStore.prototype.savePrefs = function(gadget) { };


// -------------
// GadgetService

/**
 * Interface of service provided to gadgets for resizing gadgets,
 * setting title, etc.
 * @constructor
 */
shindig.GadgetService = function() {
};

shindig.GadgetService.prototype.setHeight = function(elementId, height) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

shindig.GadgetService.prototype.setTitle = function(gadget, title) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

shindig.GadgetService.prototype.setUserPref = function(id) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};


// ----------------
// IfrGadgetService

/**
 * Base implementation of GadgetService.
 * @constructor
 */
shindig.IfrGadgetService = function() {
  shindig.GadgetService.call(this);
  gadgets.rpc.register('resize_iframe', this.setHeight);
  gadgets.rpc.register('set_pref', this.setUserPref);
  gadgets.rpc.register('set_title', this.setTitle);
  gadgets.rpc.register('requestNavigateTo', this.requestNavigateTo);
  gadgets.rpc.register('requestSendMessage', this.requestSendMessage);
};

shindig.IfrGadgetService.inherits(shindig.GadgetService);

shindig.IfrGadgetService.prototype.setHeight = function(height) {
  if (height > shindig.container.maxheight_) {
    height = shindig.container.maxheight_;
  }

  var element = document.getElementById(this.f);
  if (element) {
    element.style.height = height + 'px';
  }
};

shindig.IfrGadgetService.prototype.setTitle = function(title) {
  var element = document.getElementById(this.f + '_title');
  if (element) {
    element.innerHTML = title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }
};

/**
 * Sets one or more user preferences
 * @param {String} editToken
 * @param {String} name Name of user preference
 * @param {String} value Value of user preference
 * More names and values may follow
 */
shindig.IfrGadgetService.prototype.setUserPref = function(editToken, name,
    value) {
  var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  var gadget = shindig.container.getGadget(id);
  for (var i = 1, j = arguments.length; i < j; i += 2) {
    this.userPrefs[arguments[i]].value = arguments[i + 1];
  }
  gadget.saveUserPrefs();
};

/**
 * Requests the container to send a specific message to the specified users.
 * @param {Array.<String>, String} recipients An ID, array of IDs, or a group reference;
 * the supported keys are VIEWER, OWNER, VIEWER_FRIENDS, OWNER_FRIENDS, or a
 * single ID within one of those groups
 * @param {opensocial.Message} message The message to send to the specified users
 * @param {Function} opt_callback The function to call once the request has been
 * processed; either this callback will be called or the gadget will be reloaded
 * from scratch
 * @param {opensocial.NavigationParameters} opt_params The optional parameters
 * indicating where to send a user when a request is made, or when a request
 * is accepted; options are of type  NavigationParameters.DestinationType
 */
shindig.IfrGadgetService.prototype.requestSendMessage = function(recipients,
    message, opt_callback, opt_params) {
    if (opt_callback) {
      window.setTimeout(function() {
        opt_callback(new opensocial.ResponseItem(
            null, null, opensocial.ResponseItem.Error.NOT_IMPLEMENTED, null));
      }, 0);
    }
};

/**
 * Navigates the page to a new url based on a gadgets requested view and
 * parameters.
 */
shindig.IfrGadgetService.prototype.requestNavigateTo = function(view,
    opt_params) {
  var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  var url = shindig.container.gadgetService.getUrlForView(view);

  if (opt_params) {
    var paramStr = gadgets.json.stringify(opt_params);
    if (paramStr.length > 0) {
      url += '&appParams=' + encodeURIComponent(paramStr);
    }
  }

  if (url && document.location.href.indexOf(url) == -1) {
    document.location.href = url;
  }
};

/**
 * This is a silly implementation that will need to be overriden by almost all
 * real containers.
 * TODO: Find a better default for this function
 *
 * @param view The view name to get the url for
 */
shindig.IfrGadgetService.prototype.getUrlForView = function(
    view) {
  if (view === 'canvas') {
    return '/canvas';
  } else if (view === 'profile') {
    return '/profile';
  } else {
    return null;
  }
};

shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId = function(
    moduleId) {
  // Quick hack to extract the gadget id from module id
  return parseInt(moduleId.match(/_([0-9]+)$/)[1], 10);
};


// -------------
// LayoutManager

/**
 * Layout manager interface.
 * @constructor
 */
shindig.LayoutManager = function() {
};

/**
 * Gets the HTML element that is the chrome of a gadget into which the content
 * of the gadget can be rendered.
 * @param {Object} gadget Gadget instance
 * @return {Object} HTML element that is the chrome for the given gadget
 */
shindig.LayoutManager.prototype.getGadgetChrome = function(gadget) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

// -------------------
// StaticLayoutManager

/**
 * Static layout manager where gadget ids have a 1:1 mapping to chrome ids.
 * @constructor
 */
shindig.StaticLayoutManager = function() {
  shindig.LayoutManager.call(this);
};

shindig.StaticLayoutManager.inherits(shindig.LayoutManager);

/**
 * Sets chrome ids, whose indexes are gadget instance ids (starting from 0).
 * @param {Array} gadgetChromeIds Gadget id to chrome id map
 */
shindig.StaticLayoutManager.prototype.setGadgetChromeIds =
    function(gadgetChromeIds) {
  this.gadgetChromeIds_ = gadgetChromeIds;
};

shindig.StaticLayoutManager.prototype.getGadgetChrome = function(gadget) {
  var chromeId = this.gadgetChromeIds_[gadget.id];
  return chromeId ? document.getElementById(chromeId) : null;
};


// ----------------------
// FloatLeftLayoutManager

/**
 * FloatLeft layout manager where gadget ids have a 1:1 mapping to chrome ids.
 * @constructor
 * @param {String} layoutRootId Id of the element that is the parent of all
 *     gadgets.
 */
shindig.FloatLeftLayoutManager = function(layoutRootId) {
  shindig.LayoutManager.call(this);
  this.layoutRootId_ = layoutRootId;
};

shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);

shindig.FloatLeftLayoutManager.prototype.getGadgetChrome =
    function(gadget) {
  var layoutRoot = document.getElementById(this.layoutRootId_);
  if (layoutRoot) {
    var chrome = document.createElement('div');
    chrome.className = 'gadgets-gadget-chrome';
    chrome.style.cssFloat = 'left';
    layoutRoot.appendChild(chrome);
    return chrome;
  } else {
    return null;
  }
};


// ------
// Gadget

/**
 * Creates a new instance of gadget.  Optional parameters are set as instance
 * variables.
 * @constructor
 * @param {Object} params Parameters to set on gadget.  Common parameters:
 *    "specUrl": URL to gadget specification
 *    "private": Whether gadget spec is accessible only privately, which means
 *        browser can load it but not gadget server
 *    "spec": Gadget Specification in XML
 *    "userPrefs": a javascript object containing attribute value pairs of user
 *        preferences for this gadget with the value being a preference object
 *    "viewParams": a javascript object containing attribute value pairs
 *        for this gadgets
 *    "secureToken": an encoded token that is passed on the URL hash
 *    "hashData": Query-string like data that will be added to the
 *        hash portion of the URL.
 *    "specVersion": a hash value used to add a v= param to allow for better caching
 *    "title": the default title to use for the title bar.
 *    "height": height of the gadget
 *    "width": width of the gadget
 *    "debug": send debug=1 to the gadget server, gets us uncompressed
 *        javascript
 */
shindig.Gadget = function(params) {
  this.userPrefs = {};

  if (params) {
    for (var name in params)  if (params.hasOwnProperty(name)) {
      this[name] = params[name];
    }
  }
  if (!this.secureToken) {
    // Assume that the default security token implementation is
    // in use on the server.
    this.secureToken = 'john.doe:john.doe:appid:cont:url:0:default';
  }
};

shindig.Gadget.prototype.getUserPrefs = function() {
  return this.userPrefs;
};

shindig.Gadget.prototype.saveUserPrefs = function() {
  shindig.container.userPrefStore.savePrefs(this);
};

shindig.Gadget.prototype.getUserPrefValue = function(name) {
  var pref = this.userPrefs[name];
  return typeof(pref.value) != 'undefined' && pref.value != null ?
      pref.value : pref['default'];
};

shindig.Gadget.prototype.render = function(chrome) {
  if (chrome) {
    var gadget = this;
    this.getContent(function(content) {
      chrome.innerHTML = content;
      gadget.finishRender(chrome);
    });
  }
};

shindig.Gadget.prototype.getContent = function(continuation) {
  shindig.callAsyncAndJoin([
      'getTitleBarContent', 'getUserPrefsDialogContent',
      'getMainContent'], function(results) {
        continuation(results.join(''));
      }, this);
};

/**
 * Gets title bar content asynchronously or synchronously.
 * @param {Function} continuation Function that handles title bar content as
 *     the one and only argument
 */
shindig.Gadget.prototype.getTitleBarContent = function(continuation) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

/**
 * Gets user preferences dialog content asynchronously or synchronously.
 * @param {Function} continuation Function that handles user preferences
 *     content as the one and only argument
 */
shindig.Gadget.prototype.getUserPrefsDialogContent = function(continuation) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

/**
 * Gets gadget content asynchronously or synchronously.
 * @param {Function} continuation Function that handles gadget content as
 *     the one and only argument
 */
shindig.Gadget.prototype.getMainContent = function(continuation) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

shindig.Gadget.prototype.finishRender = function(chrome) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

/*
 * Gets additional parameters to append to the iframe url
 * Override this method if you need any custom params.
 */
shindig.Gadget.prototype.getAdditionalParams = function() {
  return '';
};


// ---------
// IfrGadget

shindig.BaseIfrGadget = function(opt_params) {
  shindig.Gadget.call(this, opt_params);
  this.serverBase_ = '/gadgets/'; // default gadget server
  this.queryIfrGadgetType_();
};

shindig.BaseIfrGadget.inherits(shindig.Gadget);

shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_ = 'remote_iframe_';

shindig.BaseIfrGadget.prototype.CONTAINER = 'default';

shindig.BaseIfrGadget.prototype.cssClassGadget = 'gadgets-gadget';
shindig.BaseIfrGadget.prototype.cssClassTitleBar = 'gadgets-gadget-title-bar';
shindig.BaseIfrGadget.prototype.cssClassTitle = 'gadgets-gadget-title';
shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar =
    'gadgets-gadget-title-button-bar';
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog =
    'gadgets-gadget-user-prefs-dialog';
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar =
    'gadgets-gadget-user-prefs-dialog-action-bar';
shindig.BaseIfrGadget.prototype.cssClassTitleButton = 'gadgets-gadget-title-button';
shindig.BaseIfrGadget.prototype.cssClassGadgetContent = 'gadgets-gadget-content';
shindig.BaseIfrGadget.prototype.rpcToken = (0x7FFFFFFF * Math.random()) | 0;
shindig.BaseIfrGadget.prototype.rpcRelay = '../container/rpc_relay.html';

shindig.BaseIfrGadget.prototype.getTitleBarContent = function(continuation) {
  var settingsButton = this.hasViewablePrefs_() ?
      '<a href="#" onclick="shindig.container.getGadget(' + this.id +
          ').handleOpenUserPrefsDialog();return false;" class="' + this.cssClassTitleButton +
          '">settings</a> '
      : '';
  continuation('<div id="' + this.cssClassTitleBar + '-' + this.id +
      '" class="' + this.cssClassTitleBar + '"><span id="' +
      this.getIframeId() + '_title" class="' +
      this.cssClassTitle + '">' + (this.title ? this.title : 'Title') + '</span> | <span class="' +
      this.cssClassTitleButtonBar + '">' + settingsButton +
      '<a href="#" onclick="shindig.container.getGadget(' + this.id +
      ').handleToggle();return false;" class="' + this.cssClassTitleButton +
      '">toggle</a></span></div>');
};

shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent = function(continuation) {
  continuation('<div id="' + this.getUserPrefsDialogId() + '" class="' +
      this.cssClassGadgetUserPrefsDialog + '"></div>');
};

shindig.BaseIfrGadget.prototype.setServerBase = function(url) {
  this.serverBase_ = url;
};

shindig.BaseIfrGadget.prototype.getServerBase = function() {
  return this.serverBase_;
};

shindig.BaseIfrGadget.prototype.getMainContent = function(continuation) {
  // proper sub-class has not been mixed-in yet
  var gadget = this;
  window.setTimeout( function() {
    gadget.getMainContent(continuation);
  }, 0);
};

shindig.BaseIfrGadget.prototype.getIframeId = function() {
  return this.GADGET_IFRAME_PREFIX_ + this.id;
};

shindig.BaseIfrGadget.prototype.getUserPrefsDialogId = function() {
  return this.getIframeId() + '_userPrefsDialog';
};

shindig.BaseIfrGadget.prototype.getUserPrefsParams = function() {
  var params = '';
  for(var name in this.getUserPrefs()) {
    params += '&up_' + encodeURIComponent(name) + '=' +
        encodeURIComponent(this.getUserPrefValue(name));
  }
  return params;
};

shindig.BaseIfrGadget.prototype.handleToggle = function() {
  var gadgetIframe = document.getElementById(this.getIframeId());
  if (gadgetIframe) {
    var gadgetContent = gadgetIframe.parentNode;
    var display = gadgetContent.style.display;
    gadgetContent.style.display = display ? '' : 'none';
  }
};


shindig.BaseIfrGadget.prototype.hasViewablePrefs_ = function() {
  for(var name in this.getUserPrefs()) {
    var pref = this.userPrefs[name];
    if (pref.type != 'hidden') {
      return true;
    }
  }
  return false;
};


shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog = function() {
  if (this.userPrefsDialogContentLoaded) {
    this.showUserPrefsDialog();
  } else {
    var gadget = this;
    var igCallbackName = 'ig_callback_' + this.id;
    window[igCallbackName] = function(userPrefsDialogContent) {
      gadget.userPrefsDialogContentLoaded = true;
      gadget.buildUserPrefsDialog(userPrefsDialogContent);
      gadget.showUserPrefsDialog();
    };

    var script = document.createElement('script');
    script.src = 'http://www.gmodules.com/ig/gadgetsettings?mid=' + this.id +
        '&output=js' + this.getUserPrefsParams() +  '&url=' + this.specUrl;
    document.body.appendChild(script);
  }
};

shindig.BaseIfrGadget.prototype.buildUserPrefsDialog = function(content) {
  var userPrefsDialog = document.getElementById(this.getUserPrefsDialogId());
  userPrefsDialog.innerHTML = content +
      '<div class="' + this.cssClassGadgetUserPrefsDialogActionBar +
      '"><input type="button" value="Save" onclick="shindig.container.getGadget(' +
      this.id +').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget(' +
      this.id +').handleCancelUserPrefs()"></div>';
  userPrefsDialog.childNodes[0].style.display = '';
};

shindig.BaseIfrGadget.prototype.showUserPrefsDialog = function(opt_show) {
  var userPrefsDialog = document.getElementById(this.getUserPrefsDialogId());
  userPrefsDialog.style.display = (opt_show || opt_show === undefined)
      ? '' : 'none';
};

shindig.BaseIfrGadget.prototype.hideUserPrefsDialog = function() {
  this.showUserPrefsDialog(false);
};

shindig.BaseIfrGadget.prototype.handleSaveUserPrefs = function() {
  this.hideUserPrefsDialog();

  var numFields = document.getElementById('m_' + this.id +
      '_numfields').value;
  for (var i = 0; i < numFields; i++) {
    var input = document.getElementById('m_' + this.id + '_' + i);
    var userPrefNamePrefix = 'm_' + this.id + '_up_';
    var userPrefName = input.name.substring(userPrefNamePrefix.length);
    var userPrefValue = input.value;
    this.userPrefs[userPrefName].value = userPrefValue;
  }

  this.saveUserPrefs();
  this.refresh();
};

shindig.BaseIfrGadget.prototype.handleCancelUserPrefs = function() {
  this.hideUserPrefsDialog();
};

shindig.BaseIfrGadget.prototype.refresh = function() {
  var iframeId = this.getIframeId();
  document.getElementById(iframeId).src = this.getIframeUrl();
};

shindig.BaseIfrGadget.prototype.queryIfrGadgetType_ = function() {
  // Get the gadget metadata and check if the gadget requires the 'pubsub-2'
  // feature.  If so, then we use OpenAjax Hub in order to create and manage
  // the iframe.  Otherwise, we create the iframe ourselves.
  var request = {
    context: {
      country: "default",
      language: "default",
      view: "default",
      container: "default"
    },
    gadgets: [{
      url: this.specUrl,
      moduleId: 1
    }]
  };

  var makeRequestParams = {
    "CONTENT_TYPE" : "JSON",
    "METHOD" : "POST",
    "POST_DATA" : gadgets.json.stringify(request)
  };

  var url = this.serverBase_+"metadata?st=" + this.secureToken;

  gadgets.io.makeNonProxiedRequest(url,
    handleJSONResponse,
    makeRequestParams,
    "application/javascript"
  );
  
  var gadget = this;
  function handleJSONResponse(obj) {
    var requiresPubSub2 = false;
    var arr = obj.data.gadgets[0].features;
    for(var i = 0; i < arr.length; i++) {
      if (arr[i] === "pubsub-2") {
        requiresPubSub2 = true;
        break;
      }
    }
    var subClass = requiresPubSub2 ? shindig.OAAIfrGadget : shindig.IfrGadget;
    for (var name in subClass) if (subClass.hasOwnProperty(name)) {
      gadget[name] = subClass[name];
    }
  }
};

// ---------
// IfrGadget

shindig.IfrGadget = {
  getMainContent: function(continuation) {
    var iframeId = this.getIframeId();
    gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
    gadgets.rpc.setAuthToken(iframeId, this.rpcToken);
    continuation('<div class="' + this.cssClassGadgetContent + '"><iframe id="' +
        iframeId + '" name="' + iframeId + '" class="' + this.cssClassGadget +
        '" src="about:blank' +
        '" frameborder="no" scrolling="no"' +
        (this.height ? ' height="' + this.height + '"' : '') +
        (this.width ? ' width="' + this.width + '"' : '') +
        '></iframe></div>');
  },
  
  finishRender: function(chrome) {
    window.frames[this.getIframeId()].location = this.getIframeUrl();
  },
  
  getIframeUrl: function() {
    return this.serverBase_ + 'ifr?' +
        'container=' + this.CONTAINER +
        '&mid=' +  this.id +
        '&nocache=' + shindig.container.nocache_ +
        '&country=' + shindig.container.country_ +
        '&lang=' + shindig.container.language_ +
        '&view=' + shindig.container.view_ +
        (this.specVersion ? '&v=' + this.specVersion : '') +
        (shindig.container.parentUrl_ ? '&parent=' + encodeURIComponent(shindig.container.parentUrl_) : '') +
        (this.debug ? '&debug=1' : '') +
        this.getAdditionalParams() +
        this.getUserPrefsParams() +
        (this.secureToken ? '&st=' + this.secureToken : '') +
        '&url=' + encodeURIComponent(this.specUrl) +
        '#rpctoken=' + this.rpcToken +
        (this.viewParams ?
            '&view-params=' +  encodeURIComponent(gadgets.json.stringify(this.viewParams)) : '') +
        (this.hashData ? '&' + this.hashData : '');
  }
};


// ---------
// OAAIfrGadget

shindig.OAAIfrGadget = {
  getMainContent: function(continuation) {
    continuation('<div id="' + this.cssClassGadgetContent + '-' + this.id +
        '" class="' + this.cssClassGadgetContent + '"></div>');
  },
  
  finishRender: function(chrome) {
    var iframeAttrs = {
      className: this.cssClassGadget,
      frameborder: "no",
      scrolling: "no"
    };
    if (this.height) {
      iframeAttrs.height = this.height;
    }
    if (this.width) {
      iframeAttrs.width = this.width;
    }
    
    new OpenAjax.hub.IframeContainer(
      gadgets.pubsub2router.hub,
      this.getIframeId(),
      {
        Container: {
          onSecurityAlert: function( source, alertType) {
                gadgets.error("Security error for container " + source.getClientID() + " : " + alertType);
                source.getIframe().src = "about:blank"; 
// for debugging
   //          },
   //          onConnect: function( container ) {
   //            gadgets.log("++ connected: " + container.getClientID());
            }
        },
        IframeContainer: {
          parent: document.getElementById(this.cssClassGadgetContent + '-' + this.id),
          uri: this.getIframeUrl(),
          tunnelURI: shindig.uri(this.serverBase_ + this.rpcRelay).resolve(shindig.uri(window.location.href)),
          iframeAttrs: iframeAttrs
        }
      }
    );
  },
  
  getIframeUrl: function() {
    return this.serverBase_ + 'ifr?' +
        'container=' + this.CONTAINER +
        '&mid=' +  this.id +
        '&nocache=' + shindig.container.nocache_ +
        '&country=' + shindig.container.country_ +
        '&lang=' + shindig.container.language_ +
        '&view=' + shindig.container.view_ +
        (this.specVersion ? '&v=' + this.specVersion : '') +
   //      (shindig.container.parentUrl_ ? '&parent=' + encodeURIComponent(shindig.container.parentUrl_) : '') +
        (this.debug ? '&debug=1' : '') +
        this.getAdditionalParams() +
        this.getUserPrefsParams() +
        (this.secureToken ? '&st=' + this.secureToken : '') +
        '&url=' + encodeURIComponent(this.specUrl) +
   //      '#rpctoken=' + this.rpcToken +
        (this.viewParams ?
            '&view-params=' +  encodeURIComponent(gadgets.json.stringify(this.viewParams)) : '') +
   //      (this.hashData ? '&' + this.hashData : '');
        (this.hashData ? '#' + this.hashData : '');
  }
};


// ---------
// Container

/**
 * Container interface.
 * @constructor
 */
shindig.Container = function() {
  this.gadgets_ = {};
  this.parentUrl_ = document.location.href + '://' + document.location.host;
  this.country_ = 'ALL';
  this.language_ = 'ALL';
  this.view_ = 'default';
  this.nocache_ = 1;

  // signed max int
  this.maxheight_ = 0x7FFFFFFF;
};

shindig.Container.inherits(shindig.Extensible);

/**
 * Known dependencies:
 *     gadgetClass: constructor to create a new gadget instance
 *     userPrefStore: instance of a subclass of shindig.UserPrefStore
 *     gadgetService: instance of a subclass of shindig.GadgetService
 *     layoutManager: instance of a subclass of shindig.LayoutManager
 */

shindig.Container.prototype.gadgetClass = shindig.Gadget;

shindig.Container.prototype.userPrefStore = new shindig.DefaultUserPrefStore();

shindig.Container.prototype.gadgetService = new shindig.GadgetService();

shindig.Container.prototype.layoutManager =
    new shindig.StaticLayoutManager();

shindig.Container.prototype.setParentUrl = function(url) {
  this.parentUrl_ = url;
};

shindig.Container.prototype.setCountry = function(country) {
  this.country_ = country;
};

shindig.Container.prototype.setNoCache = function(nocache) {
  this.nocache_ = nocache;
};

shindig.Container.prototype.setLanguage = function(language) {
  this.language_ = language;
};

shindig.Container.prototype.setView = function(view) {
  this.view_ = view;
};

shindig.Container.prototype.setMaxHeight = function(maxheight) {
  this.maxheight_ = maxheight;
};

shindig.Container.prototype.getGadgetKey_ = function(instanceId) {
  return 'gadget_' + instanceId;
};

shindig.Container.prototype.getGadget = function(instanceId) {
  return this.gadgets_[this.getGadgetKey_(instanceId)];
};

shindig.Container.prototype.createGadget = function(opt_params) {
  return new this.gadgetClass(opt_params);
};

shindig.Container.prototype.addGadget = function(gadget) {
  gadget.id = this.getNextGadgetInstanceId();
  this.gadgets_[this.getGadgetKey_(gadget.id)] = gadget;
};

shindig.Container.prototype.addGadgets = function(gadgets) {
  for (var i = 0; i < gadgets.length; i++) {
    this.addGadget(gadgets[i]);
  }
};

/**
 * Renders all gadgets in the container.
 */
shindig.Container.prototype.renderGadgets = function() {
  for (var key in this.gadgets_) {
    this.renderGadget(this.gadgets_[key]);
  }
};

/**
 * Renders a gadget.  Gadgets are rendered inside their chrome element.
 * @param {Object} gadget Gadget object
 */
shindig.Container.prototype.renderGadget = function(gadget) {
  throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY);
};

shindig.Container.prototype.nextGadgetInstanceId_ = 0;

shindig.Container.prototype.getNextGadgetInstanceId = function() {
  return this.nextGadgetInstanceId_++;
};

/**
 * Refresh all the gadgets in the container.
 */
shindig.Container.prototype.refreshGadgets = function() {
  for (var key in this.gadgets_) {
    this.gadgets_[key].refresh();
  }
};


// ------------
// IfrContainer

/**
 * Container that renders gadget using ifr.
 * @constructor
 */
shindig.IfrContainer = function() {
  shindig.Container.call(this);
};

shindig.IfrContainer.inherits(shindig.Container);

shindig.IfrContainer.prototype.gadgetClass = shindig.BaseIfrGadget;

shindig.IfrContainer.prototype.gadgetService = new shindig.IfrGadgetService();

shindig.IfrContainer.prototype.setParentUrl = function(url) {
  if (!url.match(/^http[s]?:\/\//)) {
    url = document.location.href.match(/^[^?#]+\//)[0] + url;
  }

  this.parentUrl_ = url;
};

/**
 * Renders a gadget using ifr.
 * @param {Object} gadget Gadget object
 */
shindig.IfrContainer.prototype.renderGadget = function(gadget) {
  var chrome = this.layoutManager.getGadgetChrome(gadget);
  gadget.render(chrome);
};

/**
 * Default container.
 */
shindig.container = new shindig.IfrContainer();
;
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Base OSAPI binding
 */

/**
 * Container-side binding for the gadgetsrpctransport used by osapi. Containers
 * add services to the client-side osapi implementation by defining them in the osapi
 * namespace
 */
if (gadgets && gadgets.rpc) { //Only define if gadgets rpc exists

  /**
   * Dispatch a JSON-RPC batch request to services defined in the osapi namespace
   * @param callbackId
   * @param requests
   */
  osapi._handleGadgetRpcMethod = function(requests) {
    var responses = new Array(requests.length);
    var callCount = 0;
    var callback = this.callback;
    var dummy = function(params, apiCallback) {
      apiCallback({});
    };
    for (var i = 0; i < requests.length; i++) {
      // Don't allow underscores in any part of the method name as a convention
      // for restricted methods
      var current = osapi;
      if (requests[i].method.indexOf("_") == -1) {
        var path = requests[i].method.split(".");
        for (var j = 0; j < path.length; j++) {
          if (current.hasOwnProperty(path[j])) {
            current = current[path[j]];
          } else {
            // No matching api
            current = dummy;
            break;
          }
        }
      } else {
        current = dummy;
      }

      // Execute the call and latch the rpc callback until all
      // complete
      current(requests[i].params, function(i) {
        return function(response) {
          // Put back in json-rpc format
          responses[i] = { id : requests[i].id, data : response};
          callCount++;
          if (callCount == requests.length) {
            callback(responses);
          }
        };
      }(i));
    }
  };

  /**
   * Basic implementation of system.listMethods which can be used to introspect
   * available services
   * @param request
   * @param callback
   */
  osapi.container = {};
  osapi.container["listMethods"] = function(request, callback) {
    var names = [];
    recurseNames(osapi, "", 5, names)
    callback(names);
  };

  /**
   * Recurse the object paths to a limited depth
   */
  function recurseNames(base, path, depth, accumulated) {
    if (depth == 0) return;
    for (var prop in base) if (base.hasOwnProperty(prop)) {
      if (prop.indexOf("_") == -1) {
        var type = typeof(base[prop]);
        if (type == "function") {
          accumulated.push(path + prop);
        } else if (type == "object") {
          recurseNames(base[prop], path + prop + ".", depth - 1, accumulated);
        }
      }
    }
  }

  // Register the osapi RPC dispatcher.
  gadgets.rpc.register("osapi._handleGadgetRpcMethod", osapi._handleGadgetRpcMethod);
}
;
/*******************************************************************************
 * OpenAjax-mashup.js
 *
 * Reference implementation of the OpenAjax Hub, as specified by OpenAjax Alliance.
 * Specification is under development at: 
 *
 *   http://www.openajax.org/member/wiki/OpenAjax_Hub_Specification
 *
 * Copyright 2006-2009 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not 
 * use this file except in compliance with the License. You may obtain a copy 
 * of the License at http://www.apache.org/licenses/LICENSE-2.0 . Unless 
 * required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 *
 ******************************************************************************/

var OpenAjax = OpenAjax || {};

if ( !OpenAjax.hub ) {  // prevent re-definition of the OpenAjax.hub object

OpenAjax.hub = function() {
    var libs = {};
    var ooh = "org.openajax.hub.";

    return /** @scope OpenAjax.hub */ {
        implementer: "http://openajax.org",
        implVersion: "2.0.4",
        specVersion: "2.0",
        implExtraData: {},
        libraries: libs,
    
        registerLibrary: function(prefix, nsURL, version, extra) {
            libs[prefix] = {
                prefix: prefix,
                namespaceURI: nsURL,
                version: version,
                extraData: extra 
            };
            this.publish(ooh+"registerLibrary", libs[prefix]);
        },
        
        unregisterLibrary: function(prefix) {
            this.publish(ooh+"unregisterLibrary", libs[prefix]);
            delete libs[prefix];
        }
    };
}();

/**
 * Error
 * 
 * Standard Error names used when the standard functions need to throw Errors.
 */
OpenAjax.hub.Error = {
    // Either a required argument is missing or an invalid argument was provided
    BadParameters: "OpenAjax.hub.Error.BadParameters",
    // The specified hub has been disconnected and cannot perform the requested
    // operation:
    Disconnected: "OpenAjax.hub.Error.Disconnected",
    // Container with specified ID already exists:
    Duplicate: "OpenAjax.hub.Error.Duplicate",
    // The specified ManagedHub has no such Container (or it has been removed)
    NoContainer: "OpenAjax.hub.Error.NoContainer",
    // The specified ManagedHub or Container has no such subscription
    NoSubscription: "OpenAjax.hub.Error.NoSubscription",
    // Permission denied by manager's security policy
    NotAllowed: "OpenAjax.hub.Error.NotAllowed",
    // Wrong communications protocol identifier provided by Container or HubClient
    WrongProtocol: "OpenAjax.hub.Error.WrongProtocol",
    // A 'tunnelURI' param was specified, but current browser does not support security features
    IncompatBrowser: "OpenAjax.hub.Error.IncompatBrowser"
};

/**
 * SecurityAlert
 * 
 * Standard codes used when attempted security violations are detected. Unlike
 * Errors, these codes are not thrown as exceptions but rather passed into the 
 * SecurityAlertHandler function registered with the Hub instance.
 */
OpenAjax.hub.SecurityAlert = {
    // Container did not load (possible frame phishing attack)
    LoadTimeout: "OpenAjax.hub.SecurityAlert.LoadTimeout",
    // Hub suspects a frame phishing attack against the specified container
    FramePhish: "OpenAjax.hub.SecurityAlert.FramePhish",
    // Hub detected a message forgery that purports to come to a specified
    // container
    ForgedMsg: "OpenAjax.hub.SecurityAlert.ForgedMsg"
};

/**
 * Debugging Help
 *
 * OpenAjax.hub.enableDebug
 *
 *      If OpenAjax.hub.enableDebug is set to true, then the "debugger" keyword
 *      will get hit whenever a user callback throws an exception, thereby
 *      bringing up the JavaScript debugger.
 */
OpenAjax.hub._debugger = function() {
//    if ( OpenAjax.hub.enableDebug ) debugger; // REMOVE ON BUILD
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Hub interface
 * 
 * Hub is implemented on the manager side by ManagedHub and on the client side
 * by ClientHub.
 */
//OpenAjax.hub.Hub = function() {}

/**
 * Subscribe to a topic.
 *
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function} onData   
 *     Callback function that is invoked whenever an event is 
 *     published on the topic
 * @param {Object} [scope]
 *     When onData callback or onComplete callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {Function} [onComplete]
 *     Invoked to tell the client application whether the 
 *     subscribe operation succeeded or failed. 
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData callback function.
 * 
 * @returns subscriptionID
 *     Identifier representing the subscription. This identifier is an 
 *     arbitrary ID string that is unique within this Hub instance
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid (e.g. contains an empty token)
 */
//OpenAjax.hub.Hub.prototype.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {}

/**
 * Publish an event on a topic
 *
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data. To be portable across different
 *     Container implementations, this value SHOULD be serializable
 *     as JSON.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published (e.g. contains 
 *     wildcards or empty tokens) or if the data cannot be published (e.g. cannot be serialized as JSON)
 */
//OpenAjax.hub.Hub.prototype.publish = function( topic, data ) {}

/**
 * Unsubscribe from a subscription
 *
 * @param {String} subscriptionID
 *     A subscriptionID returned by Hub.subscribe()
 * @param {Function} [onComplete]
 *     Callback function invoked when unsubscribe completes
 * @param {Object} [scope]
 *     When onComplete callback function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
//OpenAjax.hub.Hub.prototype.unsubscribe = function( subscriptionID, onComplete, scope ) {}

/**
 * Return true if this Hub instance is in the Connected state.
 * Else returns false.
 * 
 * This function can be called even if the Hub is not in a CONNECTED state.
 * 
 * @returns Boolean
 * @type {Boolean}
 */
//OpenAjax.hub.Hub.prototype.isConnected = function() {}

/**
 * Returns the scope associated with this Hub instance and which will be used
 * with callback functions.
 * 
 * This function can be called even if the Hub is not in a CONNECTED state.
 * 
 * @returns scope object
 * @type {Object}
 */
//OpenAjax.hub.Hub.prototype.getScope = function() {}

/**
 * Returns the subscriberData parameter that was provided when 
 * Hub.subscribe was called.
 *
 * @param {String} subscriptionID
 *     The subscriberID of a subscription
 * 
 * @returns subscriberData
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
//OpenAjax.hub.Hub.prototype.getSubscriberData = function(subscriptionID) {}

/**
 * Returns the scope associated with a specified subscription.  This scope will
 * be used when invoking the 'onData' callback supplied to Hub.subscribe().
 *
 * @param {String} subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns scope
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
//OpenAjax.hub.Hub.prototype.getSubscriberScope = function(subscriberID) {}

/**
 * Returns the params object associated with this Hub instance.
 *
 * @returns params
 *     The params object associated with this Hub instance
 * @type {Object}
 */
//OpenAjax.hub.Hub.prototype.getParameters = function() {}

////////////////////////////////////////////////////////////////////////////////

/**
 * HubClient interface 
 * 
 * Extends Hub interface.
 * 
 * A HubClient implementation is typically specific to a particular 
 * implementation of Container.
 */

/**
 * Create a new HubClient. All HubClient constructors MUST have this 
 * signature.
 * @constructor
 * 
 * @param {Object} params 
 *    Parameters used to instantiate the HubClient.
 *    Once the constructor is called, the params object belongs to the
 *    HubClient. The caller MUST not modify it.
 *    Implementations of HubClient may specify additional properties
 *    for the params object, besides those identified below. 
 * 
 * @param {Function} params.HubClient.onSecurityAlert
 *     Called when an attempted security breach is thwarted
 * @param {Object} [params.HubClient.scope]
 *     Whenever one of the HubClient's callback functions is called,
 *     references to "this" in the callback will refer to the scope object.
 *     If not provided, the default is window.
 * @param {Function} [params.HubClient.log]
 *     Optional logger function. Would be used to log to console.log or
 *     equivalent. 
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *     parameters is missing, or if a parameter value is invalid in 
 *     some way.
 */
//OpenAjax.hub.HubClient = function( params ) {}

/**
 * Requests a connection to the ManagedHub, via the Container
 * associated with this HubClient.
 * 
 * If the Container accepts the connection request, the HubClient's 
 * state is set to CONNECTED and the HubClient invokes the 
 * onComplete callback function.
 * 
 * If the Container refuses the connection request, the HubClient
 * invokes the onComplete callback function with an error code. 
 * The error code might, for example, indicate that the Container 
 * is being destroyed.
 * 
 * In most implementations, this function operates asynchronously, 
 * so the onComplete callback function is the only reliable way to
 * determine when this function completes and whether it has succeeded
 * or failed.
 * 
 * A client application may call HubClient.disconnect and then call
 * HubClient.connect.
 * 
 * @param {Function} [onComplete]
 *     Callback function to call when this operation completes.
 * @param {Object} [scope]  
 *     When the onComplete function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *
 * @throws {OpenAjax.hub.Error.Duplicate} if the HubClient is already connected
 */
//OpenAjax.hub.HubClient.prototype.connect = function( onComplete, scope ) {}

/**
 * Disconnect from the ManagedHub
 * 
 * Disconnect immediately:
 * 
 * 1. Sets the HubClient's state to DISCONNECTED.
 * 2. Causes the HubClient to send a Disconnect request to the 
 * 		associated Container. 
 * 3. Ensures that the client application will receive no more
 * 		onData or onComplete callbacks associated with this 
 * 		connection, except for the disconnect function's own
 * 		onComplete callback.
 * 4. Automatically destroys all of the HubClient's subscriptions.
 *
 * In most implementations, this function operates asynchronously, 
 * so the onComplete callback function is the only reliable way to
 * determine when this function completes and whether it has succeeded
 * or failed.
 * 
 * A client application is allowed to call HubClient.disconnect and 
 * then call HubClient.connect.
 * 	
 * @param {Function} [onComplete]
 *     Callback function to call when this operation completes.
 * @param {Object} [scope]  
 *     When the onComplete function is invoked, the JavaScript "this"
 *     keyword refers to the scope object.
 *     If no scope is provided, default is window.
 *
 * @throws {OpenAjax.hub.Error.Disconnected} if the HubClient is already
 *     disconnected
 */
//OpenAjax.hub.HubClient.prototype.disconnect = function( onComplete, scope ) {}

/**
 * If DISCONNECTED: Returns null
 * If CONNECTED: Returns the origin associated with the window containing the
 * Container associated with this HubClient instance. The origin has the format
 *  
 * [protocol]://[host]
 * 
 * where:
 * 
 * [protocol] is "http" or "https"
 * [host] is the hostname of the partner page.
 * 
 * @returns Partner's origin
 * @type {String}
 */
//OpenAjax.hub.HubClient.prototype.getPartnerOrigin = function() {}

/**
 * Returns the client ID of this HubClient
 *
 * @returns clientID
 * @type {String}
 */
//OpenAjax.hub.HubClient.prototype.getClientID = function() {}

////////////////////////////////////////////////////////////////////////////////

/**
 * OpenAjax.hub.ManagedHub
 *
 * Managed hub API for the manager application and for Containers. 
 * 
 * Implements OpenAjax.hub.Hub.
 */

/**
 * Create a new ManagedHub instance
 * @constructor
 *     
 * This constructor automatically sets the ManagedHub's state to
 * CONNECTED.
 * 
 * @param {Object} params
 *     Parameters used to instantiate the ManagedHub.
 *     Once the constructor is called, the params object belongs exclusively to
 *     the ManagedHub. The caller MUST not modify it.
 *     
 * The params object may contain the following properties:
 * 
 * @param {Function} params.onPublish
 *     Callback function that is invoked whenever a 
 *     data value published by a Container is about
 *     to be delivered to some (possibly the same) Container.
 *     This callback function implements a security policy;
 *     it returns true if the delivery of the data is
 *     permitted and false if permission is denied.
 * @param {Function} params.onSubscribe
 *     Called whenever a Container tries to subscribe
 *     on behalf of its client.
 *     This callback function implements a security policy;
 *     it returns true if the subscription is permitted 
 *     and false if permission is denied.
 * @param {Function} [params.onUnsubscribe]
 *     Called whenever a Container unsubscribes on behalf of its client. 
 *     Unlike the other callbacks, onUnsubscribe is intended only for 
 *     informative purposes, and is not used to implement a security
 *     policy.
 * @param {Object} [params.scope]
 *     Whenever one of the ManagedHub's callback functions is called,
 *     references to the JavaScript "this" keyword in the callback 
 *     function refer to this scope object
 *     If no scope is provided, default is window.
 * @param {Function} [params.log]  Optional logger function. Would
 *     be used to log to console.log or equivalent.
 * 
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *     parameters are missing
 */
OpenAjax.hub.ManagedHub = function( params )
{
    if ( ! params || ! params.onPublish || ! params.onSubscribe )
        throw new Error( OpenAjax.hub.Error.BadParameters );
    
    this._p = params;
    this._onUnsubscribe = params.onUnsubscribe ? params.onUnsubscribe : null;
    this._scope = params.scope || window;

    if ( params.log ) {
        var that = this;
        this._log = function( msg ) {
            try {
                params.log.call( that._scope, "ManagedHub: " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        this._log = function() {};
    }

    this._subscriptions = { c:{}, s:null };
    this._containers = {};

    // Sequence # used to create IDs that are unique within this hub
    this._seq = 0;

    this._active = true;
    
    this._isPublishing = false;
    this._pubQ = [];
}

/**
 * Subscribe to a topic on behalf of a Container. Called only by 
 * Container implementations, NOT by manager applications.
 * 
 * This function:
 * 1. Checks with the ManagedHub's onSubscribe security policy
 *    to determine whether this Container is allowed to subscribe 
 *    to this topic.
 * 2. If the subscribe operation is permitted, subscribes to the
 *    topic and returns the ManagedHub's subscription ID for this
 *    subscription. 
 * 3. If the subscribe operation is not permitted, throws
 *    OpenAjax.hub.Error.NotAllowed.
 * 
 * When data is published on the topic, the ManagedHub's 
 * onPublish security policy will be invoked to ensure that
 * this Container is permitted to receive the published data.
 * If the Container is allowed to receive the data, then the
 * Container's sendToClient function will be invoked.
 * 
 * When a Container needs to create a subscription on behalf of
 * its client, the Container MUST use this function to create
 * the subscription.
 * 
 * @param {OpenAjax.hub.Container} container  
 *     A Container
 * @param {String} topic 
 *     A valid topic
 * @param {String} containerSubID  
 *     Arbitrary string ID that the Container uses to 
 *     represent the subscription. Must be unique within the 
 *     context of the Container
 *
 * @returns managerSubID  
 *     Arbitrary string ID that this ManagedHub uses to 
 *     represent the subscription. Will be unique within the 
 *     context of this ManagedHub
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 * @throws {OpenAjax.hub.Error.NotAllowed} if subscription request is denied by the onSubscribe security policy
 * @throws {OpenAjax.hub.Error.BadParameters} if one of the parameters, e.g. the topic, is invalid
 */
OpenAjax.hub.ManagedHub.prototype.subscribeForClient = function( container, topic, containerSubID )
{
    this._assertConn();
    // check subscribe permission
    if ( this._invokeOnSubscribe( topic, container ) ) {
        // return ManagedHub's subscriptionID for this subscription
        return this._subscribe( topic, this._sendToClient, this, { c: container, sid: containerSubID } );
    }
    throw new Error(OpenAjax.hub.Error.NotAllowed);
}

/**
 * Unsubscribe from a subscription on behalf of a Container. Called only by 
 * Container implementations, NOT by manager application code.
 * 
 * This function:
 * 1. Destroys the specified subscription
 * 2. Calls the ManagedHub's onUnsubscribe callback function
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {OpenAjax.hub.Container} container  
 *    container instance that is unsubscribing
 * @param {String} managerSubID  
 *    opaque ID of a subscription, returned by previous call to subscribeForClient()
 * 
 * @throws {OpenAjax.hub.Error.NoSubscription} if subscriptionID does not refer to a valid subscription
 */
OpenAjax.hub.ManagedHub.prototype.unsubscribeForClient = function( container, managerSubID )
{
    this._unsubscribe( managerSubID );
    this._invokeOnUnsubscribe( container, managerSubID );
}
  
/**
 * Publish data on a topic on behalf of a Container. Called only by 
 * Container implementations, NOT by manager application code.
 *
 * @param {OpenAjax.hub.Container} container
 *      Container on whose behalf data should be published
 * @param {String} topic
 *      Valid topic string. Must NOT contain wildcards.
 * @param {*} data
 *      Valid publishable data. To be portable across different
 *      Container implementations, this value SHOULD be serializable
 *      as JSON.
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 * @throws {OpenAjax.hub.Error.BadParameters} if one of the parameters, e.g. the topic, is invalid
 */
OpenAjax.hub.ManagedHub.prototype.publishForClient = function( container, topic, data )
{
    this._assertConn();
    this._publish( topic, data, container );
}

/**
 * Destroy this ManagedHub
 * 
 * 1. Sets state to DISCONNECTED. All subsequent attempts to add containers,
 *  publish or subscribe will throw the Disconnected error. We will
 *  continue to allow "cleanup" operations such as removeContainer
 *  and unsubscribe, as well as read-only operations such as 
 *  isConnected
 * 2. Remove all Containers associated with this ManagedHub
 */
OpenAjax.hub.ManagedHub.prototype.disconnect = function()
{
    this._active = false;
    for (var c in this._containers) {
        this.removeContainer( this._containers[c] );
    }
}

/**
 * Get a container belonging to this ManagedHub by its clientID, or null
 * if this ManagedHub has no such container
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {String} containerId
 *      Arbitrary string ID associated with the container
 *
 * @returns container associated with given ID
 * @type {OpenAjax.hub.Container}
 */
OpenAjax.hub.ManagedHub.prototype.getContainer = function( containerId ) 
{
    var container = this._containers[containerId];
    return container ? container : null;
}

/**
 * Returns an array listing all containers belonging to this ManagedHub.
 * The order of the Containers in this array is arbitrary.
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @returns container array
 * @type {OpenAjax.hub.Container[]}
 */
OpenAjax.hub.ManagedHub.prototype.listContainers = function() 
{
    var res = [];
    for (var c in this._containers) { 
        res.push(this._containers[c]);
    }
    return res;
}

/**
 * Add a container to this ManagedHub.
 *
 * This function should only be called by a Container constructor.
 * 
 * @param {OpenAjax.hub.Container} container
 *      A Container to be added to this ManagedHub
 * 
 * @throws {OpenAjax.hub.Error.Duplicate} if there is already a Container
 *      in this ManagedHub whose clientId is the same as that of container
 * @throws {OpenAjax.hub.Error.Disconnected} if this.isConnected() returns false
 */
OpenAjax.hub.ManagedHub.prototype.addContainer = function( container ) 
{ 
    this._assertConn();
    var containerId = container.getClientID();
    if ( this._containers[containerId] ) {
        throw new Error(OpenAjax.hub.Error.Duplicate);
    }
    this._containers[containerId] = container;
}

/**
 * Remove a container from this ManagedHub immediately
 * 
 * This function can be called even if the ManagedHub is not in a CONNECTED state.
 * 
 * @param {OpenAjax.hub.Container} container  
 *      A Container to be removed from this ManagedHub
 *  
 * @throws {OpenAjax.hub.Error.NoContainer}  if no such container is found
 */
OpenAjax.hub.ManagedHub.prototype.removeContainer = function( container )
{
    var containerId = container.getClientID();
    if ( ! this._containers[ containerId ] ) {
        throw new Error(OpenAjax.hub.Error.NoContainer);
    }
    container.remove();
    delete this._containers[ containerId ];
}

    /*** OpenAjax.hub.Hub interface implementation ***/

/**
 * Subscribe to a topic.
 * 
 * This implementation of Hub.subscribe is synchronous. When subscribe 
 * is called:
 * 
 * 1. The ManagedHub's onSubscribe callback is invoked. The 
 * 		container parameter is null, because the manager application, 
 * 		rather than a container, is subscribing.
 * 2. If onSubscribe returns true, then the subscription is created.
 * 3. The onComplete callback is invoked.
 * 4. Then this function returns.
 * 
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function} onData   
 *     Callback function that is invoked whenever an event is 
 *     published on the topic
 * @param {Object} [scope]
 *     When onData callback or onComplete callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {Function} [onComplete]
 *     Invoked to tell the client application whether the 
 *     subscribe operation succeeded or failed. 
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData and onComplete callback functions.
 * 
 * @returns subscriptionID
 *     Identifier representing the subscription. This identifier is an 
 *     arbitrary ID string that is unique within this Hub instance
 * @type {String}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid (e.g. contains an empty token)
 */
OpenAjax.hub.ManagedHub.prototype.subscribe = function( topic, onData, scope, onComplete, subscriberData ) 
{
    this._assertConn();
    this._assertSubTopic(topic);
    if ( ! onData ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    
    scope = scope || window;
    
    // check subscribe permission
    if ( ! this._invokeOnSubscribe( topic, null ) ) {
        this._invokeOnComplete( onComplete, scope, null, false, OpenAjax.hub.Error.NotAllowed );
        return;
    }
    
    // on publish event, check publish permissions
    var that = this;
    function publishCB( topic, data, sd, pcont ) {
        if ( that._invokeOnPublish( topic, data, pcont, null ) ) {
            try {
                onData.call( scope, topic, data, subscriberData );
            } catch( e ) {
                OpenAjax.hub._debugger();
                that._log( "caught error from onData callback to Hub.subscribe(): " + e.message );
            }
        }
    }
    var subID = this._subscribe( topic, publishCB, scope, subscriberData );
    this._invokeOnComplete( onComplete, scope, subID, true );
    return subID;
}

/**
 * Publish an event on a topic
 *
 * This implementation of Hub.publish is synchronous. When publish 
 * is called:
 * 
 * 1. The target subscriptions are identified.
 * 2. For each target subscription, the ManagedHub's onPublish
 * 		callback is invoked. Data is only delivered to a target
 * 		subscription if the onPublish callback returns true.
 * 		The pcont parameter of the onPublish callback is null.
 *      This is because the ManagedHub, rather than a container,
 *      is publishing the data.
 * 
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data. To be portable across different
 *     Container implementations, this value SHOULD be serializable
 *     as JSON.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published (e.g. contains 
 *     wildcards or empty tokens) or if the data cannot be published (e.g. cannot be serialized as JSON)
 */
OpenAjax.hub.ManagedHub.prototype.publish = function( topic, data ) 
{
    this._assertConn();
    this._assertPubTopic(topic);
    this._publish( topic, data, null );
}

/**
 * Unsubscribe from a subscription
 * 
 * This implementation of Hub.unsubscribe is synchronous. When unsubscribe 
 * is called:
 * 
 * 1. The subscription is destroyed.
 * 2. The ManagedHub's onUnsubscribe callback is invoked, if there is one.
 * 3. The onComplete callback is invoked.
 * 4. Then this function returns.
 * 
 * @param {String} subscriptionID
 *     A subscriptionID returned by Hub.subscribe()
 * @param {Function} [onComplete]
 *     Callback function invoked when unsubscribe completes
 * @param {Object} [scope]
 *     When onComplete callback function is invoked, the JavaScript "this"
 *     keyword refers to this scope object.
 *     If no scope is provided, default is window.
 *     
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
OpenAjax.hub.ManagedHub.prototype.unsubscribe = function( subscriptionID, onComplete, scope )
{
    this._assertConn();
    if ( ! subscriptionID ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    this._unsubscribe( subscriptionID );
    this._invokeOnUnsubscribe( null, subscriptionID );
    this._invokeOnComplete( onComplete, scope, subscriptionID, true );
}

/**
 * Returns true if disconnect() has NOT been called on this ManagedHub, 
 * else returns false
 * 
 * @returns Boolean
 * @type {Boolean}
 */
OpenAjax.hub.ManagedHub.prototype.isConnected = function()
{
    return this._active;
}

/**
* Returns the scope associated with this Hub instance and which will be used
* with callback functions.
* 
* This function can be called even if the Hub is not in a CONNECTED state.
* 
* @returns scope object
* @type {Object}
 */
OpenAjax.hub.ManagedHub.prototype.getScope = function()
{
    return this._scope;
}

/**
 * Returns the subscriberData parameter that was provided when 
 * Hub.subscribe was called.
 *
 * @param subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns subscriberData
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
OpenAjax.hub.ManagedHub.prototype.getSubscriberData = function( subscriberID )
{
    this._assertConn();
    var path = subscriberID.split(".");
    var sid = path.pop();
    var sub = this._getSubscriptionObject( this._subscriptions, path, 0, sid );
    if ( sub ) 
        return sub.data;
    throw new Error( OpenAjax.hub.Error.NoSubscription );
}

/**
 * Returns the scope associated with a specified subscription.  This scope will
 * be used when invoking the 'onData' callback supplied to Hub.subscribe().
 *
 * @param subscriberID
 *     The subscriberID of a subscription
 * 
 * @returns scope
 * @type {*}
 * 
 * @throws {OpenAjax.hub.Error.Disconnected} if this Hub instance is not in CONNECTED state
 * @throws {OpenAjax.hub.Error.NoSubscription} if there is no such subscription
 */
OpenAjax.hub.ManagedHub.prototype.getSubscriberScope = function( subscriberID )
{
    this._assertConn();
    var path = subscriberID.split(".");
    var sid = path.pop();
    var sub = this._getSubscriptionObject( this._subscriptions, path, 0, sid );
    if ( sub ) 
        return sub.scope;
    throw new Error( OpenAjax.hub.Error.NoSubscription );
}

/**
 * Returns the params object associated with this Hub instance.
 * Allows mix-in code to access parameters passed into constructor that created
 * this Hub instance.
 *
 * @returns params  the params object associated with this Hub instance
 * @type {Object}
 */
OpenAjax.hub.ManagedHub.prototype.getParameters = function()
{
    return this._p;
}


/* PRIVATE FUNCTIONS */

/**
 * Send a message to a container's client. 
 * This is an OAH subscriber's data callback. It is private to ManagedHub
 * and serves as an adapter between the OAH 1.0 API and Container.sendToClient.
 * 
 * @param {String} topic Topic on which data was published
 * @param {Object} data  Data to be delivered to the client
 * @param {Object} sd    Object containing properties 
 *     c: container to which data must be sent
 *     sid: subscription ID within that container
 * @param {Object} pcont  Publishing container, or null if this data was
 *      published by the manager
 */
OpenAjax.hub.ManagedHub.prototype._sendToClient = function(topic, data, sd, pcont) 
{
    if (!this.isConnected()) {
        return;
    }
    if ( this._invokeOnPublish( topic, data, pcont, sd.c ) ) {
        sd.c.sendToClient( topic, data, sd.sid );
    }
}

OpenAjax.hub.ManagedHub.prototype._assertConn = function() 
{
    if (!this.isConnected()) {
        throw new Error(OpenAjax.hub.Error.Disconnected);
    }
}

OpenAjax.hub.ManagedHub.prototype._assertPubTopic = function(topic) 
{
    if ( !topic || topic === "" || (topic.indexOf("*") != -1) ||
        (topic.indexOf("..") != -1) ||  (topic.charAt(0) == ".") ||
        (topic.charAt(topic.length-1) == "."))
    {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
}

OpenAjax.hub.ManagedHub.prototype._assertSubTopic = function(topic) 
{
    if ( ! topic ) {
        throw new Error(OpenAjax.hub.Error.BadParameters);
    }
    var path = topic.split(".");
    var len = path.length;
    for (var i = 0; i < len; i++) {
        var p = path[i];
        if ((p === "") ||
           ((p.indexOf("*") != -1) && (p != "*") && (p != "**"))) {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
        if ((p == "**") && (i < len - 1)) {
            throw new Error(OpenAjax.hub.Error.BadParameters);
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._invokeOnComplete = function( func, scope, item, success, errorCode )
{
    if ( func ) { // onComplete is optional
        try {
            scope = scope || window;
            func.call( scope, item, success, errorCode );
        } catch( e ) {
            OpenAjax.hub._debugger();
            this._log( "caught error from onComplete callback: " + e.message );
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._invokeOnPublish = function( topic, data, pcont, scont )
{
    try {
        return this._p.onPublish.call( this._scope, topic, data, pcont, scont );
    } catch( e ) {
        OpenAjax.hub._debugger();
        this._log( "caught error from onPublish callback to constructor: " + e.message );
    }
    return false;
}

OpenAjax.hub.ManagedHub.prototype._invokeOnSubscribe = function( topic, container )
{
    try {
        return this._p.onSubscribe.call( this._scope, topic, container );
    } catch( e ) {
        OpenAjax.hub._debugger();
        this._log( "caught error from onSubscribe callback to constructor: " + e.message );
    }
    return false;
}

OpenAjax.hub.ManagedHub.prototype._invokeOnUnsubscribe = function( container, managerSubID )
{
    if ( this._onUnsubscribe ) {
        var topic = managerSubID.slice( 0, managerSubID.lastIndexOf(".") );
        try {
            this._onUnsubscribe.call( this._scope, topic, container );
        } catch( e ) {
            OpenAjax.hub._debugger();
            this._log( "caught error from onUnsubscribe callback to constructor: " + e.message );
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._subscribe = function( topic, onData, scope, subscriberData ) 
{
    var handle = topic + "." + this._seq;
    var sub = { scope: scope, cb: onData, data: subscriberData, sid: this._seq++ };
    var path = topic.split(".");
    this._recursiveSubscribe( this._subscriptions, path, 0, sub );
    return handle;
}

OpenAjax.hub.ManagedHub.prototype._recursiveSubscribe = function(tree, path, index, sub) 
{
    var token = path[index];
    if (index == path.length) {
        sub.next = tree.s;
        tree.s = sub;
    } else { 
        if (typeof tree.c == "undefined") {
             tree.c = {};
         }
        if (typeof tree.c[token] == "undefined") {
            tree.c[token] = { c: {}, s: null }; 
            this._recursiveSubscribe(tree.c[token], path, index + 1, sub);
        } else {
            this._recursiveSubscribe( tree.c[token], path, index + 1, sub);
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._publish = function( topic, data, pcont )
{
    // if we are currently handling a publish event, then queue this request
    // and handle later, one by one
    if ( this._isPublishing ) {
        this._pubQ.push( { t: topic, d: data, p: pcont } );
        return;
    }
    
    this._safePublish( topic, data, pcont );
    
    while ( this._pubQ.length > 0 ) {
        var pub = this._pubQ.shift();
        this._safePublish( pub.t, pub.d, pub.p );
    }
}

OpenAjax.hub.ManagedHub.prototype._safePublish = function( topic, data, pcont )
{
    this._isPublishing = true;
    var path = topic.split(".");
    this._recursivePublish( this._subscriptions, path, 0, topic, data, pcont );
    this._isPublishing = false;
}

OpenAjax.hub.ManagedHub.prototype._recursivePublish = function(tree, path, index, name, msg, pcont) 
{
    if (typeof tree != "undefined") {
        var node;
        if (index == path.length) {
            node = tree;
        } else {
            this._recursivePublish(tree.c[path[index]], path, index + 1, name, msg, pcont);
            this._recursivePublish(tree.c["*"], path, index + 1, name, msg, pcont);
            node = tree.c["**"];
        }
        if (typeof node != "undefined") {
            var sub = node.s;
            while ( sub ) {
                var sc = sub.scope;
                var cb = sub.cb;
                var d = sub.data;
                if (typeof cb == "string") {
                    // get a function object
                    cb = sc[cb];
                }
                cb.call(sc, name, msg, d, pcont);
                sub = sub.next;
            }
        }
    }
}

OpenAjax.hub.ManagedHub.prototype._unsubscribe = function( subscriptionID )
{
    var path = subscriptionID.split(".");
    var sid = path.pop();
    if ( ! this._recursiveUnsubscribe( this._subscriptions, path, 0, sid ) ) {
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    }
}

/**
 * @returns 'true' if properly unsubscribed; 'false' otherwise
 */
OpenAjax.hub.ManagedHub.prototype._recursiveUnsubscribe = function(tree, path, index, sid) 
{
    if ( typeof tree == "undefined" ) {
        return false;
    }
    
    if (index < path.length) {
        var childNode = tree.c[path[index]];
        if ( ! childNode ) {
            return false;
        }
        this._recursiveUnsubscribe(childNode, path, index + 1, sid);
        if ( ! childNode.s ) {
            for (var x in childNode.c) {
                return true;
            }
            delete tree.c[path[index]];    
        }
    } else {
        var sub = tree.s;
        var sub_prev = null;
        var found = false;
        while ( sub ) {
            if ( sid == sub.sid ) {
                found = true;
                if ( sub == tree.s ) {
                    tree.s = sub.next;
                } else {
                    sub_prev.next = sub.next;
                }
                break;
            }
            sub_prev = sub;
            sub = sub.next;
        }
        if ( ! found ) {
            return false;
        }
    }
    
    return true;
}

OpenAjax.hub.ManagedHub.prototype._getSubscriptionObject = function( tree, path, index, sid )
{
    if (typeof tree != "undefined") {
        if (index < path.length) {
            var childNode = tree.c[path[index]];
            return this._getSubscriptionObject(childNode, path, index + 1, sid);
        }

        var sub = tree.s;
        while ( sub ) {
            if ( sid == sub.sid ) {
                return sub;
            }
            sub = sub.next;
        }
    }
    return null;
}


////////////////////////////////////////////////////////////////////////////////

/**
 * Container
 * @constructor
 * 
 * Container represents an instance of a manager-side object that contains and
 * communicates with a single client of the hub. The container might be an inline
 * container, an iframe FIM container, or an iframe PostMessage container, or
 * it might be an instance of some other implementation.
 *
 * @param {OpenAjax.hub.ManagedHub} hub
 *    Managed Hub instance
 * @param {String} clientID
 *    A string ID that identifies a particular client of a Managed Hub. Unique
 *    within the context of the ManagedHub.
 * @param {Object} params  
 *    Parameters used to instantiate the Container.
 *    Once the constructor is called, the params object belongs exclusively to
 *    the Container. The caller MUST not modify it.
 *    Implementations of Container may specify additional properties
 *    for the params object, besides those identified below.
 *    The following params properties MUST be supported by all Container 
 *    implementations:
 * @param {Function} params.Container.onSecurityAlert
 *    Called when an attempted security breach is thwarted.  Function is defined
 *    as follows:  function(container, securityAlert)
 * @param {Function} [params.Container.onConnect]
 *    Called when the client connects to the Managed Hub.  Function is defined
 *    as follows:  function(container)
 * @param {Function} [params.Container.onDisconnect]
 *    Called when the client disconnects from the Managed Hub.  Function is
 *    defined as follows:  function(container)
 * @param {Object} [params.Container.scope]
 *    Whenever one of the Container's callback functions is called, references
 *    to "this" in the callback will refer to the scope object. If no scope is
 *    provided, default is window.
 * @param {Function} [params.Container.log]
 *    Optional logger function. Would be used to log to console.log or
 *    equivalent. 
 *
 * @throws {OpenAjax.hub.Error.BadParameters}   if required params are not
 *   present or null
 * @throws {OpenAjax.hub.Error.Duplicate}   if a Container with this clientID
 *   already exists in the given Managed Hub
 * @throws {OpenAjax.hub.Error.Disconnected}   if ManagedHub is not connected
 */
//OpenAjax.hub.Container = function( hub, clientID, params ) {}

/**
 * Send a message to the client inside this container. This function MUST only
 * be called by ManagedHub. 
 * 
 * @param {String} topic
 *    The topic name for the published message
 * @param {*} data
 *    The payload. Can be any JSON-serializable value.
 * @param {String} containerSubscriptionId
 *    Container's ID for a subscription, from previous call to
 *    subscribeForClient()
 */
//OpenAjax.hub.Container.prototype.sendToClient = function( topic, data, containerSubscriptionId ) {}

/**
 * Shut down a container. remove does all of the following:
 * - disconnects container from HubClient
 * - unsubscribes from all of its existing subscriptions in the ManagedHub
 * 
 * This function is only called by ManagedHub.removeContainer
 * Calling this function does NOT cause the container's onDisconnect callback to
 * be invoked.
 */
//OpenAjax.hub.Container.prototype.remove = function() {}

/**
 * Returns true if the given client is connected to the managed hub.
 * Else returns false.
 *
 * @returns true if the client is connected to the managed hub
 * @type boolean
 */
//OpenAjax.hub.Container.prototype.isConnected = function() {}

/**
 * Returns the clientID passed in when this Container was instantiated.
 *
 * @returns The clientID
 * @type {String}  
 */
//OpenAjax.hub.Container.prototype.getClientID = function() {}

/**
 * If DISCONNECTED:
 * Returns null
 * If CONNECTED:
 * Returns the origin associated with the window containing the HubClient
 * associated with this Container instance. The origin has the format
 *  
 * [protocol]://[host]
 * 
 * where:
 * 
 * [protocol] is "http" or "https"
 * [host] is the hostname of the partner page.
 * 
 * @returns Partner's origin
 * @type {String}
 */
//OpenAjax.hub.Container.prototype.getPartnerOrigin = function() {}

/**
 * Returns the params object associated with this Container instance.
 *
 * @returns params
 *    The params object associated with this Container instance
 * @type {Object}
 */
//OpenAjax.hub.Container.prototype.getParameters = function() {}

/**
 * Returns the ManagedHub to which this Container belongs.
 *
 * @returns ManagedHub
 *         The ManagedHub object associated with this Container instance
 * @type {OpenAjax.hub.ManagedHub}
 */
//OpenAjax.hub.Container.prototype.getHub = function() {}

////////////////////////////////////////////////////////////////////////////////

/*
 * Unmanaged Hub
 */

/**
 * OpenAjax.hub._hub is the default ManagedHub instance that we use to 
 * provide OAH 1.0 behavior. 
 */
OpenAjax.hub._hub = new OpenAjax.hub.ManagedHub({ 
    onSubscribe: function(topic, ctnr) { return true; },
    onPublish: function(topic, data, pcont, scont) { return true; }
});

/**
 * Subscribe to a topic.
 *
 * @param {String} topic
 *     A valid topic string. MAY include wildcards.
 * @param {Function|String} onData
 *     Callback function that is invoked whenever an event is published on the
 *     topic.  If 'onData' is a string, then it represents the name of a
 *     function on the 'scope' object.
 * @param {Object} [scope]
 *     When onData callback is invoked,
 *     the JavaScript "this" keyword refers to this scope object.
 *     If no scope is provided, default is window.
 * @param {*} [subscriberData]
 *     Client application provides this data, which is handed
 *     back to the client application in the subscriberData
 *     parameter of the onData callback function.
 * 
 * @returns {String} Identifier representing the subscription.
 * 
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic is invalid
 *     (e.g.contains an empty token)
 */
OpenAjax.hub.subscribe = function(topic, onData, scope, subscriberData) 
{
    // resolve the 'onData' function if it is a string
    if ( typeof onData === "string" ) {
        scope = scope || window;
        onData = scope[ onData ] || null;
    }
    
    return OpenAjax.hub._hub.subscribe( topic, onData, scope, null, subscriberData );
}

/**
 * Unsubscribe from a subscription.
 *
 * @param {String} subscriptionID
 *     Subscription identifier returned by subscribe()
 *     
 * @throws {OpenAjax.hub.Error.NoSubscription} if no such subscription is found
 */
OpenAjax.hub.unsubscribe = function(subscriptionID) 
{
    return OpenAjax.hub._hub.unsubscribe( subscriptionID );
}

/**
 * Publish an event on a topic.
 *
 * @param {String} topic
 *     A valid topic string. MUST NOT include wildcards.
 * @param {*} data
 *     Valid publishable data.
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if the topic cannot be published
 *     (e.g. contains wildcards or empty tokens)
 */
OpenAjax.hub.publish = function(topic, data) 
{
    OpenAjax.hub._hub.publish(topic, data);
}

////////////////////////////////////////////////////////////////////////////////

// Register the OpenAjax Hub itself as a library.
OpenAjax.hub.registerLibrary("OpenAjax", "http://openajax.org/hub", "2.0", {});

} // !OpenAjax.hub
;
/*

        Copyright 2006-2009 OpenAjax Alliance

        Licensed under the Apache License, Version 2.0 (the "License"); 
        you may not use this file except in compliance with the License. 
        You may obtain a copy of the License at
        
                http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software 
        distributed under the License is distributed on an "AS IS" BASIS, 
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
        See the License for the specific language governing permissions and 
        limitations under the License.
*/

var OpenAjax = OpenAjax || {};
OpenAjax.hub = OpenAjax.hub || {};
OpenAjax.gadgets = typeof OpenAjax.gadgets === 'object' ? OpenAjax.gadgets :
                   typeof gadgets === 'object' ? gadgets :
                   {};
OpenAjax.gadgets.rpctx = OpenAjax.gadgets.rpctx || {};

(function() {
    // For now, we only use "oaaConfig" for the global "gadgets" object.  If the "gadgets" global
    // already exists, then there is no reason to check for "oaaConfig".  In the future, if we use
    // "oaaConfig" for other purposes, we'll need to remove the check for "!window.gadgets".
    if (typeof gadgets === 'undefined') {
        // "oaaConfig" can be specified as a global object.  If not found, then look for it as an
        // attribute on the script line for the OpenAjax Hub JS file.
        if (typeof oaaConfig === 'undefined') {
            var scripts = document.getElementsByTagName("script");
            // match "OpenAjax-mashup.js", "OpenAjaxManagedHub-all*.js", "OpenAjaxManagedHub-core*.js"
            var reHub = /openajax(?:managedhub-(?:all|core).*|-mashup)\.js$/i;
            for ( var i = scripts.length - 1; i >= 0; i-- ) {
                var src = scripts[i].getAttribute( "src" );
                if ( !src ) {
                    continue;
                }
                
                var m = src.match( reHub );
                if ( m ) {
                    var config = scripts[i].getAttribute( "oaaConfig" );
                    if ( config ) {
                        try {
                            oaaConfig = eval( "({ " + config + " })" );
                        } catch (e) {}
                    }
                    break;
                }
            }
        }
        
        if (typeof oaaConfig !== 'undefined' && oaaConfig.gadgetsGlobal) {
            gadgets = OpenAjax.gadgets;
        }
    }
})();


if (!OpenAjax.hub.IframeContainer) {

(function(){

/**
 * Create a new Iframe Container.
 * @constructor
 * @extends OpenAjax.hub.Container
 * 
 * IframeContainer implements the Container interface to provide a container
 * that isolates client components into secure sandboxes by leveraging the
 * isolation features provided by browser iframes.
 * 
 * SECURITY
 * 
 * In order for the connection between the IframeContainer and IframeHubClient
 * to be fully secure, you must specify a valid 'tunnelURI'. Note that if you
 * do specify a 'tunnelURI', then only the WPM and NIX transports are used,
 * covering the following browsers:
 *   IE 6+, Firefox 3+, Safari 4+, Chrome 2+, Opera 9+.
 * 
 * If no 'tunnelURI' is specified, then some security features are disabled:
 * the IframeContainer will not report FramePhish errors, and on some browsers
 * IframeContainer and IframeHubClient will not be able to validate the
 * identity of their partner (i.e. getPartnerOrigin() will return 'null').
 * However, not providing 'tunnelURI' allows the additional use of the RMR
 * and FE transports -- in addition to the above browsers, the Hub code will
 * also work on:
 *   Firefox 1 & 2, Safari 2 & 3, Chrome 1.
 * 
 * @param {OpenAjax.hub.ManagedHub} hub
 *    Managed Hub instance to which this Container belongs
 * @param {String} clientID
 *    A string ID that identifies a particular client of a Managed Hub. Unique
 *    within the context of the ManagedHub.
 * @param {Object} params  
 *    Parameters used to instantiate the IframeContainer.
 *    Once the constructor is called, the params object belongs exclusively to
 *    the IframeContainer. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.Container.onSecurityAlert
 *    Called when an attempted security breach is thwarted.  Function is defined
 *    as follows:  function(container, securityAlert)
 * @param {Function} [params.Container.onConnect]
 *    Called when the client connects to the Managed Hub.  Function is defined
 *    as follows:  function(container)
 * @param {Function} [params.Container.onDisconnect]
 *    Called when the client disconnects from the Managed Hub.  Function is
 *    defined as follows:  function(container)
 * @param {Object} [params.Container.scope]
 *    Whenever one of the Container's callback functions is called, references
 *    to "this" in the callback will refer to the scope object. If no scope is
 *    provided, default is window.
 * @param {Function} [params.Container.log]
 *    Optional logger function. Would be used to log to console.log or
 *    equivalent. 
 * @param {Object} params.IframeContainer.parent
 *    DOM element that is to be parent of iframe
 * @param {String} params.IframeContainer.uri
 *    Initial Iframe URI (Container will add parameters to this URI)
 * @param {String} [params.IframeContainer.tunnelURI]
 *    URI of the tunnel iframe. Must be from the same origin as the page which
 *    instantiates the IframeContainer. If not specified, connection will not
 *    be fully secure (see SECURITY section).
 * @param {Object} [params.IframeContainer.iframeAttrs]
 *    Attributes to add to IFRAME DOM entity.  For example:
 *              { style: { width: "100%",
 *                         height: "100%" },
 *                className: "some_class" }
 * @param {Number} [params.IframeContainer.timeout]
 *    Load timeout in milliseconds.  If not specified, defaults to 15000.  If
 *    the client at params.IframeContainer.uri does not establish a connection
 *    with this container in the given time, the onSecurityAlert callback is
 *    called with a LoadTimeout error code.
 * @param {Function} [params.IframeContainer.seed]
 *    A function that returns a string that will be used to seed the
 *    pseudo-random number generator, which is used to create the security
 *    tokens.  An implementation of IframeContainer may choose to ignore this
 *    value.
 * @param {Number} [params.IframeContainer.tokenLength]
 *    Length of the security tokens used when transmitting messages.  If not
 *    specified, defaults to 6.  An implementation of IframeContainer may choose
 *    to ignore this value.
 *
 * @throws {OpenAjax.hub.Error.BadParameters}   if required params are not
 *          present or null
 * @throws {OpenAjax.hub.Error.Duplicate}   if a Container with this clientID
 *          already exists in the given Managed Hub
 * @throws {OpenAjax.hub.Error.Disconnected}   if hub is not connected
 */
OpenAjax.hub.IframeContainer = function( hub, clientID, params )
{
    assertValidParams( arguments );
    
    var container = this;
    var scope = params.Container.scope || window;
    var connected = false;
    var subs = {};
    var securityToken;
    var internalID;
    var timeout = params.IframeContainer.timeout || 15000;
    var loadTimer;

    if ( params.Container.log ) {
        var log = function( msg ) {
            try {
                params.Container.log.call( scope, "IframeContainer::" + clientID + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    
    
    this._init = function() {
        // add to ManagedHub first, to see if clientID is a duplicate
        hub.addContainer( this );
        
        // Create an "internal" ID, which is guaranteed to be unique within the
        // window, not just within the hub.
        internalID = OpenAjax.hub.IframeContainer._rpcRouter.add( clientID, this );
        securityToken = generateSecurityToken( params, scope, log );
        
        var relay = null;
        var transportName = OpenAjax.gadgets.rpc.getRelayChannel();
        if ( params.IframeContainer.tunnelURI ) {
            if ( transportName !== "wpm" && transportName !== "nix" ) {
                throw new Error( OpenAjax.hub.Error.IncompatBrowser );
            }
        } else {
            log( "WARNING: Parameter 'IframeContaienr.tunnelURI' not specified. Connection will not be fully secure." );
            if ( transportName === "rmr" ) {
                relay = OpenAjax.gadgets.rpc.getOrigin( params.IframeContainer.uri ) + "/robots.txt"; 
            }
        }
        
        // Create IFRAME to hold the client
        createIframe();
        
        OpenAjax.gadgets.rpc.setupReceiver( internalID, relay );
        
        startLoadTimer();
    };

        
  /*** OpenAjax.hub.Container interface ***/
   
    this.sendToClient = function( topic, data, subscriptionID ) {
        OpenAjax.gadgets.rpc.call( internalID, "openajax.pubsub", null, "pub", topic, data,
                                   subscriptionID );
    };

    this.remove = function() {
        finishDisconnect();
        clearTimeout( loadTimer );
        OpenAjax.gadgets.rpc.removeReceiver( internalID );
        var iframe = document.getElementById( internalID );
        iframe.parentNode.removeChild( iframe );
        OpenAjax.hub.IframeContainer._rpcRouter.remove( internalID );
    };

    this.isConnected = function() {
        return connected;
    };
    
    this.getClientID = function() {
        return clientID;
    };

    this.getPartnerOrigin = function() {
        if ( connected ) {
            var origin = OpenAjax.gadgets.rpc.getReceiverOrigin( internalID );
            if ( origin ) {
                // remove port if present
                return ( /^([a-zA-Z]+:\/\/[^:]+).*/.exec( origin )[1] );
            }
        }
        return null;
    };
    
    this.getParameters = function() {
        return params;
    };
    
    this.getHub = function() {
        return hub;
    };
    
    
  /*** OpenAjax.hub.IframeContainer interface ***/
    
    /**
     * Get the iframe associated with this iframe container
     * 
     * This function returns the iframe associated with an IframeContainer,
     * allowing the Manager Application to change its size, styles, scrollbars, etc.
     * 
     * CAUTION: The iframe is owned exclusively by the IframeContainer. The Manager
     * Application MUST NOT destroy the iframe directly. Also, if the iframe is
     * hidden and disconnected, the Manager Application SHOULD NOT attempt to make
     * it visible. The Container SHOULD automatically hide the iframe when it is
     * disconnected; to make it visible would introduce security risks. 
     * 
     * @returns iframeElement
     * @type {Object}
     */
    this.getIframe = function() {
        return document.getElementById( internalID );
    };
    
    
  /*** private functions ***/

    function assertValidParams( args ) {
        var hub = args[0],
            clientID = args[1],
            params = args[2];
        if ( ! hub || ! clientID || ! params || ! params.Container ||
             ! params.Container.onSecurityAlert || ! params.IframeContainer ||
             ! params.IframeContainer.parent || ! params.IframeContainer.uri ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    }
    
    this._handleIncomingRPC = function( command, topic, data ) {
        switch ( command ) {
            // publish
            // 'data' is topic message
            case "pub":
                hub.publishForClient( container, topic, data );
                break;
            
            // subscribe
            // 'data' is subscription ID
            case "sub":
                var errCode = "";  // empty string is success
                try {
                    subs[ data ] = hub.subscribeForClient( container, topic, data );
                } catch( e ) {
                    errCode = e.message;
                }
                return errCode;
            
            // unsubscribe
            // 'data' is subscription ID
            case "uns":
                var handle = subs[ data ];
                hub.unsubscribeForClient( container, handle );
                delete subs[ data ];
                return data;
            
            // connect
            case "con":
                finishConnect();
                return true;
            
            // disconnect
            case "dis":
                startLoadTimer();
                finishDisconnect();
                if ( params.Container.onDisconnect ) {
                    try {
                        params.Container.onDisconnect.call( scope, container );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onDisconnect callback to constructor: " + e.message );
                    }
                }
                return true;
        }
    };
    
    this._onSecurityAlert = function( error ) {
        invokeSecurityAlert( rpcErrorsToOAA[ error ] );
    };
    
    // The RPC code requires that the 'name' attribute be properly set on the
    // iframe.  However, setting the 'name' property on the iframe object
    // returned from 'createElement("iframe")' doesn't work on IE --
    // 'window.name' returns null for the code within the iframe.  The
    // workaround is to set the 'innerHTML' of a span to the iframe's HTML code,
    // with 'name' and other attributes properly set.
    function createIframe() {
        var span = document.createElement( "span" );
        params.IframeContainer.parent.appendChild( span );
        
        var iframeText = '<iframe id="' + internalID + '" name="' + internalID +
                '" src="javascript:\'<html></html>\'"';
        
        // Add iframe attributes
        var styleText = '';
        var attrs = params.IframeContainer.iframeAttrs;
        if ( attrs ) {
            for ( var attr in attrs ) {
                switch ( attr ) {
                    case "style":
                        for ( var style in attrs.style ) {
                            styleText += style + ':' + attrs.style[ style ] + ';';
                        }
                        break;
                    case "className":
                        iframeText += ' class="' + attrs[ attr ] + '"';
                        break;
                    default:
                        iframeText += ' ' + attr + '="' + attrs[ attr ] + '"';
                }
            }
        }
        
        // initially hide IFRAME content, in order to lessen frame phishing impact
        styleText += 'visibility:hidden;';
        iframeText += ' style="' + styleText + '"></iframe>';
        
        span.innerHTML = iframeText;
        
        var tunnel = params.IframeContainer.tunnelURI;
        document.getElementById( internalID ).src = params.IframeContainer.uri +
                "#rpctoken=" + securityToken +
                (tunnel ? "&parent=" + encodeURIComponent( tunnel ) + "&forcesecure=true" :
                          "&oaaParent=" + encodeURIComponent( OpenAjax.gadgets.rpc.getOrigin( window.location.href )));
    }
    
    // If the relay iframe used by RPC has not been loaded yet, then we won't have unload protection
    // at this point.  Since we can't detect when the relay iframe has loaded, we use a two stage
    // connection process.  First, the child sends a connection msg and the container sends an ack.
    // Then the container sends a connection msg and the child replies with an ack.  Since the
    // container can only send a message if the relay iframe has loaded, then we know if we get an
    // ack here that the relay iframe is ready.  And we are fully connected.
    function finishConnect() {
        // connect acknowledgement
        function callback( result ) {
            if ( result ) {
                connected = true;
                clearTimeout( loadTimer );
                document.getElementById( internalID ).style.visibility = "visible";
                if ( params.Container.onConnect ) {
                    try {
                        params.Container.onConnect.call( scope, container );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onConnect callback to constructor: " + e.message );
                    }
                }
            }
        }
        OpenAjax.gadgets.rpc.call( internalID, "openajax.pubsub", callback, "cmd", "con" );
    }
    
    function finishDisconnect() {
        if ( connected ) {
            connected = false;
            document.getElementById( internalID ).style.visibility = "hidden";
        
            // unsubscribe from all subs
            for ( var s in subs ) {
                hub.unsubscribeForClient( container, subs[s] );
            }
            subs = {};
        }
    }
    
    function invokeSecurityAlert( errorMsg ) {
        try {
            params.Container.onSecurityAlert.call( scope, container, errorMsg );
        } catch( e ) {
            OpenAjax.hub._debugger();
            log( "caught error from onSecurityAlert callback to constructor: " + e.message );
        }
    }
    
    function startLoadTimer() {
        loadTimer = setTimeout(
            function() {
                // alert the security alert callback
                invokeSecurityAlert( OpenAjax.hub.SecurityAlert.LoadTimeout );
                // don't receive any more messages from HubClient
                container._handleIncomingRPC = function() {};
            },
            timeout
        );
    }
    
    
    this._init();
};

////////////////////////////////////////////////////////////////////////////////

/**
 * Create a new IframeHubClient.
 * @constructor
 * @extends OpenAjax.hub.HubClient
 * 
 * @param {Object} params
 *    Once the constructor is called, the params object belongs to the
 *    HubClient. The caller MUST not modify it.
 *    The following are the pre-defined properties on params:
 * @param {Function} params.HubClient.onSecurityAlert
 *     Called when an attempted security breach is thwarted
 * @param {Object} [params.HubClient.scope]
 *     Whenever one of the HubClient's callback functions is called,
 *     references to "this" in the callback will refer to the scope object.
 *     If not provided, the default is window.
 * @param {Function} [params.HubClient.log]
 *     Optional logger function. Would be used to log to console.log or
 *     equivalent. 
 * @param {Boolean} [params.IframeHubClient.requireParentVerifiable]
 *     Set to true in order to require that this IframeHubClient use a
 *     transport that can verify the parent Container's identity.
 * @param {Function} [params.IframeHubClient.seed]
 *     A function that returns a string that will be used to seed the
 *     pseudo-random number generator, which is used to create the security
 *     tokens.  An implementation of IframeHubClient may choose to ignore
 *     this value.
 * @param {Number} [params.IframeHubClient.tokenLength]
 *     Length of the security tokens used when transmitting messages.  If
 *     not specified, defaults to 6.  An implementation of IframeHubClient
 *     may choose to ignore this value.
 *     
 * @throws {OpenAjax.hub.Error.BadParameters} if any of the required
 *          parameters is missing, or if a parameter value is invalid in 
 *          some way.
 */
OpenAjax.hub.IframeHubClient = function( params )
{
    if ( ! params || ! params.HubClient || ! params.HubClient.onSecurityAlert ) {
        throw new Error( OpenAjax.hub.Error.BadParameters );
    }
    
    var client = this;
    var scope = params.HubClient.scope || window;
    var connected = false;
    var subs = {};
    var subIndex = 0;
    var clientID;
//    var securityToken;    // XXX still need "securityToken"?
    
    if ( params.HubClient.log ) {
        var log = function( msg ) {
            try {
                params.HubClient.log.call( scope, "IframeHubClient::" + clientID + ": " + msg );
            } catch( e ) {
                OpenAjax.hub._debugger();
            }
        };
    } else {
        log = function() {};
    }
    
    this._init = function() {
        var urlParams = OpenAjax.gadgets.util.getUrlParameters();
        if ( ! urlParams.parent ) {
            // The RMR transport does not require a valid relay file, but does need a URL
            // in the parent's domain. The URL does not need to point to valid file, so just
            // point to 'robots.txt' file. See RMR transport code for more info.
            var parent = urlParams.oaaParent + "/robots.txt";
            OpenAjax.gadgets.rpc.setupReceiver( "..", parent );
        }
        
        if ( params.IframeHubClient && params.IframeHubClient.requireParentVerifiable &&
             OpenAjax.gadgets.rpc.getReceiverOrigin( ".." ) === null ) {
            // If user set 'requireParentVerifiable' to true but RPC transport does not
            // support this, throw error.
            OpenAjax.gadgets.rpc.removeReceiver( ".." );
            throw new Error( OpenAjax.hub.Error.IncompatBrowser );
        }
        
        OpenAjax.hub.IframeContainer._rpcRouter.add( "..", this );
// XXX The RPC layer initializes immediately on load, in the child (IframeHubClient). So it is too
//    late here to specify a security token for the RPC layer.  At the moment, only the NIX
//    transport requires a child token (IFPC [aka FIM] is not supported).
//        securityToken = generateSecurityToken( params, scope, log );

        var internalID = OpenAjax.gadgets.rpc.RPC_ID;
        if ( ! internalID ) {
            throw new Error( OpenAjax.hub.Error.WrongProtocol );
        }
        clientID = internalID.substr( internalID.indexOf("_") + 1 );
    };
    
  /*** HubClient interface ***/

    this.connect = function( onComplete, scope ) {
        if ( connected ) {
            throw new Error( OpenAjax.hub.Error.Duplicate );
        }
        
        // connect acknowledgement
        function callback( result ) {
            if ( result ) {
                connected = true;
                if ( onComplete ) {
                    try {
                        onComplete.call( scope || window, client, true );
                    } catch( e ) {
                        OpenAjax.hub._debugger();
                        log( "caught error from onComplete callback to connect(): " + e.message );
                    }
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "con" );
    };
    
    this.disconnect = function( onComplete, scope ) {
        if ( !connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
        
        connected = false;
        
        // disconnect acknowledgement
        var callback = null;
        if ( onComplete ) {
            callback = function( result ) {
                try {
                    onComplete.call( scope || window, client, true );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to disconnect(): " + e.message );
                }
            };
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "dis" );
    };
    
    this.getPartnerOrigin = function() {
        if ( connected ) {
            var origin = OpenAjax.gadgets.rpc.getReceiverOrigin( ".." );
            if ( origin ) {
                // remove port if present
                return ( /^([a-zA-Z]+:\/\/[^:]+).*/.exec( origin )[1] );
            }
        }
        return null;
    };
    
    this.getClientID = function() {
        return clientID;
    };
    
  /*** Hub interface ***/
    
    this.subscribe = function( topic, onData, scope, onComplete, subscriberData ) {
        assertConn();
        assertSubTopic( topic );
        if ( ! onData ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    
        scope = scope || window;
        var subID = "" + subIndex++;
        subs[ subID ] = { cb: onData, sc: scope, d: subscriberData };
        
        // subscribe acknowledgement
        function callback( result ) {
            if ( result !== '' ) {    // error
                delete subs[ subID ];
            }
            if ( onComplete ) {
                try {
                    onComplete.call( scope, subID, result === "", result );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to subscribe(): " + e.message );
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "sub", topic, subID );
        
        return subID;
    };
    
    this.publish = function( topic, data ) {
        assertConn();
        assertPubTopic( topic );
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", null, "pub", topic, data );
    };
    
    this.unsubscribe = function( subscriptionID, onComplete, scope ) {
        assertConn();
        if ( ! subscriptionID ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        
        // if no such subscriptionID, or in process of unsubscribing given ID, throw error
        if ( ! subs[ subscriptionID ] || subs[ subscriptionID ].uns ) {
            throw new Error( OpenAjax.hub.Error.NoSubscription );
        }
        
        // unsubscribe in progress
        subs[ subscriptionID ].uns = true;
        
        // unsubscribe acknowledgement
        function callback( result ) {
            delete subs[ subscriptionID ];
            if ( onComplete ) {
                try {
                    onComplete.call( scope || window, subscriptionID, true );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onComplete callback to unsubscribe(): " + e.message );
                }
            }
        }
        OpenAjax.gadgets.rpc.call( "..", "openajax.pubsub", callback, "uns", null, subscriptionID );
    };
    
    this.isConnected = function() {
        return connected;
    };
    
    this.getScope = function() {
        return scope;
    };
    
    this.getSubscriberData = function( subscriptionID ) {
        assertConn();
        if ( subs[ subscriptionID ] ) {
            return subs[ subscriptionID ].d;
        }
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    };
    
    this.getSubscriberScope = function( subscriptionID ) {
        assertConn();
        if ( subs[ subscriptionID ] ) {
            return subs[ subscriptionID ].sc;
        }
        throw new Error( OpenAjax.hub.Error.NoSubscription );
    };
    
    this.getParameters = function() {
        return params;
    };
    
  /*** private functions ***/
    
    this._handleIncomingRPC = function( command, topic, data, subscriptionID ) {
        if ( command === "pub" ) {
            // if subscription exists and we are not in process of unsubscribing...
            if ( subs[ subscriptionID ] && ! subs[ subscriptionID ].uns ) {
                try {
                    subs[ subscriptionID ].cb.call( subs[ subscriptionID ].sc, topic,
                            data, subs[ subscriptionID ].d );
                } catch( e ) {
                    OpenAjax.hub._debugger();
                    log( "caught error from onData callback to subscribe(): " + e.message );
                }
            }
        }
        // else if command === "cmd"...
        
        // First time this function is called, topic should be "con".  This is the 2nd stage of the
        // connection process.  Simply need to return "true" in order to send an acknowledgement
        // back to container.  See finishConnect() in the container object.
        if ( topic === "con" ) {
          return true;
        }
        return false;
    };
    
    function assertConn() {
        if ( ! connected ) {
            throw new Error( OpenAjax.hub.Error.Disconnected );
        }
    }
    
    function assertSubTopic( topic )
    {
        if ( ! topic ) {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
        var path = topic.split(".");
        var len = path.length;
        for (var i = 0; i < len; i++) {
            var p = path[i];
            if ((p === "") ||
               ((p.indexOf("*") != -1) && (p != "*") && (p != "**"))) {
                throw new Error( OpenAjax.hub.Error.BadParameters );
            }
            if ((p == "**") && (i < len - 1)) {
                throw new Error( OpenAjax.hub.Error.BadParameters );
            }
        }
    }
    
    function assertPubTopic( topic ) {
        if ( !topic || topic === "" || (topic.indexOf("*") != -1) ||
            (topic.indexOf("..") != -1) ||  (topic.charAt(0) == ".") ||
            (topic.charAt(topic.length-1) == "."))
        {
            throw new Error( OpenAjax.hub.Error.BadParameters );
        }
    }
    
//    function invokeSecurityAlert( errorMsg ) {
//        try {
//            params.HubClient.onSecurityAlert.call( scope, client, errorMsg );
//        } catch( e ) {
//            OpenAjax.hub._debugger();
//            log( "caught error from onSecurityAlert callback to constructor: " + e.message );
//        }
//    }

    
    this._init();
};

////////////////////////////////////////////////////////////////////////////////

    // RPC object contents:
    //   s: Service Name
    //   f: From
    //   c: The callback ID or 0 if none.
    //   a: The arguments for this RPC call.
    //   t: The authentication token.
OpenAjax.hub.IframeContainer._rpcRouter = function() {
    var receivers = {};
    
    function router() {
        var r = receivers[ this.f ];
        if ( r ) {
            return r._handleIncomingRPC.apply( r, arguments );
        }
    }
    
    function onSecurityAlert( receiverId, error ) {
        var r = receivers[ receiverId ];
        if ( r ) {
          r._onSecurityAlert.call( r, error );
        }
    }
    
    return {
        add: function( id, receiver ) {
            function _add( id, receiver ) {
                if ( id === ".." ) {
                    if ( ! receivers[ ".." ] ) {
                        receivers[ ".." ] = receiver;
                    }
                    return;
                }
                
                do {
                    // a client with the specified ID already exists on this page;
                    // create a unique ID
                    newID = ((0x7fff * Math.random()) | 0).toString(16) + "_" + id;
                } while ( receivers[ newID ] );
                receivers[ newID ] = receiver;
                return newID;
            }
            
            // when this function is first called, register the RPC service
            OpenAjax.gadgets.rpc.register( "openajax.pubsub", router );
            OpenAjax.gadgets.rpc.config({
                securityCallback: onSecurityAlert
            });

            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_LOAD_TIMEOUT ] = OpenAjax.hub.SecurityAlert.LoadTimeout;
            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_FRAME_PHISH ] = OpenAjax.hub.SecurityAlert.FramePhish;
            rpcErrorsToOAA[ OpenAjax.gadgets.rpc.SEC_ERROR_FORGED_MSG ] = OpenAjax.hub.SecurityAlert.ForgedMsg;
            
            this.add = _add;
            return _add( id, receiver );
        },
        
        remove: function( id ) {
            delete receivers[ id ];
        }
    };
}();

var rpcErrorsToOAA = {};

////////////////////////////////////////////////////////////////////////////////

function generateSecurityToken( params, scope, log ) {
    if ( ! OpenAjax.hub.IframeContainer._prng ) {
        // create pseudo-random number generator with a default seed
        var seed = new Date().getTime() + Math.random() + document.cookie;
        OpenAjax.hub.IframeContainer._prng = OpenAjax._smash.crypto.newPRNG( seed );
    }
    
    var p = params.IframeContainer || params.IframeHubClient;
    if ( p && p.seed ) {
        try {
            var extraSeed = p.seed.call( scope );
            OpenAjax.hub.IframeContainer._prng.addSeed( extraSeed );
        } catch( e ) {
            OpenAjax.hub._debugger();
            log( "caught error from 'seed' callback: " + e.message );
        }
    }
    
    var tokenLength = (p && p.tokenLength) || 6;
    return OpenAjax.hub.IframeContainer._prng.nextRandomB64Str( tokenLength );
}

})();
};
/*

        Copyright 2006-2009 OpenAjax Alliance

        Licensed under the Apache License, Version 2.0 (the "License"); 
        you may not use this file except in compliance with the License. 
        You may obtain a copy of the License at
        
                http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software 
        distributed under the License is distributed on an "AS IS" BASIS, 
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
        See the License for the specific language governing permissions and 
        limitations under the License.
*/
// SMASH.CRYPTO
//
// Small library containing some minimal crypto functionality for a
// - a hash-function: SHA-1 (see FIPS PUB 180-2 for definition)
//     BigEndianWord[5] <- smash.crypto.sha1( BigEndianWord[*] dataWA, int lenInBits)
//
// - a message authentication code (MAC): HMAC-SHA-1 (RFC2104/2202)
//     BigEndianWord[5] <- smash.crypto.hmac_sha1(
//                            BigEndianWord[3-16] keyWA, 
//                            Ascii or Unicode string dataS,
//		 		 		       int chrsz (8 for Asci/16 for Unicode)
//
// - pseudo-random number generator (PRNG): HMAC-SHA-1 in counter mode, following
//   Barak & Halevi, An architecture for robust pseudo-random generation and applications to /dev/random, CCS 2005
//     rngObj <- smash.crypto.newPRNG( String[>=12] seedS)
//   where rngObj has methods
//     addSeed(String seed)
//     BigEndianWord[len] <- nextRandomOctets(int len)
//     Base64-String[len] <- nextRandomB64Str(int len)
//   Note: HMAC-SHA1 in counter-mode does not provide forward-security on corruption. 
//         However, the PRNG state is kept inside a closure. So if somebody can break the closure, he probably could
//         break a whole lot more and forward-security of the prng is not the highest of concerns anymore :-)

if ( typeof OpenAjax._smash == 'undefined' ) { OpenAjax._smash = {}; }

OpenAjax._smash.crypto = {

  // Some utilities
  // convert a string to an array of big-endian words
  'strToWA': function (/* Ascii or Unicode string */ str, /* int 8 for Asci/16 for Unicode */ chrsz){
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
    return bin;
  },


  // MAC
  'hmac_sha1' : function(
        /* BigEndianWord[3-16]*/             keyWA,
       /* Ascii or Unicode string */       dataS,
       /* int 8 for Asci/16 for Unicode */ chrsz)
  {
    // write our own hmac derived from paj's so we do not have to do constant key conversions and length checking ...
    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++) {
      ipad[i] = keyWA[i] ^ 0x36363636;
      opad[i] = keyWA[i] ^ 0x5C5C5C5C;
    }

    var hash = this.sha1( ipad.concat(this.strToWA(dataS, chrsz)), 512 + dataS.length * chrsz);
    return     this.sha1( opad.concat(hash), 512 + 160);
  },


  // PRNG factory method
  // see below 'addSeed', 'nextRandomOctets' & 'nextRandomB64Octets' for public methods of returnd prng object
  'newPRNG' : function (/* String[>=12] */ seedS) {
    var that = this;

    // parameter checking
    // We cannot really verify entropy but obviously the string must have at least a minimal length to have enough entropy
    // However, a 2^80 security seems ok, so we check only that at least 12 chars assuming somewhat random ASCII
    if ( (typeof seedS != 'string') || (seedS.length < 12) ) {
      alert("WARNING: Seed length too short ...");
    }

    // constants
    var __refresh_keyWA = [ 0xA999, 0x3E36, 0x4706, 0x816A,
    		 		 		     0x2571, 0x7850, 0xC26C, 0x9CD0,
    		 		 		     0xBA3E, 0xD89D, 0x1233, 0x9525,
    		 		 		     0xff3C, 0x1A83, 0xD491, 0xFF15 ]; // some random key for refresh ...

    // internal state
    var _keyWA = []; // BigEndianWord[5]
    var _cnt = 0;  // int

    function extract(seedS) {
      return that.hmac_sha1(__refresh_keyWA, seedS, 8);
    }

    function refresh(seedS) {
      // HMAC-SHA1 is not ideal, Rijndal 256bit block/key in CBC mode with fixed key might be better
      // but to limit the primitives and given that we anyway have only limited entropy in practise
      // this seems good enough
      var uniformSeedWA = extract(seedS);
      for(var i = 0; i < 5; i++) {
        _keyWA[i] ^= uniformSeedWA[i];
      }
    }

    // inital state seeding
    refresh(seedS);

    // public methods
    return {
      // Mix some additional seed into the PRNG state
      'addSeed'         : function (/* String */ seed) {
        // no parameter checking. Any added entropy should be fine ...
        refresh(seed);
      },


      // Get an array of len random octets
      'nextRandomOctets' : /* BigEndianWord[len] <- */ function (/* int */ len) {
		 var randOctets = [];
		 while (len > 0) {
		   _cnt+=1;
		   var nextBlock = that.hmac_sha1(_keyWA, (_cnt).toString(16), 8);
		   for (i=0; (i < 20) & (len > 0); i++, len--) {
		     randOctets.push( (nextBlock[i>>2] >> (i % 4) ) % 256);
		   }
		   // Note: if len was not a multiple 20, some random octets are ignored here but who cares ..
		 }
		 return randOctets;
      },


      // Get a random string of Base64-like (see below) chars of length len
      // Note: there is a slightly non-standard Base64 with no padding and '-' and '_' for '+' and '/', respectively
      'nextRandomB64Str' : /* Base64-String <- */ function (/* int */ len) {
		 var b64StrMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

		 var randOctets = this.nextRandomOctets(len);
		 var randB64Str = '';
		 for (var i=0; i < len; i++) {
		   randB64Str += b64StrMap.charAt(randOctets[i] & 0x3F);
		 }
        return randB64Str;
      }

    }
  },


  // Digest function:
  // BigEndianWord[5] <- sha1( BigEndianWord[*] dataWA, int lenInBits)
  'sha1' : function(){
    // Note: all Section references below refer to FIPS 180-2.

    // private utility functions

    // - 32bit addition with wrap-around
    var add_wa = function (x, y){
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    // - 32bit rotatate left
    var rol = function(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    // - round-dependent function f_t from Section 4.1.1
    function sha1_ft(t, b, c, d) {
      if(t < 20) return (b & c) | ((~b) & d);
      if(t < 40) return b ^ c ^ d;
      if(t < 60) return (b & c) | (b & d) | (c & d);
      return b ^ c ^ d;
    }

    // - round-dependent SHA-1 constants from Section 4.2.1
    function sha1_kt(t) {
      return (t < 20) ?  1518500249 :
             (t < 40) ?  1859775393 :
             (t < 60) ? -1894007588 :
          /* (t < 80) */ -899497514 ;
    }

    // main algorithm. 
    return function( /* BigEndianWord[*] */ dataWA, /* int */ lenInBits) {

      // Section 6.1.1: Preprocessing
      //-----------------------------
      // 1. padding:  (see also Section 5.1.1)
      //  - append one 1 followed by 0 bits filling up 448 bits of last (512bit) block
      dataWA[lenInBits >> 5] |= 0x80 << (24 - lenInBits % 32);
      //  - encode length in bits in last 64 bits
      //    Note: we rely on javascript to zero file elements which are beyond last (partial) data-block
      //    but before this length encoding!
      dataWA[((lenInBits + 64 >> 9) << 4) + 15] = lenInBits;

      // 2. 512bit blocks (actual split done ondemand later)
      var W = Array(80);

      // 3. initial hash using SHA-1 constants on page 13
      var H0 =  1732584193;
      var H1 = -271733879;
      var H2 = -1732584194;
      var H3 =  271733878;
      var H4 = -1009589776;

      // 6.1.2 SHA-1 Hash Computation
      for(var i = 0; i < dataWA.length; i += 16) {
        // 1. Message schedule, done below
        // 2. init working variables
        var a = H0; var b = H1; var c = H2; var d = H3; var e = H4;

        // 3. round-functions
        for(var j = 0; j < 80; j++)
        {
      		 // postponed step 2
          W[j] = ( (j < 16) ? dataWA[i+j] : rol(W[j-3] ^ W[j-8] ^ W[j-14] ^ W[j-16], 1));

          var T = add_wa( add_wa( rol(a, 5), sha1_ft(j, b, c, d)),
                          add_wa( add_wa(e, W[j]), sha1_kt(j)) );
          e = d;
          d = c;
          c = rol(b, 30);
          b = a;
          a = T;
        }

		 // 4. intermediate hash
        H0 = add_wa(a, H0);
        H1 = add_wa(b, H1);
        H2 = add_wa(c, H2);
        H3 = add_wa(d, H3);
        H4 = add_wa(e, H4);
      }

      return Array(H0, H1, H2, H3, H4);
    }
  }()

};
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Container-side message router for PubSub, a gadget-to-gadget
 * communication library.
 * 
 * Uses OpenAjax Hub's ManagedHub class to route pubsub messages and to provide
 * manager callbacks that allow control over these messages.
 */

/**
 * @static
 * @class Routes PubSub messages.
 * @name gadgets.pubsub2router
 */
gadgets.pubsub2router = function() {
  return /** @scope gadgets.pubsub2router */ {
    /**
     * Initialize the pubsub message router.
     * 
     * 'opt_params' is passed directly to the ManagedHub constructor.
     * For example:
     * 
     *     gadgets.pubsub2router.init({
     *         onSubscribe: function(topic, container) {
     *           ...
     *           return true; // return false to reject the request.
     *         },
     *         onPublish: function(topic, data, pcont, scont) {
     *           ...
     *           return true; // return false to reject the request.
     *         },
     *         onUnsubscribe: function(topic, container) {
     *           ...
     *         }
     *     });
     * 
     * Alternatively, if you have already created a ManagedHub instance and wish
     * to use that, you can specify it in 'opt_params.hub'.
     * 
     * @param {Object} opt_params
     * @see http://openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification_Managed_Hub_APIs#OpenAjax.hub.ManagedHub_constructor
     */
    init: function( opt_params ) {
      if (opt_params.hub) {
        this.hub = opt_params.hub;
      } else {
        this.hub = new OpenAjax.hub.ManagedHub({
          onPublish: opt_params.onPublish,
          onSubscribe: opt_params.onSubscribe,
          onUnsubscribe: opt_params.onUnsubscribe
        });
      }
    }
  };
}();
;
gadgets.config.init({"shindig.auth":{"authToken":"-1:-1:*::*:0:default"},"osapi":{"endPoints":["http://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"http://%host%/rpc":["samplecontainer.update","albums.supportedFields","albums.update","activities.delete","gadgets.metadata","activities.update","activities.supportedFields","mediaItems.create","albums.get","activities.get","http.put","activitystreams.create","messages.modify","appdata.get","messages.get","system.listMethods","samplecontainer.get","cache.invalidate","people.supportedFields","http.head","http.delete","messages.create","people.get","activitystreams.get","mediaItems.supportedFields","mediaItems.delete","albums.delete","activitystreams.update","mediaItems.update","messages.delete","appdata.update","gadgets.tokenSupportedFields","http.post","activities.create","samplecontainer.create","http.get","albums.create","appdata.delete","gadgets.token","appdata.create","activitystreams.delete","gadgets.supportedFields","mediaItems.get","activitystreams.supportedFields"]},"rpc":{"parentRelayUrl":"/container/rpc_relay.html","useLegacyProtocol":false},"core.io":{"proxyUrl":"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%","jsonProxyUrl":"//%host%/gadgets/makeRequest"}});
