"use strict";

var titleReducer = void 0;

(function () {
  var defaultState = "";

  titleReducer = function titleReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case NEW_TITLE:
        return action.title;
      default:
        return state;
    }
  };
})();