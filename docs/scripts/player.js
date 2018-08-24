// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player(
        'player', // 埋め込む場所の指定
        {
            width: 640, // プレーヤーの幅
            height: 390, // プレーヤーの高さ
            videoId: '-sGiE10zNQM', // YouTubeのID
            wmode: 'transparent',

            //プレイヤーのパラメータ
            playerVars: {
                fs: 0
            },

            // イベントの設定
            events: {
                'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
                'onStateChange': onPlayerStateChange // プレーヤーの状態が変更されたときに実行
            }
        }
    );

}

$(function () {
    $('#submit').click(function () {
        var url = String(document.getElementById("url").value);
        url = getVideoId(url);
        ytPlayer.cueVideoById(url, 0, "default");
    });
});



function setUp() {
    subTitleJP = new YouTubeSubtitle(
        getVideoId(ytPlayer.getVideoUrl()),
        "ja"
    );
    subTitleEN = new YouTubeSubtitle(
        getVideoId(ytPlayer.getVideoUrl()),
        "en"
    );
}

// プレーヤーの準備ができたとき
var playerReady = false;
function onPlayerReady(event) {
    // 再生可能
    playerReady = true;

}

// プレーヤーの状態が変更されたとき
function onPlayerStateChange(event) {
    // 現在のプレーヤーの状態を取得
    var ytStatus = event.data;
    if (ytStatus == -1) {
        console.log("初期読み込み");
        var url = ytPlayer.getVideoUrl();
        console.log("読み込み完了" + getVideoId(url));
        setUp();
    }
    // 再生終了したとき
    if (ytStatus == YT.PlayerState.ENDED) {
        console.log('再生終了');
    }
    // 再生中のとき
    if (ytStatus == YT.PlayerState.PLAYING) {
        console.log('再生中');
        // 処理の停止（中断）
        clearInterval(intervalId);
        intervalId = setInterval(dispPlayerTime, 100);
    }
    else {
        // 処理の停止（中断）
        clearInterval(intervalId);
    }
    // 停止中のとき
    if (ytStatus == YT.PlayerState.PAUSED) {
        console.log('停止中');

    }
    // バッファリング中のとき
    if (ytStatus == YT.PlayerState.BUFFERING) {
        console.log('バッファリング中');
    }
    // 頭出し済みのとき
    if (ytStatus == YT.PlayerState.CUED) {
        console.log('頭出し済み');
    }
}




//動画IDの取得
function getVideoId(str) {
    var str = str.replace("https://youtu.be/", "");
    var str = str.replace("https://www.youtube.com/watch?v=", "");

    if (str.indexOf("?") > 0)
        str = str.substring(0, str.indexOf("?"));
    return str
}


// 一定間隔での処理
var intervalId;
function dispPlayerTime() {
    if (playerReady) {
        //console.log(ytPlayer.getCurrentTime());
        updateSubText();
    }
}

var subText = document.getElementById("subText");
function updateSubText() {
    var time = ytPlayer.getCurrentTime().toFixed(1);
    subText.innerHTML = subTitleJP.getSubtitle(time) + "<br>";
    subText.innerHTML += subTitleEN.getSubtitle(time) + "<br>";
}