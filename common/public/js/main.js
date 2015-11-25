(function() {

  /**
   * Lazy load images after initial page load
   */
  var asyncLoadImages = function() {
    var showImage = function(image) {
      image.onload = function() {
        image.className += ' solid';
      };
      image.src = this.src;
    };

    var lazyImages = document.querySelectorAll('img[data-src]');

    for (var i = 0; i < lazyImages.length; ++i) {
      var lazyImage = lazyImages[i];
      var tmpImage = new Image();
      tmpImage.onload = showImage.bind(tmpImage, lazyImage);
      tmpImage.src = lazyImage.dataset.src;
    }
  };

  var init = function() {
    asyncLoadImages();
  };

  var createApp = function(prototype) {
    return prototype;
  };

  var appPrototype = {
    init: init
  };
  var app = createApp(appPrototype);

  window.addEventListener('load', app.init, false);

})();
