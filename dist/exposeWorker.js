"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.async-iterator");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposeWorker = void 0;

require("regenerator-runtime/runtime");

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var exposeWorker = function exposeWorker(func) {
  self.onmessage = function _callee(e) {
    var r, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, i, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _i;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            r = func(e.data);

            if (!r[Symbol.asyncIterator]) {
              _context.next = 37;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 4;
            _iterator = _asyncIterator(r);

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(_iterator.next());

          case 8:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 12;
            return regeneratorRuntime.awrap(_step.value);

          case 12:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 19;
              break;
            }

            i = _value;
            self.postMessage(i);

          case 16:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return regeneratorRuntime.awrap(_iterator["return"]());

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(25);

          case 35:
            _context.next = 64;
            break;

          case 37:
            if (!r[Symbol.iterator]) {
              _context.next = 59;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 41;

            for (_iterator2 = r[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _i = _step2.value;
              self.postMessage(_i);
            }

            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](41);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError2) {
              _context.next = 55;
              break;
            }

            throw _iteratorError2;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            _context.next = 64;
            break;

          case 59:
            _context.t2 = self;
            _context.next = 62;
            return regeneratorRuntime.awrap(r);

          case 62:
            _context.t3 = _context.sent;

            _context.t2.postMessage.call(_context.t2, _context.t3);

          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 21, 25, 35], [26,, 30, 34], [41, 45, 49, 57], [50,, 52, 56]]);
  };
};

exports.exposeWorker = exposeWorker;