"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWorker = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var batchedUpdates = function batchedUpdates(callback) {
  if (_react.unstable_batchedUpdates) {
    (0, _react.unstable_batchedUpdates)(callback);
  } else {
    callback();
  }
};

var createWorker = function createWorker(func) {
  if (func instanceof Worker) return func;
  if (typeof func === 'string' && func.endsWith('.js')) return new Worker(func);
  var code = ["self.func = ".concat(func.toString(), ";"), 'self.onmessage = async (e) => {', '  const r = self.func(...e.data);', '  if (r[Symbol.asyncIterator]) {', '    for await (const i of r) self.postMessage(i)', '  } else if (r[Symbol.iterator]){', '    for (const i of r) self.postMessage(i)', '  } else {', '    self.postMessage(await r)', '  }', '};'];
  var blob = new Blob(code, {
    type: 'text/javascript'
  });
  var url = URL.createObjectURL(blob);
  return new Worker(url);
};

var useWorker = function useWorker(func, args) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var worker = (0, _react.useMemo)(function () {
    return createWorker(func);
  }, [func]);
  var lastWorker = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    lastWorker.current = worker;

    worker.onmessage = function (e) {
      if (lastWorker.current !== worker) return;
      batchedUpdates(function () {
        setResult(e.data);
        setError(null);
      });
    };

    worker.onerror = function () {
      if (lastWorker.current !== worker) return;
      batchedUpdates(function () {
        setResult(null);
        setError('error');
      });
    };

    worker.onmessageerror = function () {
      if (lastWorker.current !== worker) return;
      batchedUpdates(function () {
        setResult(null);
        setError('messageerror');
      });
    };

    var cleanup = function cleanup() {
      worker.terminate();
    };

    return cleanup;
  }, [worker]);
  (0, _react.useEffect)(function () {
    var message = Array.isArray(args) ? args : [args];
    lastWorker.current.postMessage(message);
  }, [args]);
  return {
    result: result,
    error: error
  };
};

exports.useWorker = useWorker;