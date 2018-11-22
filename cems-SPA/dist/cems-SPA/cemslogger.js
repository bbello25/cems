"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(endPointUrl, apiKey) {
        this.endPointUrl = 'http://' + endPointUrl + '/api/log/browserError';
        this.apiKey = apiKey;
    }
    Logger.prototype.log = function (error) {
        console.log(error);
        fetch(this.endPointUrl, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'api-key': this.apiKey
            },
            body: JSON.stringify(error)
        })
            .then(function (res) { return res.json(); })
            .then(function (res) { return console.log(res); });
    };
    Logger.prototype.logString = function (error) {
        fetch(this.endPointUrl, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'api-key': this.apiKey
            },
            body: JSON.stringify(error)
        })
            .then(function (res) { return res.json(); })
            .then(function (res) { return console.log(res); });
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=cemslogger.js.map