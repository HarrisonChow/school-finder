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
    global.anchorBox = mod.exports;
  }
})(this, function () {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
  * anchorBox.js - Builds a set of anchors based on HTML content
  *
  * @since 0.1.16
  *
  * @author Digital Services <communications@det.nsw.edu.au>
  * @copyright © 2016 State Government of NSW 2016
  *
  * @class
  * @requires jQuery
  */
  var AnchorBox =
  /*#__PURE__*/
  function () {
    /**
    * Creates a new AnchorBox
    *
    * @constructor
    *
    * @param {String}   selector - the jQuery selector in question
    * @param {Object}   config - class configuration options. Options vary depending on need
    * @param {String}   [config.$container = $(selector)] - the object to inject the AnchorBox pattern into
    * @param {String}   [config.targets = "h2"] - the selector to build the anchors from
    * @param {Integer}  [config.amount = 3] - amount of times selector needs to be found before the class ir
    * @param {String}   [config.template.html = undefined] - the html structure that will be used to build the AnchorBox
    * @param {String}   [config.template.selector = ".gel-anchor-box"] - the selector of the html structure
    * @param {String}   [config.template.anchor_list_class = "gel-anchor-link-list"] - the list pattern to inject into the AnchorBox
    * @param {String}   [config.inject_after_me = undefined] - if this exists then the AnchorBox will be placed after this element, must be a child of config.$container
    * @param {String}   [config.inject_after_me = undefined] - if this exists then the AnchorBox will be placed after this element, must be a child of config.$container
    */
    function AnchorBox(selector, config) {
      _classCallCheck(this, AnchorBox);

      this.config = {
        $container: $(selector),
        targets: "h2",
        amount: 3,
        template: {
          html: undefined,
          selector: ".gel-anchor-box",
          anchor_list_class: "gel-anchor-link-list"
        },
        inject_after_me: ".lead:first-of-type",
        inject_backup: "h1:first-of-type" // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      } // Save the container for later


      this.$container = this.config.$container; // Set the template if it hasn't been passed via the config

      if (this.config.template.html === undefined) {
        this.config.template.html = '<nav class="gel-anchor-box"><h2 class="gel-anchor-box__title">On this page</h2></nav>';
      }

      this.initAnchorBox();
    }
    /**
    * Finds and tests the targets
    *
    * @initAnchorBox
    *
    */


    _createClass(AnchorBox, [{
      key: "initAnchorBox",
      value: function initAnchorBox() {
        // find the targets
        this.$targets = this.$container.find(this.config.targets); // test to see if targets exists

        if (this.$targets.length < this.config.amount) {
          console.warn("Not enough targets to display AnchorBox. Needs " + this.config.amount + " '" + this.config.targets + "' selectors."); // throw new RangeError("Couldn't find enough targets")
        } else {
          this.buildAnchorBox();
        }
      }
      /**
      * constructs the Anchor box
      *
      * @buildAnchorBox
      *
      */

    }, {
      key: "buildAnchorBox",
      value: function buildAnchorBox() {
        var component = this; // add the anchor box

        if (this.config.inject_after_me !== undefined) {
          var $injector = this.config.$container.find(this.config.inject_after_me),
              $injector_backup = this.config.$container.find(this.config.inject_backup);

          if ($injector.length) {
            // add after specified element
            $injector.after(this.config.template.html);
          } else if (this.config.inject_backup !== undefined && $injector_backup.length) {
            // Use the backup inject plan
            $injector_backup.after(this.config.template.html);
          } else {
            // Can't place
            console.warn("Couldn't find where to place the AnchorBox");
          }
        } else {
          this.$container.prepend(this.config.template.html);
        } // create the link list


        this.$container.find(this.config.template.selector).append('<ul class="gel-link-list ' + this.config.template.anchor_list_class + '"></ul>'); // loop through targets and add them to the box

        this.$targets.each(function (i) {
          // add an ID
          var html = $(this).html(),
              anchor_name = html.split(' ')[0] + i;
          $(this).attr('id', anchor_name); // add anchors to the link list

          component.$container.find('.' + component.config.template.anchor_list_class).append('<li><span class="gel-link-list-icon" aria-hidden="true"></span><a href="#' + anchor_name + '">' + html + '</a></li>');
        });
      }
    }]);

    return AnchorBox;
  }();

  new AnchorBox("[data-gel-anchor-box]", ["localhost", "education.nsw.gov.au"]);
});