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
    global.classToggle = mod.exports;
  }
})(this, function () {
  "use strict";
  /**
   * A class toggling script designed for view changes only. Do not use for showing and hiding content.
   * Instead use AriaToggler and apply CSS on the attribute changes.
   *
   * @since 1.0.0
   *
   * @author Digital Services <communications@det.nsw.edu.au>
   * @copyright © 2015 State Government of NSW 2015
   *
   * @class
   * @requires jQuery
   */

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var ClassToggle =
  /*#__PURE__*/
  function () {
    /**
     * Creates a new Class Toggle
     *
     * @constructor
     *
     * @param {String|Element|jQuery} selector - Either a CSS selector, DOM element or matched jQuery object
     * @param {Object} config - class configuration options. Options vary depending on need
     * @param {String} config.selectors.active - class selector for the active state of toggle buttons
     *
     */
    function ClassToggle(selector, config) {
      _classCallCheck(this, ClassToggle);

      //console.log("Toggle that class!")
      // Default class config options
      this.config = {
        selectors: {
          active: "active"
        } // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config); //console.log(this.config, config)
      } // Check if selector has been passed to constructor


      if (selector) {
        // Use jQuery to match find the relevant DOM element(s)
        this.$selector = $(selector); //console.log("selector = ", $(selector))
        // Class to toggle

        this.toggleClass = this.$selector.data("gel-class-toggle"); // Element to toggle class on

        this.toggleTarget = this.$selector.data("gel-class-toggle-target"); // Initiate event listener for click of button

        this.$selector.on("click", this.clickLogic.bind(this));
      }
    }

    _createClass(ClassToggle, [{
      key: "clickLogic",
      value: function clickLogic(self) {
        var ACTIVE = this.config.selectors.active;
        var selfElement = $(self.target);
        var enabled = selfElement.data('gel-class-toggle-disable') ? !selfElement.hasClass(ACTIVE) : true; //console.log(selfElement.data('gel-class-toggle-disable'))

        if (enabled) {
          if (!selfElement.hasClass(ACTIVE)) {
            this.$selector.removeClass(ACTIVE);
            selfElement.addClass(ACTIVE);
          } else {
            this.$selector.removeClass(ACTIVE);
          }

          if ($(this.toggleTarget).hasClass(this.toggleClass)) {
            // Remove active class from button
            $(this.selector).removeClass(this.config.selectors.active); // Remove toggle class from target

            $(this.toggleTarget).removeClass(this.toggleClass);
          } else {
            // Add active class to button
            $(this.selector).addClass(this.config.selectors.active); // Add toggle class to target

            $(this.toggleTarget).addClass(this.toggleClass);
          }
        }

        return selfElement;
      }
    }]);

    return ClassToggle;
  }();
  /**
  * Exports the Class Toggle class as a module
  * @module
  */


  new ClassToggle("[data-gel-class-toggle]");
});