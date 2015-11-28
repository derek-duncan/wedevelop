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
          var currentURL;
          try {
            var res = JSON.parse(xmlhttp.responseText);
            currentURL = window.location.href.split('/');
            currentURL.pop();
            var updatedPath = res.data.machine_name ? res.data.machine_name : res.data._id;
            currentURL.push(updatedPath);
            currentURL = currentURL.join('/');
          } catch (e) {
            // just swallow it. I dont care.
          }

          var redirectURL = form.dataset.redirecturl ? form.dataset.redirecturl : currentURL;
          if (redirectURL) {
            window.location.href = redirectURL;
          }
        }
      };

      var action = form.getAttribute('action');
      var method = form.getAttribute('method');
      var elements = form.elements;

      xmlhttp.open(method, action, true);
      xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      var sendString = '';
      for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        if (!element.getAttribute('name')) continue;

        var prefix = '';
        if (i) prefix = '&';

        sendString += prefix + encodeURIComponent(element.getAttribute('name')) + '=' + encodeURIComponent(element.value);
      }
      xmlhttp.send(sendString);

      return false;
    }
  };

  /**
   * Send a delete request through a button
   */
  var ajaxDeleteButton = function() {
    var buttons = document.querySelectorAll('.js-button--delete');
    if (!buttons.length) return false;

    for (var i = 0; i < buttons.length; ++i) {
      var button = buttons[i];
      button.onclick = sendDelete;
    }

    function sendDelete(e) {
      var button = e.target;
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          // it worked
          var redirectURL = button.dataset.redirecturl;
          if (redirectURL) {
            window.location.href = redirectURL;
          }
        }
      };

      var url = button.dataset.url;

      xmlhttp.open('DELETE', url, true);
      xmlhttp.send();

      return false;
    }
  };

  var init = function() {
    ajaxUpdateForm();
    ajaxDeleteButton();
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
