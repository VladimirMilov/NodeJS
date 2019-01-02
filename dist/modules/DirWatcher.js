"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirWatcher = function (_EventEmitter) {
  _inherits(DirWatcher, _EventEmitter);

  function DirWatcher() {
    _classCallCheck(this, DirWatcher);

    var _this = _possibleConstructorReturn(this, (DirWatcher.__proto__ || Object.getPrototypeOf(DirWatcher)).call(this));

    setInterval(function () {
      _this.emit("event");
    }, 1000);
    return _this;
  }

  _createClass(DirWatcher, [{
    key: "watch",
    value: function watch(pathname, delay) {
      var _this2 = this;

      var directoryFiles = {};
      setInterval(function () {
        return _fs2.default.readdir(pathname, function (err, files) {
          if (err) console.error(err);
          files.forEach(function (file) {
            var filePath = pathname + "/" + file;
            var filename = file.split(".")[0];

            var stats = _fs2.default.statSync(filePath);
            var mtime = new Date(stats.mtime);
            if (!directoryFiles[filename] || directoryFiles[filename].getTime() !== mtime.getTime()) {
              _this2.emit("changed", file);
              directoryFiles[filename] = mtime;
            }
          });
        });
      }, delay);
    }
  }]);

  return DirWatcher;
}(_events.EventEmitter);

exports.default = DirWatcher;