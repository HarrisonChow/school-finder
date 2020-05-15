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
    global.anchorFilter = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
    * Loops through A to Z list and makes unused tabs inactive.
    *
    * @since 0.4.0
    *
    * @author Digital Services <communications@det.nsw.edu.au>
    * @copyright © 2015 State Government of NSW 2015
    *
    * @class
    * @requires jQuery
    */
  var AnchorFilter =
  /*#__PURE__*/
  function () {
    function AnchorFilter(selector, config) {
      _classCallCheck(this, AnchorFilter);

      /**
        *
        * @param {string} config.container: selector for the A to Z ordered list.
        * @param {string} config.inactive_class: The class that gets added to the tabs that are missings hrefs.
        *
        */
      this.config = {
        "container": selector,
        "inactive_class": "inactive" // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      } // Find all of the anchor elements within the container and store in variable.


      this.anchors = $(this.config.container).find('a'); // Error message displayed if no anchor elements exist.
      // if (this.anchors.length == 0) {
      //   console.warn("AnchorFilter: cannot find the anchors within selector: " + selector)
      //   throw new RangeError("Couldn't find any anchors")
      // }
      // Call testAnchors function

      if (this.anchors.length > 0) {
        this.testAnchors();
      }
    }
    /**
    * Finds and tests the Anchors
    *
    * @testAnchors
    *
    */


    _createClass(AnchorFilter, [{
      key: "testAnchors",
      value: function testAnchors() {
        // Stores contents of 'this' in new variable so there is no clash with the function below.
        var _this = this;

        this.anchors.each(function (i) {
          // Checks to see if the href attribute has a corresponding element. If it doesn't, calls makeInactive function
          var id = $(this).attr("href");

          if ($(id).length == 0) {
            _this.makeInactive(this);
          }
        });
      }
      /**
      * Make Anchors without corresponding elements inactive
      *
      * @testAnchors
      *
      */

    }, {
      key: "makeInactive",
      value: function makeInactive(element) {
        var $el = $(element),
            $parent = $el.parent(); // Add inactive class

        $el.addClass(this.config.inactive_class); // Change anchor to span

        var html = $parent.html(),
            span = html.replace('<a', '<span').replace('</a', '</span');
        $parent.empty().append(span); // Remove the href value

        $parent.find('span').removeAttr('href');
      }
    }]);

    return AnchorFilter;
  }();

  var _default = AnchorFilter;
  _exports["default"] = _default;
});