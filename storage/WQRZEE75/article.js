var dict = {
    modules: {
        'gallery-accordion': {
            fullpath: '/templates/jsp/js/gallery-accordion-min.js',
            requires: ['event','anim-easing','widget','widget-stdmod','json-parse'],
            optional: ['dd-constrain','dd-proxy','dd-drop'],
            supersedes: []
        }
    }
}

// use the dict to change way we retrieve content over https
// the base is used to load loader-min.js (over https we'll serve it locally)
if (document.location.protocol == "https:") {
    dict['comboBase'] = '/action/yui/combo?';
    dict['combine'] = true;
    dict['timeout'] = 10000;
    dict['base'] = '/templates/jsp/js/';
}

YUI(dict).use('node', 'node-event-simulate', 'anim', 'io-base', 'json-parse', 'gallery-accordion', function(Y) {
    var sidebar = Y.all('.fullTextSidebarInner');
    var footerRegion = null;
    var lastPos = 1000;
    var prevBordered = null;
    var carousel = null;
    var carouselElmts = null;
    var accordion = null;

    // Constants
    var OFFSET_CONST;

    // Current X position used in animation
    var currentXPosition;
    var currentIndex = 0;
    var prevIndex;

    var currActiveContentId = null;

    var currentActiveFigRefId;
    var currentActiveReferenceId;
    // indicates whether sidebar's height is less than viewport's height
    var isShortSidebar = false;


    sidebar.on("domready", function() {
        setupAccordion(); //create accordion from markup

        // if there are no recommended articles after replacer is done
        // remove whole header-body (for recommended articles) part of accordion from sidebar
        var reviewsTabContent = Y.one('#reviewsTab');
        if(reviewsTabContent != null) {
            var itemBody = reviewsTabContent.one('#pm1');
            if(itemBody != null) {
                var bodyContent = itemBody.get('innerHTML');
                if( bodyContent == '' ) {
                    var itemtoRemove = reviewsTabContent.one('#item1');
                    reviewsTabContent.removeChild(itemtoRemove);
                }
            }
        }

        // get carousel
        carousel = Y.one('.carousel');
        var referencesTabContent = Y.one('#referencesTab');
        if (carousel != null) {
            carouselElmts = Y.all('.carousel > li');

            // set orange border in first image of carousel when we first load page
            carousel.get("children").item(0).one('span.image > img').setStyle('border', '2px solid orange');
            currentXPosition = carousel.getX();

            Y.on("click", displayImage, ".left_scroll");
            Y.on("click", displayImage, ".right_scroll");
            Y.on("click", displayCorrectMedImageContent, "ul.carousel li");
            Y.on("click", displayTab, "ul.medImgtabs li");
            Y.on("click", scrollToFig, ".scrollFig");
        }

        if(referencesTabContent != null) {
            Y.on("click", displaySnippsAndOtherRefs, ".toggleImg");
            Y.on("click", scrollToRef, ".scrollRef");
        }

        // set correct active content id
        setCurrentActiveContentId(carousel, referencesTabContent);

        var fullTextSidebarInner = Y.one('.fullTextSidebarInner');
        Y.on("click", adjustOffsetPosFixedOnTabChange, ".ui-tabs-hd > li");
        var sidebarTop = fullTextSidebarInner.getStyle("top");
        OFFSET_CONST = parseInt(sidebarTop.substring(0, sidebarTop.indexOf("px")));
        footerRegion = Y.one('#footer').get('region');

        // before we start calculating sidebar's positioning, get its height
        // if sidebar's height is greater than the viewport(-270px for header/footer)
        // then set isShortSidebar to true, don't deal with footer overlapping issues
        var sidebarHeight = fullTextSidebarInner.getStyle('height');
        var windowHeight = Y.one(document).get('winHeight');
        if(parseInt(windowHeight)-270 > parseInt(sidebarHeight)) isShortSidebar = true;

        adjustOffsetPosFixed();
        //adjust position on resize and on scroll
        Y.on('scroll', function () {
            adjustOffsetPosFixed();
        });
        Y.on('resize', function(){
            adjustOffsetPosFixed();
        });

    });

    // creates the new accordio object
    function setupAccordion() {
        // before we render the accordion we need to set a height to the parent container
        // which is going to be the window's height minus 50px for sidebar tabs hd
        var reviewsTabHeight = Y.one(document).get('winHeight') - 50;
        var reviewsTab = Y.one('#reviewsTab');
        if (reviewsTab != null) reviewsTab.setStyle('height', reviewsTabHeight + 'px');

        // render accordion
        accordion = new Y.Accordion({
            srcNode: "#srcNode",
            useAnimation: false,
            collapseOthersOnExpand: true
        });

        // for some reason in FF itemExpanded is fired when we first load the page
        // but not in rest browsers...in this case take care of height
        if (Y.UA.gecko > 0) {
            accordion.on('itemExpanded', function(attrs) {
                var children = reviewsTab.all('.yui3-widget-bd').size();
                var newHeight = reviewsTabHeight - (children * 110);
                attrs.item.bodyNode.setStyle('height', newHeight + 'px');
            });
        }
        accordion.render();
    }

    /* decides which is the correct content id oh first load of page
    *  by default when we load page if no content are found under images
    *  we will open the references tab...etc, this method sets the correct id*/
    function setCurrentActiveContentId(carousel, referencesTabContent) {
        if(carousel != null) {
            currActiveContentId = '.mainImageContent';
        } else if(carousel == null && referencesTabContent != null) {
            currActiveContentId = '#referencesTab';
        } else if(carousel == null && referencesTabContent == null) {
            currActiveContentId = '#reviewsTab';
        }
    }

    function scrollToFig(e) {
        var figuresTab = Y.all('.ui-tabs-hd > li').item(0); // get figures tab
        currActiveContentId = '.mainImageContent'; //set correct currActiveContentId
        currentActiveFigRefId = e.currentTarget.get('id'); // set current selected figure's label id
        toggleRequestedTab(figuresTab); // set referenses tab to active
        adjustOffsetPosFixed(); // set correct height to it and add scrolling behaviour

        // open correct figure in carousel of sidebar and its content
        var figId = e.currentTarget.getAttribute('figId');
        // there are cases where we have label: e.g Figure 1 and 2
        // for those cases pick only first fig and display it
        var indexOf = figId.indexOf(" ");
        if (indexOf >= 0) {
            var ids = figId.split(" ");
            figId = ids[0];
        }
        var matchingFig = Y.one('#figuresTab li.' + figId);
        matchingFig.simulate("click"); // simulate click on this element to get required behavior
    }

    function scrollToRef(e) {
        var referencesTab = Y.all('.ui-tabs-hd > li').item(1); // get references tab
        currActiveContentId = '#referencesTab'; //set correct currActiveContentId
        var currTarget = e.currentTarget;
        currentActiveReferenceId = currTarget.get('id');
        toggleRequestedTab(referencesTab); // set referenses tab to active
        adjustOffsetPosFixed(); // set correct height to it and add scrolling behaviour
        removeHighlight();

        // open correct reference in sidebar and scroll to it
        var refId = e.currentTarget.getAttribute('refId');
        // there are cases where we have label: e.g Figure 1 and 2
        // for those cases pick only first fig and di"splay it"
        var indexOf = refId.indexOf(" ");
        if (indexOf >= 0) {
            var ids = refId.split(" ");
            refId = ids[0];
        }
        var matchingRef = Y.one('#referencesTab li.' + refId);
        // highlight link reference and reference from sidebar
        matchingRef.one('.citation').addClass('highlight');
        currTarget.addClass('highlight');
        // scroll into reference
        matchingRef.scrollIntoView(true);
    }

    function toggleRequestedTab(tab) {
        var ui_tabs = Y.one('.ui-tabs'),
                tabs = ui_tabs.all('.ui-tabs-hd li'),
                contents = ui_tabs.all('.ui-tabs-bd > div');

        // adds/removes classes from tab labels and according tab content
        // matching tab content are found with item(...).indexOf(...) method
        contents.addClass('ui-tabs-bd-hidden')
                .item(tabs.removeClass('ui-tabs-hd-active').indexOf(tab.addClass('ui-tabs-hd-active')))
                .removeClass('ui-tabs-bd-hidden');
    }

    function displaySnippsAndOtherRefs(e) {
        var toggle = e.currentTarget;
        displaySnippsAndOtherRefsImpl(toggle);
    }

    function displaySnippsAndOtherRefsImpl(toggle) {
        // get all references (li elements)
        var refElmts = Y.all('#referencesTab ul:first-child > li');
        // check if selected toggle has className open, if it does then we clicked to
        // a currently opened element, we just need to close it
        var remainClosed = toggle.hasClass('open');

        // remove all currently opened refSnipps / otherReviews sections,
        // we need to have just one group of refSnipps open at a time
        resetAllRefs(refElmts, toggle);
        if (remainClosed) {
            return;
        }

        // collect from left column all anchor elements that have curent selected refId as className
        var parentRef = toggle.get('parentNode');
        removeHighlight(); //remove all highlighted elements from dom

        // display other reviews section and refSnipps, set correct toggle image
        var currOtherReviewsSnipps = parentRef.one('.otherReviews');
        if( currOtherReviewsSnipps != null ) {
            currOtherReviewsSnipps.setStyle('display', '');
        }
        var currRefSnipps = parentRef.one('.refSnip');
        if( currRefSnipps != null ) {
            currRefSnipps.setStyle('display', '');
        }
        // set correct toggle image (orange or white) depending on whether we have other reviews or not
        if(currOtherReviewsSnipps.get('innerHTML') != '') {
            toggle.setStyle('background', 'url(/templates/jsp/_style4/_ar/images/orange-minus.png) no-repeat');
        } else {
            toggle.setStyle('background', 'url(/templates/jsp/_style4/_ar/images/white-minus.png) no-repeat');
        }
        toggle.addClass('open');

        // register on click behavior for the refSnipp
        Y.on("click", scrollToRefLeftcol, "ul.refSnip li");
    }

    /* *
     * refElmts:  all references in second tab of right sidebar
     * toggle: toggle image user currently selected
     *
     * goes through all references and closes them in case we have some open reference
     * this way we make sure that we have just one reference open at a time
     *
     * */
    function resetAllRefs(refElmts, toggle) {
        refElmts.each(function(v) {
            var childRefSnip = v.one('ul.refSnip');
            if (childRefSnip != null) childRefSnip.setStyle('display', 'none');
            var _otherReviews = v.one('.otherReviews');
            if (_otherReviews != null) _otherReviews.setStyle('display', 'none');
            var _parentToggle = v.one('.toggleImg');
            if (_parentToggle != null) {
                // check whether we deal with an orange or a white toggle image and set background accordingly
                var classNames = _parentToggle.get('className');
                var isOrangeImg = false;
                if (classNames.indexOf('orangeToggleImg') > 0 || classNames.indexOf('orangeToggleImgMinus') > 0)
                    isOrangeImg = true;

                if (isOrangeImg) _parentToggle.setStyle('background', 'url(/templates/jsp/_style4/_ar/images/orange-plus.png) no-repeat');
                else _parentToggle.setStyle('background', 'url(/templates/jsp/_style4/_ar/images/white-plus.png) no-repeat');

                if (_parentToggle.hasClass('open')) _parentToggle.removeClass('open');
            }
            toggle.removeClass('open');
        });
    }

    // when user clicks on a refSnipp scroll to the corresponding left hand side paragraph
    function scrollToRefLeftcol(e) {
        var selectedSnipp = e.currentTarget;
        removeHighlight(); // remove any currently existing highlight
        var refId = selectedSnipp.getAttribute('ref-id'); //get ref-id attr of currently clicked li element
        // get scrollRefElements node with id=ref-id
        var matchingLeftRef = Y.one('#' + refId);
        matchingLeftRef.addClass('highlight');
        // if current clicked li element has ancestor .figureThumbnail then we are on a snippText retrieved from
        // a caption, since captions are hidden in left hand side we'll scroll to the correct image, then
        // change to figures tab on the right hand side and scroll to the correct image in carousel
        var figThumbnail = matchingLeftRef.ancestor('.figureThumbnail');
        if (figThumbnail != null) {
            figThumbnail.scrollIntoView(true);
            // now simulate a click on image's caption label to open figures tab and scroll to correct image
            var correspondingFigRefCaption = figThumbnail.one('.captionLabel').one('a');
            correspondingFigRefCaption.simulate('click');
        } else {
            matchingLeftRef.scrollIntoView(true);
        }
    }

    // get current active tab of sidebar
    function setCurrActiveContentTab(activeTab) {
        var tabs = Y.all('.ui-tabs-hd li');
        var tabs_content = Y.all('.ui-tabs-bd > div');
        currActiveContentId = '#' + tabs_content.item(tabs.indexOf(activeTab)).one('div').get('id');

        // if current active content is figuresTab we want to overflow:auto content under carousel
        // so change id to one including only content under carousel
        if (currActiveContentId == '#figuresTab') {
            currActiveContentId = '.mainImageContent';
        }
    }

    function displayTab(e) {
        var clickedTab = e.currentTarget;
        removeHighlight();
        if (clickedTab.get('className') == 'figReferences') {
            attachScrollBehaviourToImgRefs();
        }
        var tabs = Y.all('.imageTabs-hd li');
        var tabs_content = Y.all('.imageTabs-bd > div');

        tabs_content.addClass('imageTabs-bd-hidden').item(tabs.removeClass('imageTabs-hd-active')
                .indexOf(clickedTab.addClass('imageTabs-hd-active'))).removeClass('imageTabs-bd-hidden');
    }

    // register scroll behavior to when image reference is clicked
    function attachScrollBehaviourToImgRefs() {
        removeHighlight();
        // register event on li elements
        Y.on("click", scrollToImgRefLeftCol, ".figRefContent li.refElement");
    }

    // when image's reference is clicked scroll to text in left column
    function scrollToImgRefLeftCol(e) {
        var selectedSnipp = e.currentTarget;
        removeHighlight();
        // get index og clicked refsnipp
        var references = selectedSnipp.get('parentNode').get('children');
        var index = references.indexOf(selectedSnipp);
        // add highlight to selected snip
        selectedSnipp.addClass('highlight');
        // retrieve fig id from ul of references
        var figId = selectedSnipp.get('parentNode').getAttribute('figId');
        // collect all figure references from left hand side column
        var leftSideFigRefs = Y.one('.yui3-u.first').all('a.scrollFig.' + figId);
        // get reference matching position of selected snip
        var matchingLeftContent= leftSideFigRefs.item(index);
        // add highlight to matching snipp and scroll to it
        matchingLeftContent.addClass('highlight');
        matchingLeftContent.scrollIntoView(true);
    }

    function displayCorrectMedImageContent(e) {
        // keep currentIndex before scrolling
        prevIndex = currentIndex;

        removeHighlight();

        var clickedEl = e.currentTarget;
        displayCorrectMedImgImpl(clickedEl); //set correct medium image
        displayCorrectEnlargeLink(clickedEl); // set correct enlarge link
        displayCorrectPptLink(clickedEl); // set correct ppt link

        //add scrolling behaviour
        var hasScroll = false;
        if (prevIndex > currentIndex) {
            hasScroll = true;
            scrollRight();
        } else if (prevIndex < currentIndex) {
            hasScroll = true;
            scrollLeft();
        }

        if (hasScroll) {
            var anim = new Y.Anim({
                node: carousel,
                duration: 0.1,
                easing: Y.Easing.easeOut
            }); //IF FIRST SELECTION, EXPAND THE IMAGE
            anim.set("to", { xy: [currentXPosition, carousel.getY()] });
            anim.set("currentPage", { value : currentIndex });
            anim.run();
        }

    }

    // set correct enlarge image url
    function displayCorrectEnlargeLink(clickedEl) {
        var clickedThumb = clickedEl.one('img');
        var correctId = clickedThumb.getAttribute('medimgid');
        var enlargeSpan = Y.one('.enlargeLink');
        var input = enlargeSpan.one('a');
        input.set('href', 'javascript:void(0)');
        input.on('click', function(e) {
            popRef(correctId);
        });
    }

    // set correct ppt link url
    function displayCorrectPptLink(clickedEl) {
        var clickedThumb = clickedEl.one('img');
        var correctLink = clickedThumb.getAttribute('pptLink');
        var pptSpan = Y.one('.fullTextSidebarInner .pptLink');
        if(pptSpan != null) {
            var input = pptSpan.one('a');
            input.set('href', correctLink);            
        }
    }

    function displayCorrectMedImgImpl(clickedEl) {
        // get thumbnail that is clicked
        var clickedThumb = clickedEl.one('img');

        var thumbs = Y.all('.carousel > li');
        var thumbsImg = Y.all('.carousel > li span.image img');
        thumbsImg.setStyle('border', '');
        currentIndex = thumbs.indexOf(clickedEl);

        // set correct caption for current image
        var curr_caption = clickedEl.one('.caption').get('innerHTML');
        var figCaptionContent = Y.one('.figCaptionContent');
        figCaptionContent.set('innerHTML', curr_caption);

        // set correct ref snipps for current image
        var curr_refSnipp = clickedEl.one('.imgReferences').get('innerHTML');
        var figRefContent = Y.one('.figRefContent');
        figRefContent.set('innerHTML', curr_refSnipp);

        // get current medium image
        var medImg = Y.one('#main_preview img');
        carouselElmts.setStyle('border', '');

        // set orange border on clicked thumb
        var imgOfClicked = clickedEl.one('span.image > img');
        imgOfClicked.setStyle('border', '2px solid orange');

        // get attribute medium from thumbnail (holds correct path to medium image)
        var correctSrc = clickedThumb.getAttribute('medium');
        // set src of medium image to correct image's src
        medImg.setAttribute('src', correctSrc);

        collectReferences();
    }

    // Border the selected img and remove border from prev selected, also detect the click and then scroll appropriately
    function displayImage(e) {
        removeHighlight();

        //set correct previous bordered, which is item in carousel in currentIndex, before animating to next image
        prevBordered = carouselElmts.item(currentIndex);
        // get the img and remove border from it
        var imgOfPrevBordered = prevBordered.one('span.image > img');
        imgOfPrevBordered.setStyle('border', '');

        var sourceEl = e.currentTarget;
        if (sourceEl.hasClass('right_scroll')) {            
            if (prevBordered.get('nextSibling')) {
                var hasLeftButton = true;
                if (sourceEl.hasClass('noScroll')) {
                    // remove noScroll class, now we are able to scroll
                    sourceEl.removeClass('noScroll');
                }
                sourceEl = ((next = prevBordered.get('nextSibling')).get('className') != 'right_scroll') ? next : prevBordered;
            } else {
                //add no scroll class to change to scroll inactive img
                sourceEl.addClass('noScroll');
                sourceEl = prevBordered;
            }
        } else if (sourceEl.hasClass('left_scroll')) {
            if (prevBordered.get('previousSibling')) {
                var hasRightButton = true;
                if (sourceEl.hasClass('noScroll')) {
                    // remove noScroll class, now we are able to scroll
                    sourceEl.removeClass('noScroll');
                }
                sourceEl = ((prev = prevBordered.get('previousSibling')).get('className') != 'left_scroll') ? prev : prevBordered;
            } else {
                //add no scroll class to change to scroll inactive img
                sourceEl.addClass('noScroll');
                sourceEl = prevBordered;
            }
        }

        // keep currentIndex before scrolling
        prevIndex = currentIndex;

        if (hasLeftButton) {
            ++currentIndex;
            scrollLeft();
        } else if (hasRightButton) {
            --currentIndex;
            scrollRight();
        }

        var imgOfSourceEl = sourceEl.one('span.image > img');
        imgOfSourceEl.setStyle('border', '2px solid orange');

        if (hasLeftButton || hasRightButton) {
            var anim = new Y.Anim({
                node: carousel,
                duration: 0.1,
                easing: Y.Easing.easeOut
            }); //IF FIRST SELECTION, EXPAND THE IMAGE

            if (hasLeftButton || hasRightButton) {
                anim.set("to", { xy: [currentXPosition, carousel.getY()] });
                anim.set("currentPage", { value : currentIndex });
            }
            anim.run();

            var currentLiIncarousel = carouselElmts.item(currentIndex);
            displayCorrectMedImgImpl(currentLiIncarousel);
            displayCorrectEnlargeLink(currentLiIncarousel);
            displayCorrectPptLink(currentLiIncarousel);
            collectReferences();

            prevBordered = sourceEl;
        }
    }

    // remove whatever is highlighted so far
    function removeHighlight() {
        Y.all('.highlight').removeClass('highlight');
    }

    // if current active image tab is the references tab then collect correct info for tab
    function collectReferences() {
        var currActiveImageTab = Y.one('.imageTabs-hd-active');
        if (currActiveImageTab.get('className') == 'figReferences imageTabs-hd-active') {
            attachScrollBehaviourToImgRefs();
        }
    }

    // Handles scrolling left
    function scrollLeft() {
        if(currentIndex > 0) {
            var diff = getDiffOfIndexes(); // find whether user scrolled just one or more images away from current image
            var carChildren = carousel.get("children");
            // if user scrolled more than one image then find total scrolled width
            if(diff > 1) {
                var totalScrolledWidth = 0;
                // loop in images that we scrolled to reach current image and sum up their widths
                // plus 16px for padding of each image
                for(var i = prevIndex; i < currentIndex; i++) {
                    totalScrolledWidth += carChildren.item(i).get("offsetWidth") + 16;
                }
                // now do the calculation to set cirrect x position
                currentXPosition = -1 * totalScrolledWidth + carousel.getX();
            } else { // otherwise user scrolled just one image
                // get the width of current image plus 16px for paddings and set correct x position
                var imageWidth = carChildren.item(currentIndex-1).get("offsetWidth") + 16;
                currentXPosition = -1 * diff * imageWidth + carousel.getX();
            }
        }
    }

    // Handles scrolling right
    // scrolling tot the right is easier, at any given time, current selected thumbnail
    // is located in the begining of the carousel's "viewport", so there is no way to
    // scroll right multiple images, we can just scroll right one step at a time
    function scrollRight() {
        var totalPages = carousel.get("children").size();
        if (currentIndex < totalPages) {
            // get current image's width plus 16px for paddings and set correct x position
            var imageWidth = carousel.get("children").item(currentIndex).get("offsetWidth") + 16;
            currentXPosition = getDiffOfIndexes() * imageWidth + carousel.getX();
        }
    }

    //get absolute value of difference between prev and curr indexes
    function getDiffOfIndexes() {
        return Math.abs(prevIndex - currentIndex);
    }

    function adjustOffsetPosFixedOnTabChange(e) {
        removeHighlight();
        setCurrActiveContentTab(e.currentTarget);
        adjustOffsetPosFixed();
    }

    function adjustOffsetPosFixed() {
        var scr = Y.one(document).get('docScrollY');
        var delta = OFFSET_CONST - scr;
        var fixedDiff = null;
        // if the header was previously out of the view and the user is within 300px of header and scrolling up
        if (-delta > 0 && -delta <= 300 && (delta - lastPos) > 0) {
            //pre-empt the user and jump to the top --avoid position fixed jumbing problem
            Y.one('.fullTextSidebarInner').setStyle('top', "278px");
            Y.one('.fullTextSidebarInner').setStyle('position', 'absolute');
            window.scrollBy(0, delta - 1);
        } else if (delta <= 0) {
            Y.one('.fullTextSidebarInner').setStyle('top', "0px");
            Y.one('.fullTextSidebarInner').setStyle('position', 'fixed');
            // setting sidebar height to viewport height minus some padding to prevent element overlap
            handleSidebarHeight(fixedDiff, scr, isShortSidebar);
        } else {
            //if header in view, use absolute to prevent pos-fixed jumping problem
            Y.one('.fullTextSidebarInner').setStyle('top', "278px");
            Y.one('.fullTextSidebarInner').setStyle('position', 'absolute');
            handleSidebarHeight(fixedDiff, scr, isShortSidebar);
        }
        Y.one('.fullTextSidebarInner').setStyle('width', '480px');
        Y.one('.fullTextSidebarInner').setStyle('padding', '0px 0px 0px 10px');
        Y.one('.fullTextSidebarInner').setStyle('left', '50%');

        lastPos = delta;

        // get window height subtract 230px for header of sidebar, carousel and image subtabs
        // and set max height in preview image
        var windowHeight = Y.one(document).get('winHeight');
        var maxHeight = windowHeight - 230;
        var mainPreview = Y.one('#main_preview img');
        if(mainPreview != null) mainPreview.setStyle('maxHeight', maxHeight);        
    }

    function handleSidebarHeight(fixedDiff, scr, isShortSidebar) {
        var doc = Y.one(document);
        if(currActiveContentId != null) {
            var currentContentNode = Y.one(currActiveContentId);
            if (currActiveContentId == '.mainImageContent') {
                fixedDiff = doc.get('winHeight') - 170; // window height minus 170px for carousel + header at the top
            } else {
                fixedDiff = doc.get('winHeight') - 50; // window height minus 50px for header at the top
            }
            if (currActiveContentId == '#reviewsTab') {
                currentContentNode.setStyle('height', fixedDiff + "px");
            } else {
                if(currentContentNode) {
                    if(!isShortSidebar) {
                        currentContentNode.setStyle('height', fixedDiff + "px");
                        currentContentNode.setStyle('overflow', "auto");
                    } else {
                        currentContentNode.setStyle('height', 'auto');
                    }
                }
            }
            // fix footer overlapping problem only when we deal with long sidebars
            // once user scrolled all the way to the end of the page
            // start removing top part of sidebar from viewport
            var docHeight = doc.get('docHeight');
            if (!isShortSidebar && ((parseInt(scr) + parseInt(fixedDiff)) > parseInt(docHeight - 250))) {
                Y.one('.fullTextSidebarInner').setStyle('top', "-120px");
            }
        }
    }

    /*implementation of section titles boxes in left hand side*/
    Y.on("domready", function() {
        var leftSideContent = Y.one('.articleFullText .first');
        
        // on click of sections (boxes) header display the sections block
        leftSideContent.delegate('click', function(e) {
            var currTarget = e.currentTarget;

            //close any other currently opened sections block, only if the block that user tries to open is
            // closed, if not then user tries to close currently opened block
            if(currTarget.one('.headerSelect').hasClass('collapsedSections')) {
                closeAllSectionsBlocks(leftSideContent);
            }

            var toggleImage = currTarget.one('.headerSelect'); // get toggle image in header
            var chooseSections = currTarget.get('parentNode').one('.chooseSections'); // choose sections block
            toggleSectionBox(toggleImage, chooseSections);
        }, '.yui3-hd');

        // on click of a section title in sections block scroll into correct section
        // and close currently opened section
        leftSideContent.delegate('click', function(e) {
            var currTarget = e.currentTarget;
            //secId attribute holds value of section we want to scroll to
            var sectionId = currTarget.getAttribute('secId');

            // now close currently opened sections block and change toggle image
            var chooseSections = currTarget.get('parentNode');
            toggleClassNames(chooseSections, 'hiddenSection', '');

            var toggleImage = currTarget.get('parentNode').get('parentNode').one('.yui3-hd .headerSelect');
            toggleClassNames(toggleImage, 'collapsedSections', 'expandedSections');

            //scroll to correct section
            if(sectionId != '' && sectionId != null) window.location = sectionId;
        }, '.chooseSections .section');

    });

    /* closes all currently opened section titles boxes */
    function closeAllSectionsBlocks(leftSideContent) {
        var sectionBoxes = leftSideContent.all('.simpleBox');
        sectionBoxes.each(function(a) {
            var toggleImage =  a.one('.yui3-hd .headerSelect');
            if(toggleImage != null) {
                var chooseSections = a.one('.chooseSections');
                if(toggleImage.hasClass('expandedSections')) {
                    toggleSectionBox(toggleImage, chooseSections);
                }
            }
        });
    }

    /* hide or display the sections drop down and change toggle image
       according to previous state*/
    function toggleSectionBox(toggleImage, chooseSectionsBlock) {
        toggleClassNames(toggleImage, 'collapsedSections', 'expandedSections');
        toggleClassNames(chooseSectionsBlock, 'hiddenSection', '');
    }

    /* changes class name of given element depending on whether className1 exists or not */
    function toggleClassNames(domElmnt, className1, className2) {
        if(domElmnt.hasClass(className1)) {
            domElmnt.removeClass(className1);
            domElmnt.addClass(className2);
        } else {
            domElmnt.removeClass(className2);
            domElmnt.addClass(className1);
        }
    }

});

