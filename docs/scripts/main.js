
$(window).on('load', () => {
    //Material Desgin Liteの影響でiframe要素は対応が必要
    //モバイルでmdl-componentupgradedが呼ばれなかった？
    //とりあえずこっちでも実行できる
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

jQuery(function () {

    //Material Desgin Liteの影響でiframe要素は対応が必要
    // $('.mdl-layout').on('mdl-componentupgraded', function (e) {
    //     if ($(e.target).hasClass('mdl-layout')) {
    //         // IFrame Player API の読み込み
    //         console.log("mdl-comupg");
    //         var tag = document.createElement('script');
    //         tag.src = "https://www.youtube.com/iframe_api";
    //         var firstScriptTag = document.getElementsByTagName('script')[0];
    //         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //     }
    // });

    //アコーディオンメニュー
    $('.accordion').click(function () {
        $(this).nextAll().slideToggle(200);
    });


    $('#subTitleSize').html($('#subTitleSlider').val());
    $('#subTitleSlider').on('input change', function () {
        // 変動
        var per = $(this).val();
        $('#subTitleSize').html(per);
        $('#subText').css('font-size', 2 * per * 0.01 + "vw");

    });

    $('#fullScreenButton').click(function () {
        var isFullScreen = document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled ||
            false;
        console.log("fullscreen" + isFullScreen);
        var elem = document.getElementById("youtube-movie");
        if (isFullScreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
    });

    //送信前に処理をする
    $('form').on('submit', function () {

        this.getElementsByTagName("input")[0].value = YouTubeURL.extractVideoId(this.getElementsByTagName("input")[0].value);

    });
});
