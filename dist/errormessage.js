'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorMessage = function () {
  function ErrorMessage() {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ErrorMessage);

    this.error = {
      code: typeof error.code === 'number' ? error.code : '#',
      msg: typeof error.msg === 'string' ? error.msg : 'System Error'
    };
  }

  (0, _createClass3.default)(ErrorMessage, [{
    key: 'toString',
    value: function toString() {
      return this.error.msg + '[' + this.error.code + ']';
    }
  }, {
    key: 'code',
    value: function code() {
      return this.error.code;
    }
  }, {
    key: 'msg',
    value: function msg() {
      return ErrorMessage.middleware.reduce(function (error, fn) {
        return (0, _typeof3.default)(fn(error)) === 'object' ? fn(error) : error;
      }, this.error).msg;
    }
  }], [{
    key: 'use',
    value: function use(fn) {
      if (!fn || typeof fn !== 'function') {
        return;
      }

      ErrorMessage.middleware = ErrorMessage.middleware.concat(Array.isArray(fn) ? fn : [fn]);
    }
  }, {
    key: 'parse',
    value: function parse(error) {
      return (typeof error === 'undefined' ? 'undefined' : (0, _typeof3.default)(error)) === 'object' ? new ErrorMessage(error) : new ErrorMessage();
    }
  }]);
  return ErrorMessage;
}();

ErrorMessage.middleware = [];
exports.default = ErrorMessage;
module.exports = exports['default'];
