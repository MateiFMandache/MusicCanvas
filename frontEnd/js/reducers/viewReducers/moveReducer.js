"use strict";

var moveReducer = void 0;

var moveTypes = {
  MOVE: "move",
  PITCH_PLUS: "pitch_plus",
  PITCH_MINUS: "pitch_minus",
  TIME_PLUS: "time_plus",
  TIME_MINUS: "time_minus"
};

(function () {
  var defaultState = moveTypes.MOVE;

  moveReducer = function moveReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case NEW_MOVE_TYPE:
        return action.moveType;
      default:
        return state;
    }
  };
})();