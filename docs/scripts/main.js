
jQuery(function () {

    //Material Desgin Liteの影響でiframe要素は対応が必要
    $('.mdl-layout').on('mdl-componentupgraded', function (e) {
        if ($(e.target).hasClass('mdl-layout')) {
            // IFrame Player API の読み込み
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            console.log("mdl-componentupgraded");
        }
    });
    $('.accordion').children().click(function () {
        $(this).nextAll().slideToggle(200);
    });
});
