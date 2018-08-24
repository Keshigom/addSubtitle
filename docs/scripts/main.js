jQuery(function () {

    //Material Desgin Liteの影響でiframe要素は対応が必要
    $('.mdl-layout').on('mdl-componentupgraded', function (e) {
        if ($(e.target).hasClass('mdl-layout')) {
            // IFrame Player API の読み込み
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    });
    
    $('.accordion').children().click(function () {
        $(this).nextAll().slideToggle(200);
    });

    //送信前に処理をする
    $('form').on('submit', function(){

        this.getElementsByTagName("input")[0].value =  getVideoId(this.getElementsByTagName("input")[0].value);
        //
        // バリデーションチェックや、データの加工を行う。
        //
    
        //バリデーションチェックの結果submitしない場合、return falseすることでsubmitを中止することができる。
//        return false;
    
    });
});
