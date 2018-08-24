jQuery(function () {
    $('.accordion').children().click(function () {
        $(this).nextAll().slideToggle(200,);
    });
});