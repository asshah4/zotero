///<reference name="wz_tooltip.js"/>

function ReplaceAll(Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}

//funcation to emit HTML
function Tooltip_HTML(heading, description, innerDivId) {
    if (!innerDivId) innerDivId = 'ej-box-text-hover';
    ReplaceAll(heading, "<", "&lt;");
    ReplaceAll(heading, ">", "&gt;");
    Tip('<div id=ej-box-modal-drop-shadow-hover><div id=' + innerDivId + '><p><strong>' + heading + '</strong><br />' + description + '</p></div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message for Buy icons
function Tooltip_Buy() {
    Tooltip_HTML('Purchase the article', 'If you are not a subscriber, you may purchase this item with our pay-per-view service.')
}

function Tooltip_Buy_Collection() {
    Tooltip_HTML('Purchase the collection', 'If you are not a subscriber, you may purchase this item with our pay-per-view service.')
}

//Function to show tool-tip message for Partial-Access icons
function Tooltip_Partial() {
    Tooltip_HTML('Partial access to the issue', 'Some of the content within this issue is free. You do not need to be a subscriber to access free content.')
}

//Function to show tool-tip message for Free icons
function Tooltip_Free() {
    Tooltip_HTML('Free access', 'This item has free access. You do not need to be a subscriber to access this item.')
}

//Function to show tool-tip message for SDC icons
function Tooltip_SDC() {
    Tooltip_HTML('Supplemental Digital Content', 'This article contains supplemental content that can be downloaded by clicking a link in the full text.')
}

//Function to show tool-tip message for Online Only icons
function Tooltip_OnlineOnly() {
    Tooltip_HTML('Online only', 'This item is only available online and cannot be found in any print issue of the journal.')
}

//Function to show tool-tip message for CE icons
function Tooltip_CE() {
    Tooltip_HTML('Continuing Education', 'This item is accredited for continuing education. Please contact your society or state board for additional information.')
}

//Function to show tool-tip message for CME icons
function Tooltip_CME() {
    Tooltip_HTML('Continuing Medical Education', 'This item is accredited for continuing medical education. Please contact your society or state board for additional information.')
}

//Function to show tool-tip message for PAP icons
function Tooltip_PAP() {
    Tooltip_HTML('Published Ahead-of-Print', 'This article has not yet been published in print. For a limited time, it is available online.')
}

//Function to show tool-tip message for Errata icons
function Tooltip_Errata() {
    Tooltip_HTML('Errata', 'This article contains errata.')
}

//Function to show tool-tip message for Erratum icons
function Tooltip_Erratum() {
    Tooltip_HTML('Erratum', 'This article contains an erratum.')
}

//Function to show tool-tip message for Deep Archive icons
function Tooltip_DeepArchive() {
    Tooltip_HTML('Deep Archive', 'This is an archive item.')
}

//Function to show tool-tip message for Custom Indicator icons
function Tooltip_CustomIndicator(Custom_Indicator_Name, Custom_Indicator_Description) {
    Tooltip_HTML(findAndReplace(Custom_Indicator_Name), findAndReplace(Custom_Indicator_Description))
}

//Function to show tool-tip message for Video Gallery lock icon
function Tooltip_LOCK() {
    Tooltip_HTML('Locked Content', 'You do not have access to this content. Login or subscribe to view this content.')
}

//Function to show tool-tip message for RSS feed icon
function Tooltip_RSS() {
    Tooltip_HTML('RSS Feed', 'Subscribe to this feed to be notified of updates or changes to this content.')
}

//Function to hide/close the tool-tip message.
function Tooltip_MouseOut() {
    UnTip();
}

//Function to replace special char from inputstring incase of Custom indicators
function findAndReplace(indicator) {
    return indicator.replace(/&amp;/g, "&").replace(/&apos;/g, "\'");
}

//Function to show tool-tip message incase of Previous/Next article link, Title in Feature Article List control and title in Most popular article list control
function Tooltip_Article(title, author, journalName, year, volume, issue, pageRange) {
    Tip('<div id=ej-box-modal-drop-shadow-hover><div id=ej-box-text-hover><p><strong>' + title + '</strong><br />' + author + '<br />' + journalName + ' - ' + year + ' - Volume ' + volume + ' - Issue ' + issue + ' - pp ' + pageRange + '</p> </div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of video title in most popular video list control
function Tooltip_Video(title, source, createdOn, associatedWith, description) {
    if (associatedWith != null && associatedWith != '') {
        Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-text-hover"><p><strong>' + title + '</strong><br /><br /><strong>Author: </strong>' + source + '<br /><strong>Created on: </strong>' + createdOn + '<br /><strong>Associated with: </strong><br />' + associatedWith + '<br />' + description + '</p></div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
    }
    else {
        Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-text-hover"><p><strong>' + title + '</strong><br /><br /><strong>Author: </strong>' + source + '<br /><strong>Created on: </strong>' + createdOn + '<br />' + description + '</p></div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
    }
}

//Function to show tool-tip message incase of "Why do I not have access to the full-text?" on ArtcleViewerPage
function Tooltip_ArticleViewer() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover"><p><strong>You may need to</strong>:</p><ul><li>Login if you are a registered subscriber.</li><li>Register and activate your online subscription. </li><li>Subscribe to this Journal</li><li>Purchase access to this article if you are not a current subscriber.</li></ul><p><strong>Note</strong>: If your society membership provides for full-access to this article, you may need to login on your society\'s web site first.</p></div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of "Alert Me When Cited" on ArtcleViewerPage
function Tooltip_CitedAlert() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover"><p>Receive an email alert every time this article is cited by another article.</p></div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of Network Portfolio
function ToolTip_NetworkPortfolio(portfolioString) {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-text-hover-02">' + portfolioString + '</div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of "Highest Impacted Articles" on MostpopularWebpart
function Tooltip_HighestImpactedArticles() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover"><p>Generally, papers reach their citation peak two, three, or even four years after publication. A small group of papers, however, is recognized very soon after publication, reflected by rapid and significant numbers of citations. These papers are often key papers in their fields. We use a special filter to detect these hot papers and designate them as Highest Impact. This involves looking at recently published papers and unusual citation activity in a current time period. We also take into account the varying citation rates across fields.</p></div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of "ePUB" on ArtcleViewerPage
function Tooltip_ePUB() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover"><p>Article format compatible with many eBook devices like Apple iPad&reg;, Sony eReader&reg;,  B&amp;N Nook&reg; and more…</p><p><strong>Note</strong>: iPad&reg; users, you will need to download and synchronize the EPUB file with iTunes&reg; in order to read the paper in iBooks&reg;.</p></div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of "I am a Society Member" on ArtcleViewerPage
function Tooltip_IAmASocietyMember() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover">Login, register, or activate your online subscription.<p><strong>Note</strong>: If your society membership provides for full-access to this article, you may need to login on your society\'s web site first.</p></div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//Function to show tool-tip message incase of "I am a Subscriber" on ArtcleViewerPage
function Tooltip_IAmASubscriber() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-abstract-hover">Login, register, or activate your online subscription.</div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//function to show the too-tip message of Group Practice Marketing
function ToolTip_GroupPracticeMarketing() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-text-hover-03"><p><span class="ej-tooltip-head-sub-options">Are you part of a Group Practice?</span><br />Group Practice subscriptions allow 4 or more individuals within a practice setting to access the full-text content available on Pathology Network. Access is available to purchase for up to 20 users. Access is managed through the Group Management area, allowing a Group Administrator to manage access across selected users.	</p></div></div><div id="ej-clear-float"></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}

//function to show the too-tip message of Individual registration
function ToolTip_IndividualSubscriberMarketing() {
    Tip('<div id="ej-box-modal-drop-shadow-hover"><div id="ej-box-text-hover-03"><p><span class="ej-tooltip-head-sub-options">Individual Subscriptions</span><br>Individual subscriptions are available for single-user access to Pathology Network.  This access option is a simple and affordable way for you to access the current full-text content from the family of LWW-published Pathology journals in one convenient location.	</p></div></div>', BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, FONTCOLOR, '#000000');
}			
					

