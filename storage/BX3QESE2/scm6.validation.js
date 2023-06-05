/************************************************************************/
/*Author:       Subash Maharjan (subashm@silverchair.com)               */
/*Date:         2/8/2011                                                */
/*Project:      Silverchair Content Management 6.0 (SCM6)               */
/*Company:      Silverchair Science + Communications                    */
/*Filename:     scm6.validation.js                                      */
/*Description:  Form validation without form tag instead using DIVs     */
/*              Features:                                               */
/*                      a. Required Field                               */
/*                      b. Name limited to characters                   */
/*                      c. Email                                        */
/*                      d. Multiple emails separated by semi-colon      */
/*                      d. URLs                                         */
/************************************************************************/

$(document).ready(function () {
    $(".formContainer input[type=text]").focus(function () {
        $(this).parent().find(".error").css("display", "none");
        $(this).parent().find(".info").css("display", "block");
        $(this).css("border", "1px solid #ccc");
    }).blur(function () {
        if (!$(this).val()) {
            var value = $(this).attr('class').split(" ");
            if ($(value)[0] == 'required') {
                $(this).css("border", "1px solid red");
                $(this).parent().find(".error").text('This field is required!').css("display", "block");
            }
        }
        $(this).parent().find(".info").css("display", "none");
    });

    $(".formContainer textarea").focus(function () {
        $(this).parent().find(".error").css("display", "none");
        $(this).parent().find(".info").css("display", "block");
        $(this).css("border", "1px solid #ccc");
    }).blur(function () {
        if (!$(this).val()) {
            var value = $(this).attr('class').split(" ");
            if ($(value)[0] == 'required') {
                $(this).css("border", "1px solid red");
                $(this).parent().find(".error").text('This field is required!').css("display", "block");
            }
        }
        $(this).parent().find(".info").css("display", "none");
    });
});
// TODO: clean up validation to parse required and formatted fields cleaner
function validateForm(formName) {
    var frmTextinput = $('#' + formName + ' input[type=text]');
    //$(".formContainer input[type=text]").each(function () {
    $(frmTextinput).each(function () {
        var errorMsg = $(this).parent().find('.error');
        var text = $(this).attr("value");
        var value = $(this).attr('class').split(" ");
        var i = 0, j = 0;
        var bool;
        var msg;
        var currentValue;
        do {
            currentValue = $(value)[i];

            switch (currentValue) {

                case 'email': case 'emailRecipient':
                    if (text != "") {
                        if (currentValue == 'email') {
                            bool = validateEmail(text);
                        }
                        if (currentValue == 'emailRecipient') {
                            bool = validateMultipleEmails(text);
                        }
                        if (bool == false) {
                            msg = "Enter a valid e-mail address.";
                            $(errorMsg).text(msg).css("display", "block");
                            $(this).css("border", "1px solid red");
                        }
                        return false;
                    } else { return true; }
                    break;


                case 'url':
                    if (text != "") {
                        bool = testPattern($.trim(text), "^https?://(.+\.)+.{2,4}(/.*)?$");
                        if (bool == false) {
                            msg = "Enter a valid URL!";
                            $(errorMsg).text(msg).css("display", "block");
                            $(this).css("border", "1px solid red");
                        }
                        return false;
                    } else { return true; }
                    break;

                case 'required': case 'name': case 'instName':
                    if (text == "") {
                        msg = "This field is required!";
                        $(errorMsg).text(msg).css("display", "block");
                        $(this).css("border", "1px solid red");
                        //this breaks validating fields past the first error entry
                        //return false;
                    } else {
                        $(this).css("border", "1px solid #ccc");
                        return true;
                    }
                    break;
            }
            i++;
        } while (i < value.length);
    });

    var frmTextarea = $('#' + formName + ' textarea');
    if (!$(frmTextarea).val()) {
        if ($(frmTextarea).attr('class')) {
            var value = $(frmTextarea).attr('class').split(" ");
            if ($(value)[0] == 'required') {
                $(frmTextarea).css("border", "1px solid red");
                $(frmTextarea).parent().find(".error").text('This field is required!').css("display", "block");
            }
        }
        return false;
    } else {
        $(frmTextarea).parent().find(".info").css("display", "none");
        return true;
    }
    
}

//Tests the regular-expression is valid
var testPattern = function (value, pattern) {
    var regExp = new RegExp(pattern, "");
    return regExp.test(value);
}

//Trims the string
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

//left trim the string
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

//right trim ths string
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

//validate the email
function validateEmail(field) {
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return (regex.test(trim(field))) ? true : false;
}

//validate multiple email addresses separated by semi-colon
function validateMultipleEmails(value) {
    var result = value.split(";");
    
    for (var i = 0; i < result.length; i++)
        if (!validateEmail(result[i]))
            return false;
    return true;
}

//Clear the form
function clearForm() {
    $(".formContainer input[type=text]").each(function () {
        $(this).parent().find(".error").css("display", "none");
        $(this).css("border", "1px solid #ccc");
    });
}

