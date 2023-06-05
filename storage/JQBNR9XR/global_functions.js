function checkforblankAds(){
                if(document.getElementById('banner_ad')){
                                if(jQuery("#banner_ad").children().children().children("a").length > 0 && jQuery("#banner_ad").children().children().find("object").length == 0 && jQuery("#banner_ad").children().children().find("embed").length == 0 && jQuery("#banner_ad").children().children().find("iframe").length == 0){
                                                jQuery("#banner_ad").children().children().children("a").each(function(){
                                                                if(jQuery(this).children("img").attr("src") != "http://s0.2mdn.net/viewad/817-grey.gif"){
                                                                                addLeaderboardWrapper();
                                                                               //addAdvertisementSeperator();
                                                                                return false;
                                                                }
                                                })
                                } else if(jQuery("#banner_ad").children().children().find("img").length == 0 && jQuery("#banner_ad").children().children().find("object").length == 0 && jQuery("#banner_ad").children().children().find("embed").length == 0 && jQuery("#banner_ad").children().children().find("iframe").length == 0){
                                                // do nothing;
                                } else{
                                                addLeaderboardWrapper();
                                                //addAdvertisementSeperator();
                                }
                }

                if(document.getElementById('srch_res_ad_sky')){
                                if(jQuery("#srch_res_ad_sky").children().children().children("a").length > 0  && jQuery("#srch_res_ad_sky").children().children().find("object").length == 0 && jQuery("#srch_res_ad_sky").children().children().find("embed").length == 0 && jQuery("#srch_res_ad_sky").children().children().find("iframe").length == 0){
                                                jQuery("#srch_res_ad_sky").children().children().children("a").each(function(){
                                                                if(jQuery(this).children("img").attr("src") != "http://s0.2mdn.net/viewad/817-grey.gif"){
                                                                                addSkyWrapper();
                                                                                return false;
                                                                }
                                                })
                                } else if(jQuery("#srch_res_ad_sky").children().children().find("img").length == 0 && jQuery("#srch_res_ad_sky").children().children().find("object").length == 0 && jQuery("#srch_res_ad_sky").children().children().find("embed").length == 0){
                                                // do nothing;
                                } else{
                                                addSkyWrapper();
                                }
                }

                if(document.getElementById('rightfragment')){
                                if(jQuery("#rightfragment").children().children("a").length > 0 && jQuery("#rightfragment").children().find("object").length == 0 && jQuery("#rightfragment").children().find("embed").length == 0 && jQuery("#rightfragment").children().find("iframe").length == 0){
                                                jQuery("#rightfragment").children().children("a").each(function(){
                                                                if(jQuery(this).children("img").attr("src") != "http://s0.2mdn.net/viewad/817-grey.gif"){
                                                                                addBoomboxWrapper();
                                                                                return false;
                                                                }
                                                })
                                } else if(jQuery("#rightfragment").children().find("img").length == 0 && jQuery("#rightfragment").children().find("object").length == 0 && jQuery("#rightfragment").children().find("embed").length == 0){
                                                // do nothing;
                                } else{
                                                addBoomboxWrapper();
                                }
                }
}

function addLeaderboardWrapper(){
	jQuery("#banner_ad").show();
	jQuery("#banner_ad").children("#ad_leader").css("background", "#999999 url(/images/advertisement_vlabel.gif) no-repeat 4px center");
}

function addSkyWrapper(){
	jQuery("#srch_res_ad_sky").show();
	jQuery("#srch_res_ad_sky").children("#ad_sky_label").css("background", "#EEEEEE url(/images/bg_adVert.gif) no-repeat scroll center 4px");
}

function addBoomboxWrapper(){
	jQuery("#rightfragment").show();
	jQuery("#rightfragment").children(".advert").css("background", "#EEEEEE url(/images/bg_adVert.gif) no-repeat scroll center 4px");
}

function randNum(){
	var rNumber = Math.floor((Math.random()*8999)+1000);
	return rNumber;
}

function mouseoverForScienceDirectLink() {
    jQuery(document).ready(function(){
      jQuery(".sd_link").mouseover(function(){
           var p = jQuery(this).position();
           var top = (p.top + 20);
           jQuery(".tooltip").css({"top": top, "left": p.left});
           jQuery(".tooltip").slideDown("fast");
       });
       jQuery(".sd_link").mouseout(function(){
           jQuery(".tooltip").slideUp("fast");
       })
    })	
}

function initInterstitial(){
	showInterstitial();
	$(".close").click(function(){
		closeInterstitialPage();
		hideInterstitial();
	});
	$("#noThanks").click(function(){
		noThanks();
		hideInterstitial();
	});
	$(".download_ipad").click(function(){
		downloadIpadApplication();
		hideInterstitial();
	});
}

function positionInterstitial(){
                var documentWidth = parseInt($(document).width());
                var interstitialWidth = 800;
                var leftPos = (documentWidth * .5) - (interstitialWidth * .5);
                return leftPos;
}

function showInterstitial(){
                var documentHeight = $(document).height();
                var documentWidth = $(document).width();
                var leftPos = positionInterstitial();
                $("#interstitialContainer").height(documentHeight);
                $("#interstitialContainer").width(documentWidth);
                $("#interstitial_ipad").css("left", leftPos);
                $("#interstitialContainer").fadeIn();
}

function hideInterstitial(){
	$("#interstitialContainer").fadeOut();
}

function getIpadUserAgent() {
		if(isInterstitialPageRequired()){
		initInterstitial();
		
		}
}

function isInterstitialPageRequired() {
        if(navigator.userAgent.match(/iPad/i)){
              if(isRequestFromSearchEngine()){
                     if((getCookieValueInterstitial('requestFromSearchEngine') != 'true' ) && (getCookieValueInterstitial('interstitialPageRequired') != "false") && (getCookieValueInterstitial('previousSessionId') != getCookieValueInterstitial('JSESSIONID'))){
        	               return true;
                      }
              }
        }
		return false;
}

function isRequestFromSearchEngine() {
          var referer = document.referrer;
                if( referer.match(/google/i) != null  || referer.match(/scholar.google/i) != null || referer.match(/bing/i) != null ||referer.match(/search.yahoo/i) != null || referer.match(/search.msn/i) != null){
						storeCookieInterstitial('requestFromSearchEngine', 'true');
						return false;                       
                }else {
          			return true;
     			}
}


function downloadIpadApplication() {
	setCookieInterstitialPermanent('interstitialPageRequired', "false", 100, "", "", "");
}

function noThanks() {
	setCookieInterstitialPermanent('interstitialPageRequired', "false", 100, "", "", "");
}

function closeInterstitialPage() {
	storeCookieInterstitial('previousSessionId', getCookieValueInterstitial('JSESSIONID'));
}

function getCookieValueInterstitial(name) {
	var nameValuePairs = document.cookie.split(';');
	for(var i=0;i < nameValuePairs.length;i++) {
		var nameValuePair = unescape(nameValuePairs[i].replace(" ","")); // spaces used for display in the document.cookie() removed
		if(nameValuePair.indexOf(name+"=")!= -1) {
			return nameValuePair.substring(name.length + 1, nameValuePair.length);
		}
	}
	return "";
}

function storeCookieInterstitial(name, value) {
	document.cookie = name+"="+escape(value);
}

function setCookieInterstitialPermanent( name, value, expires, path, domain, secure ){
// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24 * 12;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}
function addAdvertisementSeperator(){
 jQuery("body").css("background", "url(/images/body_bg.jpg) repeat-x 0 0");
 jQuery("#header").css("paddingTop", "20px");
}