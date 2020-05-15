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
    global.constants = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.GEL_PAGINATION_PREV = _exports.GEL_PAGINATION_NEXT = _exports.GEL_GUIDEDJOURNEY_MOBILENAV_SELECT = _exports.GEL_GUIDEDJOURNEY_MOBILENAV_FORM = _exports.GEL_GUIDEDJOURNEY_MOBILENAV = _exports.GEL_GUIDEDJOURNEY_SIDENAV = _exports.GEL_GUIDEDJOURNEY_ASSET_ID = _exports.GEL_GUIDEDJOURNEY_PAGE = _exports.GEL_GUIDEDJOURNEY_LANDING = _exports.GEL_GUIDEDJOURNEY_CONTENT = _exports.GEL_GUIDEDJOURNEY_ROOT = _exports.GEL_GUIDEDJOURNEY_ERROR_MESSAGE = _exports.GEL_GUIDEDJOURNEY_LOADING_MESSAGE = _exports.GEL_GUIDEDJOURNEY_NAME = _exports.BOOTSTRAP_UTIL_DISPLAY_NONE = void 0;
  // Bootstrap
  var BOOTSTRAP_UTIL_DISPLAY_NONE = 'd-none'; // Guided Journey

  _exports.BOOTSTRAP_UTIL_DISPLAY_NONE = BOOTSTRAP_UTIL_DISPLAY_NONE;
  var GEL_GUIDEDJOURNEY_NAME = 'Guided Journey';
  _exports.GEL_GUIDEDJOURNEY_NAME = GEL_GUIDEDJOURNEY_NAME;
  var GEL_GUIDEDJOURNEY_LOADING_MESSAGE = 'Please wait while page is being generated';
  _exports.GEL_GUIDEDJOURNEY_LOADING_MESSAGE = GEL_GUIDEDJOURNEY_LOADING_MESSAGE;
  var GEL_GUIDEDJOURNEY_ERROR_MESSAGE = 'There has been a problem , please log a ticket in Zendesk'; // Guided Journey / Component

  _exports.GEL_GUIDEDJOURNEY_ERROR_MESSAGE = GEL_GUIDEDJOURNEY_ERROR_MESSAGE;
  var GEL_GUIDEDJOURNEY_ROOT = '.gel-main--GJ';
  _exports.GEL_GUIDEDJOURNEY_ROOT = GEL_GUIDEDJOURNEY_ROOT;
  var GEL_GUIDEDJOURNEY_CONTENT = '.gel-guided-journey__content';
  _exports.GEL_GUIDEDJOURNEY_CONTENT = GEL_GUIDEDJOURNEY_CONTENT;
  var GEL_GUIDEDJOURNEY_LANDING = '.gel-guided-journey__landing';
  _exports.GEL_GUIDEDJOURNEY_LANDING = GEL_GUIDEDJOURNEY_LANDING;
  var GEL_GUIDEDJOURNEY_PAGE = '.gel-guided-journey__page';
  _exports.GEL_GUIDEDJOURNEY_PAGE = GEL_GUIDEDJOURNEY_PAGE;
  var GEL_GUIDEDJOURNEY_ASSET_ID = 'data-gel-asset-id';
  _exports.GEL_GUIDEDJOURNEY_ASSET_ID = GEL_GUIDEDJOURNEY_ASSET_ID;
  var GEL_GUIDEDJOURNEY_SIDENAV = '.sn__guided-journey';
  _exports.GEL_GUIDEDJOURNEY_SIDENAV = GEL_GUIDEDJOURNEY_SIDENAV;
  var GEL_GUIDEDJOURNEY_MOBILENAV = '#gel-journey-index-select';
  _exports.GEL_GUIDEDJOURNEY_MOBILENAV = GEL_GUIDEDJOURNEY_MOBILENAV;
  var GEL_GUIDEDJOURNEY_MOBILENAV_FORM = 'form';
  _exports.GEL_GUIDEDJOURNEY_MOBILENAV_FORM = GEL_GUIDEDJOURNEY_MOBILENAV_FORM;
  var GEL_GUIDEDJOURNEY_MOBILENAV_SELECT = '#gel-journey-index-select';
  _exports.GEL_GUIDEDJOURNEY_MOBILENAV_SELECT = GEL_GUIDEDJOURNEY_MOBILENAV_SELECT;
  var GEL_PAGINATION_NEXT = '.gel-pagination__next';
  _exports.GEL_PAGINATION_NEXT = GEL_PAGINATION_NEXT;
  var GEL_PAGINATION_PREV = '.gel-pagination__prev';
  _exports.GEL_PAGINATION_PREV = GEL_PAGINATION_PREV;
});