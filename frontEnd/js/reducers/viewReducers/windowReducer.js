"use strict";

var windowReducer = void 0;

var windowStates = {
  NONE: "none",
  TITLE: "title",
  SELECT_SCALE: "select scale",
  SELECT_TIMING: "select timing",
  SELECT_SECTION: "select section",
  NEW_SECTION: "new section"
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
      case CHOOSE_SCALE:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, { windowState: windowStates.SELECT_SCALE });
        } else {
          return state;
        }
      case CHOOSE_TIMING:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, { windowState: windowStates.SELECT_TIMING });
        } else {
          return state;
        }
      case CHOOSE_SECTION:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, { windowState: windowStates.SELECT_SECTION });
        } else {
          return state;
        }
      case MAKE_NEW_SECTION:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, { windowState: windowStates.NEW_SECTION });
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