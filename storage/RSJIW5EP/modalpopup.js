function ejournals_pageLoad(sender, args)
{    
	$addHandler(document, "keydown", OnKeyPress_Popup);
	if(typeof initializeCheckboxes == 'function' && initializeCheckboxes != undefined)
	{
		initializeCheckboxes();
	}
}
function pageLoad(sender, args) {
    closePopups();
}   

function OnKeyPress_Popup(args)
{       
    if(args.keyCode == Sys.UI.Key.esc)
    {            
	   closePopups();
	   CloseSlideShow_ImageGallery();
	   Close_GroupPopups();
    }
}

function Close_GroupPopups() {

	  //close EditGroupNamePopupControl
	  if (typeof closeEditGroupPopUp == 'function' && closeEditGroupPopUp != undefined) {
	      closeEditGroupPopUp();
	  }

	  //close GroupActionPopUpControl()
	  if (typeof closeGroupActionPopUp == 'function' && closeGroupActionPopUp != undefined) {
	      closeGroupActionPopUp();
	  }

	  //close InviteGroupUserPopupControl
	  if (typeof group_CloseInviteGroupUserPopup == 'function' && group_CloseInviteGroupUserPopup != undefined) {
	      group_CloseInviteGroupUserPopup();
	  }

	  if (typeof group_CloseAddUserPopup() == 'function' && group_CloseAddUserPopup() != undefined) {
	      group_CloseAddUserPopup();
	  }
	  
	 if (typeof group_NoTransactionClose == 'function' && group_NoTransactionClose != undefined) {
	      group_NoTransactionClose();
	  }
}

function CloseSlideShow_ImageGallery()
{
    //close ImageGallery Slide Show popup
    if (typeof HideSlideShow == 'function' && HideSlideShow != undefined) {
        HideSlideShow();
    }
    if (typeof Close_Popup == 'function' && Close_Popup != undefined) {
    
        Close_Popup();
    }
}

function closePopups() {

    //closeAddRemove channel Window
    var hiddenAddRemoveAllChannel = getDotNetCtrl('hiddenAddRemoveAllChannel', 'input');
    if (hiddenAddRemoveAllChannel != null && hiddenAddRemoveAllChannel.value != 'True') {
        if (typeof closeAddRemoveWindow == 'function' && closeAddRemoveWindow != undefined) {
            closeAddRemoveWindow();
        }
    }
    else {
        hiddenAddRemoveAllChannel.value = 'false';
    }
    //close Remove Items popup
    var hiddenRemoveItems = getDotNetCtrl('hiddenRemoveItems', 'input');
    if(hiddenRemoveItems != null && hiddenRemoveItems.value != 'true')
    {        
        if(typeof closeRemoveItemsWindow == 'function' && closeRemoveItemsWindow != undefined)
        {
            closeRemoveItemsWindow();          
        }
    }
    else
    {
        hiddenRemoveItems.value = 'false';
    }    
    
    //close Copy Items popup
    var hiddenCopyItems = getDotNetCtrl('hiddenCopyItems', 'input');
    if(hiddenCopyItems != null && hiddenCopyItems.value != 'true')
    {        
        if(typeof closeCopyItemsWindow == 'function' && closeCopyItemsWindow != undefined)
        {
            closeCopyItemsWindow();          
        }
    }
    else
    {
        hiddenCopyItems.value = 'false';
    }    
    
    //close Move Items popup
    var hiddenMoveItems = getDotNetCtrl('hiddenMoveItems', 'input');
    if(hiddenMoveItems != null && hiddenMoveItems.value != 'true')
    {        
        if(typeof closeMoveItemsWindow == 'function' && closeMoveItemsWindow != undefined)
        {
            closeMoveItemsWindow();          
        }
    }
    else
    {
        hiddenMoveItems.value = 'false';
    }    
    
    //close Delete Search Item popup
    var hiddenDeleteSearchItem = getDotNetCtrl('hiddenDeleteSearchItem', 'input');
    if(hiddenDeleteSearchItem != null && hiddenDeleteSearchItem.value != 'true')
    {        
        if(typeof closeDeleteSearchItemWindow == 'function' && closeDeleteSearchItemWindow != undefined)
        {
            closeDeleteSearchItemWindow();          
        }
    }
    else
    {
        hiddenDeleteSearchItem.value = 'false';
    }    
    
    //close Edit Search popup
    var hiddenEditSearch = getDotNetCtrl('hiddenEditSearch', 'input');
    if(hiddenEditSearch != null && hiddenEditSearch.value != 'true')
    {        
        if(typeof closeEditSearchWindow == 'function' && closeEditSearchWindow != undefined)
        {
            closeEditSearchWindow();          
        }
    }
    else
    {
        hiddenEditSearch.value = 'false';
    }   
    
    //close Add Collection popup
    var hiddenAddCollection = getDotNetCtrl('hiddenAddCollection', 'input');
    if(hiddenAddCollection != null && hiddenAddCollection.value != 'true')
    {        
        if(typeof closeAddWindow == 'function' && closeAddWindow != undefined)
        {
            closeAddWindow();          
        }
    }
    else
    {
        hiddenAddCollection.value = 'false';
    }    
    
    //close Edit Collection popup
    var hiddenEditCollection = getDotNetCtrl('hiddenEditCollection', 'input');
    if(hiddenEditCollection != null && hiddenEditCollection.value != 'true')
    {        
        if(typeof closeEditWindow == 'function' && closeEditWindow != undefined)
        {
            closeEditWindow();        
        }
    }
    else
    {
        hiddenEditCollection.value = 'false';
    }    
    
    //close Delete Collection popup
    var hiddenDeleteCollection = getDotNetCtrl('hiddenDeleteCollection', 'input')
    if(hiddenDeleteCollection != null && hiddenDeleteCollection.value != 'true')
    {
        if(typeof closeDeleteWindow == 'function' && closeDeleteWindow != undefined)
        {
            closeDeleteWindow();
        }
    }
    else
    {
        hiddenDeleteCollection.value = 'false';
    }
    
    //close email to colleage popups
    var hiddenEmailToColleague = getDotNetCtrl('hiddenEmailToColleague', 'input');	
	if(hiddenEmailToColleague != null)
	{    
	    if(hiddenEmailToColleague.value != 'true' && hiddenEmailToColleague.value != 'True')
	    {
	        if(typeof closeWindow =='function' &&  closeWindow != undefined) 
      	    {
	           closeWindow();
	        }
	    }
	    else
	    {
	        hiddenEmailToColleague.value = 'false';
	    }
	}
            
    //close Add to my collections popups
    var hiddenAddArticle = getMultipleControls('hiddenAddArticle', 'input');
    var addArticle = false;
    if(hiddenAddArticle != undefined && hiddenAddArticle != null)
    {        
        for(var i = 0; i < hiddenAddArticle.length; i++)
        {
            if(hiddenAddArticle[i] != undefined && hiddenAddArticle[i] != null && (hiddenAddArticle[i].value == 'true' || hiddenAddArticle[i].value == 'True'))
            {
                addArticle = true;
                hiddenAddArticle[i].value = 'false';
                break;
            }
        }
    }
    if(addArticle == false)
    {
       	var addToMyCollectionsControls = getMultipleControls('btnCancelAddToMyCollections', 'input');
	    if(addToMyCollectionsControls != null)
      	{
	        for(var i = 0; i < addToMyCollectionsControls.length; i++)
       	    {
              	if(addToMyCollectionsControls[i] != null && addToMyCollectionsControls[i] != undefined)
	            {
       	            addToMyCollectionsControls[i].click(); 
               	}
	         }
       	}	
        var addToMyCollectionsPopupMessage = getMultipleControls('btnCancelAddToMyCollectionsMessage', 'input');
        if(addToMyCollectionsPopupMessage != null)
        {
            for(var i = 0; i < addToMyCollectionsPopupMessage.length; i++)
            {
                if(addToMyCollectionsPopupMessage[i] != null && addToMyCollectionsPopupMessage[i] != undefined)
                {
                    addToMyCollectionsPopupMessage[i].click(); 
                 }
             }                    
         }
      }
      //close toc popups
      if (typeof getTocControl == 'function' && getTocControl != undefined) 
      {
          if (getTocControl() != null) {
              getTocControl().hide();
          }
      } 
      
            
      //close forgot password popups
      var hiddenForgotPassword = getDotNetCtrl('hiddenForgotPassword', 'input');
      if(hiddenForgotPassword != undefined && hiddenForgotPassword != null)
      {
        if(hiddenForgotPassword.value != 'true' && hiddenForgotPassword.value != 'True')
	    {
	        if (typeof fp_closeForgotPasswordPopup == 'function' && fp_closeForgotPasswordPopup!= undefined)
	        {
	            fp_closeForgotPasswordPopup();
	        }	
	    }
	    else
	    {
	        hiddenForgotPassword.value = 'false'
	    }
	  }
	  //close KeepMeLoggedIn Pop-up

	  if (typeof kml_closeKeepMeLoggedInPopup == 'function' && kml_closeKeepMeLoggedInPopup != undefined)
	  {
	      kml_closeKeepMeLoggedInPopup();
	  }

	  //close PersonalizedFeatures Popup
	  if (typeof kml_closePersonalizedFeaturesPopup == 'function' && kml_closePersonalizedFeaturesPopup != undefined) {
	      kml_closePersonalizedFeaturesPopup();
	  }
	  
	  //close Export selected popup
	  if(typeof closeExportToModalPopUp == 'function' && closeExportToModalPopUp != undefined)
	  {
	        closeExportToModalPopUp();
	  } 
	  
	  //close Save Search Popup
	  if(typeof closeSaveSearchPopup == 'function' && closeSaveSearchPopup != undefined)
	  {
	        closeSaveSearchPopup();
	  } 
	  
	  // hide out line pop up.
	  if(typeof hideOutline == 'function' && hideOutline != undefined)
	  {
	        hideOutline();
	  } 
	  
	  //close JournalsHierarchicalObjectPicker popup
	  if(typeof closeJournalsHierarchicalObjectPickerPopUp == 'function' && closeJournalsHierarchicalObjectPickerPopUp != undefined)
	  {
	        closeJournalsHierarchicalObjectPickerPopUp();
	  } 
	  
	  //close ArticleAndImagePicker popup
	  if(typeof closeArticleAndImagePickerPopUp == 'function' && closeArticleAndImagePickerPopUp != undefined)
	  {
	        closeArticleAndImagePickerPopUp();
	  }

	  //close MagazineFeaturedArticlePopup
	  if (typeof closeMagazineFeaturedArticlePreview == 'function' && closeMagazineFeaturedArticlePreview != undefined) 
	  {
	      closeMagazineFeaturedArticlePreview();
	  }

	  //close blog Comment Preview
	  if (typeof closeCommentPreview == 'function' && closeCommentPreview != undefined) 
	  {
	      closeCommentPreview();
	  }

//	  //close alert subscription popups
//     if (typeof alerts_CloseSubscribeeTOCPopup == 'function' && alerts_CloseSubscribeeTOCPopup != undefined)
//	 {
//        alerts_CloseSubscribeeTOCPopup();
//	 }
  }   

function getMultipleControls(id,tag)
{
    var arObj = document.getElementsByTagName(tag);
	var serverCtrlName = id.replace('/_/g','$');
	var regExId = new RegExp(id+'$', 'ig');
	var controls = new Array(arObj.length);
	for (var i = 0; i < arObj.length; i++)
    {
	    if (arObj[i].id)
	    {
		    if (arObj[i].id.match(regExId))
		    controls[i] = arObj[i];
	    }
	    else if (arObj[i].name)
	    {
		    if (arObj[i].name == serverCtrlName)
		    controls[i] = arObj[i];
	    }
    }
	return controls;
}

function getDotNetCtrl(id,tag)
{
	var arObj = document.getElementsByTagName(tag);
	var serverCtrlName = id.replace('/_/g','$');
	var regExId = new RegExp(id+'$', 'ig');
	for (var i = 0; i < arObj.length; i++)
	{
		if (arObj[i].id)
		{
			if (arObj[i].id.match(regExId))
			return arObj[i];
		}
		else if (arObj[i].name)
		{
			if (arObj[i].name == serverCtrlName)
			return arObj[i];
		}
	}

	return false;
	
}   
    
    
