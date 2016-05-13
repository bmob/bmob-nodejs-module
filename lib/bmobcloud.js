/**
* BmobCloud Javascript SDK
* Built: 05-03 2016
*
* copyright 2016
* the Bmob cloud Javascript SDK is freely distributable under the MIT license.
* author: zh_u_
*/


var BC = module.exports = {};

var logger = require('./logger');
var temp = new logger();
global.logger = temp;
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

BC.BC = BC;
