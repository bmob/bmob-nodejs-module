/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports=function(BC){
	
    BC.Relation = function(){
        var common= BC.common;
        var err = BC.err;

        this.add = function(options,fn){

        	common.post(options,fn);
            return;

        }

        this.update = function(options,fn){

            common.put(options,fn);
            return;

        }

        this.query = function(options,fn){

            common.query(options,fn);
            return;

        }

        this.delete = function(options,fn){

            common.put(options,fn);
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

    }
};