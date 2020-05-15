(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["/classManipulator.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("/classManipulator.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.classManipulator);
    global.breadCrumbs = mod.exports;
  }
})(this, function (_classManipulator) {
  "use strict";

  _classManipulator = _interopRequireDefault(_classManipulator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  //import classManipulator from "/assets/js/components/classManipulator.js"
  // your-script.js is now loaded and you can use any function from it.

  /**
  * breadcrumbsEnhanced.js - forces the breadcrumbs onto one line using various truncation methods
  *
  * @since 0.1.14
  *
  * @author Digital Services <communications@det.nsw.edu.au>
  * @copyright © 2016 State Government of NSW 2016
  *
  * @class
  * @requires jQuery
  */
  var breadCrumbs =
  /*#__PURE__*/
  function () {
    /**
    * Creates a new BreadcrumbsEnhanced
    *
    * @constructor
    *
    * @param {String|Element|jQuery} selector - Either a CSS selector, DOM element or matched jQuery object
    * @param {Object} config - class configuration options. Options vary depending on need
    * @param {Int} config.items_threshold - amount of breadcrumb items before attempting to truncate
    * @param {Int} config.items_visible - amount of visible breadcrumb items after truncating
    * @param {String|Element|jQuery} config.selectors.list - the list of breadcrumbs
    * @param {String|Element|jQuery} config.selectors.item - the breadcrumb items
    * @param {String|Element|jQuery} config.selectors.dropdown - the generated dropdown element
    * @param {String} config.classes.item - class name of the breadcrumb items
    * @param {String} config.classes.truncate - class name of the truncated items
    * @param {String} config.classes.dropdown - class name of the generate dropdown
    *
    */
    function breadCrumbs(selector, config) {
      _classCallCheck(this, breadCrumbs);

      this.config = {
        items_threshold: 5,
        items_visible: 3,
        selectors: {
          list: ".gel-breadcrumbs__list",
          item: ".gel-breadcrumbs__item",
          dropdown: ".gel-breadcrumbs__dropdown"
        },
        classes: {
          item: "gel-breadcrumbs__item",
          truncate: "gel-breadcrumbs__truncate",
          dropdown: "gel-breadcrumbs__dropdown"
        } // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
      }

      var self = this,
          $list = $(selector).find(this.config.selectors.list),
          totalWidth = parseInt($list.width()),
          // width of breadcrumbs container
      $items = $list.find(this.config.selectors.item),
          length = $items.length,
          threshold = this.config.items_threshold,
          // amount of items allowed before adding dropdown
      visibleItems = this.config.items_visible,
          // amount of items to always show after dropdown
      divisor = 100,
          // percentage of available width
      dropdownWidth = 0,
          // width of the dropdown item
      collectWidths = 0,
          // combined actual width of items without truncation
      itemWidth = divisor / length; // decimal percentage width per item
      // Assign necessary things to class object

      this.$list = $list;
      this.totalWidth = totalWidth;
      this.divisor = divisor;
      this.firstLoop = true;
      this.selector = selector;
      this.collectWidths = collectWidths;

      if (length > threshold) {
        // add the dropdown
        var dropdown = '<li class="' + this.config.classes.item + ' ' + this.config.classes.dropdown + '"><div></div></li>';
        $items.eq(0).after(dropdown); // add some mouse interaction utilities to the dropdown

        var $dropdown = $items.eq(0).next(),
            dropDownClick = new _classManipulator["default"]($dropdown, {
          class_name: "active-clicked",
          event_type: "click"
        }),
            dropDownHover = new _classManipulator["default"]($dropdown, {
          class_name: "active-hovered",
          event_type: "mouseout",
          click_outside: false,
          timer: {
            on: true,
            delay: 1000
          }
        }); // add items which are not the first or the visible items to the dropdown

        $items.each(function (i) {
          if (i > 0 && i < length - visibleItems) {
            $(this).appendTo($list.find(self.config.selectors.dropdown + ' div'));
          }
        }); // Convert the dropdown items to p tags for accessibility reasons

        var $dropdownItems = $dropdown.find("li");
        $dropdownItems.each(function () {
          var html = $(this).html();
          $(this).replaceWith("<p>" + html + "</p>");
        });
        $dropdown.find('p').append("<span class='gel-breadcrumbs__dropdown-icon' aria-hidden='true'></span>"); // Show the dropdown if it's children are focused

        var dropDownFocus = new _classManipulator["default"]($dropdown.find('a'), {
          class_name: "active-focused",
          event_type: "focus blur",
          toggle: true,
          $subject: $dropdown,
          click_outside: true
        }); // update $items to just the visible items and define their max width

        $items = $list.find('li').not(this.config.selectors.dropdown);
        length = $items.length;
        dropdownWidth = Math.floor(parseInt($(this.config.selectors.dropdown).outerWidth()) / totalWidth * 100);
        this.divisor = this.divisor - dropdownWidth; // update the divisor to not include the dropdown item

        itemWidth = this.divisor / length;
      } // Screen resize


      $(window).resize(function () {
        return self.resetItems(itemWidth, $items);
      }); // Truncate the visible items

      this.truncateItems(itemWidth, $items);
    }
    /*
    * Loops through items and tries to give them an optimal width based on space available
    *
    * @truncateItems
    *
    * @param {int} itemWidth - the available width in percentage
    * @param {array} itemsArr - array of items to test the width with
    */


    _createClass(breadCrumbs, [{
      key: "truncateItems",
      value: function truncateItems(itemWidth, itemsArr) {
        var totalWidthPx = this.totalWidth * this.divisor / 100,
            // amount of available total width in px
        itemWidthPx = Math.floor(itemWidth * totalWidthPx / 100),
            // amount of available width for each item in px
        count = 0,
            // amount of times an item's actual width is less than its available width
        self = this; // Add the activated class to the breadcrumbs

        $(this.selector).addClass('activated');
        itemsArr.each(function (i) {
          var width = $(this).find('> a, > span').outerWidth(),
              // get actual item width
          text = $(this).find('> a, > span').text(),
              item = this; // Add the tooltip content

          $(this).attr("data-tooltip", text); // if the item's actual width is less than the available width

          if (width < itemWidthPx) {
            self.collectWidths += width;
            count++; // remove the tooltip and truncation
            // $(item).removeClass(self.config.classes.truncate)
            // remove the item from the looping array

            itemsArr = itemsArr.filter(function (v) {
              return v != itemsArr.index(item);
            });
          } else {
            // If the actual width is longer than the available width, add the tooltip and truncation
            $(item).addClass(self.config.classes.truncate);
          }
        });
        var length = itemsArr.length; // If there's been a change && if there's still items in the array || first time running ? then loop through again to make use of available width

        if (count > 0 && length > 0 || this.firstLoop) {
          var leftOver = this.divisor - this.collectWidths / totalWidthPx * 100,
              // get the leftover width
          split = Math.floor(leftOver / length); // find the available remaining width for each item in the array

          itemsArr.css('max-width', split - 0.58 + "%"); // set the max-width

          this.firstLoop = false; // do it again!

          this.truncateItems(split, itemsArr);
        } else {
          //do nothing
          return;
        }
      }
      /*
      * Resets all the items to not have the truncate class or a max width then calls truncateItems again
      *
      * @resetItems
      *
      * @param {int} itemWidth - the available width in percentage
      * @param {array} itemsArr - array of items to test the width with
      */

    }, {
      key: "resetItems",
      value: function resetItems(itemWidth, $items) {
        var self = this;
        this.firstLoop = true; // Remove any styling

        $(this.selector).removeClass('activated');
        $items.attr('style', '').removeClass(this.config.classes.truncate); // Reset the width

        this.totalWidth = parseInt(this.$list.width());
        this.collectWidths = 0; // reset the timeout

        clearTimeout(this.timeout); // Truncate items after 500ms

        this.timeout = setTimeout(function () {
          self.truncateItems(itemWidth, $items);
        }, 100);
      }
    }]);

    return breadCrumbs;
  }();

  new breadCrumbs(".gel-breadcrumbs");
});