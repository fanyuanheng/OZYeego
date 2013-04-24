Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");

var getProducts = function () {
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Product);
  query.equalTo("supplier", "ChemistWarehouse");
  query.find({
    success: function(results) {
      forge.logging.info("Successfully retrieved " + results.length + " products.");
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

$(document).ready(function() {
  getProducts();
});
