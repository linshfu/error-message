(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.ErrorMessage = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var ErrorMessage = function () {
    function ErrorMessage() {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ErrorMessage);

      this.error = error;
      this.error.code = typeof error.code === 'number' ? error.code : '#', this.error.msg = typeof error.msg === 'string' ? error.msg : 'System Error';
    }

    _createClass(ErrorMessage, [{
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
          return _typeof(fn(error)) === 'object' ? fn(error) : error;
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
        return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? new ErrorMessage(error) : new ErrorMessage();
      }
    }]);

    return ErrorMessage;
  }();

  ErrorMessage.middleware = [];
  exports.default = ErrorMessage;
  module.exports = exports['default'];
});
