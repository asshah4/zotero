var dict = {};
// use the dict to change way we retrieve content over https
// the base is used to load loader-min.js (over https we'll serve it locally)
if (document.location.protocol == "https:") {
    dict['comboBase'] = '/action/yui/combo?';
    dict['combine'] = true;
    dict['timeout'] = 10000;
    dict['base'] = '/templates/jsp/js/';
}

YUI(dict).use('node', 'node-event-simulate', 'anim', 'io-base','json-parse', function(Y) {
    var toggleControl = '<div class="head_toggle"><a title="Show/Hide Object" class="yui3-toggle">' +
                         '<em>toggle</em>' +
                         '</a></div>';

    var initTop = function() {
        //add rounded corners in top right/left corners of boxes
        var modulesTopCorners = Y.all('.browseByAlphabet .topTabs .ui_activeTabs-hd li');
        modulesTopCorners.each(function(v) {
            // dynamically create spans for rounded corners
            var control = Y.Node.create(
                    '<span class="rnd_corners tp">' +
                    '<span class="rnd1"></span>' +
                    '<span class="rnd2"></span>' +
                    '<span class="rnd3"></span>' +
                    '</span>'
                    );
            // prepend spans in desired node
            v.prepend(control);
        });
    };

    // prepend spans in desired node
    var initBottom = function() {
        //add rounded corners in bottom right/left corners of boxes
        var modulesBottomCorners = Y.all('.browseByAlphabet .bottomTabs .ui_activeTabs-hd li');
        modulesBottomCorners.each(function(v) {
            // dynamically create spans for rounded corners
            var control = Y.Node.create(
                    '<span class="rnd_corners btm">' +
                    '<span class="rnd3"></span>' +
                    '<span class="rnd2"></span>' +
                    '<span class="rnd1"></span>' +
                    '</span>'
                    );
            // prepend spans in desired node
            v.append(control);
        });

    };

    Y.on("domready", initTop);
    Y.on("domready", initBottom);




    var initTabs = function(){

    var activeTabs = Y.all('.ui_activeTabs');


    activeTabs.each(function(a){
    this.delegate('click', toggleActiveTabs, '.ui_activeTabs-hd a');

        if(!a.hasClass('hideControl')) {
            var closeControl = Y.Node.create(toggleControl).addClass("hidden");
            var footnote = Y.Node.create('<div class="footnote"><div class="text hidden"></div></div>');
            footnote.appendChild(closeControl);

            a.appendChild(footnote);
        }

      var keyHolder = Y.one('#'+a.get('id')+'_key');

     a.all('.ui_activeTabs-hd span.tabKey').each(function(t){


        var menuKey = t.get('innerHTML');

         var menuIdKey;

         if(keyHolder) {menuIdKey=keyHolder.get('innerHTML');}

         if(menuKey == menuIdKey) {
            setActiveTab(t.get('parentNode'));
         }

        });

        if(a.hasClass('firstActive')) {

            a.one('.ui_activeTabs-hd li a').simulate('click');
        }




    });

   function setActiveTab(t){
       if(!t.hasClass('ui_activeTabs-hd-active'))
            {t.addClass('ui_activeTabs-hd-active');}
   }

    function toggleActiveTabs (e) {
        var ui_activeTabs = e.container,
                tabs = ui_activeTabs.all('.ui_activeTabs-hd li'),
                contents = ui_activeTabs.all('.ui_activeTabs-bd > *'),
                tab = e.currentTarget.get('parentNode');

        var relatedTabs = tab;
        // If tab header is repeated under the tab body highlight tab in two places
        if (ui_activeTabs.hasClass('dupTabs'))
        {
            var titleSelector = 'li[class~=' + tab.getAttribute('class') + ']'
            relatedTabs = ui_activeTabs.all(titleSelector);
            // Reset tab to first instance of the tab, in case where the tabs are displayed twice [top & bottom]
            tab = ui_activeTabs.one(titleSelector);
            ui_activeTabs.all('.bottom-hidden').removeClass('bottom-hidden').addClass('bottom-active');
        }

        var tabCloseControl = ui_activeTabs.all('.head_toggle').removeClass('hidden');

        var hideTabContent = function(e) {
            contents.addClass('ui_activeTabs-bd-hidden');
            tabs.removeClass('ui_activeTabs-hd-active');
            tabCloseControl.addClass('hidden');
            ui_activeTabs.all('.footnote .text').addClass('hidden');
        }
        tabCloseControl.after('click', hideTabContent);

        // Tab is already active; toggle
        if (tab.hasClass('ui_activeTabs-hd-active'))
        {
            tabCloseControl.each(function(t) {
                t.simulate("click");
            });
            e.preventDefault();
            return;
        }

        var resultNode = contents.addClass('ui_activeTabs-bd-hidden')
                .item(tabs.removeClass('ui_activeTabs-hd-active').indexOf(tab))
                .removeClass('ui_activeTabs-bd-hidden');
        relatedTabs.addClass('ui_activeTabs-hd-active');

        var currentNode = resultNode;

        var href = e.currentTarget.get('href');
        var id = e.currentTarget.get('id');
        var rel = e.currentTarget.get('rel');
        var uri = href;

        if (!currentNode.hasClass('downloaded')) {
            if (rel == 'active') {
                var cfg = {
                    method: 'get',
                    data: 'div_id=' + id + '&tabs_id=' + ui_activeTabs.get('id')
                };
                var request = Y.io(uri, cfg);
            } else {
                var tabContent = Y.one('#' + rel);
                var parentNode = tabContent.get('parentNode');
                currentNode.addClass("downloaded").appendChild(tabContent);
                // for some reason Chrome throws here a NOT_FOUND_ERR: DOM Exception 8 
                // and as a result it removes #{rel} from url (!), here we just catch the
                // exception to avoid getting this behavior
                try {
                    parentNode.removeChild(tabContent);
                } catch(err) {
                    ///stay quiet
                }
            }
        }

        if (currentNode.hasClass('hasFootNote')) {
            ui_activeTabs.all('.footnote .text').removeClass('hidden');
        } else {
            ui_activeTabs.all('.footnote .text').addClass('hidden');
        }

        e.preventDefault();
    }

        function complete(id, o, args) {

        var id = id; // Transaction ID.
        var data = o.responseText; // Response data.

        var jsonData;
        try {
            jsonData = Y.JSON.parse(o.responseText);
        }
        catch (e) {
            alert("Error retrieving data");
        }
        var selector = "div#"+jsonData.div_id+"_content";
        var dynNode = Y.one(selector);

        var footnoteText = Y.one("div#"+jsonData.tabs_id+" .footnote .text");

         if(jsonData.footnote=="nil"){
             footnoteText.addClass("hidden");
             dynNode.removeClass('hasFootNote');
         }else{
             footnoteText.setContent(jsonData.footnote).removeClass("hidden");
             dynNode.addClass('hasFootNote');
         }


        dynNode.addClass('downloaded').setContent(jsonData.data);

        if(jsonData.postProcess == 'true') {

            renderCarousel(jsonData.tabs_id+'_carousel');

        }
    }

    activeTabs.on('io:complete', complete, this,[] );

    var renderCarousel = function (id) {

        
        

            var carousel    = new YAHOO.widget.Carousel(id, {
                        isCircular: true, numVisible: 1
                });

              carousel.STRINGS.PAGER_PREFIX_TEXT = 'Figure ';
              carousel.CONFIG.MAX_PAGER_BUTTONS = 0;  
            carousel.render(); // get ready for rendering the widget
            carousel.show();   // display the widget

    };


    };

          Y.on("domready",initTabs);


    var initEcommSelect = function() {

        var selectOfferTypes = function(e) {
            var sel = e.currentTarget;
            var selIndex = sel.get("selectedIndex");
            var options = sel.get("options");
            var option = options.item(selIndex).get("value");
            // get rootNode -- either byYear or byJournal
            var rootNode = sel.get('parentNode').get('parentNode').get('parentNode').
                    get('parentNode').get('parentNode').get('parentNode');

            var allOfferPriceSpans = rootNode.all('.middle span');
            allOfferPriceSpans.addClass('hidden').removeClass('visible');
            var allOfferCartButtons = rootNode.all('.right .arrowButton')
            allOfferCartButtons.addClass('hidden').removeClass('visible');
            var selectedOffers = rootNode.all('.' + option);
            selectedOffers.addClass('visible').removeClass('hidden');
        }

        Y.after("change", selectOfferTypes, "select.ecommOfferTypeBox");
    };

    Y.on('domready',initEcommSelect);

});


// submits quick search
// user can initiate 3 different kinds of search from header
// 1.journal 2. story 3. staff directory db pub
// depending on type of search add correct inputs and submit form
function submitQuickSearch(aForm) {
    var typeVals = aForm.elements["type"];
    var selectedType;
    for(var i = 0; i < typeVals.length; i++) {
        if(typeVals.item(i).checked) selectedType = typeVals.item(i).value;
    }

    var allField = aForm.elements["all"];
    var textToSearch = allField.value;

    if(selectedType == "geninfo") {
        //set correct target in query
        var storyInput = document.createElement("input");
        storyInput.type = "hidden";
        storyInput.name = "target";
        storyInput.value = "story";
        aForm.appendChild(storyInput);

        // in story search we use searchText param, set it in query
        var searchTextInp = document.createElement("input");
        searchTextInp.type = "hidden";
        searchTextInp.name = "searchText";
        searchTextInp.value = textToSearch;
        aForm.appendChild(searchTextInp);
    }

    aForm.submit();
}

function submitResetPwd(aForm, inputName) {
    var submitInp = document.createElement("input");
    submitInp.type = "hidden";
    submitInp.name = inputName;
    submitInp.value = "true";
    aForm.appendChild(submitInp);

    aForm.submit();
}

// publisher specific custom styles to be added in site editor's "Styles" drop down
window.productSpecificEditorStyle = "Custom Header 1=custom_h1;Custom Paragraph=custom_p";