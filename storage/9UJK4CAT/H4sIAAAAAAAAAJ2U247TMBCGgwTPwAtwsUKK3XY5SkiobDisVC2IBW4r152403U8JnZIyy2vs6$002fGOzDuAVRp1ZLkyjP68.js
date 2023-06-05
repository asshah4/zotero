
/* /assets/classpath/20130920/js/prototype-1-7.js */;
/*  Prototype JavaScript framework, version 1.7.1
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {

    Version: '1.7.1',

    Browser: (function(){
        var ua = navigator.userAgent;
        var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
        return {
            IE:             !!window.attachEvent && !isOpera,
            Opera:          isOpera,
            WebKit:         ua.indexOf('AppleWebKit/') > -1,
            Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
            MobileSafari:   /Apple.*Mobile/.test(ua)
        }
    })(),

    BrowserFeatures: {
        XPath: !!document.evaluate,

        SelectorsAPI: !!document.querySelector,

        ElementExtensions: (function() {
            var constructor = window.Element || window.HTMLElement;
            return !!(constructor && constructor.prototype);
        })(),
        SpecificElementExtensions: (function() {
            if (typeof window.HTMLDivElement !== 'undefined')
                return true;

            var div = document.createElement('div'),
                form = document.createElement('form'),
                isSupported = false;

            if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
                isSupported = true;
            }

            div = form = null;

            return isSupported;
        })()
    },

    ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

    emptyFunction: function() { },

    K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
    Prototype.BrowserFeatures.SpecificElementExtensions = false;
/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {

    var IS_DONTENUM_BUGGY = (function(){
        for (var p in { toString: 1 }) {
            if (p === 'toString') return false;
        }
        return true;
    })();

    function subclass() {};
    function create() {
        var parent = null, properties = $A(arguments);
        if (Object.isFunction(properties[0]))
            parent = properties.shift();

        function klass() {
            this.initialize.apply(this, arguments);
        }

        Object.extend(klass, Class.Methods);
        klass.superclass = parent;
        klass.subclasses = [];

        if (parent) {
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass;
            parent.subclasses.push(klass);
        }

        for (var i = 0, length = properties.length; i < length; i++)
            klass.addMethods(properties[i]);

        if (!klass.prototype.initialize)
            klass.prototype.initialize = Prototype.emptyFunction;

        klass.prototype.constructor = klass;
        return klass;
    }

    function addMethods(source) {
        var ancestor   = this.superclass && this.superclass.prototype,
            properties = Object.keys(source);

        if (IS_DONTENUM_BUGGY) {
            if (source.toString != Object.prototype.toString)
                properties.push("toString");
            if (source.valueOf != Object.prototype.valueOf)
                properties.push("valueOf");
        }

        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i], value = source[property];
            if (ancestor && Object.isFunction(value) &&
                value.argumentNames()[0] == "$super") {
                var method = value;
                value = (function(m) {
                    return function() { return ancestor[m].apply(this, arguments); };
                })(property).wrap(method);

                value.valueOf = (function(method) {
                    return function() { return method.valueOf.call(method); };
                })(method);

                value.toString = (function(method) {
                    return function() { return method.toString.call(method); };
                })(method);
            }
            this.prototype[property] = value;
        }

        return this;
    }

    return {
        create: create,
        Methods: {
            addMethods: addMethods
        }
    };
})();
(function() {

    var _toString = Object.prototype.toString,
        _hasOwnProperty = Object.prototype.hasOwnProperty,
        NULL_TYPE = 'Null',
        UNDEFINED_TYPE = 'Undefined',
        BOOLEAN_TYPE = 'Boolean',
        NUMBER_TYPE = 'Number',
        STRING_TYPE = 'String',
        OBJECT_TYPE = 'Object',
        FUNCTION_CLASS = '[object Function]',
        BOOLEAN_CLASS = '[object Boolean]',
        NUMBER_CLASS = '[object Number]',
        STRING_CLASS = '[object String]',
        ARRAY_CLASS = '[object Array]',
        DATE_CLASS = '[object Date]',
        NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
            typeof JSON.stringify === 'function' &&
            JSON.stringify(0) === '0' &&
            typeof JSON.stringify(Prototype.K) === 'undefined';



    var DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf',
        'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

    var IS_DONTENUM_BUGGY = (function(){
        for (var p in { toString: 1 }) {
            if (p === 'toString') return false;
        }
        return true;
    })();

    function Type(o) {
        switch(o) {
            case null: return NULL_TYPE;
            case (void 0): return UNDEFINED_TYPE;
        }
        var type = typeof o;
        switch(type) {
            case 'boolean': return BOOLEAN_TYPE;
            case 'number':  return NUMBER_TYPE;
            case 'string':  return STRING_TYPE;
        }
        return OBJECT_TYPE;
    }

    function extend(destination, source) {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    }

    function inspect(object) {
        try {
            if (isUndefined(object)) return 'undefined';
            if (object === null) return 'null';
            return object.inspect ? object.inspect() : String(object);
        } catch (e) {
            if (e instanceof RangeError) return '...';
            throw e;
        }
    }

    function toJSON(value) {
        return Str('', { '': value }, []);
    }

    function Str(key, holder, stack) {
        var value = holder[key];
        if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        var _class = _toString.call(value);

        switch (_class) {
            case NUMBER_CLASS:
            case BOOLEAN_CLASS:
            case STRING_CLASS:
                value = value.valueOf();
        }

        switch (value) {
            case null: return 'null';
            case true: return 'true';
            case false: return 'false';
        }

        var type = typeof value;
        switch (type) {
            case 'string':
                return value.inspect(true);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'object':

                for (var i = 0, length = stack.length; i < length; i++) {
                    if (stack[i] === value) {
                        throw new TypeError("Cyclic reference to '" + value + "' in object");
                    }
                }
                stack.push(value);

                var partial = [];
                if (_class === ARRAY_CLASS) {
                    for (var i = 0, length = value.length; i < length; i++) {
                        var str = Str(i, value, stack);
                        partial.push(typeof str === 'undefined' ? 'null' : str);
                    }
                    partial = '[' + partial.join(',') + ']';
                } else {
                    var keys = Object.keys(value);
                    for (var i = 0, length = keys.length; i < length; i++) {
                        var key = keys[i], str = Str(key, value, stack);
                        if (typeof str !== "undefined") {
                            partial.push(key.inspect(true)+ ':' + str);
                        }
                    }
                    partial = '{' + partial.join(',') + '}';
                }
                stack.pop();
                return partial;
        }
    }

    function stringify(object) {
        return JSON.stringify(object);
    }

    function toQueryString(object) {
        return $H(object).toQueryString();
    }

    function toHTML(object) {
        return object && object.toHTML ? object.toHTML() : String.interpret(object);
    }

    function keys(object) {
        if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
        var results = [];
        for (var property in object) {
            if (_hasOwnProperty.call(object, property))
                results.push(property);
        }

        if (IS_DONTENUM_BUGGY) {
            for (var i = 0; property = DONT_ENUMS[i]; i++) {
                if (_hasOwnProperty.call(object, property))
                    results.push(property);
            }
        }

        return results;
    }

    function values(object) {
        var results = [];
        for (var property in object)
            results.push(object[property]);
        return results;
    }

    function clone(object) {
        return extend({ }, object);
    }

    function isElement(object) {
        return !!(object && object.nodeType == 1);
    }

    function isArray(object) {
        return _toString.call(object) === ARRAY_CLASS;
    }

    var hasNativeIsArray = (typeof Array.isArray == 'function')
        && Array.isArray([]) && !Array.isArray({});

    if (hasNativeIsArray) {
        isArray = Array.isArray;
    }

    function isHash(object) {
        return object instanceof Hash;
    }

    function isFunction(object) {
        return _toString.call(object) === FUNCTION_CLASS;
    }

    function isString(object) {
        return _toString.call(object) === STRING_CLASS;
    }

    function isNumber(object) {
        return _toString.call(object) === NUMBER_CLASS;
    }

    function isDate(object) {
        return _toString.call(object) === DATE_CLASS;
    }

    function isUndefined(object) {
        return typeof object === "undefined";
    }

    extend(Object, {
        extend:        extend,
        inspect:       inspect,
        toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
        toQueryString: toQueryString,
        toHTML:        toHTML,
        keys:          Object.keys || keys,
        values:        values,
        clone:         clone,
        isElement:     isElement,
        isArray:       isArray,
        isHash:        isHash,
        isFunction:    isFunction,
        isString:      isString,
        isNumber:      isNumber,
        isDate:        isDate,
        isUndefined:   isUndefined
    });
})();
Object.extend(Function.prototype, (function() {
    var slice = Array.prototype.slice;

    function update(array, args) {
        var arrayLength = array.length, length = args.length;
        while (length--) array[arrayLength + length] = args[length];
        return array;
    }

    function merge(array, args) {
        array = slice.call(array, 0);
        return update(array, args);
    }

    function argumentNames() {
        var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
            .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
    }


    function bind(context) {
        if (arguments.length < 2 && Object.isUndefined(arguments[0]))
            return this;

        if (!Object.isFunction(this))
            throw new TypeError("The object is not callable.");

        var nop = function() {};
        var __method = this, args = slice.call(arguments, 1);

        var bound = function() {
            var a = merge(args, arguments), c = context;
            var c = this instanceof bound ? this : context;
            return __method.apply(c, a);
        };

        nop.prototype   = this.prototype;
        bound.prototype = new nop();

        return bound;
    }

    function bindAsEventListener(context) {
        var __method = this, args = slice.call(arguments, 1);
        return function(event) {
            var a = update([event || window.event], args);
            return __method.apply(context, a);
        }
    }

    function curry() {
        if (!arguments.length) return this;
        var __method = this, args = slice.call(arguments, 0);
        return function() {
            var a = merge(args, arguments);
            return __method.apply(this, a);
        }
    }

    function delay(timeout) {
        var __method = this, args = slice.call(arguments, 1);
        timeout = timeout * 1000;
        return window.setTimeout(function() {
            return __method.apply(__method, args);
        }, timeout);
    }

    function defer() {
        var args = update([0.01], arguments);
        return this.delay.apply(this, args);
    }

    function wrap(wrapper) {
        var __method = this;
        return function() {
            var a = update([__method.bind(this)], arguments);
            return wrapper.apply(this, a);
        }
    }

    function methodize() {
        if (this._methodized) return this._methodized;
        var __method = this;
        return this._methodized = function() {
            var a = update([this], arguments);
            return __method.apply(null, a);
        };
    }

    var extensions = {
        argumentNames:       argumentNames,
        bindAsEventListener: bindAsEventListener,
        curry:               curry,
        delay:               delay,
        defer:               defer,
        wrap:                wrap,
        methodize:           methodize
    };

    if (!Function.prototype.bind)
        extensions.bind = bind;

    return extensions;
})());



(function(proto) {


    function toISOString() {
        return this.getUTCFullYear() + '-' +
            (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
            this.getUTCDate().toPaddedString(2) + 'T' +
            this.getUTCHours().toPaddedString(2) + ':' +
            this.getUTCMinutes().toPaddedString(2) + ':' +
            this.getUTCSeconds().toPaddedString(2) + 'Z';
    }


    function toJSON() {
        return this.toISOString();
    }

    if (!proto.toISOString) proto.toISOString = toISOString;
    if (!proto.toJSON) proto.toJSON = toJSON;

})(Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
    initialize: function(callback, frequency) {
        this.callback = callback;
        this.frequency = frequency;
        this.currentlyExecuting = false;

        this.registerCallback();
    },

    registerCallback: function() {
        this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
    },

    execute: function() {
        this.callback(this);
    },

    stop: function() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    },

    onTimerEvent: function() {
        if (!this.currentlyExecuting) {
            try {
                this.currentlyExecuting = true;
                this.execute();
                this.currentlyExecuting = false;
            } catch(e) {
                this.currentlyExecuting = false;
                throw e;
            }
        }
    }
});
Object.extend(String, {
    interpret: function(value) {
        return value == null ? '' : String(value);
    },
    specialChar: {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
    }
});

Object.extend(String.prototype, (function() {
    var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
        typeof JSON.parse === 'function' &&
        JSON.parse('{"test": true}').test;

    function prepareReplacement(replacement) {
        if (Object.isFunction(replacement)) return replacement;
        var template = new Template(replacement);
        return function(match) { return template.evaluate(match) };
    }

    function gsub(pattern, replacement) {
        var result = '', source = this, match;
        replacement = prepareReplacement(replacement);

        if (Object.isString(pattern))
            pattern = RegExp.escape(pattern);

        if (!(pattern.length || pattern.source)) {
            replacement = replacement('');
            return replacement + source.split('').join(replacement) + replacement;
        }

        while (source.length > 0) {
            if (match = source.match(pattern)) {
                result += source.slice(0, match.index);
                result += String.interpret(replacement(match));
                source  = source.slice(match.index + match[0].length);
            } else {
                result += source, source = '';
            }
        }
        return result;
    }

    function sub(pattern, replacement, count) {
        replacement = prepareReplacement(replacement);
        count = Object.isUndefined(count) ? 1 : count;

        return this.gsub(pattern, function(match) {
            if (--count < 0) return match[0];
            return replacement(match);
        });
    }

    function scan(pattern, iterator) {
        this.gsub(pattern, iterator);
        return String(this);
    }

    function truncate(length, truncation) {
        length = length || 30;
        truncation = Object.isUndefined(truncation) ? '...' : truncation;
        return this.length > length ?
            this.slice(0, length - truncation.length) + truncation : String(this);
    }

    function strip() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    function stripTags() {
        return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    }

    function stripScripts() {
        return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
    }

    function extractScripts() {
        var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
            matchOne = new RegExp(Prototype.ScriptFragment, 'im');
        return (this.match(matchAll) || []).map(function(scriptTag) {
            return (scriptTag.match(matchOne) || ['', ''])[1];
        });
    }

    function evalScripts() {
        return this.extractScripts().map(function(script) { return eval(script); });
    }

    function escapeHTML() {
        return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function unescapeHTML() {
        return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    }


    function toQueryParams(separator) {
        var match = this.strip().match(/([^?#]*)(#.*)?$/);
        if (!match) return { };

        return match[1].split(separator || '&').inject({ }, function(hash, pair) {
            if ((pair = pair.split('='))[0]) {
                var key = decodeURIComponent(pair.shift()),
                    value = pair.length > 1 ? pair.join('=') : pair[0];

                if (value != undefined) value = decodeURIComponent(value);

                if (key in hash) {
                    if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
                    hash[key].push(value);
                }
                else hash[key] = value;
            }
            return hash;
        });
    }

    function toArray() {
        return this.split('');
    }

    function succ() {
        return this.slice(0, this.length - 1) +
            String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
    }

    function times(count) {
        return count < 1 ? '' : new Array(count + 1).join(this);
    }

    function camelize() {
        return this.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        });
    }

    function capitalize() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    }

    function underscore() {
        return this.replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/-/g, '_')
            .toLowerCase();
    }

    function dasherize() {
        return this.replace(/_/g, '-');
    }

    function inspect(useDoubleQuotes) {
        var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
            if (character in String.specialChar) {
                return String.specialChar[character];
            }
            return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
        });
        if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
        return "'" + escapedString.replace(/'/g, '\\\'') + "'";
    }

    function unfilterJSON(filter) {
        return this.replace(filter || Prototype.JSONFilter, '$1');
    }

    function isJSON() {
        var str = this;
        if (str.blank()) return false;
        str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
        str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        return (/^[\],:{}\s]*$/).test(str);
    }

    function evalJSON(sanitize) {
        var json = this.unfilterJSON(),
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (cx.test(json)) {
            json = json.replace(cx, function (a) {
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }
        try {
            if (!sanitize || json.isJSON()) return eval('(' + json + ')');
        } catch (e) { }
        throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
    }

    function parseJSON() {
        var json = this.unfilterJSON();
        return JSON.parse(json);
    }

    function include(pattern) {
        return this.indexOf(pattern) > -1;
    }

    function startsWith(pattern) {
        return this.lastIndexOf(pattern, 0) === 0;
    }

    function endsWith(pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.indexOf(pattern, d) === d;
    }

    function empty() {
        return this == '';
    }

    function blank() {
        return /^\s*$/.test(this);
    }

    function interpolate(object, pattern) {
        return new Template(this, pattern).evaluate(object);
    }

    return {
        gsub:           gsub,
        sub:            sub,
        scan:           scan,
        truncate:       truncate,
        strip:          String.prototype.trim || strip,
        stripTags:      stripTags,
        stripScripts:   stripScripts,
        extractScripts: extractScripts,
        evalScripts:    evalScripts,
        escapeHTML:     escapeHTML,
        unescapeHTML:   unescapeHTML,
        toQueryParams:  toQueryParams,
        parseQuery:     toQueryParams,
        toArray:        toArray,
        succ:           succ,
        times:          times,
        camelize:       camelize,
        capitalize:     capitalize,
        underscore:     underscore,
        dasherize:      dasherize,
        inspect:        inspect,
        unfilterJSON:   unfilterJSON,
        isJSON:         isJSON,
        evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
        include:        include,
        startsWith:     startsWith,
        endsWith:       endsWith,
        empty:          empty,
        blank:          blank,
        interpolate:    interpolate
    };
})());

var Template = Class.create({
    initialize: function(template, pattern) {
        this.template = template.toString();
        this.pattern = pattern || Template.Pattern;
    },

    evaluate: function(object) {
        if (object && Object.isFunction(object.toTemplateReplacements))
            object = object.toTemplateReplacements();

        return this.template.gsub(this.pattern, function(match) {
            if (object == null) return (match[1] + '');

            var before = match[1] || '';
            if (before == '\\') return match[2];

            var ctx = object, expr = match[3],
                pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

            match = pattern.exec(expr);
            if (match == null) return before;

            while (match != null) {
                var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
                ctx = ctx[comp];
                if (null == ctx || '' == match[3]) break;
                expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
                match = pattern.exec(expr);
            }

            return before + String.interpret(ctx);
        });
    }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
    function each(iterator, context) {
        try {
            this._each(iterator, context);
        } catch (e) {
            if (e != $break) throw e;
        }
        return this;
    }

    function eachSlice(number, iterator, context) {
        var index = -number, slices = [], array = this.toArray();
        if (number < 1) return array;
        while ((index += number) < array.length)
            slices.push(array.slice(index, index+number));
        return slices.collect(iterator, context);
    }

    function all(iterator, context) {
        iterator = iterator || Prototype.K;
        var result = true;
        this.each(function(value, index) {
            result = result && !!iterator.call(context, value, index, this);
            if (!result) throw $break;
        }, this);
        return result;
    }

    function any(iterator, context) {
        iterator = iterator || Prototype.K;
        var result = false;
        this.each(function(value, index) {
            if (result = !!iterator.call(context, value, index, this))
                throw $break;
        }, this);
        return result;
    }

    function collect(iterator, context) {
        iterator = iterator || Prototype.K;
        var results = [];
        this.each(function(value, index) {
            results.push(iterator.call(context, value, index, this));
        }, this);
        return results;
    }

    function detect(iterator, context) {
        var result;
        this.each(function(value, index) {
            if (iterator.call(context, value, index, this)) {
                result = value;
                throw $break;
            }
        }, this);
        return result;
    }

    function findAll(iterator, context) {
        var results = [];
        this.each(function(value, index) {
            if (iterator.call(context, value, index, this))
                results.push(value);
        }, this);
        return results;
    }

    function grep(filter, iterator, context) {
        iterator = iterator || Prototype.K;
        var results = [];

        if (Object.isString(filter))
            filter = new RegExp(RegExp.escape(filter));

        this.each(function(value, index) {
            if (filter.match(value))
                results.push(iterator.call(context, value, index, this));
        }, this);
        return results;
    }

    function include(object) {
        if (Object.isFunction(this.indexOf))
            if (this.indexOf(object) != -1) return true;

        var found = false;
        this.each(function(value) {
            if (value == object) {
                found = true;
                throw $break;
            }
        });
        return found;
    }

    function inGroupsOf(number, fillWith) {
        fillWith = Object.isUndefined(fillWith) ? null : fillWith;
        return this.eachSlice(number, function(slice) {
            while(slice.length < number) slice.push(fillWith);
            return slice;
        });
    }

    function inject(memo, iterator, context) {
        this.each(function(value, index) {
            memo = iterator.call(context, memo, value, index, this);
        }, this);
        return memo;
    }

    function invoke(method) {
        var args = $A(arguments).slice(1);
        return this.map(function(value) {
            return value[method].apply(value, args);
        });
    }

    function max(iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value >= result)
                result = value;
        }, this);
        return result;
    }

    function min(iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value < result)
                result = value;
        }, this);
        return result;
    }

    function partition(iterator, context) {
        iterator = iterator || Prototype.K;
        var trues = [], falses = [];
        this.each(function(value, index) {
            (iterator.call(context, value, index, this) ?
                trues : falses).push(value);
        }, this);
        return [trues, falses];
    }

    function pluck(property) {
        var results = [];
        this.each(function(value) {
            results.push(value[property]);
        });
        return results;
    }

    function reject(iterator, context) {
        var results = [];
        this.each(function(value, index) {
            if (!iterator.call(context, value, index, this))
                results.push(value);
        }, this);
        return results;
    }

    function sortBy(iterator, context) {
        return this.map(function(value, index) {
            return {
                value: value,
                criteria: iterator.call(context, value, index, this)
            };
        }, this).sort(function(left, right) {
                var a = left.criteria, b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
            }).pluck('value');
    }

    function toArray() {
        return this.map();
    }

    function zip() {
        var iterator = Prototype.K, args = $A(arguments);
        if (Object.isFunction(args.last()))
            iterator = args.pop();

        var collections = [this].concat(args).map($A);
        return this.map(function(value, index) {
            return iterator(collections.pluck(index));
        });
    }

    function size() {
        return this.toArray().length;
    }

    function inspect() {
        return '#<Enumerable:' + this.toArray().inspect() + '>';
    }









    return {
        each:       each,
        eachSlice:  eachSlice,
        all:        all,
        every:      all,
        any:        any,
        some:       any,
        collect:    collect,
        map:        collect,
        detect:     detect,
        findAll:    findAll,
        select:     findAll,
        filter:     findAll,
        grep:       grep,
        include:    include,
        member:     include,
        inGroupsOf: inGroupsOf,
        inject:     inject,
        invoke:     invoke,
        max:        max,
        min:        min,
        partition:  partition,
        pluck:      pluck,
        reject:     reject,
        sortBy:     sortBy,
        toArray:    toArray,
        entries:    toArray,
        zip:        zip,
        size:       size,
        inspect:    inspect,
        find:       detect
    };
})();

function $A(iterable) {
    if (!iterable) return [];
    if ('toArray' in Object(iterable)) return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
}


function $w(string) {
    if (!Object.isString(string)) return [];
    string = string.strip();
    return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
    var arrayProto = Array.prototype,
        slice = arrayProto.slice,
        _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

    function each(iterator, context) {
        for (var i = 0, length = this.length >>> 0; i < length; i++) {
            if (i in this) iterator.call(context, this[i], i, this);
        }
    }
    if (!_each) _each = each;

    function clear() {
        this.length = 0;
        return this;
    }

    function first() {
        return this[0];
    }

    function last() {
        return this[this.length - 1];
    }

    function compact() {
        return this.select(function(value) {
            return value != null;
        });
    }

    function flatten() {
        return this.inject([], function(array, value) {
            if (Object.isArray(value))
                return array.concat(value.flatten());
            array.push(value);
            return array;
        });
    }

    function without() {
        var values = slice.call(arguments, 0);
        return this.select(function(value) {
            return !values.include(value);
        });
    }

    function reverse(inline) {
        return (inline === false ? this.toArray() : this)._reverse();
    }

    function uniq(sorted) {
        return this.inject([], function(array, value, index) {
            if (0 == index || (sorted ? array.last() != value : !array.include(value)))
                array.push(value);
            return array;
        });
    }

    function intersect(array) {
        return this.uniq().findAll(function(item) {
            return array.indexOf(item) !== -1;
        });
    }


    function clone() {
        return slice.call(this, 0);
    }

    function size() {
        return this.length;
    }

    function inspect() {
        return '[' + this.map(Object.inspect).join(', ') + ']';
    }

    function indexOf(item, i) {
        if (this == null) throw new TypeError();

        var array = Object(this), length = array.length >>> 0;
        if (length === 0) return -1;

        i = Number(i);
        if (isNaN(i)) {
            i = 0;
        } else if (i !== 0 && isFinite(i)) {
            i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
        }

        if (i > length) return -1;

        var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
        for (; k < length; k++)
            if (k in array && array[k] === item) return k;
        return -1;
    }


    function lastIndexOf(item, i) {
        if (this == null) throw new TypeError();

        var array = Object(this), length = array.length >>> 0;
        if (length === 0) return -1;

        if (!Object.isUndefined(i)) {
            i = Number(i);
            if (isNaN(i)) {
                i = 0;
            } else if (i !== 0 && isFinite(i)) {
                i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
            }
        } else {
            i = length;
        }

        var k = i >= 0 ? Math.min(i, length - 1) :
            length - Math.abs(i);

        for (; k >= 0; k--)
            if (k in array && array[k] === item) return k;
        return -1;
    }

    function concat(_) {
        var array = [], items = slice.call(arguments, 0), item, n = 0;
        items.unshift(this);
        for (var i = 0, length = items.length; i < length; i++) {
            item = items[i];
            if (Object.isArray(item) && !('callee' in item)) {
                for (var j = 0, arrayLength = item.length; j < arrayLength; j++) {
                    if (j in item) array[n] = item[j];
                    n++;
                }
            } else {
                array[n++] = item;
            }
        }
        array.length = n;
        return array;
    }


    function wrapNative(method) {
        return function() {
            if (arguments.length === 0) {
                return method.call(this, Prototype.K);
            } else if (arguments[0] === undefined) {
                var args = slice.call(arguments, 1);
                args.unshift(Prototype.K);
                return method.apply(this, args);
            } else {
                return method.apply(this, arguments);
            }
        };
    }


    function map(iterator) {
        if (this == null) throw new TypeError();
        iterator = iterator || Prototype.K;

        var object = Object(this);
        var results = [], context = arguments[1], n = 0;

        for (var i = 0, length = object.length >>> 0; i < length; i++) {
            if (i in object) {
                results[n] = iterator.call(context, object[i], i, object);
            }
            n++;
        }
        results.length = n;
        return results;
    }

    if (arrayProto.map) {
        map = wrapNative(Array.prototype.map);
    }

    function filter(iterator) {
        if (this == null || !Object.isFunction(iterator))
            throw new TypeError();

        var object = Object(this);
        var results = [], context = arguments[1], value;

        for (var i = 0, length = object.length >>> 0; i < length; i++) {
            if (i in object) {
                value = object[i];
                if (iterator.call(context, value, i, object)) {
                    results.push(value);
                }
            }
        }
        return results;
    }

    if (arrayProto.filter) {
        filter = Array.prototype.filter;
    }

    function some(iterator) {
        if (this == null) throw new TypeError();
        iterator = iterator || Prototype.K;
        var context = arguments[1];

        var object = Object(this);
        for (var i = 0, length = object.length >>> 0; i < length; i++) {
            if (i in object && iterator.call(context, object[i], i, object)) {
                return true;
            }
        }

        return false;
    }

    if (arrayProto.some) {
        var some = wrapNative(Array.prototype.some);
    }


    function every(iterator) {
        if (this == null) throw new TypeError();
        iterator = iterator || Prototype.K;
        var context = arguments[1];

        var object = Object(this);
        for (var i = 0, length = object.length >>> 0; i < length; i++) {
            if (i in object && !iterator.call(context, object[i], i, object)) {
                return false;
            }
        }

        return true;
    }

    if (arrayProto.every) {
        var every = wrapNative(Array.prototype.every);
    }

    var _reduce = arrayProto.reduce;
    function inject(memo, iterator) {
        iterator = iterator || Prototype.K;
        var context = arguments[2];
        return _reduce.call(this, iterator.bind(context), memo);
    }

    if (!arrayProto.reduce) {
        var inject = Enumerable.inject;
    }

    Object.extend(arrayProto, Enumerable);

    if (!arrayProto._reverse)
        arrayProto._reverse = arrayProto.reverse;

    Object.extend(arrayProto, {
        _each:     _each,

        map:       map,
        collect:   map,
        select:    filter,
        filter:    filter,
        findAll:   filter,
        some:      some,
        any:       some,
        every:     every,
        all:       every,
        inject:    inject,

        clear:     clear,
        first:     first,
        last:      last,
        compact:   compact,
        flatten:   flatten,
        without:   without,
        reverse:   reverse,
        uniq:      uniq,
        intersect: intersect,
        clone:     clone,
        toArray:   clone,
        size:      size,
        inspect:   inspect
    });

    var CONCAT_ARGUMENTS_BUGGY = (function() {
        return [].concat(arguments)[0][0] !== 1;
    })(1,2);

    if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

    if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
    if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
    return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
    function initialize(object) {
        this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
    }


    function _each(iterator, context) {
        for (var key in this._object) {
            var value = this._object[key], pair = [key, value];
            pair.key = key;
            pair.value = value;
            iterator.call(context, pair);
        }
    }

    function set(key, value) {
        return this._object[key] = value;
    }

    function get(key) {
        if (this._object[key] !== Object.prototype[key])
            return this._object[key];
    }

    function unset(key) {
        var value = this._object[key];
        delete this._object[key];
        return value;
    }

    function toObject() {
        return Object.clone(this._object);
    }



    function keys() {
        return this.pluck('key');
    }

    function values() {
        return this.pluck('value');
    }

    function index(value) {
        var match = this.detect(function(pair) {
            return pair.value === value;
        });
        return match && match.key;
    }

    function merge(object) {
        return this.clone().update(object);
    }

    function update(object) {
        return new Hash(object).inject(this, function(result, pair) {
            result.set(pair.key, pair.value);
            return result;
        });
    }

    function toQueryPair(key, value) {
        if (Object.isUndefined(value)) return key;

        var value = String.interpret(value);

        value = value.gsub(/(\r)?\n/, '\r\n');
        value = encodeURIComponent(value);
        value = value.gsub(/%20/, '+');
        return key + '=' + value;
    }

    function toQueryString() {
        return this.inject([], function(results, pair) {
            var key = encodeURIComponent(pair.key), values = pair.value;

            if (values && typeof values == 'object') {
                if (Object.isArray(values)) {
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(toQueryPair(key, value));
                    }
                    return results.concat(queryValues);
                }
            } else results.push(toQueryPair(key, values));
            return results;
        }).join('&');
    }

    function inspect() {
        return '#<Hash:{' + this.map(function(pair) {
            return pair.map(Object.inspect).join(': ');
        }).join(', ') + '}>';
    }

    function clone() {
        return new Hash(this);
    }

    return {
        initialize:             initialize,
        _each:                  _each,
        set:                    set,
        get:                    get,
        unset:                  unset,
        toObject:               toObject,
        toTemplateReplacements: toObject,
        keys:                   keys,
        values:                 values,
        index:                  index,
        merge:                  merge,
        update:                 update,
        toQueryString:          toQueryString,
        inspect:                inspect,
        toJSON:                 toObject,
        clone:                  clone
    };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
    function toColorPart() {
        return this.toPaddedString(2, 16);
    }

    function succ() {
        return this + 1;
    }

    function times(iterator, context) {
        $R(0, this, true).each(iterator, context);
        return this;
    }

    function toPaddedString(length, radix) {
        var string = this.toString(radix || 10);
        return '0'.times(length - string.length) + string;
    }

    function abs() {
        return Math.abs(this);
    }

    function round() {
        return Math.round(this);
    }

    function ceil() {
        return Math.ceil(this);
    }

    function floor() {
        return Math.floor(this);
    }

    return {
        toColorPart:    toColorPart,
        succ:           succ,
        times:          times,
        toPaddedString: toPaddedString,
        abs:            abs,
        round:          round,
        ceil:           ceil,
        floor:          floor
    };
})());

function $R(start, end, exclusive) {
    return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
    function initialize(start, end, exclusive) {
        this.start = start;
        this.end = end;
        this.exclusive = exclusive;
    }

    function _each(iterator, context) {
        var value = this.start;
        while (this.include(value)) {
            iterator.call(context, value);
            value = value.succ();
        }
    }

    function include(value) {
        if (value < this.start)
            return false;
        if (this.exclusive)
            return value < this.end;
        return value <= this.end;
    }

    return {
        initialize: initialize,
        _each:      _each,
        include:    include
    };
})());



var Abstract = { };


var Try = {
    these: function() {
        var returnValue;

        for (var i = 0, length = arguments.length; i < length; i++) {
            var lambda = arguments[i];
            try {
                returnValue = lambda();
                break;
            } catch (e) { }
        }

        return returnValue;
    }
};

var Ajax = {
    getTransport: function() {
        return Try.these(
            function() {return new XMLHttpRequest()},
            function() {return new ActiveXObject('Msxml2.XMLHTTP')},
            function() {return new ActiveXObject('Microsoft.XMLHTTP')}
        ) || false;
    },

    activeRequestCount: 0
};

Ajax.Responders = {
    responders: [],

    _each: function(iterator, context) {
        this.responders._each(iterator, context);
    },

    register: function(responder) {
        if (!this.include(responder))
            this.responders.push(responder);
    },

    unregister: function(responder) {
        this.responders = this.responders.without(responder);
    },

    dispatch: function(callback, request, transport, json) {
        this.each(function(responder) {
            if (Object.isFunction(responder[callback])) {
                try {
                    responder[callback].apply(responder, [request, transport, json]);
                } catch (e) { }
            }
        });
    }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
    onCreate:   function() { Ajax.activeRequestCount++ },
    onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
    initialize: function(options) {
        this.options = {
            method:       'post',
            asynchronous: true,
            contentType:  'application/x-www-form-urlencoded',
            encoding:     'UTF-8',
            parameters:   '',
            evalJSON:     true,
            evalJS:       true
        };
        Object.extend(this.options, options || { });

        this.options.method = this.options.method.toLowerCase();

        if (Object.isHash(this.options.parameters))
            this.options.parameters = this.options.parameters.toObject();
    }
});
Ajax.Request = Class.create(Ajax.Base, {
    _complete: false,

    initialize: function($super, url, options) {
        $super(options);
        this.transport = Ajax.getTransport();
        this.request(url);
    },

    request: function(url) {
        this.url = url;
        this.method = this.options.method;
        var params = Object.isString(this.options.parameters) ?
            this.options.parameters :
            Object.toQueryString(this.options.parameters);

        if (!['get', 'post'].include(this.method)) {
            params += (params ? '&' : '') + "_method=" + this.method;
            this.method = 'post';
        }

        if (params && this.method === 'get') {
            this.url += (this.url.include('?') ? '&' : '?') + params;
        }

        this.parameters = params.toQueryParams();

        try {
            var response = new Ajax.Response(this);
            if (this.options.onCreate) this.options.onCreate(response);
            Ajax.Responders.dispatch('onCreate', this, response);

            this.transport.open(this.method.toUpperCase(), this.url,
                this.options.asynchronous);

            if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

            this.transport.onreadystatechange = this.onStateChange.bind(this);
            this.setRequestHeaders();

            this.body = this.method == 'post' ? (this.options.postBody || params) : null;
            this.transport.send(this.body);

            /* Force Firefox to handle ready state 4 for synchronous requests */
            if (!this.options.asynchronous && this.transport.overrideMimeType)
                this.onStateChange();

        }
        catch (e) {
            this.dispatchException(e);
        }
    },

    onStateChange: function() {
        var readyState = this.transport.readyState;
        if (readyState > 1 && !((readyState == 4) && this._complete))
            this.respondToReadyState(this.transport.readyState);
    },

    setRequestHeaders: function() {
        var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Prototype-Version': Prototype.Version,
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
        };

        if (this.method == 'post') {
            headers['Content-type'] = this.options.contentType +
                (this.options.encoding ? '; charset=' + this.options.encoding : '');

            /* Force "Connection: close" for older Mozilla browsers to work
             * around a bug where XMLHttpRequest sends an incorrect
             * Content-length header. See Mozilla Bugzilla #246651.
             */
            if (this.transport.overrideMimeType &&
                (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
                headers['Connection'] = 'close';
        }

        if (typeof this.options.requestHeaders == 'object') {
            var extras = this.options.requestHeaders;

            if (Object.isFunction(extras.push))
                for (var i = 0, length = extras.length; i < length; i += 2)
                    headers[extras[i]] = extras[i+1];
            else
                $H(extras).each(function(pair) { headers[pair.key] = pair.value });
        }

        for (var name in headers)
            this.transport.setRequestHeader(name, headers[name]);
    },

    success: function() {
        var status = this.getStatus();
        return !status || (status >= 200 && status < 300) || status == 304;
    },

    getStatus: function() {
        try {
            if (this.transport.status === 1223) return 204;
            return this.transport.status || 0;
        } catch (e) { return 0 }
    },

    respondToReadyState: function(readyState) {
        var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

        if (state == 'Complete') {
            try {
                this._complete = true;
                (this.options['on' + response.status]
                    || this.options['on' + (this.success() ? 'Success' : 'Failure')]
                    || Prototype.emptyFunction)(response, response.headerJSON);
            } catch (e) {
                this.dispatchException(e);
            }

            var contentType = response.getHeader('Content-type');
            if (this.options.evalJS == 'force'
                || (this.options.evalJS && this.isSameOrigin() && contentType
                && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
                this.evalResponse();
        }

        try {
            (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
            Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
        } catch (e) {
            this.dispatchException(e);
        }

        if (state == 'Complete') {
            this.transport.onreadystatechange = Prototype.emptyFunction;
        }
    },

    isSameOrigin: function() {
        var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
        return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
            protocol: location.protocol,
            domain: document.domain,
            port: location.port ? ':' + location.port : ''
        }));
    },

    getHeader: function(name) {
        try {
            return this.transport.getResponseHeader(name) || null;
        } catch (e) { return null; }
    },

    evalResponse: function() {
        try {
            return eval((this.transport.responseText || '').unfilterJSON());
        } catch (e) {
            this.dispatchException(e);
        }
    },

    dispatchException: function(exception) {
        (this.options.onException || Prototype.emptyFunction)(this, exception);
        Ajax.Responders.dispatch('onException', this, exception);
    }
});

Ajax.Request.Events =
    ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
    initialize: function(request){
        this.request = request;
        var transport  = this.transport  = request.transport,
            readyState = this.readyState = transport.readyState;

        if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
            this.status       = this.getStatus();
            this.statusText   = this.getStatusText();
            this.responseText = String.interpret(transport.responseText);
            this.headerJSON   = this._getHeaderJSON();
        }

        if (readyState == 4) {
            var xml = transport.responseXML;
            this.responseXML  = Object.isUndefined(xml) ? null : xml;
            this.responseJSON = this._getResponseJSON();
        }
    },

    status:      0,

    statusText: '',

    getStatus: Ajax.Request.prototype.getStatus,

    getStatusText: function() {
        try {
            return this.transport.statusText || '';
        } catch (e) { return '' }
    },

    getHeader: Ajax.Request.prototype.getHeader,

    getAllHeaders: function() {
        try {
            return this.getAllResponseHeaders();
        } catch (e) { return null }
    },

    getResponseHeader: function(name) {
        return this.transport.getResponseHeader(name);
    },

    getAllResponseHeaders: function() {
        return this.transport.getAllResponseHeaders();
    },

    _getHeaderJSON: function() {
        var json = this.getHeader('X-JSON');
        if (!json) return null;

        try {
            json = decodeURIComponent(escape(json));
        } catch(e) {
        }

        try {
            return json.evalJSON(this.request.options.sanitizeJSON ||
                !this.request.isSameOrigin());
        } catch (e) {
            this.request.dispatchException(e);
        }
    },

    _getResponseJSON: function() {
        var options = this.request.options;
        if (!options.evalJSON || (options.evalJSON != 'force' &&
            !(this.getHeader('Content-type') || '').include('application/json')) ||
            this.responseText.blank())
            return null;
        try {
            return this.responseText.evalJSON(options.sanitizeJSON ||
                !this.request.isSameOrigin());
        } catch (e) {
            this.request.dispatchException(e);
        }
    }
});

Ajax.Updater = Class.create(Ajax.Request, {
    initialize: function($super, container, url, options) {
        this.container = {
            success: (container.success || container),
            failure: (container.failure || (container.success ? null : container))
        };

        options = Object.clone(options);
        var onComplete = options.onComplete;
        options.onComplete = (function(response, json) {
            this.updateContent(response.responseText);
            if (Object.isFunction(onComplete)) onComplete(response, json);
        }).bind(this);

        $super(url, options);
    },

    updateContent: function(responseText) {
        var receiver = this.container[this.success() ? 'success' : 'failure'],
            options = this.options;

        if (!options.evalScripts) responseText = responseText.stripScripts();

        if (receiver = $(receiver)) {
            if (options.insertion) {
                if (Object.isString(options.insertion)) {
                    var insertion = { }; insertion[options.insertion] = responseText;
                    receiver.insert(insertion);
                }
                else options.insertion(receiver, responseText);
            }
            else receiver.update(responseText);
        }
    }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
    initialize: function($super, container, url, options) {
        $super(options);
        this.onComplete = this.options.onComplete;

        this.frequency = (this.options.frequency || 2);
        this.decay = (this.options.decay || 1);

        this.updater = { };
        this.container = container;
        this.url = url;

        this.start();
    },

    start: function() {
        this.options.onComplete = this.updateComplete.bind(this);
        this.onTimerEvent();
    },

    stop: function() {
        this.updater.options.onComplete = undefined;
        clearTimeout(this.timer);
        (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
    },

    updateComplete: function(response) {
        if (this.options.decay) {
            this.decay = (response.responseText == this.lastText ?
                this.decay * this.options.decay : 1);

            this.lastText = response.responseText;
        }
        this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
    },

    onTimerEvent: function() {
        this.updater = new Ajax.Updater(this.container, this.url, this.options);
    }
});

(function(GLOBAL) {

    var UNDEFINED;
    var SLICE = Array.prototype.slice;

    var DIV = document.createElement('div');


    function $(element) {
        if (arguments.length > 1) {
            for (var i = 0, elements = [], length = arguments.length; i < length; i++)
                elements.push($(arguments[i]));
            return elements;
        }

        if (Object.isString(element))
            element = document.getElementById(element);
        return Element.extend(element);
    }

    GLOBAL.$ = $;


    if (!GLOBAL.Node) GLOBAL.Node = {};

    if (!GLOBAL.Node.ELEMENT_NODE) {
        Object.extend(GLOBAL.Node, {
            ELEMENT_NODE:                1,
            ATTRIBUTE_NODE:              2,
            TEXT_NODE:                   3,
            CDATA_SECTION_NODE:          4,
            ENTITY_REFERENCE_NODE:       5,
            ENTITY_NODE:                 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE:                8,
            DOCUMENT_NODE:               9,
            DOCUMENT_TYPE_NODE:         10,
            DOCUMENT_FRAGMENT_NODE:     11,
            NOTATION_NODE:              12
        });
    }

    var ELEMENT_CACHE = {};

    function shouldUseCreationCache(tagName, attributes) {
        if (tagName === 'select') return false;
        if ('type' in attributes) return false;
        return true;
    }

    var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
        try {
            var el = document.createElement('<input name="x">');
            return el.tagName.toLowerCase() === 'input' && el.name === 'x';
        }
        catch(err) {
            return false;
        }
    })();


    var oldElement = GLOBAL.Element;
    function Element(tagName, attributes) {
        attributes = attributes || {};
        tagName = tagName.toLowerCase();

        if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
            tagName = '<' + tagName + ' name="' + attributes.name + '">';
            delete attributes.name;
            return Element.writeAttribute(document.createElement(tagName), attributes);
        }

        if (!ELEMENT_CACHE[tagName])
            ELEMENT_CACHE[tagName] = Element.extend(document.createElement(tagName));

        var node = shouldUseCreationCache(tagName, attributes) ?
            ELEMENT_CACHE[tagName].cloneNode(false) : document.createElement(tagName);

        return Element.writeAttribute(node, attributes);
    }

    GLOBAL.Element = Element;

    Object.extend(GLOBAL.Element, oldElement || {});
    if (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

    Element.Methods = { ByTag: {}, Simulated: {} };

    var methods = {};

    var INSPECT_ATTRIBUTES = { id: 'id', className: 'class' };
    function inspect(element) {
        element = $(element);
        var result = '<' + element.tagName.toLowerCase();

        var attribute, value;
        for (var property in INSPECT_ATTRIBUTES) {
            attribute = INSPECT_ATTRIBUTES[property];
            value = (element[property] || '').toString();
            if (value) result += ' ' + attribute + '=' + value.inspect(true);
        }

        return result + '>';
    }

    methods.inspect = inspect;


    function visible(element) {
        return $(element).style.display !== 'none';
    }

    function toggle(element, bool) {
        element = $(element);
        if (Object.isUndefined(bool))
            bool = !Element.visible(element);
        Element[bool ? 'show' : 'hide'](element);

        return element;
    }

    function hide(element) {
        element = $(element);
        element.style.display = 'none';
        return element;
    }

    function show(element) {
        element = $(element);
        element.style.display = '';
        return element;
    }


    Object.extend(methods, {
        visible: visible,
        toggle:  toggle,
        hide:    hide,
        show:    show
    });


    function remove(element) {
        element = $(element);
        element.parentNode.removeChild(element);
        return element;
    }

    var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
        var el = document.createElement("select"),
            isBuggy = true;
        el.innerHTML = "<option value=\"test\">test</option>";
        if (el.options && el.options[0]) {
            isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
        }
        el = null;
        return isBuggy;
    })();

    var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
        try {
            var el = document.createElement("table");
            if (el && el.tBodies) {
                el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
                var isBuggy = typeof el.tBodies[0] == "undefined";
                el = null;
                return isBuggy;
            }
        } catch (e) {
            return true;
        }
    })();

    var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
        try {
            var el = document.createElement('div');
            el.innerHTML = "<link />";
            var isBuggy = (el.childNodes.length === 0);
            el = null;
            return isBuggy;
        } catch(e) {
            return true;
        }
    })();

    var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
        TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

    var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
        var s = document.createElement("script"),
            isBuggy = false;
        try {
            s.appendChild(document.createTextNode(""));
            isBuggy = !s.firstChild ||
                s.firstChild && s.firstChild.nodeType !== 3;
        } catch (e) {
            isBuggy = true;
        }
        s = null;
        return isBuggy;
    })();

    function update(element, content) {
        element = $(element);

        var descendants = element.getElementsByTagName('*'),
            i = descendants.length;
        while (i--) purgeElement(descendants[i]);

        if (content && content.toElement)
            content = content.toElement();

        if (Object.isElement(content))
            return element.update().insert(content);


        content = Object.toHTML(content);
        var tagName = element.tagName.toUpperCase();

        if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
            element.text = content;
            return element;
        }

        if (ANY_INNERHTML_BUGGY) {
            if (tagName in INSERTION_TRANSLATIONS.tags) {
                while (element.firstChild)
                    element.removeChild(element.firstChild);

                var nodes = getContentFromAnonymousElement(tagName, content.stripScripts());
                for (var i = 0, node; node = nodes[i]; i++)
                    element.appendChild(node);

            } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
                while (element.firstChild)
                    element.removeChild(element.firstChild);

                var nodes = getContentFromAnonymousElement(tagName,
                    content.stripScripts(), true);

                for (var i = 0, node; node = nodes[i]; i++)
                    element.appendChild(node);
            } else {
                element.innerHTML = content.stripScripts();
            }
        } else {
            element.innerHTML = content.stripScripts();
        }

        content.evalScripts.bind(content).defer();
        return element;
    }

    function replace(element, content) {
        element = $(element);

        if (content && content.toElement) {
            content = content.toElement();
        } else if (!Object.isElement(content)) {
            content = Object.toHTML(content);
            var range = element.ownerDocument.createRange();
            range.selectNode(element);
            content.evalScripts.bind(content).defer();
            content = range.createContextualFragment(content.stripScripts());
        }

        element.parentNode.replaceChild(content, element);
        return element;
    }

    var INSERTION_TRANSLATIONS = {
        before: function(element, node) {
            element.parentNode.insertBefore(node, element);
        },
        top: function(element, node) {
            element.insertBefore(node, element.firstChild);
        },
        bottom: function(element, node) {
            element.appendChild(node);
        },
        after: function(element, node) {
            element.parentNode.insertBefore(node, element.nextSibling);
        },

        tags: {
            TABLE:  ['<table>',                '</table>',                   1],
            TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
            TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
            TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
            SELECT: ['<select>',               '</select>',                  1]
        }
    };

    var tags = INSERTION_TRANSLATIONS.tags;

    Object.extend(tags, {
        THEAD: tags.TBODY,
        TFOOT: tags.TBODY,
        TH:    tags.TD
    });

    function replace_IE(element, content) {
        element = $(element);
        if (content && content.toElement)
            content = content.toElement();
        if (Object.isElement(content)) {
            element.parentNode.replaceChild(content, element);
            return element;
        }

        content = Object.toHTML(content);
        var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

        if (tagName in INSERTION_TRANSLATIONS.tags) {
            var nextSibling = Element.next(element);
            var fragments = getContentFromAnonymousElement(
                tagName, content.stripScripts());

            parent.removeChild(element);

            var iterator;
            if (nextSibling)
                iterator = function(node) { parent.insertBefore(node, nextSibling) };
            else
                iterator = function(node) { parent.appendChild(node); }

            fragments.each(iterator);
        } else {
            element.outerHTML = content.stripScripts();
        }

        content.evalScripts.bind(content).defer();
        return element;
    }

    if ('outerHTML' in document.documentElement)
        replace = replace_IE;

    function isContent(content) {
        if (Object.isUndefined(content) || content === null) return false;

        if (Object.isString(content) || Object.isNumber(content)) return true;
        if (Object.isElement(content)) return true;
        if (content.toElement || content.toHTML) return true;

        return false;
    }

    function insertContentAt(element, content, position) {
        position   = position.toLowerCase();
        var method = INSERTION_TRANSLATIONS[position];

        if (content && content.toElement) content = content.toElement();
        if (Object.isElement(content)) {
            method(element, content);
            return element;
        }

        content = Object.toHTML(content);
        var tagName = ((position === 'before' || position === 'after') ?
            element.parentNode : element).tagName.toUpperCase();

        var childNodes = getContentFromAnonymousElement(tagName, content.stripScripts());

        if (position === 'top' || position === 'after') childNodes.reverse();

        for (var i = 0, node; node = childNodes[i]; i++)
            method(element, node);

        content.evalScripts.bind(content).defer();
    }

    function insert(element, insertions) {
        element = $(element);

        if (isContent(insertions))
            insertions = { bottom: insertions };

        for (var position in insertions)
            insertContentAt(element, insertions[position], position);

        return element;
    }

    function wrap(element, wrapper, attributes) {
        element = $(element);

        if (Object.isElement(wrapper)) {
            $(wrapper).writeAttribute(attributes || {});
        } else if (Object.isString(wrapper)) {
            wrapper = new Element(wrapper, attributes);
        } else {
            wrapper = new Element('div', wrapper);
        }

        if (element.parentNode)
            element.parentNode.replaceChild(wrapper, element);

        wrapper.appendChild(element);

        return wrapper;
    }

    function cleanWhitespace(element) {
        element = $(element);
        var node = element.firstChild;

        while (node) {
            var nextNode = node.nextSibling;
            if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
                element.removeChild(node);
            node = nextNode;
        }
        return element;
    }

    function empty(element) {
        return $(element).innerHTML.blank();
    }

    function getContentFromAnonymousElement(tagName, html, force) {
        var t = INSERTION_TRANSLATIONS.tags[tagName], div = DIV;

        var workaround = !!t;
        if (!workaround && force) {
            workaround = true;
            t = ['', '', 0];
        }

        if (workaround) {
            div.innerHTML = '&#160;' + t[0] + html + t[1];
            div.removeChild(div.firstChild);
            for (var i = t[2]; i--; )
                div = div.firstChild;
        } else {
            div.innerHTML = html;
        }

        return $A(div.childNodes);
    }

    function clone(element, deep) {
        if (!(element = $(element))) return;
        var clone = element.cloneNode(deep);
        if (!HAS_UNIQUE_ID_PROPERTY) {
            clone._prototypeUID = UNDEFINED;
            if (deep) {
                var descendants = Element.select(clone, '*'),
                    i = descendants.length;
                while (i--)
                    descendants[i]._prototypeUID = UNDEFINED;
            }
        }
        return Element.extend(clone);
    }

    function purgeElement(element) {
        var uid = getUniqueElementID(element);
        if (uid) {
            Element.stopObserving(element);
            if (!HAS_UNIQUE_ID_PROPERTY)
                element._prototypeUID = UNDEFINED;
            delete Element.Storage[uid];
        }
    }

    function purgeCollection(elements) {
        var i = elements.length;
        while (i--)
            purgeElement(elements[i]);
    }

    function purgeCollection_IE(elements) {
        var i = elements.length, element, uid;
        while (i--) {
            element = elements[i];
            uid = getUniqueElementID(element);
            delete Element.Storage[uid];
            delete Event.cache[uid];
        }
    }

    if (HAS_UNIQUE_ID_PROPERTY) {
        purgeCollection = purgeCollection_IE;
    }


    function purge(element) {
        if (!(element = $(element))) return;
        purgeElement(element);

        var descendants = element.getElementsByTagName('*'),
            i = descendants.length;

        while (i--) purgeElement(descendants[i]);

        return null;
    }

    Object.extend(methods, {
        remove:  remove,
        update:  update,
        replace: replace,
        insert:  insert,
        wrap:    wrap,
        cleanWhitespace: cleanWhitespace,
        empty:   empty,
        clone:   clone,
        purge:   purge
    });



    function recursivelyCollect(element, property, maximumLength) {
        element = $(element);
        maximumLength = maximumLength || -1;
        var elements = [];

        while (element = element[property]) {
            if (element.nodeType === Node.ELEMENT_NODE)
                elements.push(Element.extend(element));

            if (elements.length === maximumLength) break;
        }

        return elements;
    }


    function ancestors(element) {
        return recursivelyCollect(element, 'parentNode');
    }

    function descendants(element) {
        return Element.select(element, '*');
    }

    function firstDescendant(element) {
        element = $(element).firstChild;
        while (element && element.nodeType !== Node.ELEMENT_NODE)
            element = element.nextSibling;

        return $(element);
    }

    function immediateDescendants(element) {
        var results = [], child = $(element).firstChild;

        while (child) {
            if (child.nodeType === Node.ELEMENT_NODE)
                results.push(Element.extend(child));

            child = child.nextSibling;
        }

        return results;
    }

    function previousSiblings(element) {
        return recursivelyCollect(element, 'previousSibling');
    }

    function nextSiblings(element) {
        return recursivelyCollect(element, 'nextSibling');
    }

    function siblings(element) {
        element = $(element);
        var previous = previousSiblings(element),
            next = nextSiblings(element);
        return previous.reverse().concat(next);
    }

    function match(element, selector) {
        element = $(element);

        if (Object.isString(selector))
            return Prototype.Selector.match(element, selector);

        return selector.match(element);
    }


    function _recursivelyFind(element, property, expression, index) {
        element = $(element), expression = expression || 0, index = index || 0;
        if (Object.isNumber(expression)) {
            index = expression, expression = null;
        }

        while (element = element[property]) {
            if (element.nodeType !== 1) continue;
            if (expression && !Prototype.Selector.match(element, expression))
                continue;
            if (--index >= 0) continue;

            return Element.extend(element);
        }
    }


    function up(element, expression, index) {
        element = $(element);

        if (arguments.length === 1) return $(element.parentNode);
        return _recursivelyFind(element, 'parentNode', expression, index);
    }

    function down(element, expression, index) {
        element = $(element), expression = expression || 0, index = index || 0;

        if (Object.isNumber(expression))
            index = expression, expression = '*';

        var node = Prototype.Selector.select(expression, element)[index];
        return Element.extend(node);
    }

    function previous(element, expression, index) {
        return _recursivelyFind(element, 'previousSibling', expression, index);
    }

    function next(element, expression, index) {
        return _recursivelyFind(element, 'nextSibling', expression, index);
    }

    function select(element) {
        element = $(element);
        var expressions = SLICE.call(arguments, 1).join(', ');
        return Prototype.Selector.select(expressions, element);
    }

    function adjacent(element) {
        element = $(element);
        var expressions = SLICE.call(arguments, 1).join(', ');
        var siblings = Element.siblings(element), results = [];
        for (var i = 0, sibling; sibling = siblings[i]; i++) {
            if (Prototype.Selector.match(sibling, expressions))
                results.push(sibling);
        }

        return results;
    }

    function descendantOf_DOM(element, ancestor) {
        element = $(element), ancestor = $(ancestor);
        while (element = element.parentNode)
            if (element === ancestor) return true;
        return false;
    }

    function descendantOf_contains(element, ancestor) {
        element = $(element), ancestor = $(ancestor);
        if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
        return ancestor.contains(element) && ancestor !== element;
    }

    function descendantOf_compareDocumentPosition(element, ancestor) {
        element = $(element), ancestor = $(ancestor);
        return (element.compareDocumentPosition(ancestor) & 8) === 8;
    }

    var descendantOf;
    if (DIV.compareDocumentPosition) {
        descendantOf = descendantOf_compareDocumentPosition;
    } else if (DIV.contains) {
        descendantOf = descendantOf_contains;
    } else {
        descendantOf = descendantOf_DOM;
    }


    Object.extend(methods, {
        recursivelyCollect:   recursivelyCollect,
        ancestors:            ancestors,
        descendants:          descendants,
        firstDescendant:      firstDescendant,
        immediateDescendants: immediateDescendants,
        previousSiblings:     previousSiblings,
        nextSiblings:         nextSiblings,
        siblings:             siblings,
        match:                match,
        up:                   up,
        down:                 down,
        previous:             previous,
        next:                 next,
        select:               select,
        adjacent:             adjacent,
        descendantOf:         descendantOf,

        getElementsBySelector: select,

        childElements:         immediateDescendants
    });


    var idCounter = 1;
    function identify(element) {
        element = $(element);
        var id = Element.readAttribute(element, 'id');
        if (id) return id;

        do { id = 'anonymous_element_' + idCounter++ } while ($(id));

        Element.writeAttribute(element, 'id', id);
        return id;
    }


    function readAttribute(element, name) {
        return $(element).getAttribute(name);
    }

    function readAttribute_IE(element, name) {
        element = $(element);

        var table = ATTRIBUTE_TRANSLATIONS.read;
        if (table.values[name])
            return table.values[name](element, name);

        if (table.names[name]) name = table.names[name];

        if (name.include(':')) {
            if (!element.attributes || !element.attributes[name]) return null;
            return element.attributes[name].value;
        }

        return element.getAttribute(name);
    }

    function readAttribute_Opera(element, name) {
        if (name === 'title') return element.title;
        return element.getAttribute(name);
    }

    var PROBLEMATIC_ATTRIBUTE_READING = (function() {
        DIV.setAttribute('onclick', Prototype.emptyFunction);
        var value = DIV.getAttribute('onclick');
        var isFunction = (typeof value === 'function');
        DIV.removeAttribute('onclick');
        return isFunction;
    })();

    if (PROBLEMATIC_ATTRIBUTE_READING) {
        readAttribute = readAttribute_IE;
    } else if (Prototype.Browser.Opera) {
        readAttribute = readAttribute_Opera;
    }


    function writeAttribute(element, name, value) {
        element = $(element);
        var attributes = {}, table = ATTRIBUTE_TRANSLATIONS.write;

        if (typeof name === 'object') {
            attributes = name;
        } else {
            attributes[name] = Object.isUndefined(value) ? true : value;
        }

        for (var attr in attributes) {
            name = table.names[attr] || attr;
            value = attributes[attr];
            if (table.values[attr])
                name = table.values[attr](element, value);
            if (value === false || value === null)
                element.removeAttribute(name);
            else if (value === true)
                element.setAttribute(name, name);
            else element.setAttribute(name, value);
        }

        return element;
    }

    function hasAttribute(element, attribute) {
        attribute = ATTRIBUTE_TRANSLATIONS.has[attribute] || attribute;
        var node = $(element).getAttributeNode(attribute);
        return !!(node && node.specified);
    }

    GLOBAL.Element.Methods.Simulated.hasAttribute = hasAttribute;

    function classNames(element) {
        return new Element.ClassNames(element);
    }

    var regExpCache = {};
    function getRegExpForClassName(className) {
        if (regExpCache[className]) return regExpCache[className];

        var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        regExpCache[className] = re;
        return re;
    }

    function hasClassName(element, className) {
        if (!(element = $(element))) return;

        var elementClassName = element.className;

        if (elementClassName.length === 0) return false;
        if (elementClassName === className) return true;

        return getRegExpForClassName(className).test(elementClassName);
    }

    function addClassName(element, className) {
        if (!(element = $(element))) return;

        if (!hasClassName(element, className))
            element.className += (element.className ? ' ' : '') + className;

        return element;
    }

    function removeClassName(element, className) {
        if (!(element = $(element))) return;

        element.className = element.className.replace(
            getRegExpForClassName(className), ' ').strip();

        return element;
    }

    function toggleClassName(element, className, bool) {
        if (!(element = $(element))) return;

        if (Object.isUndefined(bool))
            bool = !hasClassName(element, className);

        var method = Element[bool ? 'addClassName' : 'removeClassName'];
        return method(element, className);
    }

    var ATTRIBUTE_TRANSLATIONS = {};

    var classProp = 'className', forProp = 'for';

    DIV.setAttribute(classProp, 'x');
    if (DIV.className !== 'x') {
        DIV.setAttribute('class', 'x');
        if (DIV.className === 'x')
            classProp = 'class';
    }

    var LABEL = document.createElement('label');
    LABEL.setAttribute(forProp, 'x');
    if (LABEL.htmlFor !== 'x') {
        LABEL.setAttribute('htmlFor', 'x');
        if (LABEL.htmlFor === 'x')
            forProp = 'htmlFor';
    }
    LABEL = null;

    function _getAttr(element, attribute) {
        return element.getAttribute(attribute);
    }

    function _getAttr2(element, attribute) {
        return element.getAttribute(attribute, 2);
    }

    function _getAttrNode(element, attribute) {
        var node = element.getAttributeNode(attribute);
        return node ? node.value : '';
    }

    function _getFlag(element, attribute) {
        return $(element).hasAttribute(attribute) ? attribute : null;
    }

    DIV.onclick = Prototype.emptyFunction;
    var onclickValue = DIV.getAttribute('onclick');

    var _getEv;

    if (String(onclickValue).indexOf('{') > -1) {
        _getEv = function(element, attribute) {
            var value = element.getAttribute(attribute);
            if (!value) return null;
            value = value.toString();
            value = value.split('{')[1];
            value = value.split('}')[0];
            return value.strip();
        };
    }
    else if (onclickValue === '') {
        _getEv = function(element, attribute) {
            var value = element.getAttribute(attribute);
            if (!value) return null;
            return value.strip();
        };
    }

    ATTRIBUTE_TRANSLATIONS.read = {
        names: {
            'class':     classProp,
            'className': classProp,
            'for':       forProp,
            'htmlFor':   forProp
        },

        values: {
            style: function(element) {
                return element.style.cssText.toLowerCase();
            },
            title: function(element) {
                return element.title;
            }
        }
    };

    ATTRIBUTE_TRANSLATIONS.write = {
        names: {
            className:   'class',
            htmlFor:     'for',
            cellpadding: 'cellPadding',
            cellspacing: 'cellSpacing'
        },

        values: {
            checked: function(element, value) {
                element.checked = !!value;
            },

            style: function(element, value) {
                element.style.cssText = value ? value : '';
            }
        }
    };

    ATTRIBUTE_TRANSLATIONS.has = { names: {} };

    Object.extend(ATTRIBUTE_TRANSLATIONS.write.names,
        ATTRIBUTE_TRANSLATIONS.read.names);

    var CAMEL_CASED_ATTRIBUTE_NAMES = $w('colSpan rowSpan vAlign dateTime ' +
        'accessKey tabIndex encType maxLength readOnly longDesc frameBorder');

    for (var i = 0, attr; attr = CAMEL_CASED_ATTRIBUTE_NAMES[i]; i++) {
        ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()] = attr;
        ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()]   = attr;
    }

    Object.extend(ATTRIBUTE_TRANSLATIONS.read.values, {
        href:        _getAttr2,
        src:         _getAttr2,
        type:        _getAttr,
        action:      _getAttrNode,
        disabled:    _getFlag,
        checked:     _getFlag,
        readonly:    _getFlag,
        multiple:    _getFlag,
        onload:      _getEv,
        onunload:    _getEv,
        onclick:     _getEv,
        ondblclick:  _getEv,
        onmousedown: _getEv,
        onmouseup:   _getEv,
        onmouseover: _getEv,
        onmousemove: _getEv,
        onmouseout:  _getEv,
        onfocus:     _getEv,
        onblur:      _getEv,
        onkeypress:  _getEv,
        onkeydown:   _getEv,
        onkeyup:     _getEv,
        onsubmit:    _getEv,
        onreset:     _getEv,
        onselect:    _getEv,
        onchange:    _getEv
    });


    Object.extend(methods, {
        identify:        identify,
        readAttribute:   readAttribute,
        writeAttribute:  writeAttribute,
        classNames:      classNames,
        hasClassName:    hasClassName,
        addClassName:    addClassName,
        removeClassName: removeClassName,
        toggleClassName: toggleClassName
    });


    function normalizeStyleName(style) {
        if (style === 'float' || style === 'styleFloat')
            return 'cssFloat';
        return style.camelize();
    }

    function normalizeStyleName_IE(style) {
        if (style === 'float' || style === 'cssFloat')
            return 'styleFloat';
        return style.camelize();
    }

    function setStyle(element, styles) {
        element = $(element);
        var elementStyle = element.style, match;

        if (Object.isString(styles)) {
            elementStyle.cssText += ';' + styles;
            if (styles.include('opacity')) {
                var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
                Element.setOpacity(element, opacity);
            }
            return element;
        }

        for (var property in styles) {
            if (property === 'opacity') {
                Element.setOpacity(element, styles[property]);
            } else {
                var value = styles[property];
                if (property === 'float' || property === 'cssFloat') {
                    property = Object.isUndefined(elementStyle.styleFloat) ?
                        'cssFloat' : 'styleFloat';
                }
                elementStyle[property] = value;
            }
        }

        return element;
    }


    function getStyle(element, style) {
        element = $(element);
        style = normalizeStyleName(style);

        var value = element.style[style];
        if (!value || value === 'auto') {
            var css = document.defaultView.getComputedStyle(element, null);
            value = css ? css[style] : null;
        }

        if (style === 'opacity') return value ? parseFloat(value) : 1.0;
        return value === 'auto' ? null : value;
    }

    function getStyle_Opera(element, style) {
        switch (style) {
            case 'height': case 'width':
            if (!Element.visible(element)) return null;

            var dim = parseInt(getStyle(element, style), 10);

            if (dim !== element['offset' + style.capitalize()])
                return dim + 'px';

            return Element.measure(element, style);

            default: return getStyle(element, style);
        }
    }

    function getStyle_IE(element, style) {
        element = $(element);
        style = normalizeStyleName_IE(style);

        var value = element.style[style];
        if (!value && element.currentStyle) {
            value = element.currentStyle[style];
        }

        if (style === 'opacity' && !STANDARD_CSS_OPACITY_SUPPORTED)
            return getOpacity_IE(element);

        if (value === 'auto') {
            if ((style === 'width' || style === 'height') && Element.visible(element))
                return Element.measure(element, style) + 'px';
            return null;
        }

        return value;
    }

    function stripAlphaFromFilter_IE(filter) {
        return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
    }

    function hasLayout_IE(element) {
        if (!element.currentStyle.hasLayout)
            element.style.zoom = 1;
        return element;
    }

    var STANDARD_CSS_OPACITY_SUPPORTED = (function() {
        DIV.style.cssText = "opacity:.55";
        return /^0.55/.test(DIV.style.opacity);
    })();

    function setOpacity(element, value) {
        element = $(element);
        if (value == 1 || value === '') value = '';
        else if (value < 0.00001) value = 0;
        element.style.opacity = value;
        return element;
    }

    function setOpacity_IE(element, value) {
        if (STANDARD_CSS_OPACITY_SUPPORTED)
            return setOpacity(element, value);

        element = hasLayout_IE($(element));
        var filter = Element.getStyle(element, 'filter'),
            style = element.style;

        if (value == 1 || value === '') {
            filter = stripAlphaFromFilter_IE(filter);
            if (filter) style.filter = filter;
            else style.removeAttribute('filter');
            return element;
        }

        if (value < 0.00001) value = 0;

        style.filter = stripAlphaFromFilter_IE(filter) +
            'alpha(opacity=' + (value * 100) + ')';

        return element;
    }


    function getOpacity(element) {
        return Element.getStyle(element, 'opacity');
    }

    function getOpacity_IE(element) {
        if (STANDARD_CSS_OPACITY_SUPPORTED)
            return getOpacity(element);

        var filter = Element.getStyle(element, 'filter');
        if (filter.length === 0) return 1.0;
        var match = (filter || '').match(/alpha\(opacity=(.*)\)/);
        if (match[1]) return parseFloat(match[1]) / 100;
        return 1.0;
    }


    Object.extend(methods, {
        setStyle:   setStyle,
        getStyle:   getStyle,
        setOpacity: setOpacity,
        getOpacity: getOpacity
    });

    if ('styleFloat' in DIV.style) {
        methods.getStyle = getStyle_IE;
        methods.setOpacity = setOpacity_IE;
        methods.getOpacity = getOpacity_IE;
    }

    var UID = 0;

    GLOBAL.Element.Storage = { UID: 1 };

    function getUniqueElementID(element) {
        if (element === window) return 0;

        if (typeof element._prototypeUID === 'undefined')
            element._prototypeUID = Element.Storage.UID++;
        return element._prototypeUID;
    }

    function getUniqueElementID_IE(element) {
        if (element === window) return 0;
        if (element == document) return 1;
        return element.uniqueID;
    }

    var HAS_UNIQUE_ID_PROPERTY = ('uniqueID' in DIV);
    if (HAS_UNIQUE_ID_PROPERTY)
        getUniqueElementID = getUniqueElementID_IE;

    function getStorage(element) {
        if (!(element = $(element))) return;

        var uid = getUniqueElementID(element);

        if (!Element.Storage[uid])
            Element.Storage[uid] = $H();

        return Element.Storage[uid];
    }

    function store(element, key, value) {
        if (!(element = $(element))) return;
        var storage = getStorage(element);
        if (arguments.length === 2) {
            storage.update(key);
        } else {
            storage.set(key, value);
        }
        return element;
    }

    function retrieve(element, key, defaultValue) {
        if (!(element = $(element))) return;
        var storage = getStorage(element), value = storage.get(key);

        if (Object.isUndefined(value)) {
            storage.set(key, defaultValue);
            value = defaultValue;
        }

        return value;
    }


    Object.extend(methods, {
        getStorage: getStorage,
        store:      store,
        retrieve:   retrieve
    });


    var Methods = {}, ByTag = Element.Methods.ByTag,
        F = Prototype.BrowserFeatures;

    if (!F.ElementExtensions && ('__proto__' in DIV)) {
        GLOBAL.HTMLElement = {};
        GLOBAL.HTMLElement.prototype = DIV['__proto__'];
        F.ElementExtensions = true;
    }

    function checkElementPrototypeDeficiency(tagName) {
        if (typeof window.Element === 'undefined') return false;
        var proto = window.Element.prototype;
        if (proto) {
            var id = '_' + (Math.random() + '').slice(2),
                el = document.createElement(tagName);
            proto[id] = 'x';
            var isBuggy = (el[id] !== 'x');
            delete proto[id];
            el = null;
            return isBuggy;
        }

        return false;
    }

    var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
        checkElementPrototypeDeficiency('object');

    function extendElementWith(element, methods) {
        for (var property in methods) {
            var value = methods[property];
            if (Object.isFunction(value) && !(property in element))
                element[property] = value.methodize();
        }
    }

    var EXTENDED = {};
    function elementIsExtended(element) {
        var uid = getUniqueElementID(element);
        return (uid in EXTENDED);
    }

    function extend(element) {
        if (!element || elementIsExtended(element)) return element;
        if (element.nodeType !== Node.ELEMENT_NODE || element == window)
            return element;

        var methods = Object.clone(Methods),
            tagName = element.tagName.toUpperCase();

        if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

        extendElementWith(element, methods);
        EXTENDED[getUniqueElementID(element)] = true;
        return element;
    }

    function extend_IE8(element) {
        if (!element || elementIsExtended(element)) return element;

        var t = element.tagName;
        if (t && (/^(?:object|applet|embed)$/i.test(t))) {
            extendElementWith(element, Element.Methods);
            extendElementWith(element, Element.Methods.Simulated);
            extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
        }

        return element;
    }

    if (F.SpecificElementExtensions) {
        extend = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? extend_IE8 : Prototype.K;
    }

    function addMethodsToTagName(tagName, methods) {
        tagName = tagName.toUpperCase();
        if (!ByTag[tagName]) ByTag[tagName] = {};
        Object.extend(ByTag[tagName], methods);
    }

    function mergeMethods(destination, methods, onlyIfAbsent) {
        if (Object.isUndefined(onlyIfAbsent)) onlyIfAbsent = false;
        for (var property in methods) {
            var value = methods[property];
            if (!Object.isFunction(value)) continue;
            if (!onlyIfAbsent || !(property in destination))
                destination[property] = value.methodize();
        }
    }

    function findDOMClass(tagName) {
        var klass;
        var trans = {
            "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
            "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
            "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
            "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
            "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
                "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
                "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
                "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
                "FrameSet", "IFRAME": "IFrame"
        };
        if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
        if (window[klass]) return window[klass];
        klass = 'HTML' + tagName + 'Element';
        if (window[klass]) return window[klass];
        klass = 'HTML' + tagName.capitalize() + 'Element';
        if (window[klass]) return window[klass];

        var element = document.createElement(tagName),
            proto = element['__proto__'] || element.constructor.prototype;

        element = null;
        return proto;
    }

    function addMethods(methods) {
        if (arguments.length === 0) addFormMethods();

        if (arguments.length === 2) {
            var tagName = methods;
            methods = arguments[1];
        }

        if (!tagName) {
            Object.extend(Element.Methods, methods || {});
        } else {
            if (Object.isArray(tagName)) {
                for (var i = 0, tag; tag = tagName[i]; i++)
                    addMethodsToTagName(tag, methods);
            } else {
                addMethodsToTagName(tagName, methods);
            }
        }

        var ELEMENT_PROTOTYPE = window.HTMLElement ? HTMLElement.prototype :
            Element.prototype;

        if (F.ElementExtensions) {
            mergeMethods(ELEMENT_PROTOTYPE, Element.Methods);
            mergeMethods(ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
        }

        if (F.SpecificElementExtensions) {
            for (var tag in Element.Methods.ByTag) {
                var klass = findDOMClass(tag);
                if (Object.isUndefined(klass)) continue;
                mergeMethods(klass.prototype, ByTag[tag]);
            }
        }

        Object.extend(Element, Element.Methods);
        Object.extend(Element, Element.Methods.Simulated);
        delete Element.ByTag;
        delete Element.Simulated;

        Element.extend.refresh();

        ELEMENT_CACHE = {};
    }

    Object.extend(GLOBAL.Element, {
        extend:     extend,
        addMethods: addMethods
    });

    if (extend === Prototype.K) {
        GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
    } else {
        GLOBAL.Element.extend.refresh = function() {
            if (Prototype.BrowserFeatures.ElementExtensions) return;
            Object.extend(Methods, Element.Methods);
            Object.extend(Methods, Element.Methods.Simulated);

            EXTENDED = {};
        };
    }

    function addFormMethods() {
        Object.extend(Form, Form.Methods);
        Object.extend(Form.Element, Form.Element.Methods);
        Object.extend(Element.Methods.ByTag, {
            "FORM":     Object.clone(Form.Methods),
            "INPUT":    Object.clone(Form.Element.Methods),
            "SELECT":   Object.clone(Form.Element.Methods),
            "TEXTAREA": Object.clone(Form.Element.Methods),
            "BUTTON":   Object.clone(Form.Element.Methods)
        });
    }

    Element.addMethods(methods);

})(this);
(function() {

    function toDecimal(pctString) {
        var match = pctString.match(/^(\d+)%?$/i);
        if (!match) return null;
        return (Number(match[1]) / 100);
    }

    function getRawStyle(element, style) {
        element = $(element);

        var value = element.style[style];
        if (!value || value === 'auto') {
            var css = document.defaultView.getComputedStyle(element, null);
            value = css ? css[style] : null;
        }

        if (style === 'opacity') return value ? parseFloat(value) : 1.0;
        return value === 'auto' ? null : value;
    }

    function getRawStyle_IE(element, style) {
        var value = element.style[style];
        if (!value && element.currentStyle) {
            value = element.currentStyle[style];
        }
        return value;
    }

    function getContentWidth(element, context) {
        var boxWidth = element.offsetWidth;

        var bl = getPixelValue(element, 'borderLeftWidth',  context) || 0;
        var br = getPixelValue(element, 'borderRightWidth', context) || 0;
        var pl = getPixelValue(element, 'paddingLeft',      context) || 0;
        var pr = getPixelValue(element, 'paddingRight',     context) || 0;

        return boxWidth - bl - br - pl - pr;
    }

    if ('currentStyle' in document.documentElement) {
        getRawStyle = getRawStyle_IE;
    }


    function getPixelValue(value, property, context) {
        var element = null;
        if (Object.isElement(value)) {
            element = value;
            value = getRawStyle(element, property);
        }

        if (value === null || Object.isUndefined(value)) {
            return null;
        }

        if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
            return window.parseFloat(value);
        }

        var isPercentage = value.include('%'), isViewport = (context === document.viewport);

        if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
            var style = element.style.left, rStyle = element.runtimeStyle.left;
            element.runtimeStyle.left = element.currentStyle.left;
            element.style.left = value || 0;
            value = element.style.pixelLeft;
            element.style.left = style;
            element.runtimeStyle.left = rStyle;

            return value;
        }

        if (element && isPercentage) {
            context = context || element.parentNode;
            var decimal = toDecimal(value), whole = null;

            var isHorizontal = property.include('left') || property.include('right') ||
                property.include('width');

            var isVertical   = property.include('top') || property.include('bottom') ||
                property.include('height');

            if (context === document.viewport) {
                if (isHorizontal) {
                    whole = document.viewport.getWidth();
                } else if (isVertical) {
                    whole = document.viewport.getHeight();
                }
            } else {
                if (isHorizontal) {
                    whole = $(context).measure('width');
                } else if (isVertical) {
                    whole = $(context).measure('height');
                }
            }

            return (whole === null) ? 0 : whole * decimal;
        }

        return 0;
    }

    function toCSSPixels(number) {
        if (Object.isString(number) && number.endsWith('px'))
            return number;
        return number + 'px';
    }

    function isDisplayed(element) {
        while (element && element.parentNode) {
            var display = element.getStyle('display');
            if (display === 'none') {
                return false;
            }
            element = $(element.parentNode);
        }
        return true;
    }

    var hasLayout = Prototype.K;
    if ('currentStyle' in document.documentElement) {
        hasLayout = function(element) {
            if (!element.currentStyle.hasLayout) {
                element.style.zoom = 1;
            }
            return element;
        };
    }

    function cssNameFor(key) {
        if (key.include('border')) key = key + '-width';
        return key.camelize();
    }

    Element.Layout = Class.create(Hash, {
        initialize: function($super, element, preCompute) {
            $super();
            this.element = $(element);

            Element.Layout.PROPERTIES.each( function(property) {
                this._set(property, null);
            }, this);

            if (preCompute) {
                this._preComputing = true;
                this._begin();
                Element.Layout.PROPERTIES.each( this._compute, this );
                this._end();
                this._preComputing = false;
            }
        },

        _set: function(property, value) {
            return Hash.prototype.set.call(this, property, value);
        },

        set: function(property, value) {
            throw "Properties of Element.Layout are read-only.";
        },

        get: function($super, property) {
            var value = $super(property);
            return value === null ? this._compute(property) : value;
        },

        _begin: function() {
            if (this._isPrepared()) return;

            var element = this.element;
            if (isDisplayed(element)) {
                this._setPrepared(true);
                return;
            }


            var originalStyles = {
                position:   element.style.position   || '',
                width:      element.style.width      || '',
                visibility: element.style.visibility || '',
                display:    element.style.display    || ''
            };

            element.store('prototype_original_styles', originalStyles);

            var position = getRawStyle(element, 'position'), width = element.offsetWidth;

            if (width === 0 || width === null) {
                element.style.display = 'block';
                width = element.offsetWidth;
            }

            var context = (position === 'fixed') ? document.viewport :
                element.parentNode;

            var tempStyles = {
                visibility: 'hidden',
                display:    'block'
            };

            if (position !== 'fixed') tempStyles.position = 'absolute';

            element.setStyle(tempStyles);

            var positionedWidth = element.offsetWidth, newWidth;
            if (width && (positionedWidth === width)) {
                newWidth = getContentWidth(element, context);
            } else if (position === 'absolute' || position === 'fixed') {
                newWidth = getContentWidth(element, context);
            } else {
                var parent = element.parentNode, pLayout = $(parent).getLayout();

                newWidth = pLayout.get('width') -
                    this.get('margin-left') -
                    this.get('border-left') -
                    this.get('padding-left') -
                    this.get('padding-right') -
                    this.get('border-right') -
                    this.get('margin-right');
            }

            element.setStyle({ width: newWidth + 'px' });

            this._setPrepared(true);
        },

        _end: function() {
            var element = this.element;
            var originalStyles = element.retrieve('prototype_original_styles');
            element.store('prototype_original_styles', null);
            element.setStyle(originalStyles);
            this._setPrepared(false);
        },

        _compute: function(property) {
            var COMPUTATIONS = Element.Layout.COMPUTATIONS;
            if (!(property in COMPUTATIONS)) {
                throw "Property not found.";
            }

            return this._set(property, COMPUTATIONS[property].call(this, this.element));
        },

        _isPrepared: function() {
            return this.element.retrieve('prototype_element_layout_prepared', false);
        },

        _setPrepared: function(bool) {
            return this.element.store('prototype_element_layout_prepared', bool);
        },

        toObject: function() {
            var args = $A(arguments);
            var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
                args.join(' ').split(' ');
            var obj = {};
            keys.each( function(key) {
                if (!Element.Layout.PROPERTIES.include(key)) return;
                var value = this.get(key);
                if (value != null) obj[key] = value;
            }, this);
            return obj;
        },

        toHash: function() {
            var obj = this.toObject.apply(this, arguments);
            return new Hash(obj);
        },

        toCSS: function() {
            var args = $A(arguments);
            var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
                args.join(' ').split(' ');
            var css = {};

            keys.each( function(key) {
                if (!Element.Layout.PROPERTIES.include(key)) return;
                if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

                var value = this.get(key);
                if (value != null) css[cssNameFor(key)] = value + 'px';
            }, this);
            return css;
        },

        inspect: function() {
            return "#<Element.Layout>";
        }
    });

    Object.extend(Element.Layout, {
        PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

        COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

        COMPUTATIONS: {
            'height': function(element) {
                if (!this._preComputing) this._begin();

                var bHeight = this.get('border-box-height');
                if (bHeight <= 0) {
                    if (!this._preComputing) this._end();
                    return 0;
                }

                var bTop = this.get('border-top'),
                    bBottom = this.get('border-bottom');

                var pTop = this.get('padding-top'),
                    pBottom = this.get('padding-bottom');

                if (!this._preComputing) this._end();

                return bHeight - bTop - bBottom - pTop - pBottom;
            },

            'width': function(element) {
                if (!this._preComputing) this._begin();

                var bWidth = this.get('border-box-width');
                if (bWidth <= 0) {
                    if (!this._preComputing) this._end();
                    return 0;
                }

                var bLeft = this.get('border-left'),
                    bRight = this.get('border-right');

                var pLeft = this.get('padding-left'),
                    pRight = this.get('padding-right');

                if (!this._preComputing) this._end();
                return bWidth - bLeft - bRight - pLeft - pRight;
            },

            'padding-box-height': function(element) {
                var height = this.get('height'),
                    pTop = this.get('padding-top'),
                    pBottom = this.get('padding-bottom');

                return height + pTop + pBottom;
            },

            'padding-box-width': function(element) {
                var width = this.get('width'),
                    pLeft = this.get('padding-left'),
                    pRight = this.get('padding-right');

                return width + pLeft + pRight;
            },

            'border-box-height': function(element) {
                if (!this._preComputing) this._begin();
                var height = element.offsetHeight;
                if (!this._preComputing) this._end();
                return height;
            },

            'border-box-width': function(element) {
                if (!this._preComputing) this._begin();
                var width = element.offsetWidth;
                if (!this._preComputing) this._end();
                return width;
            },

            'margin-box-height': function(element) {
                var bHeight = this.get('border-box-height'),
                    mTop = this.get('margin-top'),
                    mBottom = this.get('margin-bottom');

                if (bHeight <= 0) return 0;

                return bHeight + mTop + mBottom;
            },

            'margin-box-width': function(element) {
                var bWidth = this.get('border-box-width'),
                    mLeft = this.get('margin-left'),
                    mRight = this.get('margin-right');

                if (bWidth <= 0) return 0;

                return bWidth + mLeft + mRight;
            },

            'top': function(element) {
                var offset = element.positionedOffset();
                return offset.top;
            },

            'bottom': function(element) {
                var offset = element.positionedOffset(),
                    parent = element.getOffsetParent(),
                    pHeight = parent.measure('height');

                var mHeight = this.get('border-box-height');

                return pHeight - mHeight - offset.top;
            },

            'left': function(element) {
                var offset = element.positionedOffset();
                return offset.left;
            },

            'right': function(element) {
                var offset = element.positionedOffset(),
                    parent = element.getOffsetParent(),
                    pWidth = parent.measure('width');

                var mWidth = this.get('border-box-width');

                return pWidth - mWidth - offset.left;
            },

            'padding-top': function(element) {
                return getPixelValue(element, 'paddingTop');
            },

            'padding-bottom': function(element) {
                return getPixelValue(element, 'paddingBottom');
            },

            'padding-left': function(element) {
                return getPixelValue(element, 'paddingLeft');
            },

            'padding-right': function(element) {
                return getPixelValue(element, 'paddingRight');
            },

            'border-top': function(element) {
                return getPixelValue(element, 'borderTopWidth');
            },

            'border-bottom': function(element) {
                return getPixelValue(element, 'borderBottomWidth');
            },

            'border-left': function(element) {
                return getPixelValue(element, 'borderLeftWidth');
            },

            'border-right': function(element) {
                return getPixelValue(element, 'borderRightWidth');
            },

            'margin-top': function(element) {
                return getPixelValue(element, 'marginTop');
            },

            'margin-bottom': function(element) {
                return getPixelValue(element, 'marginBottom');
            },

            'margin-left': function(element) {
                return getPixelValue(element, 'marginLeft');
            },

            'margin-right': function(element) {
                return getPixelValue(element, 'marginRight');
            }
        }
    });

    if ('getBoundingClientRect' in document.documentElement) {
        Object.extend(Element.Layout.COMPUTATIONS, {
            'right': function(element) {
                var parent = hasLayout(element.getOffsetParent());
                var rect = element.getBoundingClientRect(),
                    pRect = parent.getBoundingClientRect();

                return (pRect.right - rect.right).round();
            },

            'bottom': function(element) {
                var parent = hasLayout(element.getOffsetParent());
                var rect = element.getBoundingClientRect(),
                    pRect = parent.getBoundingClientRect();

                return (pRect.bottom - rect.bottom).round();
            }
        });
    }

    Element.Offset = Class.create({
        initialize: function(left, top) {
            this.left = left.round();
            this.top  = top.round();

            this[0] = this.left;
            this[1] = this.top;
        },

        relativeTo: function(offset) {
            return new Element.Offset(
                this.left - offset.left,
                this.top  - offset.top
            );
        },

        inspect: function() {
            return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
        },

        toString: function() {
            return "[#{left}, #{top}]".interpolate(this);
        },

        toArray: function() {
            return [this.left, this.top];
        }
    });

    function getLayout(element, preCompute) {
        return new Element.Layout(element, preCompute);
    }

    function measure(element, property) {
        return $(element).getLayout().get(property);
    }

    function getHeight(element) {
        return Element.getDimensions(element).height;
    }

    function getWidth(element) {
        return Element.getDimensions(element).width;
    }

    function getDimensions(element) {
        element = $(element);
        var display = Element.getStyle(element, 'display');

        if (display && display !== 'none') {
            return { width: element.offsetWidth, height: element.offsetHeight };
        }

        var style = element.style;
        var originalStyles = {
            visibility: style.visibility,
            position:   style.position,
            display:    style.display
        };

        var newStyles = {
            visibility: 'hidden',
            display:    'block'
        };

        if (originalStyles.position !== 'fixed')
            newStyles.position = 'absolute';

        Element.setStyle(element, newStyles);

        var dimensions = {
            width:  element.offsetWidth,
            height: element.offsetHeight
        };

        Element.setStyle(element, originalStyles);

        return dimensions;
    }

    function getOffsetParent(element) {
        element = $(element);

        if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
            return $(document.body);

        var isInline = (Element.getStyle(element, 'display') === 'inline');
        if (!isInline && element.offsetParent) return $(element.offsetParent);

        while ((element = element.parentNode) && element !== document.body) {
            if (Element.getStyle(element, 'position') !== 'static') {
                return isHtml(element) ? $(document.body) : $(element);
            }
        }

        return $(document.body);
    }


    function cumulativeOffset(element) {
        element = $(element);
        var valueT = 0, valueL = 0;
        if (element.parentNode) {
            do {
                valueT += element.offsetTop  || 0;
                valueL += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
        }
        return new Element.Offset(valueL, valueT);
    }

    function positionedOffset(element) {
        element = $(element);

        var layout = element.getLayout();

        var valueT = 0, valueL = 0;
        do {
            valueT += element.offsetTop  || 0;
            valueL += element.offsetLeft || 0;
            element = element.offsetParent;
            if (element) {
                if (isBody(element)) break;
                var p = Element.getStyle(element, 'position');
                if (p !== 'static') break;
            }
        } while (element);

        valueL -= layout.get('margin-top');
        valueT -= layout.get('margin-left');

        return new Element.Offset(valueL, valueT);
    }

    function cumulativeScrollOffset(element) {
        var valueT = 0, valueL = 0;
        do {
            valueT += element.scrollTop  || 0;
            valueL += element.scrollLeft || 0;
            element = element.parentNode;
        } while (element);
        return new Element.Offset(valueL, valueT);
    }

    function viewportOffset(forElement) {
        var valueT = 0, valueL = 0, docBody = document.body;

        var element = $(forElement);
        do {
            valueT += element.offsetTop  || 0;
            valueL += element.offsetLeft || 0;
            if (element.offsetParent == docBody &&
                Element.getStyle(element, 'position') == 'absolute') break;
        } while (element = element.offsetParent);

        element = forElement;
        do {
            if (element != docBody) {
                valueT -= element.scrollTop  || 0;
                valueL -= element.scrollLeft || 0;
            }
        } while (element = element.parentNode);
        return new Element.Offset(valueL, valueT);
    }

    function absolutize(element) {
        element = $(element);

        if (Element.getStyle(element, 'position') === 'absolute') {
            return element;
        }

        var offsetParent = getOffsetParent(element);
        var eOffset = element.viewportOffset(),
            pOffset = offsetParent.viewportOffset();

        var offset = eOffset.relativeTo(pOffset);
        var layout = element.getLayout();

        element.store('prototype_absolutize_original_styles', {
            left:   element.getStyle('left'),
            top:    element.getStyle('top'),
            width:  element.getStyle('width'),
            height: element.getStyle('height')
        });

        element.setStyle({
            position: 'absolute',
            top:    offset.top + 'px',
            left:   offset.left + 'px',
            width:  layout.get('width') + 'px',
            height: layout.get('height') + 'px'
        });

        return element;
    }

    function relativize(element) {
        element = $(element);
        if (Element.getStyle(element, 'position') === 'relative') {
            return element;
        }

        var originalStyles =
            element.retrieve('prototype_absolutize_original_styles');

        if (originalStyles) element.setStyle(originalStyles);
        return element;
    }


    function scrollTo(element) {
        element = $(element);
        var pos = Element.cumulativeOffset(element);
        window.scrollTo(pos.left, pos.top);
        return element;
    }


    function makePositioned(element) {
        element = $(element);
        var position = Element.getStyle(element, 'position'), styles = {};
        if (position === 'static' || !position) {
            styles.position = 'relative';
            if (Prototype.Browser.Opera) {
                styles.top  = 0;
                styles.left = 0;
            }
            Element.setStyle(element, styles);
            Element.store(element, 'prototype_made_positioned', true);
        }
        return element;
    }

    function undoPositioned(element) {
        element = $(element);
        var storage = Element.getStorage(element),
            madePositioned = storage.get('prototype_made_positioned');

        if (madePositioned) {
            storage.unset('prototype_made_positioned');
            Element.setStyle(element, {
                position: '',
                top:      '',
                bottom:   '',
                left:     '',
                right:    ''
            });
        }
        return element;
    }

    function makeClipping(element) {
        element = $(element);

        var storage = Element.getStorage(element),
            madeClipping = storage.get('prototype_made_clipping');

        if (Object.isUndefined(madeClipping)) {
            var overflow = Element.getStyle(element, 'overflow');
            storage.set('prototype_made_clipping', overflow);
            if (overflow !== 'hidden')
                element.style.overflow = 'hidden';
        }

        return element;
    }

    function undoClipping(element) {
        element = $(element);
        var storage = Element.getStorage(element),
            overflow = storage.get('prototype_made_clipping');

        if (!Object.isUndefined(overflow)) {
            storage.unset('prototype_made_clipping');
            element.style.overflow = overflow || '';
        }

        return element;
    }

    function clonePosition(element, source, options) {
        options = Object.extend({
            setLeft:    true,
            setTop:     true,
            setWidth:   true,
            setHeight:  true,
            offsetTop:  0,
            offsetLeft: 0
        }, options || {});

        source  = $(source);
        element = $(element);
        var p, delta, layout, styles = {};

        if (options.setLeft || options.setTop) {
            p = Element.viewportOffset(source);
            delta = [0, 0];
            if (Element.getStyle(element, 'position') === 'absolute') {
                var parent = Element.getOffsetParent(element);
                if (parent !== document.body) delta = Element.viewportOffset(parent);
            }
        }

        if (options.setWidth || options.setHeight) {
            layout = Element.getLayout(source);
        }

        if (options.setLeft)
            styles.left = (p[0] - delta[0] + options.offsetLeft) + 'px';
        if (options.setTop)
            styles.top  = (p[1] - delta[1] + options.offsetTop)  + 'px';

        if (options.setWidth)
            styles.width  = layout.get('border-box-width')  + 'px';
        if (options.setHeight)
            styles.height = layout.get('border-box-height') + 'px';

        return Element.setStyle(element, styles);
    }


    if (Prototype.Browser.IE) {
        getOffsetParent = getOffsetParent.wrap(
            function(proceed, element) {
                element = $(element);

                if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
                    return $(document.body);

                var position = element.getStyle('position');
                if (position !== 'static') return proceed(element);

                element.setStyle({ position: 'relative' });
                var value = proceed(element);
                element.setStyle({ position: position });
                return value;
            }
        );

        positionedOffset = positionedOffset.wrap(function(proceed, element) {
            element = $(element);
            if (!element.parentNode) return new Element.Offset(0, 0);
            var position = element.getStyle('position');
            if (position !== 'static') return proceed(element);

            var offsetParent = element.getOffsetParent();
            if (offsetParent && offsetParent.getStyle('position') === 'fixed')
                hasLayout(offsetParent);

            element.setStyle({ position: 'relative' });
            var value = proceed(element);
            element.setStyle({ position: position });
            return value;
        });
    } else if (Prototype.Browser.Webkit) {
        cumulativeOffset = function(element) {
            element = $(element);
            var valueT = 0, valueL = 0;
            do {
                valueT += element.offsetTop  || 0;
                valueL += element.offsetLeft || 0;
                if (element.offsetParent == document.body) {
                    if (Element.getStyle(element, 'position') == 'absolute') break;
                }

                element = element.offsetParent;
            } while (element);

            return new Element.Offset(valueL, valueT);
        };
    }


    Element.addMethods({
        getLayout:              getLayout,
        measure:                measure,
        getWidth:               getWidth,
        getHeight:              getHeight,
        getDimensions:          getDimensions,
        getOffsetParent:        getOffsetParent,
        cumulativeOffset:       cumulativeOffset,
        positionedOffset:       positionedOffset,
        cumulativeScrollOffset: cumulativeScrollOffset,
        viewportOffset:         viewportOffset,
        absolutize:             absolutize,
        relativize:             relativize,
        scrollTo:               scrollTo,
        makePositioned:         makePositioned,
        undoPositioned:         undoPositioned,
        makeClipping:           makeClipping,
        undoClipping:           undoClipping,
        clonePosition:          clonePosition
    });

    function isBody(element) {
        return element.nodeName.toUpperCase() === 'BODY';
    }

    function isHtml(element) {
        return element.nodeName.toUpperCase() === 'HTML';
    }

    function isDocument(element) {
        return element.nodeType === Node.DOCUMENT_NODE;
    }

    function isDetached(element) {
        return element !== document.body &&
            !Element.descendantOf(element, document.body);
    }

    if ('getBoundingClientRect' in document.documentElement) {
        Element.addMethods({
            viewportOffset: function(element) {
                element = $(element);
                if (isDetached(element)) return new Element.Offset(0, 0);

                var rect = element.getBoundingClientRect(),
                    docEl = document.documentElement;
                return new Element.Offset(rect.left - docEl.clientLeft,
                    rect.top - docEl.clientTop);
            }
        });
    }


})();

(function() {

    var IS_OLD_OPERA = Prototype.Browser.Opera &&
        (window.parseFloat(window.opera.version()) < 9.5);
    var ROOT = null;
    function getRootElement() {
        if (ROOT) return ROOT;
        ROOT = IS_OLD_OPERA ? document.body : document.documentElement;
        return ROOT;
    }

    function getDimensions() {
        return { width: this.getWidth(), height: this.getHeight() };
    }

    function getWidth() {
        return getRootElement().clientWidth;
    }

    function getHeight() {
        return getRootElement().clientHeight;
    }

    function getScrollOffsets() {
        var x = window.pageXOffset || document.documentElement.scrollLeft ||
            document.body.scrollLeft;
        var y = window.pageYOffset || document.documentElement.scrollTop ||
            document.body.scrollTop;

        return new Element.Offset(x, y);
    }

    document.viewport = {
        getDimensions:    getDimensions,
        getWidth:         getWidth,
        getHeight:        getHeight,
        getScrollOffsets: getScrollOffsets
    };

})();
window.$$ = function() {
    var expression = $A(arguments).join(', ');
    return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (function() {

    function select() {
        throw new Error('Method "Prototype.Selector.select" must be defined.');
    }

    function match() {
        throw new Error('Method "Prototype.Selector.match" must be defined.');
    }

    function find(elements, expression, index) {
        index = index || 0;
        var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

        for (i = 0; i < length; i++) {
            if (match(elements[i], expression) && index == matchIndex++) {
                return Element.extend(elements[i]);
            }
        }
    }

    function extendElements(elements) {
        for (var i = 0, length = elements.length; i < length; i++) {
            Element.extend(elements[i]);
        }
        return elements;
    }


    var K = Prototype.K;

    return {
        select: select,
        match: match,
        find: find,
        extendElements: (Element.extend === K) ? K : extendElements,
        extendElement: Element.extend
    };
})();
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

    var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        done = 0,
        toString = Object.prototype.toString,
        hasDuplicate = false,
        baseHasDuplicate = true,
        rBackslash = /\\/g,
        rNonWord = /\W/;

    [0, 0].sort(function() {
        baseHasDuplicate = false;
        return 0;
    });

    var Sizzle = function( selector, context, results, seed ) {
        results = results || [];
        context = context || document;

        var origContext = context;

        if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
            return [];
        }

        if ( !selector || typeof selector !== "string" ) {
            return results;
        }

        var m, set, checkSet, extra, ret, cur, pop, i,
            prune = true,
            contextXML = Sizzle.isXML( context ),
            parts = [],
            soFar = selector;

        do {
            chunker.exec( "" );
            m = chunker.exec( soFar );

            if ( m ) {
                soFar = m[3];

                parts.push( m[1] );

                if ( m[2] ) {
                    extra = m[3];
                    break;
                }
            }
        } while ( m );

        if ( parts.length > 1 && origPOS.exec( selector ) ) {

            if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
                set = posProcess( parts[0] + parts[1], context );

            } else {
                set = Expr.relative[ parts[0] ] ?
                    [ context ] :
                    Sizzle( parts.shift(), context );

                while ( parts.length ) {
                    selector = parts.shift();

                    if ( Expr.relative[ selector ] ) {
                        selector += parts.shift();
                    }

                    set = posProcess( selector, set );
                }
            }

        } else {
            if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
                Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

                ret = Sizzle.find( parts.shift(), context, contextXML );
                context = ret.expr ?
                    Sizzle.filter( ret.expr, ret.set )[0] :
                    ret.set[0];
            }

            if ( context ) {
                ret = seed ?
                { expr: parts.pop(), set: makeArray(seed) } :
                    Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

                set = ret.expr ?
                    Sizzle.filter( ret.expr, ret.set ) :
                    ret.set;

                if ( parts.length > 0 ) {
                    checkSet = makeArray( set );

                } else {
                    prune = false;
                }

                while ( parts.length ) {
                    cur = parts.pop();
                    pop = cur;

                    if ( !Expr.relative[ cur ] ) {
                        cur = "";
                    } else {
                        pop = parts.pop();
                    }

                    if ( pop == null ) {
                        pop = context;
                    }

                    Expr.relative[ cur ]( checkSet, pop, contextXML );
                }

            } else {
                checkSet = parts = [];
            }
        }

        if ( !checkSet ) {
            checkSet = set;
        }

        if ( !checkSet ) {
            Sizzle.error( cur || selector );
        }

        if ( toString.call(checkSet) === "[object Array]" ) {
            if ( !prune ) {
                results.push.apply( results, checkSet );

            } else if ( context && context.nodeType === 1 ) {
                for ( i = 0; checkSet[i] != null; i++ ) {
                    if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
                        results.push( set[i] );
                    }
                }

            } else {
                for ( i = 0; checkSet[i] != null; i++ ) {
                    if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
                        results.push( set[i] );
                    }
                }
            }

        } else {
            makeArray( checkSet, results );
        }

        if ( extra ) {
            Sizzle( extra, origContext, results, seed );
            Sizzle.uniqueSort( results );
        }

        return results;
    };

    Sizzle.uniqueSort = function( results ) {
        if ( sortOrder ) {
            hasDuplicate = baseHasDuplicate;
            results.sort( sortOrder );

            if ( hasDuplicate ) {
                for ( var i = 1; i < results.length; i++ ) {
                    if ( results[i] === results[ i - 1 ] ) {
                        results.splice( i--, 1 );
                    }
                }
            }
        }

        return results;
    };

    Sizzle.matches = function( expr, set ) {
        return Sizzle( expr, null, null, set );
    };

    Sizzle.matchesSelector = function( node, expr ) {
        return Sizzle( expr, null, null, [node] ).length > 0;
    };

    Sizzle.find = function( expr, context, isXML ) {
        var set;

        if ( !expr ) {
            return [];
        }

        for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
            var match,
                type = Expr.order[i];

            if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
                var left = match[1];
                match.splice( 1, 1 );

                if ( left.substr( left.length - 1 ) !== "\\" ) {
                    match[1] = (match[1] || "").replace( rBackslash, "" );
                    set = Expr.find[ type ]( match, context, isXML );

                    if ( set != null ) {
                        expr = expr.replace( Expr.match[ type ], "" );
                        break;
                    }
                }
            }
        }

        if ( !set ) {
            set = typeof context.getElementsByTagName !== "undefined" ?
                context.getElementsByTagName( "*" ) :
                [];
        }

        return { set: set, expr: expr };
    };

    Sizzle.filter = function( expr, set, inplace, not ) {
        var match, anyFound,
            old = expr,
            result = [],
            curLoop = set,
            isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

        while ( expr && set.length ) {
            for ( var type in Expr.filter ) {
                if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
                    var found, item,
                        filter = Expr.filter[ type ],
                        left = match[1];

                    anyFound = false;

                    match.splice(1,1);

                    if ( left.substr( left.length - 1 ) === "\\" ) {
                        continue;
                    }

                    if ( curLoop === result ) {
                        result = [];
                    }

                    if ( Expr.preFilter[ type ] ) {
                        match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

                        if ( !match ) {
                            anyFound = found = true;

                        } else if ( match === true ) {
                            continue;
                        }
                    }

                    if ( match ) {
                        for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
                            if ( item ) {
                                found = filter( item, match, i, curLoop );
                                var pass = not ^ !!found;

                                if ( inplace && found != null ) {
                                    if ( pass ) {
                                        anyFound = true;

                                    } else {
                                        curLoop[i] = false;
                                    }

                                } else if ( pass ) {
                                    result.push( item );
                                    anyFound = true;
                                }
                            }
                        }
                    }

                    if ( found !== undefined ) {
                        if ( !inplace ) {
                            curLoop = result;
                        }

                        expr = expr.replace( Expr.match[ type ], "" );

                        if ( !anyFound ) {
                            return [];
                        }

                        break;
                    }
                }
            }

            if ( expr === old ) {
                if ( anyFound == null ) {
                    Sizzle.error( expr );

                } else {
                    break;
                }
            }

            old = expr;
        }

        return curLoop;
    };

    Sizzle.error = function( msg ) {
        throw "Syntax error, unrecognized expression: " + msg;
    };

    var Expr = Sizzle.selectors = {
        order: [ "ID", "NAME", "TAG" ],

        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },

        leftMatch: {},

        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },

        attrHandle: {
            href: function( elem ) {
                return elem.getAttribute( "href" );
            },
            type: function( elem ) {
                return elem.getAttribute( "type" );
            }
        },

        relative: {
            "+": function(checkSet, part){
                var isPartStr = typeof part === "string",
                    isTag = isPartStr && !rNonWord.test( part ),
                    isPartStrNotTag = isPartStr && !isTag;

                if ( isTag ) {
                    part = part.toLowerCase();
                }

                for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
                    if ( (elem = checkSet[i]) ) {
                        while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

                        checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
                            elem || false :
                            elem === part;
                    }
                }

                if ( isPartStrNotTag ) {
                    Sizzle.filter( part, checkSet, true );
                }
            },

            ">": function( checkSet, part ) {
                var elem,
                    isPartStr = typeof part === "string",
                    i = 0,
                    l = checkSet.length;

                if ( isPartStr && !rNonWord.test( part ) ) {
                    part = part.toLowerCase();

                    for ( ; i < l; i++ ) {
                        elem = checkSet[i];

                        if ( elem ) {
                            var parent = elem.parentNode;
                            checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                        }
                    }

                } else {
                    for ( ; i < l; i++ ) {
                        elem = checkSet[i];

                        if ( elem ) {
                            checkSet[i] = isPartStr ?
                                elem.parentNode :
                                elem.parentNode === part;
                        }
                    }

                    if ( isPartStr ) {
                        Sizzle.filter( part, checkSet, true );
                    }
                }
            },

            "": function(checkSet, part, isXML){
                var nodeCheck,
                    doneName = done++,
                    checkFn = dirCheck;

                if ( typeof part === "string" && !rNonWord.test( part ) ) {
                    part = part.toLowerCase();
                    nodeCheck = part;
                    checkFn = dirNodeCheck;
                }

                checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
            },

            "~": function( checkSet, part, isXML ) {
                var nodeCheck,
                    doneName = done++,
                    checkFn = dirCheck;

                if ( typeof part === "string" && !rNonWord.test( part ) ) {
                    part = part.toLowerCase();
                    nodeCheck = part;
                    checkFn = dirNodeCheck;
                }

                checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
            }
        },

        find: {
            ID: function( match, context, isXML ) {
                if ( typeof context.getElementById !== "undefined" && !isXML ) {
                    var m = context.getElementById(match[1]);
                    return m && m.parentNode ? [m] : [];
                }
            },

            NAME: function( match, context ) {
                if ( typeof context.getElementsByName !== "undefined" ) {
                    var ret = [],
                        results = context.getElementsByName( match[1] );

                    for ( var i = 0, l = results.length; i < l; i++ ) {
                        if ( results[i].getAttribute("name") === match[1] ) {
                            ret.push( results[i] );
                        }
                    }

                    return ret.length === 0 ? null : ret;
                }
            },

            TAG: function( match, context ) {
                if ( typeof context.getElementsByTagName !== "undefined" ) {
                    return context.getElementsByTagName( match[1] );
                }
            }
        },
        preFilter: {
            CLASS: function( match, curLoop, inplace, result, not, isXML ) {
                match = " " + match[1].replace( rBackslash, "" ) + " ";

                if ( isXML ) {
                    return match;
                }

                for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
                    if ( elem ) {
                        if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
                            if ( !inplace ) {
                                result.push( elem );
                            }

                        } else if ( inplace ) {
                            curLoop[i] = false;
                        }
                    }
                }

                return false;
            },

            ID: function( match ) {
                return match[1].replace( rBackslash, "" );
            },

            TAG: function( match, curLoop ) {
                return match[1].replace( rBackslash, "" ).toLowerCase();
            },

            CHILD: function( match ) {
                if ( match[1] === "nth" ) {
                    if ( !match[2] ) {
                        Sizzle.error( match[0] );
                    }

                    match[2] = match[2].replace(/^\+|\s*/g, '');

                    var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
                        match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
                            !/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

                    match[2] = (test[1] + (test[2] || 1)) - 0;
                    match[3] = test[3] - 0;
                }
                else if ( match[2] ) {
                    Sizzle.error( match[0] );
                }

                match[0] = done++;

                return match;
            },

            ATTR: function( match, curLoop, inplace, result, not, isXML ) {
                var name = match[1] = match[1].replace( rBackslash, "" );

                if ( !isXML && Expr.attrMap[name] ) {
                    match[1] = Expr.attrMap[name];
                }

                match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

                if ( match[2] === "~=" ) {
                    match[4] = " " + match[4] + " ";
                }

                return match;
            },

            PSEUDO: function( match, curLoop, inplace, result, not ) {
                if ( match[1] === "not" ) {
                    if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
                        match[3] = Sizzle(match[3], null, null, curLoop);

                    } else {
                        var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

                        if ( !inplace ) {
                            result.push.apply( result, ret );
                        }

                        return false;
                    }

                } else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
                    return true;
                }

                return match;
            },

            POS: function( match ) {
                match.unshift( true );

                return match;
            }
        },

        filters: {
            enabled: function( elem ) {
                return elem.disabled === false && elem.type !== "hidden";
            },

            disabled: function( elem ) {
                return elem.disabled === true;
            },

            checked: function( elem ) {
                return elem.checked === true;
            },

            selected: function( elem ) {
                if ( elem.parentNode ) {
                    elem.parentNode.selectedIndex;
                }

                return elem.selected === true;
            },

            parent: function( elem ) {
                return !!elem.firstChild;
            },

            empty: function( elem ) {
                return !elem.firstChild;
            },

            has: function( elem, i, match ) {
                return !!Sizzle( match[3], elem ).length;
            },

            header: function( elem ) {
                return (/h\d/i).test( elem.nodeName );
            },

            text: function( elem ) {
                var attr = elem.getAttribute( "type" ), type = elem.type;
                return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
            },

            radio: function( elem ) {
                return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
            },

            checkbox: function( elem ) {
                return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
            },

            file: function( elem ) {
                return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
            },

            password: function( elem ) {
                return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
            },

            submit: function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && "submit" === elem.type;
            },

            image: function( elem ) {
                return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
            },

            reset: function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && "reset" === elem.type;
            },

            button: function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && "button" === elem.type || name === "button";
            },

            input: function( elem ) {
                return (/input|select|textarea|button/i).test( elem.nodeName );
            },

            focus: function( elem ) {
                return elem === elem.ownerDocument.activeElement;
            }
        },
        setFilters: {
            first: function( elem, i ) {
                return i === 0;
            },

            last: function( elem, i, match, array ) {
                return i === array.length - 1;
            },

            even: function( elem, i ) {
                return i % 2 === 0;
            },

            odd: function( elem, i ) {
                return i % 2 === 1;
            },

            lt: function( elem, i, match ) {
                return i < match[3] - 0;
            },

            gt: function( elem, i, match ) {
                return i > match[3] - 0;
            },

            nth: function( elem, i, match ) {
                return match[3] - 0 === i;
            },

            eq: function( elem, i, match ) {
                return match[3] - 0 === i;
            }
        },
        filter: {
            PSEUDO: function( elem, match, i, array ) {
                var name = match[1],
                    filter = Expr.filters[ name ];

                if ( filter ) {
                    return filter( elem, i, match, array );

                } else if ( name === "contains" ) {
                    return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

                } else if ( name === "not" ) {
                    var not = match[3];

                    for ( var j = 0, l = not.length; j < l; j++ ) {
                        if ( not[j] === elem ) {
                            return false;
                        }
                    }

                    return true;

                } else {
                    Sizzle.error( name );
                }
            },

            CHILD: function( elem, match ) {
                var type = match[1],
                    node = elem;

                switch ( type ) {
                    case "only":
                    case "first":
                        while ( (node = node.previousSibling) )	 {
                            if ( node.nodeType === 1 ) {
                                return false;
                            }
                        }

                        if ( type === "first" ) {
                            return true;
                        }

                        node = elem;

                    case "last":
                        while ( (node = node.nextSibling) )	 {
                            if ( node.nodeType === 1 ) {
                                return false;
                            }
                        }

                        return true;

                    case "nth":
                        var first = match[2],
                            last = match[3];

                        if ( first === 1 && last === 0 ) {
                            return true;
                        }

                        var doneName = match[0],
                            parent = elem.parentNode;

                        if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
                            var count = 0;

                            for ( node = parent.firstChild; node; node = node.nextSibling ) {
                                if ( node.nodeType === 1 ) {
                                    node.nodeIndex = ++count;
                                }
                            }

                            parent.sizcache = doneName;
                        }

                        var diff = elem.nodeIndex - last;

                        if ( first === 0 ) {
                            return diff === 0;

                        } else {
                            return ( diff % first === 0 && diff / first >= 0 );
                        }
                }
            },

            ID: function( elem, match ) {
                return elem.nodeType === 1 && elem.getAttribute("id") === match;
            },

            TAG: function( elem, match ) {
                return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
            },

            CLASS: function( elem, match ) {
                return (" " + (elem.className || elem.getAttribute("class")) + " ")
                    .indexOf( match ) > -1;
            },

            ATTR: function( elem, match ) {
                var name = match[1],
                    result = Expr.attrHandle[ name ] ?
                        Expr.attrHandle[ name ]( elem ) :
                        elem[ name ] != null ?
                            elem[ name ] :
                            elem.getAttribute( name ),
                    value = result + "",
                    type = match[2],
                    check = match[4];

                return result == null ?
                    type === "!=" :
                    type === "=" ?
                        value === check :
                        type === "*=" ?
                            value.indexOf(check) >= 0 :
                            type === "~=" ?
                                (" " + value + " ").indexOf(check) >= 0 :
                                !check ?
                                    value && result !== false :
                                    type === "!=" ?
                                        value !== check :
                                        type === "^=" ?
                                            value.indexOf(check) === 0 :
                                            type === "$=" ?
                                                value.substr(value.length - check.length) === check :
                                                type === "|=" ?
                                                    value === check || value.substr(0, check.length + 1) === check + "-" :
                                                    false;
            },

            POS: function( elem, match, i, array ) {
                var name = match[2],
                    filter = Expr.setFilters[ name ];

                if ( filter ) {
                    return filter( elem, i, match, array );
                }
            }
        }
    };

    var origPOS = Expr.match.POS,
        fescape = function(all, num){
            return "\\" + (num - 0 + 1);
        };

    for ( var type in Expr.match ) {
        Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
        Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
    }

    var makeArray = function( array, results ) {
        array = Array.prototype.slice.call( array, 0 );

        if ( results ) {
            results.push.apply( results, array );
            return results;
        }

        return array;
    };

    try {
        Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

    } catch( e ) {
        makeArray = function( array, results ) {
            var i = 0,
                ret = results || [];

            if ( toString.call(array) === "[object Array]" ) {
                Array.prototype.push.apply( ret, array );

            } else {
                if ( typeof array.length === "number" ) {
                    for ( var l = array.length; i < l; i++ ) {
                        ret.push( array[i] );
                    }

                } else {
                    for ( ; array[i]; i++ ) {
                        ret.push( array[i] );
                    }
                }
            }

            return ret;
        };
    }

    var sortOrder, siblingCheck;

    if ( document.documentElement.compareDocumentPosition ) {
        sortOrder = function( a, b ) {
            if ( a === b ) {
                hasDuplicate = true;
                return 0;
            }

            if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
                return a.compareDocumentPosition ? -1 : 1;
            }

            return a.compareDocumentPosition(b) & 4 ? -1 : 1;
        };

    } else {
        sortOrder = function( a, b ) {
            if ( a === b ) {
                hasDuplicate = true;
                return 0;

            } else if ( a.sourceIndex && b.sourceIndex ) {
                return a.sourceIndex - b.sourceIndex;
            }

            var al, bl,
                ap = [],
                bp = [],
                aup = a.parentNode,
                bup = b.parentNode,
                cur = aup;

            if ( aup === bup ) {
                return siblingCheck( a, b );

            } else if ( !aup ) {
                return -1;

            } else if ( !bup ) {
                return 1;
            }

            while ( cur ) {
                ap.unshift( cur );
                cur = cur.parentNode;
            }

            cur = bup;

            while ( cur ) {
                bp.unshift( cur );
                cur = cur.parentNode;
            }

            al = ap.length;
            bl = bp.length;

            for ( var i = 0; i < al && i < bl; i++ ) {
                if ( ap[i] !== bp[i] ) {
                    return siblingCheck( ap[i], bp[i] );
                }
            }

            return i === al ?
                siblingCheck( a, bp[i], -1 ) :
                siblingCheck( ap[i], b, 1 );
        };

        siblingCheck = function( a, b, ret ) {
            if ( a === b ) {
                return ret;
            }

            var cur = a.nextSibling;

            while ( cur ) {
                if ( cur === b ) {
                    return -1;
                }

                cur = cur.nextSibling;
            }

            return 1;
        };
    }

    Sizzle.getText = function( elems ) {
        var ret = "", elem;

        for ( var i = 0; elems[i]; i++ ) {
            elem = elems[i];

            if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
                ret += elem.nodeValue;

            } else if ( elem.nodeType !== 8 ) {
                ret += Sizzle.getText( elem.childNodes );
            }
        }

        return ret;
    };

    (function(){
        var form = document.createElement("div"),
            id = "script" + (new Date()).getTime(),
            root = document.documentElement;

        form.innerHTML = "<a name='" + id + "'/>";

        root.insertBefore( form, root.firstChild );

        if ( document.getElementById( id ) ) {
            Expr.find.ID = function( match, context, isXML ) {
                if ( typeof context.getElementById !== "undefined" && !isXML ) {
                    var m = context.getElementById(match[1]);

                    return m ?
                        m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
                            [m] :
                            undefined :
                        [];
                }
            };

            Expr.filter.ID = function( elem, match ) {
                var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

                return elem.nodeType === 1 && node && node.nodeValue === match;
            };
        }

        root.removeChild( form );

        root = form = null;
    })();

    (function(){

        var div = document.createElement("div");
        div.appendChild( document.createComment("") );

        if ( div.getElementsByTagName("*").length > 0 ) {
            Expr.find.TAG = function( match, context ) {
                var results = context.getElementsByTagName( match[1] );

                if ( match[1] === "*" ) {
                    var tmp = [];

                    for ( var i = 0; results[i]; i++ ) {
                        if ( results[i].nodeType === 1 ) {
                            tmp.push( results[i] );
                        }
                    }

                    results = tmp;
                }

                return results;
            };
        }

        div.innerHTML = "<a href='#'></a>";

        if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
            div.firstChild.getAttribute("href") !== "#" ) {

            Expr.attrHandle.href = function( elem ) {
                return elem.getAttribute( "href", 2 );
            };
        }

        div = null;
    })();

    if ( document.querySelectorAll ) {
        (function(){
            var oldSizzle = Sizzle,
                div = document.createElement("div"),
                id = "__sizzle__";

            div.innerHTML = "<p class='TEST'></p>";

            if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
                return;
            }

            Sizzle = function( query, context, extra, seed ) {
                context = context || document;

                if ( !seed && !Sizzle.isXML(context) ) {
                    var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );

                    if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
                        if ( match[1] ) {
                            return makeArray( context.getElementsByTagName( query ), extra );

                        } else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
                            return makeArray( context.getElementsByClassName( match[2] ), extra );
                        }
                    }

                    if ( context.nodeType === 9 ) {
                        if ( query === "body" && context.body ) {
                            return makeArray( [ context.body ], extra );

                        } else if ( match && match[3] ) {
                            var elem = context.getElementById( match[3] );

                            if ( elem && elem.parentNode ) {
                                if ( elem.id === match[3] ) {
                                    return makeArray( [ elem ], extra );
                                }

                            } else {
                                return makeArray( [], extra );
                            }
                        }

                        try {
                            return makeArray( context.querySelectorAll(query), extra );
                        } catch(qsaError) {}

                    } else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                        var oldContext = context,
                            old = context.getAttribute( "id" ),
                            nid = old || id,
                            hasParent = context.parentNode,
                            relativeHierarchySelector = /^\s*[+~]/.test( query );

                        if ( !old ) {
                            context.setAttribute( "id", nid );
                        } else {
                            nid = nid.replace( /'/g, "\\$&" );
                        }
                        if ( relativeHierarchySelector && hasParent ) {
                            context = context.parentNode;
                        }

                        try {
                            if ( !relativeHierarchySelector || hasParent ) {
                                return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
                            }

                        } catch(pseudoError) {
                        } finally {
                            if ( !old ) {
                                oldContext.removeAttribute( "id" );
                            }
                        }
                    }
                }

                return oldSizzle(query, context, extra, seed);
            };

            for ( var prop in oldSizzle ) {
                Sizzle[ prop ] = oldSizzle[ prop ];
            }

            div = null;
        })();
    }

    (function(){
        var html = document.documentElement,
            matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

        if ( matches ) {
            var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
                pseudoWorks = false;

            try {
                matches.call( document.documentElement, "[test!='']:sizzle" );

            } catch( pseudoError ) {
                pseudoWorks = true;
            }

            Sizzle.matchesSelector = function( node, expr ) {
                expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

                if ( !Sizzle.isXML( node ) ) {
                    try {
                        if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
                            var ret = matches.call( node, expr );

                            if ( ret || !disconnectedMatch ||
                                node.document && node.document.nodeType !== 11 ) {
                                return ret;
                            }
                        }
                    } catch(e) {}
                }

                return Sizzle(expr, null, null, [node]).length > 0;
            };
        }
    })();

    (function(){
        var div = document.createElement("div");

        div.innerHTML = "<div class='test e'></div><div class='test'></div>";

        if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
            return;
        }

        div.lastChild.className = "e";

        if ( div.getElementsByClassName("e").length === 1 ) {
            return;
        }

        Expr.order.splice(1, 0, "CLASS");
        Expr.find.CLASS = function( match, context, isXML ) {
            if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
                return context.getElementsByClassName(match[1]);
            }
        };

        div = null;
    })();

    function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
        for ( var i = 0, l = checkSet.length; i < l; i++ ) {
            var elem = checkSet[i];

            if ( elem ) {
                var match = false;

                elem = elem[dir];

                while ( elem ) {
                    if ( elem.sizcache === doneName ) {
                        match = checkSet[elem.sizset];
                        break;
                    }

                    if ( elem.nodeType === 1 && !isXML ){
                        elem.sizcache = doneName;
                        elem.sizset = i;
                    }

                    if ( elem.nodeName.toLowerCase() === cur ) {
                        match = elem;
                        break;
                    }

                    elem = elem[dir];
                }

                checkSet[i] = match;
            }
        }
    }

    function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
        for ( var i = 0, l = checkSet.length; i < l; i++ ) {
            var elem = checkSet[i];

            if ( elem ) {
                var match = false;

                elem = elem[dir];

                while ( elem ) {
                    if ( elem.sizcache === doneName ) {
                        match = checkSet[elem.sizset];
                        break;
                    }

                    if ( elem.nodeType === 1 ) {
                        if ( !isXML ) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }

                        if ( typeof cur !== "string" ) {
                            if ( elem === cur ) {
                                match = true;
                                break;
                            }

                        } else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
                            match = elem;
                            break;
                        }
                    }

                    elem = elem[dir];
                }

                checkSet[i] = match;
            }
        }
    }

    if ( document.documentElement.contains ) {
        Sizzle.contains = function( a, b ) {
            return a !== b && (a.contains ? a.contains(b) : true);
        };

    } else if ( document.documentElement.compareDocumentPosition ) {
        Sizzle.contains = function( a, b ) {
            return !!(a.compareDocumentPosition(b) & 16);
        };

    } else {
        Sizzle.contains = function() {
            return false;
        };
    }

    Sizzle.isXML = function( elem ) {
        var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

        return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    var posProcess = function( selector, context ) {
        var match,
            tmpSet = [],
            later = "",
            root = context.nodeType ? [context] : context;

        while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
            later += match[0];
            selector = selector.replace( Expr.match.PSEUDO, "" );
        }

        selector = Expr.relative[selector] ? selector + "*" : selector;

        for ( var i = 0, l = root.length; i < l; i++ ) {
            Sizzle( selector, root[i], tmpSet );
        }

        return Sizzle.filter( later, tmpSet );
    };


    window.Sizzle = Sizzle;

})();

Prototype._original_property = window.Sizzle;

;(function(engine) {
    var extendElements = Prototype.Selector.extendElements;

    function select(selector, scope) {
        return extendElements(engine(selector, scope || document));
    }

    function match(element, selector) {
        return engine.matches(selector, [element]).length == 1;
    }

    Prototype.Selector.engine = engine;
    Prototype.Selector.select = select;
    Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
    reset: function(form) {
        form = $(form);
        form.reset();
        return form;
    },

    serializeElements: function(elements, options) {
        if (typeof options != 'object') options = { hash: !!options };
        else if (Object.isUndefined(options.hash)) options.hash = true;
        var key, value, submitted = false, submit = options.submit, accumulator, initial;

        if (options.hash) {
            initial = {};
            accumulator = function(result, key, value) {
                if (key in result) {
                    if (!Object.isArray(result[key])) result[key] = [result[key]];
                    result[key].push(value);
                } else result[key] = value;
                return result;
            };
        } else {
            initial = '';
            accumulator = function(result, key, value) {
                value = value.gsub(/(\r)?\n/, '\r\n');
                value = encodeURIComponent(value);
                value = value.gsub(/%20/, '+');
                return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
            }
        }

        return elements.inject(initial, function(result, element) {
            if (!element.disabled && element.name) {
                key = element.name; value = $(element).getValue();
                if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
                    submit !== false && (!submit || key == submit) && (submitted = true)))) {
                    result = accumulator(result, key, value);
                }
            }
            return result;
        });
    }
};

Form.Methods = {
    serialize: function(form, options) {
        return Form.serializeElements(Form.getElements(form), options);
    },


    getElements: function(form) {
        var elements = $(form).getElementsByTagName('*');
        var element, results = [], serializers = Form.Element.Serializers;

        for (var i = 0; element = elements[i]; i++) {
            if (serializers[element.tagName.toLowerCase()])
                results.push(Element.extend(element));
        }
        return results;
    },

    getInputs: function(form, typeName, name) {
        form = $(form);
        var inputs = form.getElementsByTagName('input');

        if (!typeName && !name) return $A(inputs).map(Element.extend);

        for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
            var input = inputs[i];
            if ((typeName && input.type != typeName) || (name && input.name != name))
                continue;
            matchingInputs.push(Element.extend(input));
        }

        return matchingInputs;
    },

    disable: function(form) {
        form = $(form);
        Form.getElements(form).invoke('disable');
        return form;
    },

    enable: function(form) {
        form = $(form);
        Form.getElements(form).invoke('enable');
        return form;
    },

    findFirstElement: function(form) {
        var elements = $(form).getElements().findAll(function(element) {
            return 'hidden' != element.type && !element.disabled;
        });
        var firstByIndex = elements.findAll(function(element) {
            return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
        }).sortBy(function(element) { return element.tabIndex }).first();

        return firstByIndex ? firstByIndex : elements.find(function(element) {
            return /^(?:input|select|textarea)$/i.test(element.tagName);
        });
    },

    focusFirstElement: function(form) {
        form = $(form);
        var element = form.findFirstElement();
        if (element) element.activate();
        return form;
    },

    request: function(form, options) {
        form = $(form), options = Object.clone(options || { });

        var params = options.parameters, action = form.readAttribute('action') || '';
        if (action.blank()) action = window.location.href;
        options.parameters = form.serialize(true);

        if (params) {
            if (Object.isString(params)) params = params.toQueryParams();
            Object.extend(options.parameters, params);
        }

        if (form.hasAttribute('method') && !options.method)
            options.method = form.method;

        return new Ajax.Request(action, options);
    }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
    focus: function(element) {
        $(element).focus();
        return element;
    },

    select: function(element) {
        $(element).select();
        return element;
    }
};

Form.Element.Methods = {

    serialize: function(element) {
        element = $(element);
        if (!element.disabled && element.name) {
            var value = element.getValue();
            if (value != undefined) {
                var pair = { };
                pair[element.name] = value;
                return Object.toQueryString(pair);
            }
        }
        return '';
    },

    getValue: function(element) {
        element = $(element);
        var method = element.tagName.toLowerCase();
        return Form.Element.Serializers[method](element);
    },

    setValue: function(element, value) {
        element = $(element);
        var method = element.tagName.toLowerCase();
        Form.Element.Serializers[method](element, value);
        return element;
    },

    clear: function(element) {
        $(element).value = '';
        return element;
    },

    present: function(element) {
        return $(element).value != '';
    },

    activate: function(element) {
        element = $(element);
        try {
            element.focus();
            if (element.select && (element.tagName.toLowerCase() != 'input' ||
                !(/^(?:button|reset|submit)$/i.test(element.type))))
                element.select();
        } catch (e) { }
        return element;
    },

    disable: function(element) {
        element = $(element);
        element.disabled = true;
        return element;
    },

    enable: function(element) {
        element = $(element);
        element.disabled = false;
        return element;
    }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (function() {
    function input(element, value) {
        switch (element.type.toLowerCase()) {
            case 'checkbox':
            case 'radio':
                return inputSelector(element, value);
            default:
                return valueSelector(element, value);
        }
    }

    function inputSelector(element, value) {
        if (Object.isUndefined(value))
            return element.checked ? element.value : null;
        else element.checked = !!value;
    }

    function valueSelector(element, value) {
        if (Object.isUndefined(value)) return element.value;
        else element.value = value;
    }

    function select(element, value) {
        if (Object.isUndefined(value))
            return (element.type === 'select-one' ? selectOne : selectMany)(element);

        var opt, currentValue, single = !Object.isArray(value);
        for (var i = 0, length = element.length; i < length; i++) {
            opt = element.options[i];
            currentValue = this.optionValue(opt);
            if (single) {
                if (currentValue == value) {
                    opt.selected = true;
                    return;
                }
            }
            else opt.selected = value.include(currentValue);
        }
    }

    function selectOne(element) {
        var index = element.selectedIndex;
        return index >= 0 ? optionValue(element.options[index]) : null;
    }

    function selectMany(element) {
        var values, length = element.length;
        if (!length) return null;

        for (var i = 0, values = []; i < length; i++) {
            var opt = element.options[i];
            if (opt.selected) values.push(optionValue(opt));
        }
        return values;
    }

    function optionValue(opt) {
        return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
    }

    return {
        input:         input,
        inputSelector: inputSelector,
        textarea:      valueSelector,
        select:        select,
        selectOne:     selectOne,
        selectMany:    selectMany,
        optionValue:   optionValue,
        button:        valueSelector
    };
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
    initialize: function($super, element, frequency, callback) {
        $super(callback, frequency);
        this.element   = $(element);
        this.lastValue = this.getValue();
    },

    execute: function() {
        var value = this.getValue();
        if (Object.isString(this.lastValue) && Object.isString(value) ?
            this.lastValue != value : String(this.lastValue) != String(value)) {
            this.callback(this.element, value);
            this.lastValue = value;
        }
    }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
    getValue: function() {
        return Form.Element.getValue(this.element);
    }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
    getValue: function() {
        return Form.serialize(this.element);
    }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
    initialize: function(element, callback) {
        this.element  = $(element);
        this.callback = callback;

        this.lastValue = this.getValue();
        if (this.element.tagName.toLowerCase() == 'form')
            this.registerFormCallbacks();
        else
            this.registerCallback(this.element);
    },

    onElementEvent: function() {
        var value = this.getValue();
        if (this.lastValue != value) {
            this.callback(this.element, value);
            this.lastValue = value;
        }
    },

    registerFormCallbacks: function() {
        Form.getElements(this.element).each(this.registerCallback, this);
    },

    registerCallback: function(element) {
        if (element.type) {
            switch (element.type.toLowerCase()) {
                case 'checkbox':
                case 'radio':
                    Event.observe(element, 'click', this.onElementEvent.bind(this));
                    break;
                default:
                    Event.observe(element, 'change', this.onElementEvent.bind(this));
                    break;
            }
        }
    }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
    getValue: function() {
        return Form.Element.getValue(this.element);
    }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
    getValue: function() {
        return Form.serialize(this.element);
    }
});
(function(GLOBAL) {
    var DIV = document.createElement('div');
    var docEl = document.documentElement;
    var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
        && 'onmouseleave' in docEl;

    var Event = {
        KEY_BACKSPACE: 8,
        KEY_TAB:       9,
        KEY_RETURN:   13,
        KEY_ESC:      27,
        KEY_LEFT:     37,
        KEY_UP:       38,
        KEY_RIGHT:    39,
        KEY_DOWN:     40,
        KEY_DELETE:   46,
        KEY_HOME:     36,
        KEY_END:      35,
        KEY_PAGEUP:   33,
        KEY_PAGEDOWN: 34,
        KEY_INSERT:   45
    };


    var isIELegacyEvent = function(event) { return false; };

    if (window.attachEvent) {
        if (window.addEventListener) {
            isIELegacyEvent = function(event) {
                return !(event instanceof window.Event);
            };
        } else {
            isIELegacyEvent = function(event) { return true; };
        }
    }

    var _isButton;

    function _isButtonForDOMEvents(event, code) {
        return event.which ? (event.which === code + 1) : (event.button === code);
    }

    var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
    function _isButtonForLegacyEvents(event, code) {
        return event.button === legacyButtonMap[code];
    }

    function _isButtonForWebKit(event, code) {
        switch (code) {
            case 0: return event.which == 1 && !event.metaKey;
            case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
            case 2: return event.which == 3;
            default: return false;
        }
    }

    if (window.attachEvent) {
        if (!window.addEventListener) {
            _isButton = _isButtonForLegacyEvents;
        } else {
            _isButton = function(event, code) {
                return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
                    _isButtonForDOMEvents(event, code);
            }
        }
    } else if (Prototype.Browser.WebKit) {
        _isButton = _isButtonForWebKit;
    } else {
        _isButton = _isButtonForDOMEvents;
    }

    function isLeftClick(event)   { return _isButton(event, 0) }

    function isMiddleClick(event) { return _isButton(event, 1) }

    function isRightClick(event)  { return _isButton(event, 2) }

    function element(event) {
        return Element.extend(_element(event));
    }

    function _element(event) {
        event = Event.extend(event);

        var node = event.target, type = event.type,
            currentTarget = event.currentTarget;

        if (currentTarget && currentTarget.tagName) {
            if (type === 'load' || type === 'error' ||
                (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
                    && currentTarget.type === 'radio'))
                node = currentTarget;
        }

        if (node.nodeType == Node.TEXT_NODE)
            node = node.parentNode;

        return Element.extend(node);
    }

    function findElement(event, expression) {
        var element = _element(event), match = Prototype.Selector.match;
        if (!expression) return Element.extend(element);
        while (element) {
            if (Object.isElement(element) && match(element, expression))
                return Element.extend(element);
            element = element.parentNode;
        }
    }

    function pointer(event) {
        return { x: pointerX(event), y: pointerY(event) };
    }

    function pointerX(event) {
        var docElement = document.documentElement,
            body = document.body || { scrollLeft: 0 };

        return event.pageX || (event.clientX +
            (docElement.scrollLeft || body.scrollLeft) -
            (docElement.clientLeft || 0));
    }

    function pointerY(event) {
        var docElement = document.documentElement,
            body = document.body || { scrollTop: 0 };

        return  event.pageY || (event.clientY +
            (docElement.scrollTop || body.scrollTop) -
            (docElement.clientTop || 0));
    }


    function stop(event) {
        Event.extend(event);
        event.preventDefault();
        event.stopPropagation();

        event.stopped = true;
    }


    Event.Methods = {
        isLeftClick:   isLeftClick,
        isMiddleClick: isMiddleClick,
        isRightClick:  isRightClick,

        element:     element,
        findElement: findElement,

        pointer:  pointer,
        pointerX: pointerX,
        pointerY: pointerY,

        stop: stop
    };

    var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
        m[name] = Event.Methods[name].methodize();
        return m;
    });

    if (window.attachEvent) {
        function _relatedTarget(event) {
            var element;
            switch (event.type) {
                case 'mouseover':
                case 'mouseenter':
                    element = event.fromElement;
                    break;
                case 'mouseout':
                case 'mouseleave':
                    element = event.toElement;
                    break;
                default:
                    return null;
            }
            return Element.extend(element);
        }

        var additionalMethods = {
            stopPropagation: function() { this.cancelBubble = true },
            preventDefault:  function() { this.returnValue = false },
            inspect: function() { return '[object Event]' }
        };

        Event.extend = function(event, element) {
            if (!event) return false;

            if (!isIELegacyEvent(event)) return event;

            if (event._extendedByPrototype) return event;
            event._extendedByPrototype = Prototype.emptyFunction;

            var pointer = Event.pointer(event);

            Object.extend(event, {
                target: event.srcElement || element,
                relatedTarget: _relatedTarget(event),
                pageX:  pointer.x,
                pageY:  pointer.y
            });

            Object.extend(event, methods);
            Object.extend(event, additionalMethods);

            return event;
        };
    } else {
        Event.extend = Prototype.K;
    }

    if (window.addEventListener) {
        Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
        Object.extend(Event.prototype, methods);
    }

    var EVENT_TRANSLATIONS = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    };

    function getDOMEventName(eventName) {
        return EVENT_TRANSLATIONS[eventName] || eventName;
    }

    if (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
        getDOMEventName = Prototype.K;

    function getUniqueElementID(element) {
        if (element === window) return 0;

        if (typeof element._prototypeUID === 'undefined')
            element._prototypeUID = Element.Storage.UID++;
        return element._prototypeUID;
    }

    function getUniqueElementID_IE(element) {
        if (element === window) return 0;
        if (element == document) return 1;
        return element.uniqueID;
    }

    if ('uniqueID' in DIV)
        getUniqueElementID = getUniqueElementID_IE;

    function isCustomEvent(eventName) {
        return eventName.include(':');
    }

    Event._isCustomEvent = isCustomEvent;

    function getRegistryForElement(element, uid) {
        var CACHE = GLOBAL.Event.cache;
        if (Object.isUndefined(uid))
            uid = getUniqueElementID(element);
        if (!CACHE[uid]) CACHE[uid] = { element: element };
        return CACHE[uid];
    }

    function destroyRegistryForElement(element, uid) {
        if (Object.isUndefined(uid))
            uid = getUniqueElementID(element);
        delete GLOBAL.Event.cache[uid];
    }


    function register(element, eventName, handler) {
        var registry = getRegistryForElement(element);
        if (!registry[eventName]) registry[eventName] = [];
        var entries = registry[eventName];

        var i = entries.length;
        while (i--)
            if (entries[i].handler === handler) return null;

        var uid = getUniqueElementID(element);
        var responder = GLOBAL.Event._createResponder(uid, eventName, handler);
        var entry = {
            responder: responder,
            handler:   handler
        };

        entries.push(entry);
        return entry;
    }

    function unregister(element, eventName, handler) {
        var registry = getRegistryForElement(element);
        var entries = registry[eventName];
        if (!entries) return;

        var i = entries.length, entry;
        while (i--) {
            if (entries[i].handler === handler) {
                entry = entries[i];
                break;
            }
        }

        if (!entry) return;

        var index = entries.indexOf(entry);
        entries.splice(index, 1);

        return entry;
    }


    function observe(element, eventName, handler) {
        element = $(element);
        var entry = register(element, eventName, handler);

        if (entry === null) return element;

        var responder = entry.responder;
        if (isCustomEvent(eventName))
            observeCustomEvent(element, eventName, responder);
        else
            observeStandardEvent(element, eventName, responder);

        return element;
    }

    function observeStandardEvent(element, eventName, responder) {
        var actualEventName = getDOMEventName(eventName);
        if (element.addEventListener) {
            element.addEventListener(actualEventName, responder, false);
        } else {
            element.attachEvent('on' + actualEventName, responder);
        }
    }

    function observeCustomEvent(element, eventName, responder) {
        if (element.addEventListener) {
            element.addEventListener('dataavailable', responder, false);
        } else {
            element.attachEvent('ondataavailable', responder);
            element.attachEvent('onlosecapture',   responder);
        }
    }

    function stopObserving(element, eventName, handler) {
        element = $(element);
        var handlerGiven = !Object.isUndefined(handler),
            eventNameGiven = !Object.isUndefined(eventName);

        if (!eventNameGiven && !handlerGiven) {
            stopObservingElement(element);
            return element;
        }

        if (!handlerGiven) {
            stopObservingEventName(element, eventName);
            return element;
        }

        var entry = unregister(element, eventName, handler);

        if (!entry) return element;
        removeEvent(element, eventName, entry.responder);
        return element;
    }

    function stopObservingStandardEvent(element, eventName, responder) {
        var actualEventName = getDOMEventName(eventName);
        if (element.removeEventListener) {
            element.removeEventListener(actualEventName, responder, false);
        } else {
            element.detachEvent('on' + actualEventName, responder);
        }
    }

    function stopObservingCustomEvent(element, eventName, responder) {
        if (element.removeEventListener) {
            element.removeEventListener('dataavailable', responder, false);
        } else {
            element.detachEvent('ondataavailable', responder);
            element.detachEvent('onlosecapture',   responder);
        }
    }



    function stopObservingElement(element) {
        var uid = getUniqueElementID(element),
            registry = getRegistryForElement(element, uid);

        destroyRegistryForElement(element, uid);

        var entries, i;
        for (var eventName in registry) {
            if (eventName === 'element') continue;

            entries = registry[eventName];
            i = entries.length;
            while (i--)
                removeEvent(element, eventName, entries[i].responder);
        }
    }

    function stopObservingEventName(element, eventName) {
        var registry = getRegistryForElement(element);
        var entries = registry[eventName];
        if (!entries) return;
        delete registry[eventName];

        var i = entries.length;
        while (i--)
            removeEvent(element, eventName, entries[i].responder);
    }


    function removeEvent(element, eventName, handler) {
        if (isCustomEvent(eventName))
            stopObservingCustomEvent(element, eventName, handler);
        else
            stopObservingStandardEvent(element, eventName, handler);
    }



    function getFireTarget(element) {
        if (element !== document) return element;
        if (document.createEvent && !element.dispatchEvent)
            return document.documentElement;
        return element;
    }

    function fire(element, eventName, memo, bubble) {
        element = getFireTarget($(element));
        if (Object.isUndefined(bubble)) bubble = true;
        memo = memo || {};

        var event = fireEvent(element, eventName, memo, bubble);
        return Event.extend(event);
    }

    function fireEvent_DOM(element, eventName, memo, bubble) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('dataavailable', bubble, true);

        event.eventName = eventName;
        event.memo = memo;

        element.dispatchEvent(event);
        return event;
    }

    function fireEvent_IE(element, eventName, memo, bubble) {
        var event = document.createEventObject();
        event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

        event.eventName = eventName;
        event.memo = memo;

        element.fireEvent(event.eventType, event);
        return event;
    }

    var fireEvent = document.createEvent ? fireEvent_DOM : fireEvent_IE;



    Event.Handler = Class.create({
        initialize: function(element, eventName, selector, callback) {
            this.element   = $(element);
            this.eventName = eventName;
            this.selector  = selector;
            this.callback  = callback;
            this.handler   = this.handleEvent.bind(this);
        },


        start: function() {
            Event.observe(this.element, this.eventName, this.handler);
            return this;
        },

        stop: function() {
            Event.stopObserving(this.element, this.eventName, this.handler);
            return this;
        },

        handleEvent: function(event) {
            var element = Event.findElement(event, this.selector);
            if (element) this.callback.call(this.element, event, element);
        }
    });

    function on(element, eventName, selector, callback) {
        element = $(element);
        if (Object.isFunction(selector) && Object.isUndefined(callback)) {
            callback = selector, selector = null;
        }

        return new Event.Handler(element, eventName, selector, callback).start();
    }

    Object.extend(Event, Event.Methods);

    Object.extend(Event, {
        fire:          fire,
        observe:       observe,
        stopObserving: stopObserving,
        on:            on
    });

    Element.addMethods({
        fire:          fire,

        observe:       observe,

        stopObserving: stopObserving,

        on:            on
    });

    Object.extend(document, {
        fire:          fire.methodize(),

        observe:       observe.methodize(),

        stopObserving: stopObserving.methodize(),

        on:            on.methodize(),

        loaded:        false
    });

    if (GLOBAL.Event) Object.extend(window.Event, Event);
    else GLOBAL.Event = Event;

    GLOBAL.Event.cache = {};

    function destroyCache_IE() {
        GLOBAL.Event.cache = null;
    }

    if (window.attachEvent)
        window.attachEvent('onunload', destroyCache_IE);

    DIV = null;
    docEl = null;
})(this);

(function(GLOBAL) {
    /* Code for creating leak-free event responders is based on work by
     John-David Dalton. */

    var docEl = document.documentElement;
    var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
        && 'onmouseleave' in docEl;

    function isSimulatedMouseEnterLeaveEvent(eventName) {
        return !MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
            (eventName === 'mouseenter' || eventName === 'mouseleave');
    }

    function createResponder(uid, eventName, handler) {
        if (Event._isCustomEvent(eventName))
            return createResponderForCustomEvent(uid, eventName, handler);
        if (isSimulatedMouseEnterLeaveEvent(eventName))
            return createMouseEnterLeaveResponder(uid, eventName, handler);

        return function(event) {
            var cacheEntry = Event.cache[uid];
            var element = cacheEntry.element;

            Event.extend(event, element);
            handler.call(element, event);
        };
    }

    function createResponderForCustomEvent(uid, eventName, handler) {
        return function(event) {
            var cacheEntry = Event.cache[uid], element = cacheEntry.element;

            if (Object.isUndefined(event.eventName))
                return false;

            if (event.eventName !== eventName)
                return false;

            Event.extend(event, element);
            handler.call(element, event);
        };
    }

    function createMouseEnterLeaveResponder(uid, eventName, handler) {
        return function(event) {
            var cacheEntry = Event.cache[uid], element = cacheEntry.element;

            Event.extend(event, element);
            var parent = event.relatedTarget;

            while (parent && parent !== element) {
                try { parent = parent.parentNode; }
                catch(e) { parent = element; }
            }

            if (parent === element) return;
            handler.call(element, event);
        }
    }

    GLOBAL.Event._createResponder = createResponder;
    docEl = null;
})(this);

(function(GLOBAL) {
    /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

    var TIMER;

    function fireContentLoadedEvent() {
        if (document.loaded) return;
        if (TIMER) window.clearTimeout(TIMER);
        document.loaded = true;
        document.fire('dom:loaded');
    }

    function checkReadyState() {
        if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', checkReadyState);
            fireContentLoadedEvent();
        }
    }

    function pollDoScroll() {
        try {
            document.documentElement.doScroll('left');
        } catch (e) {
            TIMER = pollDoScroll.defer();
            return;
        }

        fireContentLoadedEvent();
    }

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
    } else {
        document.attachEvent('onreadystatechange', checkReadyState);
        if (window == top) TIMER = pollDoScroll.defer();
    }

    Event.observe(window, 'load', fireContentLoadedEvent);
})(this);


Element.addMethods();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
    Before: function(element, content) {
        return Element.insert(element, {before:content});
    },

    Top: function(element, content) {
        return Element.insert(element, {top:content});
    },

    Bottom: function(element, content) {
        return Element.insert(element, {bottom:content});
    },

    After: function(element, content) {
        return Element.insert(element, {after:content});
    }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
    includeScrollOffsets: false,

    prepare: function() {
        this.deltaX =  window.pageXOffset
            || document.documentElement.scrollLeft
            || document.body.scrollLeft
            || 0;
        this.deltaY =  window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
    },

    within: function(element, x, y) {
        if (this.includeScrollOffsets)
            return this.withinIncludingScrolloffsets(element, x, y);
        this.xcomp = x;
        this.ycomp = y;
        this.offset = Element.cumulativeOffset(element);

        return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
    },

    withinIncludingScrolloffsets: function(element, x, y) {
        var offsetcache = Element.cumulativeScrollOffset(element);

        this.xcomp = x + offsetcache[0] - this.deltaX;
        this.ycomp = y + offsetcache[1] - this.deltaY;
        this.offset = Element.cumulativeOffset(element);

        return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
    },

    overlap: function(mode, element) {
        if (!mode) return 0;
        if (mode == 'vertical')
            return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
                element.offsetHeight;
        if (mode == 'horizontal')
            return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
                element.offsetWidth;
    },


    cumulativeOffset: Element.Methods.cumulativeOffset,

    positionedOffset: Element.Methods.positionedOffset,

    absolutize: function(element) {
        Position.prepare();
        return Element.absolutize(element);
    },

    relativize: function(element) {
        Position.prepare();
        return Element.relativize(element);
    },

    realOffset: Element.Methods.cumulativeScrollOffset,

    offsetParent: Element.Methods.getOffsetParent,

    page: Element.Methods.viewportOffset,

    clone: function(source, target, options) {
        options = options || { };
        return Element.clonePosition(target, source, options);
    }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
    function iter(name) {
        return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
    }

    instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
        function(element, className) {
            className = className.toString().strip();
            var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
            return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
        } : function(element, className) {
        className = className.toString().strip();
        var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
        if (!classNames && !className) return elements;

        var nodes = $(element).getElementsByTagName('*');
        className = ' ' + className + ' ';

        for (var i = 0, child, cn; child = nodes[i]; i++) {
            if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
                (classNames && classNames.all(function(name) {
                    return !name.toString().blank() && cn.include(' ' + name + ' ');
                }))))
                elements.push(Element.extend(child));
        }
        return elements;
    };

    return function(className, parentElement) {
        return $(parentElement || document.body).getElementsByClassName(className);
    };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
    initialize: function(element) {
        this.element = $(element);
    },

    _each: function(iterator, context) {
        this.element.className.split(/\s+/).select(function(name) {
            return name.length > 0;
        })._each(iterator, context);
    },

    set: function(className) {
        this.element.className = className;
    },

    add: function(classNameToAdd) {
        if (this.include(classNameToAdd)) return;
        this.set($A(this).concat(classNameToAdd).join(' '));
    },

    remove: function(classNameToRemove) {
        if (!this.include(classNameToRemove)) return;
        this.set($A(this).without(classNameToRemove).join(' '));
    },

    toString: function() {
        return $A(this).join(' ');
    }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(function() {
    window.Selector = Class.create({
        initialize: function(expression) {
            this.expression = expression.strip();
        },

        findElements: function(rootElement) {
            return Prototype.Selector.select(this.expression, rootElement);
        },

        match: function(element) {
            return Prototype.Selector.match(element, this.expression);
        },

        toString: function() {
            return this.expression;
        },

        inspect: function() {
            return "#<Selector: " + this.expression + ">";
        }
    });

    Object.extend(Selector, {
        matchElements: function(elements, expression) {
            var match = Prototype.Selector.match,
                results = [];

            for (var i = 0, length = elements.length; i < length; i++) {
                var element = elements[i];
                if (match(element, expression)) {
                    results.push(Element.extend(element));
                }
            }
            return results;
        },

        findElement: function(elements, expression, index) {
            index = index || 0;
            var matchIndex = 0, element;
            for (var i = 0, length = elements.length; i < length; i++) {
                element = elements[i];
                if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
                    return Element.extend(element);
                }
            }
        },

        findChildElements: function(element, expressions) {
            var selector = expressions.toArray().join(', ');
            return Prototype.Selector.select(selector, element || document);
        }
    });
})();

/* /assets/scriptaculous/5.1.0.4/scriptaculous.js */;
// script.aculo.us scriptaculous.js v1.8.2, Tue Nov 18 18:30:58 +0100 2008

// Copyright (c) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// For details, see the script.aculo.us web site: http://script.aculo.us/

var Scriptaculous = {
  Version: '1.8.2',
  require: function(libraryName) {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    document.write('<script type="text/javascript" src="'+libraryName+'"><\/script>');
  },
  REQUIRED_PROTOTYPE: '1.6.0.3',
  load: function() {
    function convertVersionString(versionString) {
      var v = versionString.replace(/_.*|\./g, '');
      v = parseInt(v + '0'.times(4-v.length));
      return versionString.indexOf('_') > -1 ? v-1 : v;
    }

    if((typeof Prototype=='undefined') ||
       (typeof Element == 'undefined') ||
       (typeof Element.Methods=='undefined') ||
       (convertVersionString(Prototype.Version) <
        convertVersionString(Scriptaculous.REQUIRED_PROTOTYPE)))
       throw("script.aculo.us requires the Prototype JavaScript framework >= " +
        Scriptaculous.REQUIRED_PROTOTYPE);

// Tapestry turns off this mechanism, and replaces it with RenderSupport.addScriptLink().

//    var js = /scriptaculous\.js(\?.*)?$/;
//    $$('head script[src]').findAll(function(s) {
//      return s.src.match(js);
//    }).each(function(s) {
//      var path = s.src.replace(js, ''),
//      includes = s.src.match(/\?.*load=([a-z,]*)/);
//      (includes ? includes[1] : 'builder,effects,dragdrop,controls,slider,sound').split(',').each(
//       function(include) { Scriptaculous.require(path+include+'.js') });
//    });
  }
};

Scriptaculous.load();
/* /assets/scriptaculous/5.1.0.4/effects.js */;
// script.aculo.us effects.js v1.8.2, Tue Nov 18 18:30:58 +0100 2008

// Copyright (c) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
//
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

// converts rgb() and #xxx to #xxxxxx format,
// returns self (or first argument) if not convertable
String.prototype.parseColor = function() {
  var color = '#';
  if (this.slice(0,4) == 'rgb(') {
    var cols = this.slice(4,this.length-1).split(',');
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);
  } else {
    if (this.slice(0,1) == '#') {
      if (this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();
      if (this.length==7) color = this.toLowerCase();
    }
  }
  return (color.length==7 ? color : (arguments[0] || this));
};

/*--------------------------------------------------------------------------*/

Element.collectTextNodes = function(element) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.collectTextNodesIgnoreClass = function(element, className) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ?
        Element.collectTextNodesIgnoreClass(node, className) : ''));
  }).flatten().join('');
};

Element.setContentZoom = function(element, percent) {
  element = $(element);
  element.setStyle({fontSize: (percent/100) + 'em'});
  if (Prototype.Browser.WebKit) window.scrollBy(0,0);
  return element;
};

Element.getInlineOpacity = function(element){
  return $(element).style.opacity || '';
};

Element.forceRerendering = function(element) {
  try {
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    element.removeChild(n);
  } catch(e) { }
};

/*--------------------------------------------------------------------------*/

var Effect = {
  _elementDoesNotExistError: {
    name: 'ElementDoesNotExistError',
    message: 'The specified DOM element does not exist, but is required for this effect to operate'
  },
  Transitions: {
    linear: Prototype.K,
    sinoidal: function(pos) {
      return (-Math.cos(pos*Math.PI)/2) + .5;
    },
    reverse: function(pos) {
      return 1-pos;
    },
    flicker: function(pos) {
      var pos = ((-Math.cos(pos*Math.PI)/4) + .75) + Math.random()/4;
      return pos > 1 ? 1 : pos;
    },
    wobble: function(pos) {
      return (-Math.cos(pos*Math.PI*(9*pos))/2) + .5;
    },
    pulse: function(pos, pulses) {
      return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
    },
    spring: function(pos) {
      return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
    },
    none: function(pos) {
      return 0;
    },
    full: function(pos) {
      return 1;
    }
  },
  DefaultOptions: {
    duration:   1.0,   // seconds
    fps:        100,   // 100= assume 66fps max.
    sync:       false, // true for combining
    from:       0.0,
    to:         1.0,
    delay:      0.0,
    queue:      'parallel'
  },
  tagifyText: function(element) {
    var tagifyStyle = 'position:relative';
    if (Prototype.Browser.IE) tagifyStyle += ';zoom:1';

    element = $(element);
    $A(element.childNodes).each( function(child) {
      if (child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            new Element('span', {style: tagifyStyle}).update(
              character == ' ' ? String.fromCharCode(160) : character),
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if (((typeof element == 'object') ||
        Object.isFunction(element)) &&
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;

    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || { });
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect) {
    element = $(element);
    effect = (effect || 'appear').toLowerCase();
    var options = Object.extend({
      queue: { position:'end', scope:(element.id || 'global'), limit: 1 }
    }, arguments[2] || { });
    Effect[element.visible() ?
      Effect.PAIRS[effect][1] : Effect.PAIRS[effect][0]](element, options);
  }
};

Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create(Enumerable, {
  initialize: function() {
    this.effects  = [];
    this.interval = null;
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();

    var position = Object.isString(effect.options.queue) ?
      effect.options.queue : effect.options.queue.position;

    switch(position) {
      case 'front':
        // move unstarted effects after this effect
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'with-last':
        timestamp = this.effects.pluck('startOn').max() || timestamp;
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }

    effect.startOn  += timestamp;
    effect.finishOn += timestamp;

    if (!effect.options.queue.limit || (this.effects.length < effect.options.queue.limit))
      this.effects.push(effect);

    if (!this.interval)
      this.interval = setInterval(this.loop.bind(this), 15);
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if (this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    for(var i=0, len=this.effects.length;i<len;i++)
      this.effects[i] && this.effects[i].loop(timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if (!Object.isString(queueName)) return queueName;

    return this.instances.get(queueName) ||
      this.instances.set(queueName, new Effect.ScopedQueue());
  }
};
Effect.Queue = Effect.Queues.get('global');

Effect.Base = Class.create({
  position: null,
  start: function(options) {
    function codeForEvent(options,eventName){
      return (
        (options[eventName+'Internal'] ? 'this.options.'+eventName+'Internal(this);' : '') +
        (options[eventName] ? 'this.options.'+eventName+'(this);' : '')
      );
    }
    if (options && options.transition === false) options.transition = Effect.Transitions.linear;
    this.options      = Object.extend(Object.extend({ },Effect.DefaultOptions), options || { });
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn+(this.options.duration*1000);
    this.fromToDelta  = this.options.to-this.options.from;
    this.totalTime    = this.finishOn-this.startOn;
    this.totalFrames  = this.options.fps*this.options.duration;

    this.render = (function() {
      function dispatch(effect, eventName) {
        if (effect.options[eventName + 'Internal'])
          effect.options[eventName + 'Internal'](effect);
        if (effect.options[eventName])
          effect.options[eventName](effect);
      }

      return function(pos) {
        if (this.state === "idle") {
          this.state = "running";
          dispatch(this, 'beforeSetup');
          if (this.setup) this.setup();
          dispatch(this, 'afterSetup');
        }
        if (this.state === "running") {
          pos = (this.options.transition(pos) * this.fromToDelta) + this.options.from;
          this.position = pos;
          dispatch(this, 'beforeUpdate');
          if (this.update) this.update(pos);
          dispatch(this, 'afterUpdate');
        }
      };
    })();

    this.event('beforeStart');
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).add(this);
  },
  loop: function(timePos) {
    if (timePos >= this.startOn) {
      if (timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if (this.finish) this.finish();
        this.event('afterFinish');
        return;
      }
      var pos   = (timePos - this.startOn) / this.totalTime,
          frame = (pos * this.totalFrames).round();
      if (frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  cancel: function() {
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).remove(this);
    this.state = 'finished';
  },
  event: function(eventName) {
    if (this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if (this.options[eventName]) this.options[eventName](this);
  },
  inspect: function() {
    var data = $H();
    for(property in this)
      if (!Object.isFunction(this[property])) data.set(property, this[property]);
    return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
});

Effect.Parallel = Class.create(Effect.Base, {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if (effect.finish) effect.finish(position);
      effect.event('afterFinish');
    });
  }
});

Effect.Tween = Class.create(Effect.Base, {
  initialize: function(object, from, to) {
    object = Object.isString(object) ? $(object) : object;
    var args = $A(arguments), method = args.last(),
      options = args.length == 5 ? args[3] : null;
    this.method = Object.isFunction(method) ? method.bind(object) :
      Object.isFunction(object[method]) ? object[method].bind(object) :
      function(value) { object[method] = value };
    this.start(Object.extend({ from: from, to: to }, options || { }));
  },
  update: function(position) {
    this.method(position);
  }
});

Effect.Event = Class.create(Effect.Base, {
  initialize: function() {
    this.start(Object.extend({ duration: 0 }, arguments[0] || { }));
  },
  update: Prototype.emptyFunction
});

Effect.Opacity = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    // make this work on IE on elements without 'layout'
    if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
      this.element.setStyle({zoom: 1});
    var options = Object.extend({
      from: this.element.getOpacity() || 0.0,
      to:   1.0
    }, arguments[1] || { });
    this.start(options);
  },
  update: function(position) {
    this.element.setOpacity(position);
  }
});

Effect.Move = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    this.element.makePositioned();
    this.originalLeft = parseFloat(this.element.getStyle('left') || '0');
    this.originalTop  = parseFloat(this.element.getStyle('top')  || '0');
    if (this.options.mode == 'absolute') {
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    this.element.setStyle({
      left: (this.options.x  * position + this.originalLeft).round() + 'px',
      top:  (this.options.y  * position + this.originalTop).round()  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element,
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || { }));
};

Effect.Scale = Class.create(Effect.Base, {
  initialize: function(element, percent) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or { } with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || { });
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = this.element.getStyle('position');

    this.originalStyle = { };
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));

    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;

    var fontSize = this.element.getStyle('font-size') || '100%';
    ['em','px','%','pt'].each( function(fontSizeType) {
      if (fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));

    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;

    this.dims = null;
    if (this.options.scaleMode=='box')
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
    if (/^content/.test(this.options.scaleMode))
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
    if (!this.dims)
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if (this.options.scaleContent && this.fontSize)
      this.element.setStyle({fontSize: this.fontSize * currentScale + this.fontSizeType });
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if (this.restoreAfterFinish) this.element.setStyle(this.originalStyle);
  },
  setDimensions: function(height, width) {
    var d = { };
    if (this.options.scaleX) d.width = width.round() + 'px';
    if (this.options.scaleY) d.height = height.round() + 'px';
    if (this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if (this.elementPositioning == 'absolute') {
        if (this.options.scaleY) d.top = this.originalTop-topd + 'px';
        if (this.options.scaleX) d.left = this.originalLeft-leftd + 'px';
      } else {
        if (this.options.scaleY) d.top = -topd + 'px';
        if (this.options.scaleX) d.left = -leftd + 'px';
      }
    }
    this.element.setStyle(d);
  }
});

Effect.Highlight = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if (this.element.getStyle('display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = { };
    if (!this.options.keepBackgroundImage) {
      this.oldStyle.backgroundImage = this.element.getStyle('background-image');
      this.element.setStyle({backgroundImage: 'none'});
    }
    if (!this.options.endcolor)
      this.options.endcolor = this.element.getStyle('background-color').parseColor('#ffffff');
    if (!this.options.restorecolor)
      this.options.restorecolor = this.element.getStyle('background-color');
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16) }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i] }.bind(this));
  },
  update: function(position) {
    this.element.setStyle({backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart()); }.bind(this)) });
  },
  finish: function() {
    this.element.setStyle(Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = function(element) {
  var options = arguments[1] || { },
  scrollOffsets = document.viewport.getScrollOffsets(),
  elementOffsets = $(element).cumulativeOffset();

  if (options.offset) elementOffsets[1] += options.offset;

  return new Effect.Tween(null,
    scrollOffsets.top,
    elementOffsets[1],
    options,
    function(p){ scrollTo(scrollOffsets.left, p.round()); }
  );
};

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  var options = Object.extend({
    from: element.getOpacity() || 1.0,
    to:   0.0,
    afterFinishInternal: function(effect) {
      if (effect.options.to!=0) return;
      effect.element.hide().setStyle({opacity: oldOpacity});
    }
  }, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Appear = function(element) {
  element = $(element);
  var options = Object.extend({
  from: (element.getStyle('display') == 'none' ? 0.0 : element.getOpacity() || 0.0),
  to:   1.0,
  // force Safari to render floated elements properly
  afterFinishInternal: function(effect) {
    effect.element.forceRerendering();
  },
  beforeSetup: function(effect) {
    effect.element.setOpacity(effect.options.from).show();
  }}, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = {
    opacity: element.getInlineOpacity(),
    position: element.getStyle('position'),
    top:  element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height
  };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200,
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }),
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ],
     Object.extend({ duration: 1.0,
      beforeSetupInternal: function(effect) {
        Position.absolutize(effect.effects[0].element);
      },
      afterFinishInternal: function(effect) {
         effect.effects[0].element.hide().setStyle(oldStyle); }
     }, arguments[1] || { })
   );
};

Effect.BlindUp = function(element) {
  element = $(element);
  element.makeClipping();
  return new Effect.Scale(element, 0,
    Object.extend({ scaleContent: false,
      scaleX: false,
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping();
      }
    }, arguments[1] || { })
  );
};

Effect.BlindDown = function(element) {
  element = $(element);
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping();
    }
  }, arguments[1] || { }));
};

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  return new Effect.Appear(element, Object.extend({
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      new Effect.Scale(effect.element, 1, {
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) {
          effect.element.makePositioned().makeClipping();
        },
        afterFinishInternal: function(effect) {
          effect.element.hide().undoClipping().undoPositioned().setStyle({opacity: oldOpacity});
        }
      });
    }
  }, arguments[1] || { }));
};

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }),
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.Shake = function(element) {
  element = $(element);
  var options = Object.extend({
    distance: 20,
    duration: 0.5
  }, arguments[1] || {});
  var distance = parseFloat(options.distance);
  var split = parseFloat(options.duration) / 10.0;
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') };
    return new Effect.Move(element,
      { x:  distance, y: 0, duration: split, afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance, y: 0, duration: split, afterFinishInternal: function(effect) {
        effect.element.undoPositioned().setStyle(oldStyle);
  }}); }}); }}); }}); }}); }});
};

Effect.SlideDown = function(element) {
  element = $(element).cleanWhitespace();
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: window.opera ? 0 : 1,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom}); }
    }, arguments[1] || { })
  );
};

Effect.SlideUp = function(element) {
  element = $(element).cleanWhitespace();
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, window.opera ? 0 : 1,
   Object.extend({ scaleContent: false,
    scaleX: false,
    scaleMode: 'box',
    scaleFrom: 100,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom});
    }
   }, arguments[1] || { })
  );
};

// Bug in opera makes the TD containing this element expand for a instance after finish
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, {
    restoreAfterFinish: true,
    beforeSetup: function(effect) {
      effect.element.makeClipping();
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping();
    }
  });
};

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var initialMoveX, initialMoveY;
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0;
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }

  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01,
    beforeSetup: function(effect) {
      effect.element.hide().makeClipping().makePositioned();
    },
    afterFinishInternal: function(effect) {
      new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width },
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               effect.effects[0].element.setStyle({height: '0px'}).show();
             },
             afterFinishInternal: function(effect) {
               effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle);
             }
           }, options)
      );
    }
  });
};

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }

  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({
         beforeStartInternal: function(effect) {
           effect.effects[0].element.makePositioned().makeClipping();
         },
         afterFinishInternal: function(effect) {
           effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle); }
       }, options)
  );
};

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || { },
    oldOpacity = element.getInlineOpacity(),
    transition = options.transition || Effect.Transitions.linear,
    reverser   = function(pos){
      return 1 - transition((-Math.cos((pos*(options.pulses||5)*2)*Math.PI)/2) + .5);
    };

  return new Effect.Opacity(element,
    Object.extend(Object.extend({  duration: 2.0, from: 0,
      afterFinishInternal: function(effect) { effect.element.setStyle({opacity: oldOpacity}); }
    }, options), {transition: reverser}));
};

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  element.makeClipping();
  return new Effect.Scale(element, 5, Object.extend({
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    new Effect.Scale(element, 1, {
      scaleContent: false,
      scaleY: false,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping().setStyle(oldStyle);
      } });
  }}, arguments[1] || { }));
};

Effect.Morph = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      style: { }
    }, arguments[1] || { });

    if (!Object.isString(options.style)) this.style = $H(options.style);
    else {
      if (options.style.include(':'))
        this.style = options.style.parseStyle();
      else {
        this.element.addClassName(options.style);
        this.style = $H(this.element.getStyles());
        this.element.removeClassName(options.style);
        var css = this.element.getStyles();
        this.style = this.style.reject(function(style) {
          return style.value == css[style.key];
        });
        options.afterFinishInternal = function(effect) {
          effect.element.addClassName(effect.options.style);
          effect.transforms.each(function(transform) {
            effect.element.style[transform.style] = '';
          });
        };
      }
    }
    this.start(options);
  },

  setup: function(){
    function parseColor(color){
      if (!color || ['rgba(0, 0, 0, 0)','transparent'].include(color)) color = '#ffffff';
      color = color.parseColor();
      return $R(0,2).map(function(i){
        return parseInt( color.slice(i*2+1,i*2+3), 16 );
      });
    }
    this.transforms = this.style.map(function(pair){
      var property = pair[0], value = pair[1], unit = null;

      if (value.parseColor('#zzzzzz') != '#zzzzzz') {
        value = value.parseColor();
        unit  = 'color';
      } else if (property == 'opacity') {
        value = parseFloat(value);
        if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
          this.element.setStyle({zoom: 1});
      } else if (Element.CSS_LENGTH.test(value)) {
          var components = value.match(/^([\+\-]?[0-9\.]+)(.*)$/);
          value = parseFloat(components[1]);
          unit = (components.length == 3) ? components[2] : null;
      }

      var originalValue = this.element.getStyle(property);
      return {
        style: property.camelize(),
        originalValue: unit=='color' ? parseColor(originalValue) : parseFloat(originalValue || 0),
        targetValue: unit=='color' ? parseColor(value) : value,
        unit: unit
      };
    }.bind(this)).reject(function(transform){
      return (
        (transform.originalValue == transform.targetValue) ||
        (
          transform.unit != 'color' &&
          (isNaN(transform.originalValue) || isNaN(transform.targetValue))
        )
      );
    });
  },
  update: function(position) {
    var style = { }, transform, i = this.transforms.length;
    while(i--)
      style[(transform = this.transforms[i]).style] =
        transform.unit=='color' ? '#'+
          (Math.round(transform.originalValue[0]+
            (transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart() +
          (Math.round(transform.originalValue[1]+
            (transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart() +
          (Math.round(transform.originalValue[2]+
            (transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart() :
        (transform.originalValue +
          (transform.targetValue - transform.originalValue) * position).toFixed(3) +
            (transform.unit === null ? '' : transform.unit);
    this.element.setStyle(style, true);
  }
});

Effect.Transform = Class.create({
  initialize: function(tracks){
    this.tracks  = [];
    this.options = arguments[1] || { };
    this.addTracks(tracks);
  },
  addTracks: function(tracks){
    tracks.each(function(track){
      track = $H(track);
      var data = track.values().first();
      this.tracks.push($H({
        ids:     track.keys().first(),
        effect:  Effect.Morph,
        options: { style: data }
      }));
    }.bind(this));
    return this;
  },
  play: function(){
    return new Effect.Parallel(
      this.tracks.map(function(track){
        var ids = track.get('ids'), effect = track.get('effect'), options = track.get('options');
        var elements = [$(ids) || $$(ids)].flatten();
        return elements.map(function(e){ return new effect(e, Object.extend({ sync:true }, options)) });
      }).flatten(),
      this.options
    );
  }
});

Element.CSS_PROPERTIES = $w(
  'backgroundColor backgroundPosition borderBottomColor borderBottomStyle ' +
  'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth ' +
  'borderRightColor borderRightStyle borderRightWidth borderSpacing ' +
  'borderTopColor borderTopStyle borderTopWidth bottom clip color ' +
  'fontSize fontWeight height left letterSpacing lineHeight ' +
  'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+
  'maxWidth minHeight minWidth opacity outlineColor outlineOffset ' +
  'outlineWidth paddingBottom paddingLeft paddingRight paddingTop ' +
  'right textIndent top width wordSpacing zIndex');

Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;

String.__parseStyleElement = document.createElement('div');
String.prototype.parseStyle = function(){
  var style, styleRules = $H();
  if (Prototype.Browser.WebKit)
    style = new Element('div',{style:this}).style;
  else {
    String.__parseStyleElement.innerHTML = '<div style="' + this + '"></div>';
    style = String.__parseStyleElement.childNodes[0].style;
  }

  Element.CSS_PROPERTIES.each(function(property){
    if (style[property]) styleRules.set(property, style[property]);
  });

  if (Prototype.Browser.IE && this.include('opacity'))
    styleRules.set('opacity', this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);

  return styleRules;
};

if (document.defaultView && document.defaultView.getComputedStyle) {
  Element.getStyles = function(element) {
    var css = document.defaultView.getComputedStyle($(element), null);
    return Element.CSS_PROPERTIES.inject({ }, function(styles, property) {
      styles[property] = css[property];
      return styles;
    });
  };
} else {
  Element.getStyles = function(element) {
    element = $(element);
    var css = element.currentStyle, styles;
    styles = Element.CSS_PROPERTIES.inject({ }, function(results, property) {
      results[property] = css[property];
      return results;
    });
    if (!styles.opacity) styles.opacity = element.getOpacity();
    return styles;
  };
}

Effect.Methods = {
  morph: function(element, style) {
    element = $(element);
    new Effect.Morph(element, Object.extend({ style: style }, arguments[2] || { }));
    return element;
  },
  visualEffect: function(element, effect, options) {
    element = $(element);
    var s = effect.dasherize().camelize(), klass = s.charAt(0).toUpperCase() + s.substring(1);
    new Effect[klass](element, options);
    return element;
  },
  highlight: function(element, options) {
    element = $(element);
    new Effect.Highlight(element, options);
    return element;
  }
};

$w('fade appear grow shrink fold blindUp blindDown slideUp slideDown '+
  'pulsate shake puff squish switchOff dropOut').each(
  function(effect) {
    Effect.Methods[effect] = function(element, options){
      element = $(element);
      Effect[effect.charAt(0).toUpperCase() + effect.substring(1)](element, options);
      return element;
    };
  }
);

$w('getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles').each(
  function(f) { Effect.Methods[f] = Element[f]; }
);

Element.addMethods(Effect.Methods);
/* /assets/tapestry/5.1.0.4/tapestry.js */;
// Copyright 2007, 2008, 2009 The Apache Software Foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var Tapestry = {

    /** Event that allows observers to perform cross-form validation after individual
     *  fields have performed their validation. The form element is passed as the
     *  event memo. Observers may set the validationError property of the Form's Tapestry object to true (which
     *  will prevent form submission).
     */
    FORM_VALIDATE_EVENT : "tapestry:formvalidate",

    /** Event fired just before the form submits, to allow observers to make
     *  final preparations for the submission, such as updating hidden form fields.
     *  The form element is passed as the event memo.
     */
    FORM_PREPARE_FOR_SUBMIT_EVENT : "tapestry:formprepareforsubmit",

    /**
     *  Form event fired after prepare.
     */
    FORM_PROCESS_SUBMIT_EVENT : "tapestry:formprocesssubmit",

    /** Event, fired on a field element, to cause observers to validate the input. Passes a memo object with
     * two keys: "value" (the raw input value) and "translated" (the parsed value, usually meaning a number
     * parsed from a string).  Observers may invoke Element.showValidationMessage()
     *  to identify that the field is in error (and decorate the field and show a popup error message).
     */
    FIELD_VALIDATE_EVENT : "tapestry:fieldvalidate",

    /** Event, fired on the document object, which identifies the current focus input element. */
    FOCUS_CHANGE_EVENT : "tapestry:focuschange",

    /** Event, fired on a zone element when the zone is updated with new content. */
    ZONE_UPDATED_EVENT : "tapestry:zoneupdated",

    /** When false, the default, the Tapestry.debug() function will be a no-op. */
    DEBUG_ENABLED : false,

    /** Time, in seconds, that console messages are visible. */
    CONSOLE_DURATION : 10,

    // Initially, false, set to true once the page is fully loaded.

    pageLoaded : false,

    /**
     * Invoked from onclick event handlers built into links and forms. Raises a dialog
     * if the page is not yet fully loaded.
     */
    waitForPage : function(event)
    {
        if (Tapestry.pageLoaded) return;

        Event.extend(event || window.event).stop();

        var body = $(document.body);

        // The overlay is stretched to cover the full screen (including scrolling areas)
        // and is used to fade out the background ... and prevent keypresses (its z-order helps there).

        var overlay = new Element("div", {
            'class' : 't-dialog-overlay'
        });
        overlay.setOpacity(0.0);

        body.insert({
            top: overlay
        });

        new Effect.Appear(overlay, {
            duration: 0.2,
            from: 0.0
        });

        var messageDiv = new Element("div", {
            'class' : 't-page-loading-banner'
        }).update(Tapestry.Messages.pageIsLoading);
        overlay.insert({
            top: messageDiv
        });

        var hideDialog = function()
        {
            new Effect.Fade(overlay, {
                duration: 0.2,
                afterFinish: function()
                {
                    overlay.remove();
                }
            });
        };

        document.observe("dom:loaded", hideDialog);

        // A rare race condition.

        if (Tapestry.pageLoaded)
            hideDialog.call(null);
    },


    // Adds a callback function that will be invoked when the DOM is loaded (which
    // occurs *before* window.onload, which has to wait for images and such to load
    // first.  This simply observes the dom:loaded event on the document object (support for
    // which is provided by Prototype).
    onDOMLoaded : function(callback)
    {
        document.observe("dom:loaded", callback);
    },

    /** Find all elements marked with the "t-invisible" CSS class and hide()s them, so that
     * Prototype's visible() method operates correctly. In addition,
     * finds form control elements and adds additional listeners to them to support
     * form field input validation.
     *
     * <p>This is invoked when the
     * DOM is first loaded, and AGAIN whenever dynamic content is loaded via the Zone
     * mechanism.
     */
    onDomLoadedCallback : function()
    {
        // Turn off click & submit protection inside Tapestry.waitForPage().

        Tapestry.pageLoaded = true;

        Tapestry.ScriptManager.initialize();

        $$(".t-invisible").each(function(element)
        {
            element.hide();
            element.removeClassName("t-invisible");
        });

        // Adds a focus observer that fades all error popups except for the
        // field in question.

        $$("INPUT", "SELECT", "TEXTAREA").each(function(element)
        {
            // Due to Ajax, we may execute the callback multiple times,
            // and we don't want to add multiple listeners to the same
            // element.

            var t = $T(element);

            if (! t.observingFocusChange)
            {
                element.observe("focus", function()
                {
                    if (element != Tapestry.currentFocusField)
                    {
                        document.fire(Tapestry.FOCUS_CHANGE_EVENT, element);

                        Tapestry.currentFocusField = element;
                    }
                });

                t.observingFocusChange = true;
            }
        });

        // When a submit element is clicked, record the name of the element
        // on the associated form. This is necessary for some Ajax processing,
        // see TAPESTRY-2324.

        $$("INPUT[type=submit]").each(function(element)
        {
            var t = $T(element);

            if (!t.trackingClicks)
            {
                element.observe("click", function()
                {
                    $T(element.form).lastSubmit = element;
                });

                t.trackingClicks = true;
            }
        });
    },

    /* Generalized initialize function for Tapestry, used to help minimize the amount of JavaScript
     * for the page by removing redundancies such as repeated Object and method names. The spec
     * is a hash whose keys are the names of methods of the Tapestry.Initializer object.
     * The value is an array of arrays.  The outer arrays represent invocations
     * of the method.  The inner array are the parameters for each invocation.
     * As an optimization, the inner value may not be an array but instead
     * a single value.
     */
    init : function(spec)
    {
        $H(spec).each(function(pair)
        {
            var functionName = pair.key;

            var initf = Tapestry.Initializer[functionName];

            if (initf == undefined)
            {
                Tapestry.error(Tapestry.Messages.missingInitializer, {
                    name:functionName
                });
                return;
            }

            pair.value.each(function(parameterList)
            {
                if (! Object.isArray(parameterList))
                {
                    parameterList = [
                        parameterList
                    ];
                }

                initf.apply(this, parameterList);
            });
        });
    },

    /** Formats and displays an error message on the console. */
    error : function (message, substitutions)
    {
        Tapestry.invokeLogger(message, substitutions, Tapestry.Logging.error);
    },

    /** Formats and displays a warning on the console. */
    warn : function (message, substitutions)
    {
        Tapestry.invokeLogger(message, substitutions, Tapestry.Logging.warn);
    },

    /** Formats and displays a debug message on the console. */
    debug : function (message, substitutions)
    {
        Tapestry.invokeLogger(message, substitutions, Tapestry.Logging.debug);
    },

    invokeLogger : function(message, substitutions, loggingFunction)
    {
        if (substitutions != undefined)
            message = message.interpolate(substitutions);

        loggingFunction.call(this, message);
    },

    /**
     * Passed the JSON content of a Tapestry partial markup response, extracts
     * the script and stylesheet information.  JavaScript libraries and stylesheets are loaded,
     * then the callback is invoked.  All three keys are optional:
     * <dl>
     * <dt>redirectURL</dt> <dd>URL to redirect to (in which case, the callback is not invoked)</dd>
     * <dt>scripts</dt><dd>Array of strings (URIs of scripts)</dd>
     * <dt>stylesheets</dt><dd>Array of hashes, each hash has key href and optional key media</dd>
     *
     * @param reply JSON response object from the server
     * @param callback function invoked after the scripts have all loaded (presumably, to update the DOM)
     */
    loadScriptsInReply : function(reply, callback)
    {
        var redirectURL = reply.redirectURL;

        if (redirectURL)
        {
            // Check for complete URL.
            if (/^https?:/.test(redirectURL))
            {
                window.location = redirectURL;
                return;
            }

            window.location.pathname = redirectURL;

            // Don't bother loading scripts or invoking the callback.

            return;
        }

        Tapestry.ScriptManager.addStylesheets(reply.stylesheets);

        Tapestry.ScriptManager.addScripts(reply.scripts,
                function()
                {
                    callback.call(this);

                    // After the callback updates the DOM
                    // (presumably), continue on with
                    // evaluating the reply.script
                    // and other final steps.

                    if (reply.script) eval(reply.script);

                    Tapestry.onDomLoadedCallback();

                });
    },

    /**
     * Default function for handling Ajax-related failures.
     */
    ajaxFailureHandler : function(response)
    {
        var message = response.getHeader("X-Tapestry-ErrorMessage");

        Tapestry.error("Communication with the server failed: " + message);

        Tapestry.debug(Tapestry.Messages.ajaxFailure + message, response);
    },

    /**
     * Processes a typical Ajax request for a URL invoking the provided handler on success.
     * On failure, error() is invoked to inform the user.
     *
     * @param url of Ajax request
     * @param successHandler to invoke on success
     * @return the Ajax.Request object
     */
    ajaxRequest : function(url, successHandler)
    {
        return new Ajax.Request(url, {
            onSuccess: function(response, jsonResponse)
            {
                // When the page is unloaded, pending Ajax requests appear to terminate
                // as succesful (but with no reply value). Since we're trying to navigate
                // to a new page anyway, we just ignore those false success callbacks.
                // We have a listener for the window's "beforeunload" event that sets
                // this flag.

                if (Tapestry.windowUnloaded)
                    return;

                if (! response.request.success())
                {
                    Tapestry.error(Tapestry.Messages.ajaxRequestUnsuccessful);
                    return;
                }

                try
                {
                    // Re-invoke the success handler, capturing any exceptions.
                    successHandler.call(this, response, jsonResponse);
                }
                catch (e)
                {
                    Tapestry.error(Tapestry.Messages.clientException + e);
                }
            },
            onException: Tapestry.ajaxFailureHandler,
            onFailure: Tapestry.ajaxFailureHandler
        });
    },

    /** Obtains the Tapestry.ZoneManager object associated with a triggering element
     * (an <a> or <form>) configured to update a zone. Writes errors to the AjaxConsole
     * if the zone and ZoneManager can not be resolved.
     *
     * @param element   triggering element (id or instance)
     * @return Tapestry.ZoneManager instance for updated zone, or null if not found.
     */
    findZoneManager : function(element)
    {
        var zoneId = $T(element).zoneId;

        return Tapestry.findZoneManagerForZone(zoneId);
    },

    /**
     * Obtains the Tapestry.ZoneManager object associated with a zone element (usually
     * a <div>). Writes errors to the Ajax console if the element or manager
     * can not be resolved.
     * @param zoneElement  zone element (id or instance)
     * @return Tapestry.ZoneManager instance for zone, or null if not found
     */
    findZoneManagerForZone : function(zoneElement)
    {
        var element = $(zoneElement);

        if (!zoneElement)
        {
            Tapestry.error(Tapestry.Messages.missingZone, {
                id:zoneElement
            });
            return null;
        }

        var manager = $T(zoneElement).zoneManager;

        if (!manager)
        {
            Tapestry.error(Tapestry.Messages.noZoneManager, element);
            return null;
        }

        return manager;
    },

    /**
     * Used to reconstruct a complete URL from a path that is (or may be) relative to window.location.
     * This is used when determining if a JavaScript library or CSS stylesheet has already been loaded.
     * Recognizes complete URLs (which are returned unchanged), otherwise the URLs are expected to be
     * absolute paths.
     *
     * @param path
     * @return complete URL as string
     */
    rebuildURL : function(path)
    {
        if (path.match(/^https?:/))
        {
            return path;
        }

        if (! path.startsWith("/"))
        {
            Tapestry.error(Tapestry.Messages.pathDoesNotStartWithSlash, {
                path: path
            });

            return path;
        }

        var l = window.location;
        return l.protocol + "//" + l.host + path;
    },

    stripToLastSlash : function(URL)
    {
        var slashx = URL.lastIndexOf("/");

        return URL.substring(0, slashx + 1);
    },

    /**
     * Convert a user-provided localized number to an ordinary number (not a string).
     * Removes seperators and leading/trailing whitespace. Disallows the decimal point if isInteger is true.
     * @param number string provided by user
     * @param isInteger if true, disallow decimal point
     */
    formatLocalizedNumber : function(number, isInteger)
    {
        // We convert from localized string to a canonical string,
        // stripping out  group seperators (normally commas). If isInteger is
        // true, we don't allow a decimal point.

        var minus = Tapestry.decimalFormatSymbols.minusSign;
        var grouping = Tapestry.decimalFormatSymbols.groupingSeparator;
        var decimal = Tapestry.decimalFormatSymbols.decimalSeparator;

        var canonical = "";

        number.strip().toArray().each(function(ch)
        {
            if (ch == minus)
            {
                canonical += "-";
                return;
            }

            if (ch == grouping)
            {
                return;
            }

            if (ch == decimal)
            {
                if (isInteger) throw Tapestry.Messages.notAnInteger;

                ch = ".";
            }
            else if (ch < "0" || ch > "9") throw Tapestry.Messages.invalidCharacter;

            canonical += ch;
        });

        return Number(canonical);
    },

    /**
     * Marks a number of script libraries as loaded; this is used with virtual scripts (which combine multiple
     * actual scripts). This is necessary so that subsequent Ajax requests do not load scripts that have
     * already been loaded
     * @param scripts     array of script paths
     */
    markScriptLibrariesLoaded : function(scripts)
    {
        $(scripts).each(function (script)
        {
            var complete = Tapestry.rebuildURL(script);
            Tapestry.ScriptManager.virtualScripts.push(complete);
        });
    }
};


Element.addMethods(
{

    /**
     * Works upward from the element, checking to see if the element is visible. Returns false
     * if it finds an invisible container. Returns true if it makes it as far as a (visible) FORM element.
     *
     * Note that this only applies to the CSS definition of visible; it doesn't check that the element
     * is scolled into view.
     *
     * @param element to search up from
     * @return true if visible (and containers visible), false if it or container are not visible
     */
    isDeepVisible : function(element)
    {
        var current = $(element);

        while (true)
        {
            if (! current.visible()) return false;

            if (current.tagName == "FORM") break;

            current = $(current.parentNode)
        }

        return true;
    }
});

Element.addMethods('FORM',
{
    /**
     * Gets or creates the Tapestry.FormEventManager for the form.
     *
     * @param form form element
     */
    getFormEventManager : function(form)
    {
        form = $(form);
        var t = $T(form);

        var manager = t.formEventManager;

        if (manager == undefined)
        {
            manager = new Tapestry.FormEventManager(form);
            t.formEventManager = manager;
        }

        return manager;
    },

    /**
     * Sends an Ajax request to the Form's action. This encapsulates
     * a few things, such as a default onFailure handler, and working
     * around bugs/features in Prototype concerning how
     * submit buttons are processed.
     *
     * @param form used to define the data to be sent in the request
     * @param options      standard Prototype Ajax Options
     * @return Ajax.Request the Ajax.Request created for the request
     */
    sendAjaxRequest : function (form, url, options)
    {
        form = $(form);

        // Generally, options should not be null or missing,
        // because otherwise there's no way to provide any callbacks!

        options = Object.clone(options || { });

        // Set a default failure handler if none is provided.

        options.onFailure |= Tapestry.ajaxFailureHandler;

        // Find the elements, skipping over any submit buttons.
        // This works around bugs in Prototype 1.6.0.2.

        var elements = form.getElements().reject(function(e)
        {
            return e.tagName == "INPUT" && e.type == "submit";
        });

        var hash = Form.serializeElements(elements, true);

        var lastSubmit = $T(form).lastSubmit;

        // Put the last submit clicked into the hash, emulating
        // what a normal form submit would do.

        if (lastSubmit && lastSubmit.name)
        {
            hash[lastSubmit.name] = $F(lastSubmit);
        }


        // Copy the parameters in, overwriting field values,
        // because Prototype 1.6.0.2 does not.

        Object.extend(hash, options.parameters);

        options.parameters = hash;

        // Ajax.Request will convert the hash into a query string and post it.

        return new Ajax.Request(url, options);
    }
});

Element.addMethods([
    'INPUT',
    'SELECT',
    'TEXTAREA'
],
{
    /**
     * Invoked on a form element (INPUT, SELECT, etc.), gets or creates the
     * Tapestry.FieldEventManager for that field.
     *
     * @param field field element
     */
    getFieldEventManager : function(field)
    {
        field = $(field);
        var t = $T(field);

        var manager = t.fieldEventManager;

        if (manager == undefined)
        {
            manager = new Tapestry.FieldEventManager(field);
            t.fieldEventManager = manager;
        }

        return manager;
    },

    /**
     * Obtains the Tapestry.FieldEventManager and asks it to show
     * the validation message.   Sets the  validationError property of the elements tapestry object to true.
     * @param element
     * @param message to display
     */
    showValidationMessage : function(element, message)
    {
        element = $(element);

        element.getFieldEventManager().showValidationMessage(message);

        return element;
    },

    /**
     * Removes any validation decorations on the field, and
     * hides the error popup (if any) for the field.
     */
    removeDecorations : function(element)
    {
        $(element).getFieldEventManager().removeDecorations();

        return element;
    },


    /**
     * Adds a standard validator for the element, an observer of
     * Tapestry.FIELD_VALIDATE_EVENT. The validator function will be
     * passed the current field value and should throw an error message if
     * the field's value is not valid.
     * @param element field element to validate
     * @param validator function to be passed the field value
     */
    addValidator : function(element, validator)
    {
        element.observe(Tapestry.FIELD_VALIDATE_EVENT, function(event)
        {
            try
            {
                validator.call(this, event.memo.translated);
            }
            catch (message)
            {
                element.showValidationMessage(message);
            }
        });

        return element;
    }
});

/** Container of functions that may be invoked by the Tapestry.init() function. */
Tapestry.Initializer = {

    ajaxFormLoop : function(spec)
    {
        var rowInjector = $(spec.rowInjector);

        $(spec.addRowTriggers).each(function(triggerId)
        {
            $(triggerId).observe("click", function(event)
            {
                $(rowInjector).trigger();

                Event.stop(event);
            })
        });
    },

    formLoopRemoveLink : function(spec)
    {
        var link = $(spec.link);
        var fragmentId = spec.fragment;

        link.observe("click", function(event)
        {
            Event.stop(event);

            var successHandler = function(transport)
            {
                var container = $(fragmentId);
                var fragment = $T(container).formFragment;

                if (fragment != undefined)
                {
                    fragment.hideAndRemove();
                }
                else
                {
                    var effect = Tapestry.ElementEffect.fade(container);

                    effect.options.afterFinish = function()
                    {
                        container.remove();
                    };
                }
            }

            Tapestry.ajaxRequest(spec.url, successHandler);
        });
    },


    /**
     * Convert a form or link into a trigger of an Ajax update that
     * updates the indicated Zone.
     * @param element id or instance of <form> or <a> element
     * @param zoneId id of the element to update when link clicked or form submitted
     * @param url absolute component event request URL
     */
    linkZone : function(element, zoneId, url)
    {
        element = $(element);

        // Update the element with the id of zone div. This may be changed dynamically on the client
        // side.

        $T(element).zoneId = zoneId;

        if (element.tagName == "FORM")
        {
            // Turn normal form submission off.

            element.getFormEventManager().preventSubmission = true;

            // After the form is validated and prepared, this code will
            // process the form submission via an Ajax call.  The original submit event
            // will have been cancelled.

            element.observe(Tapestry.FORM_PROCESS_SUBMIT_EVENT, function()
            {
                var zoneManager = Tapestry.findZoneManager(element);

                if (!zoneManager) return;

                var successHandler = function(transport)
                {
                    zoneManager.processReply(transport.responseJSON);
                };

                element.sendAjaxRequest(url, {
                    onSuccess : successHandler
                });
            });

            return;
        }

        // Otherwise, assume it's just an ordinary link.

        element.observe("click", function(event)
        {
            Event.stop(event);

            var zoneObject = Tapestry.findZoneManager(element);

            if (!zoneObject) return;

            zoneObject.updateFromURL(url);
        });
    },

    validate : function (field, specs)
    {
        field = $(field);

        // Force the creation of the form and field event managers.

        $(field.form).getFormEventManager();
        $(field).getFieldEventManager();

        specs.each(function(spec)
        {
            // spec is a 2 or 3 element array.
            // validator function name, message, optional constraint

            var name = spec[0];
            var message = spec[1];
            var constraint = spec[2];

            var vfunc = Tapestry.Validator[name];

            if (vfunc == undefined)
            {
                Tapestry.error(Tapestry.Messages.missingValidator, {
                    name:name,
                    fieldName:field.id
                });
                return;
            }

            // Pass the extend field, the provided message, and the constraint object
            // to the Tapestry.Validator function, so that it can, typically, invoke
            // field.addValidator().

            vfunc.call(this, field, message, constraint);
        });
    },

    zone : function(spec)
    {
        new Tapestry.ZoneManager(spec);
    },

    formFragment : function(spec)
    {
        new Tapestry.FormFragment(spec)
    },

    formInjector : function(spec)
    {
        new Tapestry.FormInjector(spec);
    },

    // Links a FormFragment to a trigger (a radio or a checkbox), such that changing the trigger will hide
    // or show the FormFragment. Care should be taken to render the page with the
    // checkbox and the FormFragment('s visibility) in agreement.

    linkTriggerToFormFragment : function(trigger, element)
    {
        trigger = $(trigger);

        if (trigger.type == "radio")
        {
            $(trigger.form).observe("click", function()
            {
                $T(element).formFragment.setVisible(trigger.checked);
            });

            return;
        }

        // Otherwise, we assume it is a checkbox.  The difference is
        // that we can observe just the single checkbox element,
        // rather than handling clicks anywhere in the form (as with
        // the radio).

        trigger.observe("click", function()
        {
            $T(element).formFragment.setVisible(trigger.checked);
        });

    }
};

// Collection of field based functions related to validation. Each
// function takes a field, a message and an optional constraint value.
// Some functions are related to Translators and work on the format event,
// other's are from Validators and work on the validate event.

Tapestry.Validator = {

    required : function(field, message)
    {
        $(field).getFieldEventManager().requiredCheck = function(value)
        {
            if (value.strip() == '')
                $(field).showValidationMessage(message);
        };
    },

    /** Supplies a client-side numeric translator for the field. */
    numericformat : function (field, message, isInteger)
    {
        $(field).getFieldEventManager().translator = function(input)
        {
            try
            {
                return Tapestry.formatLocalizedNumber(input, isInteger);
            }
            catch (e)
            {
                $(field).showValidationMessage(message);
            }
        };
    },

    minlength : function(field, message, length)
    {
        field.addValidator(function(value)
        {
            if (value.length < length) throw message;
        });
    },

    maxlength : function(field, message, maxlength)
    {
        field.addValidator(function(value)
        {
            if (value.length > maxlength) throw message;
        });
    },

    min : function(field, message, minValue)
    {
        field.addValidator(function(value)
        {
            if (value < minValue) throw message;
        });
    },

    max : function(field, message, maxValue)
    {
        field.addValidator(function(value)
        {
            if (value > maxValue) throw message;
        });
    },

    regexp : function(field, message, pattern)
    {
        var regexp = new RegExp(pattern);

        field.addValidator(function(value)
        {
            if (! regexp.test(value)) throw message;
        });
    }
};

Tapestry.ErrorPopup = Class.create({

    // If the images associated with the error popup are overridden (by overriding Tapestry's default.css stylesheet),
    // then some of these values may also need to be adjusted.

    BUBBLE_VERT_OFFSET : -34,

    BUBBLE_HORIZONTAL_OFFSET : -20,

    BUBBLE_WIDTH: "auto",

    BUBBLE_HEIGHT: "39px",

    initialize : function(field)
    {
        this.field = $(field);

        this.innerSpan = new Element("span");
        this.outerDiv = $(new Element("div", {
            'id' : this.field.id + ":errorpopup",
            'class' : 't-error-popup'
        })).update(this.innerSpan).hide();

        var body = $(document.body);

        body.insert({
            bottom: this.outerDiv
        });

        this.outerDiv.absolutize();

        this.outerDiv.observe("click", function(event)
        {
            this.ignoreNextFocus = true;

            this.stopAnimation();

            this.outerDiv.hide();

            this.field.activate();

            Event.stop(event);  // Should be domevent.stop(), but that fails under IE
        }.bindAsEventListener(this));

        this.queue = {
            position: 'end',
            scope: this.field.id
        };

        Event.observe(window, "resize", this.repositionBubble.bind(this));

        document.observe(Tapestry.FOCUS_CHANGE_EVENT, function(event)
        {
            if (this.ignoreNextFocus)
            {
                this.ignoreNextFocus = false;
                return;
            }

            if (event.memo == this.field)
            {
                this.fadeIn();
                return;
            }

            // If this field is not the focus field after a focus change, then it's bubble,
            // if visible, should fade out. This covers tabbing from one form to another. 
            this.fadeOut();

        }.bind(this));
    },

    showMessage : function(message)
    {
        this.stopAnimation();

        this.innerSpan.update(message);

        this.hasMessage = true;

        this.fadeIn();
    },

    repositionBubble : function()
    {
        var fieldPos = this.field.cumulativeOffset();

        this.outerDiv.setStyle({
            top: (fieldPos[1] + this.BUBBLE_VERT_OFFSET) + "px",
            left: (fieldPos[0] + this.BUBBLE_HORIZONTAL_OFFSET) + "px",
            width: this.BUBBLE_WIDTH,
            height: this.BUBBLE_HEIGHT
        });
    },

    fadeIn : function()
    {
        if (! this.hasMessage) return;

        this.repositionBubble();

        if (this.animation) return;

        this.animation = new Effect.Appear(this.outerDiv, {
            queue: this.queue,
            afterFinish: function()
            {
                this.animation = null;

                if (this.field != Tapestry.currentFocusField)
                    this.fadeOut();
            }.bind(this)
        });
    },

    stopAnimation : function()
    {
        if (this.animation) this.animation.cancel();

        this.animation = null;
    },

    fadeOut : function ()
    {
        if (this.animation) return;

        this.animation = new Effect.Fade(this.outerDiv, {
            queue : this.queue,
            afterFinish: function()
            {
                this.animation = null;
            }.bind(this)
        });
    },

    hide : function()
    {
        this.hasMessage = false;

        this.stopAnimation();

        this.outerDiv.hide();
    }
});

Tapestry.FormEventManager = Class.create({

    initialize : function(form)
    {
        this.form = $(form);

        this.form.onsubmit = this.handleSubmit.bindAsEventListener(this);
    },

    handleSubmit : function(domevent)
    {
        var t = $T(this.form);

        t.validationError = false;

        var firstErrorField = null;

        // Locate elements that have an event manager (and therefore, validations)
        // and let those validations execute, which may result in calls to recordError().


        this.form.getElements().each(function(element)
        {
            var fem = $T(element).fieldEventManager;

            if (fem != undefined)
            {
                // Ask the FEM to validate input for the field, which fires
                // a number of events.
                var error = fem.validateInput();

                if (error && ! firstErrorField)
                {
                    firstErrorField = element;
                }
            }
        });

        // Allow observers to validate the form as a whole.  The FormEvent will be visible
        // as event.memo.  The Form will not be submitted if event.result is set to false (it defaults
        // to true).  Still trying to figure out what should get focus from this
        // kind of event.

        this.form.fire(Tapestry.FORM_VALIDATE_EVENT, this.form);

        if (t.validationError)
        {
            Event.stop(domevent); // Should be domevent.stop(), but that fails under IE

            if (firstErrorField) firstErrorField.activate();

            // Because the submission failed, the last submit property is cleared,
            // since the form may be submitted for some other reason later.

            t.lastSubmit = null;

            return false;
        }

        this.form.fire(Tapestry.FORM_PREPARE_FOR_SUBMIT_EVENT, this.form);

        // This flag can be set to prevent the form from submitting normally.
        // This is used for some Ajax cases where the form submission must
        // run via Ajax.Request.

        if (this.preventSubmission)
        {
            // Prevent the normal submission.

            Event.stop(domevent);

            // Instead ...

            this.form.fire(Tapestry.FORM_PROCESS_SUBMIT_EVENT);

            return false;
        }

        // Validation is OK, not doing Ajax, continue as planned.

        return true;
    }
});

Tapestry.FieldEventManager = Class.create({

    initialize : function(field)
    {
        this.field = $(field);

        var id = this.field.id;
        this.label = $(id + '-label');
        this.icon = $(id + '-icon');

        this.translator = Prototype.K;

        document.observe(Tapestry.FOCUS_CHANGE_EVENT, function(event)
        {
            // If changing focus *within the same form* then
            // perform validation.  Note that Tapestry.currentFocusField does not change
            // until after the FOCUS_CHANGE_EVENT notification.

            if (Tapestry.currentFocusField == this.field &&
                this.field.form == event.memo.form)
                this.validateInput();

        }.bindAsEventListener(this));
    },


    /** Removes validation decorations if present. Hides the ErrorPopup,
     *  if it exists.
     */
    removeDecorations : function()
    {
        this.field.removeClassName("t-error");

        if (this.label)
            this.label.removeClassName("t-error");

        if (this.icon)
            this.icon.hide();

        if (this.errorPopup)
            this.errorPopup.hide();
    },


    /**
     * Show a validation error message, which will add decorations to the
     * field and it label, make the icon visible, and raise the
     * field's Tapestry.ErrorPopup to show the message.
     * @param message validation message to display
     */
    showValidationMessage : function(message)
    {
        $T(this.field).validationError = true;
        $T(this.field.form).validationError = true;

        this.field.addClassName("t-error");

        if (this.label)
            this.label.addClassName("t-error");

        if (this.icon)
        {
            if (! this.icon.visible())
                new Effect.Appear(this.icon);
        }

        if (this.errorPopup == undefined)
            this.errorPopup = new Tapestry.ErrorPopup(this.field);

        this.errorPopup.showMessage(message);
    },

    /**
     * Invoked when a form is submitted, or when leaving a field, to perform
     * field validations. Field validations are skipped for disabled fields.
     * If all validations are succesful, any decorations are removed. If any validation
     * fails, an error popup is raised for the field, to display the validation
     * error message.
     *
     * @return true if the field has a validation error
     */
    validateInput : function()
    {
        if (this.field.disabled) return false;

        if (! this.field.isDeepVisible()) return false;

        var t = $T(this.field);

        var value = $F(this.field);

        t.validationError = false;

        if (this.requiredCheck)
            this.requiredCheck.call(this, value);

        // Don't try to validate blank values; if the field is required, that error is already
        // noted and presented to the user.

        if (!t.validationError && ! value.blank())
        {
            var translated = this.translator(value);

            // If Format went ok, perhaps do the other validations.

            if (! t.validationError)
            {
                this.field.fire(Tapestry.FIELD_VALIDATE_EVENT, {
                    value: value,
                    translated: translated
                });
            }
        }

        // Lastly, if no validation errors were found, remove the decorations.

        if (! t.validationError)
            this.field.removeDecorations();

        return t.validationError;
    }
});

// Wrappers around Prototype and Scriptaculous effects.
// All the functions of this object should have all-lowercase names.
// The methods all return the Effect object they create.

Tapestry.ElementEffect = {

    /** Fades in the element. */
    show : function(element)
    {
        return new Effect.Appear(element);
    },

    /** The classic yellow background fade. */
    highlight : function(element)
    {
        return new Effect.Highlight(element);
    },

    /** Scrolls the content down. */
    slidedown : function (element)
    {
        return new Effect.SlideDown(element);
    },

    /** Slids the content back up (opposite of slidedown). */
    slideup : function(element)
    {
        return new Effect.SlideUp(element);
    },

    /** Fades the content out (opposite of show). */
    fade : function(element)
    {
        return new Effect.Fade(element);
    }
};


/**
 * Manages a &lt;div&lt; (or other element) for dynamic updates.
 *
 */
Tapestry.ZoneManager = Class.create({
    // spec are the parameters for the Zone:
    // trigger: required -- name or instance of link.
    // element: required -- name or instance of div element to be shown, hidden and updated
    // show: name of Tapestry.ElementEffect function used to reveal the zone if hidden
    // update: name of Tapestry.ElementEffect function used to highlight the zone after it is updated
    initialize: function(spec)
    {
        if (Object.isString(spec))
            spec = {
                element: spec
            }

        this.element = $(spec.element);
        this.showFunc = Tapestry.ElementEffect[spec.show] || Tapestry.ElementEffect.show;
        this.updateFunc = Tapestry.ElementEffect[spec.update] || Tapestry.ElementEffect.highlight;

        // Link the div back to this zone.

        $T(this.element).zoneManager = this;

        // Look inside the managed element for another element with the CSS class "t-zone-update".
        // If present, then this is the element whose content will be changed, rather
        // then the entire zone's element.  This allows a Zone element to contain "wrapper" markup
        // (borders and such).  Typically, such a Zone element will initially be invisible.
        // The show and update functions apply to the Zone element, not the update element.

        var updates = this.element.select(".t-zone-update");

        this.updateElement = updates.first() || this.element;
    },

    // Updates the content of the div controlled by this Zone, then
    // invokes the show function (if not visible) or the update function (if visible),

    /**
     * Updates the zone's content, and invokes either the update function (to highlight the change)
     * or the show function (to reveal a hidden element). Lastly, fires the Tapestry.ZONE_UPDATED_EVENT
     * to let listeners know that the zone was updated.
     * @param content
     */
    show: function(content)
    {
        this.updateElement.update(content);

        var func = this.element.visible() ? this.updateFunc : this.showFunc;

        func.call(this, this.element);

        this.element.fire(Tapestry.ZONE_UPDATED_EVENT);
    },

    /**
     * Invoked with a reply (i.e., transport.responseJSON), this updates the managed element
     * and processes any JavaScript in the reply.  The response should have a
     * content key, and may have  script, scripts and stylesheets keys.
     * @param reply response in JSON format appropriate to a Tapestry.Zone
     */
    processReply : function(reply)
    {
        Tapestry.loadScriptsInReply(reply, function()
        {
            // In a multi-zone update, the reply.content may be blank or missing.

            reply.content && this.show(reply.content);

            // zones is an object of zone ids and zone content that will be present
            // in a multi-zone update response.

            Object.keys(reply.zones).each(function (zoneId)
            {
                var manager = Tapestry.findZoneManagerForZone(zoneId);

                if (manager)
                {
                    var zoneContent = reply.zones[zoneId];
                    manager.show(zoneContent);
                }
            });
        }.bind(this));
    },

    /** Initiates an Ajax request to update this zone by sending a request
     *  to the URL. Expects the correct JSON reply (wth keys content, etc.).
     * @param URL component event request URL
     */
    updateFromURL : function (URL)
    {
        var successHandler = function(transport)
        {
            this.processReply(transport.responseJSON);
        }.bind(this);

        Tapestry.ajaxRequest(URL, successHandler);
    }
});

// A class that managed an element (usually a <div>) that is conditionally visible and
// part of the form when visible.

Tapestry.FormFragment = Class.create({

    initialize: function(spec)
    {
        if (Object.isString(spec))
            spec = {
                element: spec
            };

        this.element = $(spec.element);

        $T(this.element).formFragment = this;

        this.hidden = $(spec.element + ":hidden");

        this.showFunc = Tapestry.ElementEffect[spec.show] || Tapestry.ElementEffect.slidedown;
        this.hideFunc = Tapestry.ElementEffect[spec.hide] || Tapestry.ElementEffect.slideup;

        var form = $(this.hidden.form);

        // TAP5-283: Force creation of the FormEventManager if it does not already exist.

        form.getFormEventManager();

        $(form).observe(Tapestry.FORM_PREPARE_FOR_SUBMIT_EVENT, function()
        {
            // On a submission, if the fragment is not visible, then wipe out its
            // form submission data, so that no processing or validation occurs on the server.

            if (! this.element.isDeepVisible())
                this.hidden.value = "";
        }.bind(this));
    },

    hide : function()
    {
        if (this.element.visible())
            this.hideFunc(this.element);
    },

    hideAndRemove : function()
    {
        var effect = this.hideFunc(this.element);

        effect.options.afterFinish = function()
        {
            this.element.remove();
        }.bind(this);
    },

    show : function()
    {
        if (! this.element.visible())
            this.showFunc(this.element);
    },

    toggle : function()
    {
        this.setVisible(! this.element.visible());
    },

    setVisible : function(visible)
    {
        if (visible)
        {
            this.show();
            return;
        }

        this.hide();
    }
});

Tapestry.FormInjector = Class.create({

    initialize: function(spec)
    {
        this.element = $(spec.element);
        this.url = spec.url;
        this.below = spec.below;

        this.showFunc = Tapestry.ElementEffect[spec.show] || Tapestry.ElementEffect.highlight;

        this.element.trigger = function()
        {
            var successHandler = function(transport)
            {
                var reply = transport.responseJSON;

                // Clone the FormInjector element (usually a div)
                // to create the new element, that gets inserted
                // before or after the FormInjector's element.

                var newElement = new Element(this.element.tagName, {
                    'class' : this.element.className
                });

                // Insert the new element before or after the existing element.

                var param = { };
                param[this.below ? "after" : "before"] = newElement;

                Tapestry.loadScriptsInReply(reply, function()
                {
                    // Add the new element with the downloaded content.

                    this.element.insert(param);

                    // Update the empty element with the content from the server

                    newElement.update(reply.content);

                    newElement.id = reply.elementId;

                    // Add some animation to reveal it all.

                    this.showFunc(newElement);
                }.bind(this));
            }.bind(this);

            Tapestry.ajaxRequest(this.url, successHandler);

            return false;
        }.bind(this);
    }
});

/**
 * Wait for a set of JavaScript libraries to load (in terms of DOM script elements), then invokes a callback function.
 */
Tapestry.ScriptLoadMonitor = Class.create({

    initialize : function(scriptElements, callback)
    {
        this.callback = callback;
        this.loaded = 0;
        this.toload = scriptElements.length;

        var executor = this;

        scriptElements.each(function (scriptElement)
        {
            if (Prototype.Browser.IE)
            {
                var loaded = false;

                scriptElement.onreadystatechange = function ()
                {
                    // IE may fire either loaded or complete, or perhaps even both.
                    if (! loaded && (this.readyState == 'loaded' || this.readyState == 'complete'))
                    {
                        loaded = true;
                        executor.loadComplete(scriptElement);
                    }
                };
            }
            else
            {
                // Much simpler in FF, Safari, etc.
                scriptElement.onload = executor.loadComplete.bindAsEventListener(executor, scriptElement);
            }
        });

        // If no scripts to actually load, call the callback immediately.

        if (this.toload == 0) this.callback.call(this);
    },

    loadComplete : function()
    {
        this.loaded++;

        // Evaluated the dependent script only once all the elements have loaded.

        if (this.loaded == this.toload)
            this.callback.call(this);
    }
});

Tapestry.ScriptManager = {

    /** Complete URLs of virtually loaded scripts (combined scripts loaded as a single virtual asset). */
    virtualScripts : $A([]),

    initialize : function()
    {

        // Check to see if document.scripts is supported; if not (for example, FireFox),
        // we can fake it.

        this.emulated = false;

        if (! document.scripts)
        {
            this.emulated = true;

            document.scripts = new Array();

            $$('script').each(function (s)
            {
                document.scripts.push(s);
            });
        }
    },

    /**
     * Checks to see if the given collection (of <script> or <style> elements) contains the given asset URL.
     * @param collection
     * @param prop      property to check ('src' for script, 'href' to style).
     * @param assetURL        complete URL (i.e., with protocol, host and port) to the asset
     */
    contains : function (collection, prop, assetURL)
    {
        return $A(collection).any(function (element)
        {
            var existing = element[prop];

            if (! existing || existing.blank()) return false;

            var complete =
                    Prototype.Browser.IE ? Tapestry.rebuildURL(existing) : existing;

            return complete == assetURL;
        });

        return false;
    },

    /**
     * Add scripts, as needed, to the document, then waits for them all to load, and finally, calls
     * the callback function.
     * @param scripts        Array of scripts to load
     * @param callback invoked after scripts are loaded
     */
    addScripts: function(scripts, callback)
    {
        var added = new Array();

        if (scripts)
        {
            var emulated = this.emulated;
            // Looks like IE really needs the new <script> tag to be
            // in the <head>. FF doesn't seem to care.
            // See http://unixpapa.com/js/dyna.html
            var head = $$("head").first();

            scripts.each(function(s)
            {
                var assetURL = Tapestry.rebuildURL(s);

                // Check to see if the script is already loaded, either as a virtual script, or as
                // an individual <script src=""> element.

                if (Tapestry.ScriptManager.virtualScripts.member(assetURL)) return;
                if (Tapestry.ScriptManager.contains(document.scripts, "src", assetURL)) return;

                // IE needs the type="text/javascript" as well.

                var element = new Element('script', {
                    src: assetURL,
                    type: 'text/javascript'
                });

                head.insert({
                    bottom:element
                });

                added.push(element);

                if (emulated) document.scripts.push(element);
            });

        }

        new Tapestry.ScriptLoadMonitor(added, callback);
    },

    addStylesheets : function(stylesheets)
    {
        if (!stylesheets) return;

        var head = $$('head').first();

        $(stylesheets).each(function(s)
        {
            var assetURL = Tapestry.rebuildURL(s.href);

            if (Tapestry.ScriptManager.contains(document.styleSheets, 'href', assetURL)) return; // continue

            var element = new Element('link', {
                type: 'text/css',
                rel: 'stylesheet',
                href: assetURL
            });

            // Careful about media types, some browser will break if it ends up as 'null'.

            if (s.media != undefined)
                element.writeAttribute('media', s.media);

            head.insert({
                bottom: element
            });

        });
    }
};

/**
 * In the spirit of $(), $T() exists to access the <em>Tapestry object</em> for the element. The Tapestry object
 * is used to store additional values related to the element; it is simply an annoymous object stored as property
 * <code>_tapestry</code> of the element, created the first time it is accessed.
 * <p>This mechanism acts as a namespace, and so helps prevent name
 * conflicts that would occur if properties were stored directly on DOM elements, and makes debugging a bit easier
 * (the Tapestry-specific properties are all in one place!).
 * For the moment, added methods are stored directly on the object, and are not prefixed in any way, valueing
 * readability over preventing naming conflicts.
 *
 * @param element an element instance or element id
 * @return object Tapestry object for the element
 */
function $T(element)
{
    var e = $(element);
    var t = e._tapestry;

    if (!t)
    {
        t = { };
        e._tapestry = t;
    }

    return t;
}

Tapestry.onDOMLoaded(Tapestry.onDomLoadedCallback);

// Ajax code needs to know to do nothing after the window is unloaded.
Event.observe(window, "beforeunload", function()
{
    Tapestry.windowUnloaded = true;
});


/* /assets/tapestry/5.1.0.4/tapestry-messages.js */;
// Copyright 2009 The Apache Software Foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Tapestry.Messages = {

    pageIsLoading : "Please wait for the page to finish loading ...",

    missingInitializer : "Function Tapestry.Initializer.#{name}() does not exist.",

    missingValidator :      "Function Tapestry.Validator.#{name}() does not exist for field '#{fieldName}'.",

    ajaxFailure : "Ajax failure: Status #{status} for #{request.url}: ",

    ajaxRequestUnsuccessful : "Server request was unsuccessful. There may be a problem accessing the server.",

    clientException :     "Client exception processing response: ",

    missingZone :   "Unable to locate Ajax Zone '#{id}' for dynamic update.",

    noZoneManager :   "Ajax Zone '#{id}' does not have an associated Tapestry.ZoneManager object." ,

    pathDoesNotStartWithSlash : "External path #{path} does not start with a leading slash.",

    notAnInteger : "Not an integer",

    invalidCharacter : "Invalid character"
};
/* /assets/classpath/20130920/com/ifactory/dg/base/AbstractViewDgDoc.js */;
document.observe("dom:loaded", function() {

	// FOR AN UPDATED METHODOLOGY, SEE
	$$('.externalPopup').invoke('observe', 'click', function(event) {
		// FUTURE REFERENCE:
		// If we ever need to know the natural height/width of the img:
		// https://developer.mozilla.org/en/DOM/window.screen
		// http://www.jacklmoore.com/notes/naturalwidth-and-naturalheight-in-ie
		var link = $(this),
		target = (link.target ? link.target : "_blank"), // use the target if it is defined... otherwise use _blank... this will allow for popups to not open multiple times when unnecessary
		wl = window.location,
		nW = screen.availWidth,
		nH = screen.availHeight,
		oURL = wl.protocol + '//' + wl.host + link.readAttribute('href'),
		left,
		top,
		width,
		height;
		if(link.href.match(/footnote/g)) {
			left = nW/3;
			top = nH/3;
			width = nW*0.25;
			height = nH*0.25;
		} else {
			left = nW/4;
			top = nH/4;
			width = nW*0.5;
			height = nH*0.5;
		}
		window.open(oURL, target, "dependent=yes,location=no,addressbar=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,left="+left+",top="+top+",width="+width+",height="+height);
		event.stop();
	});
	
	$$('.videoGroup .flowplayer').each(function(element) {
		flowplayer(element, "http://releases.flowplayer.org/swf/flowplayer-3.2.7.swf", {clip:{autoPlay: false}});
	});
	
	addAbstractPopupHandlers();

	//FIXME: it'd be better to have one click observer on .footnoteGroup, which handles both cases below. Eg:
	// $$('.footnoteGroup').invoke('observe', 'click', function(event) { var el = event.target; if(target.hasClassName("footnote") { /* do stuff here */ }
	$$('.footnoteGroup .footnote').invoke('observe', 'click', function(event) {
		var el = $(this),
		tooltip = el.next();
		// TODO: tooltip.toggle() should do the same thing
		if(tooltip.style.display === 'block') {
			tooltip.style.display = 'none';
		} else {
			tooltip.style.display = 'block';
		}
		event.stop();
	});
	$$('.footnoteGroup .tooltip .close').invoke('observe', 'click', function(event) {
		$(this).up().up().style.display = 'none'; // TODO: $(this).up(2).hide() should do the same thing
	});

    $$('.moduleShut').each(function(e) {
        if(Selector.findChildElements(e, [".highlight", ".hi"]).length !== 0) {
            e.className = "module moduleOpen";
        }
    });

//	if($('formats')) {
//		$('formats').hide();
//
//		$('seeAllFormats').observe('click', function(event){
//				if ($('formats').visible()) {
//					$('formats').hide();
//				} else {
//					$('formats').show();
//				}
//		});
//	}
});

function addAbstractPopupHandlers() {
//	// show popups on mouseover on a result title link
//	if($('mvwTitle0')) {
//		$('mvwTitle0').observe("mouseover", function(event) {
//			showAbstractPopup( event.findElement() , event);
//			event.stop();
//		});
//	}
}

function showAbstractPopup(el, ev) {
	var content = $("popupShow").readAttribute('href');
	var t_el = $(el);
	var abstractPopup = $T(t_el).abstractPopup;
	if (! abstractPopup) {
		abstractPopup = new Popup(t_el, content, popupOptions);
		$T(t_el).abstractPopup = abstractPopup;
	}
	abstractPopup.show(ev);
	abstractPopup.reposition(ev);
}

function toggleNextUl(element) {
	if (element.innerHTML == " [+] ") {
		element.innerHTML = " [-] ";
		element.next("ul").show();
	} else {
		element.innerHTML = " [+] ";
		element.next("ul").hide();
	}
}

var popupOptions = {showOnClick:false, linkOnDblClick:false, showOnMouseOver:true,//hideHover:true, 
		xAxisOffset: 0, yAxisOffset: 0, noCloseButton : true, dontFocusTargetOnClose : true};

var Popup = Class.create({
	/** content may be either an element or id which will be displayed in the popup or an absolute url to load via ajax. */
	initialize: function(target, content, options) {
		this.options = {
			delay: 0.4,		// mouseover delay in seconds
			title: null		// popup window title. defaults to the content of the trigger element.
		};
		
		this.target = $(target);
		
		if(!options.dontFocusTargetOnClose)
			linkToFocusOnClose = $(target);
		
		this.ajax = false;
		if (Object.isString(content) && (content.startsWith('http') || content.startsWith('/'))) {
			this.ajax = true;
			this.url = content;
		} else {
			this.content = content = $(content);
		}
		
		if (options)
			this.options = Object.extend(this.options, options);
		
		// only show popup if hovering for a certain delay
		var inst = this;
				
		if (!options.hideHover){//only For CrossReferencePopup
			var closeFunction = function() {
				
				function closePopupFunction() {
					inst.clearTimeout();
					if (!options.hideHover) {//only For CrossReferencePopup
						inst.close();
					}
					isShowCrossReferencePopup = false;
				}

				var appjsPopupTimer = setTimeout(closePopupFunction, 500);				
			}
			
			target.observe('mouseout', closeFunction);
			target.observe('blur', closeFunction);
		}
		
		Event.observe(document.onresize ? document : window, "resize", function() {
			if (window._active_popup)
				window._active_popup.reposition(null);
		});
	},
	
	clearTimeout: function() {
		
		// the following lines fail in ie6
		if(typeof document.body.style.minWidth == "undefined") { return false; }
		
		if ($T(this.target).handle)
			window.clearTimeout($T(this.target).handle);
		$T(this.target).handle = null;
		
	},

	/** Creates (if necessary) and displays the popup. */
	show: function(event) {
		
		this.clearTimeout();	// allows showing the popup manually rather than just on hover
		
		if (!this.popup) {
			// REFACTOR could probably build all the html at once and then update afterwards
			var popup = this.popup = new Element('div', {'class':'popup', style:'left: -9999px; position: absolute; z-index: 99997;'
				});//window._active_popup.close();
			$$('body').first().insert(popup);	// won't display (or give you a height) if it's not in the document
			
			var title = this.options.title;
			if (!title)
				title = this.target.innerHTML;
			//by default, don't display the top arrow; switching between above and below the target is left up to subclasses.
			//popup.insert('<div class="top"><h2>' + title + '</h2><span class="balloonArrow2" style="display:none"></span></div>');
			
			if (!this.options.noCloseButton) {
				var closeLink = new Element('a', {'class': 'close', onclick:'return false;', href:'#'});
			
				closeLink.update('<span>close</span>');
				closeLink.observe('click', this.close.bindAsEventListener(this));
				popup.insert(closeLink);
			}	

			//popup.insert('<div class="popupWindow"><div class="popupContent"></div></div><div class="bot"><span class="balloonArrow"></span></div>');
			//var popupContent = popup.down('.popupContent');
			var popupContent = popup; 
	
			if (this.content) {
				popupContent.update(this.content.innerHTML);
			} else {
				popupContent.update('<span class="loadingIcon"><span>Loading...</span></span>');
				// TODO hide the popup if the response came back in error
				var success = function(transport) {

					if(transport.responseJSON)
						popupContent.update(transport.responseJSON.content);
					
					else
						popupContent.update(transport.responseText);
						
					this.reposition(event);
				}.bind(this);
				Tapestry.ajaxRequest(this.url, success);
			}
		}
		
		// only one popup is allowed at a time
		if (window._active_popup)
			window._active_popup.close();
		window._active_popup = this;

		this.popup.setStyle({'left': '-9999px'});
					
		this.popup.show();
			
		this.reposition(event);
	},
	
	/** Repositions the popup. Should be called after content is updated.
	 * By default, positions the popup so the lower-left is directly above where
	 * the user triggered.
	 * event is the mouse event that trigger the popup to display.
	 */
	reposition: function(event) {
		var height = this.popup.getHeight();
		var targetOffset = this.target.cumulativeOffset();
		
		// ensure that popups are on-screen as much as possible
		var halfHeight = height = 0 ? height : height / 2;
		var top = targetOffset.top - halfHeight;
		var viewportOffset = this.popup.viewportOffset();
		var portionMissingOffTop = 0 - this.popup.viewportOffset().top;
		if (portionMissingOffTop > 0) {
			top = top + portionMissingOffTop;
		}
		if (event)
			var left = Math.max(0, event.pointerX());
		this.popup.setStyle({'top': '' + top + 'px', 'left': '' + (left + 10) + 'px'});
		
	},
	
	/** Hides the popup and returns focus to the link that opened it. */
	close: function() {
		if (window._active_popup == this)
			window._active_popup = null;
		
		if (this.popup)
			this.popup.hide();
		
		if (this.options.hideHover && linkToFocusOnClose) { 
			// not for cross ref popups
			$(linkToFocusOnClose).focus();
		}
	}
});
/* /assets/classpath/20130920/com/ifactory/dg/base/event.simulate.js */;
/**
* Taken from: http://github.com/kangax/protolicious/blob/master/event.simulate.js
*  
* Event.simulate(@element, eventName[, options]) -> Element
* 
* - @element: element to fire event on
* - eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
* - options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.
*
*    $('foo').simulate('click'); // => fires "click" event on an element with id=foo
*
**/
(function(){
 
 var eventMatchers = {
   'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
   'MouseEvents': /^(?:click|mouse(?:down|up|over|move|out))$/
 }
 var defaultOptions = {
   pointerX: 0,
   pointerY: 0,
   button: 0,
   ctrlKey: false,
   altKey: false,
   shiftKey: false,
   metaKey: false,
   bubbles: true,
   cancelable: true
 }
 
 Event.simulate = function(element, eventName) {
   var options = Object.extend(Object.clone(defaultOptions), arguments[2] || { });
   var oEvent, eventType = null;
   
   element = $(element);
   
   for (var name in eventMatchers) {
     if (eventMatchers[name].test(eventName)) { eventType = name; break; }
   }

   if (!eventType)
     throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

   if (document.createEvent) {
     oEvent = document.createEvent(eventType);
     if (eventType == 'HTMLEvents') {
       oEvent.initEvent(eventName, options.bubbles, options.cancelable);
     }
     else {
       oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, 
         options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
         options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
     }
     element.dispatchEvent(oEvent);
   }
   else {
     options.clientX = options.pointerX;
     options.clientY = options.pointerY;
     oEvent = Object.extend(document.createEventObject(), options);
     element.fireEvent('on' + eventName, oEvent);
   }
   return element;
 }
 
 Element.addMethods({ simulate: Event.simulate });
})();

/* /assets/classpath/20130920/com/ifactory/dg/base/flowplayer-3.2.6.min.js */;
/* 
 * flowplayer.js 3.2.6. The Flowplayer API
 * 
 * Copyright 2009-2011 Flowplayer Oy
 * 
 * This file is part of Flowplayer.
 * 
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Date: 2011-02-04 05:45:28 -0500 (Fri, 04 Feb 2011)
 * Revision: 614 
 */
(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.slice(0,q)||"*";var o=s.slice(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).slice(2,10)}var h=function(t,r,s){var q=this,p={},u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.slice(0,v.length-1);var w="onBefore"+v.slice(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(y&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v)!=-1){i(A,y);if(y.metaData){if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var o=this,s={},u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var z=q._api().fp_getPlugin(p);if(!z){return}i(o,z);delete o.methods;if(!u){m(z.methods,function(){var B=""+this;o[B]=function(){var C=[].slice.call(arguments);var D=q._api().fp_invoke(p,B,C);return D==="undefined"||D===undefined?o:D}});u=true}}var A=s[w];if(A){var y=A.apply(o,v);if(w.slice(0,1)=="_"){delete s[w]}return y}return o}})};function b(q,G,t){var w=this,v=null,D=false,u,s,F=[],y={},x={},E,r,p,C,o,A;i(w,{id:function(){return E},isLoaded:function(){return(v!==null&&v.fp_play!==undefined&&!D)},getParent:function(){return q},hide:function(H){if(H){q.style.height="0px"}if(w.isLoaded()){v.style.height="0px"}return w},show:function(){q.style.height=A+"px";if(w.isLoaded()){v.style.height=o+"px"}return w},isHidden:function(){return w.isLoaded()&&parseInt(v.style.height,10)===0},load:function(J){if(!w.isLoaded()&&w._fireEvent("onBeforeLoad")!==false){var H=function(){u=q.innerHTML;if(u&&!flashembed.isSupported(G.version)){q.innerHTML=""}if(J){J.cached=true;j(x,"onLoad",J)}flashembed(q,G,{config:t})};var I=0;m(a,function(){this.unload(function(K){if(++I==a.length){H()}})})}return w},unload:function(J){if(this.isFullscreen()&&/WebKit/i.test(navigator.userAgent)){if(J){J(false)}return w}if(u.replace(/\s/g,"")!==""){if(w._fireEvent("onBeforeUnload")===false){if(J){J(false)}return w}D=true;try{if(v){v.fp_close();w._fireEvent("onUnload")}}catch(H){}var I=function(){v=null;q.innerHTML=u;D=false;if(J){J(true)}};setTimeout(I,50)}else{if(J){J(false)}}return w},getClip:function(H){if(H===undefined){H=C}return F[H]},getCommonClip:function(){return s},getPlaylist:function(){return F},getPlugin:function(H){var J=y[H];if(!J&&w.isLoaded()){var I=w._api().fp_getPlugin(H);if(I){J=new l(H,I,w);y[H]=J}}return J},getScreen:function(){return w.getPlugin("screen")},getControls:function(){return w.getPlugin("controls")._fireEvent("onUpdate")},getLogo:function(){try{return w.getPlugin("logo")._fireEvent("onUpdate")}catch(H){}},getPlay:function(){return w.getPlugin("play")._fireEvent("onUpdate")},getConfig:function(H){return H?k(t):t},getFlashParams:function(){return G},loadPlugin:function(K,J,M,L){if(typeof M=="function"){L=M;M={}}var I=L?e():"_";w._api().fp_loadPlugin(K,J,M,I);var H={};H[I]=L;var N=new l(K,null,w,H);y[K]=N;return N},getState:function(){return w.isLoaded()?v.fp_getState():-1},play:function(I,H){var J=function(){if(I!==undefined){w._api().fp_play(I,H)}else{w._api().fp_play()}};if(w.isLoaded()){J()}else{if(D){setTimeout(function(){w.play(I,H)},50)}else{w.load(function(){J()})}}return w},getVersion:function(){var I="flowplayer.js 3.2.6";if(w.isLoaded()){var H=v.fp_getVersion();H.push(I);return H}return I},_api:function(){if(!w.isLoaded()){throw"Flowplayer "+w.id()+" not loaded when calling an API method"}return v},setClip:function(H){w.setPlaylist([H]);return w},getIndex:function(){return p},_swfHeight:function(){return v.clientHeight}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","),function(){var H="on"+this;if(H.indexOf("*")!=-1){H=H.slice(0,H.length-1);var I="onBefore"+H.slice(2);w[I]=function(J){j(x,I,J);return w}}w[H]=function(J){j(x,H,J);return w}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled").split(","),function(){var H=this;w[H]=function(J,I){if(!w.isLoaded()){return w}var K=null;if(J!==undefined&&I!==undefined){K=v["fp_"+H](J,I)}else{K=(J===undefined)?v["fp_"+H]():v["fp_"+H](J)}return K==="undefined"||K===undefined?w:K}});w._fireEvent=function(Q){if(typeof Q=="string"){Q=[Q]}var R=Q[0],O=Q[1],M=Q[2],L=Q[3],K=0;if(t.debug){g(Q)}if(!w.isLoaded()&&R=="onLoad"&&O=="player"){v=v||c(r);o=w._swfHeight();m(F,function(){this._fireEvent("onLoad")});m(y,function(S,T){T._fireEvent("onUpdate")});s._fireEvent("onLoad")}if(R=="onLoad"&&O!="player"){return}if(R=="onError"){if(typeof O=="string"||(typeof O=="number"&&typeof M=="number")){O=M;M=L}}if(R=="onContextMenu"){m(t.contextMenu[O],function(S,T){T.call(w)});return}if(R=="onPluginEvent"||R=="onBeforePluginEvent"){var H=O.name||O;var I=y[H];if(I){I._fireEvent("onUpdate",O);return I._fireEvent(M,Q.slice(3))}return}if(R=="onPlaylistReplace"){F=[];var N=0;m(O,function(){F.push(new h(this,N++,w))})}if(R=="onClipAdd"){if(O.isInStream){return}O=new h(O,M,w);F.splice(M,0,O);for(K=M+1;K<F.length;K++){F[K].index++}}var P=true;if(typeof O=="number"&&O<F.length){C=O;var J=F[O];if(J){P=J._fireEvent(R,M,L)}if(!J||P!==false){P=s._fireEvent(R,M,L,J)}}m(x[R],function(){P=this.call(w,O,M);if(this.cached){x[R].splice(K,1)}if(P===false){return false}K++});return P};function B(){if($f(q)){$f(q).getParent().innerHTML="";p=$f(q).getIndex();a[p]=w}else{a.push(w);p=a.length-1}A=parseInt(q.style.height,10)||q.clientHeight;E=q.id||"fp"+e();r=G.id||E+"_api";G.id=r;t.playerId=E;if(typeof t=="string"){t={clip:{url:t}}}if(typeof t.clip=="string"){t.clip={url:t.clip}}t.clip=t.clip||{};if(q.getAttribute("href",2)&&!t.clip.url){t.clip.url=q.getAttribute("href",2)}s=new h(t.clip,-1,w);t.playlist=t.playlist||[t.clip];var I=0;m(t.playlist,function(){var K=this;if(typeof K=="object"&&K.length){K={url:""+K}}m(t.clip,function(L,M){if(M!==undefined&&K[L]===undefined&&typeof M!="function"){K[L]=M}});t.playlist[I]=K;K=new h(K,I,w);F.push(K);I++});m(t,function(K,L){if(typeof L=="function"){if(s[K]){s[K](L)}else{j(x,K,L)}delete t[K]}});m(t.plugins,function(K,L){if(L){y[K]=new l(K,L,w)}});if(!t.plugins||t.plugins.controls===undefined){y.controls=new l("controls",null,w)}y.canvas=new l("canvas",null,w);u=q.innerHTML;function J(L){var K=w.hasiPadSupport&&w.hasiPadSupport();if(/iPad|iPhone|iPod/i.test(navigator.userAgent)&&!/.flv$/i.test(F[0].url)&&!K){return true}if(!w.isLoaded()&&w._fireEvent("onBeforeClick")!==false){w.load()}return f(L)}function H(){if(u.replace(/\s/g,"")!==""){if(q.addEventListener){q.addEventListener("click",J,false)}else{if(q.attachEvent){q.attachEvent("onclick",J)}}}else{if(q.addEventListener){q.addEventListener("click",f,false)}w.load()}}setTimeout(H,0)}if(typeof q=="string"){var z=c(q);if(!z){throw"Flowplayer cannot access element: "+q}q=z;B()}else{B()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var t=arguments[1],q=(arguments.length==3)?arguments[2]:{};if(typeof t=="string"){t={src:t}}t=i({bgcolor:"#000000",version:[9,0],expressInstall:"http://static.flowplayer.org/swf/expressinstall.swf",cachebusting:false},t);if(typeof o=="string"){if(o.indexOf(".")!=-1){var s=[];m(n(o),function(){s.push(new b(this,k(t),k(q)))});return new d(s)}else{var r=c(o);return new b(r!==null?r:o,t,q)}}else{if(o){return new b(o,t,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(typeof jQuery=="function"){jQuery.fn.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";var i={width:"100%",height:"100%",allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(e){jQuery.tools=jQuery.tools||{};jQuery.tools.flashembed={version:"1.0.4",conf:i}}function j(){if(c.done){return false}var l=document;if(l&&l.getElementsByTagName&&l.getElementById&&l.body){clearInterval(c.timer);c.timer=null;for(var k=0;k<c.ready.length;k++){c.ready[k].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(k){if(c.done){return k()}if(c.timer){c.ready.push(k)}else{c.ready=[k];c.timer=setInterval(j,13)}};function f(l,k){if(k){for(key in k){if(k.hasOwnProperty(key)){l[key]=k[key]}}}return l}function g(k){switch(h(k)){case"string":k=k.replace(new RegExp('(["\\\\])',"g"),"\\$1");k=k.replace(/^\s?(\d+)%/,"$1pct");return'"'+k+'"';case"array":return"["+b(k,function(n){return g(n)}).join(",")+"]";case"function":return'"function()"';case"object":var l=[];for(var m in k){if(k.hasOwnProperty(m)){l.push('"'+m+'":'+g(k[m]))}}return"{"+l.join(",")+"}"}return String(k).replace(/\s/g," ").replace(/\'/g,'"')}function h(l){if(l===null||l===undefined){return false}var k=typeof l;return(k=="object"&&l.push)?"array":k}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(k,n){var m=[];for(var l in k){if(k.hasOwnProperty(l)){m[l]=n(k[l])}}return m}function a(r,t){var q=f({},r);var s=document.all;var n='<object width="'+q.width+'" height="'+q.height+'"';if(s&&!q.id){q.id="_"+(""+Math.random()).substring(9)}if(q.id){n+=' id="'+q.id+'"'}if(q.cachebusting){q.src+=((q.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(q.w3c||!s){n+=' data="'+q.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(q.w3c||s){n+='<param name="movie" value="'+q.src+'" />'}q.width=q.height=q.id=q.w3c=q.src=null;for(var l in q){if(q[l]!==null){n+='<param name="'+l+'" value="'+q[l]+'" />'}}var o="";if(t){for(var m in t){if(t[m]!==null){o+=m+"="+(typeof t[m]=="object"?g(t[m]):t[m])+"&"}}o=o.substring(0,o.length-1);n+='<param name="flashvars" value=\''+o+"' />"}n+="</object>";return n}function d(m,p,l){var k=flashembed.getVersion();f(this,{getContainer:function(){return m},getConf:function(){return p},getVersion:function(){return k},getFlashvars:function(){return l},getApi:function(){return m.firstChild},getHTML:function(){return a(p,l)}});var q=p.version;var r=p.expressInstall;var o=!q||flashembed.isSupported(q);if(o){p.onFail=p.version=p.expressInstall=null;m.innerHTML=a(p,l)}else{if(q&&r&&flashembed.isSupported([6,65])){f(p,{src:r});l={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};m.innerHTML=a(p,l)}else{if(m.innerHTML.replace(/\s/g,"")!==""){}else{m.innerHTML="<h2>Flash version "+q+" or greater is required</h2><h3>"+(k[0]>0?"Your version is "+k:"You have no flash plugin installed")+"</h3>"+(m.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(m.tagName=="A"){m.onclick=function(){location.href="http://www.adobe.com/go/getflashplayer"}}}}}if(!o&&p.onFail){var n=p.onFail.call(this);if(typeof n=="string"){m.innerHTML=n}}if(document.all){window[p.id]=document.getElementById(p.id)}}window.flashembed=function(l,m,k){if(typeof l=="string"){var n=document.getElementById(l);if(n){l=n}else{c(function(){flashembed(l,m,k)});return}}if(!l){return}if(typeof m=="string"){m={src:m}}var o=f({},i);f(o,m);return new d(l,o,k)};f(window.flashembed,{getVersion:function(){var m=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var l=navigator.plugins["Shockwave Flash"].description;if(typeof l!="undefined"){l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var n=parseInt(l.replace(/^(.*)\..*$/,"$1"),10);var r=/r/.test(l)?parseInt(l.replace(/^.*r(.*)$/,"$1"),10):0;m=[n,r]}}else{if(window.ActiveXObject){try{var p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(q){try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");m=[6,0];p.AllowScriptAccess="always"}catch(k){if(m[0]==6){return m}}try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(o){}}if(typeof p=="object"){l=p.GetVariable("$version");if(typeof l!="undefined"){l=l.replace(/^\S+\s+(.*)$/,"$1").split(",");m=[parseInt(l[0],10),parseInt(l[2],10)]}}}}return m},isSupported:function(k){var m=flashembed.getVersion();var l=(m[0]>k[0])||(m[0]==k[0]&&m[1]>=k[1]);return l},domReady:c,asString:g,getHTML:a});if(e){jQuery.fn.flashembed=function(l,k){var m=null;this.each(function(){m=flashembed(this,l,k)});return l.api===false?this:m}}})();
/* /assets/classpath/20130920/com/ifactory/dg/base/DgShowLightBox.js */;

/* /assets/classpath/20130920/js/jquery-noconflict-1.8.1.min.js */;
/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.1",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n=(p._data(this,"events")||{})[c.type]||[],o=n.delegateCount,q=[].slice.call(arguments),r=!c.exclusive&&!c.namespace,s=p.event.special[c.type]||{},t=[];q[0]=c,c.delegateTarget=this;if(s.preDispatch&&s.preDispatch.call(this,c)===!1)return;if(o&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<o;d++)k=n[d],l=k.selector,h[l]===b&&(h[l]=p(l,this).index(f)>=0),h[l]&&j.push(k);j.length&&t.push({elem:f,matches:j})}n.length>o&&t.push({elem:this,matches:n.slice(o)});for(d=0;d<t.length&&!c.isPropagationStopped();d++){i=t[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){k=i.matches[e];if(r||!c.namespace&&!k.namespace||c.namespace_re&&c.namespace_re.test(k.namespace))c.data=k.data,c.handleObj=k,g=((p.event.special[k.origType]||{}).handle||k.handler).apply(i.elem,q),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return s.postDispatch&&s.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function $(a,b,c,d){c=c||[],b=b||q;var e,f,g,j,k=b.nodeType;if(k!==1&&k!==9)return[];if(!a||typeof a!="string")return c;g=h(b);if(!g&&!d)if(e=L.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&i(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return u.apply(c,t.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&X&&b.getElementsByClassName)return u.apply(c,t.call(b.getElementsByClassName(j),0)),c}return bk(a,b,c,d,g)}function _(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function ba(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bb(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bc(a,b,c,d){var e,g,h,i,j,k,l,m,n,p,r=!c&&b!==q,s=(r?"<s>":"")+a.replace(H,"$1<s>"),u=y[o][s];if(u)return d?0:t.call(u,0);j=a,k=[],m=0,n=f.preFilter,p=f.filter;while(j){if(!e||(g=I.exec(j)))g&&(j=j.slice(g[0].length),h.selector=l),k.push(h=[]),l="",r&&(j=" "+j);e=!1;if(g=J.exec(j))l+=g[0],j=j.slice(g[0].length),e=h.push({part:g.pop().replace(H," "),string:g[0],captures:g});for(i in p)(g=S[i].exec(j))&&(!n[i]||(g=n[i](g,b,c)))&&(l+=g[0],j=j.slice(g[0].length),e=h.push({part:i,string:g.shift(),captures:g}));if(!e)break}return l&&(h.selector=l),d?j.length:j?$.error(a):t.call(y(s,k),0)}function bd(a,b,e,f){var g=b.dir,h=s++;return a||(a=function(a){return a===e}),b.first?function(b){while(b=b[g])if(b.nodeType===1)return a(b)&&b}:f?function(b){while(b=b[g])if(b.nodeType===1&&a(b))return b}:function(b){var e,f=h+"."+c,i=f+"."+d;while(b=b[g])if(b.nodeType===1){if((e=b[o])===i)return b.sizset;if(typeof e=="string"&&e.indexOf(f)===0){if(b.sizset)return b}else{b[o]=i;if(a(b))return b.sizset=!0,b;b.sizset=!1}}}}function be(a,b){return a?function(c){var d=b(c);return d&&a(d===!0?c:d)}:b}function bf(a,b,c){var d,e,g=0;for(;d=a[g];g++)f.relative[d.part]?e=bd(e,f.relative[d.part],b,c):e=be(e,f.filter[d.part].apply(null,d.captures.concat(b,c)));return e}function bg(a){return function(b){var c,d=0;for(;c=a[d];d++)if(c(b))return!0;return!1}}function bh(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)$(a,b[e],c,d)}function bi(a,b,c,d,e,g){var h,i=f.setFilters[b.toLowerCase()];return i||$.error(b),(a||!(h=e))&&bh(a||"*",d,h=[],e),h.length>0?i(h,c,g):[]}function bj(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s=0,t=a.length,v=S.POS,w=new RegExp("^"+v.source+"(?!"+A+")","i"),x=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(n[a]=b)};for(;s<t;s++){f=a[s],g="",m=e;for(h=0,i=f.length;h<i;h++){j=f[h],k=j.string;if(j.part==="PSEUDO"){v.exec(""),l=0;while(n=v.exec(k)){o=!0,p=v.lastIndex=n.index+n[0].length;if(p>l){g+=k.slice(l,n.index),l=p,q=[c],J.test(g)&&(m&&(q=m),m=e);if(r=O.test(g))g=g.slice(0,-5).replace(J,"$&*"),l++;n.length>1&&n[0].replace(w,x),m=bi(g,n[1],n[2],q,m,r)}g=""}}o||(g+=k),o=!1}g?J.test(g)?bh(g,m||[c],d,e):$(g,c,d,e?e.concat(m):m):u.apply(d,m)}return t===1?d:$.uniqueSort(d)}function bk(a,b,e,g,h){a=a.replace(H,"$1");var i,k,l,m,n,o,p,q,r,s,v=bc(a,b,h),w=b.nodeType;if(S.POS.test(a))return bj(v,b,e,g);if(g)i=t.call(g,0);else if(v.length===1){if((o=t.call(v[0],0)).length>2&&(p=o[0]).part==="ID"&&w===9&&!h&&f.relative[o[1].part]){b=f.find.ID(p.captures[0].replace(R,""),b,h)[0];if(!b)return e;a=a.slice(o.shift().string.length)}r=(v=N.exec(o[0].string))&&!v.index&&b.parentNode||b,q="";for(n=o.length-1;n>=0;n--){p=o[n],s=p.part,q=p.string+q;if(f.relative[s])break;if(f.order.test(s)){i=f.find[s](p.captures[0].replace(R,""),r,h);if(i==null)continue;a=a.slice(0,a.length-q.length)+q.replace(S[s],""),a||u.apply(e,t.call(i,0));break}}}if(a){k=j(a,b,h),c=k.dirruns++,i==null&&(i=f.find.TAG("*",N.test(a)&&b.parentNode||b));for(n=0;m=i[n];n++)d=k.runs++,k(m)&&e.push(m)}return e}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=a.document,r=q.documentElement,s=0,t=[].slice,u=[].push,v=function(a,b){return a[o]=b||!0,a},w=function(){var a={},b=[];return v(function(c,d){return b.push(c)>f.cacheLength&&delete a[b.shift()],a[c]=d},a)},x=w(),y=w(),z=w(),A="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",C=B.replace("w","w#"),D="([*^$|!~]?=)",E="\\["+A+"*("+B+")"+A+"*(?:"+D+A+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+C+")|)|)"+A+"*\\]",F=":("+B+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+E+")|[^:]|\\\\.)*|.*))\\)|)",G=":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",H=new RegExp("^"+A+"+|((?:^|[^\\\\])(?:\\\\.)*)"+A+"+$","g"),I=new RegExp("^"+A+"*,"+A+"*"),J=new RegExp("^"+A+"*([\\x20\\t\\r\\n\\f>+~])"+A+"*"),K=new RegExp(F),L=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,M=/^:not/,N=/[\x20\t\r\n\f]*[+~]/,O=/:not\($/,P=/h\d/i,Q=/input|select|textarea|button/i,R=/\\(?!\\)/g,S={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),NAME:new RegExp("^\\[name=['\"]?("+B+")['\"]?\\]"),TAG:new RegExp("^("+B.replace("w","w*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+A+"*(even|odd|(([+-]|)(\\d*)n|)"+A+"*(?:([+-]|)"+A+"*(\\d+)|))"+A+"*\\)|)","i"),POS:new RegExp(G,"ig"),needsContext:new RegExp("^"+A+"*[>+~]|"+G,"i")},T=function(a){var b=q.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},U=T(function(a){return a.appendChild(q.createComment("")),!a.getElementsByTagName("*").length}),V=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),W=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),X=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),Y=T(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",r.insertBefore(a,r.firstChild);var b=q.getElementsByName&&q.getElementsByName(o).length===2+q.getElementsByName(o+0).length;return e=!q.getElementById(o),r.removeChild(a),b});try{t.call(r.childNodes,0)[0].nodeType}catch(Z){t=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}$.matches=function(a,b){return $(a,null,null,b)},$.matchesSelector=function(a,b){return $(b,null,null,[a]).length>0},g=$.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=g(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=g(b);return c},h=$.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},i=$.contains=r.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:r.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},$.attr=function(a,b){var c,d=h(a);return d||(b=b.toLowerCase()),f.attrHandle[b]?f.attrHandle[b](a):W||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},f=$.selectors={cacheLength:50,createPseudo:v,match:S,order:new RegExp("ID|TAG"+(Y?"|NAME":"")+(X?"|CLASS":"")),attrHandle:V?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:e?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:U?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(R,""),a[3]=(a[4]||a[5]||"").replace(R,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||$.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&$.error(a[0]),a},PSEUDO:function(a,b,c){var d,e;if(S.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(d=a[4])K.test(d)&&(e=bc(d,b,c,!0))&&(e=d.indexOf(")",d.length-e)-d.length)&&(d=d.slice(0,e),a[0]=a[0].slice(0,e)),a[2]=d;return a.slice(0,3)}},filter:{ID:e?function(a){return a=a.replace(R,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(R,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(R,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=x[o][a];return b||(b=x(a,new RegExp("(^|"+A+")"+a+"("+A+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=$.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return $.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=s++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[o]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[o]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e,g=f.pseudos[a]||f.pseudos[a.toLowerCase()];return g||$.error("unsupported pseudo: "+a),g[o]?g(b,c,d):g.length>1?(e=[a,a,"",b],function(a){return g(a,0,e)}):g}},pseudos:{not:v(function(a,b,c){var d=j(a.replace(H,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!f.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:v(function(a){return function(b){return(b.textContent||b.innerText||g(b)).indexOf(a)>-1}}),has:v(function(a){return function(b){return $(a,b).length>0}}),header:function(a){return P.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:_("radio"),checkbox:_("checkbox"),file:_("file"),password:_("password"),image:_("image"),submit:ba("submit"),reset:ba("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return Q.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}},k=r.compareDocumentPosition?function(a,b){return a===b?(l=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return l=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bb(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bb(e[j],f[j]);return j===c?bb(a,f[j],-1):bb(e[j],b,1)},[0,0].sort(k),m=!l,$.uniqueSort=function(a){var b,c=1;l=m,a.sort(k);if(l)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},$.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},j=$.compile=function(a,b,c){var d,e,f,g=z[o][a];if(g&&g.context===b)return g;d=bc(a,b,c);for(e=0,f=d.length;e<f;e++)d[e]=bf(d[e],b,c);return g=z(a,bg(d)),g.context=b,g.runs=g.dirruns=0,g},q.querySelectorAll&&function(){var a,b=bk,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=r.matchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+A+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+A+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bk=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return u.apply(f,t.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j,k,l,m=d.getAttribute("id"),n=m||o,p=N.test(a)&&d.parentNode||d;m?n=n.replace(c,"\\$&"):d.setAttribute("id",n),j=bc(a,d,h),n="[id='"+n+"']";for(k=0,l=j.length;k<l;k++)j[k]=n+j[k].selector;try{return u.apply(f,t.call(p.querySelectorAll(j.join(",")),0)),f}catch(i){}finally{m||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push(S.PSEUDO.source,S.POS.source,"!=")}catch(c){}}),f=new RegExp(f.join("|")),$.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!h(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=g.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return $(c,null,null,[b]).length>0})}(),f.setFilters.nth=f.setFilters.eq,f.filters=f.pseudos,$.attr=p.attr,p.find=$,p.expr=$.selectors,p.expr[":"]=p.expr.pseudos,p.unique=$.uniqueSort,p.text=$.getText,p.isXMLDoc=$.isXML,p.contains=$.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{cj=f.href}catch(cy){cj=e.createElement("a"),cj.href="",cj=cj.href}ck=ct.exec(cj.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:cj,isLocal:cn.test(ck[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,ck[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==ck[1]&&i[2]==ck[2]&&(i[3]||(i[1]==="http:"?80:443))==(ck[3]||(ck[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cQ.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=da(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
window.$j = jQuery.noConflict();
/* /assets/classpath/20130920/js/plugins.js */;
// Avoid `console` errors in browsers that lack a console.
if(!(window.console&&console.log)){(function(){var a=function(){};var b=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","markTimeline","table","time","timeEnd","timeStamp","trace","warn"];var c=b.length;var d=window.console={};while(c--){d[b[c]]=a}})()}

// Other jQuery/helper plugins

/*
 * Cross Browser HTML5 Local Storage Support
 * See https://github.com/wojodesign/local-storage-js
 */
(function(){if(!this.localStorage)if(this.globalStorage)try{this.localStorage=this.globalStorage}catch(e){}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if(a.addBehavior){a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function(b,d){a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function(b){a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function(b){a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length--;if(0>this.length)this.length=0},clear:function(){a.load("localStorage");for(var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function(b){a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function(a){return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();
/* /assets/classpath/20130920/js/cookiejar.js */;
/**
 * Javascript code to store data as JSON strings in cookies. 
 * It uses prototype.js 1.5.1 (http://www.prototypejs.org)
 * 
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/jsoncookies
 * License: Apache Software License 2
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.5
 * Updated: Jan 26, 2009 
 * 
 * Chnage Log:
 *   v 0.5
 *   -  Changed License from CC to Apache 2
 *   v 0.4
 *   -  Removed a extra comma in options (was breaking in IE and Opera). (Thanks Jason)
 *   -  Removed the parameter name from the initialize function
 *   -  Changed the way expires date was being calculated. (Thanks David)
 *   v 0.3
 *   -  Removed dependancy on json.js (http://www.json.org/json.js)
 *   -  empty() function only deletes the cookies set by CookieJar
 */

var CookieJar = Class.create();

CookieJar.prototype = {

	/**
	 * Append before all cookie names to differntiate them.
	 */
	appendString: "__CJ_",

	/**
	 * Initializes the cookie jar with the options.
	 */
	initialize: function(options) {
		this.options = {
			expires: 3600,		// seconds (1 hr)
			path: '',			// cookie path
			domain: '',			// cookie domain
			secure: ''			// secure ?
		};
		Object.extend(this.options, options || {});

		if (this.options.expires != '') {
			var date = new Date();
			date = new Date(date.getTime() + (this.options.expires * 1000));
			this.options.expires = '; expires=' + date.toGMTString();
		}
		if (this.options.path != '') {
			this.options.path = '; path=' + escape(this.options.path);
		}
		if (this.options.domain != '') {
			this.options.domain = '; domain=' + escape(this.options.domain);
		}
		if (this.options.secure == 'secure') {
			this.options.secure = '; secure';
		} else {
			this.options.secure = '';
		}
	},

	/**
	 * Adds a name values pair.
	 */
	put: function(name, value) {
		name = this.appendString + name;
		cookie = this.options;
		var type = typeof value;
		switch(type) {
		  case 'undefined':
		  case 'function' :
		  case 'unknown'  : return false;
		  case 'boolean'  : 
		  case 'string'   : 
		  case 'number'   : value = String(value.toString());
		}
		var cookie_str = name + "=" + escape(Object.toJSON(value));
		try {
			document.cookie = cookie_str + cookie.expires + cookie.path + cookie.domain + cookie.secure;
		} catch (e) {
			return false;
		}
		return true;
	},

	/**
	 * Removes a particular cookie (name value pair) form the Cookie Jar.
	 */
	remove: function(name) {
		name = this.appendString + name;
		cookie = this.options;
		try {
			var date = new Date();
			date.setTime(date.getTime() - (3600 * 1000));
			var expires = '; expires=' + date.toGMTString();
			document.cookie = name + "=" + expires + cookie.path + cookie.domain + cookie.secure;
		} catch (e) {
			return false;
		}
		return true;
	},

	/**
	 * Return a particular cookie by name;
	 */
	get: function(name) {
		name = this.appendString + name;
		var cookies = document.cookie.match(name + '=(.*?)(;|$)');
		if (cookies) {
			return (unescape(cookies[1])).evalJSON();
		} else {
			return null;
		}
	},

	/**
	 * Empties the Cookie Jar. Deletes all the cookies.
	 */
	empty: function() {
		keys = this.getKeys();
		size = keys.size();
		for(i=0; i<size; i++) {
			this.remove(keys[i]);
		}
	},

	/**
	 * Returns all cookies as a single object
	 */
	getPack: function() {
		pack = {};
		keys = this.getKeys();

		size = keys.size();
		for(i=0; i<size; i++) {
			pack[keys[i]] = this.get(keys[i]);
		}
		return pack;
	},

	/**
	 * Returns all keys.
	 */
	getKeys: function() {
		keys = $A();
		keyRe= /[^=; ]+(?=\=)/g;
		str  = document.cookie;
		CJRe = new RegExp("^" + this.appendString);
		while((match = keyRe.exec(str)) != undefined) {
			if (CJRe.test(match[0].strip())) {
				keys.push(match[0].strip().gsub("^" + this.appendString,""));
			}
		}
		return keys;
	}
};

/* /assets/classpath/20130920/com/ifactory/dg/components/Layout.js */;
document.observe("dom:loaded", function() {

	// bind event handlers for subject menu
	$('subjectLi').observe('click', function (event) {
		$('subjectMenu').toggleClassName('on');
	})
	// norlov: #2616 hack for IE since dom:loaded event fired differently for IE/firefox(chrome)
	// the event is caught in AdPlacement.tml script
    setTimeout(function(){document.fire('dom:loaded:afterTimeout')}, 500);
    /*
    We using special request parameter in URL, and javascript after page was loaded identify it and click on hidden link to show notification lightbox.
    That's a hack and please let us know if you know another way to display lightbox after page was reloaded.
    */
    var lightboxLinkId = getUrlVars()['showLightbox'];
    if (lightboxLinkId) {
        if (parent.$(lightboxLinkId)) {
            parent.$(lightboxLinkId).onclick.delay(.5);
        }
    }

});

/*
 * return two-dimensional array:
 * "requestParamName1" : "value1"
 * "requestParamName2" : "value2"
 */
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
/* /assets/classpath/20130920/com/ifactory/dg/components/base_app_prototype-1-7_fixes.js */;
document.observe("dom:loaded", function() {

    // app.js:54
    //zebra striation on tables
    $$(".bookDetail #readPanel table").each(function(elTablo) {
        var evenRow = false;
        elTablo.select("tr").each(function(el) {    // "> tr" doesn't work with select() method in version 1.7
            if(evenRow) {
                el.addClassName("even");
                evenRow = false;
            }
            else {
                evenRow = true;
            }
        });
    });

});

Tapestry.ZoneManager.addMethods({
	processReply : function(reply) {
		Tapestry.loadScriptsInReply(reply, function() {
			/*
			 * In a multi-zone update, the reply.content may be missing, in
			 * which case, leave the curent content in place. TAP5-1177
			 */
			reply.content != undefined && this.show(reply.content);

			/*
			 * zones is an object of zone ids and zone content that will be
			 * present in a multi-zone update response.
			 */
			reply.zones && Object.keys(reply.zones).each(function(zoneId) {
				var manager = Tapestry.findZoneManagerForZone(zoneId);

				if (manager) {
					var zoneContent = reply.zones[zoneId];
					manager.show(zoneContent);
				}
			});
		}.bind(this));
	}
});

/* /assets/classpath/20130920/com/ifactory/press/applib/mixins/window.js */;
// Copyright (c) 2006 Sébastien Gruhier (http://xilinus.com, http://itseb.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// VERSION 1.3

var Window = Class.create();

Window.keepMultiModalWindow = false;
Window.hasEffectLib = (typeof Effect != 'undefined');
Window.resizeEffectDuration = 0.4;

Window.prototype = {
  // Constructor
  // Available parameters : className, blurClassName, title, minWidth, minHeight, maxWidth, maxHeight, width, height, top, left, bottom, right, resizable, zIndex, opacity, recenterAuto, wiredDrag
  //                        hideEffect, showEffect, showEffectOptions, hideEffectOptions, effectOptions, url, draggable, closable, minimizable, maximizable, parent, onload
  //                        add all callbacks (if you do not use an observer)
  //                        onDestroy onStartResize onStartMove onResize onMove onEndResize onEndMove onFocus onBlur onBeforeShow onShow onHide onMinimize onMaximize onClose
  
  initialize: function() {
    var id;
    var optionIndex = 0;
    // For backward compatibility like win= new Window("id", {...}) instead of win = new Window({id: "id", ...})
    if (arguments.length > 0) {
      if (typeof arguments[0] == "string" ) {
        id = arguments[0];
        optionIndex = 1;
      }
      else
        id = arguments[0] ? arguments[0].id : null;
    }
    
    // Generate unique ID if not specified
    if (!id)
      id = "window_" + new Date().getTime();
      
    if ($(id))
      alert("Window " + id + " is already registered in the DOM! Make sure you use setDestroyOnClose() or destroyOnClose: true in the constructor");

    this.options = Object.extend({
      className:         "dialog",
      blurClassName:     null,
      minWidth:          100, 
      minHeight:         20,
      resizable:         true,
      closable:          true,
      minimizable:       true,
      maximizable:       true,
      draggable:         true,
      userData:          null,
      showEffect:        (Window.hasEffectLib ? Effect.Appear : Element.show),
      hideEffect:        (Window.hasEffectLib ? Effect.Fade : Element.hide),
      showEffectOptions: {},
      hideEffectOptions: {},
      effectOptions:     null,
      parent:            document.body,
      title:             "&nbsp;",
      url:               null,
      onload:            Prototype.emptyFunction,
      width:             200,
      height:            300,
      opacity:           1,
      recenterAuto:      true,
      wiredDrag:         false,
      closeCallback:     null,
      destroyOnClose:    false,
      gridX:             1, 
      gridY:             1      
    }, arguments[optionIndex] || {});
    if (this.options.blurClassName)
      this.options.focusClassName = this.options.className;
      
    if (typeof this.options.top == "undefined" &&  typeof this.options.bottom ==  "undefined") 
      this.options.top = this._round(Math.random()*500, this.options.gridY);
    if (typeof this.options.left == "undefined" &&  typeof this.options.right ==  "undefined") 
      this.options.left = this._round(Math.random()*500, this.options.gridX);

    if (this.options.effectOptions) {
      Object.extend(this.options.hideEffectOptions, this.options.effectOptions);
      Object.extend(this.options.showEffectOptions, this.options.effectOptions);
      if (this.options.showEffect == Element.Appear)
        this.options.showEffectOptions.to = this.options.opacity;
    }
    if (Window.hasEffectLib) {
      if (this.options.showEffect == Effect.Appear)
        this.options.showEffectOptions.to = this.options.opacity;
    
      if (this.options.hideEffect == Effect.Fade)
        this.options.hideEffectOptions.from = this.options.opacity;
    }
    if (this.options.hideEffect == Element.hide)
      this.options.hideEffect = function(){ Element.hide(this.element); if (this.options.destroyOnClose) this.destroy(); }.bind(this)
    
    if (this.options.parent != document.body)  
      this.options.parent = $(this.options.parent);
      
    this.element = this._createWindow(id);       
    this.element.win = this;
    
    // Bind event listener
    this.eventMouseDown = this._initDrag.bindAsEventListener(this);
    this.eventMouseUp   = this._endDrag.bindAsEventListener(this);
    this.eventMouseMove = this._updateDrag.bindAsEventListener(this);
    this.eventOnLoad    = this._getWindowBorderSize.bindAsEventListener(this);
    this.eventMouseDownContent = this.toFront.bindAsEventListener(this);
    this.eventResize = this._recenter.bindAsEventListener(this);
 
    this.topbar = $(this.element.id + "_top");
    this.bottombar = $(this.element.id + "_bottom");
    this.content = $(this.element.id + "_content");
    
    Event.observe(this.topbar, "mousedown", this.eventMouseDown);
    Event.observe(this.bottombar, "mousedown", this.eventMouseDown);
    Event.observe(this.content, "mousedown", this.eventMouseDownContent);
    Event.observe(window, "load", this.eventOnLoad);
    Event.observe(window, "resize", this.eventResize);
    Event.observe(window, "scroll", this.eventResize);
    Event.observe(this.options.parent, "scroll", this.eventResize);
    
    if (this.options.draggable)  {
      var that = this;
      [this.topbar, this.topbar.up().previous(), this.topbar.up().next()].each(function(element) {
        element.observe("mousedown", that.eventMouseDown);
        element.addClassName("top_draggable");
      });
      [this.bottombar.up(), this.bottombar.up().previous(), this.bottombar.up().next()].each(function(element) {
        element.observe("mousedown", that.eventMouseDown);
        element.addClassName("bottom_draggable");
      });
      
    }    
    
    if (this.options.resizable) {
      this.sizer = $(this.element.id + "_sizer");
      Event.observe(this.sizer, "mousedown", this.eventMouseDown);
    }  
    
    this.useLeft = null;
    this.useTop = null;
    if (typeof this.options.left != "undefined") {
      this.element.setStyle({left: parseFloat(this.options.left) + 'px'});
      this.useLeft = true;
    }
    else {
      this.element.setStyle({right: parseFloat(this.options.right) + 'px'});
      this.useLeft = false;
    }
    
    if (typeof this.options.top != "undefined") {
      this.element.setStyle({top: parseFloat(this.options.top) + 'px'});
      this.useTop = true;
    }
    else {
      this.element.setStyle({bottom: parseFloat(this.options.bottom) + 'px'});      
      this.useTop = false;
    }
      
    this.storedLocation = null;
    
    this.setOpacity(this.options.opacity);
    if (this.options.zIndex)
      this.setZIndex(this.options.zIndex)

    if (this.options.destroyOnClose)
      this.setDestroyOnClose(true);

    this._getWindowBorderSize();
    this.width = this.options.width;
    this.height = this.options.height;
    this.visible = false;
    
    this.constraint = false;
    this.constraintPad = {top: 0, left:0, bottom:0, right:0};
    
    if (this.width && this.height)
      this.setSize(this.options.width, this.options.height);
    this.setTitle(this.options.title)
    Windows.register(this);      
  },
  
  // Destructor
  destroy: function() {
    this._notify("onDestroy");
    Event.stopObserving(this.topbar, "mousedown", this.eventMouseDown);
    Event.stopObserving(this.bottombar, "mousedown", this.eventMouseDown);
    Event.stopObserving(this.content, "mousedown", this.eventMouseDownContent);
    
    Event.stopObserving(window, "load", this.eventOnLoad);
    Event.stopObserving(window, "resize", this.eventResize);
    Event.stopObserving(window, "scroll", this.eventResize);
    
    Event.stopObserving(this.content, "load", this.options.onload);

    if (this._oldParent) {
      var content = this.getContent();
      var originalContent = null;
      for(var i = 0; i < content.childNodes.length; i++) {
        originalContent = content.childNodes[i];
        if (originalContent.nodeType == 1) 
          break;
        originalContent = null;
      }
      if (originalContent)
        this._oldParent.appendChild(originalContent);
      this._oldParent = null;
    }

    if (this.sizer)
        Event.stopObserving(this.sizer, "mousedown", this.eventMouseDown);

    if (this.options.url) 
      this.content.src = null

     if(this.iefix) 
      Element.remove(this.iefix);

    Element.remove(this.element);
    Windows.unregister(this);      
  },
    
  // Sets close callback, if it sets, it should return true to be able to close the window.
  setCloseCallback: function(callback) {
    this.options.closeCallback = callback;
  },
  
  // Gets window content
  getContent: function () {
    return this.content;
  },
  
  // Sets the content with an element id
  setContent: function(id, autoresize, autoposition) {
    var element = $(id);
    if (null == element) throw "Unable to find element '" + id + "' in DOM";
    this._oldParent = element.parentNode;

    var d = null;
    var p = null;

    if (autoresize) 
      d = Element.getDimensions(element);
    if (autoposition) 
      p = Position.cumulativeOffset(element);

    var content = this.getContent();
    // Clear HTML (and even iframe)
    this.setHTMLContent("");
    content = this.getContent();
    
    content.appendChild(element);
    element.show();
    if (autoresize) 
      this.setSize(d.width, d.height);
    if (autoposition) 
      this.setLocation(p[1] - this.heightN, p[0] - this.widthW);    
  },
  
  setHTMLContent: function(html) {
    // It was an url (iframe), recreate a div content instead of iframe content
    if (this.options.url) {
      this.content.src = null;
      this.options.url = null;
      
  	  var content ="<div id=\"" + this.getId() + "_content\" class=\"" + this.options.className + "_content\"> </div>";
      $(this.getId() +"_table_content").innerHTML = content;
      
      this.content = $(this.element.id + "_content");
    }
      
    this.getContent().innerHTML = html;
  },
  
  setAjaxContent: function(url, options, showCentered, showModal) {
    this.showFunction = showCentered ? "showCenter" : "show";
    this.showModal = showModal || false;
  
    options = options || {};

    // Clear HTML (and even iframe)
    this.setHTMLContent("");
 
    this.onComplete = options.onComplete;
    if (! this._onCompleteHandler)
      this._onCompleteHandler = this._setAjaxContent.bind(this);
    options.onComplete = this._onCompleteHandler;

    new Ajax.Request(url, options);    
    options.onComplete = this.onComplete;
  },
  
  _setAjaxContent: function(originalRequest) {
    Element.update(this.getContent(), originalRequest.responseText);
    if (this.onComplete)
      this.onComplete(originalRequest);
    this.onComplete = null;
    this[this.showFunction](this.showModal)
  },
  
  setURL: function(url) {
    // Not an url content, change div to iframe
    if (this.options.url) 
      this.content.src = null;
    this.options.url = url;
    var content= "<iframe frameborder='0' name='" + this.getId() + "_content'  id='" + this.getId() + "_content' src='" + url + "' width='" + this.width + "' height='" + this.height + "'> </iframe>";
    $(this.getId() +"_table_content").innerHTML = content;
    
    this.content = $(this.element.id + "_content");
  },

  getURL: function() {
  	return this.options.url ? this.options.url : null;
  },

  refresh: function() {
    if (this.options.url)
	    $(this.element.getAttribute('id') + '_content').src = this.options.url;
  },
  
  // Stores position/size in a cookie, by default named with window id
  setCookie: function(name, expires, path, domain, secure) {
    name = name || this.element.id;
    this.cookie = [name, expires, path, domain, secure];
    
    // Get cookie
    var value = WindowUtilities.getCookie(name)
    // If exists
    if (value) {
      var values = value.split(',');
      var x = values[0].split(':');
      var y = values[1].split(':');

      var w = parseFloat(values[2]), h = parseFloat(values[3]);
      var mini = values[4];
      var maxi = values[5];

      this.setSize(w, h);
      if (mini == "true")
        this.doMinimize = true; // Minimize will be done at onload window event
      else if (maxi == "true")
        this.doMaximize = true; // Maximize will be done at onload window event

      this.useLeft = x[0] == "l";
      this.useTop = y[0] == "t";

      this.element.setStyle(this.useLeft ? {left: x[1]} : {right: x[1]});
      this.element.setStyle(this.useTop ? {top: y[1]} : {bottom: y[1]});
    }
  },
  
  // Gets window ID
  getId: function() {
    return this.element.id;
  },
  
  // Detroys itself when closing 
  setDestroyOnClose: function() {
    this.options.destroyOnClose = true;
  },
  
  setConstraint: function(bool, padding) {
    this.constraint = bool;
    this.constraintPad = Object.extend(this.constraintPad, padding || {});
    // Reset location to apply constraint
    if (this.useTop && this.useLeft)
      this.setLocation(parseFloat(this.element.style.top), parseFloat(this.element.style.left));
  },
  
  // initDrag event

  _initDrag: function(event) {
    // No resize on minimized window
    if (Event.element(event) == this.sizer && this.isMinimized())
      return;

    // No move on maximzed window
    if (Event.element(event) != this.sizer && this.isMaximized())
      return;
      
    if (Prototype.Browser.IE && this.heightN == 0)
      this._getWindowBorderSize();
    
    // Get pointer X,Y
    this.pointer = [this._round(Event.pointerX(event), this.options.gridX), this._round(Event.pointerY(event), this.options.gridY)];
    if (this.options.wiredDrag) 
      this.currentDrag = this._createWiredElement();
    else
      this.currentDrag = this.element;
      
    // Resize
    if (Event.element(event) == this.sizer) {
      this.doResize = true;
      this.widthOrg = this.width;
      this.heightOrg = this.height;
      this.bottomOrg = parseFloat(this.element.getStyle('bottom'));
      this.rightOrg = parseFloat(this.element.getStyle('right'));
      this._notify("onStartResize");
    }
    else {
      this.doResize = false;

      // Check if click on close button, 
      var closeButton = $(this.getId() + '_close');
      if (closeButton && Position.within(closeButton, this.pointer[0], this.pointer[1])) {
        this.currentDrag = null;
        return;
      }

      this.toFront();

      if (! this.options.draggable) 
        return;
      this._notify("onStartMove");
    }    
    // Register global event to capture mouseUp and mouseMove
    Event.observe(document, "mouseup", this.eventMouseUp, false);
    Event.observe(document, "mousemove", this.eventMouseMove, false);
    
    // Add an invisible div to keep catching mouse event over iframes
    WindowUtilities.disableScreen('__invisible__', '__invisible__', this.overlayOpacity);

    // Stop selection while dragging
    document.body.ondrag = function () { return false; };
    document.body.onselectstart = function () { return false; };
    
    this.currentDrag.show();
    Event.stop(event);
  },
  
  _round: function(val, round) {
    return round == 1 ? val  : val = Math.floor(val / round) * round;
  },

  // updateDrag event
  _updateDrag: function(event) {
    var pointer =  [this._round(Event.pointerX(event), this.options.gridX), this._round(Event.pointerY(event), this.options.gridY)];  
    var dx = pointer[0] - this.pointer[0];
    var dy = pointer[1] - this.pointer[1];
    
    // Resize case, update width/height
    if (this.doResize) {
      var w = this.widthOrg + dx;
      var h = this.heightOrg + dy;
      
      dx = this.width - this.widthOrg
      dy = this.height - this.heightOrg
      
      // Check if it's a right position, update it to keep upper-left corner at the same position
      if (this.useLeft) 
        w = this._updateWidthConstraint(w)
      else 
        this.currentDrag.setStyle({right: (this.rightOrg -dx) + 'px'});
      // Check if it's a bottom position, update it to keep upper-left corner at the same position
      if (this.useTop) 
        h = this._updateHeightConstraint(h)
      else
        this.currentDrag.setStyle({bottom: (this.bottomOrg -dy) + 'px'});
        
      this.setSize(w , h);
      this._notify("onResize");
    }
    // Move case, update top/left
    else {
      this.pointer = pointer;
      
      if (this.useLeft) {
        var left =  parseFloat(this.currentDrag.getStyle('left')) + dx;
        var newLeft = this._updateLeftConstraint(left);
        // Keep mouse pointer correct
        this.pointer[0] += newLeft-left;
        this.currentDrag.setStyle({left: newLeft + 'px'});
      }
      else 
        this.currentDrag.setStyle({right: parseFloat(this.currentDrag.getStyle('right')) - dx + 'px'});
      
      if (this.useTop) {
        var top =  parseFloat(this.currentDrag.getStyle('top')) + dy;
        var newTop = this._updateTopConstraint(top);
        // Keep mouse pointer correct
        this.pointer[1] += newTop - top;
        this.currentDrag.setStyle({top: newTop + 'px'});
      }
      else 
        this.currentDrag.setStyle({bottom: parseFloat(this.currentDrag.getStyle('bottom')) - dy + 'px'});

      this._notify("onMove");
    }
    if (this.iefix) 
      this._fixIEOverlapping(); 
      
    this._removeStoreLocation();
    Event.stop(event);
  },

   // endDrag callback
   _endDrag: function(event) {
    // Remove temporary div over iframes
     WindowUtilities.enableScreen('__invisible__');
    
    if (this.doResize)
      this._notify("onEndResize");
    else
      this._notify("onEndMove");
    
    // Release event observing
    Event.stopObserving(document, "mouseup", this.eventMouseUp,false);
    Event.stopObserving(document, "mousemove", this.eventMouseMove, false);

    Event.stop(event);
    
    this._hideWiredElement();

    // Store new location/size if need be
    this._saveCookie()
      
    // Restore selection
    document.body.ondrag = null;
    document.body.onselectstart = null;
  },

  _updateLeftConstraint: function(left) {
    if (this.constraint && this.useLeft && this.useTop) {
      var width = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width;

      if (left < this.constraintPad.left)
        left = this.constraintPad.left;
      if (left + this.width + this.widthE + this.widthW > width - this.constraintPad.right) 
        left = width - this.constraintPad.right - this.width - this.widthE - this.widthW;
    }
    return left;
  },
  
  _updateTopConstraint: function(top) {
    if (this.constraint && this.useLeft && this.useTop) {        
      var height = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height;
      
      var h = this.height + this.heightN + this.heightS;

      if (top < this.constraintPad.top)
        top = this.constraintPad.top;
      if (top + h > height - this.constraintPad.bottom) 
        top = height - this.constraintPad.bottom - h;
    }
    return top;
  },
  
  _updateWidthConstraint: function(w) {
    if (this.constraint && this.useLeft && this.useTop) {
      var width = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width;
      var left =  parseFloat(this.element.getStyle("left"));

      if (left + w + this.widthE + this.widthW > width - this.constraintPad.right) 
        w = width - this.constraintPad.right - left - this.widthE - this.widthW;
    }
    return w;
  },
  
  _updateHeightConstraint: function(h) {
    if (this.constraint && this.useLeft && this.useTop) {
      var height = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height;
      var top =  parseFloat(this.element.getStyle("top"));

      if (top + h + this.heightN + this.heightS > height - this.constraintPad.bottom) 
        h = height - this.constraintPad.bottom - top - this.heightN - this.heightS;
    }
    return h;
  },
  
  
  // Creates HTML window code
  _createWindow: function(id) {
    var className = this.options.className;
    var win = document.createElement("div");
    win.setAttribute('id', id);
    win.className = "dialog";

    var content;
    if (this.options.url)
      content= "<iframe frameborder=\"0\" name=\"" + id + "_content\"  id=\"" + id + "_content\" src=\"" + this.options.url + "\" allowtransparency=\"true\"> </iframe>";
    else
      content ="<div id=\"" + id + "_content\" class=\"" +className + "_content\"> </div>";

    var closeDiv = this.options.closable ? "<div class='"+ className +"_close' id='"+ id +"_close' onclick='Windows.close(\""+ id +"\", event)'> </div>" : "";
    var minDiv = this.options.minimizable ? "<div class='"+ className + "_minimize' id='"+ id +"_minimize' onclick='Windows.minimize(\""+ id +"\", event)'> </div>" : "";
    var maxDiv = this.options.maximizable ? "<div class='"+ className + "_maximize' id='"+ id +"_maximize' onclick='Windows.maximize(\""+ id +"\", event)'> </div>" : "";
    var seAttributes = this.options.resizable ? "class='" + className + "_sizer' id='" + id + "_sizer'" : "class='"  + className + "_se'";
    var blank = "../themes/default/blank.gif";
    
    win.innerHTML = closeDiv + minDiv + maxDiv + "\
      <table id='"+ id +"_row1' class=\"top table_window\">\
        <tr>\
          <td class='"+ className +"_nw'></td>\
          <td class='"+ className +"_n'><div id='"+ id +"_top' class='"+ className +"_title title_window'>"+ this.options.title +"</div></td>\
          <td class='"+ className +"_ne'></td>\
        </tr>\
      </table>\
      <table id='"+ id +"_row2' class=\"mid table_window\">\
        <tr>\
          <td class='"+ className +"_w'></td>\
            <td id='"+ id +"_table_content' class='"+ className +"_content' valign='top'>" + content + "</td>\
          <td class='"+ className +"_e'></td>\
        </tr>\
      </table>\
        <table id='"+ id +"_row3' class=\"bot table_window\">\
        <tr>\
          <td class='"+ className +"_sw'></td>\
            <td class='"+ className +"_s'><div id='"+ id +"_bottom' class='status_bar'><span style='float:left; width:1px; height:1px'></span></div></td>\
            <td class='"+ className +"_se' " + seAttributes + "></td>\
        </tr>\
      </table>\
    ";
    Element.hide(win);
    this.options.parent.insertBefore(win, this.options.parent.firstChild);
    Event.observe($(id + "_content"), "load", this.options.onload);
    return win;
  },
  
  
  changeClassName: function(newClassName) {    
    var className = this.options.className;
    var id = this.getId();
    $A(["_close", "_minimize", "_maximize", "_sizer", "_content"]).each(function(value) { this._toggleClassName($(id + value), className + value, newClassName + value) }.bind(this));
    this._toggleClassName($(id + "_top"), className + "_title", newClassName + "_title");
    $$("#" + id + " td").each(function(td) {td.className = td.className.sub(className,newClassName); });
    this.options.className = newClassName;
  },
  
  _toggleClassName: function(element, oldClassName, newClassName) { 
    if (element) {
      element.removeClassName(oldClassName);
      element.addClassName(newClassName);
    }
  },
  
  // Sets window location
  setLocation: function(top, left) {
    top = this._updateTopConstraint(top);
    left = this._updateLeftConstraint(left);

    var e = this.currentDrag || this.element;
    e.setStyle({top: top + 'px'});
    e.setStyle({left: left + 'px'});

    this.useLeft = true;
    this.useTop = true;
  },
    
  getLocation: function() {
    var location = {};
    if (this.useTop)
      location = Object.extend(location, {top: this.element.getStyle("top")});
    else
      location = Object.extend(location, {bottom: this.element.getStyle("bottom")});
    if (this.useLeft)
      location = Object.extend(location, {left: this.element.getStyle("left")});
    else
      location = Object.extend(location, {right: this.element.getStyle("right")});
    
    return location;
  },
  
  // Gets window size
  getSize: function() {
    return {width: this.width, height: this.height};
  },
    
  // Sets window size
  setSize: function(width, height, useEffect) {    
    width = parseFloat(width);
    height = parseFloat(height);
    
    // Check min and max size
    if (!this.minimized && width < this.options.minWidth)
      width = this.options.minWidth;

    if (!this.minimized && height < this.options.minHeight)
      height = this.options.minHeight;
      
    if (this.options. maxHeight && height > this.options. maxHeight)
      height = this.options. maxHeight;

    if (this.options. maxWidth && width > this.options. maxWidth)
      width = this.options. maxWidth;

    
    if (this.useTop && this.useLeft && Window.hasEffectLib && Effect.ResizeWindow && useEffect) {
      new Effect.ResizeWindow(this, null, null, width, height, {duration: Window.resizeEffectDuration});
    } else {
      this.width = width;
      this.height = height;
      var e = this.currentDrag ? this.currentDrag : this.element;

      e.setStyle({width: width + this.widthW + this.widthE + "px"})
      e.setStyle({height: height  + this.heightN + this.heightS + "px"})

      // Update content size
      if (!this.currentDrag || this.currentDrag == this.element) {
        var content = $(this.element.id + '_content');
        content.setStyle({height: height  + 'px'});
        content.setStyle({width: width  + 'px'});
      }
    }
  },
  
  updateHeight: function() {
    this.setSize(this.width, this.content.scrollHeight, true);
  },
  
  updateWidth: function() {
    this.setSize(this.content.scrollWidth, this.height, true);
  },
  
  // Brings window to front
  toFront: function() {
    if (this.element.style.zIndex < Windows.maxZIndex)  
      this.setZIndex(Windows.maxZIndex + 1);
    if (this.iefix) 
      this._fixIEOverlapping(); 
  },
   
  getBounds: function(insideOnly) {
    if (! this.width || !this.height || !this.visible)  
      this.computeBounds();
    var w = this.width;
    var h = this.height;

    if (!insideOnly) {
      w += this.widthW + this.widthE;
      h += this.heightN + this.heightS;
    }
    var bounds = Object.extend(this.getLocation(), {width: w + "px", height: h + "px"});
    return bounds;
  },
      
  computeBounds: function() {
     if (! this.width || !this.height) {
      var size = WindowUtilities._computeSize(this.content.innerHTML, this.content.id, this.width, this.height, 0, this.options.className)
      if (this.height)
        this.width = size + 5
      else
        this.height = size + 5
    }

    this.setSize(this.width, this.height);
    if (this.centered)
      this._center(this.centerTop, this.centerLeft);    
  },
  
  // Displays window modal state or not
  show: function(modal) {
    this.visible = true;
    if (modal) {
      // Hack for Safari !!
      if (typeof this.overlayOpacity == "undefined") {
        var that = this;
        setTimeout(function() {that.show(modal)}, 10);
        return;
      }
      Windows.addModalWindow(this);
      
      this.modal = true;      
      this.setZIndex(Windows.maxZIndex + 1);
      Windows.unsetOverflow(this);
    }
    else    
      if (!this.element.style.zIndex) 
        this.setZIndex(Windows.maxZIndex + 1);        
      
    // To restore overflow if need be
    if (this.oldStyle)
      this.getContent().setStyle({overflow: this.oldStyle});
      
    this.computeBounds();
    
    this._notify("onBeforeShow");   
    if (this.options.showEffect != Element.show && this.options.showEffectOptions)
      this.options.showEffect(this.element, this.options.showEffectOptions);  
    else
      this.options.showEffect(this.element);  
      
    this._checkIEOverlapping();
    WindowUtilities.focusedWindow = this
    this._notify("onShow");   
  },
  
  // Displays window modal state or not at the center of the page
  showCenter: function(modal, top, left) {
    this.centered = true;
    this.centerTop = top;
    this.centerLeft = left;

    this.show(modal);
  },
  
  isVisible: function() {
    return this.visible;
  },
  
  _center: function(top, left) {    
    var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);    
    var pageSize = WindowUtilities.getPageSize(this.options.parent);    
    if (typeof top == "undefined")
      top = (pageSize.windowHeight - (this.height + this.heightN + this.heightS))/2;
    top += windowScroll.top
    
    if (typeof left == "undefined")
      left = (pageSize.windowWidth - (this.width + this.widthW + this.widthE))/2;
    left += windowScroll.left      
    this.setLocation(top, left);
    this.toFront();
  },
  
  _recenter: function(event) {     
    if (this.centered) {
      var pageSize = WindowUtilities.getPageSize(this.options.parent);
      var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);    

      // Check for this stupid IE that sends dumb events
      if (this.pageSize && this.pageSize.windowWidth == pageSize.windowWidth && this.pageSize.windowHeight == pageSize.windowHeight && 
          this.windowScroll.left == windowScroll.left && this.windowScroll.top == windowScroll.top) 
        return;
      this.pageSize = pageSize;
      this.windowScroll = windowScroll;
      // set height of Overlay to take up whole page and show
      if ($('overlay_modal')) 
        $('overlay_modal').setStyle({height: (pageSize.pageHeight + 'px')});
      
      if (this.options.recenterAuto)
        this._center(this.centerTop, this.centerLeft);    
    }
  },
  
  // Hides window
  hide: function() {
    this.visible = false;
    if (this.modal) {
      Windows.removeModalWindow(this);
      Windows.resetOverflow();
    }
    // To avoid bug on scrolling bar
    this.oldStyle = this.getContent().getStyle('overflow') || "auto"
    this.getContent().setStyle({overflow: "hidden"});

    // for some reason calling Fade in IE 6 is troublesome
    var ie6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;
    if (ie6)
    	Element.hide(this.element);
    else
    	this.options.hideEffect(this.element, this.options.hideEffectOptions);

     if(this.iefix) 
      this.iefix.hide();

    if (!this.doNotNotifyHide)
      this._notify("onHide");
  },

  close: function() {
    // Asks closeCallback if exists
    if (this.visible) {
      if (this.options.closeCallback && ! this.options.closeCallback(this)) 
        return;

      if (this.options.destroyOnClose) {
        var destroyFunc = this.destroy.bind(this);
        if (this.options.hideEffectOptions.afterFinish) {
          var func = this.options.hideEffectOptions.afterFinish;
          this.options.hideEffectOptions.afterFinish = function() {func();destroyFunc() }
        }
        else 
          this.options.hideEffectOptions.afterFinish = function() {destroyFunc() }
      }
      Windows.updateFocusedWindow();
      
      this.doNotNotifyHide = true;
      this.hide();
      this.doNotNotifyHide = false;
      this._notify("onClose");
    }
  },
  
  minimize: function() {
    if (this.resizing)
      return;
    
    var r2 = $(this.getId() + "_row2");
    
    if (!this.minimized) {
      this.minimized = true;

      var dh = r2.getDimensions().height;
      this.r2Height = dh;
      var h  = this.element.getHeight() - dh;

      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, null, null, null, this.height -dh, {duration: Window.resizeEffectDuration});
      } else  {
        this.height -= dh;
        this.element.setStyle({height: h + "px"});
        r2.hide();
      }

      if (! this.useTop) {
        var bottom = parseFloat(this.element.getStyle('bottom'));
        this.element.setStyle({bottom: (bottom + dh) + 'px'});
      }
    } 
    else {      
      this.minimized = false;
      
      var dh = this.r2Height;
      this.r2Height = null;
      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, null, null, null, this.height + dh, {duration: Window.resizeEffectDuration});
      }
      else {
        var h  = this.element.getHeight() + dh;
        this.height += dh;
        this.element.setStyle({height: h + "px"})
        r2.show();
      }
      if (! this.useTop) {
        var bottom = parseFloat(this.element.getStyle('bottom'));
        this.element.setStyle({bottom: (bottom - dh) + 'px'});
      }
      this.toFront();
    }
    this._notify("onMinimize");
    
    // Store new location/size if need be
    this._saveCookie()
  },
  
  maximize: function() {
    if (this.isMinimized() || this.resizing)
      return;
  
    if (Prototype.Browser.IE && this.heightN == 0)
      this._getWindowBorderSize();
      
    if (this.storedLocation != null) {
      this._restoreLocation();
      if(this.iefix) 
        this.iefix.hide();
    }
    else {
      this._storeLocation();
      Windows.unsetOverflow(this);
      
      var windowScroll = WindowUtilities.getWindowScroll(this.options.parent);
      var pageSize = WindowUtilities.getPageSize(this.options.parent);    
      var left = windowScroll.left;
      var top = windowScroll.top;
      
      if (this.options.parent != document.body) {
        windowScroll =  {top:0, left:0, bottom:0, right:0};
        var dim = this.options.parent.getDimensions();
        pageSize.windowWidth = dim.width;
        pageSize.windowHeight = dim.height;
        top = 0; 
        left = 0;
      }
      
      if (this.constraint) {
        pageSize.windowWidth -= Math.max(0, this.constraintPad.left) + Math.max(0, this.constraintPad.right);
        pageSize.windowHeight -= Math.max(0, this.constraintPad.top) + Math.max(0, this.constraintPad.bottom);
        left +=  Math.max(0, this.constraintPad.left);
        top +=  Math.max(0, this.constraintPad.top);
      }
      
      var width = pageSize.windowWidth - this.widthW - this.widthE;
      var height= pageSize.windowHeight - this.heightN - this.heightS;

      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) {
        new Effect.ResizeWindow(this, top, left, width, height, {duration: Window.resizeEffectDuration});
      }
      else {
        this.setSize(width, height);
        this.element.setStyle(this.useLeft ? {left: left} : {right: left});
        this.element.setStyle(this.useTop ? {top: top} : {bottom: top});
      }
        
      this.toFront();
      if (this.iefix) 
        this._fixIEOverlapping(); 
    }
    this._notify("onMaximize");

    // Store new location/size if need be
    this._saveCookie()
  },
  
  isMinimized: function() {
    return this.minimized;
  },
  
  isMaximized: function() {
    return (this.storedLocation != null);
  },
  
  setOpacity: function(opacity) {
    if (Element.setOpacity)
      Element.setOpacity(this.element, opacity);
  },
  
  setZIndex: function(zindex) {
    this.element.setStyle({zIndex: zindex});
    Windows.updateZindex(zindex, this);
  },

  setTitle: function(newTitle) {
    if (!newTitle || newTitle == "") 
      newTitle = "&nbsp;";
      
    Element.update(this.element.id + '_top', newTitle);
  },
   
  getTitle: function() {
    return $(this.element.id + '_top').innerHTML;
  },
  
  setStatusBar: function(element) {
    var statusBar = $(this.getId() + "_bottom");

    if (typeof(element) == "object") {
      if (this.bottombar.firstChild)
        this.bottombar.replaceChild(element, this.bottombar.firstChild);
      else
        this.bottombar.appendChild(element);
    }
    else
      this.bottombar.innerHTML = element;
  },

  _checkIEOverlapping: function() {
    if(!this.iefix && (navigator.appVersion.indexOf('MSIE')>0) && (navigator.userAgent.indexOf('Opera')<0) && (this.element.getStyle('position')=='absolute')) {
        new Insertion.After(this.element.id, '<iframe id="' + this.element.id + '_iefix" '+ 'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' + 'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
        this.iefix = $(this.element.id+'_iefix');
    }
    if(this.iefix) 
      setTimeout(this._fixIEOverlapping.bind(this), 50);
  },

  _fixIEOverlapping: function() {
    /* This code is breaking in IE7 because it somehow tries to 
     * get styles of the parent of an HTML tag.  This isn't allowed
     * I suspect that it is caused by a prototype error.
      
      Position.clone(this.element, this.iefix);
       */
      Element.clonePosition(this.iefix, this.element);
      this.iefix.style.zIndex = this.element.style.zIndex - 1;
      this.iefix.show();
  },
  
  _getWindowBorderSize: function(event) {
    // Hack to get real window border size!!
    var div = this._createHiddenDiv(this.options.className + "_n")
    this.heightN = Element.getDimensions(div).height;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_s")
    this.heightS = Element.getDimensions(div).height;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_e")
    this.widthE = Element.getDimensions(div).width;    
    div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.options.className + "_w")
    this.widthW = Element.getDimensions(div).width;
    div.parentNode.removeChild(div);
    
    var div = document.createElement("div");
    div.className = "overlay_" + this.options.className ;
    document.body.appendChild(div);
    //alert("no timeout:\nopacity: " + div.getStyle("opacity") + "\nwidth: " + document.defaultView.getComputedStyle(div, null).width);
    var that = this;
    
    // Workaround for Safari!!
    setTimeout(function() {that.overlayOpacity = ($(div).getStyle("opacity")); div.parentNode.removeChild(div);}, 10);
    
    // Workaround for IE!!
    if (Prototype.Browser.IE) {
      this.heightS = $(this.getId() +"_row3").getDimensions().height;
      this.heightN = $(this.getId() +"_row1").getDimensions().height;
    }

    // Safari size fix
    if (Prototype.Browser.WebKit && Prototype.Browser.WebKitVersion < 420)
      this.setSize(this.width, this.height);
    if (this.doMaximize)
      this.maximize();
    if (this.doMinimize)
      this.minimize();
  },
 
  _createHiddenDiv: function(className) {
    var objBody = document.body;
    var win = document.createElement("div");
    win.setAttribute('id', this.element.id+ "_tmp");
    win.className = className;
    win.style.display = 'none';
    win.innerHTML = '';
    objBody.insertBefore(win, objBody.firstChild);
    return win;
  },
  
  _storeLocation: function() {
    if (this.storedLocation == null) {
      this.storedLocation = {useTop: this.useTop, useLeft: this.useLeft, 
                             top: this.element.getStyle('top'), bottom: this.element.getStyle('bottom'),
                             left: this.element.getStyle('left'), right: this.element.getStyle('right'),
                             width: this.width, height: this.height };
    }
  },
  
  _restoreLocation: function() {
    if (this.storedLocation != null) {
      this.useLeft = this.storedLocation.useLeft;
      this.useTop = this.storedLocation.useTop;
      
      if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow)
        new Effect.ResizeWindow(this, this.storedLocation.top, this.storedLocation.left, this.storedLocation.width, this.storedLocation.height, {duration: Window.resizeEffectDuration});
      else {
        this.element.setStyle(this.useLeft ? {left: this.storedLocation.left} : {right: this.storedLocation.right});
        this.element.setStyle(this.useTop ? {top: this.storedLocation.top} : {bottom: this.storedLocation.bottom});
        this.setSize(this.storedLocation.width, this.storedLocation.height);
      }
      
      Windows.resetOverflow();
      this._removeStoreLocation();
    }
  },
  
  _removeStoreLocation: function() {
    this.storedLocation = null;
  },
  
  _saveCookie: function() {
    if (this.cookie) {
      var value = "";
      if (this.useLeft)
        value += "l:" +  (this.storedLocation ? this.storedLocation.left : this.element.getStyle('left'))
      else
        value += "r:" + (this.storedLocation ? this.storedLocation.right : this.element.getStyle('right'))
      if (this.useTop)
        value += ",t:" + (this.storedLocation ? this.storedLocation.top : this.element.getStyle('top'))
      else
        value += ",b:" + (this.storedLocation ? this.storedLocation.bottom :this.element.getStyle('bottom'))
        
      value += "," + (this.storedLocation ? this.storedLocation.width : this.width);
      value += "," + (this.storedLocation ? this.storedLocation.height : this.height);
      value += "," + this.isMinimized();
      value += "," + this.isMaximized();
      WindowUtilities.setCookie(value, this.cookie)
    }
  },
  
  _createWiredElement: function() {
    if (! this.wiredElement) {
      if (Prototype.Browser.IE)
        this._getWindowBorderSize();
      var div = document.createElement("div");
      div.className = "wired_frame " + this.options.className + "_wired_frame";
      
      div.style.position = 'absolute';
      this.options.parent.insertBefore(div, this.options.parent.firstChild);
      this.wiredElement = $(div);
    }
    if (this.useLeft) 
      this.wiredElement.setStyle({left: this.element.getStyle('left')});
    else 
      this.wiredElement.setStyle({right: this.element.getStyle('right')});
      
    if (this.useTop) 
      this.wiredElement.setStyle({top: this.element.getStyle('top')});
    else 
      this.wiredElement.setStyle({bottom: this.element.getStyle('bottom')});

    var dim = this.element.getDimensions();
    this.wiredElement.setStyle({width: dim.width + "px", height: dim.height +"px"});

    this.wiredElement.setStyle({zIndex: Windows.maxZIndex+30});
    return this.wiredElement;
  },
  
  _hideWiredElement: function() {
    if (! this.wiredElement || ! this.currentDrag)
      return;
    if (this.currentDrag == this.element) 
      this.currentDrag = null;
    else {
      if (this.useLeft) 
        this.element.setStyle({left: this.currentDrag.getStyle('left')});
      else 
        this.element.setStyle({right: this.currentDrag.getStyle('right')});

      if (this.useTop) 
        this.element.setStyle({top: this.currentDrag.getStyle('top')});
      else 
        this.element.setStyle({bottom: this.currentDrag.getStyle('bottom')});

      this.currentDrag.hide();
      this.currentDrag = null;
      if (this.doResize)
        this.setSize(this.width, this.height);
    } 
  },
  
  _notify: function(eventName) {
    if (this.options[eventName])
      this.options[eventName](this);
    else
      Windows.notify(eventName, this);
  }
};

// Windows containers, register all page windows
var Windows = {
  windows: [],
  modalWindows: [],
  observers: [],
  focusedWindow: null,
  maxZIndex: 0,
  overlayShowEffectOptions: {duration: 0.5},
  overlayHideEffectOptions: {duration: 0.5},

  addObserver: function(observer) {
    this.removeObserver(observer);
    this.observers.push(observer);
  },
  
  removeObserver: function(observer) {  
    this.observers = this.observers.reject( function(o) { return o==observer });
  },
  
  // onDestroy onStartResize onStartMove onResize onMove onEndResize onEndMove onFocus onBlur onBeforeShow onShow onHide onMinimize onMaximize onClose
  notify: function(eventName, win) {  
    this.observers.each( function(o) {if(o[eventName]) o[eventName](eventName, win);});
  },

  // Gets window from its id
  getWindow: function(id) {
    return this.windows.detect(function(d) { return d.getId() ==id });
  },

  // Gets the last focused window
  getFocusedWindow: function() {
    return this.focusedWindow;
  },

  updateFocusedWindow: function() {
    this.focusedWindow = this.windows.length >=2 ? this.windows[this.windows.length-2] : null;    
  },
  
  // Registers a new window (called by Windows constructor)
  register: function(win) {
    this.windows.push(win);
  },
    
  // Add a modal window in the stack
  addModalWindow: function(win) {
    // Disable screen if first modal window
    if (this.modalWindows.length == 0) {
      WindowUtilities.disableScreen(win.options.className, 'overlay_modal', win.overlayOpacity, win.getId(), win.options.parent);
    }
    else {
      // Move overlay over all windows
      if (Window.keepMultiModalWindow) {
        $('overlay_modal').style.zIndex = Windows.maxZIndex + 1;
        Windows.maxZIndex += 1;
        WindowUtilities._hideSelect(this.modalWindows.last().getId());
      }
      // Hide current modal window
      else
        this.modalWindows.last().element.hide();
      // IE select issue
      WindowUtilities._showSelect(win.getId());
    }      
    this.modalWindows.push(win);    
  },
  
  removeModalWindow: function(win) {
    this.modalWindows.pop();
    
    // No more modal windows
    if (this.modalWindows.length == 0)
      WindowUtilities.enableScreen();     
    else {
      if (Window.keepMultiModalWindow) {
        this.modalWindows.last().toFront();
        WindowUtilities._showSelect(this.modalWindows.last().getId());        
      }
      else
        this.modalWindows.last().element.show();
    }
  },
  
  // Registers a new window (called by Windows constructor)
  register: function(win) {
    this.windows.push(win);
  },
  
  // Unregisters a window (called by Windows destructor)
  unregister: function(win) {
    this.windows = this.windows.reject(function(d) { return d==win });
  }, 
  
  // Closes all windows
  closeAll: function() {  
    this.windows.each( function(w) {Windows.close(w.getId())} );
  },
  
  closeAllModalWindows: function() {
    WindowUtilities.enableScreen();     
    this.modalWindows.each( function(win) {if (win) win.close()});    
  },

  // Minimizes a window with its id
  minimize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible)
      win.minimize();
    Event.stop(event);
  },
  
  // Maximizes a window with its id
  maximize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible)
      win.maximize();
    Event.stop(event);
  },

  // Closes a window with its id
  close: function(id, event) {
    var win = this.getWindow(id);
    if (win) 
      win.close();
    if (event)
      Event.stop(event);
  },
  
  blur: function(id) {
    var win = this.getWindow(id);  
    if (!win)
      return;
    if (win.options.blurClassName)
      win.changeClassName(win.options.blurClassName);
    if (this.focusedWindow == win)  
      this.focusedWindow = null;
    win._notify("onBlur");  
  },
  
  focus: function(id) {
    var win = this.getWindow(id);  
    if (!win)
      return;       
    if (this.focusedWindow)
      this.blur(this.focusedWindow.getId())

    if (win.options.focusClassName)
      win.changeClassName(win.options.focusClassName);  
    this.focusedWindow = win;
    win._notify("onFocus");
  },
  
  unsetOverflow: function(except) {    
    this.windows.each(function(d) { d.oldOverflow = d.getContent().getStyle("overflow") || "auto" ; d.getContent().setStyle({overflow: "hidden"}) });
    if (except && except.oldOverflow)
      except.getContent().setStyle({overflow: except.oldOverflow});
  },

  resetOverflow: function() {
    this.windows.each(function(d) { if (d.oldOverflow) d.getContent().setStyle({overflow: d.oldOverflow}) });
  },

  updateZindex: function(zindex, win) { 
    if (zindex > this.maxZIndex) {   
      this.maxZIndex = zindex;    
      if (this.focusedWindow) 
        this.blur(this.focusedWindow.getId())
    }
    this.focusedWindow = win;
    if (this.focusedWindow) 
      this.focus(this.focusedWindow.getId())
  }
};

var Dialog = {
  dialogId: null,
  onCompleteFunc: null,
  callFunc: null, 
  parameters: null, 
    
  confirm: function(content, parameters) {
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.confirm);
      return 
    }
    content = content || "";
    
    parameters = parameters || {};
    var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";
    var cancelLabel = parameters.cancelLabel ? parameters.cancelLabel : "Cancel";

    // Backward compatibility
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};

    parameters.className = parameters.className || "alert";

    var okButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " ok_button'" 
    var cancelButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " cancel_button'" 
    var content = "\
      <div class='" + parameters.className + "_message'>" + content  + "</div>\
        <div class='" + parameters.className + "_buttons'>\
          <input type='button' value='" + okLabel + "' onclick='Dialog.okCallback()' " + okButtonClass + "/>\
          <input type='button' value='" + cancelLabel + "' onclick='Dialog.cancelCallback()' " + cancelButtonClass + "/>\
        </div>\
    ";
    return this._openDialog(content, parameters)
  },
  
  alert: function(content, parameters) {
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.alert);
      return 
    }
    content = content || "";
    
    parameters = parameters || {};
    var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";

    // Backward compatibility    
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};
    
    parameters.className = parameters.className || "alert";
    
    var okButtonClass = "class ='" + (parameters.buttonClass ? parameters.buttonClass + " " : "") + " ok_button'" 
    var content = "\
      <div class='" + parameters.className + "_message'>" + content  + "</div>\
        <div class='" + parameters.className + "_buttons'>\
          <input type='button' value='" + okLabel + "' onclick='Dialog.okCallback()' " + okButtonClass + "/>\
        </div>";                  
    return this._openDialog(content, parameters)
  },
  
  info: function(content, parameters) {   
    // Get Ajax return before
    if (content && typeof content != "string") {
      Dialog._runAjaxRequest(content, parameters, Dialog.info);
      return 
    }
    content = content || "";
     
    // Backward compatibility
    parameters = parameters || {};
    parameters = Object.extend(parameters, parameters.windowParameters || {});
    parameters.windowParameters = parameters.windowParameters || {};
    
    parameters.className = parameters.className || "alert";
    
    var content = "<div id='modal_dialog_message' class='" + parameters.className + "_message'>" + content  + "</div>";
    if (parameters.showProgress)
      content += "<div id='modal_dialog_progress' class='" + parameters.className + "_progress'>  </div>";

    parameters.ok = null;
    parameters.cancel = null;
    
    return this._openDialog(content, parameters)
  },
  
  setInfoMessage: function(message) {
    $('modal_dialog_message').update(message);
  },
  
  closeInfo: function() {
    Windows.close(this.dialogId);
  },
  
  _openDialog: function(content, parameters) {
    var className = parameters.className;
    
    if (! parameters.height && ! parameters.width) {
      parameters.width = WindowUtilities.getPageSize(parameters.options.parent || document.body).pageWidth / 2;
    }
    if (parameters.id)
      this.dialogId = parameters.id;
    else { 
      var t = new Date();
      this.dialogId = 'modal_dialog_' + t.getTime();
      parameters.id = this.dialogId;
    }

    // compute height or width if need be
    if (! parameters.height || ! parameters.width) {
      var size = WindowUtilities._computeSize(content, this.dialogId, parameters.width, parameters.height, 5, className)
      if (parameters.height)
        parameters.width = size + 5
      else
        parameters.height = size + 5
    }
    parameters.effectOptions = parameters.effectOptions ;
    parameters.resizable   = parameters.resizable || false;
    parameters.minimizable = parameters.minimizable || false;
    parameters.maximizable = parameters.maximizable ||  false;
    parameters.draggable   = parameters.draggable || false;
    parameters.closable    = parameters.closable || false;
    
    var win = new Window(parameters);
    win.getContent().innerHTML = content;
    
    win.showCenter(true, parameters.top, parameters.left);  
    win.setDestroyOnClose();
    
    win.cancelCallback = parameters.onCancel || parameters.cancel; 
    win.okCallback = parameters.onOk || parameters.ok;
    
    return win;    
  },
  
  _getAjaxContent: function(originalRequest)  {
      Dialog.callFunc(originalRequest.responseText, Dialog.parameters)
  },
  
  _runAjaxRequest: function(message, parameters, callFunc) {
    if (message.options == null)
      message.options = {}  
    Dialog.onCompleteFunc = message.options.onComplete;
    Dialog.parameters = parameters;
    Dialog.callFunc = callFunc;
    
    message.options.onComplete = Dialog._getAjaxContent;
    new Ajax.Request(message.url, message.options);
  },
  
  okCallback: function() {
    var win = Windows.focusedWindow;
    if (!win.okCallback || win.okCallback(win)) {
      // Remove onclick on button
      $$("#" + win.getId()+" input").each(function(element) {element.onclick=null;})
      win.close();
    }
  },

  cancelCallback: function() {
    var win = Windows.focusedWindow;
    // Remove onclick on button
    $$("#" + win.getId()+" input").each(function(element) {element.onclick=null})
    win.close();
    if (win.cancelCallback)
      win.cancelCallback(win);
  }
}
/*
  Based on Lightbox JS: Fullsize Image Overlays 
  by Lokesh Dhakar - http://www.huddletogether.com

  For more information on this script, visit:
  http://huddletogether.com/projects/lightbox/

  Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
  (basically, do anything you want, just leave my name and link)
*/

if (Prototype.Browser.WebKit) {
  var array = navigator.userAgent.match(new RegExp(/AppleWebKit\/([\d\.\+]*)/));
  Prototype.Browser.WebKitVersion = parseFloat(array[1]);
}

var WindowUtilities = {  
  // From dragdrop.js
  getWindowScroll: function(parent) {
    var T, L, W, H;
    parent = parent || document.body;              
    if (parent != document.body) {
      T = parent.scrollTop;
      L = parent.scrollLeft;
      W = parent.scrollWidth;
      H = parent.scrollHeight;
    } 
    else {
      var w = window;
      with (w.document) {
        if (w.document.documentElement && documentElement.scrollTop) {
          T = documentElement.scrollTop;
          L = documentElement.scrollLeft;
        } else if (w.document.body) {
          T = body.scrollTop;
          L = body.scrollLeft;
        }
        if (w.innerWidth) {
          W = w.innerWidth;
          H = w.innerHeight;
        } else if (w.document.documentElement && documentElement.clientWidth) {
          W = documentElement.clientWidth;
          H = documentElement.clientHeight;
        } else {
          W = body.offsetWidth;
          H = body.offsetHeight
        }
      }
    }
    return { top: T, left: L, width: W, height: H };
  }, 
  //
  // getPageSize()
  // Returns array with page width, height and window width, height
  // Core code from - quirksmode.org
  // Edit for Firefox by pHaez
  //
  getPageSize: function(parent){
    parent = parent || document.body;              
    var windowWidth, windowHeight;
    var pageHeight, pageWidth;
    if (parent != document.body) {
      windowWidth = parent.getWidth();
      windowHeight = parent.getHeight();                                
      pageWidth = parent.scrollWidth;
      pageHeight = parent.scrollHeight;                                
    } 
    else {
      var xScroll, yScroll;

      if (window.innerHeight && window.scrollMaxY) {  
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
      } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
      } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
      }


      if (self.innerHeight) {  // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
      } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
      }  

      // for small pages with total height less then height of the viewport
      if(yScroll < windowHeight){
        pageHeight = windowHeight;
      } else { 
        pageHeight = yScroll;
      }

      // for small pages with total width less then width of the viewport
      if(xScroll < windowWidth){  
        pageWidth = windowWidth;
      } else {
        pageWidth = xScroll;
      }
    }             
    return {pageWidth: pageWidth ,pageHeight: pageHeight , windowWidth: windowWidth, windowHeight: windowHeight};
  },

  disableScreen: function(className, overlayId, overlayOpacity, contentId, parent) {
    WindowUtilities.initLightbox(overlayId, className, function() {this._disableScreen(className, overlayId, overlayOpacity, contentId)}.bind(this), parent || document.body);
  },

  _disableScreen: function(className, overlayId, overlayOpacity, contentId) {
    // prep objects
    var objOverlay = $(overlayId);

    var pageSize = WindowUtilities.getPageSize(objOverlay.parentNode);

    // Hide select boxes as they will 'peek' through the image in IE, store old value
    if (contentId && Prototype.Browser.IE) {
      WindowUtilities._hideSelect();
      WindowUtilities._showSelect(contentId);
    }  
  
    // set height of Overlay to take up whole page and show
    objOverlay.style.height = (pageSize.pageHeight + 'px');
    objOverlay.style.display = 'none'; 
    if (overlayId == "overlay_modal" && Window.hasEffectLib && Windows.overlayShowEffectOptions) {
      objOverlay.overlayOpacity = overlayOpacity;
      new Effect.Appear(objOverlay, Object.extend({from: 0, to: overlayOpacity}, Windows.overlayShowEffectOptions));
    }
    else
      objOverlay.style.display = "block";
  },
  
  enableScreen: function(id) {
    id = id || 'overlay_modal';
    var objOverlay =  $(id);
    if (objOverlay) {
      // hide lightbox and overlay
      if (id == "overlay_modal" && Window.hasEffectLib && Windows.overlayHideEffectOptions)
        new Effect.Fade(objOverlay, Object.extend({from: objOverlay.overlayOpacity, to:0}, Windows.overlayHideEffectOptions));
      else {
        objOverlay.style.display = 'none';
        objOverlay.parentNode.removeChild(objOverlay);
      }
      
      // make select boxes visible using old value
      if (id != "__invisible__") 
        WindowUtilities._showSelect();
    }
  },

  _hideSelect: function(id) {
    if (Prototype.Browser.IE) {
      id = id ==  null ? "" : "#" + id + " ";
      $$(id + 'select').each(function(element) {
        if (! WindowUtilities.isDefined(element.oldVisibility)) {
          element.oldVisibility = element.style.visibility ? element.style.visibility : "visible";
          element.style.visibility = "hidden";
        }
      });
    }
  },
  
  _showSelect: function(id) {
    if (Prototype.Browser.IE) {
      id = id ==  null ? "" : "#" + id + " ";
      $$(id + 'select').each(function(element) {
        if (WindowUtilities.isDefined(element.oldVisibility)) {
          // Why?? Ask IE
          try {
            element.style.visibility = element.oldVisibility;
          } catch(e) {
            element.style.visibility = "visible";
          }
          element.oldVisibility = null;
        }
        else {
          if (element.style.visibility)
            element.style.visibility = "visible";
        }
      });
    }
  },

  isDefined: function(object) {
    return typeof(object) != "undefined" && object != null;
  },
  
  // initLightbox()
  // Function runs on window load, going through link tags looking for rel="lightbox".
  // These links receive onclick events that enable the lightbox display for their targets.
  // The function also inserts html markup at the top of the page which will be used as a
  // container for the overlay pattern and the inline image.
  initLightbox: function(id, className, doneHandler, parent) {
    // Already done, just update zIndex
    if ($(id)) {
      Element.setStyle(id, {zIndex: Windows.maxZIndex + 1});
      Windows.maxZIndex++;
      doneHandler();
    }
    // create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
    else {
      var objOverlay = document.createElement("div");
      objOverlay.setAttribute('id', id);
      objOverlay.className = "overlay_" + className
      objOverlay.style.display = 'none';
      objOverlay.style.position = 'absolute';
      objOverlay.style.top = '0';
      objOverlay.style.left = '0';
      objOverlay.style.zIndex = Windows.maxZIndex + 1;
      Windows.maxZIndex++;
      objOverlay.style.width = '100%';
      parent.insertBefore(objOverlay, parent.firstChild);
      if (Prototype.Browser.WebKit && id == "overlay_modal") {
        setTimeout(function() {doneHandler()}, 10);
      }
      else
        doneHandler();
    }    
  },
  
  setCookie: function(value, parameters) {
    document.cookie= parameters[0] + "=" + escape(value) +
      ((parameters[1]) ? "; expires=" + parameters[1].toGMTString() : "") +
      ((parameters[2]) ? "; path=" + parameters[2] : "") +
      ((parameters[3]) ? "; domain=" + parameters[3] : "") +
      ((parameters[4]) ? "; secure" : "");
  },

  getCookie: function(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
  },
    
  _computeSize: function(content, id, width, height, margin, className) {
    var objBody = document.body;
    var tmpObj = document.createElement("div");
    tmpObj.setAttribute('id', id);
    tmpObj.className = className + "_content";

    if (height)
      tmpObj.style.height = height + "px"
    else
      tmpObj.style.width = width + "px"
  
    tmpObj.style.position = 'absolute';
    tmpObj.style.top = '0';
    tmpObj.style.left = '0';
    tmpObj.style.display = 'none';

    tmpObj.innerHTML = content;
    objBody.insertBefore(tmpObj, objBody.firstChild);

    var size;
    if (height)
      size = $(tmpObj).getDimensions().width + margin;
    else
      size = $(tmpObj).getDimensions().height + margin;
    objBody.removeChild(tmpObj);
    return size;
  }  
}


/* /assets/classpath/20130920/com/ifactory/press/applib/mixins/lightbox.js */;
var currentLightbox = null;
function showLightbox(url, width, height) {
	showLightbox(url, width, height, '&nbsp;');
}

function showLightbox(url, width, height, title) {
	// don't specify an id or we get errors on opening new one's too eagerly
	var win = new Window({
		minimizable : false,
		maximizable : false,
		draggable : true,
		destroyOnClose: true,
		width : width,
		height : height,
		url : url,
		recenterAuto: false,
		title: title,
		zIndex: 10000
	});
	
	currentLightbox = win;
	
	win.showCenter(true, 80);
}

/* /assets/classpath/20130920/com/ifactory/dg/components/DisplayShoppingCartLink.js */;
document.observe("dom:loaded", function() {
	( $("cart") ).observe(Tapestry.ZONE_UPDATED_EVENT, function() { 
		
		( $("cart") ).setAttribute('data-updating', 'true');
		
		( $("cart") ).setAttribute('data-updating', 'false');
		
		$('cart').addClassName('open');
		$('closeCart').observe('click', function(evt) {
			if ($('cart').hasClassName('emptyCart')) {
				$("checkoutLink").show();
				$("cart").removeClassName('emptyCart');
				$("cart").addClassName('filledCart');
			}
			$('cart').removeClassName('open');
			evt.stop();
		});
	});
	
	if ($('shoppingCartInfoLink')) {
		$('shoppingCartInfoLink').writeAttribute('onclick', 'return false;');
	}
});
/* /assets/classpath/20130920/com/ifactory/dg/components/FullContentLink.js */;
document.observe("dom:loaded", function() {
	
	// need to make it so you can't double click on the link to get access via token - throws a 500 error
	var alreadyClicked = false;
	if ($("tokenAccess")) {		
		$("tokenAccess").observe("click", function(event) {
			
			if (alreadyClicked) {
				// it was already clicked once, so stop the event
				event.stop();	
			}
			
			// this was the first	 time clicking it, so set it as clicked
			alreadyClicked = true;
			
		})
	}
	
});
/* /assets/classpath/20130920/com/ifactory/dg/components/AddToShoppingCartLink.js */;
document.observe("dom:loaded", function() {
	( $("tempConfirmation") ).observe(Tapestry.ZONE_UPDATED_EVENT, function() { 
		$('shoppingCartInfoLink').simulate('click');
	});
	
	if ($('addToShoppingCart'))
		$('addToShoppingCart').writeAttribute('onclick', 'return false;');
})

/* /assets/classpath/20130920/com/ifactory/dg/components/SignInOrRegister.js */;
document.observe("dom:loaded", function() {
	if ($('signUpLink')) {
		$('signUpLink').observe('click', function(evt) {
		    $('signUpLinkHidden').onclick.delay(.5);
		});
	}
	
	if ($('signInLink')) {
		$('signInLink').observe('click', function(evt) {
		    $('signInLinkHidden').onclick.delay(.5);
		});
	}
	
});
/* /assets/classpath/20130920/js/popout-content.js */;
/** When an element is 'popped out' it is hidden and replaced with something that the user
 * can user to show the content. This method should create that something.
 * The function that will display the content in a lightbox can be accessed via: $T(e).showPopup
 * Only called if the element should be popped out.
 * @param l the suggested label to use for the trigger
 */
var popoutElement = function(e, label) {
	// IE 8 is not good
	var link = document.createElement('a');
	link.className = 'popoutContentLink';

	link = $(link);
	link.insert('<span>' + label + '</span>');
	link.observe('click', $T(e).showPopup);
	e.insert({'after': link});
}

/** replaces content with a link that will show said content in a lightbox. */
var popoutContent = function(elements, label) {
	// TODO render off-screen and remeasure based on actual dimensions
	var showPopup = function(element) {
		var padding = 50 * 2;	// padding double for top/bottom & right/left
		var width = Math.min(document.viewport.getWidth() * .9, element.getWidth() + padding);
		var height = Math.min(document.viewport.getHeight() * .85, element.getHeight() + padding);
		
		// see lightbox.js & window.js
		var win = new Window({
			minimizable : false,
			maximizable : false,
			draggable : true,
			destroyOnClose: true,
			recenterAuto: false,
			width: width,
			height: height,
			zIndex: 10000
		});

		// wrap content in the same div's as the lightbox layout
		var container = new Element('div').update(new Element('div', {'id':'modalContent'}).update('<div id="modalInnerContent"><div class="popoutContentWrapper"></div></div>'));
		// TODO replace with Element.clone() after upgrading
		container.down('.popoutContentWrapper').insert(element.cloneNode(true));
		
		// note: do not use setContent() as it can cause errors in IE 7
		win.setHTMLContent(container.innerHTML);
		window.currentLightbox = win;
		
		win.showCenter(true, 80);
		
		//TEMPORARY FIX TO ADD BASE CLASS TO ALL INLINE POPUP CONTENT
		$$("div.dialog_content").each(function(el) {
			el.addClassName("mainBase");
		});
	};
	
	elements = $(elements);
	elements.each(function(e) {
		if (e.hasClassName('nosuppress') || e.up('.nosuppress')) return;
		
		var l = e.title || label;
		e.addClassName('popoutContent');
		$T(e).showPopup = showPopup.curry(e);
		popoutElement(e, l);
	});
}

/** Makes links that popout trigger the popout directly. 
the anchor may link to either the id of the item directly. */
// TODO this would probably be faster to maintain a list of tables that are popped out
var popoutLinks = function() {
	var basePath = window.location.pathname + "#";
	if (!basePath.startsWith('/')) basePath = '/' + basePath;
	
	$$('#readPanel a[href*="#"]').each(function(a) {
		var href = a.readAttribute('href')
		if (href == "#" || !(href.startsWith('#') || href.startsWith(basePath))) return;

		var id = href.substring(href.indexOf('#') + 1);
		if(id.indexOf(".") > 0) {
			// TODO: ping server so log shows, periods in IDs really messes things up!
			return;
		}
		var target = $(id);
		if (!target) return;

		var show = $T(target).showPopup;

		if (!show) {
			target = target.down('.popoutContent');
			if (target)
				show = $T(target).showPopup;
		}

		if (!show) return;
		a.observe('click', function(event) { show(); Event.stop(event); });
	});
}
/* /assets/classpath/20130920/js/app.js */;
document.observe("dom:loaded", function() {

	///////// INITIALIZING REFINE BY CHECKBOX CSS //////////
	$$(".checkboxStyleNav .checkbox").each(function(el) {
		$(el).setStyle({ overflow:"hidden", width:"14px", height:"14px" });

		//check if checkbox is checked (now that's not redundant, ha)
		var checkboxEl = $(el).childElements("input")[0];
		if(checkboxEl.checked) {
			$(el).setStyle({"background":"transparent url(/images/checkbox_sprite2.gif) no-repeat -14px top"});
			$(el).up("li").addClassName("checked");
		}
		else {
			$(el).setStyle({"background":"transparent url(/images/checkbox_sprite2.gif) no-repeat left top"});
			$(el).up("li").removeClassName("checked");
		}

	});
	$$(".checkboxStyleNav .checkbox input").each(function(el) {
		$(el).setStyle({ position:"absolute", left:"-9999px" });
	});

	//handle checkbox check for image
	$$(".checkboxStyleNav .checkbox").each(function(el) {
		$(el).observe('click', function(event) { toggleImageCheckbox(el); });
	});
	///////// END INITIALIZING REFINE BY CHECKBOX CSS //////////

	fakeValue('q', 'Search');
	fakeValue('refineTerm', "Search within results");

	var nav = $('refineSearch');
	if (nav) new FilterNav(nav);

	// Homepage login link actions
	$$('#showlibcard').invoke('observe', 'click', function(event) {
		$('libcardwrapper').setStyle({display:'block'});
		$('showusernameform').setStyle({display:'block'});
		this.setStyle({display:'none'});
		$('loginwrapper1').setStyle({display:'none'});
		$('lcnum').focus()
		event.stop();
	});
	$$('#showusernameform').invoke('observe', 'click', function(event) {
		$('libcardwrapper').setStyle({display:'none'});
		$('showlibcard').setStyle({display:'block'});
		this.setStyle({display:'none'});
		$('loginwrapper1').setStyle({display:'block'});
		$('username').focus()
		event.stop();
	});

	//zebra striation on tables
	$$(".bookDetail #readPanel table").each(function(elTablo) {
		var evenRow = false;
		elTablo.select("> tr").each(function(el) {
			if(evenRow) {
				el.addClassName("even");
				evenRow = false;
			}
			else {
				evenRow = true;
			}
		});
	});
});

function fakeValue(id, value) {
	var field = $(id);
	if (!field) return;
	
	field.value = value;
	field.observe('focus', function() { if (field.value == value) field.value = ''; });
	field.observe('blur', function() { if (field.value == '') field.value = value; });
	
	if (field.form)
		$(field.form).observe('submit', function() { if (field.value == value) field.value = ''; });
}


function toggleImageCheckbox(el) {
	var checkboxEl = $(el).childElements("input")[0];
	var checkBoxState = checkboxEl.checked;
	if(checkBoxState) {
		checkboxEl.checked = false;
		$(el).setStyle({"background":"transparent url(/images/checkbox_sprite2.gif) no-repeat left top"});
		$(el).up("li").removeClassName("checked");
	}
	else {
		checkboxEl.checked = true;
		$(el).setStyle({"background":"transparent url(/images/checkbox_sprite2.gif) no-repeat -14px top"});
		$(el).up("li").addClassName("checked");
	}
}

var FontResizer = Class.create({
	initialize: function(resizer) {
		resizer = $(resizer);
		this.cookies = new CookieJar({path:'/'});
		this.cookies.appendString = "";
		
		var normal = resizer.down('.textNormal a');
		var large = resizer.down('.textLarge a');
		
		var inst = this;
		normal.observe('click', function() {
			$$('body').first().removeClassName('largeFont');
			normal.addClassName('selected');
			large.removeClassName('selected');
			inst.cookies.remove('fontsize');
		});
		
		large.observe('click', function() {
			$$('body').first().addClassName('largeFont');
			normal.removeClassName('selected');
			large.addClassName('selected');
			inst.cookies.put('fontsize', 'largeFont');
		});

		// only set if the large one is selected
		var current = this.cookies.get('fontsize');
		if (current) {
			normal.removeClassName('selected');
			large.addClassName('selected');
		}
	}
});

/** Call to enable highlight and find for a given page. */
function enableHighlightAndFind(selector) {
    // set double click handler on unlinked text in the entry
    $("readPanel").observe('dblclick', function(event) {
        highlightAndFind();
    });
}

/** searches for the current selection */
function highlightAndFind(){
	// select the text
	var txt = '';
	if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	if (txt == '') {
		return;
	}

	var q = $('q');
	q.setValue('');
	q.setValue(txt);
	q.form.submit();
}

function selectHomepageTab(a, panelId) {
	a = $(a);
	$$('#homeTabs li').each(function(li) { li.removeClassName('active'); });
	a.up('li').addClassName('active');
	
	$$('#homePanels .panel').each(function(panel) { panel.hide(); });
	$(panelId).show();
}

function createHelpIndex() {
	var indexDiv = $("anchorIndex");
	
	$$("a[name]").each(function(a) {
		indexDiv.insert("<li><a class=\"indexLink\" href=\"/help#" + a.readAttribute("name") + "\">" + a.innerHTML + "</a></li>" );
	});
}

/** A panel represents each of the lists of the options of which there may be many and also may be nested. */
var Panel = Class.create({
	initialize: function(ul, parent, filter, lazy) {
		this.ul = ul;
		this.filter = filter;
		this.parent = parent;
		this.lazy = lazy;
		
		$T(ul).panel = this;
		
		/* if a list is really it needs to scroll. but in order to activate the overflow scrolling
		 * the element needs to have an explicit height set. on initial page load the height of the first list
		 * is automatic (because we don't want it to scroll) and needs to be carried over to all the child lists so that they scroll.
		 */
		if (parent) {
			this.height = parent.height;
			this.ul.setStyle({ 'height': this.height + 'px' });
		} else {
			// the height of the inner lists is going to be the top-level one minus the back button height
			var backHeight = ul.select("h3").first().getHeight(); //was static 25;
			this.height = this.ul.getHeight() - backHeight;
		}

		for(var i=0; i<ul.childElements().length; i++) {
			var li = ul.childElements()[i];
			var link = li.down('a');
			
			// make sure the links are well-formed for not actually doing anything
			link.href = 'javascript:void(0);';
			
			if (li.hasClassName('nochildren')) {
				link.observe('click', this.applyFilter.bindAsEventListener(this, link));
			} else {
				link.observe('click', this.showChildren.bindAsEventListener(this, li));
				
				if (!lazy)
					this.initItem(li);

				var back = li.down('h3').down('a');
				back.href = 'javascript:void(0);';
				back.observe('click', this.back.bindAsEventListener(this, li));
			}
		}
	},

	/** Inits the state for a item. */
	initItem: function(li) {
		/* initializing all of this may be slow because the options available for selection could be huge.
		 * we only need to do it for a filter when it's clicked.
		 */
		if (!$T(li).child)
			$T(li).child = new Panel(li.down('ul'), this, this.filter, this.lazy);
	},
	
	showChildren: function(e, li, direct) {
		this.initItem(li);
		
		// note: you can't use hide()/show() because the styles are set in the css
		li.down('h3').setStyle({display: 'block'});
		li.down('ul').setStyle({display: 'block'});
		
		// note: you need to manage the overflows manually or else 3rd-level lists and lower will not display
		this.ul.setStyle({overflow:'visible'});
		
		this.filter.expand(this, li, direct, function() {
			li.down('ul').setStyle({overflow: 'auto'});
		});
	},
	
	applyFilter: function(e, link) {
		// FIXME don't hardcode the id prefix or the id of the form element to store in
		var taxid = link.id.replace('taxonomy_', '');
		// TODO support having multiple widgets on the same page
		this.filter.select(link);
		$('refineTaxonomy').value = taxid;
		$('refineTerm').value = '';
		$('refineForm').submit();
	},
	
	back: function(e, li) {
		// don't hide until the transition is done or else the options disappear too quick
		var panel = this;
		this.filter.collapse(this, function() {
			li.down('h3').hide();
			li.down('ul').hide();
			li.down('ul').setStyle({overflow: 'visible'});
			panel.ul.setStyle({overflow:'auto'});
		});
	},
	
	getWidth: function() {
		// calculating width can be slow. just hard-code for now.
		return parseInt(this.ul.getWidth()) - 1;
//		return 182;
	},

	/** Returns the width of this panels ancestors */
	getAncestorWidth: function() {
		return this.parent ? this.parent.getTotalWidth() : 0;
	},

	/** Returns the width of this panel and each of it's ancestors */
	getTotalWidth: function() {
		return this.getWidth() + this.getAncestorWidth();
	}
});

/** A filter nav is an initial Panel of filters to select from.
 * Note: this requires cookiejar.js (http://www.lalit.org/lab/jsoncookies).
 */
var FilterNav = Class.create({
	speed: 0.2,			// animation speed
	startOffset: -1,	// left offset for the first panel. i think this is due to the border on the element.
	
	initialize: function(nav) {
		this.cookies = new CookieJar();
		this.breadcrumbsWrapper = nav.insert('<div class="flyoutBreadcrumbs"></div>').down('.flyoutBreadcrumbs');
		
		var selectedId = this.cookies.get('nav.selected-id');
		this.cookies.remove('nav.selected-id');
		var selectedLink = null;
		if (selectedId) {
			selectedLink = $(selectedId);
		}
		
		this.container = nav.down('ul');
		var lazy = selectedLink == null;
		this.topPanel = new Panel(this.container, null, this, true);
		
		if (selectedLink) {
			var ancestors = new Array();
			var parent = selectedLink.up('li');
			var top = false;
			do {
				if (parent.up('ul') == this.container)
					top = true;
				
				ancestors.unshift(parent);
				parent = parent.up('li');
			} while (parent && !top)
			
			for(var i=0; i<ancestors.length; i++) {
				var li = ancestors[i];
				$T(li.up('ul')).panel.showChildren(null, li, true);
			}
		}
	},
	
	/** Informs the main nav that an item has been selected. */
	select: function(link) {
		this.cookies.put('nav.selected-id', link.id);
	},

	/** direct indicates whether to use an animation or directly set the styles. */
	expand: function(panel, li, direct, finish) {
		var left = this.startOffset - panel.getTotalWidth();

		if (!direct) {
			new Effect.Morph(this.container, {
				style: 'left:' + left + 'px;',
				duration: this.speed
			});
			finish();	// note: need to have this not after effect finish to prevent flicker
		} else {
			this.container.setStyle({ 'left': left + 'px' });
			finish();
		}
		
		this.updateBreadcrumbs(panel, li);
	},
	
	collapse: function(panel, finish) {
		var left = this.startOffset - panel.getAncestorWidth();

		new Effect.Morph(this.container, {
			style: 'left:' + left + 'px;',
			duration: this.speed,
			afterFinish: finish
		});
		
		this.updateBreadcrumbs(panel.parent, panel.ul.up('li'));
	},
	
	/** Creates breadcrumbs up through the given panel. li is used to calculate the labels of the items. */
	updateBreadcrumbs: function(panel, li) {
		var ancestors = new Array();
		var item = li;
		while(item && $T(item.up('ul')).panel) {
			ancestors.unshift(item);
			item = item.up('li');
		}
		
		var ul = new Element('ul');
		for(var i=0; i<ancestors.length; i++) {
			var anc = ancestors[i];
			var label = anc.down('a').innerHTML;
			
			var li = new Element('li');
			
			if (i == 0)
				li.addClassName('first');
			if (i == ancestors.length - 1)
				li.addClassName('last');
			
			li.update(label);
			ul.insert(li);
		}
		this.breadcrumbsWrapper.update(ul);
	}
});

var TOC = Class.create({
	initialize: function(container) {
		container = $(container);
		if (!container) return;
		
		container.select("li.expandable").each(function(li) {
			var ul = li.down('ul');
			var active = li.hasClassName('current');
			
			if (!active)
				ul.hide();
			
			var toggle = $(new Element('a'));
			toggle.addClassName('toggle').addClassName(active ? 'minustoggle' : 'plustoggle').update("<span>toggle</span>");

			toggle.observe('click', function(event) {
				if (ul.visible()) {
					toggle.addClassName('plustoggle');
					toggle.removeClassName('minustoggle');
					ul.hide();
				} else {
					toggle.removeClassName('plustoggle');
					toggle.addClassName('minustoggle');
					ul.show();
				}
				event.stop();
			});

			li.insert({'top':toggle});

		});
	}
});

/** When an element is 'popped out' it is hidden and replaced with something that the user
 * can user to show the content. This method should create that something.
 * The function that will display the content in a lightbox can be accessed via: $T(e).showPopup
 * Only called if the element should be popped out.
 * @param l the suggested label to use for the trigger
 */
var popoutElement = function(e, label) {
	if(typeof(applicationName) == "undefined") {
		// IE 8 is not good
		var link = document.createElement('a');
		link.className = 'popoutContentLink';

		link = $(link);
		link.insert('<span>' + label + '</span>');
		link.observe('click', $T(e).showPopup);
		e.insert({'after': link});
		return;
	}
	// This is required for IE8 compatability.
	else if (applicationName == 'AppNameIMF') {
		popoutElement2(e, label);
		return;
	}
}

/**
 * This modifies the table header to include the 'Expand' text.
 */
var popoutElement2 = function(elmnt, label) {
	var h3Label = elmnt.down(".label_" + elmnt.id + ":first").cloneNode(true);
	var h3title = elmnt.down(".title_" + elmnt.id + ":first").cloneNode(true);
	var h3Element = new Element('h3').insert(h3Label).insert(h3title);
	var detail = new Element('div');
	detail.className = 'detail';
	detail.insert(h3Element);
	var link = new Element('a').insert('<span>' + label + '</span>');
	var linkWrap = new Element('div');
	linkWrap.className = 'popoutContentLink';
	linkWrap.insert(link);
		
	//This is broken in IE:
	//var popoutControl = new Element('div', {'class':'popoutControl'});
	var popoutControl = new Element('div');
	popoutControl.className = 'popoutControl';
	
	popoutControl.setAttribute("id", elmnt.readAttribute("id"));
	popoutControl.insert(detail).insert(linkWrap);
	link.observe('click', $T(elmnt).showPopup);
	elmnt.insert({'after': popoutControl});
	elmnt.setAttribute("id", "");
}

/** replaces content with a link that will show said content in a lightbox. */
var popoutContent = function(elements, label) {
	// TODO render off-screen and remeasure based on actualy dimensions
	var showPopup = function(element) {
		var padding = 50 * 2;	// padding double for top/bottom & right/left
		var width = Math.min(document.viewport.getWidth() * .9, element.getWidth() + padding);
		var height = Math.min(document.viewport.getHeight() * .85, element.getHeight() + padding);
		
		// see lightbox.js & window.js
		var win = new Window({
			minimizable : false,
			maximizable : false,
			draggable : true,
			destroyOnClose: true,
			recenterAuto: false,
			width: width,
			height: height,
			zIndex: 10000
		});

		// wrap content in the same div's as the lightbox layout
		var container = new Element('div').update(new Element('div', {'id':'modalContent'}).update('<div id="modalInnerContent"><div class="popoutContentWrapper"></div></div>'));
		// TODO replace with Element.clone() after upgrading
		container.down('.popoutContentWrapper').insert(element.cloneNode(true));
		
		// note: do not use setContent() as it can cause errors in IE 7
		win.setHTMLContent(container.innerHTML);
		window.currentLightbox = win;
		
		win.showCenter(true, 80);
		
		//TEMPORARY FIX TO ADD BASE CLASS TO ALL INLINE POPUP CONTENT
		$$("div.dialog_content").each(function(el) {
			el.addClassName("mainBase");
		});
	};
	
	elements = $(elements);
	elements.each(function(e) {
		if (e.hasClassName('nosuppress') || e.up('.nosuppress')) return;
		
		var l = e.title || label;
		e.addClassName('popoutContent');
		$T(e).showPopup = showPopup.curry(e);
		popoutElement(e, l);
	});
}

/** Makes links that popout trigger the popout directly. 
the anchor may link to either the id of the item directly. */
// TODO this would probably be faster to maintain a list of tables that are popped out
var popoutLinks = function() {
	var basePath = window.location.pathname + "#";
	if (!basePath.startsWith('/')) basePath = '/' + basePath;
	
	$$('#readPanel a').each(function(a) {
		var href = a.readAttribute('href')
		if (!href || !(href.startsWith('#') || href.startsWith(basePath))) return;

		var id = href.substring(href.indexOf('#') + 1);
		var target = $(id);
		if (!target) return;

		var show = $T(target).showPopup;

		if (!show) {
			target = target.down('.popoutContent');
			if (target)
				show = $T(target).showPopup;
		}

		if (!show) return;
		a.observe('click', function(event) { show(); Event.stop(event); });
	});
}

function tableNote(link) {
//	if (window.currentLightbox) window.currentLightbox.close();
}

function switchQuicksearch(newAction, newLabel) {
    var context = $("context").value;
    $('quickLinks').action = context + newAction;
    
	$$('#quickSearchFilters a.quickLabel').each(function(a) {
		if (a.identify()==newLabel) {
			a.show();
		} else {
			a.hide();
		}
	});	
}

/* /assets/classpath/20130920/com/ifactory/arachne/core/arachne.js */;
var Arachne = {
	/* for use with jsonautocomplete for mapping values in the json metadata for a specific item
	 * to a set of fields to update for each value.
	 * fields maps the metadata keys to field id's that should be updated with those values
	 * usage will look something like this:
	 * Arachne.mapAutocompleteFields.curry({isbn:'${isbnField.clientId}',title:'${titleField.clientId}'})
	 */
	// REFACTOR move into JSONAutocomplete
	mapAutocompleteFields: function(fields, autocomplete, metadata) {
		for(var key in fields) {
			$(fields[key]).setValue(metadata[key]);
		}
		
		return true;
	},
	
	/** Allows programatically clicking the link that is connected to a zone */
	// this is a hack for not being able to fire a 'click' event. (sigh)
	clickZoneLink: function(zoneLink, zoneDiv) {
		var successHandler = function(transport)
        {
			var zm = Tapestry.findZoneManager(zoneLink);
            zm.processReply(transport.responseJSON);  
        };
        
        Tapestry.ajaxRequest($(zoneLink).href, successHandler);
	}
};

/* Tracks the last timestamp of an ajax update in Ajax.lastUpdate */
if (Ajax != undefined) {
	var updated = function() {
		Ajax.lastUpdate = new Date().getTime();
	};
	
	var started = function() {
		//clear out lastUpdate b/c we've started a new ajax request.
		//note that waitForUpdate now checks to make sure lastUpdate isn't null.
		Ajax.lastUpdate = null;
	};
		
	//we /don't/ defer for onComplete b/c onComplete executes only after
	//any request-related javascript executes.
	Ajax.Responders.register({ 
		onComplete: function() { updated(); },
		onCreate: function() { started(); }
	});	
	//we defer here in case there's anything else that needs to be done first.
	document.observe('dom:loaded', function() { updated.defer(); });
}

// temporary fix for https://issues.apache.org/jira/browse/TAP5-204
Tapestry.Validator.email = function(field, message) {
	field.addValidator(function(value) {
        if (value.search(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i) == -1)
        	throw message;
	 });
}

//Tapestry's default reorderSelected function is broken in IE (uses the wrong type for 'before' in IE).
//See https://issues.apache.org/jira/browse/TAP5-261.
//once that issue is fixed, this workaround can be removed.
if (Tapestry.Palette != undefined) {
	Tapestry.Palette = Class.create(Tapestry.Palette, {
	    reorderSelected : function(movers, before)
	    {
	        movers.each(function(option)
	        {
	            this.addOption(this.selected,option,before);
	        }.bind(this));
	
	        this.updateHidden();
	        this.updateButtons();
	    },
	    
	    addOption : function(to,option,before) {
	        try
	        {
	            to.add(option, before);
	        }
	        catch (ex)
	        {
	            //probably IE complaining about type mismatch for before argument;
	            if (before == null)
	            {
	                //just add to the end...
	                to.add(option);
	            }
	            else
	            {
	                //use option index property...
	                to.add(option, before.index);
	            }
	        }
	    }
	});
}

/* Internet explorer triggers the onchange event where most browsers 
 * trigger the onblurafterchange event.  This means that if you click
 * a checkbox it won't trigger onchange until you click somewhere else
 * or tab.  This fix registers and onpropertychange listener for checkboxes
 * in IE to work around the problem. */
Tapestry.onDOMLoaded(function() {
	if (Prototype.Browser.IE) {
	 var inputs = document.getElementsByTagName("input"), i=-1, l=inputs.length;
	 while (++i!==l) {
	  var inputs_i=inputs[i];
	  if ((inputs_i.type=="checkbox")&&inputs_i.onchange) {
	   inputs_i._onchange=inputs_i.onchange;
	   inputs_i.onchange=null;
	   inputs_i.onpropertychange=function() {if (event.propertyName=='checked') this._onchange();};
	  }
	 }
	}
});

function setDomLoaded() {
	document.domLoaded=true;
}

;/**/
Tapestry.markScriptLibrariesLoaded(["/assets/classpath/20130920/js/prototype-1-7.js","/assets/scriptaculous/5.1.0.4/scriptaculous.js","/assets/scriptaculous/5.1.0.4/effects.js","/assets/tapestry/5.1.0.4/tapestry.js","/assets/tapestry/5.1.0.4/tapestry-messages.js","/assets/classpath/20130920/com/ifactory/dg/base/AbstractViewDgDoc.js","/assets/classpath/20130920/com/ifactory/dg/base/event.simulate.js","/assets/classpath/20130920/com/ifactory/dg/base/flowplayer-3.2.6.min.js","/assets/classpath/20130920/com/ifactory/dg/base/DgShowLightBox.js","/assets/classpath/20130920/js/jquery-noconflict-1.8.1.min.js","/assets/classpath/20130920/js/plugins.js","/assets/classpath/20130920/js/cookiejar.js","/assets/classpath/20130920/com/ifactory/dg/components/Layout.js","/assets/classpath/20130920/com/ifactory/dg/components/base_app_prototype-1-7_fixes.js","/assets/classpath/20130920/com/ifactory/press/applib/mixins/window.js","/assets/classpath/20130920/com/ifactory/press/applib/mixins/lightbox.js","/assets/classpath/20130920/com/ifactory/dg/components/DisplayShoppingCartLink.js","/assets/classpath/20130920/com/ifactory/dg/components/FullContentLink.js","/assets/classpath/20130920/com/ifactory/dg/components/AddToShoppingCartLink.js","/assets/classpath/20130920/com/ifactory/dg/components/SignInOrRegister.js","/assets/classpath/20130920/js/popout-content.js","/assets/classpath/20130920/js/app.js","/assets/classpath/20130920/com/ifactory/arachne/core/arachne.js"]);
