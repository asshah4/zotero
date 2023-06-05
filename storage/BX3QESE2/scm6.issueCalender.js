
(function ($) {
    $.fn.issueCalender = function (aInd, htab) {
        
        var tabs = $(this).children(".vTabs").children(); // all of the tabs
        var contents = $(this).children(".vtabContent").children(); // all of the contents
        var activeIndex = 0;
        activeIndex = aInd;

        // Initializing Code
        $(contents[activeIndex]).addClass("activeContent");
        $(tabs[activeIndex]).addClass("activeTab"); //.append(arrowBlock); // Set first tab and first content to active


        //get tab from url if present
        function getMode(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results == null)
                return "";
            else
                return results[1];
        }

        var tabID = getMode('atab'); //tab mode
        
        //Hide all content
        $("div.contentContainer").hide();

        //grabs tab id from url if present and displays that tab
        if (tabID > '0') {
            $(".tabNav .atab:nth-child(" + tabID + ") a").addClass("selected").show(); //Activate first tab
            $("#Div" + tabID).show(); //Show first tab content
        }
        else {
            //$(".tabNav .atab:nth-child(1) a").addClass("selected").show(); //Activate first tab
            if (htab != undefined) {
                $(this).removeClass('activeTab');
                $("#" + htab).show();
            }
        }
           
        //On Click Event
        $(".tabNav div a").click(function () {

            $(".tabNav div a").removeClass("selected"); //Remove any "active" class
            $(".contentContainer").hide(); //Hide all tab content

            return false;
        });
            
        // Event Bindings
        $(".vTabs a").click(function () {
                    
            activeIndex = $(this).parent().prevAll().length; // a clicked -> li -> previous siblings
                    
            $(this).removeClass('activeTab');
            $(this).parent('li').addClass('activeTab');

            $(".activeContent").hide().removeClass(".activeContent");
            $(contents[activeIndex]).fadeIn(800).addClass("activeContent"); // Update content

            return false;
        });
            
        
    };
})(jQuery);


