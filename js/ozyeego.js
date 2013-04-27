function initMenuPanel() {
  var menuPanelTemplate = Mustache.to_html($('#menu-panel-template').html());
  _.each(['#products', '#about-us'], function(sel){
    $(sel).prepend(menuPanelTemplate);
  });
  $('#products').trigger("create");
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
