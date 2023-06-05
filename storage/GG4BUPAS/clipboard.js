function getClipboardItems()
{
    myarray = init_array();
    get_array("eric_clipboard", myarray);
    /*
    if (typeof( myarray ) = "undefined")
    {
        myarray = init_array();
    }
    */
    return myarray;
}
function getClipboardCount()
{
    return getClipboardItems().length - 1;
}
function printClipBoardCount( )
{
    // Find the index to update
    var a = document.getElementById('clipboard_count');
    a.innerHTML = ""+getClipboardCount()+" items in My Clipboard";
    z = 'clipboard_icon_header';
    if (getClipboardCount() > 0) {
        document[z].src = '/ERICWebPortal/resources/images/btn_images/btn_icon_clipboard_added_ng.gif';    
    } else {
        document[z].src = '/ERICWebPortal/resources/images/btn_images/btn_icon_clipboard_ng.gif';
    }
}
function updateClipBoardImage( newItem , image )
{
    // Find the index to update
    s = 'cb_img_'+newItem;
    document[s].src = image;
    if (image.indexOf("added") > 0)
    {
        document[s].alt = "Added";
        document[s].title = "This record has been added to My Clipboard for printing, emailing, exporting, and saving.";
    }
    else
    {
        document[s].alt = "Add";
        document[s].title = "Add this record to My Clipboard for printing, emailing, exporting, and saving.";
    }
}
function popupWin()
{
    // function to tell user that they are only allowed to have 50 records
    alert("A maximum of 50 records are allowed to be added to My Clipboard.");
}
function windowProp(text)
{
    newWindow = window.open('','newWin','width=300,height=100');
    newWindow.document.write(text);
}
function updateClipboardItem( item , image )
{
	
    var index = clipboardItemIndex(item);
    if (index > -1)
    {
        myarray = getClipboardItems();
        var date = new Date();
        var days = 2;
        date.setTime(date.getTime()+(days*24*60*60*1000));
        del_entry("eric_clipboard", myarray, index, null);
        printClipBoardCount();
        if(image.indexOf("My") > 0)
        {
            image = "Add record to My Clipboard";
            var b = document.getElementById('add_text');
            b.innerHTML = image;
            b.title = "Add this record to My Clipboard for printing, emailing, exporting, and saving.";
        }
        else
        {
            image += "btn_icon_clipboard_text_add_ng.gif";
            updateClipBoardImage(item , image );
        }
        return;
    }
    // Load the array
    myarray = getClipboardItems();
    size = next_entry(myarray);
    if (size<=50)
    {
        myarray[ size ] = item;
        var date = new Date();
        var days = 2;
        date.setTime(date.getTime()+(days*24*60*60*1000));
        set_array("eric_clipboard", myarray, null);
        printClipBoardCount();
        if(image.indexOf("My") > 0)
        {
            image = "Record added to My Clipboard";
            var b = document.getElementById('add_text');
            b.innerHTML = image;
            b.title = "This record has been added to My Clipboard for printing, emailing, exporting, and saving.";
        }
        else
        {
            image += "btn_icon_clipboard_text_added_ng.gif";
            updateClipBoardImage( item , image );
        }
    }
    else
        popupWin();
}
function clipboardItemIndex( item )
{
    myarray = getClipboardItems();
    for(i=0; i<myarray.length; i++)
    {
        if ( myarray[i] == item )
            return i;
    }
    return -1;
}
function clipboardContainsItem( item )
{
    index = clipboardItemIndex(item);
    if ( index < 0 )
        return false;
    else
        return true;
}
function modifySearch(whichPage)
{
    window.location="/ERICWebPortal/basicSearch.do?_pageLabel="+whichPage+"&_noCriteria=false";
}
function newSearch(whichPage)
{
    window.location="/ERICWebPortal/basicSearch.do?_pageLabel="+whichPage+"&_noCriteria=false";
}
function printWindow()
{
    bV = parseInt(navigator.appVersion);
    if (bV >= 4)
        window.print();
}
function openClipboard(url)
{
    window.location.replace(url);
}
