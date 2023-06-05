function handle_async_records_chunk(id) {
	var obj,t_obj;
	var content='';
	if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)) {
		if(id==1){
	        chunks[0]=records_chunk.innerHTML;		      
		}

        chunks[id]=eval("tmp_records_chunk_"+id+".innerHTML");
        eval("tmp_records_chunk_"+id+".innerHTML=''");
		
	    for(i=0;i<=id;i++){
            content+=chunks[i];
        }

        content="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
	records_chunks.innerHTML=content;

		//WoS 7.4 bug #98(Q2-2005 #24)(for IE on Windows only)
		//IE changes the order of multipe-hidden-values 'all_summary_IDs'
		//if this is the last chunk,lets restore the order

		if((id == chunks.length-1) 
			&& (navigator.platform=='Win32')
			&& (navigator.appVersion.indexOf("MSIE 6.0")>(-1))
		){
			var form=document.forms['summary_records_form'];
			var all_IDs=form.all_summary_IDs;
			var last_ids=all_IDs[id].value;

			for(i=id;i>=1;i--){
				all_IDs[i].value=all_IDs[i-1].value;
			}
			all_IDs[0].value=last_ids;
		}


	}else if(navigator.appVersion.indexOf("Safari")>(-1)) {
		if(id==1){
			var chunk_data=document.getElementById("chunk_data").innerHTML;
			chunks[0]=chunk_data;
		}
    
        chunks[id]=document.getElementById("chunk_data_"+id).innerHTML;
        document.getElementById("chunk_data_"+id).style.visibility="hidden";
		document.getElementById("chunk_data_"+id).style.height=0;
        document.getElementById("chunk_data_"+id).height=1;
		document.getElementById("tmp_records_chunk_"+id).innerHTML='';

		var t_table=document.getElementById("chunk_data_"+id);
		var t_span=document.getElementById("tmp_records_chunk_"+id);
		t_table.innerHTML='';
		t_span.innerHTML='';

        for(i=0;i<=id;i++){
            content+=chunks[i];
        }

        content="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
        document.getElementById("records_chunks").innerHTML=content;
        
	}else if(navigator.appName.indexOf("Opera")>(-1)) {
		if(id==1){
	        chunks[0]=records_chunk.innerHTML;		      
		}

        chunks[id]=eval("chunk_data_"+id+".innerHTML");
        eval("chunk_data_"+id+".innerHTML=''");
		
	    for(i=0;i<=id;i++){
            content+=chunks[i];
        }

        content="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+content+"</table>";
	    records_chunks.innerHTML=content;	

	    //alert("shang:this is a Opera");
	    //opera.postError("chunks[id]:157"+chunk_s[i]);


	}else {
		var chunk_data=document.getElementById("chunk_data").innerHTML;
		var chunk_data_id=document.getElementById("chunk_data_"+id).innerHTML;
		var chunk_data=chunk_data+chunk_data_id;

		document.getElementById("chunk_data").innerHTML=chunk_data;
		document.getElementById("chunk_data_"+id).innerHTML='';

         document.getElementById("records_chunks").style.display="block";
    }
}

function handle_async_chem_records(width,height,mode) {

	 //var obj = document.getElementsByName("chemobject");
     //var len = obj.length;
     
     //alert(len);
	    
     for(i=1;i<=10;i++)
     {
         var str = mode + "_chem_rec_id" + i;
         var obj = document.getElementById(str);
         
         var nodes = mode + "_node_chem_rec_id" + i;
         var nodesobj = document.getElementById(nodes);
         
         var bonds = mode + "_bond_chem_rec_id" + i;
         var bondsobj = document.getElementById(bonds);
         
         if(obj != null)
         {
         	 
             var inner = obj.innerHTML;
             var bondsval = "", nodesval = "";
             if(bondsobj != null)
             {
                bondsval = bondsobj.innerHTML;
             }
             if(nodesobj != null)
	         {             
               nodesval = nodesobj.innerHTML;
             }
	         obj.innerHTML = '<object CLASSID="CLSID:DBB2DE32-61F1-4F7F-BEB8-A37F5BC24EE2" width="' + width + '" height="' + height + '">' 
     			+ '<PARAM name="type" value="application/x-HDS-Windows-Plugin" />'
			    + '<PARAM name="border"	value="0" />'
	            + '<PARAM name="zoom"	value="yes" />'
                + '<PARAM name="get_from"	value="0" />'
                + '<PARAM name="get_target"	value="" />'
                + '<PARAM name="get_to"	value="" />'
                + '<PARAM name="edit" value="no" />'
                + '<PARAM name="prog"	value="" />'
                + '<PARAM name="src" value = "' + inner + '"/>'
                + '<PARAM name="width" value= "' + width + '" />'
                + '<PARAM name="height" value="' + height + '" />'
                + '<PARAM name="nodes" value="' + nodesval + '" />'
                + '<PARAM name="bonds" value="' + bondsval + '" />'
                + '</object>'; 
         }
     }
}

function handle_async_chem_layout(width,height) {

     var str="layout";
     var str1="layout-tag";
     var obj = document.getElementById(str);
     var obj1 = document.getElementById(str1);
   
     if((obj != null ) && (obj1 != null))
     {
     	 var inner = obj1.innerHTML;
     	 
     	 obj.innerHTML = '<object CLASSID="CLSID:DBB2DE32-61F1-4F7F-BEB8-A37F5BC24EE2" width="' + width + '" height="' + height + '">' 
     		    + '<PARAM name="border"	value="1" />'
	            + '<PARAM name="zoom"	value="yes" />'
                + '<PARAM name="prog"	value="ccrweb" />'
                + '<PARAM name="src" value = "' + inner + '"/>'
                + '</object>'; 

	     obj.style.visibility = 'visible';             
	 }
   
}


function handle_ml_data( data ) {
	// in case we find that we need this
	var needToClearTmpIndicator = false;
	
	var tmpMlCountPlaceholder=document.getElementById("tmp_ml_count_placeholder");
	if(tmpMlCountPlaceholder){
		tmpMlCountPlaceholder.innerHTML=data;
		var spanML = document.getElementById("mlUpdate");
		spanML.setAttribute("class", "contnavtextb");
	}
	var tmpBiggie=document.getElementById("tmp_biggie");
	if(tmpBiggie != null){
		document.getElementById("mlUpdate").setAttribute("class", "contnavtextb");
		document.getElementById("mlUpdate").setAttribute("className", "contnavtextb");
	}
	handle_async_data('tmp_ml_count', 'ml_count');
	var docList = document.getElementById("tmp_ml_indicator_list");
	if ( docList ) {
		var docArray = docList.innerHTML.split(";");
		var limit = docArray.length;
		if ( needToClearTmpIndicator )
			--limit;
		for ( var i = 0; i < limit; ++i ) {
			var name = "ml_indicator_"+docArray[i]; 
			copy_async_data('tmp_update_ml_indicator', name);
			copy_async_data('tmp_update_ml_indicator','ml_indicator_bottom');
		}
		if ( needToClearTmpIndicator ) {
			var name = "ml_indicator_"+docArray[i];
			handle_async_data('tmp_update_ml_indicator', name);
		}
		var addButton = document.getElementById("add_to_marked_button");
		var addButtonBottom = document.getElementById("add_to_marked_button_bottom");
		if ( addButton ) {
			addButton.innerHTML = '';
		}
		if ( addButtonBottom ) {
			addButtonBottom.innerHTML = '';
		}
	}
}

function handle_async_data(source, target){
	//eval(target+".innerHTML="+source+".innerHTML");
	//eval(source+".innerHTML=''");
	var sourceObj=document.getElementById(source);
	var targetObj=document.getElementById(target);
	if((sourceObj !=null) && (targetObj !=null)){
		targetObj.innerHTML=sourceObj.innerHTML;
		sourceObj.innerHTML='';
	}
}


function copy_async_data(source, target){
	//eval(target+".innerHTML="+source+".innerHTML");
	//eval(source+".innerHTML=''");
	
	var sourceObj=document.getElementById(source);
	var targetObj=document.getElementById(target);
	if((sourceObj !=null) && (targetObj !=null)){
		targetObj.innerHTML=sourceObj.innerHTML;
	}
}

function hide_show_analysis(field, imgSrc) {
	var img = document.getElementById(field + "_img");
	var tr = document.getElementById(field + "_tr");
	
	if (img != null && tr != null) {
		if (tr.style.display == 'none') {
			img.src = imgSrc;
			tr.style.display = '';
			ra_expand(field);
		}
		else {
			var f = document.refine_form;
			var hasInput = false;

			for (var i=0; i<f.elements.length; i++) {
				var e = f.elements[i];
				if (e.tagName == "INPUT" && e.type == "checkbox" &&
					e.name == "refineSelection" && e.checked)
				{
					var value = e.value;
					if (field == value.substring(0,field.length)) {
						hasInput = true;
						break;
					}
				}
			}
	
			if (hasInput) {
				var message = document.getElementById('openCheckboxes').value;
				if (confirm(message)) {
					for (var i=0; i<f.elements.length; i++) {
						var e = f.elements[i];
						if (e.tagName == "INPUT" && e.type == "checkbox" &&
							e.name == "refineSelection" && e.checked) {
							var value = e.value;
							if (field == value.substring(0,field.length)) {
								e.checked = false;
							}
						}
					}

					img.src = imgSrc;
					tr.style.display = 'none';
					ra_collapse(field);
				}
			} else {
				img.src = imgSrc;
				tr.style.display = 'none';
				ra_collapse(field);
			}
		}
	}
	
	return false;
}

function daisy_mc_clearall( actionName) {
	var message = "Action is " + actionName ;
    //alert(message);
	var clearAllBaseUrl = document.summary_records_form.baseUrl.value
	var qid = document.summary_records_form.qid.value;
    var sid = document.summary_records_form.SID.value;
    var clearAllUrl = clearAllBaseUrl + actionName + "&qid="  + qid + "&SID=" + sid;
	//alert(clearAllUrl);

	daisy_action_clearall(clearAllUrl);
	document.summary_records_form.selectedClusterCount.value = 0;
	
	//Clear all the checkboxes on the current page.
	for (i=0;i<document.summary_records_form.elements.length;i++)
	{
	  if (document.summary_records_form.elements[i].name == 'clusterSelection')
      {
	    document.summary_records_form.elements[i].checked = false;
      }
    }
	return false
}


function invoke_checkboxes_update_action( form, id, checked, baseurl_element_or_value ) {

	do_all_named_checkboxes( form, id, checked );
	invoke_update_action( form, baseurl_element_or_value );

	return false;
}

function invoke_update_action( form, baseurl_element_or_value ) {

  var url;
  var url_src = form.elements[baseurl_element_or_value];

  if ( url_src && url_src != undefined ) {
    // alert( "using element w/name " + baseurl_element_or_value );
  } else {
    url_src = document.getElementById(baseurl_element_or_value);
  //  if ( url_src && url_src != undefined )
	// alert( "using element w/id " + baseurl_element_or_value );
  }
  
  if ( url_src && url_src != undefined ) {
      url = url_src.value;
  } else {
    url = baseurl_element_or_value;
  }
  
  // alert("base url: "+url);
  url += "&" + get_url_components( form );

  // alert("complete url: " + url);
  simple_update_action( url );

  return false;
}

function handle_async_cr_data (results)
{
      if (!results) { return; };
      
      for (var i=0; i < results.length; i++) {
        if (! results[i]) { continue; };

        var name =  results[i].name;
        var value =  results[i].value;
        if (!name) { continue; };

        var target = document.getElementById(name);
        if (!target) { continue; };

        // catch the exception. we can't take any corrective action
        // if there is exception in setting one of the the values. But
        // by catching the exception, we make sure the rest of the values
        // are set properly, failing gracefully.
        try {
          if (name.match(/GRAPH/i) != null) {
              target.onload = null;
              target.src = value;
          } else if (name.match(/VISIBILITY/i) != null) {
              target.style.visibility = value;
          } else if (name.match(/DISPLAY/i) != null) {
              target.style.display = value;             
          } else if (name.match(/URL/i) != null) {
              target.href = value;
          } else if (name == "H_INDEX") {
              target.innerHTML = value;
          } else {
              target.innerHTML = value;
          }
        }
        catch (e) {
         ;
        }
      }
}

function highlight_hrow () {
   if ( (document.getElementById("H_INDEX")) == null) { return; }

   var sort_field = document.getElementById("CRSORT_OPTION")
   
   if (sort_field == null) {return ;}
   
   var sort_selection = sort_field.selectedIndex;

   if (sort_selection != 1) { return; }

   var hindex = parseInt (document.getElementById("H_INDEX").innerHTML);
   var row = document.getElementById("RECORD_" + hindex);

   if ( row == null )  { return ; }

   for (j = 0; j < row.cells.length; j++) {
    row.cells[j].style.borderBottom="2px #339966 solid";
   }
}

function handle_nav_final_counts(final_hit_count, final_page_count) {

	//declare spans to be changed
	var recs_count_top = document.getElementById('hitCount.top');
	var page_count_top = document.getElementById('pageCount.top');
	var recs_count_bottom = document.getElementById('hitCount.bottom');
	var page_count_bottom = document.getElementById('pageCount.bottom');
	var footer_formatted_count = document.getElementById('footer_formatted_count');
	var sws_label_txt = document.getElementById('sws_label_txt');
	var swsHidden = document.getElementById('swsHidden');

	//recs_count_top.innerHTML = ""; //03_05_08
	if (recs_count_top) {
	recs_count_top.innerHTML = final_hit_count;	
	}
	
	//page_count_top.innerHTML = "";  //03_05_08
	if(page_count_top) {
	page_count_top.innerHTML = final_page_count;	
	}
	
	
	//recs_count_bottom.innerHTML = "";  //03_05_08
    if (recs_count_bottom) {
	recs_count_bottom.innerHTML = final_hit_count;	
    }
    
	//page_count_bottom.innerHTML = "";  //03_05_08
	if (page_count_bottom) {
	page_count_bottom.innerHTML = final_page_count;	
	}	 	

	//footer_formatted_count.innerHTML = ""; //03_05_08
    if (footer_formatted_count) {	
	footer_formatted_count.innerHTML = final_hit_count;
	}
	
	if ((typeof final_hit_count == 'string')
			&& final_hit_count.match("100,000")) {
		sws_label_txt.innerHTML = "";
		sws_label_txt.innerHTML = swsHidden.value;
	}

}//end function handle_nav_final_counts

function handle_diidw_nav_final_counts(final_hit_count, final_page_count) {
	
	var results_count= document.getElementById('nav_final-result_count');
	if(results_count!=null)
	{
		results_count.style.visibility = "hidden";		
		final_hit_count = results_count.innerHTML;
	}
	handle_nav_final_counts(final_hit_count, final_page_count);
	
	
}//end function handle_diidw_nav_final_counts

function async_update_ml() {

  // do we need to check for marked list indicators?  
  var mlForm = document.forms["ml_update_form"];
  if ( mlForm && update_markedlist_indicators( mlForm ) ) {
	// debug_alert( "about to post form" );
	formDataHandlerAction( "ml_update_form", handle_ml_data );
  } else {
	// debug_alert( "about to send request" );
	var element = document.getElementById('ml_count');
	if ( element ) {
	  var url = element.getAttribute('url');

	  if (url !=null)
		simpleDataHandlerAction( url, handle_ml_data );
	}
  }
}

function chem_fullrec_data_handler(data,mode)
{
    var resultsid = "fullrec_" + mode + "_results";
    
	var img = document.getElementById(resultsid);
	
	img.innerHTML = data;
	
	if(mode.match(/cpd/i) != null)
	{	
		handle_async_chem_records(375,175,"cpd");
	}
	else if(mode.match(/rxn/i) != null)
	{
		handle_async_chem_records(600,175,"rxn");
	}
}
	
