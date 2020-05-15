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
    global.catalogue = mod.exports;
  }
})(this, function () {
  "use strict";

  jQuery(document).ready(function ($) {
    $(".get-catalogue-teaser_thumbnail").each(function (index) {
      if ($(this).children("img").length === 0) {
        $(this).remove();
      }
    });
  });
});