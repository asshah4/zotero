
var atab = jQuery.url().param('atab'); //tab mode
if (atab == undefined || atab == '0')
	atab = '1';

$(document).ready(function () {
    questionHash = (window.location.hash);
    // Find only the things after the '#' if we have #q in the querystring
    questionHashNumber = questionHash.indexOf('#q');
    // Store the parts after '#' and store in variable
    questionHashFinal = questionHash.substring(questionHashNumber + 1);
    // Select the anchor on the page with name = variable
    var something = $('a[name="' + questionHashFinal + '"]')
    // Add class to next item in DOM to highlight it
    $(something).next().addClass('highlighted');

	// temp fix to solve IE7/IE8 performance issue
	var easyLoad = false;
	if ($.browser.msie && (parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8) && window.location.pathname.toLowerCase() == '/content.aspx')
		easyLoad = true;

	/*************************/
	/*     content tabs      */
	/*************************/
	var $contentContainers = $("div.contentContainer")
	$($contentContainers).hide(); //Hide all content containers

	var $contentSectionTab = $($contentContainers).find('.contentSectionTab')

	var $tabNav = $(".tabNav")[0]; // tab container only one
	var $tabNavLinks = $($tabNav).find("div a");
	var $scm6MainContent_NonMember = $("#scm6MainContent_NonMember");

	//grabs tab id from url if present and displays that tab
	$($tabNav).find(".atab:nth-child(" + atab + ") a").addClass("selected").show(); //Activate tab
	$("#tab" + atab).show(); //Show active tab content
	if (atab == "7")
		$($scm6MainContent_NonMember).hide();

	//On Click Event
	$($tabNavLinks).click(function (e) {
		e.preventDefault();
		$($tabNavLinks).removeClass("selected"); //Remove any "active" class
		$(this).addClass("selected"); //Add "active" class to selected tab
		$($contentContainers).hide(); //Hide all tab content

		var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).show(); //show the active ID content

		if (activeTab != "#tab1")
			$($scm6MainContent_NonMember).hide();
		else
			$($scm6MainContent_NonMember).show();

		// find column heights of content and sidebar and adjust
		equalHeight($(".eqColumn"));
		return false;
	});


	if (!easyLoad) {
		$($contentSectionTab).each(function () {
			//cleans the contentSectionTab if it has no section jumpLinks
			var bool = ($(this).find('.contentJumpLinks').length > 0) ? true : false;
			if (bool == false) {
				$(this).css({ 'border': 'none', 'margin-top': '0px', 'padding-bottom': '0px' });
			}
		});
	}

	/*************************/
	/*    isAuthenticated    */
	/*************************/
	if (isAuthenticated) { // check to see if user is authenticated

		/*************************/
		/* submit a comment link */
		/*************************/
		$('.submitcomment').eq(0).click(function () {
			$($contentContainers).hide();
			$($tabNavLinks).removeClass("selected");
			$($tabNav).find(".atab:nth-child(9) a").addClass("selected").show();
			$("#tab9").show();
		});

		/**********************/
		/*  save to myStuff   */
		/**********************/
		$('.saveMyStuff').click(function () {
			if (previewMode) {
				alert('Saving is disabled in preview mode.');
			} else {
				var _id = this.id;
				AddItemstoMyStuff(_id);
			}
		});

	} else {
		if (!easyLoad)
			$('.nonMemberSectionTab').find('.contentJump').css('border', 'none');

	}

	/************************************/
	/*Text Size Enlarger of Content Page*/
	/************************************/
	$('#text0,#text1,#text2,#text3').live("click", function () {
		$(this).addClass('selected').siblings().removeClass('selected');
		var size = "11px";
		var textSelected = false;
		switch ($(this).attr("id")) {
			case "text0":
				textSelected = true;
				break;
			case "text2":
				size = "12px";
				break;
			case "text3":
				size = "15px";
				break;
		}

		if (textSelected == false)
			$(this).addClass('selected').siblings().removeClass('selected');
		else
			$('#text1').addClass('selected').siblings().removeClass('selected');

		var $contentBody = $('.contentBody');

		//$('.contentBody').css('font-size', size).children().css('font-size', size);
		//To change all text enlarge [PA-504]
		$('.contentBody').find("div").css('font-size', size).children().css('font-size', size);
		$('.paragraphSection').css('font-size', size);
		equalHeight($(".eqColumn").eq(0));
	});
	
	if (!isMobile && !easyLoad) {

		var journalName = $('.contentHeaderContainer').eq(0).children('.journalName').text();

		//Work-around to remove (.) in refRow; which was breaking the line
		if (journalName == 'NP') {
			$('.refContainer').eq(0).find('.refRow').each(function () {
				var refNum = $(this).children('.refNumber');
				var refContent = $(this).children('.refContent');
				var clearAll = $(this).children('.clearAll');

				$(this).empty();
				$(this).append(refNum);
				$(this).append(refContent);
				$(this).append(clearAll);
			});
		}

		//enabled to jump from popup to particular sections of article tab, even they are in another tab, esp figure tab and table tab

		var $tableContainer = $('.tableContainer');

		$($tableContainer).find('a').click(function () {
			var currentAnchor = $(this);
			var myname;
			var bool = false;

			$($tableContainer).find('a').each(function () {
				myname = '#' + $(this).attr('name');
				if ($(currentAnchor).attr('href') == myname) {
					bool = true;
					return;
				}
			});

			if (bool == false) {
				var tabledialog = $(this).parents('.tableDialog');
				$($tableContainer).hide();
				$($tabNavLinks).removeClass("selected"); //Remove any "active" class
				$($tabNav).find(".atab:nth-child(1) a").addClass("selected").show(); //Activate first tab
				$("#tab1").show();
				$(tabledialog).dialog('close');
			}
		});

		if (isAuthenticated) { // check to see if user is authenticated

			growTextarea($(".copyPaste"));

			$($contentSectionTab).eq(0).css('border-top', 'none');

			$($contentSectionTab).find('.contentJump:first').css('border-top', 'solid #ffffff 0px');

			//Hide jumplinks if epigrahSection is parentSection
			//if ($('.epigraphSection').parents('.contentBody').siblings('.contentJump').find('h2').text() == '') {
			//  $('.epigraphSection').parents('.contentBody').siblings('.contentJump').css({ 'display': 'none' });
			//}

			$($contentSectionTab).each(function () {
				if ($(this).find('h2').text() == '') {
					$(this).find('.contentJump').remove().css({ 'border': 'none', 'margin-top': '0px' });
				}
			});

		} else {
			//Disable Enlarge Image Behavior for non-authenticated users
			//Hides all the figureLinks if user is not authenticated
			var isFreeView = ($("#articleAuthenticationDetection").text() == "1") ? true : false; // check if user is authenticated
			if (!isFreeView) {
				if (journalName != 'NP') {
					$('.figureSection, .tableSection').find('.contentFigures, .enlargeImage').unbind('click');
					$('.figureSection').find('.enlargeImage').hide();

					//Hides the FigureLinks
					//$('.figureSection, .tableSection').find('.figureLinks').hide();
				}
			}
		}

	} // end mobile exception
});

var postURL = "";

function getArticleId() {
	var id;

	try {
		id = parseInt($get('hfArticleId').value);
		postURL = "../article.aspx/AddItemstoMyStuff";
	}
	catch (e) {
		id = parseInt($get('hfSectionId').value);
		postURL = "../content.aspx/AddItemstoMyStuff";
	}

	return id;
}

function openPopupWindow(url) {
	var w = 650;
	var h = 350;
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	var popupParms = ',top=' + top + ',left=' + left;
	window.open(url, "mywindow", "menubar=0,resizable=1,width=800,height=450" + popupParms);
}

function addtoMyStuffs(obj) {

	/*
	Tasks: TE-1216/1217
	For Figures and Tables - Add To My POL Links
	Personal User must be logged in to be able to add Figures or Tables to My POL.
	Redirect User to SignIn Popup page if Personal User is not logged in.
	*/
	var isPersonalUserLoggedIn = $get('hfPersonalUserLoggedIn').value;
	var redirectURL = $get('hfRedirectURLForMyPOLFiguresAndTables').value;

	if (isPersonalUserLoggedIn == "1") {
		AddItemstoMyStuff(obj.id, getArticleId());
	}
	else {
		openPopupWindow(redirectURL);
	}
}

function MyStuff(sectionId, articleId) {
	this.SectionID = sectionId;
	this.ArticleID = articleId;
}

MyStuff.prototype.toJson = function() {
	return JSON.stringify(this);
};

function AddItemstoMyStuff(sectionId, articleId) {
	var mystuff = new MyStuff(sectionId, articleId);

	$.ajax(
                {
                	type: "POST",
                	url: postURL,
                	data: mystuff.toJson(),
                	contentType: "application/json; charset=utf-8",
                	dataType: "json",
                	processData: false,

                	success:
                    function (d) {
                    	if (d.d[1].length > 0)
                    		location.href = d.d[1];
                    	else
                    		alert("Item successfully added to My POL");
                    },
                	error: function (c) { alert(c.status + ' ' + c.statusText); }
                }
            );
}

function DsmVTableRef(sectionId, anchorId) {
	this.sectionId = sectionId;
	this.anchorId = anchorId;
}

DsmVTableRef.prototype.toJson = function() {
	return JSON.stringify(this);
};

function GetReferenceLink(sectionId, anchorId) {
	var refLink = new DsmVTableRef(sectionId, anchorId);

	$.ajax(
                {
                	type: "POST",
                	url: "/content.aspx/GetReferenceLink",
                	data: refLink.toJson(),
                	contentType: "application/json; charset=utf-8",
                	dataType: "json",
                	processData: false,

                	success:
                    function (d) {
                    	if (d.d[1].length > 0)
                    		location.href = d.d[1];
                    },
                	error: function (c) { alert('Failed to get URL - ' + c.status + ' ' + c.statusText); }
                }
            );
}

function growTextarea(selector) {
	if ($(selector).val() != undefined) {
		var lines = $(selector).val().split('\n');
		var width = 40;
		var height = 1;
		for (var i = 0; i < lines.length; i++) {
			var linelength = lines[i].length;
			if (linelength >= width) {
				height += Math.ceil(linelength / width);
			}
		}
		height += lines.length;
		$(selector).attr("rows", height);
	}
}


function pullTablesFromContent() {
	var $targetContainer = $('#tab3');

	// only popuplate it when empty
	if ($targetContainer.html())
		return

	// KRH- from what I can tell, only use the tables that are direct children of div.contentSection, and are div.contentBody.figureSection or div.contentBody.tableSection
    // if they are children of a box section then we aren't using them.

	var pullHtml = '';
	$('#tab1').find('div.contentSection').children('div.contentBody.figureSection, div.contentBody.tableSection').has('a.popUpTable').each(function () {
		pullHtml = pullHtml + $(this).clone().wrap('<div>').parent().html();
    });

    // add anything that isn't a child of a boxSection, but at a depth > 1 below the content section
    $('#tab1').find('div.contentSection').children(':not(* .boxSection)').find('div.contentBody.figureSection, div.contentBody.tableSection').has('a.popUpTable').each(function () {
        pullHtml = pullHtml + $(this).clone().wrap('<div>').parent().html();
    });

	$targetContainer.html(pullHtml);
}

function pullFiguresFromContent() {
	var $targetContainer = $('#tab2');

	// only popuplate it when empty
	if ($targetContainer.html())
		return

	var pullHtml = '';
	$('#tab1').find('div.contentBody.figureSection').has('a.popUpFigure').each(function () {
		pullHtml = pullHtml + $(this).clone().wrap('<div>').parent().html();
	});

	$targetContainer.html(pullHtml);

	$('#tab2').find('.inlineFigure').figureEnlarger({
		maxWidth: 530,
		minWidth: 180
	});
}

function pullReferencesFromContent() {
	var $targetContainer = $('#tab5');

	// only popuplate it when empty
	if ($targetContainer.html())
		return;

	var pullHtml = '';
	var isDsmVContent = $get('hfIsDsmVContent').value == 'True';

	$('#tab1').find('div.refContainer').each(function () {

		if (isDsmVContent) {
			var h3RefTitle = $(this).parent().parent().children('h3').html();
			
			if (h3RefTitle == null)
			   h3RefTitle = $(this).parent().prev().children('h3').html();

			if (h3RefTitle != null && h3RefTitle != '')
				pullHtml = pullHtml + '<h3>' + h3RefTitle + '</h3>';
		}

		pullHtml = pullHtml + $(this).clone().wrap('<div>').parent().html();
	});
	
	$targetContainer.html(pullHtml);
}