/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports=function(host,verNo,app_key,rest_key){

   var header = {};

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

}
