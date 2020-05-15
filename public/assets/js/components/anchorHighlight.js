(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["/anchorFilter.js", "/scrollToggle.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("/anchorFilter.js"), require("/scrollToggle.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.anchorFilter, global.scrollToggle);
    global.anchorHighlight = mod.exports;
  }
})(this, function (_anchorFilter, _scrollToggle) {
  "use strict";

  _anchorFilter = _interopRequireDefault(_anchorFilter);
  _scrollToggle = _interopRequireDefault(_scrollToggle);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var AnchorHighlight = function AnchorHighlight(selector) {
    _classCallCheck(this, AnchorHighlight);

    this.scroll_config = {
      "subject": "[data-character-name] a",
      "scroller_position": "percent",
      "scroller_percent": 5,
      "linked": true,
      "scroll_window": true,
      "toggle_class": "active" // Instantiate the AnchorFilter

    };
    this.anchor = new _anchorFilter["default"](selector); //Remove unneeded attributes

    $('span').parent().removeAttr('data-character-name'); // Instantiate the ScrollToggle

    this.scroll = new _scrollToggle["default"](selector, this.scroll_config); //IE fix

    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || typeof $.browser !== "undefined" && $.browser.msie == 1) {
      $("li a[href*='#Q']").each(function () {
        $(this).attr('href', '#Qu');
      });
      $("li span[id*='Q']").each(function () {
        $(this).attr('id', 'Qu');
      });
    } // Highlight bottom letters that wont be triggered by scrollToggle


    $('.gel-a-z-anchors li a').click(function () {
      var _this = $(this);

      window.onscroll = function (ev) {
        if (_this != null) {
          $('.gel-a-z-anchors li a').removeClass('active');

          _this.addClass('active');

          _this = null;
        } else {
          _this = null;
        }
      };

      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        if (_this != null) {
          $('.gel-a-z-anchors li a').removeClass('active');

          _this.addClass('active');
        } else {
          _this = null;
        }
      }
    });
  };

  new AnchorHighlight(".gel-a-z-anchors", {
    "singleton": false
  });
});