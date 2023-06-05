
/**
* These Javascript functions drives many of the main abstract functions.
*/

function simple_actionSubmitA()
{
	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
		  document.myforma.target='_blank'
	  document.myforma.submit();
	  return false;
}

function simple_actionDeterminatorA()
{
	  if(document.myforma.fn.value == ""){
			alert ("Please select an Article Option");
			return false;
	  } else if(document.myforma.fn.options[0].selected == true ) {
			document.myforma.target = "Scitation";
			myArt=window.open('','Scitation','height=600,width=660,scrollbars=yes,resizable=yes,top=30,left=150');
			myArt.focus();
			document.myforma.submit();
			return true;
	  }

	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
	  	document.myforma.target='_blank'

	  		document.myforma.submit();
	  return false;
}

function simple_actionDeterminatorB()
{

	  if(document.myformb.fn.value == ""){
			alert ("Please select an Article Option");
			return false;
	  }
	  
	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
		  document.myformb.target='_blank'
	  document.myformb.submit();
	  return false;
}


function simple_actionDeterminatorC()
{

	  if(document.myformc.fn.value == ""){
			alert ("Please select an Article Option");
			return false;
	  }
	  if(document.myformc.fn.value == "view_coins"){
			var cvips = document.myformc.SelectCheck.value;
			var directurl = "?view=COinS";
			myArt=window.open(directurl,'COinS','height=600,width=700,scrollbars=yes,resizable=yes,top=30,left=150');
			myArt.focus();
			return false;
	  }
	  
	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
		  document.myformc.target='_blank'

	  document.myformc.submit();
	  return false;
}

function addOpenSearch(name,ext,cat,pid,meth)
{
  if ((typeof window.external == "object") && ((typeof window.external.AddSearchProvider == "unknown") || (typeof window.external.AddSearchProvider == "function"))) {
    if ((typeof window.external.AddSearchProvider == "unknown") && meth == "p") {
      alert("This plugin uses POST which is not currently supported by Internet Explorer's implementation of OpenSearch.");
    } else {
      window.external.AddSearchProvider(
        "http://mycroft.mozdev.org/installos.php/" + pid + "/" + name + ".xml");
    }
  } else {
    alert("You will need a browser which supports OpenSearch to install this plugin.");
  }
}

/* **********************************************************************************
	Function that manages downloading or viewing a citation from
	selected articles. renders a DHTML popup based on selection passed though.
*********************************************************************************** */
function constructArticleDLbox(action, cvips) {
    var allDialogs = [];
    options = $.extend({title: action + " Citation"},{modal:true}, {});
    var domBody = "";
	var domain = "http://scitation.aip.org";
	var onsubmitlocation = "downloadarts_action()"; 
	if (action=="View") { onsubmitlocation = "viewarts_action()";  }
	var formname = "myformb"; 
	if (action=="View") { formname = "myformc";  }
	
	domBody = "<table style=\"margin-left:20px\" width=\"525\" align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"5\">" + 
	"<tr><td valign=\"top\" width=\"175\">" + 
		"<form name=\"myforma\" action=\""+domain+"/myscitation/addToMyArticles-submit.do\" method=\"get\" onsubmit=\"return simple_actionSubmitA()\">" + 
		"Add Citation to:<br/>"+
		"<input type=\"image\" src=\"/img/abstract/myscilogo.gif\" border=\"0\" alt=\"Submit to MyScitation\" />" +
		"<input type=\"hidden\" name=\"fn\" value=\"Add_myArticles\" />" +
		"<input type=\"hidden\" name=\"source\" value=\"scitation\" />" +
		"<input type=\"hidden\" name=\"PrefType\" value=\"ARTICLE\" />" +
		"<input type=\"hidden\" name=\"PrefAction\" value=\"Add Selected\" />" +
		"<input type=\"hidden\" name=\"SelectCheck\" value=\""+cvips+"\" />" +
		"</form>" +
	"</td>"; 
	
	domBody += "<td valign=top width=\"175\">" +
		"<form name=\"myformb\" action=\""+domain+"/getabs/servlet/GetCitation\" method=\"get\" onsubmit=\"return simple_actionDeterminatorB()\">"+
		"<INPUT type=\"HIDDEN\" name=\"source\" value=\"scitation\">" +
		"<INPUT type=\"HIDDEN\" name=\"downloadcitation\" value=\" Go \">" + 
		"<INPUT type=\"HIDDEN\" name=\"source\" value=\"scitation\">" + 
		"<INPUT type=\"hidden\" name=\"SelectCheck\" value=\"" + cvips +"\" />" + 
		"<select name=\"fn\" class=\"art-opt-select\">" + 
			"<option value=\"open_bibtex2\">BibTeX</option>" + 
			"<option value=\"open_endnote\">EndNote &reg; (generic)</option>" + 
			"<option value=\"open_isi\">EndNote &reg; (RIS)</option>" + 
			"<option value=\"open_medline\">Medline</option>" + 
			"<option value=\"open_aip\">Plain Text</option>" + 
			"<option value=\"open_refworks\">RefWorks</option>" + 
		"</select>" + 
		"<br/><input type=\"submit\" name=\"Submit\" value=\"Download\" /></form></td>";

	domBody += 	"<td valign=top width=\"175\">" +  
		"<form name=\"myformc\" action=\""+domain+"/getabs/servlet/GetCitation\" method=\"get\" onsubmit=\"return simple_actionDeterminatorC()\">"+
		"<INPUT type=\"HIDDEN\" name=\"source\" value=\"scitation\">" +
		"<INPUT type=\"HIDDEN\" name=\"downloadcitation\" value=\" Go \">" + 
		"<INPUT type=\"HIDDEN\" name=\"source\" value=\"scitation\">" + 
		"<INPUT type=\"hidden\" name=\"SelectCheck\" value=\"" + cvips +"\" />" + 
		"<select name=\"fn\" class=\"art-opt-select\">" + 
			"<option value=\"view_coins\">COinS</option>" + 
			"<option value=\"view_bibtex2\">BibTeX</option>" + 
			"<option value=\"view_endnote\">EndNote &reg; (generic)</option>" + 
			"<option value=\"view_isi\">EndNote &reg; (RIS)</option>" + 
			"<option value=\"view_medline\">Medline</option>" + 
			"<option value=\"view_aip\">Plain Text</option>" + 
			"<option value=\"view_refworks\">RefWorks</option>" + 
		"</select><br/>" + 
    	"<input type=\"submit\" name=\"Submit\" value=\"View\" /></form></td>" + 
		"</tr></table>";
	
	/* creates the boxy		*/
	var dialog = new Boxy(domBody, options);
	allDialogs.push(dialog);
	return false;
}

function downloadarts_action()
{
	// IE detection
	if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) { isIE = true; } else { isIE = false; }
	var bname = navigator.appVersion;
	if (bname.indexOf("Safari")<0)
	  document.myformb.target='_blank'
	document.myformb.submit();
	return false;
}


function colleague_formcheck2(thisform, key,type)
{
    var ce = thisform.colleagueemail.value;
    var cn = thisform.colleaguename.value;
    var se = thisform.senderemail.value;
    var sn = thisform.sendername.value;
    var mes =thisform.sendermessage.value;

    if ((ce == null) || (ce == "")) {
        alert("Please enter your colleague's email.");
        return false;
    }
    if ((ce.indexOf(".") < 0) || (ce.indexOf("@") < 0)) {
        alert("Please enter a valid colleague email address.");
        return false;
    }

    if ((cn == null) || (cn == "")) {
        alert("Please enter your colleague's name.");
        return false;
    }
    if ((sn == null) || (sn == "")) {
        alert("Please enter your name, so that your colleague knows who sent this email.");
        return false;
    }

    if ((se == null) || (se == "")) {
        alert("Please enter your (the sender) email.");
        return false;
    }
    if ((se.indexOf(".") < 0) || (se.indexOf("@") < 0)) {
        alert("Please enter a valid email address for yourself.");
        return false;
    }
    if (mes.length > 200) {
        alert("Message cannot be larger than 200 pixels. You have " + mes.length);
        return false;
    }

    var appendcvips = emailresolver + "?action=emailColleague&key=" + type +"::" + key;
    $(thisform).html("<div style=\"text-align:center;\"><p><img src=\"/img/ajax-loader-bar.gif\" alt=\"Loading\" /></p><p>Sending...</p></div>");
    $.post(appendcvips, { colleagueemail:ce, colleaguename:cn, sendername:sn, senderemail:se, sendermessage:mes }, 

           function(data){
                $(thisform).html("<div style=\"text-align:center;\">" + data + "</div>");
    } ); 

return false;
}

function emailthisAbstract(key,type) {
    var allDialogs = [];
	if (type=="ebook")
	    options = $.extend({title: "EMAIL PREVIEW"},{modal:true}, {});
	else
	    options = $.extend({title: "Email Articles"},{modal:true}, {});

    domBody = "<form name=\"emailform\" onSubmit=\"return colleague_formcheck2(this, '"+key+"','"+type+"');\">";

    domBody += "<input type=\"hidden\" name=\"key \" value=\"" + key +"\" />";
    domBody += "<input type=\"hidden\" name=\"type \" value=\"" + type +"\" />";
    domBody +=  "<table width=\"500\">" +
        "<tr><td width=\"40%\" align=right>Colleague's Email: </td><td width=\"60%\"><input name=\"colleagueemail\" type=\"text\" size=\"35\" /></td></tr>"+
        "<tr><td width=\"40%\" align=right>Colleague's Name: </td><td width=\"60%\"><input name=\"colleaguename\" type=\"text\" size=\"35\" /></td></tr>"+
        "<tr><td width=\"40%\" align=right>Your Name: </td><td width=\"60%\"><input name=\"sendername\" type=\"text\" size=\"35\" /></td></tr>"+
        "<tr><td width=\"40%\" align=right>Your Email: </td><td width=\"60%\"><input name=\"senderemail\" type=\"text\" size=\"35\" /></td></tr>"+
        "<tr><td width=\"40%\" align=right>Message:<br><i>Max: 200 characters</i>&nbsp;</td><td width=\"60%\"><textarea name=\"sendermessage\" cols=\"27\" rows=\"2\" maxlength=\"200\"></textarea></td></tr>"+
        "<tr><td></td><td><input type=\"submit\" name=\"Submit\" value=\"Send Abstract\" /></td></tr>"+
        "</table>"+
        "</form>";

    /* creates the boxy     */
    var dialog = new Boxy(domBody, options);
    allDialogs.push(dialog);
    return false;
}

function emailErrAlerts(cvips, pagetitle, alerttype) {
	var desctext = "Submit your email address to be informed if a correction is posted to this article.";
	var submissionpage = "/modules/URLproxy.jsp?url=http://scitation.aip.org/journals/help_system/getabs/actions/submit_emailalertsB.jsp";	
	if(alerttype && alerttype == "citings")
	{
		desctext = "Submit your email address to receive automatic email notifications whenever<br/>this article is cited by another.";
		submissionpage = "/citingalerts";
	}
	var allDialogs = [];
	if (pagetitle.length > 85)
		pagetitle = pagetitle.substring(0,85) + "...";
	
	options = $.extend({title: pagetitle},{modal:true}, {});
	domBody = "<form name=\"erratasignup\" onSubmit=\"return alert_formcheck(this, '"+cvips+"', '"+submissionpage+"');\">" + 
			"<input type=\"hidden\" name=\"cvips\" value=\""+cvips+"\" />" +
			"<h3 style=\"text-align:center\">"+desctext+"</h3>" +  
			"<table width=\"100%\"><tr>" + 
				"<td width=\"40%\" align=right>Email Address: </td><td width=\"60%\" align=\"left\"><input name=\"email\" type=\"text\" size=\"35\" /></td>" + 
			"</tr><tr>" + 
				"<td width=\"40%\" align=right>Confirm Email: </td><td width=\"60%\" align=\"left\"><input name=\"email2\" type=\"text\" size=\"35\" /></td>" + 
			"</tr><tr>" + 
				"<td></td><td align=\"left\"><input type=\"submit\" name=\"Submit\" value=\"Submit\" /></td>" + 
			"</tr></table></form>";
	var dialog = new Boxy(domBody, options);
	allDialogs.push(dialog);
	return false;
}

function alert_formcheck(thisform, cvips, submissionpage)
{
	var e = thisform.email.value;
	var cvips = thisform.cvips.value;
	var e2 = thisform.email2.value;

	if ((e == null) || (e == "") || isblank(e)) {
		alert("Please enter your email.");
		return false;
	}
	if ((e != e2)) {
		alert("Email Addresses do not match.");
		return false;
	}
	if ((e.indexOf(".") < 0) || (e.indexOf("@") < 0)) {
		alert("Please enter a valid email address.");
		return false;
	}
    //var appendcvips = ""; 
	//appendcvips = "/modules/URLproxy.jsp?url=http://scitation.aip.org/journals/help_system/getabs/actions/submit_emailalertsB.jsp";
	//appendcvips = "/modules/URLproxy.jsp";
	$(thisform).html("<div style=\"text-align:center;\"><p><img src=\"/img/ajax-loader-bar.gif\" alt=\"Loading\" /></p><p>Loading...</p></div>");
	$.post(submissionpage, { email:e, cvips:cvips }, 
		   function(data){
		   		$(thisform).html("<div style=\"text-align:center;\">" + data + "</div>");
	} ); 
	return false;
}

function citingalert_formcheck(thisform, cvips)
{
	var e = thisform.email.value;
	var cvips = thisform.cvips.value;
	var e2 = thisform.email2.value;

	if ((e == null) || (e == "") || isblank(e)) {
		alert("Please enter your email.");
		return false;
	}
	if ((e != e2)) {
		alert("Email Addresses do not match.");
		return false;
	}
	if ((e.indexOf(".") < 0) || (e.indexOf("@") < 0)) {
		alert("Please enter a valid email address.");
		return false;
	}
    var appendcvips = ""; 
	appendcvips = "/modules/URLproxy.jsp?url=http://scitation.aip.org/journals/help_system/getabs/actions/submit_emailalertsB.jsp";
	//appendcvips = "/modules/URLproxy.jsp";
	$(thisform).html("<div style=\"text-align:center;\"><p><img src=\"/img/ajax-loader-bar.gif\" alt=\"Loading\" /></p><p>Loading...</p></div>");
	$.post(appendcvips, { email:e, cvips:cvips }, 
		   function(data){
		   		$(thisform).html("<div style=\"text-align:center;\">" + data + "</div>");
	} ); 
	return false;
}

function popupLoginForm(redirecturl) 
{
	var allDialogs = [];
	options = $.extend({title: "Subscribers Log In Here"}, {});
	domBody = 	"<form name=\"theForm\" method=\"post\" action=\"/eRights/servlet/Login\">";
	domBody +=	"<input type=\"hidden\" name=\"badLoginURL\" value=\"/error/badusername.jsp\" />" + 
				"<input type=\"hidden\" name=\"redirectURL\" value=\""+redirecturl+"\" />";
 	domBody +=	"<p>If you are a registered subscriber, please sign in below:</p>" + 
				"<table width=\"500\">" + 
				"<tr><td width=\"40%\" align=right>Username: </td><td width=\"60%\" align=\"left\"><input class=\"SciFormInput\" type=\"text\" name=\"username\" size=\"25\" /></td></tr>" + 
                "<tr><td width=\"40%\" align=right>Password: </td><td width=\"60%\" align=\"left\"><input class=\"SciFormInput\" type=\"password\" name=\"password\" size=\"25\" /></td></tr>" + 
				"<tr><td width=\"40%\" align=right></td><td width=\"60%\" align=\"left\"><input border=\"0\" type=\"submit\" name=\"submit1\" value=\"Sign In\" class=\"FormButton_120\" /></td></tr>" + 
				"<tr><td></td><td width=\"60%\" align=\"left\"><a class=\"forgot\" href=\"http://scitation-beta.aip.org/accounts/forgotPassword.jsp\">Forgot your password?</p></td></tr>" + 
				"</table>" + 
				"</form>";
	/* creates the boxy		*/
	var dialog = new Boxy(domBody, options);
	allDialogs.push(dialog);
	return false;
}

// rightslink popup
function PopUpRL(location) {
	Rightslink = window.open(location, 'Rightslink', 'location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=560');
    Rightslink.focus(); 
}

function submitCommunity(formid)
{
    $("#" + formid).submit();
    return false;
}

/* **********************************************************************************
    Function created to add selected articles to MyArticles
*********************************************************************************** */
function addSingleArticletoMySci(cvips) {
    $(".boxy-wrapper").html("");
    var allDialogs = [];
    options = $.extend({title: "Add to MyScitation", modal:true});
    var domBody = "";
    
    //selection needs to be more specific   
     var appendform = "";
     appendform += "<input type=\"hidden\" name=\"SelectCheck\" value=\"" + cvips +"\" />";

    domBody += "<input type=\"submit\" value=\"mysci\"/>";
    $("#adddomtomysci").append(appendform);
    document.addToMySci.submit();

}

function subscribeCitingAction(thisform)
{
	var submitlocation = $(thisform).attr("action");
	var e = $("#cit_email").val();
	var e2 = $("#cit_confemail").val();
	var articleid = $("#articleID").val();
	var name = $("#cit_name").val();
	var actionval = $("#actionval").val();
	var articletitle = $("#articletitle").val();
	var unsub = $("#unsub").val();

	if ((e == null) || (e == "") || isblank(e)) {
		alert("Please enter your email.");
		return false;
	}
	if ((e != e2)) {
		alert("Email Addresses do not match.");
		return false;
	}
	if ((e.indexOf(".") < 0) || (e.indexOf("@") < 0)) {
		alert("Please enter a valid email address.");
		return false;
	}
	$.post(submitlocation, { email:e, name:name, articleID:articleid, action:actionval, title:articletitle, unsub:unsub },
			   function(data){
					//alert(data);
			   		$("#citingsalertcontent").html(data);
			   		return false; 
				}
	);
	return false;
}

/* objectified scripting for DeepDyve JSON Request */
function DeepDyveConfig() { return true; }
function DeepDyveDisplay(deepdyveconfig) {
	this.JSONcall = function()  {
		return "http://www.deepdyve.com/mlt2?fieldName=journal_doi&ds=" + this.source + "&docId=" + deepdyveconfig.artid + "&key=3scale-" + deepdyveconfig.key + "&format=jsonp&callback=?";
	};
	this.renderLinks = function(paintObj, showObj)  {
        var i;
        jQuery.getJSON(this.JSONcall(), function(data) {
            var construct = "";
        	if (data.status === 'ok') {
                for (i in data.results)
                	construct += "<li><a href=\"" + data.results[i].internal_external_url + "\">" + data.results[i].internal_title + "</a><br/>"+ data.results[i].citation +"</li>";
                if (data.viewAllLink)
                	construct += "<li><a href=\"" + data.viewAllLink + "\">View All</a></li>";
                $(paintObj).html("<ul>" + construct + "</ul>");
                $(showObj).show();
        	 } else {
        		 $(paintObj).html("<ul><li>No related content found at this time.</li></ul>");
        		 $(showObj).show();
        	 }	 
        });
	};
};
function toggleArtObj(id) {
    $('#artObjFig, #artObjMM, #artObjSF, #artObjTables').hide();
    $("#" + id).toggle();
}        
