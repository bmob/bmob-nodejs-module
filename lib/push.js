/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-12.
 */

module.exports=function(BC){
	

    BC.Push = function(){
        var common= BC.common;
        var err = BC.err;

        // install devicetoke or installationId
        this.add = function(options,fn){
            options['table'] = 'installations';
            options.isClass="false";
            common.post(options,fn);
            return;

        }

        //update attribute
        this.update = function(options,fn){

            options['table'] = 'installations';
            options.isClass="false";
            common.put(options,fn);
            return;

        }

        //push message
        this.send = function(options,fn){
            options['table'] = 'push';
            options.isClass="false";
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

    }
}
