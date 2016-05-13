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
};