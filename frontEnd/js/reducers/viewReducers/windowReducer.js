"use strict";

var windowReducer = void 0;

var windowStates = {
  NONE: "none",
  TITLE: "title"
};

(function () {
  var defaultState = { windowState: windowStates.NONE };

  windowReducer = function windowReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case TITLE_CLICK:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, { windowState: windowStates.TITLE });
        } else {
          return state;
        }
      case CLOSE_WINDOW:
        return Object.assign({}, state, { windowState: windowStates.NONE });
      default:
        return state;
    }
  };
})();