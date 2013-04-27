var ProductView = Backbone.View.extend({
  tagName : 'li',
  attributes: {
    "data-corners" : "false",
    "data-shadow" : "false",
    "data-iconshadow" : "true",
    "data-wrapperels" : "div",
    "data-icon" : "arrow-r",
    "data-iconpos" : "right",
    "data-theme" : "c",
    "class" : "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"
  },
  template : null,
  events : {

  },

  initialize : function() {
    this.template = $('#product-template').html();
  },
  render : function() {
    $(this.el).html(Mustache.to_html(this.template, this.model.toJSON()));
    return this;
  }
});

var AppView = Backbone.View.extend({
  el: $('body'),
  initialize: function() {

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