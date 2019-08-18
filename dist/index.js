"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useWorker", {
  enumerable: true,
  get: function get() {
    return _useWorker.useWorker;
  }
});
Object.defineProperty(exports, "exposeWorker", {
  enumerable: true,
  get: function get() {
    return _exposeWorker.exposeWorker;
  }
});

var _useWorker = require("./useWorker");

var _exposeWorker = require("./exposeWorker");