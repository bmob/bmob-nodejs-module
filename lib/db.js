/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){
   
    /**
     * @todo method for find,access db.
     * @param options
     * @memo options include:
     * {
     * 'table':XXX,             #表名
     * 'keys':'a,b,c',          #返回字段列表，多个字段用,分隔
     * 'where':'{a:10}',        #查询条件是一个object
     * 'order':'-a,b',          #排序列表，[-]字段名称,-表示降序，默认为升序
     * 'limit':10,              #limit大小，一页返回多少条记录，默认为0
     * 'skip':2,                #skip,分页offset，(page-1)*limit
     * 'count':1                #count,只返回符合条件的记录总数，不返回记录。
     * }
     * @param fn 回调函数
     * fn(err,data)
     */

     BC.Db = function(){
        var domain = BC.restFulHost || 'https://api.bmob.cn/';
        this.API_VERNO = BC.apiVerNo.toString() || '1';
        var timeout = 5000;
        var http = require('request');
        var header = {'Content-Type':'application/json'};
        var app_key = BC.appId;

        if(BC.appId && BC.restkey){
            header['X-Bmob-Application-Id'] = BC.appId;
            header['X-Bmob-REST-API-Key'] = BC.restkey;
        }else{
            logger.error("error: have not app or rest key!");
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
                fn(err,null);
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
                fn(err,null);
                return;
            }
        };

        this.find = function(options,fn){
            var http_options = {};
            var err = {};
            if(options && options.hasOwnProperty('table')){
                if('User' == options.table){
                    options['table'] = '_User';
                }
                var url = domain + this.API_VERNO + '/classes/'+ options.table+'?timestamp='+(new Date()).getTime();
                http_options['headers'] = header;
                http_options['method'] = 'GET';
                http_options['timeout'] = timeout;
                delete options.table;//删除table属性

                for(var item in options){
                    if('where'==item){
                        url = url + '&'+item+'='+encodeURIComponent(JSON.stringify(options[item]));
                    }else {
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
            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }

        };

        /**
         * @todo method for findOne,access db.
         * @param options
         * @memo options include:
         * {
         * 'table':XXX,             #表名
         * 'objectId':'XXXX'        #记录的objectId
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.findOne = function(options,fn){
            var http_options = {};
            var err = {};
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/classes/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'GET';
                http_options['timeout'] = timeout;
                delete options.table;//删除table属性
                if(options.hasOwnProperty('objectId')){
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
                    http_options['url'] = url;
                    if( 'function' == typeof fn){
                        //do execute fetch url
                    	logger.trace("db.js http_options:",http_options);
                        fetch_url(http_options,fn);
                    }else{
                        err['error'] = new Error('the type of callback not function!');
                        err['code'] = 60001;
                        fn(err,null);
                        return;
                    }
                }else{
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }

        };
        /**
         * @todo method for update,access db.
         * @param options
         * @memo options include:
         * {
         * 'table':XXX,             #表名
         * 'objectId':'XXXX'        #记录的objectId
         * 'data':'json'            #需要更新的数据，格式为JSON
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.update = function(options,fn){

            logger.trace("appkey:",app_key,",start update db, options: ",options);
            var http_options = {};
            var err = {};
            if(options && options.hasOwnProperty('table')){
                logger.trace("appkey:",app_key,",update db, have table");
                var url = domain + this.API_VERNO + '/classes/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'PUT';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    logger.trace("appkey:",app_key,",update db, not have data");
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
                delete options.table;//删除table属性
                if(options.hasOwnProperty('objectId')){
                    logger.trace("appkey:",app_key,",update db, have objectId");
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
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
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        };
        /**
         * @todo method for insert,access db.
         * @param options
         * @memo options include:
         * {
         * 'table':XXX,             #表名
         * 'data':'json'            #需要更新的数据，格式为JSON
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.insert = function(options,fn){
            var http_options = {};
            var err = {};
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/classes/'+ options.table + '?timestamp='+(new Date()).getTime();
                http_options['url'] = url;
                http_options['headers'] = header;
                http_options['method'] = 'POST';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
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
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        };
        /**
         * @todo method for remove,access db.
         * @param options
         * @memo options include:
         * {
         * 'table':XXX,             #表名
         * 'objectId':'XXXX'        #记录的objectId
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.remove = function(options,fn){
            var http_options = {};
            var err = {};
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/classes/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'DELETE';
                http_options['timeout'] = timeout;

                if(options.hasOwnProperty('objectId')){
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
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
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        };
        /**
         * @todo method for user sign up,access db.
         * @param options
         * @memo options include:
         * {
         * 'data':'json'            #需要更新的数据，格式为JSON
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.userSignUp = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'users';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table + '?timestamp='+(new Date()).getTime();
                http_options['url'] = url;
                http_options['headers'] = header;
                http_options['method'] = 'POST';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
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
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        };
        /**
         * @todo method for user login,access db.
         * @param options
         * @memo options include:
         * {
         * 'username':'aa'            #登录用户名
         * 'password':''              #用户密码
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.userLogin = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'login';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table+'?timestamp='+(new Date()).getTime();
                http_options['headers'] = header;
                http_options['method'] = 'GET';
                http_options['timeout'] = timeout;
                delete options.table;//删除table属性

                for(var item in options){
                    if(('username' == item) || ('password' == item)){
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
            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        };
        /**
         * @todo method for user reset password,access db.
         * @param options
         * @memo options include:
         * {
         * 'data':'{"email":"XX@XX.com"}'      #需要重置密码的用户邮件账号(Email地址),JSON对，如：{'email':'XX@XX.com'}
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.userRestPassword = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'requestPasswordReset';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table + '?timestamp='+(new Date()).getTime();
                http_options['url'] = url;
                http_options['headers'] = header;
                http_options['method'] = 'POST';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
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
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        }
        /**
         * @todo method for get user with object id,access db.
         * @param options
         * @memo options include:
         * {
         * 'objectId':'XXXX'        #记录的objectId
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.getUserByObjectId = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'users';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'GET';
                http_options['timeout'] = timeout;
                delete options.table;//删除table属性
                if(options.hasOwnProperty('objectId')){
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
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
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        }
        /**
         * @todo method for update user with object id,access db.
         * @param options
         * @memo options include:
         * {
         * 'objectId':'XXXX'        #记录的objectId
         * 'data':'json'            #需要更新的数据，格式为JSON
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.updateUserByObjectId = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'users';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'PUT';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
                if(options.hasOwnProperty('objectId')){
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
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
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        }
        /**
         * @todo method for get all user list,access db.
         * @param fn 回调函数
         * fn(err,data)
         */
        this.getAllUser = function(fn){
            var http_options = {};
            var err = {};
            var url = domain + this.API_VERNO + '/users'+'?timestamp='+(new Date()).getTime();
            http_options['url'] = url;
            http_options['headers'] = header;
            http_options['method'] = 'GET';
            http_options['timeout'] = timeout;

            if( 'function' == typeof fn){
                //do execute fetch url
                fetch_url(http_options,fn);
            }else{
                err['error'] = new Error('the type of callback not function!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        }

        /**
         * @todo for request email verify
         * @param options
         * @memo options include:
         * {
         * 'objectId':'XXXX'        #记录的objectId
         * }
         * @param fn 回调函数
         * fn(err,data)
         */
        this.requestEmailVerify = function(options,fn){
            var http_options = {};
            var err = {};

            if(options.hasOwnProperty('data')){
                var url = domain + this.API_VERNO + '/requestEmailVerify' + '?timestamp='+(new Date()).getTime();
                http_options['url'] = url;
                http_options['headers'] = header;
                http_options['method'] = 'POST';
                http_options['timeout'] = timeout;
                if(options.hasOwnProperty('data')){
                    http_options['body'] = JSON.stringify(options.data);
                }else{
                    err['error'] = new Error('the data of options attribute have not!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }
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

        }


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
        this.removeUserByObjectId = function(options,fn){
            var http_options = {};
            var err = {};
            options['table'] = 'users';
            if(options && options.hasOwnProperty('table')){
                var url = domain + this.API_VERNO + '/'+ options.table;
                http_options['headers'] = header;
                http_options['method'] = 'DELETE';
                http_options['timeout'] = timeout;

                if(options.hasOwnProperty('objectId')){
                    url = url + '/' + options.objectId + '?timestamp='+(new Date()).getTime();
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
                    err['error'] = new Error('objectId is empty,so...fuck error!');
                    err['code'] = 60001;
                    fn(err,null);
                    return;
                }

            }else{
                err['error'] = new Error('have not input table name!');
                err['code'] = 60001;
                fn(err,null);
                return;
            }
        }
        var fetch_url = function(options,callback){

           //  http(options,process.domain.intercept(function(err,res,body){
           //      if(err){
           //          callback(err,null);//出错把错误信息传给回调函数
           //      }else{
           //          callback(err,body);
           //      }

           //      process.nextTick(process.domain.intercept(function() {
        			// throw new Error("The individual request will be passed to the express error handler, and your application will keep running.");
        		 //      }));

           //  }));

            logger.trace("appkey:",app_key,",http request url:",options);
            http(options,function(err,res,body){
                if(err){
                    logger.trace("appkey:",app_key,",http response err:",err);
                    callback(err,null);//出错把错误信息传给回调函数
                }else{
                    logger.trace("appkey:",app_key,",http response ");
                    callback(err,body);
                }



            });

            return;
        };
    };
};
