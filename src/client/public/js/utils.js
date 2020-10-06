const setUrl = (parameterName, target) => {
  var href = new URL(window.location.href);
  href.searchParams.set(parameterName, target.value);
  window.location.href = href;
};

const createSharableUrl = (params = []) => {
  var href = new URL(window.location.href);

  params.forEach((item) => {
    href.searchParams.set(item.name, item.value);
  });

  return href.href;
};

function removeUrlParameter(url, parameter) {
  var urlParts = url.split("?");

  if (urlParts.length >= 2) {
    // Get first part, and remove from array
    var urlBase = urlParts.shift();

    // Join it back up
    var queryString = urlParts.join("?");

    var prefix = encodeURIComponent(parameter) + "=";
    var parts = queryString.split(/[&;]/g);

    // Reverse iteration as may be destructive
    for (var i = parts.length; i-- > 0; ) {
      // Idiom for string.startsWith
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = urlBase + "?" + parts.join("&");
  }

  return url;
}

function copyStringToClipboard(textToCopy) {
  var el = document.createElement("textarea");
  el.value = textToCopy;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px",
  };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export { setUrl, createSharableUrl, removeUrlParameter, copyStringToClipboard };
