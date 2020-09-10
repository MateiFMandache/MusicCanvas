const NEW_TITLE = "NEW_TITLE";
const TITLE_CLICK = "TITLE_CLICK";
const CLOSE_WINDOW = "CLOSE_WINDOW";
const SELECT_TOOL = "SELECT_TOOL";
const NEW_TONIC = "NEW_TONIC";
const NEW_SCALE_TYPE = "NEW_SCALE_TYPE";
const CHOOSE_SCALE = "CHOOSE_SCALE";
const NEW_NUMBER_OF_BARS = "NEW_NUMBER_OF_BARS";
const NEW_BEATS_PER_BAR = "NEW_BEATS_PER_BAR";
const NEW_SUBDIVISIONS_PER_BEAT = "NEW_SUBDIVISIONS_PER_BEAT";
const CHOOSE_TIMING = "CHOOSE_TIMING";
const CHOOSE_SECTION = "CHOOSE_SECTION";
const MAKE_NEW_SECTION = "MAKE_NEW_SECTION";
const RESIZE_CANVAS = "RESIZE_CANVAS";
const NEW_MOVE_TYPE = "NEW_MOVE_TYPE";
const MOVE = "MOVE";
const PITCH_ZOOM_IN = "PITCH_ZOOM_IN";
const PITCH_ZOOM_OUT = "PITCH_ZOOM_OUT";
const TIME_ZOOM_IN = "TIME_ZOOM_IN";
const TIME_ZOOM_OUT = "TIME_ZOOM_OUT";

function newTitle(title) {
  return {
    type: NEW_TITLE,
    title
  };
}

function titleClick() {
  return {
    type: TITLE_CLICK
  };
}

function closeWindow() {
  return {
    type: CLOSE_WINDOW
  };
}

function selectTool(tool) {
  return {
    type: SELECT_TOOL,
    tool
  };
}

function newTonic(tonic) {
  return {
    type: NEW_TONIC,
    tonic
  };
}

function newScaleType(scaleType) {
  return {
    type: NEW_SCALE_TYPE,
    scaleType
  };
}

function chooseScale() {
  return {
    type: CHOOSE_SCALE
  };
}

function newNumberOfBars(bars) {
  return {
    type: NEW_NUMBER_OF_BARS,
    bars
  };
}

function newBeatsPerBar(beatsPerBar) {
  return {
    type: NEW_BEATS_PER_BAR,
    beatsPerBar
  };
}

function newSubdivisionsPerBeat(subdivisions) {
  return {
    type: NEW_SUBDIVISIONS_PER_BEAT,
    subdivisions
  };
}

function chooseTiming() {
  return {
    type: CHOOSE_TIMING
  };
}

function chooseSection() {
  return {
    type: CHOOSE_SECTION
  };
}

function makeNewSection() {
  return {
    type: MAKE_NEW_SECTION
  };
}

function resizeCanvas(width, height) {
  return {
    type: RESIZE_CANVAS,
    width,
    height
  };
}

function newMoveType(moveType) {
  return {
    type: NEW_MOVE_TYPE,
    moveType
  };
}

function move(positions) {
  return {
    type: MOVE,
    // positions has (optional) pitchPos and timePos attributes
    positions
  };
}

function pitchZoomIn(pitchPoint) {
  return {
    type: PITCH_ZOOM_IN,
    // The point that was clicked on. This point stays fixed
    // when we zoom in
    pitchPoint
  };
}

function pitchZoomOut(pitchPoint) {
  return {
    type: PITCH_ZOOM_OUT,
    // The point that was clicked on. This point stays fixed
    // when we zoom out
    pitchPoint
  };
}

function timeZoomIn(timePoint) {
  return {
    type: TIME_ZOOM_IN,
    // The point that was clicked on. This point stays fixed
    // when we zoom in
    timePoint
  };
}

function timeZoomOut(timePoint) {
  return {
    type: TIME_ZOOM_OUT,
    // The point that was clicked on. This point stays fixed
    // when we zoom out
    timePoint
  };
}
