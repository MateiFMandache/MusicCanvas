let viewportSizeReducer;

(function() {
  const defaultState = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };

  viewportSizeReducer = (state=defaultState, action) => {
    switch (action.type) {
      case WINDOW_RESIZE:
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        };
      default:
        return state;
    }
  }
})();
