let toolReducer;

const tools = {
  MOVE: "move",
  NEW_NOTE: "new_note",
  SELECT_NOTES: "select_notes",
  SELECT_TIME: "select_time",
  VOICES: "voices",
  SECTIONS: "sections",
  SPEED: "speed",
  DYNAMICS: "dynamics",
  MIXING: "mixing"
};

(function() {
  const defaultState = tools.MOVE;

  toolReducer = (state=defaultState, action) => {
    switch (action.type) {
      case SELECT_TOOL:
        return action.tool;
      default:
        return state;
    }
  }
})();
