//need Jquery
class YouTubeSubtitle {
    constructor(videoId, langType) {
        this.videoId = videoId;
        this.langType = langType;
        this.xml = this.readXml(this.getSubtitleURL());
        this.setSubtitle();
        this.endTime = 0.0;
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
        $(this.xml).find("text").each(function () {
            var startTime = 1 * $(this).attr("start");
            startTime = startTime.toFixed(2);
            $(this).attr("start", startTime);
        });
    }

    getSubtitle(time){
        this.updateSubtitleNow(time);
        return this.subTitle;
    }

    updateSubtitleNow(second) {
        var time = (1.0*second).toFixed(1);
        var end = 0.0;
        var str = "";
        $(this.xml).find("text[start^='" + String(time) + "']").each(function () {
            end = 1 * time + 1 * $(this).attr("dur");
            str = $(this).text();
        });
    
        if(end != 0)this.endTime = end;
        if(str != "")this.subTitle = str;

        if(time > this.endTime)this.subTitle = "";

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