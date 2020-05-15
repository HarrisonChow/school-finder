(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./keyCodes.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./keyCodes.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.keyCodes);
    global.ariaToggler = mod.exports;
  }
})(this, function (_keyCodes) {
  "use strict";

  _keyCodes = _interopRequireDefault(_keyCodes);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Toggles the aria-expanded and aria-hidden attributes based on paired elements within a parent selector
   *
   * @since 1.0.0
   *
   * @author Digital Services <communications@det.nsw.edu.au>
   * @copyright © 2015 State Government of NSW 2015
   *
   * @class
   * @requires jQuery
   */
  var AriaToggler =
  /*#__PURE__*/
  function () {
    function AriaToggler(selector, config) {
      _classCallCheck(this, AriaToggler);

      /**
       *
       * @param {string} config.selectors.triggers: the element which toggles the aria states
       * @param {string} config.selectors.panels: the element which is affected by the clickable
       * @param {string} config.selectors.btnclose: an extra element which works as a close button
       * @param {boolean|string} config.auto_focus: focuses the tabpanel when expanded. Adding a selector (string) will focus that element if it exists as a child of the tabpanel
       * @param {boolean|string} config.auto_open: Triggers the first pair of the component so that they're opened on load.
       * @param {boolean} config.click_outside: toggles the aria classes to hide the tabpanel when clicked outside
       * @param {boolean} config.tabindex_toggle: toggles the tabindex value from -1 to 0 on the tabpanel
       *
       */
      this.config = {
        selectors: {
          triggers: "[role=tab]",
          panels: "[role=tabpanel]",
          btnclose: "[data-gef-ariatoggler-closebutton]"
        },
        auto_focus: false,
        auto_open: false,
        click_outside: false,
        tabindex_toggle: false // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      } // Check if selector has been passed to constructor


      if (selector) {
        // Use jQuery to match find the relevant DOM element(s)
        this.$container = $(selector); // Open the first set if auto_open is true

        if (this.config.auto_open) {
          var $trigger = this.$container.find(this.config.selectors.triggers).eq(0);
          var $panel = this.$container.find(this.config.selectors.panels).eq(0);
          this.expandSelection($trigger, $panel);
        }

        this.createEvents();
      }
    } // Focus elements on expand


    _createClass(AriaToggler, [{
      key: "autoFocusElement",
      value: function autoFocusElement($panels) {
        // check auto_focus  is enabled
        if (this.config.auto_focus === true) {
          // focus on the panel
          console.log($panels);
          $panels.focus();
        } else if (typeof this.config.auto_focus === 'string') {
          // focus on a child of the panel
          $panels.find(this.config.auto_focus).focus();
        } else {
          // do nothing
          return;
        }
      } // Expand the pairs

    }, {
      key: "expandSelection",
      value: function expandSelection($triggers, $panels) {
        $triggers.attr({
          "aria-expanded": "true"
        });
        $panels.attr({
          "aria-hidden": "false"
        });

        if (this.config.tabindex_toggle) {
          $panels.attr({
            "tabindex": "0"
          });
        }

        this.autoFocusElement($panels);
      } //  Collapse the pairs

    }, {
      key: "collapseSelection",
      value: function collapseSelection($triggers, $panels) {
        $triggers.attr({
          "aria-expanded": "false"
        });
        $panels.attr({
          "aria-hidden": "true"
        });

        if (this.config.tabindex_toggle) {
          $panels.attr({
            "tabindex": "-1"
          });
        }
      } //  Builds the functionality surrounding the click event

    }, {
      key: "createEvents",
      value: function createEvents() {
        var $triggers = this.$container.find(this.config.selectors.triggers),
            $panels = this.$container.find(this.config.selectors.panels),
            $btnClose = this.$container.find(this.config.selectors.btnclose),
            _this = this,
            multiple = true; // Test to check if there's only pair


        if ($triggers.length == 1 && $panels.length == 1) {
          multiple = false; // Is the pair already expanded?

          if ($triggers.attr("aria-expanded") == "true") {
            _this.expanded = true;
          } else {
            _this.expanded = false;
          }
        }

        console.log(_this.expanded); // Capture the return/enter button as an event

        var captureReturn = function captureReturn(e) {
          e.stopPropagation(); // make sure it's the right key

          if (e.which === _keyCodes["default"]["return"] || e.keyCode === _keyCodes["default"]["return"] || e.which === _keyCodes["default"].space || e.keyCode === _keyCodes["default"].space) {
            e.preventDefault();
            $(e.target).click();
          }
        }; // key press on trigger


        $triggers.on("keydown", captureReturn); // key press on close button

        $btnClose.on("keydown", captureReturn); // get all triggers and create a click event

        $triggers.on("click", function (e) {
          e.preventDefault();
          e.stopPropagation(); // Get the index of the clicked trigger

          var i = $triggers.index(this);

          if (multiple) {
            // if there's only one pair toggle the attributes
            // Close any other instances of the triggers and panels
            _this.collapseSelection($triggers, $panels); // Show the clicked trigger and paired panel


            _this.expandSelection($(this), $panels.eq(i));
          } else {
            // if there's only one instance
            if (_this.expanded) {
              // if the pair is expanded
              // collapse the content
              _this.expanded = false;

              _this.collapseSelection($triggers, $panels);
            } else {
              // expand the content
              _this.expanded = true;

              _this.expandSelection($triggers, $panels);
            }
          }
        }); // get btnclose and create a click event

        $btnClose.on("click", function (e) {
          e.preventDefault();
          _this.expanded = false;

          _this.collapseSelection($triggers, $panels);
        }); // enable outside click to close

        if (this.config.click_outside === true) {
          $('body').on("click", function (e) {
            _this.expanded = false;

            _this.collapseSelection($triggers, $panels);
          });
        }
      }
    }]);

    return AriaToggler;
  }();

  new AriaToggler(".gel-drawer", {
    "click_outside": true,
    "tabindex_toggle": false
  });
});