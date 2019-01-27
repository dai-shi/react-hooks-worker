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

var useWorker = function useWorker(url, message) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var worker = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var w = new Worker(url);

    w.onmessage = function (e) {
      setResult(e.data);
      setError(null);
    };

    w.onerror = function () {
      setResult(null);
      setError('error');
    };

    w.onmessageerror = function () {
      setResult(null);
      setError('messageerror');
    };

    worker.current = w;

    var cleanup = function cleanup() {
      w.terminate();
    };

    return cleanup;
  }, [url]);
  (0, _react.useEffect)(function () {
    worker.current.postMessage(message);
  }, [message]);
  return {
    result: result,
    error: error
  };
};

exports.useWorker = useWorker;