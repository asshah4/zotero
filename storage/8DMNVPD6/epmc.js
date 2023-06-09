/*
	RELATED ARTICLES EXPANSION AND CONTRACTION

	showHideRelatedClick is called when a "Show all items" link is clicked
	on Citations, BioEntities or Related Articles tabs. Or any tab that has
	links wrapped in a .showHideRelated holder. It is not nearly as well 
	documented as the checkHeights function below, but it's pretty basic.	
	So use your noggin, buddy.

	Actually I take it back. I just went through and documented it. I'm your
	coding pal from the past, looking out for you! Pay it forward. ;)

	Change the variable "debugging" to true in order to enable
	debug logging. console.log throws errors in older versions of 
	Internet Explorer and is not recommended for live builds,
	so debugging should be set to false in that scenario.

*/

// When a "Show all items" link is clicked...
$(".showHideRelated a").live('click', function() { // We use .live('click') because jQuery cannot use .click on content loaded via ajax

	// IE7 cannot pull scrollHeight reliably and generally sucks and has a low market share 
	// (~1% as of Sept. 2012). Thus we don't do anything if the user is on IE7. 
	// ie7 variable is set in the HTML head in a if IE 7 statement.
	if (!ie7) {
		// Call the showHideRelatedClick function, pass the parent's ID and class,
		// and the grandparent's ID (for determining what section we're in).
		// AND the great-grandparent's ID (for the related articles tab, which requires
		// this b/c that's the only way we can differentiate between the two different
		// content containers).
		
		

		// Find the holder element's ID
		var parentID ="";
		var parentClass =  $(this).parent().parent().attr('class');
		
		var collapsedStatus = "";
		var classCrossReference="";
		var classList="";
		
		if (parentClass.indexOf("btmsmr")>-1){
			//tmsummary links
			classCrossReference ="btmsmr";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("bxref1")>-1){
			//crossreference link
			classCrossReference = "bxref1";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("bxref2")>-1){
			//crossreference link
			classCrossReference = "bxref2";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("citesFollowingHolder")>-1){
			//citation to
			classCrossReference = "citesFollowingHolder";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().attr('id');
			 classList="citations_listing";
		}else if (parentClass.indexOf("citedByHolder")>-1){
			//cited by
			classCrossReference = "citedByHolder";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().attr('id');
			 classList="citations_listing";
		}else if (parentClass.indexOf("citationsHolder")>-1){
			//related articles
			classCrossReference = "citationsHolder";
		    parentID = $(this).parent().parent().parent().parent().attr('id');
		    classList="citations_listing";
		}
			
			
		if (parentClass.indexOf("collapsed")==-1){
			collapsedStatus = "expanded";
		}else{
			collapsedStatus = "collapsed";
		}
		
		showHideRelatedClick(parentID, collapsedStatus, classCrossReference, classList);
	}
});

function showHideRelatedClick(clickedItemParent,collapsedStatus, classCrossReference, classList) {

	// To display debug messages, set this variable to true.
	var debugging = false;

	if (debugging) {
		console.log('clickedItemParent = ' + clickedItemParent);
		console.log('classCrossReference = ' + classCrossReference);
		console.log('classList = ' + classList);
		console.log('collapsedStatus = ' + collapsedStatus);
	}

	var fullHeight = $('#' + clickedItemParent + ' .'+classCrossReference+ ' .'+classList)[0].scrollHeight;
	

	// If the holder has the "collapsed" class (which it does by default, 
	// and when it has previously been collapsed), run the expansion functions.
	if (collapsedStatus == 'collapsed') {
		$('#' + clickedItemParent + ' .'+classCrossReference+ ' .'+classList).animate({
			maxHeight: fullHeight
		}, 500, function() {
			// And change its link's text so that when the user sees it
			// again, it's telling them to collapse instead of expand
			$('#' + clickedItemParent + ' .'+classCrossReference+ ' .showHideRelated a').html('Show fewer items');
		});
		// Swap classes so on the next click it collapses instead of expanding
		$('#' + clickedItemParent + ' .'+classCrossReference).removeClass('collapsed');
		$('#' + clickedItemParent + ' .'+classCrossReference).addClass('expanded');
	}else {
		// If the holder does not have the "collapsed" class (which it only looses when
		// it has been expanded previously), run the contraction functions.
		// Animate the holder closed by setting its max-height CSS value
		// to the standard height of 220.
		
		$('#' + clickedItemParent + ' .'+classCrossReference+ ' .'+classList).animate({
			maxHeight: 220
		}, 500, function() {
			// And change its link's text so that when the user sees
			// it again, it's telling them to expand instead of contract
			$('#' + clickedItemParent + ' .'+classCrossReference + ' .showHideRelated a').html('Show all items');
		});	

		// Swap classes so on the next click it expands instead of contracting
		$('#' + clickedItemParent + ' .'+classCrossReference).removeClass('expanded');
		$('#' + clickedItemParent + ' .'+classCrossReference).addClass('collapsed');
	}
}




/* 
	LINK HIDER

	checkHeights is a looping function which is called the first 
	time on load. It checks for .showHideRelated a's, and when it
	finds them, it does various checks on their parent's content
	container's heights. If the container's height is less
	than the value set in epmc.css (220px), the link is hidden.

	This function loops because it can only run when the user actually
	clicks on a tab. Before that, the content has been loaded through
	ajax and while it's in the DOM, it hasn't been rendered, and thus
	it does not have a height. A nice next step would be to code a 
	cleanup function so that when the user has clicked every possible
	tab, it stops running. However pretty lightweight so it should not
	bog things down too much.

	Change the variable "debugging" to true in order to enable
	debug logging. console.log throws errors in older versions of 
	Internet Explorer and is not recommended for live builds,
	so debugging should be set to false in that scenario.
*/

function checkHeights() {

	// To display debug messages, set this variable to true.
	var debugging = false;

	if (debugging) {
		console.log('== checkHeights() CALLED ==');
	}

	// BUG FIXING:
	// Call bioEntitiesFixer() to see if there are any double content box instances
	// that'll need to have their buttons swapped out.
	//bioEntitiesFixer();

	$('.showHideRelated a').each(function() {
		if (debugging) {
			console.log('== FOR EACH ==');
		}
		
		var parentID ="";
		var parentClass =  $(this).parent().parent().attr('class');
		var classList="";
		
		if (parentClass.indexOf("btmsmr")>-1){
			//tmsummary links
			 parentClass ="btmsmr";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("bxref1")>-1){
			//crossreference link
			parentClass = "bxref1";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("bxref2")>-1){
			//crossreference link
			parentClass = "bxref2";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id');
			 classList="relartsdiv";
		}else if (parentClass.indexOf("citesFollowingHolder")>-1){
			//citation to
			parentClass = "citesFollowingHolder";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().attr('id');
			 classList="citations_listing";
		}else if (parentClass.indexOf("citedByHolder")>-1){
			//cited by
			parentClass = "citedByHolder";
			 parentID = $(this).parent().parent().parent().parent().parent().parent().attr('id');
			 classList="citations_listing";
		}else if (parentClass.indexOf("citationsHolder")>-1){
			//related articles
			parentClass = "citationsHolder";
		    parentID = $(this).parent().parent().parent().parent().attr('id');
		    classList="citations_listing";
		}
		
		if (debugging) {
				console.log("parentID = " + parentID+" parentClass"+ parentClass);
		}

		// Then grab the parent's content container's height and scrollHeight
		var containerHeight = $('#' + parentID +" ."+parentClass+" ."+classList).height();
		
		// If the containerHeight is null or 0, it means the user hasn't clicked into
		// a tab yet. If they haven't done so, checking the scrollHeight in IE
		// throws an error and stops the function from running. So we wrap the
		// scrollHeight in an if statement to avoid that.
		if (containerHeight > 0) {
			if (debugging) {
				console.log(parentID + 's '+ parentClass+' content containers height is > 0. Grab scrollHeight.');	
			}
			var containerScrollHeight =0;
			
			containerScrollHeight = $('#' + parentID +" ."+parentClass+" ."+classList)[0].scrollHeight;
			
			if (debugging) {
				console.log(parentID + 's '+parentClass+' content container is ' + containerHeight + 'px tall.');
				console.log(parentID + 's '+parentClass+' content containers scrollHeight is ' + containerScrollHeight + 'px.');
				
			}
		}
		else {
			if (debugging) {
				console.log(parentID + 's '+parentClass+' content containers height is 0. Do not grab srollHeight.');
			}
		}
		
		// Now check if the link is shown or not. If it hasn't been shown yet...
		if ($(this).is(":visible")==false) {
			if (debugging) {
				console.log('Found a hidden link.');
				console.log(containerScrollHeight + ' ?? 220');
			}
			
			// ... if the content contanier's height is higher than the set height (set in CSS) show it!
			if (containerScrollHeight > 220) {
				if (debugging) {
					console.log('Hidden link content is higher than 220px. Showing link.');
				}
				
				// Show the link.
				$('#' + parentID +" ."+parentClass+' .showHideRelated a').css("display","block");
					
				if (debugging) {
					console.log(parentID +" "+parentClass+'s link has been shown.');
				}
			}else {
				if (debugging) {
					console.log('Container '+parentID +" "+parentClass+' is shorter than 220px. Link should be hidden.');
				}
			}
		}
		if (debugging) {
			console.log('== END EACH ==');
		}
	});

	// Set the timeout to run checkHeights again, 
	// as this has to run the first time a user clicks into
	// a new tab.
	setTimeout('checkHeights()', 1000);
}

/* 
	INIT

	Call checkHeights for the first time to set off the whole shebang.

*/
$(document).ready(function(){

	// IE7 cannot pull scrollHeight reliably and generally sucks and has a low market share 
	// (~1% as of Sept. 2012). Thus we don't do anything if the user is on IE7. 
	// ie7 variable is set in the HTML head in a if IE 7 statement.
	if (!ie7) {
		checkHeights();
		checkHeightsLabsLinks();
	}
});

//LABS LINKS WORKING


//When a "Show all items" link is clicked...
$(".labs_links_showHideRelated a").live('click', function() { // We use .live('click') because jQuery cannot use .click on content loaded via ajax
	if (!ie7) {
		// Call the showHideRelatedClick function, pass the parent's ID and class,
		// and the grandparent's ID (for determining what section we're in).
		// AND the great-grandparent's ID (for the related articles tab, which requires
		// this b/c that's the only way we can differentiate between the two different
		// content containers).
		
		// Find the holder element's ID
		var parentID =  $(this).parent().parent().attr("id");
		var parentClass =  $('#' + parentID + ' .links_summary').attr("class");
		
		var collapsedStatus = "";
			
		if (parentClass.indexOf("collapsed")==-1){
			collapsedStatus = "expanded";
		}else{
			collapsedStatus = "collapsed";
		}
		
		showHideLabsLinks(parentID, collapsedStatus);
	}
});

function showHideLabsLinks(parentID, collapsedStatus) {
	var parentClass = 'links_summary';

	var fullHeight = $('#' + parentID + ' .'+parentClass)[0].scrollHeight;
	

	// If the holder has the "collapsed" class (which it does by default, 
	// and when it has previously been collapsed), run the expansion functions.
	if (collapsedStatus == 'collapsed') {
		$('#' + parentID + ' .'+parentClass).animate({
			maxHeight: fullHeight
		}, 500, function() {
			// And change its link's text so that when the user sees it
			// again, it's telling them to collapse instead of expand
			$('#' + parentID + ' .labs_links_showHideRelated a').html('Show fewer items');
		});
		// Swap classes so on the next click it collapses instead of expanding
		$('#' + parentID + ' .'+parentClass).removeClass('collapsed');
		$('#' + parentID + ' .'+parentClass).addClass('expanded');
	}else {
		// If the holder does not have the "collapsed" class (which it only looses when
		// it has been expanded previously), run the contraction functions.
		// Animate the holder closed by setting its max-height CSS value
		// to the standard height of 220.
		
		$('#' + parentID + ' .'+parentClass).animate({
			maxHeight: 220
		}, 500, function() {
			// And change its link's text so that when the user sees
			// it again, it's telling them to expand instead of contract
			$('#' + parentID + ' .labs_links_showHideRelated a').html('Show all items');
		});	

		// Swap classes so on the next click it expands instead of contracting
		$('#' + parentID + ' .'+parentClass).removeClass('expanded');
		$('#' + parentID + ' .'+parentClass).addClass('collapsed');
	}
}






function checkHeightsLabsLinks() {

	$('.labs_links_showHideRelated a').each(function() {
		
		var parentID =  $(this).parent().parent().attr("id");
		var parentClass =  "links_summary";
		
		// Then grab the parent's content container's height and scrollHeight
		var containerHeight = $('#' + parentID +" ."+parentClass).height();
		
		// If the containerHeight is null or 0, it means the user hasn't clicked into
		// a tab yet. If they haven't done so, checking the scrollHeight in IE
		// throws an error and stops the function from running. So we wrap the
		// scrollHeight in an if statement to avoid that.
		if (containerHeight > 0) {
			var containerScrollHeight = containerScrollHeight = $('#' + parentID +" ."+parentClass)[0].scrollHeight;
		}
		
		// Now check if the link is shown or not. If it hasn't been shown yet...
		if ($(this).is(":visible")==false) {
			// ... if the content contanier's height is higher than the set height (set in CSS) show it!
			if (containerScrollHeight > 220) {
				// Show the link.
				$('#' + parentID + ' .'+parentClass).addClass('collapsed');
				$('#' + parentID +" .labs_links_showHideRelated a").css("display","block");
					
			}

		}
	});

	// Set the timeout to run checkHeights again, 
	// as this has to run the first time a user clicks into
	// a new tab.
	setTimeout('checkHeightsLabsLinks()', 1000);
}

/**
Functions to use the tooltip in all devices except from request coming from IPAD, IPhone, IPOD
*/
function isTipAllowed(){
	var ret = true;
	var useragent = navigator.userAgent;
	if((useragent.match(/iPhone/i)) || (useragent.match(/iPod/i))|| (useragent.match(/iPad/i))) {
	   ret = false;
	}
	return ret;
}

/**params for tooltip in input**/
function TipAllowed(){
	if (isTipAllowed()){
		if (arguments.length ==1){
			Tip(arguments[0]);
		}else if (arguments.length ==2){ 
			Tip(arguments[0], arguments[1]);
		}else if (arguments.length ==3){ 
			Tip(arguments[0], arguments[1], arguments[2]);
		}else if (arguments.length ==5){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
		}else if (arguments.length ==7){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
		}else if (arguments.length ==9){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
		}else if (arguments.length ==11){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
		}else if (arguments.length ==13){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
		}else if (arguments.length ==15){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
		}else if (arguments.length ==17){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16]);
		}else if (arguments.length ==19){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16], arguments[17], arguments[18]);
		}else if (arguments.length ==21){ 
			Tip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16], arguments[17], arguments[18], arguments[19], arguments[20]);
		}
	}
}

function TagToTipAllowed(){
	if (isTipAllowed()){
		if (arguments.length ==1){
			TagToTip(arguments[0]);
		}else if (arguments.length ==2){ 
			TagToTip(arguments[0], arguments[1]);
		}else if (arguments.length ==3){ 
			TagToTip(arguments[0], arguments[1], arguments[2]);
		}else if (arguments.length ==5){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
		}else if (arguments.length ==7){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
		}else if (arguments.length ==9){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
		}else if (arguments.length ==11){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
		}else if (arguments.length ==13){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
		}else if (arguments.length ==15){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
		}else if (arguments.length ==17){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16]);
		}else if (arguments.length ==19){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16], arguments[17], arguments[18]);
		}else if (arguments.length ==21){ 
			TagToTip(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15], arguments[16], arguments[17], arguments[18], arguments[19], arguments[20]);
		}
	}
}



function UnTipAllowed(){
	if (isTipAllowed()){
		UnTip();
	}
}
