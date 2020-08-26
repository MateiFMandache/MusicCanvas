"use strict";

var viewportSizeReducer = void 0;

(function () {
  var defaultState = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };

  viewportSizeReducer = function viewportSizeReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case WINDOW_RESIZE:
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        };
      default:
        return state;
    }
  };
})();