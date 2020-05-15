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
    global.externalLinkTagger = mod.exports;
  }
})(this, function () {
  "use strict";
  /**
   * Create a new LinkTagger
   *
   * @example
   * // instantiate and check/tag the passed link using class constructor
   * let tagger = new LinkTagger("a", { domains: ["education.nsw.gov.au"] })
   *
   * @example
   * // Check/tag the passed link using tag function
   * let tagger = new LinkTagger()
   * tagger.tag("a", { domains: ["education.nsw.gov.au"] })
   *
   * @class
   * @requires jQuery
   */

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var LinkTagger =
  /*#__PURE__*/
  function () {
    /**
     * @param {(String|jQuery)} selector - A CSS selector or jQuery object
     * @param {Object} config - Object literal
     * @param {string} config.selectors.externalIcon - CSS selector used in the config.template
     * @param {array} config.domains - Array of domain names (strings) to be white listed as "internal" domains
     * @param {string} config.template - A snippet of HTML to append to end of the anchor(s)
     *
     * @returns {LinkTagger} Returns a LinkTagger object
     */
    function LinkTagger(selector, config) {
      _classCallCheck(this, LinkTagger);

      this.config = {
        selectors: {
          externalIcon: ".gel-external-link"
        },
        domains: [],
        template: "<span class=\"sr-only\">External link</span><span class=\"gel-external-link\"></span>" // Merge default config with passed config

      };
      this.setConfig(config); // Check if selector has been passed to constructor

      if (selector) {
        this.tag(selector);
      }
    }
    /**
     * Merge default config with passed config
     *
     * @param {Object} config - Object literal
     * @param {string} config.selectors.externalIcon - CSS selector used in the config.template
     * @param {array} config.domains - Array of domain names (strings) to be white listed as "internal" domains
     * @param {string} config.template - A snippet of HTML to append to end of the anchor(s)
     *
     * @returns {Obejct} reference to instance config
     */


    _createClass(LinkTagger, [{
      key: "setConfig",
      value: function setConfig(config) {
        // Check if config has been passed to constructor
        if (config) {
          // Merge default config with passed config
          this.config = $.extend(true, {}, this.config, config);
        }

        return this.config;
      }
      /**
       * Check if an anchor or array of anchors are external links and tag any external links with an icon
       * Paramters are identical to those expected by the class constructor
       *
       * @see {@link constructor}
       */

    }, {
      key: "tag",
      value: function tag(selector, config) {
        this.setConfig(config); // Add the current domain to the array of white listed domains

        this.config.domains.push(window.location.host); // Use jQuery to find the relevant selector in the DOM

        this.$selector = $(selector);

        var _self = this; // Loop through each anchor


        this.$selector.each(function (index, anchor) {
          var $anchor = $(anchor);
          var isLocal = true; // Loop through each of our white listed domains

          $.each(_self.config.domains, function (i, domain) {
            // If href doesn't contain the domain
            if (_self.check($anchor, domain)) {
              isLocal = false;
            }
          }); // If the href doesn't match any of the white listed domains then tag it

          if (isLocal) {
            _self.addTag($anchor, _self.config.template);
          }
        });
      }
      /**
       * Appends the passed HTML to an anchor  first checking if the anchor has already been flagged as external
       *
       * @param {jQuery} $anchor - An 'a' element encapuslated in a jQuery object
       * @param {string} template - HTML to be appended to end of anchor tag
       *
       * @returns {jQuery} The orignal 'a' element passed into the function
       */

    }, {
      key: "addTag",
      value: function addTag($anchor, template) {
        if ($anchor.find(this.config.selectors.externalIcon).length == 0) {
          // Appends class gel-externalLink to the link if host does not match list of hosts above
          $anchor.append(template); // Adds an attribute target="_blank" if the external link is found
          // $anchor.attr("target","_blank") // removed GXF-655
        }

        return $anchor;
      }
      /**
       * Check if an anchor tag's href contains the passed domain or is a mailto: email
       *
       * @param {jQuery} $anchor - An 'a' element encapuslated in a jQuery object
       * @param {string} domain - The domain to check
       *
       * @returns {boolean} True is returned if the anchor's href contains the passed domain else returns false
       */

    }, {
      key: "check",
      value: function check($anchor, domain) {
        var url = $anchor[0].href; // Check if this URL does not contain the domain or is a mailto:

        if (url.search(domain) >= 0 || url.search("mailto:") >= 0) {
          return true;
        } else {
          return false;
        }
      }
    }]);

    return LinkTagger;
  }();
  /**
   * A module for falging links as "external links" (via an icon appened to a link).
   * Module will compare the links href against a white list of "internal" domains.
   * By default all hrefs are compared against the current domain i.e. window.location.host
   *
   * @module utilities/externalLinkTagger
   */


  new LinkTagger("body a", ["localhost", "education.nsw.gov.au"]);
});