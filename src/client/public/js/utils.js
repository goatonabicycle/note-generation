const setUrl = (parameterName, target) => {
  if (target.selectedIndex !== 0) {
    var href = new URL(window.location.href);
    href.searchParams.set(parameterName, target.value);
    window.location.href = href;
  }
};

export {
  setUrl
}