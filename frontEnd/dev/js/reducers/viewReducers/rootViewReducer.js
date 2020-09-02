const rootViewReducer = Redux.combineReducers({
  window: windowReducer,
  tool: toolReducer,
  viewportSize: viewportSizeReducer,
  sections: sectionsReducer
})
