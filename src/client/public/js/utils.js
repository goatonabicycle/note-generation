const setUrl = (parameterName, target) => {
  if (target.selectedIndex !== 0) {
    var href = new URL(window.location.href);
    href.searchParams.set(parameterName, target.value);
    window.location.href = href;
  }
};

const createSharableUrl = (params = []) => {
  var href = new URL(window.location.href);

  params.forEach((item) => {
    href.searchParams.set(item.name, item.value);
  })

  return href.href;
};

export {
  setUrl,
  createSharableUrl
}