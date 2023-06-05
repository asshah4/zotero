if(!$("html").hasClass("js_en")){$("html").addClass("js_en")
}var proxied=((location.hostname.indexOf("onlinelibrary.wiley.com")!=-1)&&(location.hostname.substring(location.hostname.indexOf("onlinelibrary.wiley.com")+23)==""))?false:true;
$(function(){$.ol={};
$(".publicationTypes #allTypes,.subjectsAndAccess #allTopics, #allAsist").searchSelectAll();
$(document).globalMessaging();
if($("#accordion").length>0){$("#accordion").accordion({header:"h2"})
}$(".contextTrigger").contextFilter();
$("#additionalInformation").slider();
$("#login #loggedIn .profile>li").profileMenu();
$("#issueTocGroups, #titles, #publications, .articles, .books").selectAll();
$(".emrw-table").mrwTables();
$(".jumpList").jumpList();
$("#loginEmail, #loginPassword").loginLabels();
if($("#pdf").length){$(window).resize(function(){$("#pdf").children("iframe").height(($(window).height()-$("#pdfHeader").height())-2)
});
$(window).triggerHandler("resize")
}if($(".jumpLinks").length>0){$(".jumpLinks").change(function(){window.location.hash=$(this).attr("value")
})
}if(!$("#mailUpdates").attr("checked")){$("#mailUpdates").parents("fieldset").next().slideUp()
}$("#mailUpdates").click(function(){if($(this).attr("checked")){$(this).parents("fieldset").next().slideDown()
}else{$(this).parents("fieldset").next().slideUp()
}});
!proxied&&$(".issuesInYear").issueTree();
$("#browseBySubject").subjectTree();
$("#globalMenu ul li:nth-child(3)").addResourceMenu();
$.ol.cleanAJAXResponse=function(a){if(a.indexOf("<body>")>-1){return/<body[^>]*>([\S\s]*?)<\/body>/.exec(a,"ig")[1]
}else{return a
}};
if(!$("#mailPromotionRequested").attr("checked")){$("#mailPromotionRequested").parents("fieldset").next().hide()
}$("#mailPromotionRequested").click(function(){if($(this).attr("checked")){$(this).parents("fieldset").next("fieldset").slideDown()
}else{$(this).parents("fieldset").next("fieldset").slideUp()
}return true
});
$.ol.textSlider=function(b,e,d){var f=0,a=0,c=0;
$(b+" p").each(function(g){f+=$(this).text().length;
if(f>e){if(a==0){c=e-$(this).prev("p").text().length;
a=$(this).text().slice(0,c);
$("<p style='"+$(this).attr("style")+'\'><span id="paragraphFragment">'+a+'&hellip;</span> <a href="#" id="showAboutThisBook">'+d[0]+"</a></p>").appendTo(b);
$("#showAboutThisBook").toggle(function(){$("#paragraphFragment").parent().slideUp(500,function(){$("#showAboutThisBook").css({marginLeft:"0.5em"}).text(d[1]);
$("#allParagraphs").slideDown(500)
});
$("#showAboutThisBook").appendTo("#allParagraphs p:last");
return false
},function(){$("#allParagraphs").slideUp(500,function(){$("#showAboutThisBook").appendTo("#paragraphFragment").text(d[0]).show();
$("#paragraphFragment").parent().slideDown(500)
});
return false
})
}if($("#allParagraphs").length==0){$('<div id="allParagraphs"></div>').appendTo(b)
}$(this).appendTo("#allParagraphs")
}else{$(this).show()
}})
};
$.ol.textSlider("#bookHome #homepageContent",200,["More about this book summary","Less about this book summary"]);
$.ol.textSlider("#bookHomeSeries #homepageContent",200,["More about this book series","Less about this book series"]);
if($("#mrwHome").length>0){$.ol.textSlider("#mrwHome #homepageContent:has(~ #rightColumn, ~ #leftColumn)",200,["More about this book","Less about this book"])
}($.ol.keyStrokeCollector=function(){$(document).keydown(function(b){var a={ctrl:(b.ctrlKey)?true:false,shift:(b.shiftKey)?true:false,alt:(b.altKey)?true:false,key:b.keyCode};
$(this).data("keyDown",a)
});
$(document).keyup(function(a){$(this).removeData("keyDown")
})
})();
$.ol.Tree=function(c,a){this.branches=[];
this.selector=a||c;
var b=this.params={};
$.each($.extend({},$.ol.Tree.defaults,(arguments.length==1)?{}:c),function(e,d){b[e]=d
});
this.init()
};
$.extend($.ol.Tree.prototype,{init:function(){var a=this;
if(!this.params.ajax){$(this.selector).find("li > span").each(function(){var e=$(this).removeAttr("class").wrap('<a href="#"></a>').parents("a").addClass("branchLabel").addClass("open");
a.branches.push(new $.ol.Tree.Branch(e))
});
this.collapseAll()
}else{$(this.selector).find("li > a.branchLabel").each(function(){$(this).click(function(){var f=this,e=$(this).next("ol");
if(e&&e.css("display")=="block"){e.slideUp(function(){$(f).removeClass("open").addClass("closed")
})
}else{if(e&&e.css("display")=="none"){e.slideDown(function(){$(f).removeClass("closed").addClass("open")
})
}else{$.ajax({type:"GET",url:$(f).attr("href"),dataType:"html",dataFilter:function(h,g){return $.ol.cleanAJAXResponse(h)
},beforeSend:function(){$(f).removeClass("closed").addClass("fetching")
},success:function(g){$(f).after($(g).css("display","none"));
$(f).next("ol").slideDown(function(){$(f).removeClass("fetching").addClass("open")
});
$(f).next("ol").mrwTree({ajax:true})
},error:function(g,h,i){$(f).removeClass("fetching").addClass("closed")
}})
}}return false
})
})
}if($(this.selector).find("li > span:first").length){if(this.params.expandAll||this.params.collapseAll){var c=$('<ul class="productMenu"></ul>').prependTo($(this.selector).parent())
}if(this.params.expandAll){var d=$("<li/>").appendTo(c);
$('<a href="#">Expand All</a>').appendTo(d).click(function(){return a.expandAll()
})
}if(this.params.collapseAll){var b=$("<li/>").appendTo(c);
$('<a href="#" id="collapseAll">Collapse All</a>').appendTo(b).click(function(){return a.collapseAll()
})
}}},expandAll:function(){$.each(this.branches,function(){this.expandStep.apply(this.selector,[])
});
return false
},collapseAll:function(){if(this.branches.length!=0){$.each(this.branches,function(){this.collapse.apply(this.selector,[])
})
}else{$(this.selector).find("li > a.open").removeClass("open").addClass("closed").next("ol").slideUp()
}return false
}});
$.ol.Tree.defaults={expandAll:false,collapseAll:false,ajax:false};
$.ol.Tree.Branch=function(a){this.selector=a;
this.init()
};
$.extend($.ol.Tree.Branch.prototype,{init:function(){var a=this;
$(this.selector).click(function(){if($(this).hasClass("closed")){a.expand.apply(this,[])
}else{a.collapse.apply(this,[])
}return false
})
},expand:function(a){$.ol.Tree.Branch.prototype.expandStep.apply(this,[]);
if(a){$(this).parent().find("a:has(span)").each(function(){$.ol.Tree.Branch.prototype.expandStep.apply(this,[])
})
}},expandStep:function(){$(this).removeClass("closed").addClass("open").next("ol").slideDown()
},collapse:function(a){$(this).removeClass("open").addClass("closed").next("ol").slideUp()
}});
$.fn.mrwTree=function(a){return this.each(function(){new $.ol.Tree(a,this)
})
};
!proxied&&$("#mrwBrowseByTopic #browseMrw").mrwTree({ajax:true,collapseAll:true});
$("#mrwBrowseByTOC #browseMrw").mrwTree({expandAll:true,collapseAll:true});
$(".decisionTree").dynamicSelectGroup();
if($("#searchByCitation").length){$("#scope").append('<option value="byCitation">By Citation</option>');
$("#scope").change(function(){if($(this).find("option:selected").text()=="By Citation"){$("#searchByCitation").slideDown(function(){$("#searchText, #searchSiteSubmit").attr("disabled","disabled")
})
}else{$("#searchByCitation").slideUp(function(){$("#searchText, #searchSiteSubmit").removeAttr("disabled")
})
}});
$("#searchByCitation p.error").length&&$("#scope").val("byCitation").triggerHandler("change")
}$("#resourcesMenu").parents("li").hover(function(){$("#resourcesMenu").toggle()
});
$("#resourcesMenu ul").bgiframe({top:20});
$("#issueToc .figZoom img").load(function(){$(this).css("visibility","visible");
if($(this).height()>300){$(this).height(300)
}if($(this).width()>300){$(this).css("float","none")
}}).each(function(){if(this.complete||(jQuery.browser.msie&&parseInt(jQuery.browser.version)==6)){$(this).triggerHandler("load")
}});
$("#fulltext .firstPageContainer img").load(function(){$(this).removeAttr("height").removeAttr("width");
if($(this).width()>752){$(this).width(752)
}}).each(function(){if(this.complete||(jQuery.browser.msie&&parseInt(jQuery.browser.version)==6)){$(this).triggerHandler("load")
}})
});