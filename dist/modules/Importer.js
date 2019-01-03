'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DirWatcher = require('./DirWatcher');

var _DirWatcher2 = _interopRequireDefault(_DirWatcher);

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _app = require('../app');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Importer = function Importer(event) {
  var _this = this;

  _classCallCheck(this, Importer);

  this.import = function (filename) {
    return (0, _csvtojson2.default)().fromFile(filename);
  };

  this.importSync = function (filename) {
    (0, _csvtojson2.default)().fromFile(filename).then(function (result) {
      return console.log(result);
    });
  };

  event.on("changed", function (filename) {
    console.log('File has been changed!');
    var filePath = _path2.default.join(_app.SVG_FOLDER, filename);
    var result = _this.import(filePath);
    result.then(function (json) {
      return console.log("Content: \n", json);
    });
  });
};

exports.default = Importer;