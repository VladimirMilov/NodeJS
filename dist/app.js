'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVG_FOLDER = undefined;

var _models = require('./models');

var _modules = require('./modules');

require('@babel/polyfill');

var _events = require('events');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVG_FOLDER = exports.SVG_FOLDER = _path2.default.join(__dirname, "../data");

new _models.User();
new _models.Product();
var event = new _events.EventEmitter();
new _modules.DirWatcher(event);
new _modules.Importer(event);