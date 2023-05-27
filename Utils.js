const { XMLHttpRequest } = require("xmlhttprequest");

module.exports.httpGetSync = (Url, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", Url, false);
    xmlHttp.send(null);
}
