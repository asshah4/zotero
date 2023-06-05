/****************************************************/
/*  NOTE: Panel functions at the end of this file   */
/****************************************************/


$(document).ready(function () {
	var easyLoad = false;
	if ($.browser.msie && (parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8) && window.location.pathname.toLowerCase() == '/content.aspx')
		easyLoad = true;

	if (!isMobile) {


		if (!easyLoad) {
			//add last line class to article toolbox
			var toolBoxUl = $(".toolBox");
			var toolboxLength = $(toolBoxUl).find("ul li").length;
			$(toolBoxUl).find("ul li:eq(" + (toolboxLength - 1) + "),ul li:eq(" + (toolboxLength - 2) + ")").addClass("lastLI");
		}

		//filtering book sections
		$('#filterRelatedSections').click(function () {
			$('.filterTermsSection').toggle();
		});

		if (!easyLoad) {
			//the page loading multiple times was adding the function multiple times, so until the page load problem is fixed, remove before binding
			$('.filterLinkSection').unbind('click');

			$(".filterLinkSection").click(function () {
				$('.filterLinkSection').css("font-weight", "normal");
				$(this).css("font-weight", "bold");
				var id = $(this).attr('id');
				//alert(id);
				$("#divSectionContent").html('<img src="' + image.ajax_loader + '" alt="please wait" /> Loading content.');
				CallBackSections(id);
			});
		}

		//filtering articles
		$('#filterRelatedArticles').click(function () {
			$('.filterTermsArticle').toggle();
		});

		if (!easyLoad) {
			//the page loading multiple times was adding the function multiple times, so until the page load problem is fixed, remove before binding
			$('.filterLinkArticleJQ').unbind('click');

			$(".filterLinkArticleJQ").click(function () {
				$('.filterLinkArticleJQ').css("font-weight", "normal");
				$(this).css("font-weight", "bold");
				var id = $(this).attr('id');
				//alert(id);
				$("#divArticleContent").html('<img src="' + image.ajax_loader + '" alt="please wait" /> Loading content.');
				CallBackArticles(id);
			});


			$(".portletContainer").find(".portlet .portlet-content:empty").parent().hide();
		}
	} // end mobile view exception

});

/***************************************************************/
/* Removes the Portlet Column and enlarges the remaining       */
/* content div to container width                              */
/***************************************************************/
function removePanel(content, portlet, container) {
	container = (container != undefined) ? container : $(".mainContainer");
	portlet = (portlet != undefined) ? portlet : $(".portletColumn");
	content = (content != undefined) ? content : $(".contentColumn, .contentBodyContainer");
	$(portlet).css("display", "none");
	$(content).css('width', $(container).width() + 'px');
}
