$(document).ready(function() {

	updateFormInput("#header-qs-input-author-label", "#header-qs-input-author", '', '');
	updateFormInput("#header-qs-input-kw-label", "#header-qs-input-kw", '', '');
	updateFormInput("#header-qs-input-year-label", "#header-qs-input-year", '', '');
	updateFormInput("#header-qs-input-vol-label", "#header-qs-input-vol", '', '');
	updateFormInput("#header-qs-input-page-label", "#header-qs-input-page", '', '');	
    
    
    $('.cit.hw-pub-property-chevron div.cit-extra').each(
        function() {
            
            var link = '<img src="/local/img/chevron.gif" alt="Chevron" class="hw-pub-property-chevron"/>';
        
            $(this).find("ul.cit-views li.last-item").append(link);
        }
    );
    
    $('.cit.has-cme div.cit-extra').each(
        function() {
            
            var cme_link = $(this).find("ul.cit-views a[href ^='http://cme.neurology.org']").clone();
            
            cme_link.attr('class', 'hw-pub-toc-icon hw-pub-property-cme');
            cme_link.html('<img src="/local/img/cme.gif" alt="CME" class="hw-pub-toc-icon"/>');
        
            $(this).find("ul.cit-views li.last-item").append(cme_link);
        }
    );
    
    $('.cit.hw-pub-property-ppage div.cit-extra').each(
        function() {
            
            var link = '<a href="/cgi/search?tocsectionid=Patient*&amp;displaysectionid=Patient+Pages&amp;journalcode=neurology&amp;hits=20" class="hw-pub-toc-icon hw-pub-property-ppage"><img src="/local/img/patientpg.gif" alt="Patient Page"/></a>';
        
            $(this).find("ul.cit-views li.last-item").append(link);
        }
    );
    
    $('.cit.hw-pub-property-podcast div.cit-extra').each(
        function() {
            
            var link = '<a href="http://www.aan.com/rss/?event=feed&amp;channel=1" class="hw-pub-toc-icon hw-pub-property-podcast"><img src="/local/img/pod.gif" alt="Podcasts"/></a>';
        
            $(this).find("ul.cit-views li.last-item").append(link);
        }
    );
    
    $('.cit.hw-pub-property-triangle div.cit-extra').each(
        function() {
            
            var link = '<a href="http://www.neurology.org/site/misc/triangle.pdf" class="hw-pub-toc-icon hw-pub-property-triangle"><img src="/local/img/triangle.gif" alt="Triangle" class="hw-pub-property-triangle"/></a>';
        
            $(this).find("ul.cit-views li.last-item").append(link);
        }
    );
    
     
    
	});
	
function setupCollapsibles() {
	prepCollapsibles(".collapsible");
}