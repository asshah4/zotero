$.fn.alm=function(){this.almHost=$("meta[name=almHost]").attr("content");this.pubGetHost=$("meta[name=pubGetHost]").attr("content");if(this.almHost==null){jQuery.error("The related article metrics server is not defined.  Make sure the almHost is defined in the meta information of the html page.")}this.isNewArticle=function(c){var b=(new Date()).getTime()-172800000;if(b<c){return true}else{return false}};this.isArticle=function(b){if(b.indexOf("image")>-1){return false}return true};this.validateDOI=function(b){if(b==null){throw new Error("DOI is null.")}b=encodeURI(b);return b.replace(new RegExp("/","g"),"%2F").replace(new RegExp(":","g"),"%3A")};this.getIDs=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?history=0";this.getData(d,e,b)};this.getRelatedBlogs=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Nature,Researchblogging,Wikipedia";this.getData(d,e,b)};this.getCites=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=CrossRef,PubMed,Scopus,Wos";this.getData(d,e,b)};this.getChartData=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Counter,PMC";this.getData(d,e,b)};this.getBiodData=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Biod";this.getData(d,e,b)};this.getCitesScopusOnly=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Scopus";this.getData(d,e,b)};this.getCitesCrossRefOnly=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=CrossRef";this.getData(d,e,b)};this.getCitesTwitterOnly=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Twitter";this.getData(d,e,b)};this.getSocialData=function(c,e,b){c=this.validateDOI(c);var d="articles/"+c+".json?events=1&source=Citeulike,Connotea,Facebook,Twitter,Mendeley";this.getData(d,e,b)};this.getSummaryForArticles=function(e,d,b){idString="";for(a=0;a<e.length;a++){if(idString!=""){idString=idString+","}idString=idString+this.validateDOI("info:doi/"+e[a])}var c="group/articles.json?id="+idString+"&group=statistics";this.getData(c,d,b)};this.containsUsageStats=function(d){var b=false;for(var c=0;c<d.article.source.length;c++){var e=d.article.source[c];if(e.source=="Counter"&&e.events!=null&&e.events.length>0){b=true}}return b};this.sortByYearMonth=function(b,c){if(parseInt(b.year)<parseInt(c.year)){return -1}else{if(parseInt(b.year)==parseInt(c.year)){if(parseInt(b.month)==parseInt(c.month)){return 0}else{if(parseInt(b.month)<parseInt(c.month)){return -1}else{return 1}}}else{return 1}}};this.massageChartData=function(c,j){var o=new Date(j);var e=o.getFullYear();var b=o.getMonth()+1;var d=null;var l=null;var i={};for(var v=0;v<c.length;v++){if(c[v].source=="Counter"){d=c[v].events;d=d.sort(this.sortByYearMonth)}if(c[v].source=="PubMed Central Usage Stats"){if(c[v].events!=null&&c[v].events.length>0){l=c[v].events;l=l.sort(this.sortByYearMonth)}}}i.totalPDF=0;i.totalXML=0;i.totalHTML=0;i.total=0;i.history={};for(var v=0;v<d.length;v++){if(d[v].year<e||(d[v].year==e&&d[v].month<b)){d.splice(v,1);v--}}var h=0;var q=0;var n=0;var s=0;for(var v=0;v<d.length;v++){var t=this.parseIntSafe(d[v].html_views)+this.parseIntSafe(d[v].xml_views)+this.parseIntSafe(d[v].pdf_views);var k=this.getYearMonth(d[v].year,d[v].month);i.history[k]={};i.history[k].source={};i.history[k].year=d[v].year;i.history[k].month=d[v].month;i.history[k].source.counterViews={};i.history[k].source.counterViews.month=d[v].month;i.history[k].source.counterViews.year=d[v].year;i.history[k].source.counterViews.totalPDF=this.parseIntSafe(d[v].pdf_views);i.history[k].source.counterViews.totalXML=this.parseIntSafe(d[v].xml_views);i.history[k].source.counterViews.totalHTML=this.parseIntSafe(d[v].html_views);i.history[k].source.counterViews.total=t;h+=this.parseIntSafe(d[v].pdf_views);q+=this.parseIntSafe(d[v].xml_views);n+=this.parseIntSafe(d[v].html_views);s+=t;i.history[k].source.counterViews.cumulativePDF=h;i.history[k].source.counterViews.cumulativeXML=q;i.history[k].source.counterViews.cumulativeHTML=n;i.history[k].source.counterViews.cumulativeTotal=s;i.history[k].cumulativeTotal=this.parseIntSafe(i.total)+t;i.history[k].cumulativePDF=i.totalPDF+this.parseIntSafe(d[v].pdf_views);i.history[k].cumulativeXML=i.totalXML+this.parseIntSafe(d[v].xml_views);i.history[k].cumulativeHTML=i.totalHTML+this.parseIntSafe(d[v].html_views);i.history[k].total=t;i.totalPDF+=this.parseIntSafe(d[v].pdf_views);i.totalXML+=this.parseIntSafe(d[v].xml_views);i.totalHTML+=this.parseIntSafe(d[v].html_views);i.total+=t}i.totalCounterPDF=h;i.totalCounterXML=q;i.totalCounterHTML=n;i.totalCouterTotal=s;var p=0;var u=0;var f=0;if(l!=null){for(var v=0;v<l.length;v++){var t=this.parseIntSafe(l[v]["full-text"])+this.parseIntSafe(l[v].pdf);p+=this.parseIntSafe(l[v].pdf);u+=this.parseIntSafe(l[v]["full-text"]);f+=t;var k=this.getYearMonth(l[v].year,l[v].month);if(i.history[k]==null){continue}i.history[k].source.pmcViews={};
i.history[k].source.pmcViews.month=l[v].month;i.history[k].source.pmcViews.year=l[v].year;i.history[k].source.pmcViews.cumulativePDF=p;i.history[k].source.pmcViews.cumulativeHTML=u;i.history[k].source.pmcViews.cumulativeTotal=f;i.history[k].source.pmcViews.totalPDF=this.parseIntSafe(l[v].pdf);i.history[k].source.pmcViews.totalXML="n.a.";i.history[k].source.pmcViews.totalHTML=this.parseIntSafe(l[v]["full-text"]);i.history[k].source.pmcViews.total=t;i.history[k].total+=t;i.history[k].cumulativeTotal+=t;i.history[k].cumulativePDF+=this.parseIntSafe(l[v].pdf);i.history[k].cumulativeHTML+=this.parseIntSafe(l[v]["full-text"]);i.totalPDF+=this.parseIntSafe(l[v].pdf);i.totalHTML+=this.parseIntSafe(l[v]["full-text"]);i.total+=t}}i.totalPMCPDF=p;i.totalPMCHTML=u;i.totalPMCTotal=f;for(year=e;year<=(new Date().getFullYear());year++){var r=(year==e)?b:1;for(month=r;month<13;month++){if(year==(new Date().getFullYear())&&(month-1)>(new Date().getMonth())){break}k=this.getYearMonth(year,month);if(i.history[k]!=null&&i.history[k].source.pmcViews==null){i.history[k].source.pmcViews={};i.history[k].source.pmcViews.month=month+1;i.history[k].source.pmcViews.year=year;i.history[k].source.pmcViews.cumulativePDF=0;i.history[k].source.pmcViews.cumulativeHTML=0;i.history[k].source.pmcViews.cumulativeTotal=0;i.history[k].source.pmcViews.totalPDF=0;i.history[k].source.pmcViews.totalXML=0;i.history[k].source.pmcViews.totalHTML=0;i.history[k].source.pmcViews.total=0;var w=0;var g=0;if(month==1){w=12;g=year-1}else{w=month-1;g=year}var m=this.getYearMonth(g,w);if(i.history[m]!=null&&i.history[m].source.pmcViews!=null){i.history[k].source.pmcViews.cumulativePDF=i.history[m].source.pmcViews.cumulativePDF;i.history[k].source.pmcViews.cumulativeHTML=i.history[m].source.pmcViews.cumulativeHTML;i.history[k].source.pmcViews.cumulativeTotal=i.history[m].source.pmcViews.cumulativeTotal;i.history[k].source.pmcViews.totalPDF=0;i.history[k].source.pmcViews.totalHTML=0;i.history[k].source.pmcViews.total=0}else{i.history[k].source.pmcViews.cumulativePDF=0;i.history[k].source.pmcViews.cumulativeHTML=0;i.history[k].source.pmcViews.cumulativeTotal=0;i.history[k].source.pmcViews.totalPDF=0;i.history[k].source.pmcViews.totalHTML=0;i.history[k].source.pmcViews.total=0}}}}if(i.totalPMCTotal==0){i.totalPMCPDF=0;i.totalPMCHTML=0;i.totalPMCTotal=0}return i};this.parseIntSafe=function(b){if(isNaN(b)){return 0}return parseInt(b)};this.getYearMonth=function(b,c){if(this.parseIntSafe(c)<10){return b+"-0"+c}else{return b+"-"+c}};this.getData=function(d,e,b){var c=this.almHost+"/"+d;$.jsonp({url:c,context:document.body,timeout:20000,callbackParameter:"callback",success:e,error:function(g,f){b("Our system is having a bad day. We are working on it. Please check back later.")}});console.log(c)};this.setCrossRefText=function(c,i,b,g,d){var f=function(j){var k=$("#"+b);k.html("Links to PDF files of open access articles on Pubget are currently not available, please check back later.");k.show("blind",500);$("#"+d).fadeOut("slow")};var e=function(j){var k=$("#"+g);k.html("Citations are currently not available, please check back later.");k.show("blind",500);$("#"+d).fadeOut("slow")};var h=function(j){this.setCrossRefLinks(j,i,f);$("#"+d).fadeOut("slow")};this.getCitesCrossRefOnly(c,jQuery.proxy(h,this),e)};this.getPubGetPDF=function(f,d){var c=f[0];for(var b=1;b<f.length;b++){c=c+"|"+f[b]}var e={url:this.pubGetHost,callbackParameter:"callback",content:{oa_only:"true",dois:c},success:function(i){for(var g=0;g<i.length;g++){var h=this.fixDoiForID(i[g].doi);var j=i[g].values.link;var l=appContext+"/images/icon_pubgetpdf.gif";var m="Get the full text PDF from Pubget";var k='<a href="'+j+'"><img title="'+m+'" src="'+l+'"></a>';var n=$("#citation_"+h);if(n==null){console.warn("Citation not found on page: citation_"+h)}else{n.innerHTML=k}}return i},error:d,timeout:3000};$.jsonp(e)};this.fixDoiForID=function(b){return b.replace(/\//g,":")};this.setCrossRefLinks=function(c,p,m){var n=escape(c.article.doi);var h=new Array();var t=0;if(c.article.source!=null&&c.article.source.length>0&&c.article.source[0].events!=null&&c.article.source[0].events.length>0){t=c.article.source[0].events.length;var l="";for(var q=0;q<t;q++){var d=c.article.source[0].events[q].event;var j=c.article.source[0].events[q].event_url;h[q]=d.doi;l=l+"<li><span class='article'><a href=\""+j+'">'+d.article_title+'</a> <span class="pubGetPDFLink" id="citation_'+this.fixDoiForID(d.doi)+'"></span></span>';if(d.contributors!=null){var f="";var r="";var s=d.contributors.contributor;if(s==undefined){s=d.contributors;for(var o=0;o<s.length;o++){if(s[o].first_author===true){f=s[o].surname+" "+s[o].given_name.substr(0,1)}else{r=r+", "+s[o].surname+" "+s[o].given_name.substr(0,1)}}r=f+r}else{if(s instanceof Array){for(var o=0;o<s.length;o++){if(s[o].first_author==="true"){f=s[o].surname+" "+s[o].given_name.substr(0,1)}else{r=r+", "+s[o].surname+" "+s[o].given_name.substr(0,1)}}r=f+r}else{r=s.surname+" "+s.given_name.substr(0,1)
}}l=l+"<span class='authors'>"+r+"</span>"}l=l+"<span class='articleinfo'>";if(d.journal_title!=null&&d.journal_title.length>0){l=l+d.journal_title}if(d.year!=null&&d.year.length>0){l=l+" "+d.year}if(d.volume!=null&&d.volume.length>0){l=l+" "+d.volume}if(d.issue!=null&&d.issue.length>0){l=l+"("+d.issue+")"}if(d.first_page!=null&&d.first_page.length>0){l=l+": "+d.first_page}l=l+". doi:"+d.doi+"</span></li>"}}if(t<1){l="<h3>No related citations found</h3>"}else{var k="";if(t!=1){k="s"}l=t+" citation"+k+' as recorded by <a href="http://www.crossref.org">CrossRef</a>.  Article published '+$.datepicker.formatDate("M dd, yy",new Date(c.article.published))+". Citations updated on "+$.datepicker.formatDate("M dd, yy",new Date(c.article.source[0].updated_at))+". <ol>"+l+"</ol>"}$("#"+p).html(l);$("#"+p).show("blind",500);var g=200;if(h.length<g){this.getPubGetPDF(h,m)}else{for(var o=0;o<(h.length/g);o++){var i=o*g;var e=(o+1)*g;this.getPubGetPDF(h.slice(i,e),m)}}};this.setBookmarksText=function(b,e,c){var d=function(g){$("#"+c).fadeOut("slow");$("#"+e).html('<img src="/images/icon_error.png"/>&nbsp;'+g);$("#"+e).show("blind",500)};var f=function(g){$("#"+c).fadeOut("slow");$("#"+e).css("display","none");this.setBookmarks(g,e)};this.getSocialData(b,jQuery.proxy(f,this),jQuery.proxy(d,this))};this.setBookmarks=function(h,e){var o=escape($("meta[name=citation_doi]").attr("content"));var d=null;var g=null;if(h.article.source.length>0){var l="";var j=0;for(var q=0;q<h.article.source.length;q++){var c=h.article.source[q].public_url;var b=h.article.source[q].source.toLowerCase().replace(" ","-");var n=0;if(b=="facebook"){g={likes:0,shares:0,posts:0};if(h.article.source[q].events){if(h.article.source[q].events instanceof Array){for(var k=0;k<h.article.source[q].events.length;k++){n=n+h.article.source[q].events[k].total_count;g.likes+=h.article.source[q].events[k].like_count;g.shares+=h.article.source[q].events[k].share_count;g.posts+=h.article.source[q].events[k].comment_count}}else{n=n+h.article.source[q].events.total_count;g.likes=h.article.source[q].events.like_count;g.shares=h.article.source[q].events.share_count;g.posts=h.article.source[q].events.comment_count}}}else{if(b=="twitter"){n=h.article.source[q].count;c="/article/twitter/info:doi/"+o}else{if(b=="mendeley"){if(h.article.source[q].events!=null){n=h.article.source[q].count;var f=0;if(h.article.source[q].events.groups!=null){f=h.article.source[q].events.groups.length}d={individuals:n,groups:f}}}else{if(c&&b){n=h.article.source[q].count}}}}if(n>0){if(b=="facebook"){l=l+this.createMetricsTileNoLink(b,"/images/logo-"+b+".png",n)+"\n"}else{l=l+this.createMetricsTile(b,c,"/images/logo-"+b+".png",n)+"\n"}j++}}}if(j>0){$("#"+e).html(l);$("#"+e).show("blind",500)}else{$("#socialNetworksOnArticleMetricsPage").css("display","none")}var p=$("#facebookOnArticleMetricsTab");var m=$("#mendeleyOnArticleMetricsTab");if(p){p.tooltip({delay:250,fade:250,track:true,showURL:false,bodyHandler:function(){return $('<div class="tileTooltip"><table class="tile_mini"><thead><tr><th>Likes</th><th>Shares</th><th>Posts</th></tr></thead><tbody><tr><td class="data1">'+g.likes.format(0,".",",")+'</td><td class="data2">'+g.shares.format(0,".",",")+'</td><td class="data1">'+g.posts.format(0,".",",")+"</td></tr></tbody></table></div>")}})}if(m){m.tooltip({backgroundColor:"rgba(255, 255, 255, 0.0)",delay:250,fade:250,track:true,shadow:false,showURL:false,bodyHandler:function(){return $('<div class="tileTooltip"><table class="tile_mini"><thead><tr><th>Individuals</th><th>Groups</th></tr></thead><tbody><tr><td class="data1">'+d.individuals.format(0,".",",")+'</td><td class="data2">'+d.groups.format(0,".",",")+"</td></tr></tbody></table></div>")}})}};this.createMetricsTile=function(c,b,e,d){return'<div id="'+c+'OnArticleMetricsTab" class="metrics_tile"><a href="'+b+'"><img id="'+c+'ImageOnArticleMetricsTab" src="'+e+'" alt="'+d+" "+c+'" class="metrics_tile_image"/></a><div class="metrics_tile_footer" onclick="location.href=\''+b+'\';"><a href="'+b+'">'+d+"</a></div></div>"};this.createMetricsTileNoLink=function(b,d,c){return'<div id="'+b+'OnArticleMetricsTab" class="metrics_tile_no_link"><img id="'+b+'ImageOnArticleMetricsTab" src="'+d+'" alt="'+c+" "+b+'" class="metrics_tile_image"/><div class="metrics_tile_footer_no_link">'+c+"</div></div>"};this.setRelatedBlogsText=function(b,f,d,c){var e=function(h){$("#"+c).fadeOut("slow");this.setRelatedBlogError(h,f,d)};var g=function(h){$("#"+c).fadeOut("slow");$("#"+f).css("display","none");this.setRelatedBlogs(h,f)};this.getRelatedBlogs(b,jQuery.proxy(g,this),jQuery.proxy(e,this))};this.setRelatedBlogs=function(d,l){var f="";var i=escape($("meta[name=citation_doi]").attr("content"));var e=$("meta[name=citation_title]").attr("content");var j=0;var g=0;if(d.article.source.length>0){f="";for(var k=0;k<d.article.source.length;k++){var c=d.article.source[k].public_url;var b=d.article.source[k].source.toLowerCase().replace(" ","-");var h=d.article.source[k].count;if(b=="nature"){j=h
}else{if(b=="wikipedia"){g=h}else{if(b=="research-blogging"){if(h>0){f=f+this.createMetricsTile(b,c,"/images/logo-"+b+".png",h+"\n")}}else{if(c&&h>0){f=f+this.createMetricsTile(b,c,"/images/logo-"+b+".png",h+"\n")}else{if(d.article.source[k].search_url!=null&&d.article.source[k].search_url.length>0){f=f+this.createMetricsTile(b,d.article.source[k].search_url+e,"/images/logo-"+b+".png",h+"\n")}}}}}}}if(j>0){f=f+this.createMetricsTileNoLink("nature","/images/logo-nature.png",j)+"\n"}if(g>0){f=f+this.createMetricsTileNoLink("wikipedia","/images/logo-wikipedia.png",g)+"\n"}f=f+this.createMetricsTile("google-blogs","http://blogsearch.google.com/blogsearch?as_q=%22"+e+"%22","/images/logo-googleblogs.png","Search")+"\n";$("#"+l).html($("#"+l).html()+f);$("#"+l).show("blind",500)};this.setRelatedBlogError=function(f,d,b){$("#"+d).css("display","none");var e=$("meta[name=citation_title]").attr("content");var c='Search for related blog posts on <a href="http://blogsearch.google.com/blogsearch?as_q=%22'+e+'%22">Google Blogs</a><br/><div id="relatedBlogPostsError"></div>';$("#"+d).html(c);$("#"+d).show("blind",500);$("#"+b).html('<img src="/images/icon_error.png"/>&nbsp;'+f);$("#"+b).show("blind",500)};this.setCitesText=function(c,b,d){var e=function(g){$("#"+d).fadeOut("slow");$("#"+b).html('<img src="/images/icon_error.png"/>&nbsp;'+g);$("#"+b).show("blind",500)};var f=function(g){$("#"+d).fadeOut("slow");$("#"+b).css("display","none");this.setCites(g,b);$("#"+b).show("blind",500)};this.getCites(c,jQuery.proxy(f,this),e)};this.sortCitesBySource=function(d,c){if(c.source.toLowerCase()=="scopus"){return 1}else{if(d.source.toLowerCase()=="scopus"||d.source.toLowerCase()<c.source.toLowerCase()){return -1}else{if(d.source.toLowerCase()>c.source.toLowerCase()){return 1}}}return 0};this.setCites=function(e,d){var h=0;var i=escape($("meta[name=citation_doi]").attr("content"));var g="";if(e.article.source.length>0){e.article.source=e.article.source.sort(this.sortCitesBySource);for(var j=0;j<e.article.source.length;j++){var c=e.article.source[j].public_url;var f=/\s/g;var b=e.article.source[j].source.toLowerCase().replace(f,"-");b=b.replace("\u00ae","");if(e.article.source[j].source=="CrossRef"&&e.article.source[j].count>0){g=g+this.createMetricsTile(b,"/article/crossref/info:doi/"+i,"/images/logo-"+b+".png",e.article.source[j].count)+"\n";h++}else{if(c&&e.article.source[j].count>0){g=g+this.createMetricsTile(b,c,"/images/logo-"+b+".png",e.article.source[j].count)+"\n";h++}}}}var k="http://dx.plos.org/"+i.replace("info%3Adoi/","");if(h==0){g='No related citations found<br/>Search for citations in <a href="http://scholar.google.com/scholar?hl=en&lr=&cites='+k+'">Google Scholar</a>'}else{g=g+this.createMetricsTile("googleScholar","http://scholar.google.com/scholar?hl=en&lr=&cites="+k,"/images/logo-google-scholar.png","Search")}$("#"+d).html(g)};this.setChartData=function(c,g,d){var b=$.datepicker.parseDate("yy/m/d",$("meta[name=citation_date]").attr("content"));publishDatems=b.getTime();if(this.isNewArticle(publishDatems)){$("#"+g).html("This article was only recently published. Although we update our data on a daily basis (not in real time), there may be a 48-hour delay before the most recent numbers are available.<br/><br/>");$("#"+g).show("blind",500);$("#"+d).fadeOut("slow")}else{if(this.isArticle(c)){var e=function(h){$("#"+d).fadeOut("slow");$("#"+g).html('<img src="/images/icon_error.png"/>&nbsp;'+h);$("#"+g).show("blind",500)};var f=function(i){var m=$("#"+g);$("#"+d).fadeOut("slow");m.css("display","none");var k=this.massageChartData(i.article.source,publishDatems);var j=$('<div id="pageViewsSummary"><div id="left"><div class="header">Total Article Views</div><div class="totalCount">'+k.total.format(0,".",",")+'</div><div class="pubDates">'+$.datepicker.formatDate("M d, yy",b)+" (publication date)<br>through "+$.datepicker.formatDate("M d, yy",new Date())+'*</div></div><div id="right"><table id="pageViewsTable"><tbody><tr><th></th><th nowrap="">HTML Page Views</th><th nowrap="">PDF Downloads</th><th nowrap="">XML Downloads</th><th>Totals</th></tr><tr><td class="source1">PLOS</td><td>'+k.totalCounterHTML.format(0,".",",")+"</td><td>"+k.totalCounterPDF.format(0,".",",")+"</td><td>"+k.totalCounterXML.format(0,".",",")+'</td><td class="total">'+k.totalCouterTotal.format(0,".",",")+'</td></tr><tr><td class="source2">PMC</td><td>'+k.totalPMCHTML.format(0,".",",")+"</td><td>"+k.totalPMCPDF.format(0,".",",")+'</td><td>n.a.</td><td class="total">'+k.totalPMCTotal.format(0,".",",")+'</td></tr><tr><td>Totals</td><td class="total">'+k.totalHTML.format(0,".",",")+'</td><td class="total">'+k.totalPDF.format(0,".",",")+'</td><td class="total">'+k.totalXML.format(0,".",",")+'</td><td class="total">'+k.total.format(0,".",",")+'</td></tr><tr class="percent"><td colspan="5"><b>'+((k.totalPDF/k.totalHTML)*100).format(2,".",",")+"%</b> of article views led to PDF downloads</td></tr></tbody></table></div></div>");var h=$.map(k.history,function(r,q){return q
});m.append(j);var n=Object.keys(k.history).length>1;if(n){var p={chart:{renderTo:"chart",type:"column",animation:false,margin:[40,40,40,80]},credits:{enabled:false},exporting:{enabled:false},title:{text:null},legend:{enabled:false},xAxis:{title:{text:"Months",style:{fontFamily:"'FS Albert Web Regular', Verdana, sans-serif",fontWeight:"normal",color:"#000"},align:"high"},labels:{step:(h.length<15)?1:Math.round(h.length/15),formatter:function(){return this.value+1}},categories:[]},yAxis:[{title:{text:"Cumulative Views",style:{fontFamily:"'FS Albert Web Regular', Verdana, sans-serif",fontWeight:"normal",color:"#000",height:"50px"}},labels:{style:{color:"#000"}}}],plotOptions:{column:{stacking:"normal"},animation:false,series:{pointPadding:0,groupPadding:0,borderWidth:0,shadow:false}},series:[{name:"PMC",data:[],color:"#6d84bf"},{name:"PLoS",data:[],color:"#3c63af"}],tooltip:{backgroundColor:"rgba(255, 255, 255, 0.0)",useHTML:true,shared:true,shadow:false,borderWidth:0,borderRadius:0,positioner:function(u,r,q){var t=q.plotX+(r/2)+25,s=q.plotY-(u/2)+25;return{x:t,y:s}},formatter:function(){var q=this.points[0].key,r=k.history;return'<table id="mini" cellpadding="0" cellspacing="0"><tr><th></td><td colspan="2">Views in '+$.datepicker.formatDate("M yy",new Date(r[q].year,r[q].month-1,2))+'</td><td colspan="2">Views since '+$.datepicker.formatDate("M yy",new Date(r[q].year,r[q].month-1,2))+'</td></tr><tr><th>Source</th><th class="header1">PLoS</th><th class="header2">PMC</th><th class="header1">PLoS</th><th class="header2">PMC</th></tr><tr><td>HTML</td><td class="data1">'+r[q].source.counterViews.totalHTML+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.totalHTML.format(0,".",","):"n.a.")+'</td><td class="data1">'+r[q].source.counterViews.cumulativeHTML.format(0,".",",")+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.cumulativeHTML.format(0,".",","):"n.a.")+'</td></tr><tr><td>PDF</td><td class="data1">'+r[q].source.counterViews.totalPDF+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.totalPDF.format(0,".",","):"n.a.")+'</td><td class="data1">'+r[q].source.counterViews.cumulativePDF.format(0,".",",")+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.cumulativePDF.format(0,".",","):"n.a.")+'</td></tr><tr><td>XML</td><td class="data1">'+r[q].source.counterViews.totalXML+'</td><td class="data2">n.a.</td><td class="data1">'+r[q].source.counterViews.cumulativeXML.format(0,".",",")+'</td><td class="data2">n.a.</td></tr><tr><td>Total</td><td class="data1">'+r[q].source.counterViews.total+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.total.format(0,".",","):"n.a.")+'</td><td class="data1">'+r[q].source.counterViews.cumulativeTotal.format(0,".",",")+'</td><td class="data2">'+(r[q].source.hasOwnProperty("pmcViews")?r[q].source.pmcViews.cumulativeTotal.format(0,".",","):"n.a.")+"</td></tr></table>"}}};for(var o in k.history){if(k.history[o].source.pmcViews!=null){p.series[0].data.push({name:o,y:k.history[o].source.pmcViews.cumulativeTotal})}else{p.series[0].data.push({name:o,y:0})}p.series[1].data.push({name:o,y:k.history[o].source.counterViews.cumulativeTotal})}m.append($('<div id="chart"></div>').css("width","600px").css("height","200px"));var l=new Highcharts.Chart(p)}m.append($("<p>*Although we update our data on a daily basis, there may be a 48-hour delay before the most recent numbers are available. PMC data is posted on a monthly basis and will be made available once received.</p>"));m.show("blind",500)};this.getChartData(c,jQuery.proxy(f,this),e)}}};this.makeSignPostLI=function(f,e,d,c){var b=$('<li><div class="top">'+e.format(0,".",",")+'</div><div class="bottom"><div class="center"><div class="text">'+f+'<div class="content"><div class="description">'+d+'&nbsp;&nbsp;<a href="'+c+'">Read more</a>.</div></div></div></div></div></li>');(function(){this.hoverEnhanced({})}).apply(b);return b}};$(document).ready(function(){var e=300,g=172800000;if($("#almSignPost").length>0){var h=new $.fn.alm(),c=$("meta[name=citation_doi]").attr("content"),b=$.datepicker.parseDate("yy/m/d",$("meta[name=citation_date]").attr("content")),i=b.getTime();var f=function(j){$("#almSignPostSpinner").css("display","none");if(i>((new Date().getTime())-g)){}else{$("#almSignPost").append($("<li></li>").text("metrics unavailable").css("vertical-align","middle"));$("#almSignPost").fadeIn(e)}};var d=function(m){if(m&&m.length>0){if(m[0].groups.length>0){var r=h.massageChartData(m[0].groups[0].sources,i);s=h.makeSignPostLI("VIEWS",r.total,"Sum of PLOS and PubMed Central page views and downloads","/static/almInfo#usageInfo");$("#almSignPost").append(s)}var l=0;var k=0;var p=0;for(var n=0;n<m[0].groupcounts.length;n++){for(var q=0;q<m[0].groupcounts[n].sources.length;q++){var j=m[0].groupcounts[n].sources[q].source;var o=m[0].groupcounts[n].sources[q].count;if(j=="Scopus"){l=o
}if(j=="Mendeley"||j=="CiteULike"||j=="Connotea"){k+=o}if(j=="Facebook"||j=="Twitter"){p+=o}}}var t,s;if(l>0){t="CITATIONS";if(l==1){t="CITATION"}s=h.makeSignPostLI(t,l,"Paper's citation count computed by Scopus","/static/almInfo#citationInfo");$("#almSignPost").append(s)}if(k>0){t="ACADEMIC BOOKMARKS";if(k==1){t="ACADEMIC BOOKMARK"}s=h.makeSignPostLI(t,k,"Total Mendeley, CiteULike, and Connotea bookmarks","/static/almInfo#socialBookmarks");$("#almSignPost").append(s)}if(p>0){t="SOCIAL SHARES";if(p==1){t="SOCIAL SHARE"}s=h.makeSignPostLI(t,p,"Sum of Facebook and Twitter activity","/static/almInfo#socialBookmarks");$("#almSignPost").append(s)}$("#almSignPost").fadeIn(e)}};h.getSummaryForArticles([c],d,f)}});