"use strict";

var rootViewReducer = Redux.combineReducers({
  window: windowReducer,
  tool: toolReducer,
  sections: sectionsReducer,
  canvas: canvasReducer,
  move: moveReducer
});