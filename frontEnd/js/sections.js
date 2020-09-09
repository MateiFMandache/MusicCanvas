"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionsPanel = function (_React$Component) {
  _inherits(SectionsPanel, _React$Component);

  function SectionsPanel(props) {
    _classCallCheck(this, SectionsPanel);

    return _possibleConstructorReturn(this, (SectionsPanel.__proto__ || Object.getPrototypeOf(SectionsPanel)).call(this, props));
  }

  _createClass(SectionsPanel, [{
    key: "render",
    value: function render() {
      return React.createElement("table", null, React.createElement("tr", null, React.createElement("td", { className: "clickable",
        style: { textAlign: "center" },
        onClick: this.props.chooseSection }, this.props.currentSection.name), React.createElement("td", { className: "clickable",
        style: { textAlign: "center" },
        onClick: this.props.newSection }, "New section...")), React.createElement("tr", null, React.createElement("td", { style: { textAlign: "right" } }, "Scale:"), React.createElement("td", { className: "clickable",
        onClick: this.props.chooseScale }, this.props.currentSection.tonic.name + " " + this.props.currentSection.scaleType.name)), React.createElement("tr", null, React.createElement("td", { style: { textAlign: "right" } }, "Timing:"), React.createElement("td", { className: "clickable",
        onClick: this.props.chooseTiming }, (this.props.currentSection.bars + " bars of\n              " + this.props.currentSection.beatsPerBar + " beats").replace(/\s{2,}/, " ")
      /* get rid of excess whitespace */
      )));
    }
  }]);

  return SectionsPanel;
}(React.Component);

var SectionsPanelConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      currentSection: state.view.sections.byId[state.view.sections.current]
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      chooseScale: function (_chooseScale) {
        function chooseScale() {
          return _chooseScale.apply(this, arguments);
        }

        chooseScale.toString = function () {
          return _chooseScale.toString();
        };

        return chooseScale;
      }(function () {
        dispatch(chooseScale());
      }),
      chooseTiming: function (_chooseTiming) {
        function chooseTiming() {
          return _chooseTiming.apply(this, arguments);
        }

        chooseTiming.toString = function () {
          return _chooseTiming.toString();
        };

        return chooseTiming;
      }(function () {
        dispatch(chooseTiming());
      }),
      chooseSection: function (_chooseSection) {
        function chooseSection() {
          return _chooseSection.apply(this, arguments);
        }

        chooseSection.toString = function () {
          return _chooseSection.toString();
        };

        return chooseSection;
      }(function () {
        dispatch(chooseSection());
      }),
      newSection: function newSection() {
        dispatch(makeNewSection());
      }
    };
  };
  SectionsPanelConnected = connect(state2props, dispatch2props)(SectionsPanel);
})();

var SelectScaleWindow = function (_React$Component2) {
  _inherits(SelectScaleWindow, _React$Component2);

  function SelectScaleWindow(props) {
    _classCallCheck(this, SelectScaleWindow);

    return _possibleConstructorReturn(this, (SelectScaleWindow.__proto__ || Object.getPrototypeOf(SelectScaleWindow)).call(this, props));
  }

  _createClass(SelectScaleWindow, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("table", { className: "in-border" }, React.createElement("tr", null, React.createElement("td", null, "Tonic"), React.createElement("td", null, "Scale type")), React.createElement("tr", null, React.createElement("td", null, React.createElement("div", { className: "menu" }, allScaleTonics.map(function (tonic, index) {
        return React.createElement("p", { key: index,
          className: tonic == _this3.props.tonic ? "selected" : "clickable",
          onClick: function onClick() {
            return _this3.props.newTonic(tonic);
          } }, tonic.name);
      }))), React.createElement("td", null, React.createElement("div", { className: "menu" }, allScaleTypes.map(function (scaleType, index) {
        return React.createElement("p", { key: index,
          className: scaleType == _this3.props.scaleType ? "selected" : "clickable",
          onClick: function onClick() {
            return _this3.props.newScaleType(scaleType);
          } }, scaleType.name);
      })))));
    }
  }]);

  return SelectScaleWindow;
}(React.Component);

var SelectScaleWindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      tonic: state.view.sections.byId[state.view.sections.current].tonic,
      scaleType: state.view.sections.byId[state.view.sections.current].scaleType
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      newTonic: function (_newTonic) {
        function newTonic(_x) {
          return _newTonic.apply(this, arguments);
        }

        newTonic.toString = function () {
          return _newTonic.toString();
        };

        return newTonic;
      }(function (tonic) {
        dispatch(newTonic(tonic));
      }),
      newScaleType: function (_newScaleType) {
        function newScaleType(_x2) {
          return _newScaleType.apply(this, arguments);
        }

        newScaleType.toString = function () {
          return _newScaleType.toString();
        };

        return newScaleType;
      }(function (scaleType) {
        dispatch(newScaleType(scaleType));
      })
    };
  };
  SelectScaleWindowConnected = connect(state2props, dispatch2props)(SelectScaleWindow);
})();

var SelectTimingWindow = function (_React$Component3) {
  _inherits(SelectTimingWindow, _React$Component3);

  function SelectTimingWindow(props) {
    _classCallCheck(this, SelectTimingWindow);

    var _this4 = _possibleConstructorReturn(this, (SelectTimingWindow.__proto__ || Object.getPrototypeOf(SelectTimingWindow)).call(this, props));

    _this4.barNumberChange = _this4.barNumberChange.bind(_this4);
    _this4.beatsPerBarChange = _this4.beatsPerBarChange.bind(_this4);
    _this4.subdivisionsChange = _this4.subdivisionsChange.bind(_this4);
    _this4.state = {
      // flags showing whether each entry is blank
      barsBlank: false,
      beatsPerBarBlank: false,
      subdivisionsBlank: false
    };
    return _this4;
  }

  _createClass(SelectTimingWindow, [{
    key: "barNumberChange",
    value: function barNumberChange(event) {
      var newValue = event.target.value;
      if (newValue == "") {
        this.setState({ barsBlank: true });
      } else {
        var number = Number(newValue);
        if (isNaN(number)) {
          alert("Entry must be a number");
        } else if (number > 300 || number < 1 || !Number.isInteger(number)) {
          alert("Number of bars must be a whole number between 1 and 300");
        } else {
          this.setState({ barsBlank: false });
          this.props.newNumberOfBars(number);
        }
      }
    }
  }, {
    key: "beatsPerBarChange",
    value: function beatsPerBarChange(event) {
      var newValue = event.target.value;
      if (newValue == "") {
        this.setState({ beatsPerBarBlank: true });
      } else {
        var number = Number(newValue);
        if (isNaN(number)) {
          alert("Entry must be a number");
        } else if (number > 12 || number < 1 || !Number.isInteger(number)) {
          alert("Number of beats per bar must be a whole number between 1 and 12");
        } else {
          this.setState({ beatsPerBarBlank: false });
          this.props.newBeatsPerBar(number);
        }
      }
    }
  }, {
    key: "subdivisionsChange",
    value: function subdivisionsChange(event) {
      var newValue = event.target.value;
      if (newValue == "") {
        this.setState({ subdivisionsBlank: true });
      } else {
        var number = Number(newValue);
        if (isNaN(number)) {
          alert("Entry must be a number");
        } else if (number > 8 || number < 1 || !Number.isInteger(number)) {
          alert("Number of subdivisions must be a whole number between 1 and 8");
        } else {
          this.setState({ subdivisionsBlank: false });
          this.props.newSubdivisionsPerBeat(number);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("table", null, React.createElement("tr", null, React.createElement("td", { style: { textAlign: "right" } }, React.createElement("label", { "for": "number-bars-entry" }, "Number of bars:")), React.createElement("td", null, React.createElement("input", {
        type: "text",
        className: "text-entry",
        id: "number-bars-entry",
        style: { marginRight: 30, width: 100 },
        value: this.state.barsBlank ? "" : this.props.bars,
        onChange: this.barNumberChange }))), React.createElement("tr", null, React.createElement("td", { style: { textAlign: "right" } }, React.createElement("label", { "for": "beats-per-bar-entry" }, "Beats per bar:")), React.createElement("td", null, React.createElement("input", {
        type: "text",
        className: "text-entry",
        id: "beats-per-bar-entry",
        style: { marginRight: 30, width: 100 },
        value: this.state.beatsPerBarBlank ? "" : this.props.beatsPerBar,
        onChange: this.beatsPerBarChange }))), React.createElement("tr", null, React.createElement("td", { style: { textAlign: "right" } }, React.createElement("label", { "for": "subdivisions-per-beat-entry" }, "Subdivisions per beat:")), React.createElement("td", null, React.createElement("input", {
        type: "text",
        className: "text-entry",
        id: "subdivisions-per-beat-entry",
        style: { marginRight: 30, width: 100 },
        value: this.state.subdivisionsBlank ? "" : this.props.subdivisionsPerBeat,
        onChange: this.subdivisionsChange }))));
    }
  }]);

  return SelectTimingWindow;
}(React.Component);

var SelectTimingWindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      bars: state.view.sections.byId[state.view.sections.current].bars,
      beatsPerBar: state.view.sections.byId[state.view.sections.current].beatsPerBar,
      subdivisionsPerBeat: state.view.sections.byId[state.view.sections.current].subdivisionsPerBeat
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      newNumberOfBars: function (_newNumberOfBars) {
        function newNumberOfBars(_x3) {
          return _newNumberOfBars.apply(this, arguments);
        }

        newNumberOfBars.toString = function () {
          return _newNumberOfBars.toString();
        };

        return newNumberOfBars;
      }(function (bars) {
        dispatch(newNumberOfBars(bars));
      }),
      newBeatsPerBar: function (_newBeatsPerBar) {
        function newBeatsPerBar(_x4) {
          return _newBeatsPerBar.apply(this, arguments);
        }

        newBeatsPerBar.toString = function () {
          return _newBeatsPerBar.toString();
        };

        return newBeatsPerBar;
      }(function (beatsPerBar) {
        dispatch(newBeatsPerBar(beatsPerBar));
      }),
      newSubdivisionsPerBeat: function (_newSubdivisionsPerBeat) {
        function newSubdivisionsPerBeat(_x5) {
          return _newSubdivisionsPerBeat.apply(this, arguments);
        }

        newSubdivisionsPerBeat.toString = function () {
          return _newSubdivisionsPerBeat.toString();
        };

        return newSubdivisionsPerBeat;
      }(function (subdivisions) {
        dispatch(newSubdivisionsPerBeat(subdivisions));
      })
    };
  };
  SelectTimingWindowConnected = connect(state2props, dispatch2props)(SelectTimingWindow);
})();

var SelectSectionWindow = function (_React$Component4) {
  _inherits(SelectSectionWindow, _React$Component4);

  function SelectSectionWindow(props) {
    _classCallCheck(this, SelectSectionWindow);

    return _possibleConstructorReturn(this, (SelectSectionWindow.__proto__ || Object.getPrototypeOf(SelectSectionWindow)).call(this, props));
  }

  _createClass(SelectSectionWindow, [{
    key: "render",
    value: function render() {
      return React.createElement("p", null, "Tba");
    }
  }]);

  return SelectSectionWindow;
}(React.Component);

var SelectSectionWindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      allSections: state.view.sections.all.map(function (id) {
        return {
          id: id,
          name: state.view.sections.byId[id].name
        };
      })
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {};
  };
  SelectSectionWindowConnected = connect(state2props, dispatch2props)(SelectSectionWindow);
})();

var NewSectionWindow = function (_React$Component5) {
  _inherits(NewSectionWindow, _React$Component5);

  function NewSectionWindow(props) {
    _classCallCheck(this, NewSectionWindow);

    return _possibleConstructorReturn(this, (NewSectionWindow.__proto__ || Object.getPrototypeOf(NewSectionWindow)).call(this, props));
  }

  _createClass(NewSectionWindow, [{
    key: "render",
    value: function render() {
      return React.createElement("p", null, "TBa");
    }
  }]);

  return NewSectionWindow;
}(React.Component);

var NewSectionWindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {};
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {};
  };
  NewSectionWindowConnected = connect(state2props, dispatch2props)(NewSectionWindow);
})();