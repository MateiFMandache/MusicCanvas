"use strict";

var NEW_TITLE = "NEW_TITLE";
var TITLE_CLICK = "TITLE_CLICK";
var CLOSE_WINDOW = "CLOSE_WINDOW";
var SELECT_TOOL = "SELECT_TOOL";
var WINDOW_RESIZE = "WINDOW_RESIZE";

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