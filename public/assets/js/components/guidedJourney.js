(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../constants.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../constants.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.constants);
    global.guidedJourney = mod.exports;
  }
})(this, function (_constants) {
  "use strict";

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * guidedJourney.js - toggles the page content displayed based on the side navigation item selected
  
   * @class
   * @requires jQuery
   */
  var GuidedJourney =
  /**
   * @constructor
   *
   * @param {String}   selector - the jQuery selector where we inject content
   * @param {Object}   config
   * @param {String}   [config.endpoint] - The URL to get child items from
   * @param {Array}    [config.pages] - The key of the variable on the window
   */
  function GuidedJourney(selector) {
    var _this = this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      /* pages, endpoint */
    };

    _classCallCheck(this, GuidedJourney);

    _defineProperty(this, "fetchNetworkContent", function (endpoint) {
      return fetch(endpoint).then(function (res) {
        return res.json();
      });
    });

    _defineProperty(this, "initialise", function (data) {
      var lazyData = data.reduce(function (acc, val) {
        return val || acc;
      }, undefined);

      if (!!lazyData) {
        var updatedData;

        var _ref = _this.getNavItems() || [],
            _ref2 = _slicedToArray(_ref, 1),
            firstItem = _ref2[0];

        if (!firstItem || lazyData[0].id === firstItem.href) {
          // Replace
          updatedData = lazyData;
        } else {
          // Prepend
          updatedData = [firstItem].concat(_toConsumableArray(lazyData));
        } // Update the nav items from updated data
        // NOTE!: this needs to be called before you re-assign updatedData.


        _this.data.navItems = updatedData.reduce(function (acc, val) {
          return [].concat(_toConsumableArray(acc), [{
            href: val.href || val.id,
            label: val.label
          }]);
        }, []);
        updatedData = updatedData.reduce(function (acc, val) {
          return [].concat(_toConsumableArray(acc), [_objectSpread({}, val, {
            href: "#".concat(val.href || val.id)
          })]);
        }, []);

        var navItemEls = _this.generateSideNavItems(updatedData);

        _this.el.$sideNav.html(navItemEls);

        lazyData.forEach(function (item) {
          _this.injectContentId(item.id, item.content);
        });
      }

      _this.populateNavigation();

      _this.loadInitialPage();

      _this.initialiseContentRegion();

      _this.addSkipLinks();

      _this.registerEvents();
    });

    _defineProperty(this, "addSkipLinks", function () {
      _this.el.$content.find('[data-gel-asset-id]').each(function (index, el) {
        var pageElement = $(el);

        if (!pageElement.find('a[href="#back_"]').length) {
          pageElement.append('<a class="gel-skiplink__link" href="#back_">Back to menu</a>');
        }
      });
    });

    _defineProperty(this, "registerEvents", function () {
      _this.el.$paginationNext.on('click', _this.onPaginateClick(1));

      _this.el.$paginationPrev.on('click', _this.onPaginateClick(-1));

      _this.el.$mobileNavForm.on('submit', _this.handleSubmitMobileNav); // Prevent hash change when use back to menu link


      window.addEventListener('hashchange', _this.handleHashChange);
    });

    _defineProperty(this, "handleSubmitMobileNav", function (event) {
      event.preventDefault();

      var updatedLocation = _this.el.$mobileNavSelect.val();

      var _window$location = window.location,
          origin = _window$location.origin,
          pathname = _window$location.pathname,
          search = _window$location.search;
      window.location.replace("".concat(origin).concat(pathname).concat(search, "#").concat(updatedLocation));
      return false;
    });

    _defineProperty(this, "populateNavigation", function () {
      var navItems = _this.getNavItems();

      if (!_this.getNavItemsFromDOM().length) {
        // Generate side nav from JSON
        _this.el.$sideNav.empty();

        _this.el.$sideNav.html(_this.generateMobileNavItems(navItems));
      } // Populate mobile nav


      _this.el.$mobileNav.empty();

      _this.el.$mobileNav.html(_this.generateMobileNavItems(navItems));
    });

    _defineProperty(this, "getCurrentNavItem", function () {
      var currentAssetId = window.location.hash.slice(1);

      var navItems = _this.getNavItems();

      return navItems.reduce(function (acc, val, index) {
        return currentAssetId === val.href && acc.index <= 0 ? {
          index: index,
          item: val
        } : acc;
      }, {
        index: 0,
        item: undefined
      });
    });

    _defineProperty(this, "onPaginateClick", function (increment) {
      return function (event) {
        event.target.blur(increment);

        _this.navigate(increment);
      };
    });

    _defineProperty(this, "navigate", function (increment) {
      var navItems = _this.getNavItems() || [];

      var currentItem = _this.getCurrentNavItem();

      var futureNumber = Math.max(0, currentItem.index + increment);
      var futureItem = navItems[Math.min(futureNumber, navItems.length - 1)];
      /* Change location hash */

      if (futureItem) {
        var _window$location2 = window.location,
            origin = _window$location2.origin,
            pathname = _window$location2.pathname,
            search = _window$location2.search;
        window.location.replace("".concat(origin).concat(pathname).concat(search, "#").concat(futureItem.href));
      }
    });

    _defineProperty(this, "getNavItems", function () {
      if (!_this.data.navItems) {
        _this.data.navItems = _this.getNavItemsFromDOM() || [];
      }

      return _toConsumableArray(_this.data.navItems);
    });

    _defineProperty(this, "setActiveItem", function (assetId) {
      // ACTIVE side nav element
      _this.el.$sideNav.find(".active").removeClass('active');

      _this.el.$sideNav.find("[href=\"#".concat(assetId, "\"]")).addClass('active'); // ACTIVE page


      _this.handleHidePages();

      var activeEl = _this.el.$content.find("[data-gel-asset-id=\"".concat(assetId, "\"]"));

      activeEl.find('.collapse').collapse('hide');
      activeEl.removeClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE); // Make the first H2 in the content area focusable by tab

      activeEl.find('h2').first().attr('tabindex', 0); // ACTIVE mobile nav

      _this.el.$mobileNavSelect.val(assetId); // Manage Pagination


      var currentItem = _this.getCurrentNavItem();

      var navItems = _this.getNavItems();

      _this.el.$paginationPrev.removeClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);

      _this.el.$paginationNext.removeClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);

      if (currentItem.index <= 0) {
        _this.el.$paginationPrev.addClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);
      }

      if (currentItem.index >= navItems.length - 1) {
        _this.el.$paginationNext.addClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);
      }
    });

    _defineProperty(this, "getNavItemsFromDOM", function () {
      return _this.el.$container.find(_constants.GEL_GUIDEDJOURNEY_SIDENAV).find('a').map(function (index, val) {
        var linkEl = $(val);
        return {
          href: linkEl.attr('href').slice(1),
          label: linkEl.clone().find('span').remove().end().text()
        };
      }).toArray();
    });

    _defineProperty(this, "generateSideNavItems", function () {
      var navItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return navItems.reduce(function (acc, val, index) {
        var navItem = "\n        <li class=\"sn_parent\">\n            <a href=\"".concat(val.href, "\">\n                <span class=\"sr-only\">This is step ").concat(index, " of ").concat(navItems.length, "</span>\n                ").concat(val.label, "\n            </a>\n        </li>\n      ");
        return acc + navItem;
      }, '');
    });

    _defineProperty(this, "generateMobileNavItems", function () {
      var navItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return navItems.reduce(function (acc, val) {
        var navItem = "\n        <option value=\"".concat(val.href, "\" aria-label=\"").concat(val.label, "\">\n          ").concat(val.label, "\n        </option>\n      ");
        return acc + navItem;
      }, '');
    });

    _defineProperty(this, "loadInitialPage", function () {
      // Removes the '#' from the string
      var hash = window.location.hash.slice(1);
      var navItems = _this.getNavItems() || [];
      var firstItem = navItems[0] || {}; // Set active page based on hash or the fist item

      _this.setActiveItem(hash || firstItem.href || '');
    });

    _defineProperty(this, "handleHidePages", function () {
      _this.el.$container.find(_constants.GEL_GUIDEDJOURNEY_PAGE).addClass(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);
    });

    _defineProperty(this, "setLoading", function () {
      var isLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var loadingEl = $('.gel-loader');
      var fnName = isLoading ? 'removeClass' : 'addClass';
      loadingEl[fnName](_constants.BOOTSTRAP_UTIL_DISPLAY_NONE);
    });

    _defineProperty(this, "findPageEl", function (assetId) {
      return _this.el.$content.find("".concat(_constants.GEL_GUIDEDJOURNEY_PAGE, "[").concat(_constants.GEL_GUIDEDJOURNEY_ASSET_ID, "='").concat(assetId, "']"));
    });

    _defineProperty(this, "injectContentId", function (assetId, content) {
      // Remove any existing page
      var pageEl = _this.findPageEl(assetId);

      pageEl.remove(); // Add a new element to the page

      _this.el.$content.append("<div class=\"".concat(_constants.GEL_GUIDEDJOURNEY_PAGE.slice(1), " ").concat(_constants.BOOTSTRAP_UTIL_DISPLAY_NONE, "\" data-gel-asset-id=\"").concat(assetId, "\">").concat(content, "</div>"));

      var contentRegionEl = _this.el.$content.find("[data-gel-asset-id=\"".concat(assetId, "\"]"));

      _this.initialiseContentRegion(contentRegionEl);
    });

    _defineProperty(this, "initialiseContentRegion", function () {});

    _defineProperty(this, "getAssetIdFromUrl", function () {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var hashLocation = url.indexOf('#');

      if (hashLocation === -1) {
        return '';
      }

      return url.slice(hashLocation + 1);
    });

    _defineProperty(this, "handleHashChange", function (event) {
      var newURL = event.newURL,
          oldURL = event.oldURL;

      var assetId = _this.getAssetIdFromUrl(newURL || location.href);

      if (assetId === 'back_') {
        if (oldURL) {
          window.history.replaceState({}, undefined, oldURL);
        }

        if ($('.gel_guided-journey__mobile-nav').css('display') === 'block') {
          console.log(_this.el.$container.find('#gel-journey-index-select'));

          _this.el.$container.find('#gel-journey-index-select').focus();

          return;
        }

        _this.el.$sideNav.find('.active').focus();

        return;
      }

      _this.setActiveItem(assetId);

      var activeEl = $("[data-gel-asset-id=\"".concat(assetId, "\"]"));
      $('html, body').animate({
        scrollTop: activeEl.offset().top - 120
      }, 100);
      activeEl.find('h2').first().focus();
    });

    this.config = _objectSpread({
      $container: $(selector)
    }, config); // Store found elements for later

    this.el = {
      $container: this.config.$container,
      $content: this.config.$container.find(_constants.GEL_GUIDEDJOURNEY_CONTENT),
      $paginationNext: this.config.$container.find(_constants.GEL_PAGINATION_NEXT),
      $paginationPrev: this.config.$container.find(_constants.GEL_PAGINATION_PREV),
      $sideNav: this.config.$container.find(_constants.GEL_GUIDEDJOURNEY_SIDENAV),
      $mobileNav: this.config.$container.find(_constants.GEL_GUIDEDJOURNEY_MOBILENAV),
      $mobileNavSelect: this.config.$container.find(_constants.GEL_GUIDEDJOURNEY_MOBILENAV_SELECT),
      $mobileNavForm: this.config.$container.find(_constants.GEL_GUIDEDJOURNEY_MOBILENAV_FORM)
    };
    this.data = {};
    this.setLoading(true);
    var _endpoint = this.config.endpoint;
    Promise.all([this.config.pages, !!_endpoint ? this.fetchNetworkContent(_endpoint) : undefined]).then(this.initialise);
  };

  $(_constants.GEL_GUIDEDJOURNEY_ROOT).each(function () {
    var selector = $(this);
    var pages = selector.attr('data-pages');
    var config = {
      pages: pages ? window[pages] : undefined,
      endpoint: selector.attr('data-endpoint')
    };
    new GuidedJourney(selector, config);
  }); // export default GuidedJourney
});