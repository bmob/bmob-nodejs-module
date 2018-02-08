/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){

	BC.Function = BC.Function || {};

    BC.Function.code = {};

    BC.Function.define = function(name,func){
        BC.Function.code[name] = func;
    };

    BC.Function.func = function(name){
    	return BC.Function.code[name];
    }

	BC.Functions = function(){

		var domain = 'http://127.0.0.1:80/';
		// var domain = 'http://local.test/test/gethttpinfo.php';
	    this.API_VERNO = global.apiVerNo.toString() || '1';
	    var timeout = 30;
	    var http = require('request');
	    var queryStr = require('querystring')
	    var header = {};

	    header['CONTENT-TYPE'] = "application/x-www-form-urlencoded";
		if(BC.appId && BC.restkey){
            header['X-Bmob-Application-Id'] = BC.appId;
            header['X-Bmob-REST-API-Key'] = BC.restkey;
        }else{

            // throw new Error('have not app or rest key!');
            return;
        }


	    this.run = function(options,fn){

	        options.method="POST";

	        if(options.hasOwnProperty('name')){
	            this.fetchResult(options,fn);
	            return;
	        }else{
	            err['error'] = new Error('no function to run');
	            err['code'] = 60004;
	            fn(err,null);
	            return;
	        }
	    };


	    /**
	     * @todo method for remove user with object id,access db.
	     * @param options
	     * @memo options include:
	     * {
	     * 'objectId':'XXXX'        #记录的objectId
	     * }
	     * @param fn 回调函数
	     * fn(err,data)
	     */
	    this.fetchResult = function(options,fn){
	        var http_options = {};
	        var err = {};
	        var url="";

	        url = domain;


	        http_options['method'] = options.method;
	        // http_options['timeout'] = timeout;
	        var joinStr="_e="+queryStr.escape(options.name);
	        if(options.hasOwnProperty('data')){
	            for(var x in options.data){
	                joinStr+="&"+queryStr.escape(x)+"="+queryStr.escape(options.data[x]);
	            }
	        }
	        http_options['body'] = joinStr;

	        // header['CONTENT-LENGTH'] = joinStr.length;
	        http_options['headers'] = header;
	        http_options['url'] = url;


	        if( 'function' == typeof fn){
	            //do execute fetch url
	            // common.post(http_options,fn);
	            fetch_url(http_options,fn);
	        }else{
	            err['error'] = new Error('the type of callback not function!');
	            err['code'] = 60001;
	            fn(err,null);
	            return;
	        }

	    }

	    var fetch_url = function(options,callback){
	    	console.log("fetch_url %v", options);
	        http(options,function(err,res,body){

	            if(err){
	                callback(err,null);//出错把错误信息传给回调函数
	            }else{
	                callback(err,body);
	            }

	        });
	        return;
	    };
	};
};
