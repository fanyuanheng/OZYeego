var ProductView = Backbone.View.extend({
  tagName : 'li',
  attributes : {
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
    queryProducts(function(results){
      results.each(function(product){
        var view = new ProductView({model: product});
        this.$("#products-list").append(view.render().el);
      }, this);
    });    
  }
});