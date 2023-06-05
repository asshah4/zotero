//TODO: update these function names to be prefixed with ListContainerControlBase_

function initializeCheckboxes() 
{
    if (getSelectedItemsField() != null) 
    {
        var selectedIds = getSelectedItemsField().value.split(";");

        for (var i = 0; i < selectedIds.length; i++) {
            var checkbox = $get(selectedIds[i]);
            if (checkbox != null) {
                checkbox.checked = true;
            }
        }
        if (selectedIds.length > 1) {
            disabledItemListActionControl(false);
        }
        else {
            disabledItemListActionControl(true);
        }
    }
   
}
function checkChanged(obj, id)
{
    updateSelectedItems(id, obj.checked);   
}
function updateSelectedItems(id, addToList)
{
    var selectedItemsField = getSelectedItemsField();
    var selectedItemsList = selectedItemsField.value;
    
    if(addToList)
    {
        selectedItemsList += id + ";";
    }
    else
    {
        selectedItemsList = selectedItemsList.replace(id + ";", "");
    }
    
    selectedItemsField.value = selectedItemsList;
    if(selectedItemsField.value == '')
    {
        disabledItemListActionControl(true); 
        //if user clicks select all and manually deselect all check box then need to change its state.
        setSelectAll(true);
    }
    else
    {
        disabledItemListActionControl(false); 
         //if user clicks deselect all and manually select all check box then need to change its state.
         setSelectAll(false);
    } 
}

function disabledItemListActionControl(isDisabled)
{
    var container = getListActionsContainer();
    if(container != null)
    {
        setControlsStatus(container.getElementsByTagName('input'), isDisabled, 'button');
        setControlsStatus(container.getElementsByTagName('select'), isDisabled, 'dropDown');
    }
}

function setControlsStatus(controls, isDisabled, type)
{
    if(null != controls)
    {
        for (var i=0; i < controls.length; i++)
        {        
            controls[i].disabled = isDisabled;
            if(type == 'dropDown' && controls[i].selectedIndex == 0)
            {
                var buttons = getListActionsContainer().getElementsByTagName('input');
                if(null != buttons)
                {
                buttons[0].disabled = true; 
                }
            }
        }
    }
}

function addToMyCollectionsLinkClicked(linkId)
{    
    getSelectedItemsField().value = "";    
    SetCheckBoxState(false);
    
    getSelectedItemsField().value = linkId;
}

function shareChannelLinkClicked(linkId) {
    getSelectedItemsField().value = "";
    getSelectedItemsField().value = linkId;
}

function SelectCheckBox() 
{
    var hypSelectAlltop = document.getElementById('hypSelectAlltop');
    var hypSelectAllBottom = document.getElementById('hypSelectAllBottom');
    var setCheckBoxes = false;
    if(hypSelectAlltop != null)
    {
        if(hypSelectAlltop.innerHTML  ==  'Select All')
        {            
            setCheckBoxes = true;            
            hypSelectAlltop.innerHTML = 'Deselect All';   
        }
        else
        {            
            setCheckBoxes = false;          
            hypSelectAlltop.innerHTML = 'Select All'; 
            getSelectedItemsField().value = "";   
        } 
    }
    if(hypSelectAllBottom != null)
    {
        if(hypSelectAllBottom.innerHTML == 'Select All')
        {
            setCheckBoxes = true;
            hypSelectAllBottom.innerHTML = 'Deselect All';            
        }
        else
        {
            setCheckBoxes = false;
            hypSelectAllBottom.innerHTML = 'Select All';
            getSelectedItemsField().value = "";               
        }
    }
    SetCheckBoxState(setCheckBoxes);
} 

function SetCheckBoxState(select)
{
    var list = getCheckBoxListContainer();
    if(list != null)
    {
        var checkboxlist= list.getElementsByTagName('input');
        var i;
        for (i=0; i < checkboxlist.length; i++) 
        {
            if (checkboxlist[i].type == 'checkbox' && checkboxlist[i].checked != select) 
            {
                checkboxlist[i].checked = select;
                checkboxlist[i].onclick(); 
            }
        }
    }
}
// return true if all check box are selected.
function AllCheckBoxState()
{
    var returnValue = true; 
    
    var list = getCheckBoxListContainer();
    if(list != null)
    {
        var checkboxlist= list.getElementsByTagName('input');
        var i;
        for (i=0; i < checkboxlist.length; i++) 
        {
            if (checkboxlist[i].type == 'checkbox' && !checkboxlist[i].checked) 
            {
                returnValue = false;
                break;
            }
        }
    }
    return returnValue; 
}

function setSelectAll(state)
{
    var hypSelectAlltop = document.getElementById('hypSelectAlltop');
    var hypSelectAllBottom = document.getElementById('hypSelectAllBottom');
    
    if(state == false && AllCheckBoxState())
    {
        if(hypSelectAllBottom != null)
        {
            hypSelectAllBottom.innerHTML = 'Deselect All';
        }
        if(hypSelectAlltop != null)
        {
            hypSelectAlltop.innerHTML = 'Deselect All';   
        }
    }
    else
    {
        if(hypSelectAllBottom != null)
        {
            hypSelectAllBottom.innerHTML = 'Select All';
        }
        if(hypSelectAlltop != null)
        {
            hypSelectAlltop.innerHTML = 'Select All'; 
        } 
    }   
}