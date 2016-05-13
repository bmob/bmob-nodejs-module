/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){
	
    BC.Location = function(){
        var common= BC.common;
        var err = BC.err;

        this.create = function(options,fn){

            options.isClass=true;
            common.put(options,fn);

        	return
        }

        this.query = function(options,fn){

            common.query(options,fn);
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