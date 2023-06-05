//var journal_id = "";
//alert('journalid=-'+journal_id);
jQuery(document).ready(function(){
	
	jQuery('a').each(function (){
		var url = jQuery(this).attr("href");
		
		if(typeof(url) != "undefined"){ 
		var slash='';sessIdTag='?';
		var parent = jQuery(this).parent().parent().parent().attr("id");
		
		if(url.indexOf('displayFulltext') == -1 && url.indexOf('displayBackIssues') == -1 && url.indexOf('displayAbstract') == -1 && url.indexOf('displayJournal') == -1 && url.indexOf('displayIssue') == -1 && url.indexOf('displaySpecialArticle') == -1 ){
			if(parent != 'h-menu-rl1-box' && parent != 'h-menu-rl3-box' ){
				if(url.indexOf('javascript') < 0 && url.indexOf('http') <0 && url.indexOf('#') != 0 && url.indexOf('mailto') != 0){
					
					//if (url.indexOf('/')==0) slash='';
					if (url.indexOf('/action/')<0) slash='/action/';
					if (url.indexOf('?')>-1) sessIdTag='&';  
						jQuery(this).attr("href","http://journals.cambridge.org.proxy.library.emory.edu"+slash+url+sessIdTag+'sessionId='+globalSession);
					
				}
			}
		}}
	});
	
});

/* sliding the sidebars boxes */
jQuery('.s-menu a').click(function () {
	jQuery(this).toggleClass("active");
	jQuery('#'+this.id+'-box').slideToggle();

	var ttt ;
	if (jQuery(this).hasClass('active')) {
	  	ttt='block';
	} else {
	 	ttt='none';
	}
	
	jQuery.cookies.set(this.id+'-box', ttt);

	return false; 
});

jQuery('ul.tabs a').click(function () {	
	jQuery(this).toggleClass("active");
	jQuery('ul.tabs a.tab-link').removeClass("active");	
	if(jQuery('#tab-'+this.id+'').css('display')=='block'){
		;
	}else{	
		jQuery('div.tabholder-div').css('display','none');
		jQuery(this).addClass("active");
	}
		
	jQuery('#tab-'+this.id+'').slideToggle();
	return false; 
});

jQuery('.tb').click(function () {
	jQuery('.tb').removeClass("active");
	jQuery(this).addClass("active");
	return false;
});
/* sliding the preview boxes */
jQuery('.preview').click(function () { 
	previewEvent(this);
});

jQuery('.h-tabelm').click(function () { 	
	return false; 
});

/*header search mode*/
jQuery('.csearch,.qsearch').click(function () { 	
	jQuery('#navigation-search').toggleClass("qsearchactive");
	jQuery('#quick-search,#cite-search').toggle();
	return false; 	
});

jQuery('.ji-links ul li').hover(
	function () {
  		jQuery(this).css("background-color","#f0f0f0");
  	}, 
	function () {
  		jQuery(this).css("background-color","#FFFFFF");
  	}
);


/*header login /logout box*/
jQuery('.login').click(function () {	
	if(jQuery(this).hasClass("second_step")){
		jQuery('.ssdd-section').toggle();
		jQuery('.ssdd-section-details').toggle();
		jQuery('.login').toggleClass("second_step");	
	}								
							
	jQuery(this).toggleClass("active");
	jQuery('#session-dd-holder').toggle();
	return false; 	
});

jQuery('.logout').click(function () {	
	if(jQuery(this).hasClass("second_step")){
		jQuery('.ssdd-section').toggle();
		jQuery('.ssdd-section-details').toggle();
		jQuery('.logout').toggleClass("second_step");	
	}								
							
	jQuery(this).toggleClass("active");
	jQuery('#session-dd-holder').toggle();
	return false; 	
});




jQuery('.ssdd-section-bttn').click(function () {
	jQuery('.login').toggleClass("second_step");									
	jQuery('.ssdd-section').toggle();
	jQuery('.ssdd-section-details').toggle();
	jQuery('#cjo_username').focus();
	return false; 	
});

jQuery('.back-issue-row').click(animations_toggleBackIssueRow);

function animations_toggleBackIssueRow() {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	
	var classname=this.className;
	if (classname.indexOf('journal-holder-helper')>-1 || classname.indexOf('comments-holder-helper')>-1){
   //it is in abstract do not excute in related and comment area
	   return false; 
	}
	if (classname.indexOf('displayed')<0){
		jQuery.cookies.set(this.id+'~'+journal_id, 'displayed');
		this.className=classname+' displayed';
		jQuery('div#'+'#'+this.id+'inner div[class*=year-row-item]').each(function (i){
			var yearVol=this.id.substr(13);
			var splittedYearVol=yearVol.split('-');
			if (splittedYearVol.length==1){
				if(jQuery('div#'+this.id+'box div[id*=yvselector]').size() > 0) {
					jQuery('div#'+this.id+'box div[id*=yvselector]').each(function (ia){
						var lineToCut=11;
						if(this.id.indexOf('helper')>0) {
						 	lineToCut=18;
						}
					
						var yearVolForyvselector=this.id.substr(lineToCut);
						var splittedYearVolForyvselector=yearVolForyvselector.split('-');
						getYourAccess(journal_id,splittedYearVolForyvselector[1],splittedYearVolForyvselector[0]);
					});
				} else {
					var volumeYear = jQuery("#"+this.id + " [name=volume-year-identifier]").first().val().split("-");
					if(volumeYear) getYourAccess(journal_id,volumeYear[0],volumeYear[1]);
				}
			} else {
				var year = splittedYearVol[0];
				if(splittedYearVol.length > 2) {
					for(var i = 1; i < splittedYearVol.length - 1; i++) {
						year = year + "-" + splittedYearVol[i];
					}
				}
				getYourAccess(journal_id,splittedYearVol[splittedYearVol.length - 1],year);
			}
		}); 
	} else {
		jQuery.cookies.set(this.id+'~'+journal_id, 'inactive');
	}
	//jQuery.cookies.set(journal_id+"_openAll",null);
	jQuery.cookies.set(journal_id+"_closeAll",null);
	return false; 
}

jQuery('#article-menu-related').click(function () {
	jQuery('#back-issue-row-related').toggleClass("inactive");
	return false; 	
});

jQuery('.year-row-item').click(animations_toggleYearRowItem);

function animations_toggleYearRowItem() {
	if (this.className.indexOf('active-expanded')>-1 ){
		jQuery.cookies.set(this.id+'~'+journal_id, null);
    } else {
		jQuery.cookies.set(this.id+'~'+journal_id, 'active-expanded');
    }
    
	var f = jQuery(this).hasClass("icon-row-f");
	var s = jQuery(this).hasClass("icon-row-s");
	var c = jQuery(this).hasClass("icon-row-c");
	var i = jQuery(this).hasClass("icon-row-i");
	var def= jQuery(this).hasClass("icon-row");
	
	if (def){
		jQuery(this).toggleClass("active-expanded");
		
	}
	
	if(f){
		jQuery(this).toggleClass("active-expanded-f");
	} else if(s) {
		jQuery(this).toggleClass("active-expanded-s");
	} else if(c) {
		jQuery(this).toggleClass("active-expanded-c");
	} else if(i) {
		jQuery(this).toggleClass("active-expanded-i");
	}
	jQuery('#'+this.id+"box").slideToggle();
	//jQuery.cookies.set(journal_id+"_openAll",null);
	jQuery.cookies.set(journal_id+"_closeAll",null);
	return false; 
}

jQuery('.yvselector').click(animations_toggleYVSelector);

function animations_toggleYVSelector() {
	if (this.className.indexOf('active-expanded-mini')>-1 ){ 	
	      jQuery.cookies.set(this.id+'~'+journal_id, null);
	}else{
	     jQuery.cookies.set(this.id+'~'+journal_id, 'active-expanded-mini');
	}

	var def= jQuery(this).hasClass("icon-row-mini");
	if (def) {
		jQuery(this).toggleClass("active-expanded-mini");		
	}else{
	
		if(jQuery(this).attr("class").split(" ")[2]){
			var a=jQuery(this).attr("class").split(" ")[2].split("-")[3];
			jQuery(this).toggleClass("active-expanded-mini-"+a);
		}else{
			var b=jQuery(this).attr("class").split(" ")[1].split("-")[3];
			jQuery(this).toggleClass("active-expanded-mini-"+b);
		}
	}	
	
	jQuery('#'+this.id+"-box").slideToggle();

	jQuery.cookies.set(journal_id+"_closeAll",null);
	return false; 	
}

/*supplement subclass*/
jQuery('.supplement-issue-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	return false; 	
});


jQuery('.supplement-row-item').click(function () {
	jQuery(this).toggleClass("active-expanded");										  
	jQuery('#'+this.id+"box").slideToggle();
	return true;
});

jQuery('.svselector').click(function () {
	jQuery(this).toggleClass("svselector-active-expanded");
	jQuery('#'+this.id+"-box").slideToggle();
	return false; 	
});


/*my alerts*/
jQuery('.my-alerts-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	return false; 	
});

jQuery('[class=issueTitle]').click(function () { 
	var title = jQuery(this).parent().attr('id');
	jQuery('#'+title).toggleClass("active-expanded");										  
	jQuery('#'+title+'box').slideToggle();
	return false; 	
});

/*free content page*/
jQuery('.freeContent-page-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	return false; 	
});


/*free content page*/
jQuery('.jnlUpdates-page-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();

	var status ;
	if (jQuery(this).hasClass('inactive')) {
	  	status='none';
	} else {
	 	status='block';
	}
	
	jQuery.cookies.set(this.id+'inner', status);
	
	return false; 	
});


/*contact us page*/
jQuery('.contactUs-page-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	
	jQuery.get("/action/contactUs/storeMenuSettings?"+Math.random(), {elementId:this.id,load:'N'}, function(data){
		if(data) {
			var items = data.split(",");
			
			if(items.length && items.length == 8) {
				jQuery("#openCloseAll a").text("Close All");
			} else if (items.length < 1){
				jQuery("#openCloseAll a").text("Open All");
			}
		} else {
			jQuery("#openCloseAll a").text("Open All");
		}
	});
	
	return false; 	
});


jQuery('.your-basket-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	return false; 	
});


jQuery('.contact-us-row').click(function () {
	jQuery(this).toggleClass("inactive");
	jQuery('#'+this.id+"inner").slideToggle();
	return false; 	
});


jQuery('.commentbox').click(function () {
	var form = jQuery(this).closest("form").attr("name");
	commentEvent(this,form);
});

jQuery('#alert-message').click(closeAlertMessage);

function closeAlertMessage() {
	jQuery(this).fadeOut();
	jQuery.cookies.set("alert-message", "closed");
	return false;
}

jQuery('.journal-holder-helper').click(function () {
jQuery(this).toggleClass("inactive");
	jQuery('#journals-holder').slideToggle();
	return false; 	
});

jQuery('.comments-holder-helper').click(function () {
jQuery(this).toggleClass("active");
	jQuery(this.id+'-box').slideToggle();
	return false; 	
});

jQuery('.hp-bttn').click(function () {
	jQuery('.hp-bttn').removeClass("active-slide");							  
	jQuery(this).toggleClass("active-slide");
	var mydivid = this.id;
	var imgpath = "/images/background/"+mydivid+".jpg";
	jQuery('#area-selector ').css('background-image','url('+imgpath+')'); 
	return false; 	
});

/*navigation*/
var selectedMenu;
function openMenu(id) {
	if(selectedMenu && selectedMenu == id) {
		jQuery(".dir ul").hide();
		jQuery("ul.dropdown li a.active").attr("class","inactive");
		selectedMenu = null;
	} else {
		jQuery("#" + id).toggleClass("active");
		jQuery("#" + id + "-box").toggle();
		selectedMenu = id;
	}
		
	jQuery("#top-navigation-menu").hover(function(){},
		function(){
			jQuery(".dir ul").hide();
			jQuery("ul.dropdown li a.active").attr("class","inactive");
			selectedMenu = null;			
		}
	);
}

/* get filtered cookies */
function loadFilteredCookies() {
	filteredCookies = jQuery.cookies.filter( /^h-menu/ );
		
	if( typeof filteredCookies === 'object'  ) {
        for( name in filteredCookies ) {
        	cvalue=jQuery.cookies.get(name);
			origName=name.replace('-box','');
			if (cvalue=='block') {
				jQuery('#'+origName).addClass("active");
				jQuery('#'+name).slideDown();
			} else {
				jQuery('#'+origName).removeClass("active");
				jQuery('#'+name).slideUp();
			}
		}
	}
}

function loadEmergencyAnnouncementCookie() {
	var emergencyAnnouncementCookie = jQuery.cookies.get("alert-message");
	if(emergencyAnnouncementCookie == "closed") jQuery('#alert-message').hide();
}

jQuery(document).ready(function(){
	loadFilteredCookies();

	loadEmergencyAnnouncementCookie();

	/*collapse navigation*/
	jQuery("body").click(function(){
		jQuery(".dir ul").hide();
		jQuery("ul.dropdown li a.active").attr("class","inactive");
		if(selectedMenu && selectedMenu == jQuery("ul.dropdown li a.active").attr("id")) selectedMenu = null;
	});
	
    jQuery('#topformheadersubmit,#topformheadersubmit2').hover(
        function(){ // Change the input image's source when we "roll on"
            jQuery(this).attr({ src : '/images/buttons/search_hover.gif'});
        },
        function(){ // Change the input image's source back to the default on "roll off"
            jQuery(this).attr({ src : '/images/buttons/search_normal.gif'});
		}
    );
    
    jQuery('#artLookup-bttn input').hover(
		function(){ // Change the input image's source when we "roll on"
			jQuery(this).attr({ src : '/images/buttons/articleLookup_hover.gif'});
		},
		function(){ // Change the input image's source back to the default on "roll off"
			jQuery(this).attr({ src : '/images/buttons/articleLookup.gif'}); 
		}
	);
	
	jQuery('.go-form-bttn').hover(
        function(){ // Change the input image's source when we "roll on"
            jQuery(this).attr({ src : '/images/buttons/go_hover.gif'});
        },
        function(){ // Change the input image's source back to the default on "roll off"
            jQuery(this).attr({ src : '/images/buttons/go_normal.gif'});
        }
    );
	
	jQuery('.comment-bttn').hover(
        function(){ // Change the input image's source when we "roll on"
            jQuery(this).attr({ src : '/images/buttons/comment_hover.gif'});
        },
        function(){ // Change the input image's source back to the default on "roll off"
            jQuery(this).attr({ src : '/images/buttons/comment_normal.gif'});
        }
    );
	
	jQuery('.comment-bttn').click(function() {
		var form = jQuery(this).closest("form").attr("name");							
		postCommentEvent(this,form);
		return false;
	});	        
		
	jQuery("#paradigm_all").click(function(){
		var checked_status = this.checked;
		jQuery("input[name=paradigm]").each(function(){
			this.checked = checked_status;
		});
	});
			
	jQuery(".hselect_all").click(function(){
		var checked_status = true;
		jQuery("input[name=paradigm]").each(function(){
			this.checked = checked_status;
		});
		return false;
	});	
			
	jQuery(".hdselect_all").click(function(){
		var checked_status = false;
		jQuery("input[name=paradigm]").each(function(){
			this.checked = checked_status;
		});
		return false;
	});	
	
	
});