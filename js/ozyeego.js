Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");

$(function() {
  var Product = Backbone.Model.extend({
    defaults : {
      name : '',
      image_url : '',
      in_stock : false,
      our_price : 0,
      rrp_price : 0,
      supplier : '',
      discount : 0,
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
      this.template = _.template('<img src="<%= image_url %>" /><span><%= name %></span>');
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
          Products.each(function(product){

            var view = new ProductView({model: product});
            this.$("#products-list").append(view.render().el);
          }, this);
        },
        error: function(error) {
          forge.logging.info("Error: " + error.code + " " + error.message);
        }
      });
      
    }
  });

  var App = new AppView;
});
