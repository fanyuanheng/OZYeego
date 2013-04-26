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

var ProductList = Backbone.Collection.extend({
  model: Product
});