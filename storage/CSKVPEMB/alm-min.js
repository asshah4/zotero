$.fn.alm=function(){this.almHost=$("meta[name=almHost]").attr("content");this.almAPIKey=$("meta[name=almAPIKey]").attr("content");if(!this.almHost){this.almHost="ALM_HOST_NOT_CONFIGURED"}if(!this.almAPIKey){this.almAPIKey="ALM_KEY_NOT_CONFIGURED"}this.almRequestBatchSize=parseInt($("meta[name=almRequestBatchSize]").attr("content"));if(isNaN(this.almRequestBatchSize)){this.almRequestBatchSize=30}this.isNewArticle=function(d){var c=(new Date()).getTime()-172800000;if(c<d){return true}else{return false}};this.isArticle=function(c){if(c.indexOf("image")>-1){return false}return true};this.validateDOI=function(c){if(c==null){throw new Error("DOI is null.")}c=encodeURI(c);return c.replace(new RegExp("/","g"),"%2F").replace(new RegExp(":","g"),"%3A")};this.getCitesTwitterOnly=function(d,f,c){d=this.validateDOI(d);var e=d+"&source=twitter&info=event";this.getData(e,f,c)};this.getArticleSummaries=function(j,f,i){var d,l,m,h,k,c=new Array();if(j.length){k=j.length;m=0;h=(k<this.almRequestBatchSize)?k:this.almRequestBatchSize;while(m<k){d="";d+=this.validateDOI(j[m]);for(l=(m+1);l<h;l++){d+=","+this.validateDOI(j[l])}var g=d;var e=this.almHost+"?api_key="+this.almAPIKey+"&ids="+g;c.push($.jsonp({url:e,context:document.body,timeout:20000,callbackParameter:"callback"}));m=h;h=h+this.almRequestBatchSize;if(h>k){h=k}}}$.when.apply($,c).then(function(){var o=new Array();if(arguments.length>=2&&arguments[1]==="success"){o=o.concat(arguments[0])}else{for(var n=0;n<arguments.length;n++){o=o.concat(arguments[n][0])}}f(o)},function(){i()})};this.sortByYearMonth=function(c,d){if(parseInt(c.year)<parseInt(d.year)){return -1}else{if(parseInt(c.year)==parseInt(d.year)){if(parseInt(c.month)==parseInt(d.month)){return 0}else{if(parseInt(c.month)<parseInt(d.month)){return -1}else{return 1}}}else{return 1}}};this.massageChartData=function(d,k){var q=new Date(k);var f=q.getFullYear();var c=q.getMonth()+1;var e=null;var m=null;var j={};for(var x=0;x<d.length;x++){if(d[x].name.toLowerCase()=="counter"){e=d[x].events;e=e.sort(this.sortByYearMonth)}if(d[x].name.toLowerCase()=="pmc"){if(d[x].events&&d[x].events.length>0){m=d[x].events;m=m.sort(this.sortByYearMonth)}}if(d[x].name.toLowerCase().toLowerCase()=="relativemetric"){if(d[x].events!=null){j.relativeMetricData=d[x].events}}}j.totalPDF=0;j.totalXML=0;j.totalHTML=0;j.total=0;j.history={};for(var x=0;x<e.length;x++){if(e[x].year<f||(e[x].year==f&&e[x].month<c)){e.splice(x,1);x--}}var i=0;var s=0;var o=0;var v=0;for(var x=0;x<e.length;x++){var p=e[x];var w=this.parseIntSafe(p.html_views)+this.parseIntSafe(p.xml_views)+this.parseIntSafe(p.pdf_views);var l=this.getYearMonth(p.year,p.month);j.history[l]={};j.history[l].source={};j.history[l].year=p.year;j.history[l].month=p.month;j.history[l].source.counterViews={};j.history[l].source.counterViews.month=p.month;j.history[l].source.counterViews.year=p.year;j.history[l].source.counterViews.totalPDF=this.parseIntSafe(p.pdf_views);j.history[l].source.counterViews.totalXML=this.parseIntSafe(p.xml_views);j.history[l].source.counterViews.totalHTML=this.parseIntSafe(p.html_views);j.history[l].source.counterViews.total=w;i+=this.parseIntSafe(p.pdf_views);s+=this.parseIntSafe(p.xml_views);o+=this.parseIntSafe(p.html_views);v+=w;j.history[l].source.counterViews.cumulativePDF=i;j.history[l].source.counterViews.cumulativeXML=s;j.history[l].source.counterViews.cumulativeHTML=o;j.history[l].source.counterViews.cumulativeTotal=v;j.history[l].cumulativeTotal=this.parseIntSafe(j.total)+w;j.history[l].cumulativePDF=j.totalPDF+this.parseIntSafe(p.pdf_views);j.history[l].cumulativeXML=j.totalXML+this.parseIntSafe(p.xml_views);j.history[l].cumulativeHTML=j.totalHTML+this.parseIntSafe(p.html_views);j.history[l].total=w;j.totalPDF+=this.parseIntSafe(p.pdf_views);j.totalXML+=this.parseIntSafe(p.xml_views);j.totalHTML+=this.parseIntSafe(p.html_views);j.total+=w}j.totalCounterPDF=i;j.totalCounterXML=s;j.totalCounterHTML=o;j.totalCouterTotal=v;var r=0;var u=0;var g=0;if(m!=null){for(var x=0;x<m.length;x++){var p=m[x];var w=this.parseIntSafe(p["full-text"])+this.parseIntSafe(p.pdf);r+=this.parseIntSafe(p.pdf);u+=this.parseIntSafe(p["full-text"]);g+=w;var l=this.getYearMonth(p.year,p.month);if(j.history[l]==null){continue}j.history[l].source.pmcViews={};j.history[l].source.pmcViews.month=p.month;j.history[l].source.pmcViews.year=p.year;j.history[l].source.pmcViews.cumulativePDF=r;j.history[l].source.pmcViews.cumulativeHTML=u;j.history[l].source.pmcViews.cumulativeTotal=g;j.history[l].source.pmcViews.totalPDF=this.parseIntSafe(p.pdf);j.history[l].source.pmcViews.totalXML="n.a.";j.history[l].source.pmcViews.totalHTML=this.parseIntSafe(p["full-text"]);j.history[l].source.pmcViews.total=w;j.history[l].total+=w;j.history[l].cumulativeTotal+=w;j.history[l].cumulativePDF+=this.parseIntSafe(p.pdf);j.history[l].cumulativeHTML+=this.parseIntSafe(p["full-text"]);j.totalPDF+=this.parseIntSafe(p.pdf);j.totalHTML+=this.parseIntSafe(p["full-text"]);j.total+=w}}j.totalPMCPDF=r;j.totalPMCHTML=u;
j.totalPMCTotal=g;for(year=f;year<=(new Date().getFullYear());year++){var t=(year==f)?c:1;for(month=t;month<13;month++){if(year==(new Date().getFullYear())&&(month-1)>(new Date().getMonth())){break}l=this.getYearMonth(year,month);if(j.history[l]!=null&&j.history[l].source.pmcViews==null){j.history[l].source.pmcViews={};j.history[l].source.pmcViews.month=month+1;j.history[l].source.pmcViews.year=year;j.history[l].source.pmcViews.cumulativePDF=0;j.history[l].source.pmcViews.cumulativeHTML=0;j.history[l].source.pmcViews.cumulativeTotal=0;j.history[l].source.pmcViews.totalPDF=0;j.history[l].source.pmcViews.totalXML=0;j.history[l].source.pmcViews.totalHTML=0;j.history[l].source.pmcViews.total=0;var y=0;var h=0;if(month==1){y=12;h=year-1}else{y=month-1;h=year}var n=this.getYearMonth(h,y);if(j.history[n]!=null&&j.history[n].source.pmcViews!=null){j.history[l].source.pmcViews.cumulativePDF=j.history[n].source.pmcViews.cumulativePDF;j.history[l].source.pmcViews.cumulativeHTML=j.history[n].source.pmcViews.cumulativeHTML;j.history[l].source.pmcViews.cumulativeTotal=j.history[n].source.pmcViews.cumulativeTotal;j.history[l].source.pmcViews.totalPDF=0;j.history[l].source.pmcViews.totalHTML=0;j.history[l].source.pmcViews.total=0}else{j.history[l].source.pmcViews.cumulativePDF=0;j.history[l].source.pmcViews.cumulativeHTML=0;j.history[l].source.pmcViews.cumulativeTotal=0;j.history[l].source.pmcViews.totalPDF=0;j.history[l].source.pmcViews.totalHTML=0;j.history[l].source.pmcViews.total=0}}}}if(j.totalPMCTotal==0){j.totalPMCPDF=0;j.totalPMCHTML=0;j.totalPMCTotal=0}return j};this.parseIntSafe=function(c){if(isNaN(c)){return 0}return parseInt(c)};this.getYearMonth=function(c,d){if(this.parseIntSafe(d)<10){return c+"-0"+d}else{return c+"-"+d}};this.setCrossRefText=function(c,h,f,d){var e=function(i){var j=$("#"+f);j.html("Citations are currently not available, please check back later.");j.show("blind",500);$("#"+d).fadeOut("slow")};var g=function(i){this.setCrossRefLinks(i,h);$("#"+d).fadeOut("slow")};this.getCitesCrossRefOnly(c,jQuery.proxy(g,this),e)};this.getCitesCrossRefOnly=function(d,f,c){d=this.validateDOI(d);var e=d+"&source=crossref&info=event";this.getData(e,f,c)};this.setCrossRefLinks=function(e,d){var n=encodeURIComponent(e[0].doi);var l=this.filterSources(e[0].sources,["crossref"])[0];var p=0;if(l.metrics.total>0){p=l.metrics.total;var j="";for(var c=0;c<l.events.length;c++){var m=l.events[c].event;var o=l.events[c].event_url;j=j+"<li><span class='article'><a href=\""+o+'">'+m.article_title+'</a> <span class="pubGetPDFLink" id="citation_'+this.fixDoiForID(m.doi)+'"></span></span>';if(m.contributors){var g="";var q="";var f="";var k=m.contributors.contributor;for(var h=0;h<k.length;h++){individualContributor=k[h];if(individualContributor.first_author==="true"){if(individualContributor.surname){g=individualContributor.surname;if(individualContributor.given_name&&individualContributor.given_name.length>0){g=g+" "+individualContributor.given_name.substr(0,1)}}}else{f="";if(individualContributor.surname){f=individualContributor.surname;if(individualContributor.given_name&&individualContributor.given_name.length>0){f=f+" "+individualContributor.given_name.substr(0,1)}q=q+", "+f}}}q=g+q;j=j+"<span class='authors'>"+q+"</span>"}j=j+"<span class='articleinfo'>";if(m.journal_title!=null){j=j+m.journal_title}if(m.year!=null){j=j+" "+m.year}if(m.volume!=null){j=j+" "+m.volume}if(m.issue!=null){j=j+"("+m.issue+")"}if(m.first_page){j=j+": "+m.first_page}j=j+". doi:"+m.doi+"</span></li>"}}if(p<1){j="<h3>No related citations found</h3>"}else{var r="";if(p!=1){r="s"}j=p+" citation"+r+' as recorded by <a href="http://www.crossref.org">CrossRef</a>.  Article published '+$.datepicker.formatDate("M dd, yy",new Date(e[0].publication_date))+". Citations updated on "+$.datepicker.formatDate("M dd, yy",new Date(e[0].update_date))+". <ol>"+j+"</ol>"}$("#"+d).html(j);$("#"+d).show("blind",500)};this.fixDoiForID=function(c){return c.replace(/\//g,":")};this.getData=function(e,f,c){var d=this.almHost+"?api_key="+this.almAPIKey+"&ids="+e;$.jsonp({url:d,context:document.body,timeout:20000,callbackParameter:"callback",success:f,error:function(h,g){c("Our system is having a bad day. We are working on it. Please check back later.")}});console.log(d)};this.setSavedSuccess=function(j,e,g,h,i){var n=$("#"+e);$("#"+g).fadeOut("slow");n.css("display","none");var d=this.filterSources(j[0].sources,["citeulike","connotea","mendeley"]);d=this.enforceOrder(d,["citeulike","connotea","mendeley"]);var k=true;for(var m=0;m<d.length;m++){var c=d[m];if(c.metrics.total>0){k=false;switch(c.name){case"mendeley":n.append(this.createMetricsTile(c.display_name,c.events_url,"/images/logo-"+c.name+".png",c.metrics.total)+"\n");var l=c.metrics.shares;var f=c.metrics.groups;$("#MendeleyImageOnArticleMetricsTab").tooltip({backgroundColor:"rgba(255, 255, 255, 0.0)",delay:250,fade:250,track:true,shadow:false,showURL:false,bodyHandler:function(){return $('<div class="tileTooltip"><table class="tile_mini"><thead><tr><th>Individuals</th><th>Groups</th></tr></thead><tbody><tr><td class="data1">'+l.format(0,".",",")+'</td><td class="data2">'+f.format(0,".",",")+"</td></tr></tbody></table></div>")
}});break;case"connotea":n.append(this.createMetricsTileNoLink(c.display_name,"/images/logo-"+c.name+".png",c.metrics.total)+"\n");break;default:n.append(this.createMetricsTile(c.display_name,c.events_url,"/images/logo-"+c.name+".png",c.metrics.total)+"\n");break}}}if(k){$("#socialNetworksOnArticleMetricsPage").css("display","none")}else{h("#"+e);n.show("blind",500,i)}};this.setSavedError=function(f,g,d,c,e){$("#"+d).fadeOut("slow");$("#"+g).html('<img src="/images/icon_error.png"/>&nbsp;'+f);c();$("#"+g).show("blind",500,countElementShownCallback)};this.createMetricsTile=function(d,c,f,e){return'<div id="'+d+'OnArticleMetricsTab" class="metrics_tile"><a href="'+c+'"><img id="'+d+'ImageOnArticleMetricsTab" src="'+f+'" alt="'+e+" "+d+'" class="metrics_tile_image"/></a><div class="metrics_tile_footer" onclick="location.href=\''+c+'\';"><a href="'+c+'">'+e+"</a></div></div>"};this.createMetricsTileNoLink=function(c,e,d){return'<div id="'+c+'OnArticleMetricsTab" class="metrics_tile_no_link"><img id="'+c+'ImageOnArticleMetricsTab" src="'+e+'" alt="'+d+" "+c+'" class="metrics_tile_image"/><div class="metrics_tile_footer_no_link">'+d+"</div></div>"};this.setDiscussedSuccess=function(i,p,e,f,h){$("#"+e).fadeOut("slow");var l=$("#"+p);l.css("display","none");var j=$("meta[name=citation_title]").attr("content");var o=encodeURI($("meta[name=citation_doi]").attr("content"));var k="",d=null,r="";var c=this.filterSources(i[0].sources,["researchblogging","scienceseeker","nature","wikipedia","twitter","facebook"]);c=this.enforceOrder(c,["researchblogging","scienceseeker","nature","wikipedia","twitter","facebook"]);for(var q=0;q<c.length;q++){d=c[q];k="";if(d.metrics.total>0){if(d.name==="facebook"){k=this.createMetricsTileNoLink(d.display_name,"/images/logo-"+d.name+".png",d.metrics.total)+"\n";var g=d.metrics.likes;var n=d.metrics.shares;var m=d.metrics.comments;r='<div class="tileTooltip"><table class="tile_mini"><thead><tr><th>Likes</th><th>Shares</th><th>Posts</th></tr></thead><tbody><tr><td class="data1">'+g.format(0,".",",")+'</td><td class="data2">'+n.format(0,".",",")+'</td><td class="data1">'+m.format(0,".",",")+"</td></tr></tbody></table></div>"}else{if(d.name==="twitter"){k=this.createMetricsTile(d.display_name,"/article/twitter/info:doi/"+o,"/images/logo-"+d.name+".png",d.metrics.total)+"\n"}else{if(!d.events_url){k=this.createMetricsTileNoLink(d.display_name,"/images/logo-"+d.name+".png",d.metrics.total)+"\n"}else{k=this.createMetricsTile(d.display_name,d.events_url,"/images/logo-"+d.name+".png",d.metrics.total)+"\n"}}}if(k.length>0){l.append(k)}}}$("#notesAndCommentsOnArticleMetricsTab").appendTo(l);$("#trackbackOnArticleMetricsTab").appendTo(l);k=this.createMetricsTile("google-blogs","http://blogsearch.google.com/blogsearch?as_q=%22"+j+"%22","/images/logo-googleblogs.png","Search")+"\n";l.append(k);$("#FacebookOnArticleMetricsTab").tooltip({delay:250,fade:250,track:true,showURL:false,bodyHandler:function(){return $(r)}});f("#"+p);l.show("blind",500,h)};this.setDiscussedError=function(j,d,e,c,i){var g=$("#"+d);g.css("display","none");var h=$("meta[name=citation_title]").attr("content");var f="Search for related blog posts on <a href='http://blogsearch.google.com/blogsearch?as_q=%22"+h+"%22'>Google Blogs</a><br/><img src='/images/icon_error.png'/>&nbsp;"+j;g.html(f);$("#"+e).fadeOut("slow");c();g.show("blind",500,countElementShownCallback)};this.setCitesSuccess=function(j,f,g,h,i){$("#"+g).fadeOut("slow");$("#"+f).css("display","none");var m=0;var n=encodeURI($("meta[name=citation_doi]").attr("content"));var l="";var d=this.filterSources(j[0].sources,["crossref","pubmed","scopus","wos"]);d=this.enforceOrder(d,["scopus","crossref","pubmed","wos"]);for(var o=0;o<d.length;o++){source=d[o];if(source.metrics.total>0){var e=source.events_url;var k=/\s/g;var c=source.display_name.toLowerCase().replace(k,"-");c=c.replace("\u00ae","");if(source.name.toLowerCase()=="crossref"){l=l+this.createMetricsTile(c,"/article/crossref/info:doi/"+n,"/images/logo-"+c+".png",source.metrics.total)+"\n";m++}else{if(source.events_url){l=l+this.createMetricsTile(c,e,"/images/logo-"+c+".png",source.metrics.total)+"\n";m++}else{l=l+this.createMetricsTileNoLink(c,"/images/logo-"+c+".png",source.metrics.total)+"\n";m++}}}}var p="http://dx.plos.org/"+n.replace("info%3Adoi/","");if(m==0){l='No related citations found<br/>Search for citations in <a href="http://scholar.google.com/scholar?hl=en&lr=&cites='+p+'">Google Scholar</a>'}else{l=l+this.createMetricsTile("googleScholar","http://scholar.google.com/scholar?hl=en&lr=&cites="+p,"/images/logo-google-scholar.png","Search")}$("#"+f).html(l);h("#"+f);$("#"+f).show("blind",500,i)};this.setCitesError=function(g,c,e,d,f){$("#"+e).fadeOut("slow");$("#"+c).html('<img src="/images/icon_error.png"/>&nbsp;'+g);d();$("#"+c).show("blind",500,countElementShownCallback)};this.setF1000Success=function(h,g,f,j,e,i){var c=this.filterSources(h[0].sources,["f1000"]).pop();if(!c){return}if(c.metrics.total==0){return
}var d=encodeURI($("meta[name=citation_doi]").attr("content"));$("#"+g).show("blind",500);e("#"+j);$("#"+f).fadeOut("slow");$("#"+j).append(this.createMetricsTile(c.display_name,c.events_url,"/images/logo-"+c.name+".png",c.metrics.total)+"\n").show("blind",500,i)};this.setF1000Error=function(c){};this.setChartData=function(i,k,d,e,f,c){var h=$.datepicker.parseDate("yy/m/d",$("meta[name=citation_date]").attr("content"));publishDatems=h.getTime();if(this.isNewArticle(publishDatems)){$("#"+k).html("This article was only recently published. Although we update our data on a daily basis (not in real time), there may be a 48-hour delay before the most recent numbers are available.<br/><br/>");e();$("#"+k).show("blind",500,f);$("#"+d).fadeOut("slow");c()}else{if(this.isArticle(i)){var l=function(m){e();$("#"+d).fadeOut("slow");$("#"+k).html('<img src="/images/icon_error.png"/>&nbsp;'+m);$("#"+k).show("blind",500,f);c()};var j=function(n){var r=$("#"+k);$("#"+d).fadeOut("slow");r.css("display","none");var p=this.massageChartData(n[0].sources,publishDatems);var o=$('<div id="pageViewsSummary"><div id="left"><div class="header">Total Article Views</div><div class="totalCount">'+p.total.format(0,".",",")+'</div><div class="pubDates">'+$.datepicker.formatDate("M d, yy",h)+" (publication date)<br>through "+$.datepicker.formatDate("M d, yy",new Date())+'*</div></div><div id="right"><table id="pageViewsTable"><tbody><tr><th></th><th nowrap="">HTML Page Views</th><th nowrap="">PDF Downloads</th><th nowrap="">XML Downloads</th><th>Totals</th></tr><tr><td class="source1">PLOS</td><td>'+p.totalCounterHTML.format(0,".",",")+"</td><td>"+p.totalCounterPDF.format(0,".",",")+"</td><td>"+p.totalCounterXML.format(0,".",",")+'</td><td class="total">'+p.totalCouterTotal.format(0,".",",")+'</td></tr><tr><td class="source2">PMC</td><td>'+p.totalPMCHTML.format(0,".",",")+"</td><td>"+p.totalPMCPDF.format(0,".",",")+'</td><td>n.a.</td><td class="total">'+p.totalPMCTotal.format(0,".",",")+'</td></tr><tr><td>Totals</td><td class="total">'+p.totalHTML.format(0,".",",")+'</td><td class="total">'+p.totalPDF.format(0,".",",")+'</td><td class="total">'+p.totalXML.format(0,".",",")+'</td><td class="total">'+p.total.format(0,".",",")+'</td></tr><tr class="percent"><td colspan="5"><b>'+((p.totalPDF/p.totalHTML)*100).format(2,".",",")+"%</b> of article views led to PDF downloads</td></tr></tbody></table></div></div>");var m=$.map(p.history,function(w,v){return v});r.append(o);var s=Object.keys(p.history).length>1;if(s){var u=this.buildChartOptions(p,m);for(var t in p.history){if(p.history[t].source.pmcViews!=null){u.series[0].data.push({name:t,y:p.history[t].source.pmcViews.cumulativeTotal})}else{u.series[0].data.push({name:t,y:0})}u.series[1].data.push({name:t,y:p.history[t].source.counterViews.cumulativeTotal})}r.append($('<div id="chart"></div>').css("width","600px").css("height","200px"));e();var q=new Highcharts.Chart(u);this.addRelativeMetricInfo(p,m,q,r,e)}r.append($("<p>*Although we update our data on a daily basis, there may be a 48-hour delay before the most recent numbers are available. PMC data is posted on a monthly basis and will be made available once received.</p>"));this.addFigshareTile(n[0]);e();r.show("blind",500,function(){f();c()})};i=this.validateDOI(i);var g=i+"&source=pmc,counter,relativemetric,figshare&info=event";this.getData(g,jQuery.proxy(j,this),l)}}};this.buildChartOptions=function(e,d){var c={chart:{renderTo:"chart",animation:false,margin:[40,40,40,80]},credits:{enabled:false},exporting:{enabled:false},title:{text:null},legend:{enabled:false},xAxis:{title:{text:"Months",style:{fontFamily:"'FS Albert Web Regular', Verdana, sans-serif",fontWeight:"normal",color:"#000"},align:"high"},labels:{step:(d.length<15)?1:Math.round(d.length/15),formatter:function(){return this.value+1}},categories:[]},yAxis:[{title:{text:"Cumulative Views",style:{fontFamily:"'FS Albert Web Regular', Verdana, sans-serif",fontWeight:"normal",color:"#000",height:"50px"}},labels:{style:{color:"#000"}}}],plotOptions:{column:{stacking:"normal"},animation:false,series:{pointPadding:0,groupPadding:0,borderWidth:0,shadow:false}},series:[{name:"PMC",type:"column",data:[],color:"#6d84bf"},{name:"PLOS",type:"column",data:[],color:"#3c63af"}],tooltip:{backgroundColor:"rgba(255, 255, 255, 0.0)",useHTML:true,shared:true,shadow:false,borderWidth:0,borderRadius:0,positioner:function(j,g,f){var i=f.plotX+(g/2)+25,h=f.plotY-(j/2)+25;return{x:i,y:h}},formatter:function(){var f=this.points[0].key,g=e.history;return'<table id="mini" cellpadding="0" cellspacing="0"><tr><th></td><td colspan="2">Views in '+$.datepicker.formatDate("M yy",new Date(g[f].year,g[f].month-1,2))+'</td><td colspan="2">Views through '+$.datepicker.formatDate("M yy",new Date(g[f].year,g[f].month-1,2))+'</td></tr><tr><th>Source</th><th class="header1">PLOS</th><th class="header2">PMC</th><th class="header1">PLOS</th><th class="header2">PMC</th></tr><tr><td>HTML</td><td class="data1">'+g[f].source.counterViews.totalHTML+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.totalHTML.format(0,".",","):"n.a.")+'</td><td class="data1">'+g[f].source.counterViews.cumulativeHTML.format(0,".",",")+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.cumulativeHTML.format(0,".",","):"n.a.")+'</td></tr><tr><td>PDF</td><td class="data1">'+g[f].source.counterViews.totalPDF+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.totalPDF.format(0,".",","):"n.a.")+'</td><td class="data1">'+g[f].source.counterViews.cumulativePDF.format(0,".",",")+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.cumulativePDF.format(0,".",","):"n.a.")+'</td></tr><tr><td>XML</td><td class="data1">'+g[f].source.counterViews.totalXML+'</td><td class="data2">n.a.</td><td class="data1">'+g[f].source.counterViews.cumulativeXML.format(0,".",",")+'</td><td class="data2">n.a.</td></tr><tr><td>Total</td><td class="data1">'+g[f].source.counterViews.total+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.total.format(0,".",","):"n.a.")+'</td><td class="data1">'+g[f].source.counterViews.cumulativeTotal.format(0,".",",")+'</td><td class="data2">'+(g[f].source.hasOwnProperty("pmcViews")?g[f].source.pmcViews.cumulativeTotal.format(0,".",","):"n.a.")+"</td></tr></table>"
}}};return c};this.addRelativeMetricInfo=function(u,t,j,s,e){if(u.relativeMetricData!=null){var h=u.relativeMetricData.subject_areas;if(h&&h.length>0){var l=new Array();for(var n=0;n<h.length;n++){var f=h[n].subject_area;var p=h[n].average_usage;if(p.length>=2){l.push(f);if(p.length>t.length){p=p.slice(0,t.length)}e();j.addSeries({id:f,data:p,type:"line",color:"#01DF01",marker:{enabled:false,states:{hover:{enabled:false}}}});e();j.get(f).hide()}}if(l.length>0){var q;var r=$('<select id="subject_areas"></select>');l.sort();for(n=0;n<l.length;n++){var m=l[n].substr(1);var o=m.split("/");if(o.length==1){r.append($("<option></option>").attr("value",l[n]).text(o[0]))}else{if(o.length==2){r.append($("<option></option>").attr("value",l[n]).html("&nbsp;&nbsp;&nbsp;"+o[1]));if(q==null){q=l[n]}}}}if(q==null){q=l[0]}r.find('option[value="'+q+'"]').attr("selected","selected");j.get(q).show();r.change(function(){$("#subject_areas option").each(function(){j.get($(this).val()).hide()});j.get($(this).val()).show();var i=$('input[name="refsetLinkValue"]').val();$("#linkToRefset").attr("href",i.replace("SUBJECT_AREA",$(this).val()))});var c=$("<div></div>").html('<span class="colorbox"></span>&nbsp;Compare average usage for articles published in <b>'+new Date(u.relativeMetricData.start_date).getUTCFullYear()+'</b> in the subject area: <a href="/static/almInfo#relativeMetrics" class="ir" title="More information">info</a>');var g="/search/advanced?pageSize=12&unformattedQuery=(publication_date:["+u.relativeMetricData.start_date+" TO "+u.relativeMetricData.end_date+']) AND subject:"SUBJECT_AREA"';var k=$("<div></div>").append(r).append('&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a id="linkToRefset" href="'+encodeURI(g.replace("SUBJECT_AREA",q))+'" >Show reference set</a>').append('<input type="hidden" name="refsetLinkValue" value="'+encodeURI(g)+'" >');var d=$('<div id="averageViewsSummary"></div>').append(c).append(k);s.append(d)}}}};this.addFigshareTile=function(c){var d=0,g;for(d=0;d<c.sources.length;d++){g=c.sources[d];if(g.name.toLowerCase()=="figshare"){if(g.metrics.total>0){var f=g.name;var e=this.createMetricsTileNoLink(f,"/images/logo-"+f+".png",g.metrics.total);$("#views").append(e)}break}}$.ajax({url:"/article/figureTableList.action?uri=info:doi/"+c.doi,dataFilter:function(i,h){return i.replace(/(^\/\*|\*\/$)/g,"")},dataType:"json",error:function(h,j,i){console.log(i)},success:function(m){var i=$('<div class="tileTooltip"></div>'),n=$('<table class="tile_mini"></table>'),l,h,j,k={};for(d=0;d<g.events.items.length;d++){l=g.events.items[d],h=0,j="";if(l.doi.length==1){j=l.doi[0].replace("http://dx.doi.org/","")}else{if(l.doi.length>1){j="SI"}}h=l.stats.downloads+l.stats.page_views;k[j]='<td class="data1">'+h+"</td>"}for(d=0;d<m.secondaryObjects.length;d++){j=m.secondaryObjects[d].doi.replace("info:doi/","");n.append("<tr><td>"+m.secondaryObjects[d].title+"</td>"+k[j]+"</tr>")}if(k.SI){n.append("<tr><td>Supporting Info files</td>"+k.SI+"</tr>")}$("#figshareImageOnArticleMetricsTab").tooltip({delay:250,fade:250,track:true,showURL:false,bodyHandler:function(){return i.append(n)}})}})};this.makeSignPostLI=function(h,g,f,e){var d='<a href="'+e+'">'+h+"</a>";var c=$('<li><div class="top">'+g.format(0,".",",")+'</div><div class="bottom"><div class="center"><div class="text">'+d+'<div class="content"><div class="description"><a href="'+e+'">'+f+"</a>.</div></div></div></div></div></li>");(function(){this.hoverEnhanced({})}).apply(c);return c};this.setMetricsTab=function(e,d,g,f){e=this.validateDOI(e);var h=function(i){this.setCitesSuccess(i,"relatedCites","relatedCitesSpinner",d,g);this.setSavedSuccess(i,"relatedBookmarks","relatedBookmarksSpinner",d,g);this.setDiscussedSuccess(i,"relatedBlogPosts","relatedBlogPostsSpinner",d,g);this.setF1000Success(i,"f1kHeader","f1KSpinner","f1kContent",d,g);f()};var c=function(i){this.setCitesError(i,"relatedCites","relatedCitesSpinner",d,g);this.setSavedError(i,"relatedBookmarks","relatedBookmarksSpinner",d,g);this.setDiscussedError(i,"relatedBlogPosts","relatedBlogPostsSpinner",d,g);this.setF1000Error(i,"f1000","f1000Spinner");f()};this.getData(e,$.proxy(h,this),$.proxy(c,this))};this.filterSources=function(d,c){validSources=[];for(var e=0;e<d.length;e++){if($.inArray(d[e].name.toLowerCase(),c)>-1){validSources.push(d[e])}}return validSources};this.enforceOrder=function(f,c){var g=[];for(var j=0;j<f.length;j++){g.push(f[j].name)}var h=[];for(var i=0;i<c.length;i++){var e=$.inArray(c[i],g);if(e>-1){h.push(f[e])}}return h}};function onReadyALM(){var f=300,h=172800000;if($("#almSignPost").length>0){var i=new $.fn.alm(),d=$("meta[name=citation_doi]").attr("content"),c=$.datepicker.parseDate("yy/m/d",$("meta[name=citation_date]").attr("content")),j=c.getTime();var g=function(k){$("#almSignPostSpinner").css("display","none");if(j>((new Date().getTime())-h)){}else{$("#almSignPost").append($("<li></li>").text("metrics unavailable").css("vertical-align","middle"));$("#almSignPost").fadeIn(f)}};var e=function(k){var s,l,y,A;
if(k&&k.length>0){s=k[0];var r,B,m,n,q,p,w,o;l=s.sources;for(var z=0;z<l.length;z+=1){y=l[z];if(y.name.toLowerCase()=="counter"){r=y}else{if(y.name.toLowerCase()=="pmc"){B=y}else{if(y.name.toLowerCase()=="scopus"){m=y}else{if(y.name.toLowerCase()=="facebook"){n=y}else{if(y.name.toLowerCase()=="twitter"){q=y}else{if(y.name.toLowerCase()=="mendeley"){p=y}else{if(y.name.toLowerCase()=="citeulike"){w=y}else{if(y.name.toLowerCase()=="crossref"){o=y}}}}}}}}}doiLink="/article/metrics/info:doi/"+$("meta[name=citation_doi]").attr("content");A=r.metrics.total+B.metrics.total;if(A>0){v=i.makeSignPostLI("VIEWS",r.metrics.total+B.metrics.total,"Sum of PLOS and PubMed Central page views and downloads",doiLink+"#viewedHeader");$("#almSignPost").append(v)}var u,v;if(m.metrics.total>0){u="CITATIONS";if(m.metrics.total==1){u="CITATION"}v=i.makeSignPostLI(u,m.metrics.total,"Paper's citation count computed by Scopus",doiLink+"#citedHeader");$("#almSignPost").append(v)}else{if(o.metrics.total>0){u="CITATIONS";if(o.metrics.total==1){u="CITATION"}v=i.makeSignPostLI(u,o.metrics.total,"Scopus data unavailable. Displaying Crossref citation count",doiLink+"#citedHeader");$("#almSignPost").append(v)}}var x=p.metrics.total+w.metrics.total;if(x>0){u="SAVES";if(x==1){u="SAVE"}v=i.makeSignPostLI(u,p.metrics.total+w.metrics.total,"Total Mendeley and CiteULike bookmarks",doiLink+"#savedHeader");$("#almSignPost").append(v)}var t=n.metrics.total+q.metrics.total;if(t>0){u="SHARES";if(t==1){u="SHARE"}v=i.makeSignPostLI(u,n.metrics.total+q.metrics.total,"Sum of Facebook and Twitter activity",doiLink+"#discussedHeader");$("#almSignPost").append(v)}$("#almSignPost").fadeIn(f)}};i.getArticleSummaries([d],e,g)}}function jumpToALMSection(){var c=$(location).attr("href");var d=c.indexOf("#");if(d==-1){return}var e=c.slice(d);verticalPosition=$(e).position().top;scrollTo(0,verticalPosition)}$(document).ready(onReadyALM);function onLoadALM(){var e=new $.fn.alm();var g=$("meta[name=citation_doi]").attr("content");var c=0;var j=0;var k=false;var f=false;var m=function(){return k&&f&&c==j};var l=function(){c++};var d=function(){j++;if(m()){jumpToALMSection()}};var i=function(){k=true;if(m()){jumpToALMSection()}};var h=function(){f=true;if(m()){jumpToALMSection()}};e.setMetricsTab(g,l,d,i);e.setChartData(g,"usage","chartSpinner",l,d,h)}function setALMSearchWidgets(k){for(a=0;a<k.length;a++){var m=k[a];var l=m.doi;var c=m.sources;var j,p,d,q,g,i,e,o,h,f;j=p=d=q=g=i=e=o=h=f=null;var n=[];for(var t=0;t<c.length;t++){n.push(c[t].name)}j=c[n.indexOf("scopus")];p=c[n.indexOf("citeulike")];o=c[n.indexOf("pubmed")];d=c[n.indexOf("counter")];q=c[n.indexOf("mendeley")];g=c[n.indexOf("crossref")];i=c[n.indexOf("wos")];e=c[n.indexOf("pmc")];h=c[n.indexOf("facebook")];f=c[n.indexOf("twitter")];var r=false;if(j.metrics.total>0||p.metrics.total>0||e.metrics.total+d.metrics.total>0||q.metrics.total>0||h.metrics.shares+f.metrics.total>0){r=true}if(r){confirmed_ids[confirmed_ids.length]=l;makeALMSearchWidget(l,j,p,d,q,g,i,e,o,h,f)}}confirmALMDataDisplayed()}function makeALMSearchWidget(l,k,o,c,p,f,h,d,n,g,e){var i=getSearchWidgetByDOI(l);var m=getMetricsURL(l);var j=$(i).fadeOut(250,function(){var q=$("<span></span>");q.addClass("almSearchWidget");buildWidgetText(q,m,k,o,c,p,f,h,d,n,g,e);$(i).html("");$(i).append(q);$(i).fadeIn(250)})}function buildWidgetText(r,q,d,o,m,j,f,h,t,c,e,l){var g=null;var u=t.metrics.total+m.metrics.total;var n=t.metrics.html+m.metrics.html;var s=t.metrics.pdf+m.metrics.pdf;var k=u-s-t.metrics.html-m.metrics.html;if(u>0){g=$("<a></a>").attr("href",q+"#usage").html("Views: "+u.format(0,".",",")).addClass("data");g.tooltip({delay:250,fade:250,top:-40,left:20,track:true,showURL:false,bodyHandler:function(){return'<span class="searchResultsTip">HTML: <b>'+n.format(0,".",",")+"</b>, PDF: <b>"+s.format(0,".",",")+"</b>, XML: <b>"+k.format(0,".",",")+"</b>, Grand Total: <b>"+u.format(0,".",",")+"</b></span>"}});r.append($("<span></span>").append(g))}else{r.appendChild($("<span></span>").addClass("no-data").html("Views: Not available"))}if(d.metrics.total>0){g=$("<a></a>").attr("href",q+"#citations").html("Citations: "+d.metrics.total.format(0,".",",")).addClass("data");g.tooltip({delay:250,fade:250,top:-40,left:20,track:true,showURL:false,bodyHandler:function(){var y=[f,c,h];var v=d.display_name+": <b>"+d.metrics.total.format(0,".",",")+"</b>";for(var w=0;w<y.length;w++){var x=y[w];if(x.metrics.total>0){v+=", "+x.display_name+": <b>"+x.metrics.total.format(0,".",",")+"</b>"}}return'<span class="searchResultsTip">'+v+"</span>"}});appendBullIfNeeded(r);r.append($("<span></span>").append(g))}else{appendBullIfNeeded(r);r.append($("<span></span>").html("Citations: None").addClass("no-data"))}var i=j.metrics.total+o.metrics.total;if(i>0){g=$("<a></a>").attr("href",q+"#other").html("Saves: "+i.format(0,".",",")).addClass("data");appendBullIfNeeded(r);g.tooltip({delay:250,fade:250,top:-40,left:20,track:true,showURL:false,bodyHandler:function(){var v="";if(j.metrics.total>0){v+=j.display_name+": <b>"+j.metrics.total.format(0,".",",")+"</b>"
}if(o.metrics.total>0){if(v!=""){v+=", "}v+=o.display_name+": <b>"+o.metrics.total.format(0,".",",")+"</b>"}return'<span class="searchResultsTip">'+v+"</span>"}});r.append($("<span></span>").append(g))}else{appendBullIfNeeded(r);r.append($("<span></span>").html("Saves: None").addClass("no-data"))}var p=e.metrics.shares+l.metrics.total;if(p>0){g=$("<a></a>").attr("href",q+"#other").html("Shares: "+p).addClass("data");appendBullIfNeeded(r);g.tooltip({delay:250,fade:250,top:-40,left:20,track:true,showURL:false,bodyHandler:function(){var v="";if(e.metrics.shares>0){v+=e.display_name+": <b>"+e.metrics.shares.format(0,".",",")+"</b>"}if(l.metrics.total>0){if(v!=""){v+=", "}v+=l.display_name+": <b>"+l.metrics.total.format(0,".",",")+"</b>"}return'<span class="searchResultsTip">'+v+"</span>"}});r.append($("<span></span>").append(g))}else{appendBullIfNeeded(r);r.append($("<span></span>").html("Shares: None").addClass("no-data"))}}function appendBullIfNeeded(c){if(c.size()>0){c.append("&nbsp;&bull;&nbsp;")}}function getSearchWidgetByDOI(c){return $("li[data-doi='"+c+"'] span.metrics")}function getMetricsURL(c){return $($("li[data-doi='"+c+"']")[0]).data("metricsurl")}function setALMSearchWidgetsError(){confirmALMDataDisplayed()}function makeALMSearchWidgetError(c,g){var d=getSearchWidgetByDOI(c);var e=d[0];var f=$("<span></span>");f.addClass("inlineError");f.css("display","none");f.html(g);$(e).find("span").fadeOut(250,function(){$(e).append(f);$(f).fadeIn(250)})}function confirmALMDataDisplayed(){if(confirmed_ids!=null){for(a=0;a<confirmed_ids.length;a++){for(b=0;b<ids.length;b++){if(confirmed_ids[a]==ids[b]){ids.remove(b)}}}}for(a=0;a<ids.length;a++){var c=$("li[data-doi='"+ids[a]+"']");var d=$(c[0]).data("pdate");if(d>((new Date().getTime())-172800000)){makeALMSearchWidgetError(ids[a],"Metrics unavailable for recently published articles. Please check back later.")}else{makeALMSearchWidgetError(ids[a],'<img src="../images/icon_error.png"/>&nbsp;Metrics unavailable. Please check back later.')}}};