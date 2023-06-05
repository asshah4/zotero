
        function RightslinkPopUp ( atitle,pubId,pub_online_date,author,doi ,spage,epage,evolumeNum,eissueNum)        {    
  
     //var url = "http://test100.copyright.com/AppDispatchServlet"; 
     var url = "https://s100.copyright.com/AppDispatchServlet";
     var location = url 
			+ "?publisherName=" + encodeURI ('CUP')
			+ "&publication=" + encodeURI (pubId)
			+ "&title=" + encodeURI (atitle) 
			+ "&publicationDate=" + encodeURI (pub_online_date) 
			+ "&author=" + encodeURI (author)
			+ "&copyright=" + encodeURI ('Cambridge Journals')
			+ "&contentID=" + encodeURI (doi)
			+ "&startPage=" + encodeURI(spage)
			+ "&endPage=" + encodeURI(epage)
  	 	    + "&orderBeanReset=" + encodeURI('True')
  	 	    + "&volumeNum=" + encodeURI(evolumeNum)
			+ "&issueNum=" + encodeURI(eissueNum)
  	 	    ;
  	 	//  alert(location);
         var h= window.open( location,'Rightslink','location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550');
          
        }

  