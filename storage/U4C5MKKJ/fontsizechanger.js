function fontSizeAdd(elemId, fontURL) {
  var active = getFontStyle(elemId);
  switch (active) {
    case 'font1' :
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
      setActiveStyle('font5', elemId, fontURL);
      break;
    case 'font5' :
      break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function fontSizeMinus(elemId, fontURL) {
  var active = getFontStyle(elemId);
  switch (active) {
    case 'font5' :
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
      setActiveStyle('font1', elemId, fontURL);
      break;
    case 'font1' :
       break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function getFontStyle(elemId) {
  var x = document.getElementById(elemId);
  if(!x) {return 'fontDefault';}
  var z = x.className;
  return z;
}

function setActiveStyle(fontClass, elemId, fontURL) {
  var x = document.getElementById(elemId);
  if(!x) {return;}
  var z = x.className;
  if(z != fontClass) {
    var fontId;
    switch (fontClass) {
    case 'font5' :
      fontId = 5;
      break;
    case 'font4' :
      fontId = 4;
      break;
    case 'font3' :
      fontId = 3;
      break;
    case 'font2' :
      fontId = 2;
      break;
    case 'font1' :
      fontId = 1;
      break;
    default :
      fontId = 3;
      break;
    }
    var url = "/" + fontURL + "/fontsize/" + fontId;
    new Ajax.Request(url);
    x.className=fontClass;
  }
}
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
                for (var i = 0; i < elem.length; i++) {
                                var classes = elem[i].className;
                                if (myclass.test(classes)) retnode.push(elem[i]);
                }
return retnode;
};

function fontSizeAddIm(elemId, fontURL) {
  var active = getFontStyle(elemId);
  var obj;
  var captObj;
  switch (active) {
    case 'font1' :
	  obj = document.getElementsByClassName("height1");
	  captObj = document.getElementsByClassName("innerCaption heightCapt1");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height2";
		captObj[j].className= "innerCaption heightCapt2";
      }
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
	  obj = document.getElementsByClassName("height2");
	  captObj = document.getElementsByClassName("innerCaption heightCapt2");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height3";
		captObj[j].className= "innerCaption heightCapt3";
      }
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
	  obj = document.getElementsByClassName("height3");
	  captObj = document.getElementsByClassName("innerCaption heightCapt3");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height4";
		captObj[j].className= "innerCaption heightCapt4";
      }
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
	  obj = document.getElementsByClassName("height4");
	  captObj = document.getElementsByClassName("innerCaption heightCapt4");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height5";
		captObj[j].className= "innerCaption heightCapt5";
      }
      setActiveStyle('font5', elemId, fontURL);
      break;
    case 'font5' :
      break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function fontSizeMinusIm(elemId, fontURL) {
  var active = getFontStyle(elemId);
  var obj;
  var captObj;
  switch (active) {
    case 'font5' :
	  obj = document.getElementsByClassName("height5");
	  captObj = document.getElementsByClassName("innerCaption heightCapt5");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height4";
		captObj[j].className= "innerCaption heightCapt4";
      }	  
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
	 obj = document.getElementsByClassName("height4");
	 captObj = document.getElementsByClassName("innerCaption heightCapt4");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height3";
		captObj[j].className= "innerCaption heightCapt3";
      }	
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
	 obj = document.getElementsByClassName("height3");
	 captObj = document.getElementsByClassName("innerCaption heightCapt3");
      for(j=0;j<obj.length;j++){
		obj[j].className= "height2";
		captObj[j].className= "innerCaption heightCapt2";
      }	
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
	 obj = document.getElementsByClassName("height2");
	 captObj = document.getElementsByClassName("innerCaption heightCapt2");
	  for(j=0;j<obj.length;j++){
		obj[j].className= "height1";
		captObj[j].className= "innerCaption heightCapt1";
      }	
      setActiveStyle('font1', elemId, fontURL);
      break;
    case 'font1' :
       break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}
