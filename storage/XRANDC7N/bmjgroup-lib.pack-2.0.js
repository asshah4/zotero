$(function(){$('a').click(function(){var $a=$(this);var href=$a.attr('href');if(href.match(/^\/cgi\/powerpoint/)){href=href+".ppt";}
var hrefArray=href.split('.');var extension=hrefArray[hrefArray.length-1];var fileTypes=['doc','zip','xls','ppt','xml','pdf','mp3'];if((href.match(/^http/))&&(!href.match(document.domain))){var category='outgoing';var event='click';var label=href;pageTracker._trackEvent(category,event,href);}
if(href.match(/^mailto/)){var category='mailto';var event='click';var label=href;pageTracker._trackEvent(category,event,href);}
if($.inArray(extension,fileTypes)!=-1){pageTracker._trackEvent('download',extension,href);}});})
function populateElement(selector,defvalue){if($.trim($(selector).val())==""){$(selector).val(defvalue);}
$(selector).focus(function(){if($(selector).val()==defvalue){$(selector).val("");}});$(selector).blur(function(){if($.trim(jQuery(selector).val())==""){$(selector).val(defvalue);}});};function popUp(){$('A[rel="external"]').click(function(){window.open($(this).attr('href'),'','status=yes,scrollbars=yes,resizable=yes,width=700,height=550');return false;});}
function mediaplayer(media,player,autoplay){if(media=="video"){mtrack="Video";mdisplay=true;}
else{mtrack="Audio";mdisplay=false;}
if(!player){player="#player";}
if(autoplay){mauto=true;}
else{mauto=false;}
$(player).flowplayer("http://group.bmj.com/media/flowplayer/flowplayer-3.1.0.swf",{plugins:{controls:{fullscreen:mdisplay}},clip:{autoPlay:mauto,onBegin:function(clip){pageTracker._trackEvent("Video","Start",clip.url);},onResume:function(clip){pageTracker._trackEvent("Video","Resume",clip.url);},onPause:function(clip){pageTracker._trackEvent("Video","Pause",clip.url,parseInt(this.getTime()));},onStop:function(clip){pageTracker._trackEvent("Video","Stop",clip.url,parseInt(this.getTime()));},onFinish:function(clip){pageTracker._trackEvent("Video","Finish",clip.url);}}});}
function widget(options){var default_args={'url':"http://www.bmj.com/rss/recent.xml",'section':"none",'source':"no",'category':"all",'track':"widget_bmjblogs",'title':"Latest from BMJ",'subject':"all",'style':"bmj",'desc_len':"0",'display_source':"yes",'display_content':"no",'widget':"feeds-widget1",'jurl':"http://group.bmj.com/feed2json/index.php",'target':"_self",'podcastlogo':"http://group.bmj.com/repository/images/flowplayer-generic-image.jpg",'expandplayer':"no",'num_items':"5"}
this.default_args=default_args;this.options=options;for(var index in this.default_args){if(typeof this.options[index]=="undefined")
this.options[index]=this.default_args[index];}
$.ajax({url:this.options['jurl'],data:"url="+this.options['url']+"&desc_len="+this.options['desc_len']+"&subject="+this.options['subject']+"&category="+this.options['category']+"&widget_title="+this.options['widget_title']+"&style="+this.options['style']+"&source="+this.options['source']+"&display_content="+this.options['display_content']+"&display_source="+this.options['display_source']+"&track="+this.options['track']+"&target="+this.options['target']+"&num_items="+this.options['num_items']+"&section="+this.options['section']+"&enclink="+this.options['enclink']+"&enclength="+this.options['enclength']+"&encltype="+this.options['encltype']+"&podcastlogo="+this.options['podcastlogo']+"&expandplayer="+this.options['expandplayer']+"&widget="+this.options['widget']+"&callback=bmjcallback1",cache:true,dataType:"script",success:bmjcallback1=function(data){if(data){$('div#'+data.feedhead[0].widget).empty();$('div#'+data.feedhead[0].widget).append('<h2>'+data.feedhead[0].widget_title+'</h2>');$('div#'+data.feedhead[0].widget).addClass(data.feedhead[0].style);$('div#'+data.feedhead[0].widget).append('<ul class="StandardBullet">');$.each(data.items,function(i,item){if(i<data.feedhead[0].num_items){feed_html='<li class="rss-item">';if(item.source=="no"){if(item.section.length>0){feed_html+=' '+'<span class="sect1">'+item.section+':'+'</span>'+' ';}}
else{if((item.source!=undefined)&&(data.feedhead[0].display_source!="none")){feed_html+=' '+'<span class="sect1">'+item.source+':'+'</span>'+' ';}}
feed_html+=' '+'<span class="title1"><a href="'+item.link+'" target="'+data.feedhead[0].target+'">'+item.title+'<\/a>'+'</span>'+' ';if(item.date){feed_html+='<span class="date">'+"("+item.date+")"+'</span>';}
if(item.author){feed_html+='<span class="author">'+"("+item.author+")"+'</span>';}
if(data.feedhead[0].desc_len=="all"){feed_html+='<div class="feedDesc">'+item.description+'</div>';}
else
if(item.description!=""&&data.feedhead[0].desc_len>50){trunc=item.description.substring(0,data.feedhead[0].desc_len);trunc=trunc.replace(/\w+$/,'');feed_html+='<div class="feedDesc">'+trunc+'...</div>';if(data.feedhead[0].display_content=="yes"){ulink=item.link.match(/[^\?]+/);feed_html+='<div class="feedDesc" style="display: none">'+item.content+'<div class="postmetadata alt"><div class="category">Posted in <a rel="category tag" title="View all posts in Students" href="http://blogs.bmj.com/bmj/category/students/">Students</a>.</div><div class="email"><div class="button"><a rel="nofollow" title="Email This Post" href="'+ulink+'email/">Email This Post</a></div></div><div class="response"><div class="button"><a href="'+ulink+'#comments" class="response">Comments</a></div></div><div class="respond"><div class="button"><a href="'+ulink+'#respond" class="respond">Respond</a><p>&nbsp;</p></div></div></div></div><br/>';$(".title1 a").live("click",function(){$(this).parent().siblings('.feedDesc').toggle("slow");return false;});}}
if(item.encltype=="audio/mpeg"){feed_html+='<a class="player"  href="'+item.enclink+'"  style="display:block;width:155px;height:20px; margin-bottom:8px;"><img src="http://group.bmj.com/media/movies/Masterclasses/play_small.png" alt="BMJ podcast"/></a>';}
feed_html+='</li>';$('div#'+data.feedhead[0].widget+' ul').append(feed_html);}});$('div#'+data.feedhead[0].widget+' ul a.player').live("click",function(){flowplayer(this,"http://group.bmj.com/media/flowplayer/flowplayer-3.1.0.swf",{plugins:{controls:{play:true,volume:false,mute:false,time:true,stop:false,playlist:false,scrubber:true,fullscreen:true,bufferColor:'#006990',progressColor:'#009AF6',buttonColor:'#009AF6',buttonOverColor:'#FF00FF',tooltipColor:'#009AF6',height:20}},playlist:[{url:data.feedhead[0].podcastlogo,scaling:'orig'},{url:$(this).attr("href"),autoPlay:true,autoBuffering:false}],clip:{autoPlay:true,onBegin:function(clip){pageTracker._trackEvent("Audio","Start",clip.url);},onResume:function(clip){pageTracker._trackEvent("Audio","Resume",clip.url);},onPause:function(clip){pageTracker._trackEvent("Audio","Pause",clip.url,parseInt(this.getTime()));},onStop:function(clip){pageTracker._trackEvent("Audio","Stop",clip.url,parseInt(this.getTime()));},onFinish:function(clip){pageTracker._trackEvent("Audio","Finish",clip.url);}}});if(data.feedhead[0].expandplayer=="yes"){$(this).addClass("expandplayer");$("#"+data.feedhead[0].widget+" ul li a").click(function(){$(this).parents("li").siblings("li").children("a").removeClass("expandplayer");$(this).addClass("expandplayer");});}
$f(this).load();return false});}}});}
function tabbedwidget(options){var default_args={'url':"http://www.bmj.com/rss/recent.xml",'section':"none",'source':"no",'category':"all",'track':"widget_bmjblogs",'title':"Latest from BMJ",'subject':"all",'style':"bmj",'desc_len':"0",'display_source':"yes",'widget':"tabbed-widget",'jurl':"http://group.bmj.com/feed2json/index.php",'target':"_self",'num_items':"5"}
this.default_args=default_args;this.options=options;for(var index in this.default_args){if(typeof this.options[index]=="undefined")
this.options[index]=this.default_args[index];}
$.ajax({url:this.options['jurl'],data:"url="+this.options['url']+"&desc_len="+this.options['desc_len']+"&subject="+this.options['subject']+"&category="+this.options['category']+"&widget_title="+this.options['widget_title']+"&style="+this.options['style']+"&source="+this.options['source']+"&display_source="+this.options['display_source']+"&track="+this.options['track']+"&target="+this.options['target']+"&num_items="+this.options['num_items']+"&section="+this.options['section']+"&enclink="+this.options['enclink']+"&enclength="+this.options['enclength']+"&encltype="+this.options['encltype']+"&widget="+this.options['widget']+"&callback=bmjcallback3",cache:true,dataType:"script",success:bmjcallback3=function(data){if(data){if(options.wbox==1){$('div#tabbed-widget').addClass(data.feedhead[0].style);$('div#'+data.feedhead[0].widget).empty();$('div#'+data.feedhead[0].widget).append('<ul class="StandardBullet">');$.each(data.items,function(i,item){if(i<data.feedhead[0].num_items){feed_html='<li class="rss-item">';if(item.source=="none"||item.source=="undefined"||item.source=="none"||item.source=="no"){if(item.section.length>0){feed_html+=' '+'<span class="sect1">'+item.section+':'+'</span>'+' ';}}
else{if((item.source!=undefined)&&(data.feedhead[0].display_source!="none")){feed_html+=' '+'<span class="sect1">'+item.source+':'+'</span>'+' ';}}
feed_html+=' '+'<span class="title1"><a href="'+item.link+'" target="'+data.feedhead[0].target+'">'+item.title+'<\/a>'+'</span>'+' ';if(item.date){feed_html+='<span class="date">'+"("+item.date+")"+'</span>';}
if(item.author){feed_html+='<span class="author">'+"("+item.author+")"+'</span>';}
if(data.feedhead[0].desc_len=="all"){feed_html+='<div class="feedDesc">'+item.description+'</div>';}
else if(item.description!=""&&data.feedhead[0].desc_len>50){trunc=item.description.substring(0,data.feedhead[0].desc_len);trunc=trunc.replace(/\w+$/,'');feed_html+='<div class="feedDesc">'+trunc+'...</div>';}
if(item.encltype=="audio/mpeg"){feed_html+='<br/><a class="player"  href="'+item.enclink+'"  style="display:block;width:155px;height:26px;"><img src="http://group.bmj.com/media/movies/Masterclasses/play_small.png" alt="BMJ podcast"/></a>';}
feed_html+='</li>';$('div#'+data.feedhead[0].widget+' ul.StandardBullet').append(feed_html);}});}
else{$('div#'+data.feedhead[0].widget).empty();$('div#'+data.feedhead[0].widget).addClass(data.feedhead[0].style);$('div#'+data.feedhead[0].widget).append('<div class="latestbox1">');$('div#'+data.feedhead[0].widget).append('<div class="latestbox2">');$.each(data.items,function(i,item){if(i<data.feedhead[0].num_items){feed_html='<div class="feeditem">';if(item.source=="none"||item.source=="undefined"||item.source=="none"||item.source=="no"){if(item.section.length>0){feed_html+=' '+'<span class="sect1">'+item.section+':'+'</span>'+' ';}}
else{if((item.source!=undefined)&&(data.feedhead[0].display_source!="none")){feed_html+=' '+'<span class="sect1">'+item.source+':'+'</span>'+' ';}}
feed_html+=' '+'<span class="title1"><a href="'+item.link+'" target="'+data.feedhead[0].target+'">'+item.title+'<\/a>'+'</span>'+' ';if(item.date){feed_html+='<span class="date">'+"("+item.date+")"+'</span>';}
if(item.author){feed_html+='<span class="author">'+"("+item.author+")"+'</span>';}
if(data.feedhead[0].desc_len=="all"){feed_html+='<div class="feedDesc">'+item.description+'</div>';}
else if(item.description!=""&&data.feedhead[0].desc_len>50){trunc=item.description.substring(0,data.feedhead[0].desc_len);trunc=trunc.replace(/\w+$/,'');feed_html+='<div class="feedDesc">'+trunc+'...</div>';}
if(item.encltype=="audio/mpeg"){feed_html+='<br/><a class="player"  href="'+item.enclink+'"><img src="http://group.bmj.com/media/movies/Masterclasses/play_small.png" alt="BMJ podcast"/></a>';}
feed_html+='</div>';if(i<10){$('div#'+data.feedhead[0].widget+' div.latestbox1').append(feed_html);}
else{$('div#'+data.feedhead[0].widget+' div.latestbox2').append(feed_html);}}});}
$('div#'+data.feedhead[0].widget+' ul a.player').live("click",function(){flowplayer(this,"http://group.bmj.com/media/flowplayer/flowplayer-3.1.0.swf",{plugins:{controls:{play:true,volume:false,mute:false,time:true,stop:false,playlist:false,scrubber:true,bottom:4,fullscreen:false,width:155,height:60}},clip:{autoPlay:true,onStart:function(clip){pageTracker._trackEvent("Audio","Play",clip.url);},onPause:function(clip){pageTracker._trackEvent("Audio","Pause",clip.url,parseInt(this.getTime()));},onStop:function(clip){pageTracker._trackEvent("Audio","Stop",clip.url,parseInt(this.getTime()));},onFinish:function(clip){pageTracker._trackEvent("Audio","Finish",clip.url);}}});$f(this).load();return false});}}});}