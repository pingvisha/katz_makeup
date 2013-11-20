/*http://pingvisha.ru*/
$(document).ready(function() {
    //Scroll form function
    function Scrollform(elem, start_top){
        if (!elem.hasClass('hide_elem')) {
            var  scroll = $(window).scrollTop();
            var window_height = $(window).height();
            var elem_height = elem.height();
            elem.css({'position':'absolute','top':'0'});
            start_top = elem.offset().top;
            if((scroll >= start_top)){
                if($(".touch").length){
                    elem.offset({"top":scroll});
                } else {
                    if(elem_height > window_height){
                        elem.css({'position':'fixed','bottom': '-80px', 'top': 'auto'});
                        console.log("sdd");
                    }
                    else {
                        elem.css({'position':'fixed','top': '0','bottom': 'auto' });
                    }
                }
            }
            else {
                elem.css({'position':'absolute','top':'0'});
            }
        }
        setTimeout(function(){
            Scrollform(elem, start_top);
        }, 50);
    }
    if ( $('.scroll_form').length) {
        Scrollform($('.scroll_form'), 0);
    }


    $(".phone").mask("+7 999 999-99-99");

    $('.input_group .input_text').focus(function(){
        $(this).parent().addClass("input_group_focus");
    });
    $('.input_group .input_text').focusout(function(){
        $(this).parent().removeClass("input_group_focus");
    });

    //Validate
    jQuery.validator.addMethod("require_from_group", function(value, element, options) {
        var numberRequired = options[0];
        var selector = options[1];
        var fields = $(selector, element.form);
        var filled_fields = fields.filter(function() {
            return $(this).val() != "";
        });
        var empty_fields = fields.not(filled_fields);
        if (filled_fields.length < numberRequired && empty_fields[0] == element) {
            $(".input_group").addClass("error_group");
            return false;
        }
        $(".input_group").removeClass("error_group");
        return true;
    }, jQuery.format("ФИО"));

    jQuery.validator.addMethod("usPhoneFormat", function (value, element) {
        return this.optional(element) || /^\+7 \d{3} \d{3}\-\d{2}-\d{2} ?$/.test(value);
    }, "телефон");

    var validator = $(".form_vote").validate({
        //errorContainer: $(".error_container"),
        errorLabelContainer: $(".error_container"),
        wrapper: 'p',
        focusCleanup: true,
        rules: {
            // note: you can use variable to avoid repeating
            // of the same code
            first_name: {
                require_from_group: [3, ".input_group input"]
            },
            last_name: {
                require_from_group: [3,".input_group input"]
            },
            second_name: {
                require_from_group: [3,".input_group input"]
            },
            phone: {
                usPhoneFormat: true,
                required: true
            }
        },
        showErrors: function(errorMap, errorList) {
            $(".hide_p").show();
            this.defaultShowErrors();
        }
    });
    $(".form_vote input,.form_vote textarea").on("keyup", function () {
        if ($(".input_group .error").length) {
            $(".input_group").addClass("error_group");
        }
        if (validator.form()) {
            $(".btn_plus").removeClass("btn_plus_disable");
            $(".button_block").addClass("validate_ok");
            $(".hide_p").hide();
        } else {
            $(".btn_plus").addClass("btn_plus_disable");
            $(".button_block").removeClass("validate_ok");
        }
    })
});