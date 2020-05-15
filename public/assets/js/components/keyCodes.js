(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.keyCodes = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  var KeyCodes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    "return": 13,
    escape: 27,
    "delete": 46,
    shift: 16,
    ctrl: 17,
    alt: 18,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    zero: 48,
    one: 49,
    two: 50,
    three: 51,
    four: 52,
    five: 53,
    six: 54,
    seven: 55,
    eight: 56,
    nine: 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,

    /**
     * Return the common name for the passed key code
     *
     * @param {Number} code - Key code number
     *
     * @returns {String} The common name of the key
     */
    keyName: function keyName(code) {
      // Return false if passed key code is not a number
      if (typeof code !== "number") {
        return false;
      } // Loop through known key codes and return common name if passed key code
      // matches known key code


      for (var key in KeyCodes) {
        if (KeyCodes[key] === code) {
          return key;
        }
      }
    }
  };
  var _default = KeyCodes;
  _exports["default"] = _default;
});