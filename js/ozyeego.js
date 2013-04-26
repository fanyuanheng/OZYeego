$(document).ready(function () {
  Parse.initialize("5nnsyTkqFo5TMAkgW4l14bc9G0Kx9VXJQpg7kIIA", "ZoiiGTLEOvAExcAQpgTBuYOmLtXXeCHvLharWk9n");
  // forge.enableDebug();
  $(document).bind("mobileinit", function () {
      $.mobile.pushStateEnabled = true;
      $.mobile.touchOverflowEnabled = true;
  });

  var App = new AppView;

});
