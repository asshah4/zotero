/**
 * On document load
 */
jQuery(document).ready(function() {
	//load custom validations
	addCustomValidations();
	
	//load validator defaults 
	setValidatorDefaults();
	
	//load login
	initLogin();
		
	//load Submit buttons
	initSubmit();
	
	//load Reset buttons
	initReset();
	
	//default cjo Done --fix for My Cambridge Journals Online menu
	jQuery("li.done").click(function(){
		window.location.href = "login";
	});
	
	//Custom Initialization
	initPage();
});

/**
 * Set jquery validator defaults here
 * use jQuery(form).valid() to validate
 * @onsubmit: do not validate
 */
function setValidatorDefaults() {
	jQuery.validator.setDefaults({
		onsubmit: false
	});
}

/**
 * Initialize CJO submit buttons
 */
function initSubmit() {
	jQuery("a.go").click(submitForm);
	jQuery("li.save").click(submitForm);
	jQuery("li.back").click(submitForm);
	jQuery("li.email").click(submitForm);
	jQuery("li.cancel").click(submitForm);
	jQuery("li.search").click(submitForm);
	jQuery("li.submit").click(submitForm);
	jQuery("li.update").click(submitForm);
	jQuery("li.delete").click(submitForm);
	jQuery("li.reject").click(submitForm);
	jQuery("li.publish").click(submitForm);
	jQuery("li.activate").click(submitForm);
	jQuery("li.download").click(submitForm);
	jQuery("li.unpublish").click(submitForm);
	jQuery("li.runReport").click(submitForm);
	jQuery("li.uploadLogo").click(submitForm);
	jQuery("li.removeLogo").click(submitForm);
	jQuery("li.delRemUser").click(submitForm);
	jQuery("li.actRemUser").click(submitForm);
	jQuery("li.findTitles").click(submitForm);
	jQuery("li.saveArticle").click(submitForm);
	jQuery("li.saveHeading").click(submitForm);
	jQuery("li.deactRemUser").click(submitForm);
	jQuery("li.activateMore").click(submitForm);
	jQuery("li.newRemoteUser").click(submitForm);
	jQuery("li.backCommentList").click(submitForm);
	jQuery("li.activateMultiple").click(submitForm);
	jQuery("li.updateOrganisation").click(submitForm);
	jQuery("li.addHighlightArticle").click(submitForm);
	jQuery("li.updateHighlightArticle").click(submitForm);
	jQuery("a.del").click(submitForm);
	jQuery("a.upload").click(submitForm);
	jQuery("li.submitForm").click(submitForm);
	jQuery("li.export").click(submitForm);
}

/**
 * Override this for logic before submit
 * @return boolean 
 */
function doBeforeSubmit(element) {
	return(element.closest("form").valid());
}

/**
 * Default submit functionality
 */
function submitForm(event) {
	if(doBeforeSubmit(jQuery(this))) {
		jQuery(this).closest("form").submit();
	}
}

/**
 * Initialize CJO Reset buttons
 * @return
 */
function initReset() {
	jQuery("li.reset").click(resetForm);
	jQuery("li.SmallReset").click(resetForm);	
	jQuery("a.bot_reset").click(resetForm);
	jQuery("li.clearForm").click(resetForm);
	
}

/**
 * Default reset functionality
 */
function resetForm(event) {
	var formName = jQuery(this).closest("form").attr("name");
	document.forms[formName].reset();
	event.preventDefault();
}

/**
 * Override this for custom initialization 
 */
function initPage() {
	
}

/**
 * Set Custom validators here
 */
function addCustomValidations() {
	/**
	 * Check if input date format is correct (ddMMMyyyy)
	 */
	jQuery.validator.addMethod("cjoDateFormat", function(value, element) {
		if( !value ) {
  			return true;
		}
		return Date.parseExact(value, "ddMMMyyyy") ? true : false;		
	  }, "Invalid date format."
	);
	
	/**
	 * Validate comma separated email addresses
	 */
	jQuery.validator.addMethod("multipleEmail", function(value, element) {
		if( !value ) {
  			return true;
		} else {
			var separator = ",";
			var tokens = new Array();

			if (value.substring(value.length - 1, value.length) == ',') {
				return false;
			}

			tokens = tokenize(value, separator);
			for (var i = 0; i < tokens.length; i++) {
				if (!checkEmail(trim(tokens[i]))) {
					return false;
				}
			}
			return true;
		}		
	}, "Please enter a valid email address after each comma.");
}

/**
 * Initialize for Login
 */
function initLogin() {
	jQuery("#cjo_username").click(function() {
		jQuery('div.errorRow').text('');
	});
	
	jQuery("#loginForm").bind("keypress", function(e) {
		if(e.keyCode==13){
			jQuery("#submitUsrnamePassword").click();
			return false;
		}
	}); 

	jQuery('div.submitrow a').click(function() {

		var puserName = document.loginForm.userName.value;
	    var ppassWord = document.loginForm.passWord.value;
		var puserName= document.loginForm.userName.value;
		var ploginCount = document.loginForm.loginCount.value;
	
		if (ploginCount=='') {
			ploginCount='0';
		}
				
		jQuery.post('/validator?'+Math.random(),
				{userName:puserName, passWord:ppassWord, loginCount:ploginCount },
				function(data) {
					if(data=='success'){
						document.loginForm.submit();
					} else if(data=='forgottenPassword') {
						window.location='forgottenPassword';
					} else if(data=='NSforgottenPassword') {
						window.location='NSforgottenPassword';
					} else if(null != data )  {
						var computedValues = data.split(',');
						document.loginForm.loginCount.value= computedValues[0];
		                jQuery('div.errorRow').text(computedValues[1]);
	 					document.loginForm.passWord.value='';
	 					document.loginForm.userName.value='';
					} else {   
						jQuery('div.errorRow').text('Unexpected error.');
					}
				}
		);
	});
}

function doSort(fname) {
	if (fname=='upper') { 
		document.page_sort_upper.action='displayIssue';
		document.page_sort_upper.submit();
	} else if(fname=='lower') {
		document.page_sort_lower.action='displayIssue';
		document.page_sort_lower.submit();
   }
   return true;
}

function displayCommentCount(componentId, form) {
	jQuery.post('/comment?'+Math.random(),
		{type:'getCommentCount', componentId:componentId},
		function(data) {
			if (data != '-1') {
				if(form == 'commentPostAbstract'){
					jQuery('#commentbox' + componentId).html('<span class="title">User Comments (' + data + ')</span>');
				}else{
					jQuery('#commentbox' + componentId).html(data + ' Comments');
				}	
			}
		}				
	);
}

function loadComments(jid, componentId, form) {
	jQuery('.comments-list' + componentId).html('');
	
	jQuery.post('/comment?'+Math.random(),
		{type:'getComments', jid:jid, componentId:componentId},
		function(data) {	
			if (data == 'disabled') {
				jQuery('.comments-list' + componentId).html("Comments are disabled for this article.");
			} else {
				var size;
				
				if (data != 'none') {
					var myJSONObject = eval('(' + data + ')');
					size = myJSONObject.comment.length;
					for (i=0; i<size;i++) {
						cmmnt = myJSONObject.comment[i];
						commentCtr = cmmnt.commentId;
						
						jQuery('.comments-list' + componentId).append("" +
								"<div class=\"clear\"></div>" +
								"<!-- start comment-->" +
								"<div class=\"comment\" style=\"display:none\" id=\"comment" + commentCtr + "\">" +
								"	<div class=\"comment-details\">" +
								"		<p class=\"cd-name\" id=\"cd-name" + commentCtr + "\"></p>" +
								"		<p class=\"cd-role\" id=\"cd-role" + commentCtr + "\"></p>" +
								"" +	
								"		<p class=\"cd-copy\" id=\"cd-copy" + commentCtr + "\"></p>" +
								"	</div>" +
								"</div>" +
								"<!-- end of comment -->" +
								"");
						
						jQuery('#cd-name'+commentCtr).text(cmmnt.name);
						jQuery('#cd-role'+commentCtr).text(cmmnt.institution);	
						jQuery('#cd-copy'+commentCtr).html(cmmnt.comment);
						
						jQuery('#comment'+commentCtr).fadeIn('slow');
					}
				} else {
					size = 0;
				}
			
				if(form == 'commentPostAbstract'){
					jQuery('#commentbox' + componentId).html('<span class="title">User Comments (' + size + ')</span>');
				} else {
					jQuery('#commentbox' + componentId).html(size + ' Comments');
				}				
			}
		}		
	);
}

function commentEvent(item,form){
	var componentId = parseInt(item.id.split('commentbox')[1]);
	var jid = jQuery("#jid").val();
	
	if (jQuery('#'+item.id+"-box").css('display') == 'none') {
		jQuery('#'+item.id+"-box").slideToggle();		
		
		loadComments(jid, componentId,form);
	} else {
		jQuery('#'+item.id+"-box").slideToggle();
	}
	
	return false;
}

function validateComment(componentId) {
	var valid=true;
    var name = jQuery("#name" + componentId).val();
	var institution = jQuery("#institution" + componentId).val();
	var email = jQuery("#email" + componentId).val();
	var updates = jQuery("#updates" + componentId).val();
	var comment = jQuery("#Comment" + componentId).val();
	if (!name) {
		jQuery("#namelabel" + componentId).text("Name is required.");
		jQuery("#name" + componentId).attr("class", "error");
		valid= false;
	} else {
		jQuery("#namelabel" + componentId).text("");
		jQuery("#name" + componentId).removeClass("error");
	}
	if (!comment) {
		jQuery("#commentlabel" + componentId).text("Comment is required.");
		jQuery("#Comment" + componentId).attr("class", "error");
		valid= false;
	} else {
		jQuery("#commentlabel" + componentId).text("");
		jQuery("#Comment" + componentId).removeClass("error");
	}
	if (!email || !checkEmail(email)) {
		jQuery("#emaillabel" + componentId).text("Email is invalid.");
		jQuery("#email" + componentId).attr("class", "error");
		valid= false;
	} else {
		jQuery("#emaillabel" + componentId).text("");
		jQuery("#email" + componentId).removeClass("error");
	}
 return valid;
}

function postCommentEvent(item,form) {
	var componentId = parseInt(item.id.split('cb')[1]);
	var name = jQuery("#name" + componentId).val();
	var institution = jQuery("#institution" + componentId).val();
	var email = jQuery("#email" + componentId).val();
	var updates = jQuery("#updates" + componentId).val();
	var comment = jQuery("#Comment" + componentId).val();	

	var jid = jQuery("#jid").val();
			//alert('name='+name);			
	jQuery("#postAlert" + componentId).html("Please wait... <img src='/images/ajax-loader.gif'/>");
	
	//if (jQuery("#newcomment" + componentId).valid()) {
	if (validateComment(componentId)) {
		jQuery.post('/comment?'+Math.random(),
			{type: 'saveComments', name:name, institution:institution, email:email, updates: updates, comment:comment, jid:jid, componentId:componentId},
			function(data) {
				if (data.indexOf('Error') < 0 && data != 'false') {
					if (data == 'moderated') {
						jQuery("#postAlert" + componentId).html("Posting of comments is moderated. Your comment has been submitted successfully and is waiting for approval. ");
					} else {
						loadComments(jid,componentId,form);
						jQuery("#postAlert" + componentId).html("");
					}
					
					jQuery("#Comment" + componentId).val("");
				} else {
					jQuery("#postAlert" + componentId).html("Error in posting comment. Please try again later.");
				}
			}
		);
	} else {
		jQuery("#postAlert" + componentId).html("");
	}
	
	return false;
}

function previewEvent(item){
	jQuery(item).toggleClass("active");	
	jQuery('#'+item.id+'box').slideToggle();
	
	var ctr = parseInt(item.id.split('hp')[1]);
	var componentId = parseInt(item.id.split('hp')[1]);
	var hasAccess = jQuery('#access'+componentId).val();
	var link = jQuery('#link'+componentId).val();
	var cached = jQuery('#cached'+componentId).html();
	
	if(jQuery(item).hasClass("active") && cached == 'false') {
		PreviewTabsContent.getAbstractText(componentId, function(data) {
			if (data == '') {
				jQuery("#preview" + componentId + "-1").html("<div class='preview-div'>No abstract available.</div>");
		    } else if (data == '**<NOCONTENT>**') {
		    	jQuery("#preview" + componentId + "-1").html("<div class='preview-div'>The system was unable to generate a preview for this abstract. Kindly visit the link below to check its contents.</div>");
		    } else {	    	
		    	jQuery("#preview" + componentId + "-1").html("<div class='preview-div'>" + data + "</div>");			      
		    }
		});
		
		if (hasAccess == 'true') {
			  PreviewTabsContent.getReferences(componentId, function(data) {
			  	if (data != '' && data != '**<NOCONTENT>**') {
				    jQuery("#tab" + componentId + "-4").fadeIn();
				    jQuery("#preview" + componentId + "-4").html("<div class='preview-div'>" + data + "</div>");    	     	
		    	}
			  }); 
			  
			 PreviewTabsContent.getStructure(componentId, link, function(data) {
			  	if (data != '' && data != '**<NOCONTENT>**') {
			  		jQuery("#tab" + componentId + "-2").fadeIn();
			  		jQuery("#preview" + componentId + "-2").html("<div class='preview-div'>" + data + "</div>");
			    }
			  });
		  
		     PreviewTabsContent.getFiguresAndTablesText(componentId, link, function(data) {
				if (data != '' && data != '**<NOCONTENT>**') {					
				    jQuery("#tab" + componentId + "-3").fadeIn();
				    jQuery("#preview" + componentId + "-3").html("<div class='preview-div'>" + data + "</div>");    	
		    	}
			  });
			 
	   	}
		
		 jQuery('#cached' + componentId).html('true');
	}
	return false; 	
}