Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");

// var getProducts = function () {
//   var Product = Parse.Object.extend("Product");
//   var query = new Parse.Query(Product);
//   query.equalTo("supplier", "ChemistWarehouse");
//   query.find({
//     success: function(results) {
//       _.each(results, function(product) {forge.logging.info(product._serverData.name);});
//     },
//     error: function(error) {
//       alert("Error: " + error.code + " " + error.message);
//     }
//   });
// }

$(function() {
  var Product = Backbone.Model.extend({
    defaults : {
      name : '',
      category : ''
    }
  });
  var ProductView = Backbone.View.extend({
    tagName : 'li',
    template : null,
    events : {

    },

    initialize : function() {
      _.bindAll(this);
      this.template = _.template('<span>Product Name: <%= name %></span>');
    },
    render : function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });
  var ProductList = Backbone.Collection.extend({
    model: Product
  });

  var AppView = Backbone.View.extend({
    el: $('body'),
    initialize: function() {
      var query = new Parse.Query(Parse.Object.extend("Product"));
      query.equalTo("supplier", "ChemistWarehouse");
      query.find({
        success: function(results) {
          var Products = new ProductList(_.map(results, function(result) {
            return new Product({name : result._serverData.name, category : result._serverData.category});
          }));
          Products.each(function(product){

            var view = new ProductView({model: product});
            this.$("#products-list").append(view.render().el);
          }, this);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
      
    }
  });

  forge.logging.info('Starting app');
  var App = new AppView;
  // getProducts();
});
