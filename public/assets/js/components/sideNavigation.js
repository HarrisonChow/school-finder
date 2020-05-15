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
    global.sideNavigation = mod.exports;
  }
})(this, function () {
  "use strict";

  $(document).ready(function () {
    // prevent page from jumping to top from  # href link
    $('.gel-side-navigation li.sn-parent > a').click(function (e) {
      e.preventDefault();
    }); // remove link from menu items that have children

    $(".gel-side-navigation li.sn-parent > a").attr("href", "#"); //  function to open / close menu items

    $(".gel-side-navigation a").click(function () {
      var link = $(this);
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active");
      var closest_li = link.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;
      closest_ul.find("ul").slideUp(function () {
        if (++count == closest_ul.find("ul").length) parallel_active_links.removeClass("active");
        parallel_active_links.find("a").first().removeAttr("aria-current");
      });

      if (!link_status) {
        closest_li.children("ul").slideDown();
        closest_li.addClass("active");
        closest_li.find("a").first().attr("aria-current", "true");
      }
    });
  });
});