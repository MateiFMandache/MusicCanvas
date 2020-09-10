let moveReducer;

const moveTypes = {
  MOVE: "move",
  PITCH_PLUS: "pitch_plus",
  PITCH_MINUS: "pitch_minus",
  TIME_PLUS: "time_plus",
  TIME_MINUS: "time_minus"
};

(function() {
  const defaultState = moveTypes.MOVE;

  moveReducer = (state=defaultState, action) => {
    switch (action.type) {
      case NEW_MOVE_TYPE:
        return action.moveType;
      default:
        return state;
    }
  }
})();
