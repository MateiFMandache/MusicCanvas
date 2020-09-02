"use strict";

var NEW_TITLE = "NEW_TITLE";
var TITLE_CLICK = "TITLE_CLICK";
var CLOSE_WINDOW = "CLOSE_WINDOW";
var SELECT_TOOL = "SELECT_TOOL";
var WINDOW_RESIZE = "WINDOW_RESIZE";
var NEW_TONIC = "NEW_TONIC";
var NEW_SCALE_TYPE = "NEW_SCALE_TYPE";
var CHOOSE_SCALE = "CHOOSE_SCALE";
var CHOOSE_TIMING = "CHOOSE_TIMING";
var CHOOSE_SECTION = "CHOOSE_SECTION";
var MAKE_NEW_SECTION = "MAKE_NEW_SECTION";

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

function windowResize() {
  return {
    type: WINDOW_RESIZE,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
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