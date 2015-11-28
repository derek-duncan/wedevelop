(function() {

  /**
   * Submit update forms with ajax to utilize PUT request
   */
  var ajaxUpdateForm = function() {
    var forms = document.querySelectorAll('form.js-form--ajax');
    if (!forms.length) return false;

    for (var i = 0; i < forms.length; ++i) {
      var form = forms[i];
      form.onsubmit = submitForm;
    }

    function submitForm(e) {
      var form = e.target;
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          // it worked
        }
      };

      var action = form.getAttribute('action');
      var method = form.getAttribute('method');
      var titleValue = form.querySelector('[name=title]').value;
      var bodyValue = form.querySelector('[name=body]').value;

      xmlhttp.open(method, action, true);
      xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xmlhttp.send('title=' + titleValue + '&body=' + bodyValue);

      var redirectURL = form.dataset.redirectURL;
      if (redirectURL) {
        window.location.href = redirectURL;
      }

      return false;
    }
  };

  var init = function() {
    ajaxUpdateForm();
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
