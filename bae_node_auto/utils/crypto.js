/**
 * Created by points on 16/11/18.
 */

var crypto = require("crypto");
var config = require('./config');

var Crypto = function () {

    this.encryptAuto = function (data) {

        const cipher = crypto.createCipher('aes192', config.cryptoKey);
        var encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        global.log4bae(encrypted);
        return encrypted;
    }

    this.decryptAuto = function (data) {
        const decipher = crypto.createDecipher('aes192',config.cryptoKey);
        var decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        global.log4bae(decrypted);
        return decrypted;
    }
}


module.exports =  Crypto;