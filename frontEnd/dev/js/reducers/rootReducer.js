const rootReducer = Redux.combineReducers({
  title: titleReducer,
  view: rootViewReducer
})

const store = Redux.createStore(rootReducer);
