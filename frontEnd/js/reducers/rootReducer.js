"use strict";

var rootReducer = Redux.combineReducers({
  title: titleReducer,
  view: rootViewReducer
});

var store = Redux.createStore(rootReducer);