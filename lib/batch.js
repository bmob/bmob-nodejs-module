/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){

    BC.Batch = function(){
        var common= BC.common;
        var err = BC.err;

        this.exec = function(options,fn){
            options.table="POST";
            options.operatetype="batch";
            options.isClass=false;
            common.post(options,fn);
            return;

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
