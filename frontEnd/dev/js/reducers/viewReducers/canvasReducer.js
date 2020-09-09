let canvasReducer;

(function() {
  const defaultState = {
    pitchZoom: 1,
    timeZoom: 1,
    pitchLocation: 0,
    timeLocation: 0
  }

  canvasReducer = (state=defaultState, action) => {
    switch(action.type) {
      case RESIZE_CANVAS:
        return Object.assign({}, state, {
          width: action.width,
          height: action.height
        })
      default:
        return state;
    }
  }
})();
