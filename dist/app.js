'use strict';

var _configs = require('../config/configs');

var _configs2 = _interopRequireDefault(_configs);

var _models = require('./models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_configs2.default.name);

new _models.User();
new _models.Product();