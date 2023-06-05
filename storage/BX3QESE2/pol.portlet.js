// set the list selector
var setSelector = ".portletContainer";

var viewMoreText = '[+] View More';
var viewFewerText = '[-] View Fewer';

// function that restores the list order from a cookie
function restoreOrder() {
    var list = $(setSelector);
    if (list == null) return

    // fetch the cookie value (saved order)
    if (!$.cookie('sortOrderCookie3')) return;
    var cookie = $.cookie('sortOrderCookie3');

    // make array from saved order
    var IDs = cookie.split(",");

    // fetch current order
    var items = list.sortable("toArray");

    // make array from current order
    var rebuild = new Array();

    for (var v = 0, len = items.length; v < len; v++) {
        rebuild[items[v]] = items[v];
    }

    for (var i = 0, n = IDs.length; i < n; i++) {

        // item id from saved order
        var itemID = IDs[i];

        if (itemID in rebuild) {

            // select item id from current order
            var item = rebuild[itemID];

            // select the item according to current order
            var child = $("div.ui-sortable").children("#" + item);

            // select the item according to the saved order
            var savedOrd = $("div.ui-sortable").children("#" + itemID);

            // remove all the items
            child.detach();

            // add the items in turn according to saved order
            // we need to filter here since the "ui-sortable"
            // class is applied to all ul elements and we
            // only want the very first!  You can modify this
            // to support multiple lists - not tested!
            $("div.ui-sortable").filter(":first").append(savedOrd);
        }
    }
}
function restoreViewMoreState() {
    var visibilityArrayNew = ($.cookie('portletViewMoreState')).split(',');
    $.each(
            visibilityArrayNew,
            function (intIndex, objValue) {
                //splitting the string to get the portlet id and state
                var portletVisibility = objValue.split(':');
                $('div#' + portletVisibility[0] + ' .viewMoreSection').css('display', portletVisibility[1]);
                $('.widgetViewMore a', 'div#' + portletVisibility[0]).html((portletVisibility[1] == 'none') ? viewMoreText : viewFewerText);
            });
}
function restoreViewState() {
    var visibilityArrayNew = ($.cookie('portletStateCookie')).split(',');
    $.each(
            visibilityArrayNew,
            function (intIndex, objValue) {
                //splitting the string to get the portlet id and state
                var portletVisibility = objValue.split(':');
                $('div#' + portletVisibility[0] + ' .portlet-content').css('display', portletVisibility[1]);
               
            });
}


//move portlets up and down
$(function () {
    $(setSelector).sortable({
        connectWith: '.portletContainer',
        handle: '.moveicon',
        cursor: 'move',
        placeholder: 'placeholder',
        forcePlaceholderSize: true,
        opacity: 0.4,
        stop: function (event, ui) {
            $(ui.item).find('.moveicon').click();
            var sortorder = '';
            var itemOrderCookie = '';
            $('.portletContainer').each(function () {
                var itemorder = $(this).sortable('toArray');
                itemOrderCookie += itemorder.toString();
            });
            $.cookie('sortOrderCookie3', itemOrderCookie);
            /*Pass sortorder variable to server using ajax to save state*/
        },
        start: function (event, ui) {
            /* This fixes height issue w/ placeholder in IE7 */
            ui.placeholder.height(ui.helper.height());
        }
    })

    //saves view more/view fewer state using a cookie
    $('.widgetViewMore').click(function () {
        //actual hide show funx
        $('.viewMoreSection', $(this).closest('.portlet')).toggle();
        var viewMoreButton = $('.widgetViewMore a', $(this).closest('.portlet'));
        viewMoreButton.html((viewMoreButton.html() == viewMoreText) ? viewFewerText : viewMoreText);

        visibility = new Array();

        $('.portlet:has(.viewMoreSection)').each(function () {
            var portletID = $(this).attr('id');
            var viewMoreState = $('.viewMoreSection', $(this)).css('display');

            //add new state to array
            visibility.push(portletID + ":" + viewMoreState);
        });

        $.cookie('portletViewMoreState', visibility);

        //Reset Explicit Column Heights 
        equalHeight($(".eqColumn"));
    });


    //saves open/closed state using a cookie
    $('.configureicon').click(function () {
        //actual hide show funx
        $(this).parent().siblings().toggle();

        var visibility = new Array();
        $('.portletContainer .portlet .portlet-content').each(function () {
            var portletID = $(this).parent().attr('id');
            var portletState = $(this).css('display');

            //add new state to array
            visibility.push(portletID + ":" + portletState);
        });
        $.cookie('portletStateCookie', visibility);

        //Reset Explicit Column Heights 
        equalHeight($(".eqColumn"));
    });

    //***Temp: For PubMed Widget add '.viewMoreSection' class here (unlike other widgets, this class is not added on the server inside the repeater loop) before determining wether or not to display View More/View Fewer button
    $('.PubMedWidgetArticle').each(function (i) {
        if (i >= 2) $(this).addClass('viewMoreSection');
    });

    //If widget has no viewMoreSections (all items are visible by default) then remove View More/View Fewer Button
    $('.widgetViewMore', $('.portlet').not(':has(.viewMoreSection)')).remove();

    // here, we reload the saved order, view state, and view more/fewer state
    if ($.cookie('sortOrderCookie3')) restoreOrder();
    if ($.cookie('portletStateCookie')) restoreViewState();
    if ($.cookie('portletViewMoreState')) restoreViewMoreState();
    
});
