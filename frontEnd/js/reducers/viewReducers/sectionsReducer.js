"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sectionsReducer = void 0;

(function () {
  var defaultState = {
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

  sectionsReducer = function sectionsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case NEW_SCALE_TYPE:
        return Object.assign({}, state, { byId: Object.assign({}, state.byId, _defineProperty({}, state.current, Object.assign({}, state.byId[state.current], {
            scaleType: action.scaleType,
            scale: standardScale(state.byId[state.current].tonic, action.scaleType)
          }))) });
      case NEW_TONIC:
        return Object.assign({}, state, { byId: Object.assign({}, state.byId, _defineProperty({}, state.current, Object.assign({}, state.byId[state.current], {
            tonic: action.tonic,
            scale: standardScale(action.tonic, state.byId[state.current].scaleType)
          }))) });
      default:
        return state;
    }
  };
})();