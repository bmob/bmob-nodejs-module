/**
* BmobCloud Javascript SDK
* Built: 05-03 2016
*
* copyright 2016
* the Bmob cloud Javascript SDK is freely distributable under the MIT license.
* author: zh_u_
*/
var BC = module.exports = {};

var con = require('./config');
var logger = require('./logger');
var temp = new logger();

global.logger = temp;
global.restFulHost = con.RESTFUL_HOST;
global.cloudHost = con.CLOUD_HOST;
global.apiVerNo = con.API_VER_NO;
/**
* the module order is important
*/
require('./utils')(BC);

require('./array')(BC);
require('./atom')(BC);
require('./batch')(BC);
require('./bql')(BC);
require('./db')(BC);
require('./file')(BC);
require('./functions')(BC);
require('./location')(BC);
require('./push')(BC);
require('./relation')(BC);


var crypto = require('crypto');
var nodemailer = require('nodemailer');
var bmobencoding = require('encoding');
var bufferHelper = require('bufferhelper');
var libhttp = require('http');
var iconv = require('iconv-lite');
var htmlparser = require("htmlparser");
var async = require("async");
var crypto = require("crypto");
var xml2js = require("xml2js");
var httpClient = require('request');
var EventProxy = require('eventproxy');


BC.getModules = function(bc){
    modules = {
        oArray:new bc.Array(),
        oAtom:new bc.Atom(),
        oBatch:new bc.Batch(),
        oBql:new bc.Bql(),
        oData:new bc.Db(),
        oFile:new bc.File(),
        oFunctions:new bc.Functions(),
        oLocation:new bc.Location(),
        oRelation:new bc.Relation(),
        oPush:new bc.Push(),
        oHttp:httpClient,
        oLibHttp:libhttp,
        oBufferhelper:bufferHelper,
        oEvent:new EventProxy(),
        oMail:nodemailer,
        oIconv: iconv,
        oEncodeing:bmobencoding,
        oHtmlparser:htmlparser,
        oAsync:async,
        oCrypto:crypto,
        oXml2js:xml2js,
        oLog:console
    };

    return modules;
}

BC.BC = BC;
