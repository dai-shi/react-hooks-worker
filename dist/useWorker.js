"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWorker = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {};

var useWorker = function useWorker(createWorker, input) {
  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var worker = (0, _react.useMemo)(createWorker, [createWorker]);
  var lastWorker = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    lastWorker.current = worker;

    var setStateSafe = function setStateSafe(nextState) {
      return setState(nextState);
    };

    worker.onmessage = function (e) {
      return setStateSafe({
        result: e.data
      });
    };

    worker.onerror = function () {
      return setStateSafe({
        error: 'error'
      });
    };

    worker.onmessageerror = function () {
      return setStateSafe({
        error: 'messageerror'
      });
    };

    var cleanup = function cleanup() {
      setStateSafe = function setStateSafe() {
        return null;
      }; // we should not setState after cleanup.


      worker.terminate();
      setState(initialState);
    };

    return cleanup;
  }, [worker]);
  (0, _react.useEffect)(function () {
    lastWorker.current.postMessage(input);
  }, [input]);
  return state;
};

exports.useWorker = useWorker;