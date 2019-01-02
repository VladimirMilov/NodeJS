"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DirWatcher = require("./DirWatcher");

var _DirWatcher2 = _interopRequireDefault(_DirWatcher);

var _csvtojson = require("csvtojson");

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SVG_FOLDER = _path2.default.join(__dirname, "../../data");

var Importer = function Importer() {
  var _this = this;

  _classCallCheck(this, Importer);

  this.import = function (filename) {
    return (0, _csvtojson2.default)().fromFile(filename);
  };

  this.importSync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _csvtojson2.default)().fromFile(filename).then(function (result) {
                return console.log(result);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var fileWatcher = new _DirWatcher2.default();
  fileWatcher.watch(SVG_FOLDER, 500);

  fileWatcher.on("changed", function (filename) {
    console.log('File has been changed');
    var filePath = _path2.default.join(SVG_FOLDER, filename);
    var result = _this.import(filePath);
    result.then(function (json) {
      return console.log("Content: \n", json);
    });
  });
};

exports.default = Importer;