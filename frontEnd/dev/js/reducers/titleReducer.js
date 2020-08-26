let titleReducer;

(function() {
  const defaultState = "";

  titleReducer = (state=defaultState, action) => {
    switch (action.type) {
      case NEW_TITLE:
        return action.title;
      default:
        return state;
    }
  }
})();
