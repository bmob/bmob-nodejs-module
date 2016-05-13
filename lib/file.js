/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){

    BC.File = function(){
        var common= BC.common;
        var err = BC.err;

        this.del = function(options,fn){
        	options.method="DELETE";
            options.operatetype="file";
        	if(options.hasOwnProperty('group') && options.hasOwnProperty('url') ){
        		common.fetchResult(options,fn);
        		return;
            }else{
                err['error'] = new Error('input group or url error');
                err['code'] = 60007;
                fn(err,null);
                return;
            }

        }


        this.setHeader = function(options){

            common.setHeader(options);
            return;

        }

        this.getHeader = function(options){

            common.getHeader(options);
            return;

        }
    };
};