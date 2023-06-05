
/**
* These Javascript functions drives many of the main abstract functions.
*
* Page assembled by C. West 10/24/07
*
*/
 
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style)
    {
		obj=obj.style;v=(v=='show')?'visible':(v=='hide')?'hidden':v;
	}
    obj.visibility=v;
    obj.display='inline';
    }
}


function MM_showHideLayers2() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers2.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style)
    {
		obj=obj.style;v=(v=='show')?'inline':(v=='hide')?'none':v;
	}
    //obj.visibility=v;
    obj.display=v;
    }
}


/*
function MM_changeProp(objId,x,theProp,theValue) {
  var obj = null; with (document){ if (getElementById)
  obj = getElementById(objId); }
  if (obj){
    if (theValue == true || theValue == false)
      eval("obj.style."+theProp+"="+theValue);
    else eval("obj.style."+theProp+"='"+theValue+"'");
  }
}

if (navigator.appName == "Microsoft Internet Explorer")
{ } else {
MM_changeProp('absleft','','margin-right','420','DIV')
}
*/



function simple_actionSubmitA()
{
	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
	  {
		  document.myforma.target='_blank'
	  }
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
	  {
	  	document.myforma.target='_blank'
	  }
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
	  {
		  document.myformb.target='_blank'
	  }
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
			var directurl = "/journals/help_system/getabs/actions/viewCOinS.jsp?cvips=" + cvips;
			myArt=window.open(directurl,'COinS','height=600,width=700,scrollbars=yes,resizable=yes,top=30,left=150');
			myArt.focus();
			return false;
	  }
	  
	  var bname = navigator.appVersion;
	  if (bname.indexOf("Safari")<0)
	  {
		  document.myformc.target='_blank'
	  }
	  document.myformc.submit();
	  return false;
}



function howManyChecked(whichForm,whichCheckBoxArray,myMax,myMin)
{
	document.myform.action = '/getabs/servlet/GetCitation';
	var _countChecked = 0;
	var err = 0;
	var selections = new Array;
	selections = document.myform.SelectCheck; //document[whichForm][whichCheckBoxArray];
	//alert("selections: " + selections + " | size: " + selections.length);
	
	/* iterate through all the elements in the checkbox array */
	for(i=0;i<document[whichForm][whichCheckBoxArray].length;i++)
	{
		/* and check to see if each is checked */
		if(document[whichForm][whichCheckBoxArray][i].checked==true)
			/* if it is, increment a counter */
			{ _countChecked++; }
	}

	/* in case there is only 1 checkbox */
	var docLength = eval("document."+[whichForm]+"."+[whichCheckBoxArray]+".length");
	if (typeof docLength == 'undefined') {
		if (eval("document."+[whichForm]+"."+[whichCheckBoxArray]+".checked")) {
			_countChecked = 1;
			//alert(_countChecked)
		}
	}
	
	
	
	
	
	/* is the count too high? */
	if(_countChecked > myMax)
		{ alert('You have selected '+ _countChecked + ' articles.  Please select no more than '+myMax+ ' articles at a time.');
			err = 1;}
	/* of is the count too low */
	else if(_countChecked < myMin)
		{ alert('You must select at least '+myMin+' article.');
			err = 1;}
	if (err == 1) { return false; }


	
	if( (document.myform.fn.value == "" ) || (document.myform.fn.value == "multi" ) ){
	alert ("Please select an Article Option");
	return false;
	} 
	
	
	
	if(document.myform.fn.options[3].selected == true ) {

	document.myform.action = '/myscitation/addToMyArticles-submit.do';
	
	document.myform.target = "Scitation";
	myArt=window.open('','Scitation','height=600,width=660,scrollbars=yes,resizable=yes,top=50,left=50,toolbar=yes,location=yes,menubar=yes');
	myArt.focus(); 
	document.myform.submit();
	
	return false;
	}
	
	
	var bname = navigator.appVersion;
	if (bname.indexOf("Safari")<0)
	{
		document.myform.target='_blank'
	}
	document.myform.submit();
	return false;
	

}

function PrintPage(){

if (window.print) {  window.focus(); window.print(); }
else {  alert('This script does not work in your browser');  }
//history.back();
//return false;
}


function opacity(id, opacStart, opacEnd, millisec) {
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if(opacStart > opacEnd) {
        for(i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
        
        
    } else if(opacStart < opacEnd) {
        for(i = opacStart; i <= opacEnd; i++)
            {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    }
}

//change the opacity for different browsers
function changeOpac(opacity, id) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
} 




function load_focus_window(pagetoLoad)
{
	rewritePageElement('/journals/help_system/getabs/actions/loading.jsp', '', 'popup_viewingpane', '');
	
	rewritePageElement(pagetoLoad, '', 'popup_viewingpane', '');
	
	MM_showHideLayers('popup_backdrop','','show');
	opacity('popup_backdrop', 0,50, 200);
	
	MM_showHideLayers('popup_viewingpane','','show');
	opacity('popup_viewingpane', 0,100, 200);
	
	
}

function close_focus_window()
{
	opacity('popup_backdrop', 50,0, 100);
	setTimeout('MM_showHideLayers(\'popup_backdrop\',\'\',\'hide\')',300);
	
	opacity('popup_viewingpane', 100,0, 200);
	setTimeout('MM_showHideLayers(\'popup_viewingpane\',\'\',\'hide\')',200);
	
	rewritePageElement('/journals/help_system/getabs/actions/loading.jsp', '', 'popup_viewingpane', '');
}

function clickAbstract(citid) {

	if (document.getElementById("abs_sci")) { document.getElementById("abs_sci").style.backgroundColor = "#f8f8f8"; }
	if (document.getElementById("abs_cross")) { document.getElementById("abs_cross").style.backgroundColor = "#f8f8f8"; }
	if (document.getElementById("abs_all")) { document.getElementById("abs_all").style.backgroundColor = "#f8f8f8"; }
	if (document.getElementById("citid")) { document.getElementById(citid).style.backgroundColor = "#e9e9e9"; }
}


function clickTab(citid) {

	if (document.getElementById("abs_tab"))
	{
		document.getElementById("abs_tab").className = "nav_unselected";
	}
	if (document.getElementById("refs_tab"))
	{
		document.getElementById("refs_tab").className = "nav_unselected";
	}
	if (document.getElementById("cit_tab"))
	{
		document.getElementById("cit_tab").className = "nav_unselected";
	}
	if (document.getElementById("supp_tab"))
	{
		document.getElementById("supp_tab").className = "nav_unselected";
	}
	
	document.getElementById(citid).className = "nav_selected";

}

function setActiveStyleSheet(title) {
   var i, a, main;
   for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
     if(a.getAttribute("rel").indexOf("style") != -1
        && a.getAttribute("title")) {
       a.disabled = true;
       if(a.getAttribute("title") == title) a.disabled = false;
     }
   }
}


function convertToMobileCSS()
{
	document.getElementById("absbottom_stand").style.display="inline";
	document.getElementById("absbottom_refs").style.display="inline";
	document.getElementById("absbottom_citings").style.display="inline";
	MM_showHideLayers2('absbottom_refs','','show');
	MM_showHideLayers2('absbottom_stand','','show');
	MM_showHideLayers2('absbottom_citings','','show');
	setActiveStyleSheet('abs_mobile');
}

function convertBackToStandardCSS()
{
	document.getElementById("absbottom_stand").style.display="inline";
	document.getElementById("absbottom_refs").style.display="none";
	document.getElementById("absbottom_citings").style.display="none";
	/*
	MM_showHideLayers('absbottom_refs','','show');
	MM_showHideLayers('absbottom_stand','','hide');
	MM_showHideLayers('absbottom_citings','','hide');
	*/
	setActiveStyleSheet('default');
	clickTab('abs_tab')
}

function keyclosewindow(e) 
{
	if (e.keyCode==27) 
	{
		close_focus_window();
	}
}

function initializeObjects()
{
	/*
	document.getElementById("absbottom_refs").style.display="inline";
	document.getElementById("absbottom_citings").style.display="inline";
	document.getElementById("absbottom_stand").style.display="inline";
	*/
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


function open_printversion(url)
{
	window.open(url,'_blank','width=800,height=900,status=1,scrollbars=1,resizable=1');
}


function isblank(s)
{
	for(var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if ((c != ' ') && (c != '\n') && (c != '\t')) {
			return false;
		}
	}
	return true;
}



function errata_formcheck()
{
	var e = document.erratasignup.email.value;
	var e2 = document.erratasignup.email2.value;
	var cvips = document.erratasignup.cvips.value;

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

	rewritePageElement('/journals/help_system/getabs/actions/submit_emailalerts.jsp', '?cvips='+cvips+'&email='+e, 'popup_viewingpane', '');
	return false;
}


function colleague_formcheck()
{
	var ce = document.colleagueemail.colleagueemail.value;
	var cn = document.colleagueemail.colleaguename.value;
	var se = document.colleagueemail.senderemail.value;
	var sn = document.colleagueemail.sendername.value;
	var mes = document.colleagueemail.sendermessage.value;
	var soc = document.colleagueemail.society.value;
	var cvips = document.colleagueemail.cvips.value;
	var title = document.colleagueemail.title.value;

	if ((ce == null) || (ce == "") || isblank(ce)) {
		alert("Please enter your colleague's email.");
		return false;
	}
	if ((ce.indexOf(".") < 0) || (ce.indexOf("@") < 0)) {
		alert("Please enter a valid colleague email address.");
		return false;
	}

	if ((cn == null) || (cn == "") || isblank(cn)) {
		alert("Please enter your colleague's name.");
		return false;
	}

	if ((sn == null) || (sn == "") || isblank(sn)) {
		alert("Please enter your name, so that your colleague knows who sent this email.");
		return false;
	}

	if ((se == null) || (se == "") || isblank(se)) {
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



	rewritePageElement('/journals/help_system/getabs/actions/submit_emailcolleague.jsp', '?cvips='+cvips+'&title='+title+'&colleagueemail='+ce+'&colleaguename='+cn+'&senderemail='+se+'&sendername='+sn+'&sendermessage='+mes+'&society='+soc, 'popup_viewingpane', '');
	return false;
}



function howManyCheckedB(whichForm,whichCheckBoxArray,myMax,myMin)
{
	document.myform.action = '/getabs/servlet/GetCitation';
	var _countChecked = 0;
	var err = 0;

	alert("SIZE (document."+whichForm+"."+whichCheckBoxArray+"): " + document[whichForm][whichCheckBoxArray].length);
	alert("SIZE2: " + document.myform.SelectCheck.length);

	/* iterate through all the elements in the checkbox array */
	for(i=0;i<document[whichForm][whichCheckBoxArray].length;i++)
	{
		/* and check to see if each is checked */
		if(document[whichForm][whichCheckBoxArray][i].checked==true)
			/* if it is, increment a counter */
			{ _countChecked++; }
	}

	/* in case there is only 1 checkbox */
	var docLength = eval("document."+[whichForm]+"."+[whichCheckBoxArray]+".length");
	if (typeof docLength == 'undefined') {
		if (eval("document."+[whichForm]+"."+[whichCheckBoxArray]+".checked")) {
			_countChecked = 1;
			//alert(_countChecked)
		}
	}



	/* is the count too high? */
	if(_countChecked > myMax)
		{ alert('You have selected '+ _countChecked + ' articles.  Please select no more than '+myMax+ ' articles at a time.');
			err = 1;}
	/* of is the count too low */
	else if(_countChecked < myMin)
		{ alert('You must select at least '+myMin+' article.');
			err = 1;}
	if (err == 1) { return false; }



	if( (document.myform.fn.value == "" ) || (document.myform.fn.value == "multi" ) ){
	alert ("Please select an Article Option");
	return false;
	}



	if(document.myform.fn.options[3].selected == true ) {

	document.myform.action = '/myscitation/addToMyArticles-submit.do';

	document.myform.target = "Scitation";
	myArt=window.open('','Scitation','height=600,width=660,scrollbars=yes,resizable=yes,top=50,left=50,toolbar=yes,location=yes,menubar=yes');
	myArt.focus();
	document.myform.submit();

	return false;
	}


	var bname = navigator.appVersion;
	if (bname.indexOf("Safari")<0)
	{
		document.myform.target='_blank'
	}
	document.myform.submit();
	return false;


}
