/**
* main about initialize for Bmob Javascript SDK
*/

module.exports = function(BC){
    var con = require('./config');
    var commonlib = require('./common');
    var err = {};


    BC.restFulHost = con.RESTFUL_HOST;
    BC.cloudHost = con.CLOUD_HOST;
    BC.apiVerNo = con.API_VER_NO;
    BC.err = err;

    /**
    * call this method first to set up your authentication tokens for BC
    */
    BC.initialize = function(appid,restkey,masterkey){
        BC._initialize(appid,restkey,masterkey);
    };

    BC._initialize = function(appid,restkey,masterkey){
        if (BC.appid !== undefined &&
            restkey !== BC.restkey &&
            appid !== BC.appid &&
            masterkey !== BC.masterkey) {
            console.console.warn('Bmob Javascript SDK is already initialized,please don\'t reinitialize it');
        }

        BC.appId = appid;
        BC.restkey = restkey;
        BC.masterkey = masterkey;

        BC.common = new commonlib(BC.RestFulHost,BC.ApiVerNo,appid,restkey);
    };
};
