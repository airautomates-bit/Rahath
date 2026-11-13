"use strict";

// Meta (Facebook) Pixel for the "Rahath" dataset in Events Manager.
// Loaded as a file because the site's Content-Security-Policy blocks inline scripts.
// The Lead event is sent from index.js when the booking form succeeds.
(function () {
  var PIXEL_ID = "2614798715622036";

  // The CSP turns on Trusted Types, which blocks scripts added by URL string.
  // Meta's loader adds its scripts that way, so allow Meta's script host only.
  if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
    window.trustedTypes.createPolicy("default", {
      createScriptURL: function (url) {
        if (/^https:\/\/connect\.facebook\.net\//.test(url)) {
          return url;
        }
        throw new TypeError("Blocked script URL: " + url);
      },
    });
  }

  // Meta's standard pixel loader.
  if (window.fbq) {
    return;
  }
  var fbq = function () {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, arguments);
    } else {
      fbq.queue.push(arguments);
    }
  };
  window.fbq = fbq;
  if (!window._fbq) {
    window._fbq = fbq;
  }
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  var first = document.getElementsByTagName("script")[0];
  first.parentNode.insertBefore(script, first);

  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
})();
