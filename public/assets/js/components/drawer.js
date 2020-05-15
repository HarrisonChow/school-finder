(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["/classManipulator.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("/classManipulator.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.classManipulator);
    global.drawer = mod.exports;
  }
})(this, function (_classManipulator) {
  "use strict";

  _classManipulator = _interopRequireDefault(_classManipulator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  new _classManipulator["default"](".gel-drawer a", {
    "event_type": "click",
    "subject": ".gel-drawer",
    "toggle": true,
    "click_outside": true,
    "click_outside_ignores": ".gel-drawer div"
  });
});