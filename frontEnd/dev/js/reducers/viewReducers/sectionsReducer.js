let sectionReducer;

(function() {
  const defaultState = {

  };

  toolReducer = (state=defaultState, action) => {
    switch (action.type) {
      case SELECT_TOOL:
        return action.tool;
      default:
        return state;
    }
  }
})();
