/**
* main about initialize for Bmob Javascript SDK
*/

module.exports = function(BC){
    var err = {};
    require('./common')(BC);
    BC.err = err;

    /**
    * call this method first to set up your authentication tokens for BC
    */
    BC.initialize = function(appid,restkey){
        BC._initialize(appid,restkey);
    };

    BC._initialize = function(appid,restkey){
        if (BC.appid !== undefined &&
            restkey !== BC.restkey &&
            appid !== BC.appid ) {
            console.console.warn('Bmob Javascript SDK is already initialized,please don\'t reinitialize it');
        }

        BC.appId = appid;
        BC.restkey = restkey;


        // BC.common = new commonlib(BC.ApiVerNo,appid,restkey);
        BC.common = new BC.Common();
    };

    BC.setRestfulHost = function(restful){
        global.restFulHost = restful;
    };

    BC.getRestfulHost = function(){
        return global.restFulHost;
    };

    BC.setCloudHost = function(cloudhost){
        global.cloudHost = cloudhost;
    };

    BC.getCloudHost = function(){
        return global.cloudHost;
    };
};
