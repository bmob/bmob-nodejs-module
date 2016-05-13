/**
 * cloud code App for Node.js
 * Created by Mathroz on 13-12-4.
 */
var Decode = function(){};
Decode.getHeaderArray = function(_header){
    return new  Buffer(_header,'base64').toString().split('-');
};
Decode.base64_decode = function(_b64Str){
    return new Buffer(_b64Str,'base64').toString();
};
Decode.base64_encode = function(_str){
    return new Buffer(_str).toString('base64');
};
Decode.json_encode = function(_str){
    return JSON.parse(_str);
};
Decode.json_decode = function(_jsonObj){
    return JSON.stringify(_jsonObj);
};
module.exports=Decode;

