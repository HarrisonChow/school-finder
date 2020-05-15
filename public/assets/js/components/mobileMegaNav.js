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
    global.mobileMegaNav = mod.exports;
  }
})(this, function () {
  "use strict";

  /**
   * mobileMegaNav.js helps invoke the mobile menu using the mmenu.js app.
   *
   * @since 2.0.0
   *
   * @author Digital Services <communications@det.nsw.edu.au>
   * @copyright © 2019 State Government of NSW 2019
   *
   * @class
   * @requires jQuery
   */
  jQuery(document).ready(function ($) {
    //<!-- Fire the mmenu.js plugin -->
    $("#gel-mnav").mmenu({
      "extensions": ["pagedim-black"],
      "keyboardNavigation": {
        "enable": true,
        "enahance": true
      },
      "onClick": {
        setSelected: true
      },
      "classNames": {
        selected: "Selected"
      }
    }, {
      //configuration
      "offCanvas": {
        "page": {
          nodetype: "div",
          selector: ".gel-main"
        }
      }
    }); //Introduce the mobile menu close button to DOM

    var gelCloseButton = '<button class="gel-mobile-nav_icon-close" id="gel-mobile-nav_icon-close-id" aria-label="Close main menu" tabindex="-1"></button>';
    $("#gel-mnav").prepend(gelCloseButton);
    var api = $("#gel-mnav").data("mmenu"); //Adding event listener
    //Invoke this method to open the main menu and NOT the submenu panel(after the open function finishes).

    api.bind("open:finish", function () {
      setTimeout(function () {
        $("#gel-mobile-nav_icon-close-id").focus();
        $("#menu-open").blur();
        this.allSRItems = $('body').children(':not(.mm-panel,.gel-mobile-nav,.mm-panels)');
        this.allShowItems = $('body').find('.mm-panel');
        this.allSRItems.each(function () {
          $(this).attr('aria-hidden', "true");
        });
        this.allShowItems.each(function () {
          $(this).attr('aria-hidden', "false");
        });
      }, 0);
    }); //adding a custom data on the click event to get the focus when the submenu closes

    $(".mm-listitem__btn").on("click", function () {
      $(this).attr('data-focus', "true");
    }); //Adding event listener
    //Invoke this method to open the submenu panel(after the open function finishes).

    api.bind("openPanel:start", function ($panel) {
      if ($panel.attr("id") == "mm-0") {
        if ($(".mm-panel").hasClass("mm-panel_opened")) {
          setTimeout(function () {
            $(".mm-panel_opened").find('[data-focus="true"]').focus();
          }, 0);
        }
      } else {
        setTimeout(function (e) {
          document.activeElement.blur();
          $("#gel-mobile-nav_icon-close-id").focus();
        }, 0);
      }
    }); //manually call the close function on button click

    $("#gel-mobile-nav_icon-close-id").click(function () {
      api.close();
    }); //Adding event listener
    //Invoke this method to close the mainmenu panel(after the open function finishes).

    api.bind("close:finish", function () {
      api.closeAllPanels();
      setTimeout(function () {
        $("#gel-mobile-nav_icon-close-id").blur();
        $("#menu-open").focus();
        this.allSRItems = $('body').children(':not(.mm-panel,.gel-mobile-nav,.mm-panels)');
        this.allShowItems = $('body').find('.mm-panel');
        this.allSRItems.each(function () {
          $(this).removeAttr('aria-hidden');
        });
        this.allShowItems.each(function () {
          $(this).attr('aria-hidden', "true");
        });
      }, 50);
    });
  });
});