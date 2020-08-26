let windowReducer;

const windowStates = {
  NONE: "none",
  TITLE: "title"
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
      case CLOSE_WINDOW:
        return Object.assign({}, state, {windowState: windowStates.NONE});
      default:
        return state;
    }
  }
})();
