$(document).ready(function() {

$('.hw-pub-sertitle-fasttrack').each(function(){
var selectedTagForIcon = $(this);
selectedTagForIcon.empty();
var whichGif = '/resource/image/fasttrack.png';
selectedTagForIcon.before('<img class="sertitle-gif-by-js" src="' + whichGif + '" \/>');
});

$('.sub-article-title').each(function(){
var selectedTagForBullet = $(this);
var whichBullet = '/publisher/img/bullet.gif';
selectedTagForBullet.before('<img class="sub-article-title-bullet-js" src="' + whichBullet + '" \/>');
});

var MathTocClass =  $('.math-toc').text();

if (MathTocClass.length) {
$('ol.results-cit-list').addClass('math-toc');
}


 $('#site-breadcrumbs').each(function(){
 var selectedTagForBreadcrumbs = $(this);
 var emptyBreadcrumbLi = selectedTagForBreadcrumbs.children("li:empty");
 emptyBreadcrumbLi.addClass('empty');
 });

 $('.breadcrumb_subjects:not(:last)').each(function(){
 var selectedTagForBreadcrumbs = $(this);
 selectedTagForBreadcrumbs.append(document.createTextNode(' & '));
 });

 $('#pageid-pap-bycustom').each(function(){
 var selectedTagForMessage = $('#pap-header');
 var selectedTagForTest = $('.cit-metadata');

 if (!(selectedTagForTest.length))
 {
 selectedTagForMessage.append('There are currently no articles with special topics.');
 }
 });

 gSiteOptions.suppressDockedSearchNav=false;

});


