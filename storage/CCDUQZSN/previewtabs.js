
function update(id, componentId, link, hasAccess) {
  ctr = id.substring(14,id.length);  
  document.getElementById("tab" + (ctr * 4 + 1)).style.display="";
  PreviewTabsContent.getAbstractText(componentId, function(data) {
		if (data == '') {
			dwr.util.setValue("preview" + (ctr * 4 + 1), "<p>No abstract available.</p>");
	    } else if (data == '**<NOCONTENT>**') {
			dwr.util.setValue("preview" + (ctr * 4 + 1), "<p>The system was unable to generate a preview for this abstract. Kindly visit the link above to check its contents.</p>");
	    } else {	    	
	    	dwr.util.setValue("preview" + (ctr * 4 + 1), "<p>" + data + "</p>", { escapeHtml:false });			      
	    }
  });
  
  if (hasAccess) {
	  PreviewTabsContent.getReferences(componentId, function(data) {
	  	if (data != '' && data != '**<NOCONTENT>**') {
		    document.getElementById("tab" + (ctr * 4 + 4)).style.display="";
		    alert(data);
    		dwr.util.setValue("preview" + (ctr * 4 + 4), "<p>" + data + "</p>", { escapeHtml:false });    	     	
    	}
	  }); 
	  
	 PreviewTabsContent.getStructure(componentId, link, function(data) {
	  	if (data != '' && data != '**<NOCONTENT>**') {
	     	document.getElementById("tab" + (ctr * 4 + 2)).style.display="";
	    	dwr.util.setValue("preview" + (ctr * 4 + 2), "<p>" + data + "</p>", { escapeHtml:false });
	    }
	  });
  
     PreviewTabsContent.getFiguresAndTablesText(componentId, link, function(data) {
		if (data != '' && data != '**<NOCONTENT>**') {
		    document.getElementById("tab" + (ctr * 4 + 3)).style.display="";
    		dwr.util.setValue("preview" + (ctr * 4 + 3), "<p>" + data + "</p>", { escapeHtml:false });    	
    	}
	  });
	  
	  document.getElementById(id + 'Cached').value = 'true';
   }
	  
}

function togglePreview(id, componentId, hasAccess) { 
	var url = 'http://journals.cambridge.org.proxy.library.emory.edu/images/';
	var img = document.getElementById(id + 'Arrow');
	var displayed = document.getElementById(id).style.display.indexOf('none') > -1;

	link = document.getElementById(id + 'Link').value;
	cached = document.getElementById(id + 'Cached').value;

	if ( displayed ) { 
		if (cached == 'false') {
			update(id, componentId, link, hasAccess);	
		}
		
		img.src = url + 'icon_minus.jpg';
	} else { 	
		img.src = url + 'icon_plus.jpg';
	}		
	
	Effect.toggle(id,'SLIDE'); 
	
	return false;
}