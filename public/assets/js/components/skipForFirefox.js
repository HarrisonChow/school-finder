(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.skipForFirefox = mod.exports;
  }
})(this, function () {
  "use strict";

  window.onload = function () {
    if (location.hash) {
      var elId = location.hash.replace('#', '');
      var scrollToEl = document.getElementById(elId);
      scrollToEl.scrollIntoView(true);
    }
  };

  jQuery(document).ready(function ($) {
    var scrollToEl = $(".gel-skiplink__link");
    scrollToEl.keydown(function (e) {
      if (e.which === 13 || e.which === 8) {
        e.preventDefault();
        var elId = this.hash.replace('#', '');
        var scrollToEl = document.getElementById(elId);
        console.log(scrollToEl);
        scrollToEl.scrollIntoView(true);
        scrollToEl.focus();
      }
    });
  });
});