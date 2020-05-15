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
    global.scrollToggle = mod.exports;
  }
})(this, function (_exports) {
  "use strict";
  /**
    * Toggles data-attributes on a selected subject element when the viewport has scrolled past a specific checkpoint element
    *
    * @since 0.2.02
    * @updated 0.4.4
    *
    * @author Digital Services <communications@det.nsw.edu.au>
    * @copyright © 2015 State Government of NSW 2015
    *
    * @class
    * @requires jQuery
    */

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var ScrollToggle =
  /*#__PURE__*/
  function () {
    function ScrollToggle(selector, config) {
      _classCallCheck(this, ScrollToggle);

      /**
        *
        * @param {boolean} config.scroll_window: tests the scroll position of the window
        * @param {string} config.container: selector for the element which scrolls
        * @param {string|number} config.checkpoint: selector for the element which triggers the toggle scrolled past, or distance from top of document in pixels
        * @param {string} config.subject: selector for the element accepts the toggle
        * @param {string} config.passed_attr: attribute which gets added when the checkpoint is passed
        * @param {string} config.scroller_position: if the config.scroll_window is true, check the checkpoint against the bottom, middle, top or percentage of screen. Options: "bottom"| "middle"|"top"|"percent", default: "bottom"
        * @param {string} config.scroller_percent: the percent of the viewport which is set to pass the checkpoint
        * @param {boolean} config.linked: Set to true if the checkpoint is the href value of the subject anchor tag
        * @param {sting} config.toggle_class: Set a class to toggle on and off depending if the checkpoint has passed
        * @param {string} config.external: data attribute for the id of an external subject
        *
        */
      this.config = {
        "scroll_window": false,
        "container": selector,
        "checkpoint": "[data-gel-scrolltoggle-checkpoint]",
        "subject": "[data-gel-scrolltoggle-subject]",
        "passed_attr": "data-gel-scrolltoggle-passed",
        "scroller_position": "bottom",
        "scroller_percent": undefined,
        "linked": false,
        "toggle_class": undefined,
        "external": "data-gel-scrolltoggle-subject-id" // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      } // set some vital selectors


      this.$container = $(this.config.container);
      this.$subject = this.findSubject();

      if (this.$subject.length == 0) {
        // no subjects found
        console.warn('ScrollToggle: no subject(s) found (' + this.config.subject + '); aborting');
        return;
      } // Find checkpoints based on href values if config.linked is true


      if (this.config.linked && this.$subject) {
        var _this = this,
            checkpoints = ''; // Get all the checkpoints


        this.$subject.each(function (i) {
          if (i === _this.$subject.length - 1) {
            if ($(this).is('a')) {
              checkpoints += $(this).attr("href");
            } else if ($(this).is('option')) {
              checkpoints += $(this).attr("value");
            }
          } else {
            if ($(this).is('a')) {
              checkpoints += $(this).attr("href") + ", ";
            } else if ($(this).is('option')) {
              checkpoints += $(this).attr("value") + ", ";
            }
          }
        });
        this.$checkpoint = $(checkpoints);
        this.number_checkpoint = false;
      } // Test the checkpoints


      if (typeof this.config.checkpoint !== "number" && !this.config.linked) {
        this.$checkpoint = this.$container.find(this.config.checkpoint);
        this.number_checkpoint = false; // test that elements exist

        if (this.$checkpoint.length > 1) {
          // too many checkpoints
          console.warn('ScrollToggle: too many checkpoints found (' + this.config.checkpoint + '); aborting');
          return;
        } else if (this.$checkpoint.length == 0) {
          // not enough checkpoints
          console.warn('ScrollToggle: no checkpoints found (' + this.config.checkpoint + '); aborting');
          return;
        }
      } // Set the scroller


      if (this.config.scroll_window === true) {
        this.scroller = $(window);
      } else {
        this.scroller = this.$container;
      } // scroller_position is set to "percent"; make sure percent is set


      if (this.config.scroller_position === "percent" && typeof this.config.scroller_percent !== 'number') {
        this.config.scroller_position = "bottom";
      } // set the passed attribute to false


      if (this.$subject) {
        this.beforeCheckpoint(this.$subject);
      }

      this.configureScrollTests();
      this.scroller.trigger("scroll");
    } // Finds the subject
    // Returns a jQuery object if subject is found, otherwise returns false


    _createClass(ScrollToggle, [{
      key: "findSubject",
      value: function findSubject() {
        // first search for an internal subject
        if (this.$container.find(this.config.subject).length > 0) {
          return this.$container.find(this.config.subject); // otherwise check for the external id config
        } else if ($(this.config.container).attr(this.config.external) !== undefined) {
          var subject_id = $(this.config.container).attr(this.config.external);
          return $(subject_id); // otherwise there's no subject
        } else {
          return false;
        }
      } // Tests a single checkpoint

    }, {
      key: "scrollTestSingle",
      value: function scrollTestSingle() {
        var _this = this; // test position


        this.scroller.scroll(function () {
          if (_this.scroller.scrollTop() > _this.checkpoint_offset) {
            if (_this.$subject) {
              _this.afterCheckpoint(_this.$subject);
            }
          } else {
            if (_this.$subject) {
              _this.beforeCheckpoint(_this.$subject);
            }
          }
        });
      } // Tests multiple checkpoints

    }, {
      key: "scrollTestMulti",
      value: function scrollTestMulti() {
        // create array of checkpoints and selectors
        var _this = this;

        this.checkpoint_arr = [];
        this.$checkpoint.each(function (index) {
          _this.checkpoint_arr[index] = {
            "offset": _this.setOffset($(this).offset().top),
            "$subject": _this.$subject.eq(index)
          };
        }); // create the scroll tests

        this.scroller.scroll(function () {
          for (var i = 0; i < _this.checkpoint_arr.length; i++) {
            var $current_subject = _this.checkpoint_arr[i].$subject; // check that the next scroll is defined

            if (_this.checkpoint_arr[i + 1] !== undefined) {
              // if the scroll position is between the current checkpoint and the next one
              if (_this.scroller.scrollTop() > _this.checkpoint_arr[i].offset && _this.scroller.scrollTop() < _this.checkpoint_arr[i + 1].offset) {
                if ($current_subject) {
                  _this.afterCheckpoint($current_subject);
                }
              } else {
                if ($current_subject) {
                  _this.beforeCheckpoint($current_subject);
                }
              }
            } else {
              // last checkpoint - check to see if the scroller has passed
              if (_this.scroller.scrollTop() > _this.checkpoint_arr[i].offset) {
                if ($current_subject) {
                  _this.afterCheckpoint($current_subject);
                }
              } else {
                if ($current_subject) {
                  _this.beforeCheckpoint($current_subject);
                }
              }
            }
          }
        });
      } // Sets up the values for for the scroll test

    }, {
      key: "configureScrollTests",
      value: function configureScrollTests() {
        var _this = this; // get & set the offset


        if (this.number_checkpoint !== false) {
          // if number
          this.checkpoint_offset_top = this.config.checkpoint;
          this.checkpoint_offset = _this.setOffset(this.checkpoint_offset_top); // test the scroll

          this.scrollTestSingle();
        } else if (this.$checkpoint.length > 1) {
          // test the scroll
          this.scrollTestMulti();
        } else {
          // get the checkpoints in numerical form
          var getCheckpoints = function getCheckpoints() {
            _this.checkpoint_offset_top = _this.$checkpoint.offset().top;
            _this.checkpoint_offset = _this.setOffset(_this.checkpoint_offset_top);
          };

          getCheckpoints(); //run the offset test every second incase there are changes to DOM

          setInterval(function () {
            // find element position
            getCheckpoints();
          }, 1000); // test the scroll

          this.scrollTestSingle();
        }
      } // Return the offset based on whether the scroller is the window or element

    }, {
      key: "setOffset",
      value: function setOffset(offset_top) {
        var scroller_height = this.scroller.height();

        if (this.config.scroll_window === true) {
          // test checkpoints' position in relation to window as set by config.scroller_position
          switch (this.config.scroller_position) {
            case "top":
              return offset_top;
              break;

            case "middle":
              return offset_top - scroller_height / 2;
              break;

            case "percent":
              return offset_top - scroller_height / 100 * this.config.scroller_percent;

            default:
              return offset_top - scroller_height;
              break;
          }
        } else {
          return offset_top + this.scroller.scrollTop() - scroller_height;
        }
      }
    }, {
      key: "beforeCheckpoint",
      value: function beforeCheckpoint($subject) {
        // set the passed attribute to true
        $subject.attr(this.config.passed_attr, "false");

        if (this.config.toggle_class !== undefined) {
          if ($subject.is('a')) {
            $subject.removeClass(this.config.toggle_class);
          } else if ($subject.is('option')) {
            $subject.prop('selected', '');
          } else {
            $subject.removeClass(this.config.toggle_class);
          }
        }
      }
    }, {
      key: "afterCheckpoint",
      value: function afterCheckpoint($subject) {
        // set the passed attribute to true
        $subject.attr(this.config.passed_attr, "true");

        if (this.config.toggle_class !== undefined) {
          if ($subject.is('a')) {
            $subject.addClass(this.config.toggle_class);
          } else if ($subject.is('option')) {
            $subject.prop('selected', 'selected');
          } else {
            $subject.addClass(this.config.toggle_class);
          }
        }
      }
    }]);

    return ScrollToggle;
  }();

  var _default = ScrollToggle;
  _exports["default"] = _default;
  new ScrollToggle();
  new ScrollToggle("body", {
    "checkpoint": ".gel-LD-main",
    "subject": ".gel-LD-index",
    "passed_attr": "data-scroll-passed",
    "scroll_window": true,
    "scroller_position": "top"
  });
  new ScrollToggle("body", {
    "checkpoint": "[data-gel-a-z-anchors-scroll]",
    "subject": ".ac",
    "passed_attr": "data-scroll-passed",
    "scroll_window": true,
    "scroller_position": "top"
  });
  new ScrollToggle("body", {
    "checkpoint": 1500,
    "subject": ".gel-btt, .gel-mobile-btt",
    "passed_attr": "data-show",
    "scroll_window": true
  });
});