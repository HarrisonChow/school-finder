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
    global.livefyre = mod.exports;
  }
})(this, function () {
  "use strict";

  (function ($) {
    var maxLength = 8;
    var uatLink = "https://nsweducation-uat.bootstrap.fyre.co/bs3/v3.1/nsweducation-uat.fyre.co/385880/";
    var prodLink = "https://nsweducation.bootstrap.fyre.co/bs3/v3.1/nsweducation.fyre.co/385899/"; //  console.log(Base64)
    //let b64 = $.base64(encode)("designer-app-1540445549175")
    //console.log("b64", b64)
    // work out which URL to loader

    var urlToFetch = prodLink;

    if ($(".gel-livefyre-mosaic").attr("livefyreType") == "uat") {
      urlToFetch = uatLink;
    }

    if ($(".gel-livefyre-mosaic").attr("livefyreID")) {
      urlToFetch += $(".gel-livefyre-mosaic").attr("livefyreID") + "/init";
    } else {
      console.error("no livefyre value found");
    }

    fetchLiveFyre(urlToFetch); // initial fetch

    $('#submitForm').click(function () {
      $(".gel-livefyre-mosaic").html("");
      var typeOfPage = $("input[name=q_type]:checked").val();
      var fetchUrl = uatLink;

      if (typeOfPage == "prod") {
        fetchUrl = prodLink;
      }

      fetchUrl += $("#inputCode").val() + "/init";
      fetchLiveFyre(fetchUrl);
    });
    /** Function fetchLiveFyre(url)
    * insert the url required
    * initiates ajax call and processes
    **/

    function fetchLiveFyre(url) {
      var response2 = $.ajax({
        url: url
      }).done(function (data) {
        //  console.log("response 2", data)
        processReturn(data);
      }).fail(function (data) {
        console.log("error response 2", data);
      });
    }
    /** function processReturn
    * Expects data from the ajax call, to include a headDocument.content return, which contains all the information about the item.
    
    **/


    function processReturn(data) {
      if (!data) {
        console.error("no data");
      } else {
        var headData = data.headDocument;

        if (headData) {
          var contentReturned = headData.content; // console.log(contentReturned)

          var itemsToShow = maxLength > contentReturned.length ? contentReturned.length : maxLength; // console.log(itemsToShow)

          var liveFyreHTML = "";

          for (var i = 0; i < itemsToShow; i++) {
            liveFyreHTML = processItem(contentReturned[i]) ? liveFyreHTML + processItem(contentReturned[i]) : liveFyreHTML;
          }

          $(".gel-livefyre-mosaic").html(liveFyreHTML);
        }
      }
    }
    /**
      function processItem
      Takes the individual items and processes them according to type
      Structure is:
      - collectionId
      - collection - contains all the information about the processItem
      - event
      - source - where it come from.  19 is Twitter, 20 is Instagram.  Not sure what other numbers are at the moment.  0 is manually uploaded.
      - type - no idea what this is either.  Their documnetation sucks
      - vis - again, who knows.
      - the actual details live unnder the content.attachments [0] though
    **/


    function processItem(item) {
      var htmlStructure = "<div class=\"gel-sm-item col-xl-3 col-lg-4 col-md-6 \">";
      htmlStructure += "<div class=\"gel-sm-item-inter-container \">";
      htmlStructure += "<h2 class=\"show-on-sr\">Social Media component from livefyre</h2>";
      htmlStructure += "<div class=\"gel-sm-image-location\"><a href=\"SHARE\">THUMBNAIL<\/a><\/div>";
      htmlStructure += "<div class=\"gel-sm-branding\"><\/div>";
      htmlStructure += "<div class=\"gel-sm-wording\">";
      htmlStructure += "<p>INTRODUCTION<\/p>";
      htmlStructure += "<\/div>";
      htmlStructure += "<div class=\"gel-sm-footer row\">";
      htmlStructure += " <div class=\"gel-sm-date-and-type col-sm-6\">";
      htmlStructure += "<div class=\"gel-sm-type MEDIATYPE\"><\/div>";
      htmlStructure += "<div class=\"gel-sm-date\">";
      htmlStructure += "<datetime>DATESENT<\/datetime>";
      htmlStructure += "<\/div>";
      htmlStructure += "<\/div>";
      htmlStructure += "<div class=\"gel-sm-share col-sm-6\"><a href=\"SHARE\">Share<\/a><\/div>";
      htmlStructure += "<\/div>";
      htmlStructure += "<\/div>";
      htmlStructure += "<\/div>";
      var itemContent = item.content;
      console.log(itemContent);

      if (itemContent) {
        var itemAttachment = itemContent.attachments; //console.log(itemAttachment)

        if (itemAttachment) {
          var itemDetails = itemAttachment[0]; // get the base information for this

          var baseCode = htmlStructure;
          baseCode = baseCode.replace("MEDIATYPE", "gel-sm-" + itemDetails.provider_name);
          baseCode = baseCode.replace("THUMBNAIL", "<img alt=\"Twitter post from " + itemDetails.author_name + "\"  src=\"" + itemDetails.thumbnail_url + "\" />");

          if (itemDetails.title.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").length > 100) {
            baseCode = baseCode.replace("INTRODUCTION", itemDetails.title.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").substring(0, 97) + "...");
          } else {
            baseCode = baseCode.replace("INTRODUCTION", itemDetails.title.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").substring(0, 100));
          }

          var thisDate = new Date(itemContent.createdAt * 1000); //console.log(thisDate)

          var formattedDate = thisDate.getDate() + "/" + (thisDate.getMonth() + 1) + "/" + thisDate.getFullYear();
          baseCode = baseCode.replace("DATESENT", formattedDate);
          baseCode = baseCode.replace(/SHARE/g, itemDetails.link);
          return baseCode;
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  })(jQuery);
});