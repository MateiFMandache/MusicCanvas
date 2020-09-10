const CANVAS_MARGIN = 12;
const STANDARD_OCTAVE_SIZE = 150;
const STANDARD_BEAT_SIZE = 50;
const OCTAVE_RANGE = 9;
const STARTING_HIGHEST_OCTAVE = 6;
// factors determining how much we zoom in/out when we zoom in/out
const PITCH_ZOOM_FACTOR = 1.3;
const TIME_ZOOM_FACTOR = 1.5;

let canvasReducer;

(function() {
  const defaultState = {
    pitchZoom: 1,
    timeZoom: 1,
    pitchPos: (OCTAVE_RANGE - STARTING_HIGHEST_OCTAVE) * STANDARD_OCTAVE_SIZE,
    timePos: -CANVAS_MARGIN,
    // width and height of the canvas viewport, not the svg itself
    width: undefined,
    height: undefined
  }

  function getPushedByEdges(state, positions) {
    // returns an object with pitchPos and timePos equal to the result of
    // starting with positions given by positions object and getting pushed
    // by the edges according to given state.
    return {
      pitchPos: Math.max(-CANVAS_MARGIN,
                  Math.min(
                    STANDARD_OCTAVE_SIZE * state.pitchZoom * OCTAVE_RANGE
                    + CANVAS_MARGIN - state.height,
                    positions.pitchPos
                  )),
      timePos: Math.max(-CANVAS_MARGIN,
                 Math.min(
                   STANDARD_BEAT_SIZE * state.timeZoom * numberOfBeats
                   + CANVAS_MARGIN - state.width,
                   positions.timePos
                 ))
    };
  }

  canvasReducer = (state=defaultState, action) => {
    // intermediate state for use in 2-step calculations.
    // Step 1 is applying relevant transformation, step 2 is
    // getting pushed by edges.
    let intermediate;
    switch(action.type) {
      case NEW_NUMBER_OF_BARS:
      case NEW_BEATS_PER_BAR:
        return Object.assign({}, state, getPushedByEdges(state, state));
      case RESIZE_CANVAS:
        intermediate = Object.assign({}, state, {
          width: action.width,
          height: action.height
        });
        return Object.assign(intermediate, getPushedByEdges(intermediate, intermediate));
      case MOVE:
        return Object.assign({}, state,
          getPushedByEdges(state, action.positions))
      case PITCH_ZOOM_IN:
        intermediate = Object.assign({}, state, {
          pitchZoom: PITCH_ZOOM_FACTOR * state.pitchZoom,
          // formula for zooming in towards pitchPoint
          pitchPos: PITCH_ZOOM_FACTOR * state.pitchPos
                  + (PITCH_ZOOM_FACTOR - 1) * action.pitchPoint
        })
        return Object.assign(intermediate, getPushedByEdges(intermediate, intermediate));
      case PITCH_ZOOM_OUT:
        intermediate = Object.assign({}, state, {
          pitchZoom: state.pitchZoom / PITCH_ZOOM_FACTOR,
          // formula for zooming out from pitchPoint
          pitchPos: state.pitchPos / PITCH_ZOOM_FACTOR
                  - (1 - 1 / PITCH_ZOOM_FACTOR) * action.pitchPoint
        });
        return Object.assign(intermediate, getPushedByEdges(intermediate, intermediate));
      case TIME_ZOOM_IN:
        intermediate = Object.assign({}, state, {
          timeZoom: TIME_ZOOM_FACTOR * state.timeZoom,
          // formula for zooming in towards pitchPoint
          timePos: TIME_ZOOM_FACTOR * state.timePos
                  + (TIME_ZOOM_FACTOR - 1) * action.timePoint
        })
        return Object.assign(intermediate, getPushedByEdges(intermediate, intermediate));
      case TIME_ZOOM_OUT:
        intermediate = Object.assign({}, state, {
          timeZoom: state.timeZoom / TIME_ZOOM_FACTOR,
          // formula for zooming out from pitchPoint
          timePos: state.timePos / TIME_ZOOM_FACTOR
                  - (1 - 1 / TIME_ZOOM_FACTOR) * action.timePoint
        });
        return Object.assign(intermediate, getPushedByEdges(intermediate, intermediate));
      default:
        return state;
    }
  }
})();
