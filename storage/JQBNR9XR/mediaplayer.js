var player;
var cur_pos;
var last_pos;
var duration=0;
var timeoutIDduration;
var timeoutIDload;
var nielsenLoaded = false; 
var videourl='';
var uurl='';
var category='';
var subcategory='';
var title='';
var globalvideoid;
var mediaType='';
var articleurl='';
var totalSeconds=0;

function playerReady(obj){
          player = document.getElementById(obj['id']);
          player.addModelListener("STATE","toggleState");
          player.addModelListener("TIME","timeChange");
          player.addViewListener("SEEK","playerSeek");
          player.addViewListener("VOLUME","playerVolume");
		  player.addControllerListener("MUTE","mutetracker");
		  player.addControllerListener("PLAY","playtracker");
          checkForDuration();
};        

function mutetracker(obj){
	 mutevalue = (obj.state)?1:0;
	 gg1.ggPM(9, mutevalue);
};

function playtracker(obj){
	 if (obj.state){
		 	gg1.ggPM(3, uurl, "content", "<uurl>"+uurl+"</uurl><length>"+duration+"</length><category>"+category+"</category><subcategory>"+subcategory+"</subcategory><title>"+title+"</title>", 1); 
			 last_pos = (last_pos)?last_pos:0;
			 cur_pos = (cur_pos)?cur_pos:0;
			 gg1.ggPM(5, last_pos, cur_pos);
		 }else{
			gg1.ggPM(6, last_pos);
	}
};

function playerVolume(obj){
	  //gg1.ggPM(11, obj['percentage']);	  
};        

function playerSeek(obj){
	  gg1.ggPM(8, last_pos, obj['position']);	  
};        

function timeChange(obj){
	  cur_pos = obj['position'];
	  if(cur_pos > 0){
		last_pos = cur_pos;
	  }
	   duration = obj['duration'];
};        
       
function checkForDuration(){
	  if(duration != undefined){
		clearTimeout(timeoutIDduration);
		gg1.ggPM(3, uurl, "content", "<uurl>"+uurl+"</uurl><length>"+duration+"</length><category>"+category+"</category><subcategory>"+subcategory+"</subcategory><title>"+title+"</title>", 1);
		gg1.ggPM(5, last_pos);
		nielsenLoaded = true;
	  }else{
		timeoutIDduration = setTimeout("checkForDuration();", 100);
		nielsenLoaded = false;
	  }
};
      
function checkForLoad(){
	  if(nielsenLoaded == true){
		clearTimeout(timeoutIDload);
		gg1.ggPM(5, last_pos);		
	  }else{
		timeoutIDload = setTimeout("checkForLoad();", 100);
	  }            
};
        
function toggleState(obj){
	
	  if(obj.newstate == 'PLAYING'){
		//checkForLoad();
	  }      
	  if(obj.newstate == 'PAUSED'){
		//gg1.ggPM(6, last_pos);
	  }      
	  if(obj.newstate == 'COMPLETED'){
		gg1.ggPM(7, last_pos);
	  }      
	  if(obj.newstate == 'IDLE'){
		gg1.ggPM(7, last_pos);
	  }
};

function initPlayer(mediaInfoId){
	jQuery(".mediainfo").hide();
	jQuery(".mediainfo").each(function (i, domEle) {
			if (i == 0){
				jQuery(domEle).toggle();
					videoInfoSet = jQuery(domEle).find(".videoInfo").find("span");
					callEmbedPlayer(videoInfoSet);
			}					   
	});
}


function callEmbedPlayer(videoInfoSet){
	videoid = videoInfoSet[0].innerHTML;
	videourl = videoInfoSet[1].innerHTML;
	streamurl = videoInfoSet[2].innerHTML;
	imgurl = videoInfoSet[3].innerHTML;
	pcategory = videoInfoSet[4].innerHTML;
	psubcategory = videoInfoSet[5].innerHTML;
	ptitle = videoInfoSet[6].innerHTML;
	mediaType = videoInfoSet[7].innerHTML;
	duration = videoInfoSet[8].innerHTML;
	articleurl = videoInfoSet[9].innerHTML;
	convertDurationIntoSeconds(duration);
	embedPlayer(videoid, videourl, streamurl, imgurl, pcategory, psubcategory, ptitle, mediaType, totalSeconds ,articleurl);
}

function convertDurationIntoSeconds(duration){
                var durationStr = duration.toString();
                var durationLen = duration.length;
                var h = durationStr.slice(0,2);
                var m = durationStr.slice(3,5);
                var s = durationStr.slice(6, durationLen);
                totalSeconds = ((parseFloat(h) * 3600) + (parseFloat(m) * 60) + parseFloat(s));
}

function embedPlayer(videoid, videourl, streamurl, imgurl, pcategory, psubcategory, ptitle, mediaType, totalSeconds, articleurl){
		globalvideoid = videoid;
		var mmcFlashVideoPath = videourl;
		var  mmcFlashThumbnailImage = imgurl;
		var flashvariables = (streamurl.substr(0,4)=='rtmp')?{ id: videoid, streamer: streamurl, file: mmcFlashVideoPath, image: mmcFlashThumbnailImage, autoplay: false }:{ id: videoid, file: mmcFlashVideoPath, image: mmcFlashThumbnailImage, autoplay: false }; 
		var attributes = {id: videoid, name: videoid};
		
		var params = { menu: "false",
		
		bgcolor: "#ffffff",
		
		allowscriptaccess:"always",
		controlsbg: "0f7bbc",
		autostart: "false",
		allowFullScreen:"true",
		wmode: "transparent"
		
		}; 
		category=pcategory;
		subcategory=psubcategory;
		title=(ptitle)?((ptitle.length >0)?ptitle:location.href):location.href;
		uurl=articleurl;
		duration=totalSeconds;
		
		if (mediaType == "flv"){
			swfobject.embedSWF('/js/media/VideoPlayer.swf', videoid, '320','266','9.0.115', true,flashvariables, params, attributes);
			}else{
            swfobject.embedSWF('/js/media/VideoPlayer.swf', videoid, '320','24','9.0.115', true,flashvariables, params, attributes);
        }
}

var currPageIndex=1;

function createPageSet(pageSetId){
	jQuery(".medianavprev").addClass("medianavprevinactive");
	var pagelen = jQuery("#"+pageSetId +" li").length-2;
	if (pagelen == 1){jQuery("#"+pageSetId).hide(); return false;}
	jQuery("#"+pageSetId +" li a").click(function(e) {
		if (jQuery(this).hasClass('medianavprevinactive') || jQuery(this).hasClass('medianavnextinactive')){return false;}
		if (jQuery(this).hasClass('medianavprev')){
			currPageIndex = (currPageIndex-1 > 0)?currPageIndex-1:1;
			setCurrPageByIndex(pageSetId, currPageIndex);
			if (currPageIndex == 1){jQuery(this).addClass("medianavprevinactive");}else{jQuery(this).removeClass("medianavprevinactive");jQuery(".medianavnext").removeClass("medianavnextinactive");}
			if (currPageIndex < pagelen){jQuery(".medianavnext").removeClass("medianavnextinactive");}
		}else if (jQuery(this).hasClass('medianavnext')){
			currPageIndex = (currPageIndex+1 < pagelen)?currPageIndex+1:pagelen;
			setCurrPageByIndex(pageSetId, currPageIndex);
			if (currPageIndex == pagelen){jQuery(this).addClass("medianavnextinactive")}else{jQuery(this).removeClass("medianavnextinactive");jQuery(".medianavprev").removeClass("medianavprevinactive");}
			if (currPageIndex > 1){jQuery(".medianavprev").removeClass("medianavprevinactive");}
		}else{
			var t = jQuery(this);
			currPageIndex = setCurrPage(pageSetId, this);
			(currPageIndex == 1)?jQuery(".medianavprev").addClass("medianavprevinactive"):jQuery(".medianavprev").removeClass("medianavprevinactive");
			(currPageIndex == pagelen)?jQuery(".medianavnext").addClass("medianavnextinactive"):jQuery(".medianavnext").removeClass("medianavnextinactive");
		}
		
		setCurrMediaContent(pageSetId, currPageIndex-1);
		e.preventDefault();						 
	});
}


function setCurrMediaContent(pageSetId, scurrPageIndex){
	jQuery(".mediainfo").hide();
	jQuery(".mediainfo").each(function (i, domEle) {
				videoInfoSet = jQuery(domEle).find(".videoInfo").find("span");
				videoid = videoInfoSet[0].innerHTML;
				jQuery('#'+videoid).replaceWith("<div id=" + videoid + ">Video goes here...</div>");
			if (i == scurrPageIndex){
				jQuery(domEle).toggle();
				callEmbedPlayer(videoInfoSet);
			}					   
	});
}


function setCurrPage(pageSetId, currPageObj){
	var clickIndex=0;
	jQuery("#"+pageSetId +" li a").each(function (i, domEle) {
		if (currPageObj == this){
			jQuery(domEle).addClass("active");
			clickIndex = i;
		}else{
			jQuery(domEle).removeClass("active");	
		}
	});	
	return clickIndex;
}

function setCurrPageByIndex(pageSetId, pageIndex){
	jQuery("#"+pageSetId +" li a").each(function (i, domEle) {
		if (pageIndex == i){
			jQuery(domEle).addClass("active");
		}else{
			jQuery(domEle).removeClass("active");	
		}
	});	
}

function setupFullCaption(){
	jQuery('.showfullcaption').click(function (e) {
		showMoreVideoCaption(jQuery(this));		
		e.preventDefault();	
	});
}

function showMoreVideoCaption(moreobj){
	jQuery(moreobj).toggle();
	jQuery(moreobj).prev().toggle();
}
