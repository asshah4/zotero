    jQuery.fn.doc2docWidget.setOptions({
      source: {
        url: "http://doc2doc.bmj.com/server/open.js",
        callback: "displayDiscussions"
      },
      extraCSSRules: ".doc2docwidget{font-size:12px !important;} .d2dw-link img{float:none !important;margin:0 !important;}",
      maxItems: 10
    });


$(function() {



populateElement('#search', 'Search BMJ Group site');





/* Latest from BMJ.com widget displaying drug related headlines */

var widget1 = new widget(

{



	'widget'	:	"feeds-widget1",

	'url'	:	"feed://careers.bmj.com/careers/rss.html?searchId=20000896", 

	'track'	:	"w_jnnp_careers",

	'widget_title'	:	"BMJ Careers - Latest Neurology and Neurosurgery jobs",	

	'style'	:	"bmjjournals",	

	'num_itmes':	"5"

}

)

var jnnpwidget1 = new widget(
{

	'widget'	:	"journal-widget",
	'url'	:	"http://pn.bmj.com/rss/current.xml", 
	'track'	:	"w_pn_latest",
	'widget_title'	:	"Latest from Practical Neurology",	
	'style'	:	"bmjjournals",	
	'num_items':	"5"


}
)


var panel1 = new tabbedwidget(
{
	'widget'	:	"panel-1",
	'url'	:	"http://jnnp.bmj.com/rss/ahead.xml",
	'track'	:	"w_jnnp_ahead_tab",
	'widget_title'	:	"Online first",
	'style'	:	"bmjjournals",
	'num_items':	"20"
})

var panel2 = new tabbedwidget(
{
	'widget'	:	"panel-2",
	'url'	:	"http://jnnp.bmj.com/rss/current.xml",
	'track'	:	"w_jnnp_current_tab",
	'widget_title'	:	"Current issue",
	'style'	:	"bmjjournals",
	'num_items':	"20"
})

var panel3 = new tabbedwidget(
{
	'widget'	:	"panel-3",
	'url'	:	"http://jnnp.bmj.com/rss/mfr.xml",
	'track'	:	"w_jnnp_top10_tab",
	'widget_title'	:	"Top ten articles last month",
	'style'	:	"bmjjournals",
	'num_items':	"20"
})

var panel4 = new widget(
{
	'widget'	:	"panel-4",
	'url'	:	"http://podcasts.bmj.com/jnnp/feed/",
	'track'	:	"w_jnnp_top10_tab",
	'widget_title'	:	"JNNP Podcast",
	'style'	:	"bmjjournals",
	'num_items':	"20"
})

var panel5 = new tabbedwidget(
{
	'widget'	:	"panel-5",
	'url'	:	"http://casereports.bmj.com/rss/recent.xml",
	'track'	:	"w_casereports_current_tab",
	'widget_title'	:	"Current issue",
	'style'	:	"bmjjournals",
	'num_items':	"20"
})


$("#tabbed-widget").tabs();


})