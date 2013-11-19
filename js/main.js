/*http://pingvisha.ru*/
$(document).ready(function() {
    //Scroll form function
    function Scrollform(elem, start_top){
        if (!elem.hasClass('hide_elem')) {
            var  scroll = $(window).scrollTop();
            var window_height = $(window).height();
            var elem_height = elem.height();
            console.log(window_height + " " + elem_height);
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
    Scrollform($('.scroll_form'), 0);

    $(".phone").mask("+7 999 999-99-99");
});