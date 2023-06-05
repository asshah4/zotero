﻿$(document).ready(function(){$('#showPricing').click(function(e){e.preventDefault();var url=$(this).attr('href');if(url.indexOf('#')==0){$(url).modal('open');}else{$.get(url,function(data){$('<div class="modal hide fade">'+data+'</div>').modal();}).success(function(){$('input:text:visible:first').focus();});}});$(".articleselection").click(function(){var checker=$(this).is(':checked');$.ajax({url:'/Article/GetCheckBoxArtikelAsync',data:"nr="+$(this).val()+"&checked="+$(this).is(':checked'),success:function(data){$('#selectionInfoNr').html(data);$('#selectionInfoText').html(data>1?"items":"item");if(checker){new PNotify({title:'Perfect!',text:'<p>The item has been added to your reading list.</p><p><a href="/MyKarger/MySelection" class="btn btn-success"><i class="fa fa-bookmark"></i> Go to my reading list</a></p>',type:'success'});}else{new PNotify({title:'Removed!',text:'<p>The item has been removed from to your reading list.</p>',type:'success'});}},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});});$("#loginMe").click(function(){$("#loginB").slideToggle("slow");});$("a[data-tab-destination]").on('click',function(){var tab=$(this).attr('data-tab-destination');$("#"+tab).click();});$('nav#menu').mmenu({position:'right'});$("a[data-toggle=popover]").popover({html:true,animation:true}).click(function(e){e.preventDefault()})
$('.accessSubscription').each(function(i,obj){var $this=$(this);$this.hide();$.ajax({url:'/Async/ShowAboInfo',data:"nr="+$(this).attr('id'),success:function(data){if(data){$this.show();}}});});$(".clickableRow").click(function(){window.document.location=$(this).attr("href");});$('.divAjax').each(function(i,obj){var $this=$(this);var curl=$this.attr("loadUrl");$.ajax({url:curl,cache:true,success:function(data){$this.html(data);}});});$('#search').on('click','.dropdown-menu li',function(event){var $target=$(event.currentTarget);$target.closest('.btn-group').find('[data-bind="label"]').text($target.text()).end().children('.dropdown-toggle').dropdown('toggle');return false;});cbpHorizontalMenu.init();$('#myModal').modal({keyboard:true,show:false});image_resize();$(".fulltextimg").colorbox({});$(".imagebox").colorbox({photo:true});$(".inlineText").colorbox({inline:true,width:"50%"});$('.btn-navbar').click(function(){$('.nav-collapse').removeClass('in').css('height','0');});$("#mobiledeactivate").click(function(){$.cookie('mobile','true',{expires:7,path:'/'});window.setTimeout('location.reload()',100);});$("#activatemobile").click(function(){$.removeCookie('mobile',{path:'/'});window.setTimeout('location.reload()',100);});$(".pane h2").click(function(){$(this).next("div").toggleClass("active");$(this).toggleClass("active");$(this).siblings("h2").removeClass("active");});$(".pane h4").click(function(){$(this).next("div").toggleClass("active");$(this).toggleClass("active");$(this).siblings("h4").removeClass("active");});$(".pane2 h2").click(function(){$(this).next(".panehide").toggleClass("active");$(this).toggleClass("active");$(this).siblings("h2").removeClass("active");});$(".pane h3").click(function(){$(this).next("p").toggleClass("active");$(this).toggleClass("active");$(this).siblings("h3").removeClass("active");});$('[rel=tooltip]').tooltip();$("#btnPrint").click(function(){printElement(document.getElementById("printThis"));});});$('.collapse').collapse({active:false});$('#mobnav-btn').click(function(){$('.produkt-menu').toggleClass("xactive");});$('.mobnav-subarrow').click(function(){$(this).parent().toggleClass("xpopdrop");});function printElement(elem){var domClone=elem.cloneNode(true);var $printSection=document.getElementById("printSection");if(!$printSection){var $printSection=document.createElement("div");$printSection.id="printSection";document.body.appendChild($printSection);}
$printSection.innerHTML="";$printSection.appendChild(domClone);window.print();}
function OpenKargerHelp(newin){$.colorbox({href:newin,height:"500px",width:"600px"});}
function str_replace(haystack,needle,replacement){var temp=haystack.split(needle);return temp.join(replacement);}
function showNotificationBar(message,duration,bgColor,txtColor,height){duration=typeof duration!=='undefined'?duration:2500;bgColor=typeof bgColor!=='undefined'?bgColor:"#92D3C8";txtColor=typeof txtColor!=='undefined'?txtColor:"#096B1E";height=typeof height!=='undefined'?height:40;if($('#notification-bar').size()==0){var HTMLmessage="<div class='notification-message' style='text-align:center; line-height: "+height+"px;'> "+message+" </div>";$('body').prepend("<div id='notification-bar' style='display:none; width:100%; height:"+height+"px; background-color: "+bgColor+"; position: fixed; z-index: 100; color: "+txtColor+";border-bottom: 1px solid "+txtColor+";'>"+HTMLmessage+"</div>");}
$('#notification-bar').slideDown(function(){setTimeout(function(){$('#notification-bar').slideUp(function(){});},duration);});}
$('body').on('click',function(e){$('[data-toggle="popover"]').each(function(){if(!$(this).is(e.target)&&$(this).has(e.target).length===0&&$('.popover').has(e.target).length===0){$(this).popover('hide');}});});function selectRadio(d){document.getElementById(d).checked=true;}
$('#search input').keydown(function(e){if(e.keyCode==13){$('#search').submit();}});function image_resize(){$("#fulltext img").each(function(){var maxWidth=499;var maxHeight=500;var ratio=0;var width=$(this).width();var height=$(this).height();if(width>maxWidth){$(this).attr({href:this.src,'class':"imagebox"});$(this).css('cursor','pointer');}
if(width>maxWidth){ratio=(maxWidth/width);$(this).attr({width:maxWidth,height:(height*ratio),'class':"imagebox",href:this.src});$(this).css('cursor','pointer');height=(height*ratio);width=(width*ratio);}});}
function addToRL(id){$.ajax({url:'/Article/GetCheckBoxArtikelAsync',data:"nr="+id+"&checked=true",success:function(data){$('#selectionInfoNr').html(data);$('#selectionInfoText').html(data>1?"items":"item");new PNotify({title:'Perfect!',text:'<p>The item has been added to your reading list.</p><p><a href="/MyKarger/MySelection" class="btn btn-success"><i class="fa fa-bookmark"></i> Go to my reading list</a></p>',type:'success'});},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});}
$(".articlecartselection").click(function(){var checker=$(this).is(':checked');$.ajax({url:'/WebShop/SwitchCartArtikelAsync',data:"nr="+$(this).val()+"&checked="+$(this).is(':checked'),success:function(data){$('#cartInfoNr').html(data);$('#cartInfoText').html(data>1?"items":"item");if(checker){new PNotify({title:'Perfect!',text:'<p>The item has been added to your cart.</p><p><a href="/MyKarger/MyCart" class="btn btn-success"><i class="fa fa-shopping-cart"></i> Go to my cart</a></p>',type:'success'});}else{new PNotify({title:'Removed!',text:'<p>The item has been removed from to your cart.</p>',type:'success'});}},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});});function addToCart(id){$.ajax({url:'/WebShop/SwitchCartArtikelAsync',data:"nr="+id+"&checked=true",success:function(data){$('#cartInfoNr').html(data);$('#cartInfoText').html(data>1?"items":"item");new PNotify({title:'Perfect!',text:'<p>The item has been added to your cart.</p><p><a href="/MyKarger/MyCart" class="btn btn-success"><i class="fa fa-shopping-cart"></i> Go to my cart</a></p>',type:'success'});},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});}
function removeFromCart(id){$.ajax({url:'/Article/GetCartArtikelAsync',data:"nr="+id+"&checked=false",success:function(data){$('#cartInfoNr').html(data);$('#cartInfoText').html(data>1?"items":"item");},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});}
function addBookToCart(id){$.ajax({url:'/WebShop/AddProductToCartAsync',data:"nr="+id,success:function(data){$('#cartInfoNr').html(data);$('#cartInfoText').html(data>1?"items":"item");new PNotify({title:'Perfect!',text:'<p>The item has been added to your cart.</p><p><a href="/MyKarger/MyCart" class="btn btn-success"><i class="fa fa-shopping-cart"></i> Go to my cart</a></p>',type:'success'});;},error:function(jqXHR,textStatus,errorThrown){alert(jqXHR);alert(textStatus);alert(errorThrown);}});}