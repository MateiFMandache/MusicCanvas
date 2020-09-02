let windowReducer;

const windowStates = {
  NONE: "none",
  TITLE: "title",
  SELECT_SCALE: "select scale",
  SELECT_TIMING: "select timing",
  SELECT_SECTION: "select section",
  NEW_SECTION: "new section"
};

(function() {
  const defaultState = {windowState: windowStates.NONE};

  windowReducer = (state=defaultState, action) => {
    switch (action.type) {
      case TITLE_CLICK:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, {windowState: windowStates.TITLE});
        } else {
          return state;
        }
      case CHOOSE_SCALE:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, {windowState:
            windowStates.SELECT_SCALE});
        } else {
          return state;
        }
      case CHOOSE_TIMING:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, {windowState:
            windowStates.SELECT_TIMING});
        } else {
          return state;
        }
      case CHOOSE_SECTION:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, {windowState:
            windowStates.SELECT_SECTION});
        } else {
          return state;
        }
      case MAKE_NEW_SECTION:
        if (state.windowState == windowStates.NONE) {
          return Object.assign({}, state, {windowState:
            windowStates.NEW_SECTION});
        } else {
          return state;
        }
      case CLOSE_WINDOW:
        return Object.assign({}, state, {windowState: windowStates.NONE});
      default:
        return state;
    }
  }
})();
