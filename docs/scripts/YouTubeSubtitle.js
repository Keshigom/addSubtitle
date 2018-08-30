//need Jquery
class YouTubeSubtitle {
    constructor(videoId, langType) {
        this.videoId = videoId;
        this.langType = langType;
        this.subtitlesArray = new Array();
        this.setSubtitle();
        this.subTitle = "";
    }

    getVideoId() {
        return this.videoId;
    }

    getSubtitleURL() {
        var url = "https://video.google.com/timedtext?hl=" + this.langType + "&lang=" + this.langType + "&name=&v=" + this.videoId;
        return url;
    }

    setSubtitle() {
        var subtitleObj = this;
        var subtitleXml = this.readXml(this.getSubtitleURL());
        $(subtitleXml).find("text").each(function () {
            subtitleObj.subtitlesArray.push(
                [
                    parseFloat($(this).attr("start")),
                    (parseFloat($(this).attr("dur")) + parseFloat($(this).attr("start"))),
                    $(this).text()
                ]
            );
        });
    }

    getSubtitle(time) {
        this.updateSubtitleNow(time);
        return this.subTitle;
    }

    updateSubtitleNow(second) {
        var str = "";
        $.each(this.subtitlesArray, function (index, value) {
            if (value[0] <= second && second < value[1]) {
                str = value[2];
                return false;    // break
            }

            return;
        });
        this.subTitle = str;

    }

    //http://cat.adodtp.com/2016/05/16/?p=14
    readXml(path) {
        var xmls
        $.ajax({
            url: path,
            dataType: "xml",
            async: false,
            cache: false,
            timeout: 1000
        }).done(function (ret) {
            xmls = ret;
        }).fail(function (ret) { }
        );
        return xmls;
    }
}