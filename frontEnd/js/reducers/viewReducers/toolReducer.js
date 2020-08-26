"use strict";

var toolReducer = void 0;

var tools = {
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

(function () {
  var defaultState = tools.MOVE;

  toolReducer = function toolReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case SELECT_TOOL:
        return action.tool;
      default:
        return state;
    }
  };
})();