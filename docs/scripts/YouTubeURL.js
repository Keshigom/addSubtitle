class YouTubeURL {
    constructor(url) {
        this.url = url;
        this.videoId = this.extractVideoId(url);
    }
    
    static getParam(name, url) {
       // if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /* 静的メソッド */
    static extractVideoId(url) {
        //urlの親の階層を削除
        var parameter = url.replace(/.*\//g, "");
        parameter = this.getParam("v", parameter) ||
            this.getParam("video", parameter) ||
            parameter;

        return parameter;
    }
}