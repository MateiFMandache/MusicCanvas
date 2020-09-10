"use strict";

var NEW_TITLE = "NEW_TITLE";
var TITLE_CLICK = "TITLE_CLICK";
var CLOSE_WINDOW = "CLOSE_WINDOW";
var SELECT_TOOL = "SELECT_TOOL";
var NEW_TONIC = "NEW_TONIC";
var NEW_SCALE_TYPE = "NEW_SCALE_TYPE";
var CHOOSE_SCALE = "CHOOSE_SCALE";
var NEW_NUMBER_OF_BARS = "NEW_NUMBER_OF_BARS";
var NEW_BEATS_PER_BAR = "NEW_BEATS_PER_BAR";
var NEW_SUBDIVISIONS_PER_BEAT = "NEW_SUBDIVISIONS_PER_BEAT";
var CHOOSE_TIMING = "CHOOSE_TIMING";
var CHOOSE_SECTION = "CHOOSE_SECTION";
var MAKE_NEW_SECTION = "MAKE_NEW_SECTION";
var RESIZE_CANVAS = "RESIZE_CANVAS";
var NEW_MOVE_TYPE = "NEW_MOVE_TYPE";
var MOVE = "MOVE";
var PITCH_ZOOM_IN = "PITCH_ZOOM_IN";
var PITCH_ZOOM_OUT = "PITCH_ZOOM_OUT";
var TIME_ZOOM_IN = "TIME_ZOOM_IN";
var TIME_ZOOM_OUT = "TIME_ZOOM_OUT";

function newTitle(title) {
  return {
    type: NEW_TITLE,
    title: title
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
    tool: tool
  };
}

function newTonic(tonic) {
  return {
    type: NEW_TONIC,
    tonic: tonic
  };
}

function newScaleType(scaleType) {
  return {
    type: NEW_SCALE_TYPE,
    scaleType: scaleType
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
    bars: bars
  };
}

function newBeatsPerBar(beatsPerBar) {
  return {
    type: NEW_BEATS_PER_BAR,
    beatsPerBar: beatsPerBar
  };
}

function newSubdivisionsPerBeat(subdivisions) {
  return {
    type: NEW_SUBDIVISIONS_PER_BEAT,
    subdivisions: subdivisions
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
    width: width,
    height: height
  };
}

function newMoveType(moveType) {
  return {
    type: NEW_MOVE_TYPE,
    moveType: moveType
  };
}

function move(positions) {
  return {
    type: MOVE,
    // positions has (optional) pitchPos and timePos attributes
    positions: positions
  };
}

function pitchZoomIn(pitchPoint) {
  return {
    type: PITCH_ZOOM_IN,
    // The point that was clicked on. This point stays fixed
    // when we zoom in
    pitchPoint: pitchPoint
  };
}

function pitchZoomOut(pitchPoint) {
  return {
    type: PITCH_ZOOM_OUT,
    // The point that was clicked on. This point stays fixed
    // when we zoom out
    pitchPoint: pitchPoint
  };
}

function timeZoomIn(timePoint) {
  return {
    type: TIME_ZOOM_IN,
    // The point that was clicked on. This point stays fixed
    // when we zoom in
    timePoint: timePoint
  };
}

function timeZoomOut(timePoint) {
  return {
    type: TIME_ZOOM_OUT,
    // The point that was clicked on. This point stays fixed
    // when we zoom out
    timePoint: timePoint
  };
}