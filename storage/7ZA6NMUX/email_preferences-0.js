/**
 * Variable to enable disable debugging
 *
 * @type Boolean
 */
var DEBUG = false;


/**
 * Sets the callback for UI event.
 */
 
function newsletterButtons() {
	$('.newsletter-button').each(function() {
		var textValue = $(this).text();
		$(this).click(function(e) {
			e.preventDefault();
			if($(this).text() == textValue) {
			 $(this).text('unselect');
			 $(this).parents('li').addClass('enabled');
			 $(this).siblings('input').attr('value',$(this).attr('id'));
			 $(this).siblings("dt").children('span').children("input").attr('value',$(this).attr('id'));
			 $(this).siblings("dt").children('span').children("button").text('unselect');
			}
			else {
				$(this).text(textValue);
				$(this).parents('li').removeClass('enabled');
				$(this).siblings('input').attr('value','');
				$(this).siblings("dt").children('span').children("input").attr('value',"");
				$(this).siblings("dt").children('span').children("button").text('select');
			}
		});
	});
}

function alertButtons() {
	$('.alert-button').each(function() {
		var textValue = $(this).text();
		$(this).click(function(e) {
			e.preventDefault();
			var alert_action = 'false';
			if($(this).text() == 'select') {
				alert_action = 'true';
				$(this).parents('li').addClass('enabled');
				$(this).siblings('input').attr('value',$(this).attr('id'));
				$(this).siblings("dt").children('span').children("input").attr('value',$(this).attr('id'));
				$(this).parents("li").find("button").text('unselect');
			}
			else {
				$(this).parents('li').removeClass('enabled');
				$(this).siblings('input').attr('value','');
				$(this).siblings("dt").children('span').children("input").attr('value',"");
				$(this).parents("li").find("button").text('select');
			}

			var alert_address = $(document).find("input#user_id").attr("value");
			var alert_url = $(document).find("input#siteUrl").attr("value");

			var newsletter = $(this).parents('ul').get(0).id;
			var alert_newsletters = null;

			if (newsletter == 'additional-alerts') {
                alert_newsletters = $($(this).parents('div.alert-button-div')[0]).find('input.newsletterCode')[0].value;
			}
			else if (newsletter == 'etoc-updates') {
				// Send a null - server-side will use this to obtain the journal newsletter
			}
			else {
				alert_newsletters = newsletter;
			}

			var flag = true;
			if (alert_action == 'true'){
				flag = false;
			}

			showNote('note_'+alert_newsletters, flag);
			site.submitnewsletter({address: alert_address, newsletters:alert_newsletters, action:alert_action, url:alert_url, messagecontainer: ".alert-message-box"} );
		});
	});
}

function showAbbreviatedLabels() {
	// full text long titles popup
	jQuery('.long label').each(function() {
		// capture abbreviated title in memory
		var abbreviatedText = jQuery(this).text();
		// replace abbreviated title with full title
		jQuery(this).mouseover(function() {
			jQuery(this).removeClass("clipped").addClass("full");
			jQuery(this).text($(this).attr('title'));
		});
		// replace full title with abbreviated title
		jQuery(this).mouseout(function() {
			jQuery(this).removeClass("full").addClass("clipped");
			jQuery(this).text(abbreviatedText);
		});
	});
}




function setEvents() {

 	//deal with exceptional events
	$("#result").ajaxError(function(event, request, settings, error){
           $(this).text("An error occured while sending your request to server, please try again later.");
		   $('#article-alert-loading').hide();
		   console.log('error ' + error);
 	  });


    //new events for article alerts subscription
    $(".article-alert-toggle-button").click(function(event) {

        var jou_id = $(this).parents("form").children(".journal-id").val();

		event.preventDefault();

		$.log('click article-alert-toggle-button');

		var postParams = buildPostParams(jou_id);

		if ($.browser.mozilla) {
            $.log("Unsubscribing with :" + postParams.toSource());
		}

        var status = $("#futureStatus_"+jou_id).val();
		$.post('/my/preferences', postParams, function(data) {
            update(status, data, jou_id);
          }, 'json');

    });

	$(".article-alert-button-update").click(function(event) {
	    var jou_id = $(this).parents("form").children(".journal-id").val();
        event.preventDefault();
        $.log('click article-alert-button-update');

        var postParams = buildPostParams(jou_id, 'ACTIVE');
        if ($.browser.mozilla) {
            $.log("Updating with :" + postParams.toSource());
        }
        $.post('/my/preferences', postParams,
            function(data) {
                update("ACTIVE", data, jou_id);
            }
            , 'json');
    });

    function update(status, data, jou_id){
        $("#result").text("");
        if (data["string"] == 'Success') {
                if (status == 'ACTIVE') {
                    $('#article-alert-tick_'+jou_id).addClass('enabled');
                    $("#futureStatus_"+jou_id).val("DISABLED");
                    $("#article-alert-button_"+jou_id).show();
                    $("#article-alert-panel_"+jou_id).show(400);
					$('.article-alert-description-panel').hide();
					$("#result").html("You have now successfully subscribed from <em>"+site.name+"</em> article alerts.");
					
                }else{
                    $('#article-alert-tick_'+jou_id).removeClass('enabled');
                    $("#futureStatus_"+jou_id).val("ACTIVE");
                    $("#article-alert-button_"+jou_id).hide();
                    $("#result").html("You have now successfully unsubscribed from <em>"+site.name+"</em>.");
                }

                if ($("#alertSubscriptionPanel")){
				
                     //$("#result").html("You have now successfully subscribed to <em>"+site.name+"</em> article alerts.");
                }
				
            }
    }

    function buildPostParams(jouId, futureStatus){
        if (!futureStatus) {
            futureStatus=  $('#futureStatus_'+jouId).val();
        }
        var postParams = {
            'articleAlertPreference.status' : futureStatus,
            'articleAlertPreference.emailFormat' : $('#article-alert-emailFormat_'+jouId).val(),
            'articleAlertPreference.frequency' : $('#article-alert-frequency_'+jouId).val(),
            'siteId' : jouId,
            'actionFromForm' : 'ARTICLE_ALERT_AJAX'
        };
        return postParams;
    }

}


function format(selected, total) {
    return selected+'/'+total+' selected';
}




function initialize(options) {
    defaultOptions={
    activeClass: 'new-action',
    speed:'fast'/*'slow', 'fast', 'def'*/,
    defaultActive:0,
    showDefault:true
}

this.options=jQuery.extend(defaultOptions, options);

jQuery('.wrap-in', '.wrap').find('table').wrap('<div/>');
jQuery('h2', '.wrap').removeClass('active');
jQuery('h2', '.wrap:has(table.'+this.options.activeClass+')').addClass('active');
jQuery('.wrap-in', '.wrap').find('table.'+this.options.activeClass).parent('div').prev('h3').addClass('active');
jQuery('.wrap-in', '.wrap').find('table').not('.'+this.options.activeClass).parent('div').hide().prev('h3').removeClass('active');
jQuery('.wrap-in', '.wrap').not(':has(table.'+this.options.activeClass+')').hide();
jQuery('.wrap-in').each(
	function(index, element){
		var parent=jQuery(element).parent();
		var note=parent.find('.note').show();
		jQuery(element).find('li').each(function(){
    		if(jQuery(this).find('input:checked').length>0){jQuery(this).addClass('enabled')};
		    note.html(format(jQuery(element).find('input:checked').length, jQuery(element).find('li').length));
		    jQuery(this).click(function(){jQuery(this).toggleClass('enabled').find('input').each(function(){
		        if (jQuery(this).is(':checked'))
                {jQuery(this).attr('checked', false); }
                else
                    jQuery(this).attr('checked', true);
            });
		            note.html(format(jQuery(element).find('input:checked').length, jQuery(element).find('li').length));
		                return false;})
		})});
//jQuery('.wrap-in', '.wrap').find('li').click(function(e){jQuery(this).toggleClass('enabled'); return false})

var self=this;

		jQuery('.wrap').find('h2').click(
										function(){
												   jQuery(this).parent().find('div').
												   eq(0).slideToggle(self.options.speed,
												   function(){
															 jQuery(this).prev('h2').toggleClass('active')
															 })
												  }
										)
		jQuery('.wrap-in', '.wrap').find('h3').click(
										function(){
												   jQuery(this).next('div').slideToggle(self.options.speed,
												   function(){
															  jQuery(this).prev('h3').toggleClass('active')
															  })
												  }
											)

		if(this.options.showDefault){
									if(jQuery('.wrap:has(table.'+this.options.activeClass+')').length == 0)
										{
										  jQuery('.wrap').eq(this.options.defaultActive).find('h2').addClass('active');
									      jQuery('.wrap').eq(this.options.defaultActive).find('.wrap-in').show();
										}
									}

	/* MY INTERESTS: auto-expand accordion if an interest is selected */
	if(site.page == "details") {
		$('.wrap').each(function() {
		var checked = $(this).find('input').filter(":checked").length || 0; // number of checked items inside accordion
			if(checked > 0) {
				$(this).children('h2').addClass('active');
				$(this).children('.wrap-in').show();
			}
		});
	}
    //alert(site.page);
	// accordion handler disabled, as we dont want to auto expand the 1st always.
	if((site.section == "registration" && site.page == "interests") || site.page == "segmentation") {

	 	// collapse first div
	 	if($("div.wrap.show").length > 0 || site.page == "segmentation") {

			 $("div.wrap h2.active").removeClass("active").siblings("div.wrap-in").hide();


			 // display the div matching users prinncipal field
			 $("div.wrap.show h2").addClass("active").siblings("div.wrap-in").show();


		}

	}

}


jQuery(function(){

	initialize();


});

function articleslide() {
    $('.article-alert-panel').hide();
    $('.article-alert-slide-button').bind('click', function() {
        $(this).parents("dt").siblings("dd").slideToggle();
    });
}

function showNote(id, flag){
	if ($("#"+id) != null){
		if (flag){
			$("#"+id).show();	
		}
		else{
			$("#"+id).hide();
		}
	}
}

// temp ajax self-request
function submitSwitcherForm(surl, sswitch) {
    sswitch = "actionFromForm="+sswitch;
    jQuery.ajax({type: "POST",
            url:  surl,
            data: sswitch
    });
}

jQuery(document).ready(function() {

    if (document.referrer.match(/interests/g) != null) {
        submitSwitcherForm('/register/emailalerts', 'PORTAL_UPDATES');
        //if (site.id != "9001" && site.id != "9013" && site.id != "9014")
        //    submitSwitcherForm('/register/emailalerts', 'ETOC_UPDATES');
    }

    // additional alerts during registration handler
    if(window.location.pathname == "/register/emailalerts") {
		$(".alert-button-div").each(function(e) {

		    var email = $("input#user_id").val();
		    var newsletter = $(this).children("input").attr("value");
		    
		    if($(this).find("button.invisible-check").text() == "unselect") {
		        site.submitnewsletter({address: email, newsletters: newsletter, action:true, messagecontainer: ""} );
		    }

		});
	}  


    showAbbreviatedLabels();
	newsletterButtons();
	alertButtons();
	setEvents();
	articleslide();
	articleAlertSubscribeBox();
});

function articleAlertSubscribeBox() {
    if (jQuery('.article-alert-signup-div').offset()) {
       jQuery('#closeHelpBox').click(function(e) {
           e.preventDefault();
           hideArticleAlertSubscribeBox();
       });
    }
}

function hideArticleAlertSubscribeBox() {
           jQuery('.article-alert-signup-div').hide();
           jQuery('#closeHelpBox').hide();
           //set cookie

           jQuery.ajax({type: "POST",
                      url: "/addSiteSettingsCookie",
                      data: JSON.stringify({"bmcsitesettings": [{"article_alert_optout": "true"}]}),
                      dataType:"json",
                      contentType: 'application/json',
                      success:function (data, status) {
                          if ((data.success == true)) {
                            //DO NOTHING, Cookie saved successfully
                          }
                      },
                      error:function (data, status, error) {
                          if (data.status != 404) {
                            //DO NOTHING
                          }
                      }
              });
}