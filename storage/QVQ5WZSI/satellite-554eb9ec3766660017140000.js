_satellite.pushBlockingScript(function(event, target, $variables){
  /**
 * ADTECH 250 - NEJM.org Init.js
 * Initialize ADTECH for NEJM.org
**/
var _satellite = window._satellite,
    mmsAdtech = window.mmsAdtech;

/**
 * On Complete Callback Functions
 */

// On Complete with Ad Callback - Topbanner
mmsAdtech.onCompleteWithAdTopbanner = function(config) {
  var timeoutID,
      timeoutSeconds = 6,
      unfixTopbanner,
      $topAdBarFixedWrap = $('#topAdBarFixedWrap');

  if ($topAdBarFixedWrap.length) {
    unfixTopbanner = function() {
      $topAdBarFixedWrap.removeClass('topBannerAdFixed');
    };

    timeoutID = setTimeout(unfixTopbanner, timeoutSeconds * 1000);

    // Add Close X Button
    //$('#' + config.adContainerId).append('<a href="#" class="close-ad" id="closeTopbannerFixed">Close X</a>');

    $('#closeTopbannerFixed').click(function(e) {
      e.preventDefault();
      clearTimeout(timeoutID);
      unfixTopbanner();
    });
  }
};

// On Complete with NO Ad Callback - MedRectangle
mmsAdtech.onCompleteWithNoAdMedRectangle = function() {
  // Hide entire Right Rail on "Sign In" page (NOT Article Gateway)
  _satellite.notify('ADTECH: Sign In Page: hide entire Right Rail #rightRail', 1);
  $('body.signin #rightRail').hide();
};


/**
 * Key Value Modifiers
 */

// Map user specialty group code to new non-overlapping codes
mmsAdtech.getNoDupSpecialtyGroupCode = function (userSpecialtyGroupCode) {
  var specialty = userSpecialtyGroupCode,
      specialtyMap = {
      'd':   'drm',
      'em':  'erm',
      'ep':  'epd',
      'ge':  'gst',
      'hos': 'hpt',
      'n':   'neu',
      'nep': 'nph',
      'os':  'osp',
      'p':   'psy',
      'pd':  'pds',
      'plm': 'pll',
      'r':   'rd',
      'u':   'ur'
    };

  if (specialty && specialtyMap[specialty]) {
    specialty = specialtyMap[specialty];
  }
  return specialty;
};

// Specialty KV logic to handle signed in, AAM cookie, and JW URL cookie
mmsAdtech.getSpecialtyKV = function() {
  // 1. Get signed in user Specialty
  // 2. Or, get AAM specialty cookie
  // 3. Or, get JW URL specialty cookie
  var specialty = '',
      userSpecialty = _satellite.getVar('userSpecialtyGroupCode'),
      aamSpecialty = _satellite.getVar('aam_ad_demotarget'),
      jwSpecialty = _satellite.getVar('jwUserSpecialtyGroupCodeInCookie');

  if (userSpecialty) {
    _satellite.notify('ADTECH: KV - userSpecialtyGroupCode: [' + userSpecialty + ']', 1);
    specialty = mmsAdtech.getNoDupSpecialtyGroupCode(userSpecialty);
    _satellite.notify('ADTECH: KV - userSpecialtyGroupCode mapped: [' + specialty + ']', 1);
  } else if (aamSpecialty) {
    specialty = aamSpecialty;
    _satellite.notify('ADTECH: KV - aam_ad_demotarget: [' + specialty + ']', 1);
  } else if (jwSpecialty) {
    _satellite.notify('ADTECH: KV - jwUserSpecialtyGroupCodeInCookie: [' + jwSpecialty + ']', 1);
    specialty = mmsAdtech.getNoDupSpecialtyGroupCode(jwSpecialty);
    _satellite.notify('ADTECH: KV - jwUserSpecialtyGroupCodeInCookie mapped: [' + specialty + ']', 1);
  }
  return specialty;
};


/**
 * Initialization of ADTECH ASYNC DAC 2.0 - Page and Placement Configs
 * with all kv, params, etc.
 */
mmsAdtech.initialize({
  // Page Level Config
  page: {
    server: (_satellite.getVar('protocol') === 'https:') ? 'adserver.adtechus.com' : 'adserver.nejm.org',
    network: '5493.1',
    pageid: _satellite.getVar('adtechPageID')
  },
  placements: {
    // Global params
    params: {
      key: _satellite.getVar('searchQuery')
    },
    // Global kv fields
    kv : {
      articlecat:   _satellite.getVar('articleCategory'),
      articletype:  _satellite.getVar('articleType').substr(0, 48),
      'class':      _satellite.getVar('userSubType'),
      specialty:    mmsAdtech.getSpecialtyKV()
    },
    // List of Placements Queued and Executed in Order
    placements: mmsAdtech.shufflePlacements([
      {
        id: _satellite.getVar('adtechTopbannerID'),
        sizeid: 225,
        adContainerId: 'DTM_Position_Topbanner',
        hideContainer: '#topAdBar',
        completeWithAd: mmsAdtech.onCompleteWithAdTopbanner
      },
      {
        id: _satellite.getVar('adtechMedRectangleID'),
        sizeid: 170,
        adContainerId: 'DTM_Position_MedRectangle',
        hideContainer: '#rightRailAd',
        completeWithNoAd: mmsAdtech.onCompleteWithNoAdMedRectangle
      }
    ]).concat([
      {
        id: _satellite.getVar('adtechAdhesiveID'),
        sizeid: 225,
        adContainerId: 'DTM_Position_Adhesive'
      },
      {
        id: _satellite.getVar('adtechMultiOptionsID'),
        sizeid: 0,
        adContainerId: 'DTM_Position_MultipleOptions',
        hideContainer: '.rightRailAd_MultipleOptions'
      },
      {
        id: _satellite.getVar('adtechMicroIMGID'),
        sizeid: 13,
        adContainerId: 'DTM_Position_MicroIMG'
      },
      {
        id: _satellite.getVar('adtechMicroTrendsID'),
        sizeid: 13,
        adContainerId: 'DTM_Position_MicroTrends'
      },
      {
        id: _satellite.getVar('adtechMicroToolsID'),
        sizeid: 13,
        adContainerId: 'DTM_Position_MicroTools'
      },
      {
        id: _satellite.getVar('adtechMobileBottomID'),
        sizeid: 3055,
        adContainerId: 'DTM_Position_Bottom'
      }
    ])
  }/*,
  // Optional Cookie Settings
  cookies: {
    waitforcookie: true,
    intervalDelay: 50,
    iterationsMax: 8,
    name: 'aam_adtech'
  }*/
});


/**
 * Interstitial
 * Initialization is called from Literatum mmsLayers.js logic
**/
mmsAdtech.showInterstitial = function (onCompleteWithAd, onCompleteWithNoAd) {
  _satellite.notify('ADTECH showInterstitial() Fired!', 1);

  mmsAdtech.initialize({
    placements: {
      // Global kv fields
      kv : {
        pageview:    _satellite.getVar('mmsLayersCounter'),
        referrer:    _satellite.getVar('headersReferrerDomain'),
        loginstatus: _satellite.getVar('userLoginStatus')
      },
      // List of Placements Queued and Executed in Order
      placements: [
        {
          id: _satellite.getVar('adtechInterstitialBannerID'),
          sizeid: 16,
          adContainerId: 'DTM_Position_InterstitialBanner',
          completeWithAd: onCompleteWithAd,
          completeWithNoAd: onCompleteWithNoAd
        }
      ]
    }
  });
};


/**
 * Conditions for Refreshing Ads
**/

// Search Page
(function() {
  if (_satellite.getVar('adCategory') === 'mms.nej.search') {
    _satellite.notify('ADTECH: Search Page - Bind mmsAdtech.refreshAds() to Hashchange', 1);
    $(window).bind('hashchange', function() {
      _satellite.notify('ADTECH: Search Page Filtered - REFRESH All Ads.', 1);
      mmsAdtech.refreshAds();
    });
  }
})();

// Image Challenge - Refresh Topbanner and MedRectangle on Poll Change
mmsAdtech.refreshAdsImageChallenge = function() {
  mmsAdtech.refreshAds();
};

});
