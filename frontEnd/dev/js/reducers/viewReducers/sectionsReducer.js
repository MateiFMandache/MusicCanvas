let sectionsReducer;
let numberOfBeats;

(function() {
  const defaultState = {
    byId: {
      "section1": {
        name: "Section 1",
        scaleType: scaleTypes.majorPentatonic,
        tonic: scaleTonics.C,
        scale: standardScale(scaleTonics.C, scaleTypes.majorPentatonic),
        bars: 16,
        beatsPerBar: 4,
        beats: 64,
        subdivisionsPerBeat: 1
      }
    },
    all: ["section1"],
    current: "section1"
  };

  numberOfBeats = 64;

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
      case NEW_NUMBER_OF_BARS:
        numberOfBeats = action.bars * state.byId[state.current].beatsPerBar;
        return Object.assign({}, state, {byId:
          Object.assign({}, state.byId, {[state.current]:
            Object.assign({}, state.byId[state.current], {
              bars: action.bars,
              beats: numberOfBeats
            })})});
      case NEW_BEATS_PER_BAR:
        numberOfBeats = action.beatsPerBar * state.byId[state.current].bars;
        return Object.assign({}, state, {byId:
          Object.assign({}, state.byId, {[state.current]:
            Object.assign({}, state.byId[state.current], {
              beatsPerBar: action.beatsPerBar,
              beats: numberOfBeats
            })})});
      case NEW_SUBDIVISIONS_PER_BEAT:
        return Object.assign({}, state, {byId:
          Object.assign({}, state.byId, {[state.current]:
            Object.assign({}, state.byId[state.current], {
              subdivisionsPerBeat: action.subdivisions
            })})});
      default:
        return state;
    }
  }
})();
