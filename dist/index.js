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

var createWorker = function createWorker(func) {
  if (func instanceof Worker) return func;
  if (typeof func === 'string' && func.endsWith('.js')) return new Worker(func);
  var code = ["self.func = ".concat(func.toString(), ";"), 'self.onmessage = async (e) => {', '  const r = self.func(e.data);', '  if (r[Symbol.asyncIterator]) {', '    for await (const i of r) self.postMessage(i)', '  } else if (r[Symbol.iterator]){', '    for (const i of r) self.postMessage(i)', '  } else {', '    self.postMessage(await r)', '  }', '};'];
  var blob = new Blob(code, {
    type: 'text/javascript'
  });
  var url = URL.createObjectURL(blob);
  return new Worker(url);
};

var useWorker = function useWorker(func, input) {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var worker = (0, _react.useMemo)(function () {
    return createWorker(func);
  }, [func]);
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