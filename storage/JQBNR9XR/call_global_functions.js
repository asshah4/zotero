jQuery(document).ready(function(){
	checkforblankAds();
	mouseoverForScienceDirectLink();
	setTimeout("getIpadUserAgent()", 5000);
	if(location.pathname == "/" || location.pathname == "/home"){
      getCarouselState(); 
 }
});