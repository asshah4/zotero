var win1 = null;
var catid = 0;
var winname = 'AHATree';
var winfeatures = 'toolbar=no,marginwidth=0,marginheight=0,width=640,height=480,directories=no,status=yes,scollbars=yes,resizeable=yes,menubar=no';
var selfname = 'ahajournals';
var selfurl = 'http://www.ahajournals.org/';

function isPlatformOk ()
{
    var ok = false;
    var browserVersion = parseFloat(navigator.appVersion);

    if (navigator.appName == "Netscape")
    {
        if ((browserVersion >= 4.06) && navigator.javaEnabled() && (browserVersion < 6.0))
        {
            if (navigator.platform != "MacPPC")
                ok = true;
        }
    }
    else if (navigator.appName == "Microsoft Internet Explorer")
    {
        if ((browserVersion >= 4.0) && navigator.javaEnabled())
            ok = true;
    }
    else
    {
        if (navigator.javaEnabled())
            ok = true;
    }

    return ok;
}


function fireAppletLoaded ()
{
   window.document.images[0].src = "images/loaded.gif";
}


function checkMacIE ()
{
	if (navigator.appName == "Microsoft Internet Explorer")
    {
        if (navigator.platform == "MacPPC")
            setTimeout('fireAppletLoaded()', 60000);
    }
}


function hyperwindow (catid)
{
    var doc = null;
    var title = null;
    var docurl = '/htj/HWTree.html?catid=';
    var apps = null;
    var reload = true;

    self.name = selfname;

    if (isPlatformOk())
    {    
        // see if window already exists
        if (win1 == null)
        {
            win1 = window.open('', winname, winfeatures);
        }
   
        if (win1 != null)
        {
            if (!win1.closed)
            {
                doc = win1.document;
                if (doc != null)
                {
                    title = doc.title;
                    if ((title != null) && (title != ''))
                        reload = false;
                }
            }
            if (reload)
            {
                docurl = docurl + catid;
                win1 = window.open(docurl, winname, winfeatures);
            }
            else
            {
                apps = doc.applets;
                if (apps != null)
                    apps[0].centerCatId(catid);
            }
        }
    }
    else
    {
        alert('Cannot launch TopicMap applet.\nRequires Java-enabled web browser with\nat least Java 1.1 and AWT 1.1.5.');
        window.open("/help/hbt/#cant", "_blank");
    }
}

function getCatId ()
{
    var myUrl = document.location;
    var search = myUrl.search;

    if (search != '')
    {
        var strObj = new String(search);
        var k;
     
        k = strObj.indexOf('catid=', 0);
        if (k >= 0)
        {
            catid = strObj.substring(k + 6);
        }
    }
}

function makeApplet ()
{
    document.write('<applet code="HWTree.HyperTreeApp" archive=HWTree.jar WIDTH=600 HEIGHT=360 MAYSCRIPT>\n');
    document.write('<PARAM NAME=dataset1         VALUE="data/AHA.stc">\n');
    document.write('<PARAM NAME=topicurl         VALUE="' + selfurl + 'cgi/bbtBrowse">\n');
    document.write('<PARAM NAME=caturl           VALUE="' + selfurl + 'cgi/bbtBrowse?subdir_name=ahajournals_bbt&category=">\n');
    document.write('<PARAM NAME=resultwin        VALUE="' + selfname + '">\n');
    document.write('<PARAM NAME=helpurl          VALUE="' + selfurl + 'help/hbt/">\n');
    document.write('<PARAM NAME=startcatid       VALUE="' + catid + '">\n');
    document.write('<PARAM NAME=thumbnail_dir    VALUE="images">\n');
    document.write('<PARAM NAME=root_image       VALUE="images/hwhack.gif">\n');
    document.write('<PARAM NAME=font_size        VALUE="12">\n');
    document.write('<PARAM NAME=set_thumbnails   VALUE="FALSE">\n');
    document.write('<PARAM NAME=node_shape       VALUE="RECTANGLE">\n');
    document.write('<PARAM NAME=node_text_pos    VALUE="TOP">\n');
    document.write('<PARAM NAME=background_color VALUE="blue">\n');
    document.write('<PARAM NAME=node_color       VALUE="black">\n');
    document.write('<PARAM NAME=text_color       VALUE="white">\n');
    document.write('<PARAM NAME=text_rect        VALUE="TRUE">\n');
    document.write('<PARAM NAME=display_images   VALUE="FALSE">\n');
    document.write('<PARAM NAME=orientation      VALUE="RADIAL">\n');
    document.write('</applet>\n');
}
