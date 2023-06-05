/* = membership.js ========================================================== */
/* Defines basic functionality for use in personalization
 * The global object in charge, window.polopoly, contains functionality for
 * cookies, base64 encoding, json etc.
 * ========================================================================== */

if (polopoly) throw("Initialized twice");
 var polopoly = {};

/* = Custom services ======================================================== */
/* Namespace to use for custom services. Services added to this namespace     */
/* have their init method called                                              */
polopoly.service = {};

/* = User preferences ======================================================= */
polopoly.user = {
       init: function() {
           this.data = this._initCookie("cata");
           this.sessionData = this._initCookie("data");
       },
       _initCookie: function(cookie) {
           var ud = polopoly.cookie.get(cookie);
           if (!ud) return;
           var data = polopoly.base64.stringDecode(ud);
           if (!data) return;
           try {
               var json = polopoly.json.parse(data);
           } catch (e) {
               return;
           }
           return json;

       },
       getServiceSettings: function(serviceDefinitionId, serviceInstanceId) {
           if (!this.data || !this.data[serviceDefinitionId]) return;
           return this.data[serviceDefinitionId][serviceInstanceId];
       },
       setServiceSettings: function(serviceDefinitionId, serviceInstanceId, instanceData) {
    	   if (!this.data) this.data = {};
    	   if (!this.data[serviceDefinitionId]) this.data[serviceDefinitionId] = {};
    	   
    	   this.data[serviceDefinitionId][serviceInstanceId] = instanceData;
    	   this._persistDataInCookie();
       },
       getSessionServiceSettings: function(serviceDefinitionId, serviceInstanceId) {
           if (!this.sessionData || !this.sessionData[serviceDefinitionId]) return;
           return this.sessionData[serviceDefinitionId][serviceInstanceId];
       },
       setSessionServiceSettings: function(serviceDefinitionId, serviceInstanceId, instanceData) {
           if (!this.sessionData) this.sessionData = {};
           if (!this.sessionData[serviceDefinitionId]) this.sessionData[serviceDefinitionId] = {};
           
           this.sessionData[serviceDefinitionId][serviceInstanceId] = instanceData;
           this._persistSessionDataInCookie();
       },
       _persistDataInCookie: function() {
    	   var dataJson = polopoly.json.stringify(this.data);
    	   var dataJsonBase64 = polopoly.base64.stringEncode(dataJson);
    	   polopoly.cookie.set("cata", dataJsonBase64);
       },
       _persistSessionDataInCookie: function() {
           var dataJson = polopoly.json.stringify(this.sessionData);
           var dataJsonBase64 = polopoly.base64.stringEncode(dataJson);
           polopoly.cookie.setForSession("data", dataJsonBase64);
       },
       isLoggedIn: function() {
           return polopoly.cookie.get("sessionKey") != null &&
                  polopoly.cookie.get("loginName")  != null &&
                  polopoly.cookie.get("userId")     != null;
       },
       name: function() {
           return polopoly.base64.stringDecode(polopoly.cookie.get("loginName"));
       },
       screenName: function() {
           return polopoly.base64.stringDecode(polopoly.cookie.get("screenName"));
       },
       popMessageCookie: function(name) {
            var b64cookie = polopoly.cookie.get(name);
            var cookie = polopoly.base64.stringDecode(b64cookie);
            if (cookie.length) {
                var _cv;
                try {
                    _cv = polopoly.json.parse(cookie);
                } catch (e) {
                }
                polopoly.cookie.clear(name);
                return _cv;
            }
        },
        refreshUserData: function(errorCallback, successCallback) {
        	jQuery.ajax({"cache": false,
                     "error": errorCallback,
                     "success": successCallback,
                     "timeout": 3000,
                     "type": "GET",
                     "url": "/membership/refresh"});
        }
};

/* = Cookie functions ======================================================= */
polopoly.cookie = {
        clear: function(name) {
            document.cookie=name + '= ; expires=01 Jan 1970 00:00:00 UTC; path=/';
        },
        set: function(name, value) {
            document.cookie=name + '=' + value + '; expires=01 Jan 2038 00:00:00 UTC; path=/';
        },
        setForSession: function(name, value) {
            document.cookie=name + '=' + value + '; expires=-1; path=/';
        },
        get: function(name) {
            return polopoly.util.stringAsHashValue(name, document.cookie, ';');
        }
 };

polopoly.comments = {
    get: function(contentPath, page, containerSelector, whenDone) {
        jQuery.get(contentPath, {"containerMinor": containerSelector, "comments": page, "ajax":"true", "ot":"scitation.AjaxPageLayout.ot"},
                   function(data) {
                       $('#commentsField-' + containerSelector).html(data);
                       if (whenDone) {
                       	whenDone(containerSelector);
                       }
                   },
                   "html"); 
    }
};

/* = JSON parsing =========================================================== */
/*  http://www.JSON.org/json2.js Public Domain.
 *  See http://www.JSON.org/js.html
 *
 *  text = polopoly.json.stringify(['e', {pluribus: 'unum'}]);
 *  hash = polopoly.json.parse(text, reviver)                                 */
polopoly.json = {
        _cx: /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _escapable: /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _gap: null,
        _indent: null,
        _meta: {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
          },
          _rep: null,
          
        _f: function(n) {
            return n < 10 ? '0' + n : n;
        },
        init: function() {

            if (typeof Date.prototype.toJSON !== 'function') {

                Date.prototype.toJSON = function (key) {

                    return this.getUTCFullYear()   + '-' +
                        this._f(this.getUTCMonth() + 1) + '-' +
                        this._f(this.getUTCDate())      + 'T' +
                        this._f(this.getUTCHours())     + ':' +
                        this._f(this.getUTCMinutes())   + ':' +
                        this._f(this.getUTCSeconds())   + 'Z';
                };

                String.prototype.toJSON =
                    Number.prototype.toJSON =
                    Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
            }
        },
        _quote: function(string) {
                this._escapable.lastIndex = 0;
                return this._escapable.test(string) ?
                    '"' + string.replace(this._escapable, function (a) {
                    var c = this._meta[a];
                    return typeof c === 'string' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                    '"' + string + '"';
            },


          _str: function(key, holder) {
                var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = this._gap,
                partial,
                value = holder[key];

                if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }
                if (typeof this._rep === 'function') {
                    value = this._rep.call(holder, key, value);
                }
                switch (typeof value) {
                    case 'string':
                        return this._quote(value);

                    case 'number':
                        return isFinite(value) ? String(value) : 'null';

                    case 'boolean':
                    case 'null':
                        return String(value);

                    case 'object':
                        if (!value) {
                            return 'null';
                        }
                        this._gap += this._indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = this._str(i, value) || 'null';
                            }
                            v = partial.length === 0 ? '[]' :
                                this._gap ? '[\n' + this._gap +
                                partial.join(',\n' + this._gap) + '\n' +
                                mind + ']' :
                                '[' + partial.join(',') + ']';
                            this._gap = mind;
                            return v;
                        }
                        if (this._rep && typeof this._rep === 'object') {
                            length = this._rep.length;
                            for (i = 0; i < length; i += 1) {
                                k = this._rep[i];
                                if (typeof k === 'string') {
                                    v = this._str(k, value);
                                    if (v) {
                                        partial.push(this._quote(k) + (this._gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        } else {
                            for (k in value) {
                                if (Object.hasOwnProperty.call(value, k)) {
                                    v = this._str(k, value);
                                    if (v) {
                                        partial.push(this._quote(k) + (this._gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        }
                        v = partial.length === 0 ? '{}' :
                            this._gap ? '{\n' + this._gap + partial.join(',\n' + this._gap) + '\n' +
                            mind + '}' : '{' + partial.join(',') + '}';
                        this._gap = mind;
                        return v;
                }
            },

        stringify: function(value, replacer, space) {
            var i;
            this._gap = '';
            this._indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    this._indent += ' ';
                }
            } else if (typeof space === 'string') {
                this._indent = space;
            }
            this._rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return this._str('', {'': value});
        },

        parse: function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            this._cx.lastIndex = 0;
            if (this._cx.test(text)) {
                text = text.replace(this._cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.
                test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        }
};

/* = General utilities =======================================================*/
polopoly.util = {
        querystringValue: function(name) {
            return this.stringAsHashValue(name, location.search.substr(1), '&');
        },

        stringAsHashValue: function(key, string, sep) {
            if (string && string != '') {
                var items = string.split(sep);
                for (var i = 0; i < items.length; i++) {
                    var value = jQuery.trim(items[i]);
                    if (value.substring(0, key.length + 1) == (key + '=')) {
                        return decodeURIComponent(value.substring(key.length + 1));
                    }
                }
            }
        }
};

/* = Base64 encode/decode =================================================== */
polopoly.base64 = {

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /* This code was written by Tyler Akins and has been placed in the
         * public domain.  It would be nice if you left this header intact.
         * Base64 code from Tyler Akins -- http://rumkin.com
         * Modded to handle input with stripped ending =.
         */

        //
        // Decode a string in utf8 encoded in base64 into a string.
        //
        stringDecode: function(input) {
            return this._utf8_decode(this.decode(input));
        },
        decode : function (input) {
            try {
                if (input.length==0) {
                    return "";
                }
            }
            catch (e) {
                return "";
            }
            
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            input = this._padIfNecessary(input);
            
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            
            var i = 0;
            do {
                enc1 = this._keyStr.indexOf(input.charAt(i++) || "=");
                enc2 = this._keyStr.indexOf(input.charAt(i++) || "=");
                enc3 = this._keyStr.indexOf(input.charAt(i++) || "=");
                enc4 = this._keyStr.indexOf(input.charAt(i++) || "=");

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length);

            return output;
        },
        _padIfNecessary: function(input) {
            if ((input.length % 4) == 0) {
                return input;
            }
            
            var missingChars = (4 - (input.length % 4));
            for (var i = 0; i < missingChars; i++) {
                input += "=";
            }
            
            return input;
        },
        
        //
        // Encode a string into utf8 encoded bytes in a base64 string.
        //
        stringEncode: function(input) {
            return this.encode(this._utf8_encode(input));
        },
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },
        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
 };

/* = Login box ============================================================== */
/* Assumes a global object exists on the page, called p_l_i18n                */
polopoly.loginBox = {

    _login: {
        "auth":    "authError",
        "perm":    "permError",
        "down":    "downError",
        "default": "defaultError"
    },

        init: function() {
            document.__ppUseDefLogin = false;
            try {
                this.defLogin =  p_l_i18n.defaultLoginName;
            }
            catch (e) {
                this.defLogin = "E-mail";
            }
            defLogin = this.defLogin;

            // Give the browser some time to autofill before
            // hooking in default values
            window.setTimeout(this._tryAutoFill, 500);

            // Textboxes that clear themselves extravaganza.
            jQuery(".clearable").
            focus(function() {
                e=jQuery(this); if(document.__ppUseDefLogin && e.val() == defLogin) {
                    e.val("");
                }
            });
            jQuery(".clearable").blur (function() {
                e=jQuery(this); if(document.__ppUseDefLogin && e.val() == "") {
                    e.val(defLogin);
                }
            });

            // Fix so that when someone tries to submit the default values,
            // we submit the empty values instead.
            jQuery(".not-loggedin .submit").click(function() {
                var parent = jQuery(this).parents(".not-loggedin");
                var username = parent.find(".loginname");
                var password = parent.find(".password");
                if (username.val() == defLogin && password.val() == defLogin) {
                    username.val("");
                    password.val("");                 
                }
            });
            jQuery(".clearable").blur();

            var loginName  = polopoly.cookie.get("loginName");
            var isLoggedIn = polopoly.cookie.get("sessionKey");

            // Decide on which box to show
            if (polopoly.user.isLoggedIn()) {
                jQuery(".loggedin").show();
                jQuery(".loggedin .user-name").append(polopoly.user.name());
            }
            else {
                jQuery(".not-loggedin").show()
            }

            // Error management
            this._trySetError(".not-loggedin .form-error",
                polopoly.util.querystringValue("login_formerror"));
            
            if (polopoly.util.querystringValue("login_formerror")) {
            	jQuery('#loginForm').show();
            }
        },
      _trySetError: function(selector, errorKey) {
            if (!errorKey) return;
            var err = p_l_i18n[this._login[errorKey]] || p_l_i18n[this._login["default"]];
            jQuery(selector).css("display","block").text(err);
        },

        _tryAutoFill: function() {
            if (jQuery(".loginname").val() == "" && jQuery(".password").val() == "") {
                jQuery(".loginname").val(this.defLogin);
                jQuery(".password").val(this.defLogin);
                document.__ppUseDefLogin = true;
            }
        }
 };

/* = LRU Map ================================================================ */
/* Not really a map at all. Based on the assumption that lists in the cookies
 * in general are small (eg less than 10 items), so that mantaining them as
 * lists are cheap.                                                           */
 polopoly.util.lrumap = function(lrumap, maxsize){
     if (lrumap) {
         myMap = lrumap;
     } else {
         myMap = [];
     }
     if (!maxsize) {
         maxsize = 10;
     }
     
     return {
        map: myMap,
        size: maxsize,
        get: function(id) {
            var key = this._findId(id);
            if (key) {
                var retval = this.map[key][1];
                this._setLeader(key);
                return retval;
            }
        },
        rawMap: function() {
            return this.map;
        },
        put: function(id, val) {
            var key = this._findId(id);
            if (key) {
                this.map[key] = [id, val];
            //this._setLeader(key);
            } else {
                this.map.unshift([id,val]);
            }
            if (this.map.length > this.size) {
                this.map.splice(this.size);
            }
        },
        remove: function(id) {
            var key = this._findId(id);
            if (key) {
                this.map.splice(key, 1);
            }
        },
        _findId: function(id) {
            for (key in this.map) {
                if (this.map[key][0] == id) {
                    return key;
                }
            }
        },
        _setLeader: function(id) {
            var leader = this.map[key];
            this.map.splice(key, 1);
            this.map.unshift(leader);
        }
    }
 };

/* = My Newslist ============================================================ */
/* Id is content id of News list element, e.g. 7.100.                         */
/* Assumes the element is contained in a div with id newsList_7_100.          */
polopoly.newslist = {
    create: function(serviceDefinitionId, serviceInstanceId, allListIds, defaultListIds, editOnlyWhenLoggedIn) {
    	    var name = polopoly.newslist._getNameFromId(serviceDefinitionId, serviceInstanceId);
    	    
    	    if (!polopoly.newslist.allListIds) polopoly.newslist.allListIds = [];
    	    polopoly.newslist.allListIds[serviceInstanceId] = allListIds;
    	    
    	    if (!polopoly.newslist.defaultListIds) polopoly.newslist.defaultListIds = [];
    	    polopoly.newslist.defaultListIds[serviceInstanceId] = defaultListIds;
    	    
    	    // Create the slide effect (on edit and save buttons)
            jQuery("#edit_" + name + " .button").click(function () {
            	jQuery("#" + name + " .settings").slideToggle(100);
            });
            
            var selectedIds = this.getSelection(serviceDefinitionId, serviceInstanceId, editOnlyWhenLoggedIn);
            jQuery("#" + name + " :checkbox").removeAttr("checked");
            for (var index = 0; index < selectedIds.length; index++) {
                checkedValue = "#c" + serviceInstanceId.replace("\.", "_") + "-" + selectedIds[index].replace("\.", "_");
                jQuery("#" + name + " " + checkedValue).attr("checked", "checked");
            }

        // Show edit button.
        if (editOnlyWhenLoggedIn && polopoly.user.isLoggedIn() || !editOnlyWhenLoggedIn) {
            jQuery("#edit_" + name).show();
        }

        // Different funcions if logged in or not.
        var saveButton = jQuery("#" + name + " input.save");
        if (editOnlyWhenLoggedIn) {
            saveButton.click(function () {
            	polopoly.newslist.storeOnServer(serviceDefinitionId, serviceInstanceId);
            });
        }
        else {
            saveButton.click(function () {
            	polopoly.newslist.storeInCookie(serviceDefinitionId, serviceInstanceId);
            });
        }
        this.updateList(serviceDefinitionId, serviceInstanceId, editOnlyWhenLoggedIn);
    },
    getSelection: function(serviceDefinitionId, serviceInstanceId, requiresLoggedIn) {
    	var userSelection;
    	if (requiresLoggedIn) {
            userSelection = polopoly.user.getSessionServiceSettings(serviceDefinitionId, serviceInstanceId);
    	} else {
    		userSelection = polopoly.user.getServiceSettings(serviceDefinitionId, serviceInstanceId);
    	}
        return userSelection ? userSelection : polopoly.newslist.defaultListIds[serviceInstanceId];
    },
    _storeInCookie: function(serviceDefinitionId, serviceInstanceId, name) {
        var checked = jQuery("#" + name + " input:checkbox:checked");
        
        var values = [];
        jQuery.each(checked, function() {
            values[values.length] = this.value;
        });
        
        polopoly.user.setServiceSettings(serviceDefinitionId, serviceInstanceId, values);
        this.updateList(serviceDefinitionId, serviceInstanceId, false);
    },
    _storeInSessionCookie: function(serviceDefinitionId, serviceInstanceId, name) {
        var checked = jQuery("#" + name + " input:checkbox:checked");
        
        var values = [];
        jQuery.each(checked, function() {
            values[values.length] = this.value;
        });
        
        // Only save settings in a session cookie, since they also live on the server.
        // Thus, when the user logs out, no information about the user will be persisted in
        // the browser. 
        polopoly.user.setSessionServiceSettings(serviceDefinitionId, serviceInstanceId, values);
        this.updateList(serviceDefinitionId, serviceInstanceId, true);
    },
    storeInCookie: function(serviceDefinitionId, serviceInstanceId) {
        var name = polopoly.newslist._getNameFromId(serviceDefinitionId, serviceInstanceId);
        polopoly.newslist._storeInCookie(serviceDefinitionId, serviceInstanceId, name);
        jQuery("#" + name + " .settings").hide(100);
    },
    storeOnServer: function(serviceDefinitionId, serviceInstanceId) {
        var name = polopoly.newslist._getNameFromId(serviceDefinitionId, serviceInstanceId);
        
        jQuery("#error_" + name).hide();
        polopoly.newslist._storeInSessionCookie(serviceDefinitionId, serviceInstanceId, name);

        jQuery.ajax({"cache": false,
                     "data": {"sdid": serviceDefinitionId, "siid": serviceInstanceId},
                     "error": function(xmlHttpRequest, textStatus, errorThrown){
                         jQuery("#error_" + name + "").show();
                     },
                     "success": function(textStatus, data) {
                         jQuery("#" + name + " .settings").hide(100);
                     },
                     "timeout": 2000,
                     "type": "POST",
                     "url": "/membership/persist"});
    },
    updateList: function(serviceDefinitionId, serviceInstanceId, requiresLoggedIn) {
    	var name = polopoly.newslist._getNameFromId(serviceDefinitionId, serviceInstanceId);
    	var selectedIds = this.getSelection(serviceDefinitionId, serviceInstanceId, requiresLoggedIn);

    	// If empty, clear and return
    	if (selectedIds.length == 0) {
    	    jQuery("#" + name + " .lists").html("");
    	    return;
    	}
    	    
    	// Only fetch lists that are still available
    	var allListIds = polopoly.newslist.allListIds[serviceInstanceId];
    	var idsToFetch = [];
    	for (var i = 0; i < selectedIds.length; i++) {
    	    if (polopoly.newslist._contains(allListIds, selectedIds[i])) {
    	    	idsToFetch.push(selectedIds[i]);
    	    }
    	}
    	
    	var buffer = [];
    	var count = idsToFetch.length;
    	    
        for (var i = 0; i < idsToFetch.length; i++) {
            var listId = idsToFetch[i];
          	// Populating a buffer on return of ajax requests to ensure
           	// correct order and to avoid flickering
           	jQuery.get("/cmlink/" + serviceInstanceId, {"topic": listId, "mode": "ajax"},
               	function(buffer, index, count) {
               		return function(data) {
               			buffer[index] = data;
               	        // Check if filled
               			var isComplete = true;
               			for (var bufferIndex = 0; bufferIndex < count; bufferIndex++) {
               				if (!buffer[bufferIndex]) {
               					isComplete = false;
               				}
               			}
               			if (isComplete) {
               				var totalData = "";
                   			for (var bufferIndex = 0; bufferIndex < count; bufferIndex++) {
                   				totalData += buffer[bufferIndex];
                   			}
                   			jQuery("#" + name + " .lists").html(totalData);
               			}
                    }}(buffer, i, count),
                "html");
            };
       },
    _contains: function(list, elem) {
        if (!list) return false;
        for (var j = 0; j < list.length; j++) {
            if (list[j] == elem) {
        	return true;
            }
    	}
        return false;
    },
    _getNameFromId: function(serviceDefinitionId, serviceInstanceId) {
    	return "newsList_" + serviceInstanceId.replace("\.","_");
    }
 };

polopoly.passwordMeter = {
    _colors : [ "#FF0000", // Very Weak
                "#FF0000", // Weak
                "#FFCC00", // Medium
                "#00CC00", // Strong
                "#00FF00"  // Very Strong
              ],
    create : function(input, strength) {
        var innerStrength = "is" + Math.ceil(Math.random() * 3000);
        jQuery(strength).html(
        "<div id='" + innerStrength + "' style='height: 100%;'></div>");
        
      	var width = jQuery(strength).width();
        
        // Function to run when password is updated
        var checkPasswordFn = function m(p,c) { return function(e) {
            var text = jQuery(input).val();
            var score = p(text);
            var newWidth = score > 0 ? Math.ceil(score / 4.0 * width)
                    : (text.length > 0 ? 0.01 * width : 0);
            jQuery("#" + innerStrength).css("width", newWidth + "px");
            jQuery("#" + innerStrength).css("background-color", c[score]);
        }}(this._testPassword, this._colors);

        jQuery(input).keyup(checkPasswordFn);
    },

    /*
     * Copyright (c) 2006 Steve Moitozo <god at zilla dot us>
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the
     * "Software"), to deal in the Software without restriction, including
     * without limitation the rights to use, copy, modify, merge, publish,
     * distribute, sublicense, and/or sell copies of the Software, and to permit
     * persons to whom the Software is furnished to do so, subject to the
     * following conditions:
     * 
     * The above copyright notice and this permission notice shall be included
     * in all copies or substantial portions of the Software.
     */
    _testPassword : function(passwd) {
        score = 0;
        if (passwd.length < 5) {
            score += 3;
        } else if (passwd.length > 4 && passwd.length < 8) {
            score += 6;
        } else if (passwd.length > 7 && passwd.length < 16) {
            score += 12;
        } else if (passwd.length > 15) {
            score += 18;
        }
        if (passwd.match(/[a-z]/)) {
            score += 1;
        }
        if (passwd.match(/[A-Z]/)) {
            score += 5;
        }
        if (passwd.match(/\d+/)) {
            score += 5;
        }
        if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) {
            score += 5;
        }
        if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
            score += 5;
        }
        if (passwd
                .match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            score += 5;
        }
        if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            score += 2;
        }
        if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) {
            score += 2;
        }
        if (passwd
                .match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
            score += 2;
        }
        // Scoring updated to give nicer metric.
        if (score < 5) {
            return 0;
        } else if (score >= 5 && score < 15) {
            return 1;
        } else if (score >= 15 && score < 30) {
            return 2;
        } else if (score >= 30 && score < 35) {
            return 3;
        } else {
            return 4;
        }
    }
};

jQuery().ready(function() {
  return function(namespaces) {
    for (var i = 0; i < namespaces.length; i++) {
      for (key in namespaces[i]) {
        var obj = namespaces[i][key];
        if (typeof(obj["init"]) == "function") {
            obj.init();
        }
      }
    }
  }([polopoly, polopoly.service]);
});
