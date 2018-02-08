/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports = function(BC){

    BC.Array = function(){
        var common = BC.common;
        var err = BC.err;
        
        this.test = function(){
            return "test";
        }

        this.add = function(options,fn){

            common.post(options,fn);
            return;

        }

        this.addUnique = function(options,fn){

            common.put(options,fn);
            return;

        }

        this.remove = function(options,fn){

            common.put(options,fn);
            return;

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
    };

};
