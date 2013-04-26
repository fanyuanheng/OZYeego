Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");

$(document).ready(function () {
  // forge.enableDebug();

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
      _.bindAll(this);
      this.template = _.template($('#productTemplate').html());
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

      $.mobile.showPageLoadingMsg("a", "Loading latest products");
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

  var App = new AppView;

  // Menu setup
  var menuStatus;
  var show = function() {
      if(menuStatus) {
          return;
      }
      $('#menu').show();
      $.mobile.activePage.animate({
          marginLeft: "165px"
      }, 100, function () {
          menuStatus = true
      });
  };
  var hide = function() {
      if(!menuStatus) {
          return;
      }
      $.mobile.activePage.animate({
          marginLeft: "0px"
      }, 100, function () {
          menuStatus = false
          $('#menu').hide();
      });
  };
  var toggle = function() {
      if (!menuStatus) {
          show();
      } else {
          hide();
      }
      return false;
  };

  // Show/hide the menu
  $("a.showMenu").click(toggle);
  $('#menu, .pages').live("swipeleft", hide);
  $('.pages').live("swiperight", show);

  $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
      menuStatus = false;
      $(".pages").css("margin-left", "0");
  });

  // Menu behaviour
  $("#menu li a").click(function () {
      var p = $(this).parent();
      p.siblings().removeClass('active');
      p.addClass('active');
  });

});
