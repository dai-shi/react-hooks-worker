"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWorker = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {
  result: null,
  error: null
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return initialState;

    case 'result':
      return {
        result: action.result,
        error: null
      };

    case 'error':
      return {
        result: null,
        error: 'error'
      };

    case 'messageerror':
      return {
        result: null,
        error: 'messageerror'
      };

    default:
      throw new Error('no such action type');
  }
};

var useWorker = function useWorker(createWorker, input) {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var worker = (0, _react.useMemo)(createWorker, [createWorker]);
  var lastWorker = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    lastWorker.current = worker;

    var dispatchSafe = function dispatchSafe(action) {
      return dispatch(action);
    };

    worker.onmessage = function (e) {
      return dispatchSafe({
        type: 'result',
        result: e.data
      });
    };

    worker.onerror = function () {
      return dispatchSafe({
        type: 'error'
      });
    };

    worker.onmessageerror = function () {
      return dispatchSafe({
        type: 'messageerror'
      });
    };

    var cleanup = function cleanup() {
      dispatchSafe = function dispatchSafe() {
        return null;
      }; // we should not dispatch after cleanup.


      worker.terminate();
      dispatch({
        type: 'init'
      });
    };

    return cleanup;
  }, [worker]);
  (0, _react.useEffect)(function () {
    lastWorker.current.postMessage(input);
  }, [input]);
  return state;
};

exports.useWorker = useWorker;