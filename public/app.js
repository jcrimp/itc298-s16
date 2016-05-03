$(document).ready(function(){
   /* $(".navbar-nav li").click(function(){
        console.log('boop');
        $(".navbar-nav li").removeClass("active");
        $(this).addClass("active");
    });*/
    
    /*$.each($('.navbar-nav').find('li'), function() {
        $(this).toggleClass('active', 
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); */
    
    $(".navbar-nav a").on("click", function(){
        $(".navbar-nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
    
    $(".show-form-button").click(function(){
        $(this).addClass("hide");
        $(".add-form").toggleClass('hide');
    });
});