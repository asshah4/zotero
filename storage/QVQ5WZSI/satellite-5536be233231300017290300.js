_satellite.pushBlockingScript(function(event, target, $variables){
  /**
 * ADTECH 299 - mmsAdtech.js
 * MMS ADTECH Configuration Library
 * Filname: mmsAdtech.js
 * Version: 1.0
 * 
 * Based on ADTECH ASYNC TAG Primary and Secondary (DAC 2.0)
 *
 * DTM NOTES:
 * Make this page rule tag "Execute Globally"
**/
var _satellite = window._satellite;
window.mmsAdtech = window.mmsAdtech || {};

(function(mmsAdtech) {
  var ADTECH,
      debug = {},
      util = {};

  /**
   * Debug Mode - Log Messages on Page and Console
  **/
  debug.createDivs = function (id) {
    var body = document.querySelector('body'),
        newcontent = document.createElement('div');

    newcontent.id = id;
    body.appendChild(newcontent);
    return newcontent;
  };
  
  // Log to Page and Console
  debug.log = function (msg) {
    var newcontent;
    if (_satellite.settings.notifications) {
      newcontent = document.createElement('p');
      newcontent.innerHTML = msg;
      if (debug.logDiv) {
        debug.logDiv.appendChild(newcontent);
      }
      _satellite.notify(msg, 1);
    }
  };


  /**
   * Utilities - Extend JSON Objects
   * Note: does not perform a "deep" copy.
   *
   * util.extend(a, b);       // Returns a, plus b
   * util.extend({}, a, b);   // Returns new object with a, plus b
  **/
  util.extend = function () {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  };
  
  /**
   * Get Object by dot notation string
   *
   * util.getObjectByString (mmsAdtech, 'config.placements');
  **/
  util.getObjectByString = function (o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      var a = s.split('.');
      while (a.length) {
          var n = a.shift();
          if (n in o) {
              o = o[n];
          } else {
              return;
          }
      }
      return o;
  };

  /**
   * Get url parameter by name
   *
   * util.getUrlParameter (param);
  **/
  util.getUrlParameter = function(param) {
    param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };


  /**
   * ADTECH Page Level Configuration
  **/
  mmsAdtech.setPageConfig = function (newConfig) {
    var configPage;
    mmsAdtech.config = mmsAdtech.config || {};

    configPage = function () {
      ADTECH.config.page = util.extend({
        protocol: _satellite.getVar('protocol').split(':')[0],
        server: 'REQUIRED',
        network: 'REQUIRED',
        pageid: 'REQUIRED',
        params: {
          loc: '100'
        },
        complete: function () {
          _satellite.notify('ADTECH: Page COMPLETE: pageid: [' + newConfig.pageid + ']', 1);
        }
      }, newConfig);
    };

    _satellite.notify('ADTECH: Start Page Level Configuration', 1);
    // Set Page Config if assigned
    if (newConfig) {
      if (newConfig.pageid) {
        mmsAdtech.config.page = newConfig;
        configPage();
        _satellite.notify('ADTECH: End Page Level Configuration with pageid: [' + newConfig.pageid + ']', 1);
      } else {
        _satellite.notify('ADTECH: adtechPageID does not exist', 1);
      }
    } else {
      _satellite.notify('ADTECH: No new config.page initialized.', 1);
      if (ADTECH.config.page) {
        _satellite.notify('ADTECH: End Page Level Configuration with existing pageid: [' + ADTECH.config.page.pageid + ']', 1);
      } else {
        _satellite.notify('ADTECH: End Page Level Configuration with NO Page Config', 1);
      }
    }
  };


  /**
   * ADTECH Placement Level Configuration
  **/
  mmsAdtech.setPlacementConfig = function (placements) {
    var totalPlacements,
        configPlacement,
        nextPlacement,
        i,
        time_start = new Date(),
        time_end,
        time_total;
    mmsAdtech.config = mmsAdtech.config || {};
    mmsAdtech.config.placements = mmsAdtech.config.placements || {};

    // AdTech Ad is injected to DOM
    configPlacement = function (config) {
      var containerEl = document.getElementById(config.adContainerId),
          hideEl = document.querySelector(config.hideContainer),
          testIP = util.getUrlParameter('ip');

      if (config.id) {
        if (containerEl) {
          ADTECH.config.placements[config.id] = {
            sizeid: config.sizeid,
            adContainerId: config.adContainerId,
            params: util.extend({
              target: '_blank',
              ip: testIP
            }, mmsAdtech.config.placements.params),
            kv: mmsAdtech.config.placements.kv,
            complete: function () {
              time_end = new Date();
              time_total = time_end - time_start;
              debug.log('ADTECH: Load COMPLETE for id: [' + config.id + '] adContainerId: [' + config.adContainerId + ']. Total load time: [' + time_total + '] milliseconds');

              // Hide/collapse Ad and hideContainer
              if (containerEl.querySelector('a[href*="AdId=-3"]')) {
                debug.log('ADTECH: Campaign Ad Not Found. Hide Ad Placement');
                containerEl.style.display = 'none';
                if (hideEl) {
                  hideEl.style.display = 'none';
                }
                if (typeof config.completeWithNoAd === 'function') {
                  config.completeWithNoAd(config);
                }
              } else {
                debug.log('ADTECH: Campaign Ad Found! Display Ad Placement');
                containerEl.style.display = 'block';
                if (typeof config.completeWithAd === 'function') {
                  config.completeWithAd(config);
                }
              }
            }
          };
          _satellite.notify('ADTECH enqueueAd: id: [' + config.id + '] adContainerId: [' + config.adContainerId + ']', 1);
          ADTECH.enqueueAd(config.id);
        } else {
          _satellite.notify('ADTECH NO adContainerId for id: [' + config.id + ']', 1);
        }
      } else {
        _satellite.notify('ADTECH NO id for adContainerId: [' + config.adContainerId + ']', 1);
      }
    };

    // Set placement config and enqueue ads
    if (placements) {
      // Extend Params
      mmsAdtech.config.placements.params = mmsAdtech.config.placements.params || {};
      if (placements.params) {
        util.extend(mmsAdtech.config.placements.params, placements.params);
      } else {
        _satellite.notify('ADTECH: Empty params. Use existing params.', 1);
      }

      // Extend KV
      mmsAdtech.config.placements.kv = mmsAdtech.config.placements.kv || {};
      if (placements.kv) {
        util.extend(mmsAdtech.config.placements.kv, placements.kv);
      } else {
        _satellite.notify('ADTECH: Empty kv. Use existing kv.', 1);
      }
      
      if (placements.placements) {
        // If mmsAdtech.config.placements exist, append new placments at the end
        nextPlacement = mmsAdtech.config.placements.placements ? mmsAdtech.config.placements.placements.length : 0;
        mmsAdtech.config.placements.placements = mmsAdtech.config.placements.placements || [];

        if (!util.getObjectByString(mmsAdtech, 'config.page')) {
          mmsAdtech.hideContainerAll(placements.placements);
        } else {
          totalPlacements = placements.placements.length;
          for (i = 0; i < totalPlacements; i++) {
            mmsAdtech.config.placements.placements[nextPlacement + i] = placements.placements[i]; 
            configPlacement(placements.placements[i]);
          }
        }
      } else {
        _satellite.notify('ADTECH: Empty placements', 1);
      }
    }
  };


  /**
   * ADTECH Placement - Execute Queued Ads
  **/
  mmsAdtech.executePlacements = function (config) {
    var cookieName,
        cookieValue,
        checkCookie,
        enableCookieWait,
        intervalID,
        intervalDelay,
        iterations = 0,
        iterationsMax,
        interval_time_end,
        interval_time_total,
        time_end,
        time_start,
        time_total,
        waitforcookie = false;

    // Wait for Cookie Settings
    if (config) {
      cookieName = config.name;
      intervalDelay = config.intervalDelay || 50;
      iterationsMax = config.iterationsMax || 8;
      waitforcookie = config.waitforcookie || false;
    }

    // Wait for cookieName before executing Ads
    enableCookieWait = function () {

      checkCookie = function () {
        var newCookieValue = _satellite.readCookie(cookieName);
        
        iterations++;
        interval_time_end = new Date();
        interval_time_total = interval_time_end - time_start;
        debug.log('COOKIE: Iteration #: [' + iterations + '] Total setInterval time: [' + interval_time_total + ']');

        if (iterations > iterationsMax) {
          clearInterval(intervalID);
          time_end = new Date();
          time_total = time_end - time_start;
          debug.log('COOKIE: Max iterations reached. Current cookieName [' + cookieName + ']: [' + newCookieValue + '] Total time: [' + time_total + '] milliseconds');
          debug.log('COOKIE: Running ADTECH.executeQueue().');
          ADTECH.executeQueue();
        } else {
          if (newCookieValue) {
            clearInterval(intervalID);
            time_end = new Date();
            time_total = time_end - time_start;
            debug.log('COOKIE: Cookie found! cookieName [' + cookieName + ']: [' + newCookieValue + ']');
            debug.log('COOKIE: Total wait time for cookieName [' + cookieName + ']: [' + time_total + '] milliseconds');
            debug.log('COOKIE: Running ADTECH.executeQueue().');
            ADTECH.executeQueue();
          } else {
            debug.log('COOKIE: cookieName [' + cookieName + '] NOT FOUND, yet.');
          }
        }
      };

      cookieValue = _satellite.readCookie(cookieName);
      debug.log('SETTINGS: Start waitforcookie: Interval Delay: [' + intervalDelay + '] Max Iterations: [' + iterationsMax + ']');
      // ADTECH Ad <a> tag not found in div wrapper
      if (!cookieValue) {
        debug.log('COOKIE: cookieName [' + cookieName + '] not found, Start iterations - check for cookie!');
        time_start = new Date();
        intervalID = setInterval(checkCookie, intervalDelay);

      } else {
        debug.log('COOKIE: Cookie already exists! cookieName [' + cookieName + ']: [' + cookieValue + ']');
        debug.log('COOKIE: Running ADTECH.executeQueue().');
        ADTECH.executeQueue();
      }
    };

    // Execute Queue
    if (util.getObjectByString(ADTECH, 'config.page.pageid')) {
      // Wait for Cookie or Execute Ad Queue
      if (waitforcookie) {
        enableCookieWait();
      } else {
        debug.log('ADTECH: No waiting for cookie. Running ADTECH.executeQueue().');
        ADTECH.executeQueue();
      }
    } else {
      // TODO: Hide all Ad Positions and Hide Containers
      debug.log('ADTECH: No Page ID. Did NOT run ADTECH.executeQueue().');
    }
  };


  /**
   * ADTECH Refresh
   * Re-queue all pre-existing placements and execute them.
  **/
  mmsAdtech.refreshAds = function () {
    var placements = util.getObjectByString(mmsAdtech, 'config.placements.placements'),
        i;
    
    if (placements && placements.length > 0) {
      for (i = 0; i < placements.length; i++) {
        if (placements[i].id) {
          if (arguments.length) {
            if (placements[i].adContainerId === arguments[0]) {
              _satellite.notify('ADTECH: Refresh / enqueueAd id: [' + placements[i].id + ']', 1);
              ADTECH.enqueueAd(placements[i].id);
              break;
            }
          } else {
          // Refresh All
            if (placements[i].noAutoRefresh) {
                _satellite.notify('ADTECH: Do NOT Refresh / enqueueAd id: [' + placements[i].id + ']', 1);
            } else {
              _satellite.notify('ADTECH: Refresh / enqueueAd id: [' + placements[i].id + ']', 1);
              ADTECH.enqueueAd(placements[i].id);
            }
          }
        }
      }
      _satellite.notify('ADTECH: Refresh Ads: executeQueue', 1);
      ADTECH.executeQueue();
    }
  };


  /**
   * ADTECH Hide Container All
   * 
   * If for some reason ADTECH page id does not exist or there are Ad parent wrapper divs that
   * need to be hidden, this traverses through all the placements and hides all hideContainer elements
  **/
  mmsAdtech.hideContainerAll = function (placements) {
    var hideContainer,
        hideEl,
        i;

    _satellite.notify('ADTECH: Begin hideContainerAll.', 1);
    if (placements && placements.length > 0) {
      for (i = 0; i < placements.length; i++) {
        hideContainer = placements[i].hideContainer;
        if (hideContainer) {
          _satellite.notify('ADTECH: Hide Container id: [' + placements[i].id + '] Selector: [' + hideContainer + ']', 1);
          hideEl = document.querySelector(hideContainer);
          if (hideEl) {
            hideEl.style.display = 'none';
          }
        }
      }
    }
    _satellite.notify('ADTECH: End hideContainerAll.', 1);
  };


  /**
   * Randomize Order of Placement Queuing
   * 
   * This is a solution to one of ADTECH's limitation to randomize the priority for Topbanner
  **/
  mmsAdtech.shufflePlacements = function (placementsArray) {

    function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue,
          randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    return shuffle(placementsArray);
  };


  // Initialize ADTECH
  mmsAdtech.initialize = function(config) {
    ADTECH = window.ADTECH;

    // Debug Mode - Log bottom of page
    if (_satellite.settings.notifications) {
      debug.logDiv = debug.createDivs('display_log');
    }

    // Set ADTECH Page Level Configuration
    if (typeof ADTECH !== 'undefined') {
      // Set, update, or reuse existing Page Config
      mmsAdtech.setPageConfig(config.page);

      // Set Placement Config
      mmsAdtech.setPlacementConfig(config.placements);

      // Execute Placements Queue Ads
      mmsAdtech.executePlacements(config.cookies);
    } else {
      _satellite.notify('ADTECH: Global "ADTECH" variable does not exist', 1);
    }
  };
})(window.mmsAdtech);
});
