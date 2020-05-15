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
    global.classManipulator = mod.exports;
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
  * classManipulator.js - Adds and removes CSS classes based on events prescribed by the dev
  *
  * Note that this Class shouldn't be considered with Accessibility requirements as it
  * should only control visual changes and not content.
  *
  * @since 0.1.14
  *
  * @author Digital Services <communications@det.nsw.edu.au>
  * @copyright © 2016 State Government of NSW 2016
  *
  * @class
  * @requires jQuery
  */
  var classManipulator =
  /*#__PURE__*/
  function () {
    /**
    * Creates a new classManipulator
    *
    * @constructor
    *
    * @param {String|jQuery}   selector - the jQuery object or selector string to activate the manipulation
    * @param {Object}   config - class configuration options. Options vary depending on need
    * @param {String}   [config.class_name = "active"] - class name to add or remove
    * @param {String}   [config.event_type = undefined] - type of event to wait for
    * @param {String}   [config.subject = undefined] - replaces the $(selector) as the element which recieves the class manipulation
    * @param {Boolean}  [config.click_outside = true]  - remove the class if there's an outside click
    * @param {String}   [config.click_outside_ignores = true]  - clicking this selector ignores the click outside mechanics
    * @param {Boolean}  [config.toggle = false]  - triggering the same event will remove the class
    * @param {Boolean}  [config.timer.on = false]  - remove the class after a some time
    * @param {Integer}  [config.timer.delay = 750]  - amount of time to wait before removal
    */
    function classManipulator(selector, config) {
      _classCallCheck(this, classManipulator);

      this.config = {
        class_name: "active",
        event_type: undefined,
        subject: undefined,
        toggle: false,
        click_outside: true,
        click_outside_ignores: undefined,
        timer: {
          on: false,
          delay: 750
        } // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      }

      if ($(selector)) {
        // Set the selector
        this.$object = $(selector); // check it exists

        if (this.$object.length > 0) {
          // Select the subject which will have the classes applied
          if (this.config.subject !== undefined) {
            this.setSubject(this.config.subject);
          } else {
            this.setSubject(this.$object);
          } // Make sure the event type is defined


          if (this.config.event_type !== undefined) {
            // Set up the event
            this.$object.on(this.config.event_type, this.eventActions.bind(this));
          } else {
            // fail
            throw new TypeError("ClassManipulator hasn't been given an event.");
          } // If click outside is set


          if (this.config.click_outside === true) {
            $('body').on("click", this.removeTheClass.bind(this));
          } // Click outside ignores are set


          this.ignores = this.config.click_outside_ignores;

          if (this.ignores !== undefined && typeof this.ignores === "string") {
            $(this.ignores).on("click", function (e) {
              e.stopPropagation();
            });
          } else if (this.ignores !== undefined && typeof this.ignores !== "string") {
            console.warn("ClassManipulator: click_outside_ignores was passed a non-string; no ignore clicks added");
          }
        }
      }
    }
    /**
    * Set the $subect
    *
    * @setSubject
    *
    * @param {jQuery|String}   subject - the jQuery object or string selector which will be set as the $subjet
    */


    _createClass(classManipulator, [{
      key: "setSubject",
      value: function setSubject(subject) {
        this.$subject = this.$object.closest(subject);
      } // Things that happen on when event is triggered

    }, {
      key: "eventActions",
      value: function eventActions(e) {
        e.stopPropagation(); // toggle or add the class

        if (this.config.toggle === true) {
          if (e.currentTarget.id.indexOf("drawer") === 0) {
            this.$subject.filter('#' + e.currentTarget.id + "Container").toggleClass(this.config.class_name);
          } else {
            this.$subject.toggleClass(this.config.class_name);
          }
        } else {
          if (e.currentTarget.id.indexOf("drawer") === 0) {
            this.$subject.filter('#' + e.currentTarget.id + "Container").addClass(this.config.class_name);
          } else {
            this.$subject.addClass(this.config.class_name);
          }
        } // if timer is on


        if (this.config.timer.on === true) {
          this.addTimer();
        }
      } // Remove the class

    }, {
      key: "removeTheClass",
      value: function removeTheClass() {
        // remove the class
        this.$subject.removeClass(this.config.class_name); // if timer is on

        if (this.config.timer.on === true) {
          // remove the timer
          this.clearTimer();
        }
      } // Add Timer

    }, {
      key: "addTimer",
      value: function addTimer() {
        // clear any existing timer
        if (this.timer !== undefined) {
          this.clearTimer();
        } // set the timer


        this.timer = setTimeout(this.removeTheClass.bind(this), this.config.timer.delay);
      } // clears the timer

    }, {
      key: "clearTimer",
      value: function clearTimer() {
        clearTimeout(this.timer);
      }
    }]);

    return classManipulator;
  }();

  var _default = classManipulator;
  _exports["default"] = _default;
});