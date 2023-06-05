var leftnavheight, flashtop;

// full text long titles popup
$(document).ready(function() {

	$('.long a').each(function() {
		// capture abbreviated title in memory
		var abbreviatedText = $(this).text();
		// replace abbreviated title with full title
		$(this).mouseover(function() {
			$(this).removeClass("clipped").addClass("full");
			$(this).text($(this).attr('title'));
		});
		// replace full title with abbreviated title
		$(this).mouseout(function() {
			$(this).removeClass("full").addClass("clipped");
			$(this).text(abbreviatedText);
		});
	})
	jQuery('#outline object').css({'position':'fixed'});	
	leftnavheight = jQuery('#outlinebox').height();
	window.onscroll = document.documentElement.onscroll = setMenuOffset; 
});

// move the outline box
function setMenuOffset() {
	//scrollHeight (cross-browser)
	var scroll = (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);//multi-browser
	var leftNavBox = jQuery("#outlinebox");//bloc a fixer/faire défiler
	var contentOffset = jQuery("#navbox").offset();//sert de repere pour le changement de position de leftnav

		
	if ((scroll+20) > contentOffset.top )//le "+20" represente la marge
	{
		leftNavBox.css({'position':'fixed','top':'20px'});
		flashtop = leftnavheight + 30;//30 = top of "leftnav list" + 10
	}
	else 
	{
		leftNavBox.css({'position':'absolute','top':''});
		flashtop = (jQuery('#outlinebox').offset().top - scroll) + jQuery('#outlinebox').height() + 10;
	}
	jQuery('#outline object').css({'top':flashtop+'px'});
}

function totext() {
	document.write("<a href='javascript:turn();'>Return to text</a>")
}