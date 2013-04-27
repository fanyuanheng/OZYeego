var initMenuPanel = function() {
  var menuPanelTemplate = Mustache.to_html($('#menu-panel-template').html());
  _.each(['#products', '#about-us'], function(sel){
    $(sel).prepend(menuPanelTemplate);
  });
  $('#products').trigger("create");
}

var queryProducts = function(callback) {
  $.mobile.showPageLoadingMsg();

  var query = new Parse.Query(Parse.Object.extend("Product"));
  query.equalTo("supplier", "ChemistWarehouse");
  query.find({
    success: function(results) {
      var Products = new ProductList(_.map(results, function(result) {
        return new Product({
          name : result._serverData.name,
          image_url : result._serverData.image_url,
          in_stock : result._serverData.in_stock,
          our_price : result._serverData.our_price,
          rrp_price : result._serverData.rrp_price,
          supplier : result._serverData.supplier,
          discount : result._serverData.discount,
          category : result._serverData.category
        });
      }));

      $.mobile.hidePageLoadingMsg();
      callback(Products);
    },
    error: function(error) {
      forge.logging.info("Error: " + error.code + " " + error.message);
    }
  });
}

$(document).ready(function () {
  Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");
  // forge.enableDebug();
  $(document).bind("mobileinit", function () {
      $.mobile.pushStateEnabled = true;
      $.mobile.touchOverflowEnabled = true;
  });

  initMenuPanel();

  var App = new AppView;

});
