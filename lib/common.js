/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

// module.exports=function(verNo,app_key,rest_key,options,callback){
module.exports=function(BC){
    BC.Common = function(){
        var domain = global.restFulHost || 'https://api.bmob.cn/';
        this.API_VERNO = global.apiVerNo || '1';
        var timeout = 5000;
        var app_key = BC.appId;
        var http = require('request');
        var header = {'Content-Type':'application/json'};

        if(BC.appId && BC.restkey){
            header['X-Bmob-Application-Id'] = BC.appId;
            header['X-Bmob-REST-API-Key'] = BC.restkey;
        }else{

            // throw new Error('have not app or rest key!');
            return;
        }

       /**
         * @todo 设置头文件 setheader.
         * @param options 头文件的key value
         */
        this.setHeader = function(options){
            var err = {};
            if(options){
                for(var item in options){
                    header[item]=options[item];
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                
                return;
            }
        };

        /**
         * @todo method for getHeader.
         * @param options 头文件的key value
         */
        this.getHeader = function(options){
            var err = {};
            if(options ){
                for(var item in options){
                    return header[item];
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                
                return;
            }
        };

        this.query = function(options,fn){

            options.method="GET";

            if(options.hasOwnProperty('table') && options.table != "users") {
                options.isClass=true;
            }


            this.fetchResult(options,fn);
            return;

            // if(options.hasOwnProperty('where')){
            //     this.fetchResult(options,fn);
            //     return;
            // }else{
            //     err['error'] = new Error('input where error');
            //     err['code'] = 60005;
            //     fn(err,null);
            //     return;
            // }
        };

        this.get = function(options,fn){



            this.query(options,fn);
            return ;

        };

        this.post = function(options,fn){

            options.method="POST";
            if( !options.hasOwnProperty('isClass') ){
                options.isClass=true;
            }


            if(options.hasOwnProperty('data')){
                this.fetchResult(options,fn);
                return;
            }else{
                err['error'] = new Error('input data error');
                err['code'] = 60004;
                fn(err,null);
                return;
            }
        };

        this.put = function(options,fn){

            options.method="PUT";
            if( !options.hasOwnProperty('isClass') ){
                options.isClass=true;
            }

            if(options.hasOwnProperty('data')){
                this.fetchResult(options,fn);
                return;
            }else{
                err['error'] = new Error('input data error');
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

            if( options.hasOwnProperty('isClass') && true==options.isClass ){
                url = domain + this.API_VERNO + '/classes';
            }else{
                url = domain + this.API_VERNO ;
            }



            http_options['headers'] = header;
            http_options['method'] = options.method;
            http_options['timeout'] = timeout;
            if(options.hasOwnProperty('data')){
                http_options['body'] = JSON.stringify(options.data);
            }

            if( http_options['method']=="PUT" ){
                if(options.hasOwnProperty('objectId')  ){
                    url = url + "/" + options.table+ '/' + options.objectId + '?timestamp='+(new Date()).getTime();
                    http_options['url'] = url;


                    if( 'function' == typeof fn){
                        //do execute fetch url
                        fetch_url(http_options,fn);
                    }else{
                        err['error'] = new Error('the type of callback not function!');
                        err['code'] = 60001;
                        fn(err,null);
                        return;
                    }
                }else{
                    err['error'] = new Error('not match http method');
                    err['code'] = 60006;
                    fn(err,null);s
                    return;
                }
            }else if( http_options['method']=="GET" ){


                    url = url + "/" + options.table+ '?timestamp='+(new Date()).getTime();
                    for(var item in options){
                        if('where'==item){
                            url = url + '&'+item+'='+encodeURIComponent(JSON.stringify(options[item]));
                        } else {
                            url = url + '&'+item+'='+encodeURIComponent(options[item]);
                        }
                    }
                    http_options['url'] = url;


                    if( 'function' == typeof fn){
                        //do execute fetch url
                        fetch_url(http_options,fn);
                    }else{
                        err['error'] = new Error('the type of callback not function!');
                        err['code'] = 60001;
                        fn(err,null);
                        return;
                    }

            }else if( http_options['method']=="POST" ){

                 if(options.hasOwnProperty('data') ){

                    //batch操作
                    if( options.hasOwnProperty('operatetype') && "batch"==options.operatetype ){
                        url = url + "/batch" + '?timestamp='+(new Date()).getTime();
                    }else if( options.hasOwnProperty('objectId') ){
                        url = url + "/" + options.table+ "/" + options.objectId + '?timestamp='+(new Date()).getTime();
                    }else{
                        url = url + "/" + options.table+ '?timestamp='+(new Date()).getTime();
                    }

                    http_options['url'] = url;

                    if( 'function' == typeof fn){
                        //do execute fetch url
                        fetch_url(http_options,fn);
                    }else{
                        err['error'] = new Error('the type of callback not function!');
                        err['code'] = 60001;
                        fn(err,null);
                        return;
                    }
                }else{
                    err['error'] = new Error('not match http method');
                    err['code'] = 60006;
                    fn(err,null);s
                    return;
                }

            }else if( http_options['method']=="DELETE" ){

                //batch操作
                if( options.hasOwnProperty('operatetype') && "file"==options.operatetype ){
                    url = url + "/files"  + "/"+  options.url + '?timestamp='+(new Date()).getTime();
                }else{
                    url = url + "/" + options.table+ '?timestamp='+(new Date()).getTime();
                }

                http_options['url'] = url;


                if( 'function' == typeof fn){
                    //do execute fetch url
                    fetch_url(http_options,fn);
                }else{
                    err['error'] = new Error('the type of callback not function!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            } else {
                err['error'] = new Error('not match http method');
                err['code'] = 60006;
                fn(err,null);s
                return;
            }


        }

        var fetch_url = function(options,callback){


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
}
