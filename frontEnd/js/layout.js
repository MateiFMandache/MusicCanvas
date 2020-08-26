"use strict";

document.defaultView.addEventListener("resize", function () {
  store.dispatch(windowResize());
});