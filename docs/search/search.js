KEYWORD = getParam("video");
KEY = "AIzaSyDUDnR5zU03lycxyuLR73vIdkCFQ9_bMqY";
var listVideo = [];

function generateVideoCard(videoId, title, thumbnails,channelTitle) {
    cardElement =
        "<div class=" + "'mdl-cell mdl-cell--3-col mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'" + ">" +
        "<div class=" + "'demo-card-wide mdl-card mdl-shadow--2dp'" + ">" +
        "<div class=" + "'mdl-card__title'" +
        "style=" +
        "'background:url(" +
        thumbnails +
        ") center / cover; '" +
        ">" + "</div>" +
        "<div class=" + "'mdl-card__supporting-text'" + "><b>" +
        title +
        "</b><br>"+
        channelTitle +
        "</div>" +
        "<div class='mdl-layout-spacer'></div>" +

        "<div class=" + "'mdl-card__actions mdl-card--border'" + ">" +
        "<a class=" + "'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'" +
        "href='../?video=" +
        videoId +
        "'>" +
        "再生" +
        "</a>" +
        "</div>" +
        "<div class='mdl-card__menu'>" +
        "</div>" +
        "</div>" +
        "</div>";

    $("#result").append(cardElement);
}

$(function () {

    $("#searchVideo").val(KEYWORD);
    $.getJSON(
        apiUrl = "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=" + KEYWORD + "&key=" + KEY + "&maxResults=16",
        {},
        function (json) {
            if (!json.items) return;
            for (var i in json.items) {
                if (json.items[i].id.videoId && json.items[i].id.kind == "youtube#video") {
                    listVideo.push(
                        [
                            json.items[i].id.videoId,
                            json.items[i].snippet.title,
                            json.items[i].snippet.thumbnails.medium.url,
                            json.items[i].snippet.channelTitle
                        ]
                    );
                }
            }
        }
    ).done(function () {
        listVideo.forEach((value) => {
            generateVideoCard(
                value[0],//videoid
                value[1],
                value[2],//thumnailsImage
                value[3]
            );
        });
    });
});

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}