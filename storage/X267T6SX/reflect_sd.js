/*
//    Reflect JavaScript Library
//    ===========================
//
//    Written by: Sven Haag | EMBL
//    Version: 1.2 from Nov. 24, 2009
//    Homepage: http://reflect.ws
//    Purpose: Reflect a webpage (without using a plugin)
//
//    This script basically provides 2 functions to Reflect a webpage:
//
//    1.) reflectByProxy
//        Reflect a webpage by using a CGI script that you have to provide on your webserver.
//        This function sends the webpage content (body.innerHTML) to the CGI, that returns the Reflected version.
//        Afterwards the webpage will be modified to show the result.
//        Warning: The CGI script have to be in the same domain or sub-domain as the webpage that should be Reflected,
//                 to successfully dispose the JavaScript HTTP requesst. (AJAX-Cross-Domain issue)
//        Example 1: Reflect.reflectByProxy();                              <== Use default parameters
//        Example 2: Reflect.reflectByProxy('/cgi/reflect_by_proxy.cgi');   <== Use different CGI path
//
//    2.) reflectByJS
//        Reflect a webpage by just calling this function.
//        Therefore the webpage has to be publicly accessible!
//        Example 1: Reflect.reflectByJS();                                 <== Default
//        Example 2: Reflect.reflectByJS('username', 'password');           <== Access a password protected webpage with credentials
//
*/

var Reflect = {
  /* Append all given Scripts (JS or CSS) to the document header */
  appendScriptsToHeader : function(headerData) {
	try {
	  var headNode = document.getElementsByTagName('head')[0];
  
	  //Check if a head node exists. If not append one.
	  if(!headNode) 
	  { 
		//html page without "head"
		head = document.createElement('head');
		document.appendChild(head);
		headNode = document.getElementsByTagName('head')[0];
	  }
	  
	  //Append all javascript and css files to the html header
	  var script = null;
	  var strRegex = "https?://[a-zA-Z0-9-_ \+\?\.\(\)\&/~]*(js|css)[\"|']";
	  var re = new RegExp(strRegex, "ig");
	  var reJS =new RegExp(".js[\"|']", "ig");
	  var reCSS = new RegExp(".css[\"|']", "ig");
	  var arrMatch = headerData.match(re);
	  for(var i=0; i<arrMatch.length; i++)
	  {
		script = document.createElement('script');
		script.setAttribute('src', arrMatch[i].substring(0, arrMatch[i].length-1));
		if (arrMatch[i].match(reJS) != null)
		{
		  script.setAttribute('type', 'text/javascript');
		  headNode.appendChild(script);
		}
		else if (arrMatch[i].match(reCSS) != null)
		{
		  script.setAttribute('type', 'text/css');
		  headNode.appendChild(script);
		}
	  }
	}
	catch (e) {
	  if (Reflect.verbose)
		alert('Reflect: Error while appendig scripts to the webpage header:' + '\nError name: ' + e.name + '.\nError message: ' + e.message + '.\nIf this error has occured in the past, please contact us by email: contact@reflect.ws');
	}
  }
};
