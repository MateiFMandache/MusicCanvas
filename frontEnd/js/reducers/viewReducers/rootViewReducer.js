"use strict";

var rootViewReducer = Redux.combineReducers({
  window: windowReducer,
  tool: toolReducer,
  viewportSize: viewportSizeReducer
});