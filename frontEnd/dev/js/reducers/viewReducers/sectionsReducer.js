let sectionsReducer;

(function() {
  const defaultState = {
    byId: {
      "section1": {
        name: "Section 1",
        scaleType: scaleTypes.majorPentatonic,
        tonic: scaleTonics.C,
        scale: standardScale(scaleTonics.C, scaleTypes.majorPentatonic)
      }
    },
    all: ["section1"],
    current: "section1"
  };

  sectionsReducer = (state=defaultState, action) => {
    switch (action.type) {
      case NEW_SCALE_TYPE:
        return Object.assign({}, state, {byId:
          Object.assign({}, state.byId, {[state.current]:
            Object.assign({}, state.byId[state.current], {
              scaleType: action.scaleType,
              scale: standardScale(state.byId[state.current].tonic,
                action.scaleType)
            })})});
      case NEW_TONIC:
        return Object.assign({}, state, {byId:
          Object.assign({}, state.byId, {[state.current]:
            Object.assign({}, state.byId[state.current], {
              tonic: action.tonic,
              scale: standardScale(action.tonic,
                state.byId[state.current].scaleType)
            })})});
      default:
        return state;
    }
  }
})();
