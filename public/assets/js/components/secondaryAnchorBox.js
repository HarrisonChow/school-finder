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
    global.secondaryAnchorBox = mod.exports;
  }
})(this, function () {
  "use strict";
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

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
     * @param {Integer}  [config.amount = 2] - amount of times selector needs to be found before the class ir
     * @param {String}   [config.template.html = undefined] - the html structure that will be used to build the AnchorBox
     * @param {String}   [config.template.selector = ".gel-anchor-box"] - the selector of the html structure
     * @param {String}   [config.template.list_class = "gel-link-list"] - the list pattern to inject into the AnchorBox
     * @param {String}   [config.inject_after_me = undefined] - if this exists then the AnchorBox will be placed after this element, must be a child of config.$container
     * @param {String}   [config.inject_after_me = undefined] - if this exists then the AnchorBox will be placed after this element, must be a child of config.$container
     */
    function AnchorBox(selector_one, selector_two, parent, config, selector) {
      _classCallCheck(this, AnchorBox);

      if ($(selector_one).length) {
        //Selector = "index-parent"
        selector = ".gel-secondary-index-parent";
      } else if ($(selector_two).length) {
        //Selector = "index-position"
        selector = ".gel-secondary-index-position";
      }

      this.config = {
        $container: $(selector),
        targets: "h3.gel-secondary-index-level1,p.gel-secondary-index-level1,h4.gel-secondary-index-level1",
        targetsl2: ".gel-secondary-index-level2",
        amount: 1,
        template: {
          html: undefined,
          selector: ".gel-secondary-anchor-box",
          list_class: "gel-secondary-link-list"
        },
        inject_after_me: "gel-secondary-index-parent",
        inject_backup: "gel-secondary-index-position" // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      } // Save the container for later


      this.$container = this.config.$container;
      var containercheck = this.$container.attr("class"); // Set the template if it hasn't been passed via the config

      if (this.config.template.html === undefined) {
        this.config.template.html = '<nav class="gel-secondary-anchor-box"></nav>';
      }

      var self = this;

      if (this.$container.length > 1 && selector == ".gel-secondary-index-parent") {
        this.config.$container.each(function (i) {
          self.initAnchorBox($(selector).eq(i));
        });
      } else {
        self.initAnchorBox(this.$container);
      } //this.initAnchorBox()

    }
    /**
     * Finds and tests the targets
     *
     * @initAnchorBox
     *
     */


    _createClass(AnchorBox, [{
      key: "initAnchorBox",
      value: function initAnchorBox(x) {
        this.$container = x; // find the targets

        if (this.$container.attr("class").indexOf("gel-secondary-index-position") > -1) {
          this.$targets = $("body").find(this.config.targets);
        } else {
          this.$targets = this.$container.children(this.config.targets);
        }

        this.$targetsl2 = this.$targets.children(this.config.targetsl2); // this.$targets = this.$container.children(this.config.targets)
        // test to see if targets exists

        if (this.$targets.length < this.config.amount) {
          console.warn("Not enough targets to display AnchorBox. Needs " + this.config.amount + " '" + this.config.targets + "' selectors.");
          throw new RangeError("Couldn't find enough targets");
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
          if (this.$container.attr('class') == this.config.inject_after_me) {
            var $injector = this.$container;
          } else if ($("body").find("." + this.config.inject_backup)) {
            var $injector = $("." + this.config.inject_backup);
          }

          if ($injector.length) {
            // add after specified element
            $injector.prepend(this.config.template.html);
          } else if (this.config.inject_backup !== undefined && $injector_backup.length) {
            // Use the backup inject plan
            $injector_backup.after(this.config.template.html);
          } else {
            // Can't place
            console.warn("No location class mentioned for anchor box");
          }
        } else {
          this.$container.prepend(this.config.template.html);
        } // create the link list


        if (this.config.template.selector) if (this.$container.attr('class') == this.config.inject_after_me) {
          this.$container.find(this.config.template.selector).append('<ul class="' + this.config.template.list_class + '"></ul>');
        } else {
          $("body").find(this.config.template.selector).append('<ul class="' + this.config.template.list_class + '"></ul>');
        } // loop through targets and add them to the box

        this.$targets.each(function (i) {
          // add an ID
          var htmlstructured = $(this).clone().text();
          htmlstructured = htmlstructured.trim();
          var anchor_name = htmlstructured.split(' ')[0] + i;
          $(this).attr('id', anchor_name); // add anchors to the link list

          if (component.$container.attr('class') == component.config.inject_after_me) {
            component.$container.find('.' + component.config.template.list_class).append('<li class="anchor-level' + [i] + '"><a href="#' + anchor_name + '">' + htmlstructured + '</a></li>');
            var hasparent = "1";
          } else {
            $("body").find('.' + component.config.template.list_class).append('<li class="anchor-level1"><a href="#' + anchor_name + '">' + htmlstructured + '</a></li>');
            var hasparent = "0";
          }

          var check = $(this).nextUntil('.gel-secondary-index-level1', '.gel-secondary-index-level2').length;

          if (check > 0) {
            if (hasparent == "0") {
              component.$container.find($(".anchor-level1")[i]).append('<ul class="gel-secondary-link-list-child anchor-level-' + i + '"></ul>');
            } else {
              component.$container.find($(".anchor-level" + i)).append('<ul class="gel-secondary-link-list-child anchor-level-' + i + '"></ul>');
            }

            $(this).nextUntil('.gel-secondary-index-level1', '.gel-secondary-index-level2').each(function (j) {
              var htmlstructured1 = $(this).clone().text();
              var htmlstructured2 = htmlstructured1.substring(0, 100);

              if (htmlstructured1.length > 100) {
                htmlstructured2 = htmlstructured2.substr(0, Math.min(htmlstructured2.length, htmlstructured2.lastIndexOf(" ")));
                htmlstructured2 = htmlstructured2.replace(/\s*$/, "") + "\u2026<span class=\"show-on-sr\">link text truncated</span>";
              }

              var anchor_name1 = htmlstructured1.split(' ')[0] + i;
              $(this).attr('id', anchor_name1);

              if (component.$container.attr('class') == component.config.inject_after_me) {
                component.$container.find($('.anchor-level-' + i + '')).append('<li class="anchor-level3"><a href="#' + anchor_name1 + '">' + htmlstructured2 + '</a></li>');
              } else {
                $("body").find($('.anchor-level-' + i + '')).append('<li class="anchor-level3"><a href="#' + anchor_name1 + '">' + htmlstructured2 + '</a></li>');
              }
            });
          }
        });
      }
    }]);

    return AnchorBox;
  }();

  new AnchorBox(".gel-secondary-index-parent", ".gel-secondary-index-position");
});