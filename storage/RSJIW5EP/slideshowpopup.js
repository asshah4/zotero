var images = null;
var id=null; 
var imageIndex = null;
var imageLength = null;
var startImageId = null;
var imageControl = null;
var labelControl = null;
var imageCountStatusControl = null;
var imageCounter = 1;
var boolBtnClick = false;
var selectedImageGalleryUrl = null;
var imageTitle = null;

//This function hides the WebDialogWindow control
function HideSlideShow()
{
    setSlideShowProperty(false);  
}

//This function shows the WebDialogWindow control
function showSlideShow(){
    
    setSlideShowProperty(true); 
    boolBtnClick = true;
    showImage();
}
function setSlideShowProperty(isShow)
{
    var sControlID = document.getElementById("ImageViewerID");  
	var dialog = $find(sControlID.value);
    if(isShow)
    {
        dialog.set_windowState($IG.DialogWindowState.Normal); 
    } 
    else 
    {
        dialog.set_windowState($IG.DialogWindowState.Hidden); 
    }
}
function MovePrevious()
{

    if(images[imageIndex].previousImageId == '')
    {
        imageCounter = imageLength.value;
        getLastImage();        
    }
    else
    {	
        imageIndex = images[imageIndex].previousImageId;
        imageCounter = imageCounter - 1 ;
    }
    
    setSlideshowDisplay();
    
    imageTitle.innerHTML = images[imageIndex].title;
    labelControl.innerHTML = images[imageIndex].description;
    imageCountStatusControl.innerHTML = imageCounter  + " of " + imageLength.value;

}

function MoveNext()
{
    if(images[imageIndex].nextImageId == '')
    {
        imageCounter = 1;
        getFirstImage();
    }
    else
    {    
        imageIndex = images[imageIndex].nextImageId;
        imageCounter = imageCounter + 1 ;
    }
    
    setSlideshowDisplay();
    
    imageTitle.innerHTML = images[imageIndex].title;
    labelControl.innerHTML = images[imageIndex].description;
    imageCountStatusControl.innerHTML = imageCounter + " of " + imageLength.value;
}

function showFullSizeByImageID(imageID)
{
    imageIndex = imageID;
    
    if( images == null)
    {    
        images = Global_GetImagesCollection();
    }
    
    ShowFullSize();     
}

function ShowFullSize() 
{
    if (images[imageIndex].windowId.match('-')) 
    {
        var windowId = images[imageIndex].windowId.replace('-', '_');
        window.open(images[imageIndex].fullsizeUrl, windowId, 'width=800,height=600,toolbar=no,location=no,status=no,directories=no,scrollbars=yes,menubar=no,resizable=yes')
    }
    else 
    {
        window.open(images[imageIndex].fullsizeUrl, images[imageIndex].windowId, 'width=800,height=600,toolbar=no,location=no,status=no,directories=no,scrollbars=yes,menubar=no,resizable=yes')
    }
}

function showImage()
{
    imageLength =  document.getElementById("NoOfImages");
    startImageId =  getPopupImageId();
    imageIndex = startImageId.value;
    images = Global_GetImagesCollection();
    
    if(boolBtnClick == true)
    {
        getFirstImage();
    }
    boolBtnClick = false;
    setImageCounter();
    
    setSlideshowDisplay();
    
    labelControl = getImageDescription();
    labelControl.innerHTML = images[imageIndex].description;
    imageTitle = getImageTitle();
    imageTitle.innerHTML = images[imageIndex].title;
    imageCountStatusControl = getImageCountStatus();
    imageCountStatusControl.innerHTML = imageCounter + " of " + imageLength.value;

    //disable the Item List Action control
    if (typeof ItemListActionsControl_DisableSubmit == 'function' && ItemListActionsControl_DisableSubmit != undefined) 
    {
        ItemListActionsControl_DisableSubmit();
    }
}

//Set the properties of images
function setImageProperties(src, alt) 
{
    getArticleImage().src = src;
    getArticleImage().alt = alt;
}

function setImageCounter()
{
    imageCounter = 1;
  
    var image;
    for(image in images)
    {
        if(imageIndex == image.toString())
        {
            break;
        }
        else
        {
            imageCounter = imageCounter + 1;
        }
    }
}

function getFirstImage()
{
    imageIndex = startImageId.value;
    while(images[imageIndex].previousImageId)
    {
        imageIndex = images[imageIndex].previousImageId;
    }
}

function getLastImage()
{
    imageIndex = startImageId.value;
    while(images[imageIndex].nextImageId)
    {
        imageIndex = images[imageIndex].nextImageId;
    }
}
// onclicking on the particular image showSlideShow.
function showSlideShowByImageID(imageID)
{
    var popupImageId =  getPopupImageId();
    if(popupImageId != null && imageID != null)
    {
        popupImageId.value = imageID; 
    }
    setSlideShowProperty(true); 
    showImage(); 
}
// when no images are present disable all links.
function disableAll()
{
    var hypSelectAlltop = document.getElementById("hypSelectAlltop");
    if(hypSelectAlltop != null)
    {
        hypSelectAlltop.disabled = true;  
        hypSelectAlltop.removeAttribute('href');  
    }
    var hypSelectAllBottom = document.getElementById("hypSelectAllBottom");
    if(hypSelectAllBottom != null)
    {
        hypSelectAllBottom.disabled = true;  
        hypSelectAllBottom.removeAttribute('href');  
    }
    var btnViewAsSlideshow = document.getElementById("btnViewAsSlideshow");
    if(btnViewAsSlideshow != null)
    {
        btnViewAsSlideshow.disabled = true;  
    }
    var lblImageAvailability = document.getElementById("lblImageAvailability");
    if(lblImageAvailability != null)
    {
      lblImageAvailability.style.display = "block";
    }  
}

// on clicking on the particular title of the image
function slideShow_addToMyCollectionsLinkClicked(linkId)
{
    addToMyCollectionsLinkClicked(linkId);
    var hidden =  getCallshowImage();
    if(hidden != null)
    {
        hidden.value = true;         
    } 
    //After post back add to my collection.
    var popupImageId =  getPopupImageId();
    if(popupImageId != null)
    {
        popupImageId.value = linkId;  
    }
}

//Checks if image tag exist on page. If !null, set image properties.
//This will come into picture when Flash is not installed.
function setImageContol(articleImageField) 
{
    if (articleImageField != null) 
    {        
        setImageProperties(images[imageIndex].popupUrl, images[imageIndex].title);
    }
}

//It checks whether Flash is installed or not. On the basis of that, it decides what to display in Slideshow.
function setSlideshowDisplay()
{
    var divBoxModalImageFlash = document.getElementById("ej-box-modal-image-flash");
    var divBoxModalImage = document.getElementById("ej-box-modal-image");
    var divErrorMessageWidget = document.getElementById("error-message-widget");
    
     if (FlashDetect.installed) 
     {
        setFlashImageProperties(images[imageIndex].originalUrl);
        
        divBoxModalImageFlash.style.display = "block";
        divBoxModalImage.style.display = "none";
        divErrorMessageWidget.style.display = "none";
     }
     else
     {
         /*@cc_on
            @if (@_jscript_version <= 5.6) @*/
                if (navigator.appName == 'Microsoft Internet Explorer') {
                    setTimeout("setImageContol(getArticleImage())", 1000);
                }
         /*@else @*/
                setImageContol(getArticleImage());
         /*@end @*/
        
        divBoxModalImageFlash.style.display = "none";
        divBoxModalImage.style.display = "block";
        divErrorMessageWidget.style.display = "block";
     }
}

function slideShow_ExportToPPT(imgID) {
    if (getIsExportToPPT() != null) {
       getIsExportToPPT().value = 'true';
    }
    __doPostBack("PopUpActionDropDown", imgID);
    getIsExportToPPT().value = 'false';
}
