jQuery(function () {
    $('.accordion').children().click(function () {
        console.log("clicked");
        $(this).nextAll().slideToggle(200,);
    });
});