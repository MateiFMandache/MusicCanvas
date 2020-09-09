"use strict";

var canvasReducer = void 0;

(function () {
  var defaultState = {
    pitchZoom: 1,
    timeZoom: 1,
    pitchLocation: 0,
    timeLocation: 0
  };

  canvasReducer = function canvasReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case RESIZE_CANVAS:
        return Object.assign({}, state, {
          width: action.width,
          height: action.height
        });
      default:
        return state;
    }
  };
})();