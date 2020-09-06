const setUrl = (parameterName, parameterValue) => {
  if (this.selectedIndex !== 0) {
    var href = new URL(window.location.href);
    href.searchParams.set(parameterName, parameterValue);
    window.location.href = href;
  }
};

export { setUrl };
