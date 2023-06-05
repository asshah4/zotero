$(document).ready(function(){
var termsUrl = "http://www.oxfordjournals.org/our_journals/" + encodeURIComponent(gJournalVars.oupcode) + "/terms.html";
 var anchorElement;
 anchorElement = document.createElement('a');
 anchorElement.setAttribute('href', termsUrl);
 anchorElement.setAttribute('class', 'terms');

 $('.copyright-statement').each(function(){
 var selectedTagForCopyright = $(this);
 selectedTagForCopyright.wrapInner(anchorElement);
 });

 $('.license').each(function(){
 var selectedTagForLicense = $(this);
 selectedTagForLicense.wrap(anchorElement);
 });



   liElement = document.createElement('li');
   aElement = document.createElement('a');
   aElement.setAttribute('href', '#glossary-1');


   $('.glossary').each(function(){

        var selectedTagForText = $(this);
        var selectedTagForTextText = selectedTagForText.children("h2:first").text();
	var selectedTagForAbbr =  $('#cb-art-nav');         
	var olFirstChildTag = selectedTagForAbbr.children("ol:first");

        if (selectedTagForTextText.length) {
		aElement.appendChild(document.createTextNode(selectedTagForTextText))

	} else {
   		aElement.appendChild(document.createTextNode('Abbreviations'));
	}
              
	liElement.appendChild(aElement);
	olFirstChildTag.append(liElement);

 });

 var uniqueClass =  $('.slug-doi').text().replace(/\//g, "");
 $('#content-block').addClass(uniqueClass);

});


