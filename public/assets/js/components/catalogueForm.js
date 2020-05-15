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
    global.catalogueForm = mod.exports;
  }
})(this, function () {
  "use strict";
  /**
   * Updates select element to submit its parent form on option select.
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

  var CatalogueForm =
  /*#__PURE__*/
  function () {
    /**
     * Creates a new Greeting
     *
     * @constructor
     *
     * @param {String|Element|jQuery} selector - Either a CSS selector, DOM element or matched jQuery object
     * @param {Object} config - class configuration options. Options vary depending on need
     * @param {String} config.selectors.form - Jquery selector for form
     *
     */
    function CatalogueForm(selector, config) {
      _classCallCheck(this, CatalogueForm);

      // Default class config options
      this.config = {
        selectors: {
          form: "form"
        } // Check if config has been passed to constructor

      };

      if (config) {
        // Merge default config with passed config
        this.config = $.extend(true, {}, this.config, config);
        console.log(this.config, config);
      } // Check if selector has been passed to constructor


      if (selector) {
        // Use jQuery to match find the relevant DOM element(s)
        this.$selector = $(selector); // Find current value of get variable pairing

        var currentVal = this.getUrlVars()[this.$selector.attr("name")]; //console.log("currentVal", currentVal);
        // Set active option

        this.setSelected(currentVal); // Remove all form hidden fields

        this.$selector.closest("form").find(".sq-form-field[type='hidden']").remove(); // Submit form on change of current select element

        this.$selector.siblings('input[type="submit"]').on("click", this.submitForm.bind(this));
      }
    }
    /**
     * Inserts a language specific greeting before each element in the set of matched elements
     *
     * @returns {jQuery} Submission of wrapping form element
     */


    _createClass(CatalogueForm, [{
      key: "submitForm",
      value: function submitForm() {
        /*
          expect -> jQuery(this.$selector) has Array<Input>
            assume arr1 = Array<Input> of jQuery(this.$selector)
            for each input in arr1
            get name of input
              set query param of name to have selected value
            done :)
        */
        // Find parent form and submit it
        // If this has a child select pairing
        if (this.$selector.data("child-select")) {
          // If the child selector actually has a value
          if (this.$selector.data("child-select") != "data-child-select") {
            // Find selected value of child select and set it
            var childSelect = this.$selector.data("child-select"),
                selectedChildValue = $(this.$selector[0].options[this.$selector[0].selectedIndex]).data("child-option");
            $("#" + this.$selector.data("selected")).val(parseInt(this.$selector[0].selectedIndex));
            this.setChildSelect(childSelect, selectedChildValue);
          } else {
            // If not submit the form
            return this.$selector.closest(this.config.selectors.form).submit();
          }
        } else {
          // If not submit the form
          return this.$selector.closest(this.config.selectors.form).submit();
        }
      }
      /**
       * Sets current value to selected option
       *
       * @returns this
       */

    }, {
      key: "setSelected",
      value: function setSelected(value) {
        if (this.$selector.data("selected")) {
          value = this.getUrlVars()[this.$selector.data("selected")];
          this.$selector.find("option").each(function (i, opt) {
            if (i == value) {
              $(opt).prop("selected", true);
            }
          });
        } else {
          if (value) {
            this.$selector.find("option").each(function (i, opt) {
              if ($(opt).val() == value) {
                $(opt).prop("selected", true);
              }
            });
          }
        }

        return this;
      }
      /**
       * Gets values of set get variables
       *
       * @returns {Object} Array of GET variable key/value pairs
       */

    }, {
      key: "getUrlVars",
      value: function getUrlVars() {
        var vars = {},
            parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
          vars[key] = value;

          if (vars[key] == "submit") {
            return false;
          } //console.log("getUrlVars", vars)

        });
        return vars;
      }
      /**
       * Sets the value of a paired select on change of parent
       *
       * @returns {jQuery} Submission of wrapping form element
       */

    }, {
      key: "setChildSelect",
      value: function setChildSelect(select, value) {
        $("#" + select).find("option").each(function (i, opt) {
          if ($(opt).val() == value) {
            $(opt).attr("selected", "selected");
          }
        });
        return this.$selector.closest(this.config.selectors.form).submit();
      }
      /**
       * Static function to instatiate the Greeting class as singleton
       *
       * @static
       *
       * @param {String|Element|jQuery} selector - Either a CSS selector, DOM element or matched jQuery object
       * @param {object} config   - class configuration arguments. Refer to class constructor for complete documentation of the config object
       *
       * @returns {ExampleClass} Reference to the same ExampleClass instatiated in memory
       */

    }], [{
      key: "shared",
      value: function shared(selector, config) {
        return this.instance != null ? this.instance : this.instance = new CatalogueForm(selector, config);
      }
    }]);

    return CatalogueForm;
  }();
  /**
   * Exports the CatalogueForm class as a module
   * @module
   */


  new CatalogueForm("[data-gel-auto-submit]");
  new CatalogueForm("[data-gel-auto-submit2]");
});