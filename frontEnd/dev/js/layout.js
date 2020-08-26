document.defaultView.addEventListener("resize", () => {
  store.dispatch(windowResize())
});
