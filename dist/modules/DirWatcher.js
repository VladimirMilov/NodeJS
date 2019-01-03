"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirWatcher = function () {
  function DirWatcher(event) {
    _classCallCheck(this, DirWatcher);

    this.event = event;
    this.watch(_app.SVG_FOLDER, 500);
  }

  _createClass(DirWatcher, [{
    key: "watch",
    value: function watch(pathname, delay) {
      var _this = this;

      var directoryFiles = {};
      setInterval(function () {
        return _fs2.default.readdir(pathname, function (err, files) {
          if (err) console.error(err);
          files.forEach(function (file) {
            var filePath = pathname + "/" + file;
            var filename = file.split(".")[0];

            var stats = _fs2.default.statSync(filePath);
            var mtime = new Date(stats.mtime);
            // Check if file has been modified
            if (!directoryFiles[filename] || directoryFiles[filename].getTime() !== mtime.getTime()) {
              _this.event.emit("changed", file);
              directoryFiles[filename] = mtime;
            }
          });
        });
      }, delay);
    }
  }]);

  return DirWatcher;
}();

exports.default = DirWatcher;