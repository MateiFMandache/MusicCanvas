"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MARGIN_WIDTH = 45;
var TABLE_WIGGLE_ROOM = 10;

var PitchLines = function (_React$Component) {
  _inherits(PitchLines, _React$Component);

  function PitchLines(props) {
    _classCallCheck(this, PitchLines);

    return _possibleConstructorReturn(this, (PitchLines.__proto__ || Object.getPrototypeOf(PitchLines)).call(this, props));
  }

  _createClass(PitchLines, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      // arrays which hold the positions of pitch lines in the canvas's
      // y direction
      var linePositions = [];
      var tonicPositions = [];
      for (var octave = 0; octave <= OCTAVE_RANGE; octave++) {
        for (var i = 0; i < this.props.scale.length; i++) {
          var degree = this.props.scale[i];
          if (octave == OCTAVE_RANGE && degree.pitch > 0) break;
          if (degree.tonic) {
            tonicPositions.push((OCTAVE_RANGE - (octave + degree.pitch)) * STANDARD_OCTAVE_SIZE * this.props.zoom);
          } else {
            linePositions.push((OCTAVE_RANGE - (octave + degree.pitch)) * STANDARD_OCTAVE_SIZE * this.props.zoom);
          }
        }
      }
      return React.createElement("g", null, linePositions.map(function (pos, index) {
        return React.createElement("line", { key: index,
          x1: 0 + CANVAS_MARGIN,
          x2: _this2.props.length + CANVAS_MARGIN,
          y1: pos + CANVAS_MARGIN,
          y2: pos + CANVAS_MARGIN,
          style: { stroke: "var(--main-grey)", strokeWidth: 1 } });
      }, this), tonicPositions.map(function (pos, index) {
        return React.createElement("line", { key: -1 - index // positive numbers already used up, so use
          // negative numbers
          , x1: 0 + CANVAS_MARGIN,
          x2: _this2.props.length + CANVAS_MARGIN,
          y1: pos + CANVAS_MARGIN,
          y2: pos + CANVAS_MARGIN,
          style: { stroke: "var(--main-grey)", strokeWidth: 2 } });
      }, this));
    }
  }]);

  return PitchLines;
}(React.Component);

var PitchLinesConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      scale: state.view.sections.byId[state.view.sections.current].scale
    };
  };
  PitchLinesConnected = connect(state2props, null)(PitchLines);
})();

var TimeLines = function (_React$Component2) {
  _inherits(TimeLines, _React$Component2);

  function TimeLines(props) {
    _classCallCheck(this, TimeLines);

    return _possibleConstructorReturn(this, (TimeLines.__proto__ || Object.getPrototypeOf(TimeLines)).call(this, props));
  }

  _createClass(TimeLines, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      // Arrays which hold the positions of time divisions in the
      // canvas's x direction
      var barLinePositions = [];
      var linePositions = [];
      var beatSize = STANDARD_BEAT_SIZE * this.props.zoom;
      var barSize = beatSize * this.props.beatsPerBar;
      // We caculate the first and last bars in view so that we only have
      // to draw the bars in view. This gives us a big performance boost.
      var startBar = Math.max(0, Math.floor(this.props.viewTimeStart / barSize));
      var endBar = Math.min(this.props.bars, Math.ceil((this.props.viewTimeStart + this.props.viewWidth) / barSize));
      barLoop: for (var bar = startBar; bar <= endBar; bar++) {
        for (var beat = 0; beat < this.props.beatsPerBar; beat++) {
          for (var subbeat = 0; subbeat < this.props.subdivisionsPerBeat; subbeat++) {
            if (beat == 0 && subbeat == 0) {
              barLinePositions.push(bar * this.props.beatsPerBar * beatSize);
            } else {
              if (bar == endBar) break barLoop;
              linePositions.push((bar * this.props.beatsPerBar + beat + subbeat / this.props.subdivisionsPerBeat) * beatSize);
            }
          }
        }
      }
      return React.createElement("g", null, linePositions.map(function (pos, index) {
        return React.createElement("line", { key: index,
          x1: pos + CANVAS_MARGIN,
          x2: pos + CANVAS_MARGIN,
          y1: 0 + CANVAS_MARGIN,
          y2: _this4.props.length + CANVAS_MARGIN,
          style: { stroke: "var(--main-grey)", strokeWidth: 1 } });
      }, this), barLinePositions.map(function (pos, index) {
        return React.createElement("line", { key: -1 - index // positive numbers already used up, so use
          // negative numbers
          , x1: pos + CANVAS_MARGIN,
          x2: pos + CANVAS_MARGIN,
          y1: 0 + CANVAS_MARGIN,
          y2: _this4.props.length + CANVAS_MARGIN,
          style: { stroke: "var(--main-grey)", strokeWidth: 2 } });
      }, this));
    }
  }]);

  return TimeLines;
}(React.Component);

var TimeLinesConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      bars: state.view.sections.byId[state.view.sections.current].bars,
      beatsPerBar: state.view.sections.byId[state.view.sections.current].beatsPerBar,
      subdivisionsPerBeat: state.view.sections.byId[state.view.sections.current].subdivisionsPerBeat,
      viewWidth: state.view.canvas.width,
      viewTimeStart: state.view.canvas.timePos
    };
  };
  TimeLinesConnected = connect(state2props, null)(TimeLines);
})();

var Canvas = function (_React$Component3) {
  _inherits(Canvas, _React$Component3);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    var _this5 = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

    _this5.grab = _this5.grab.bind(_this5);
    _this5.state = { grabbing: false };
    return _this5;
  }

  _createClass(Canvas, [{
    key: "grab",
    value: function grab(e) {
      var _this6 = this;

      var canvas = e.target;
      var startX = e.clientX;
      var startY = e.clientY;
      var startPitchPos = this.props.pitchPos;
      var startTimePos = this.props.timePos;
      var docElem = document.documentElement;
      this.setState({ grabbing: true });
      docElem.style.setProperty("cursor", "grabbing");
      var _release = function release() {
        _this6.setState({ grabbing: false });
        docElem.style.removeProperty("cursor");
        docElem.removeEventListener("mouseup", _release);
        docElem.removeEventListener("mousemove", move);
      };
      var move = function move(event) {
        _this6.props.move({
          timePos: -(event.clientX - startX) + startTimePos,
          pitchPos: -(event.clientY - startY) + startPitchPos
        });
      };
      move = move.bind(this);
      _release = _release.bind(this);
      docElem.addEventListener("mouseup", _release);
      docElem.addEventListener("mousemove", move);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var width = this.props.beats * this.props.timeZoom * STANDARD_BEAT_SIZE;
      var height = OCTAVE_RANGE * this.props.pitchZoom * STANDARD_OCTAVE_SIZE;
      var moveStyle = void 0,
          clickCallback = void 0;
      var canvasDiv = document.getElementById("canvas-containing-div");
      switch (this.props.moveType) {
        case undefined:
          moveStyle = {};
          clickCallback = function clickCallback() {};
          break;
        case moveTypes.MOVE:
          moveStyle = { cursor: this.state.grabbing ? "grabbing" : "grab" };
          clickCallback = this.grab;
          break;
        case moveTypes.PITCH_PLUS:
          moveStyle = { cursor: "zoom-in" };
          clickCallback = function clickCallback(event) {
            _this7.props.pitchZoomIn(event.clientY - canvasDiv.getBoundingClientRect().top);
          };
          break;
        case moveTypes.PITCH_MINUS:
          moveStyle = { cursor: "zoom-out" };
          clickCallback = function clickCallback(event) {
            _this7.props.pitchZoomOut(event.clientY - canvasDiv.getBoundingClientRect().top);
          };
          break;
        case moveTypes.TIME_PLUS:
          moveStyle = { cursor: "zoom-in" };
          clickCallback = function clickCallback(event) {
            _this7.props.timeZoomIn(event.clientX - canvasDiv.getBoundingClientRect().left);
          };
          break;
        case moveTypes.TIME_MINUS:
          moveStyle = { cursor: "zoom-out" };
          clickCallback = function clickCallback(event) {
            _this7.props.timeZoomOut(event.clientX - canvasDiv.getBoundingClientRect().left);
          };
          break;
      }
      return React.createElement("svg", { width: width + 2 * CANVAS_MARGIN, height: height + 2 * CANVAS_MARGIN,
        style: Object.assign({
          position: "absolute",
          top: -(CANVAS_MARGIN + this.props.pitchPos),
          left: -(CANVAS_MARGIN + this.props.timePos)
        }, moveStyle),

        key: /* use unique key to fix display bug in chrome */
        this.props.pitchPos + " " + this.props.timePos,
        onMouseDown: clickCallback }, React.createElement(PitchLinesConnected, {
        zoom: this.props.pitchZoom,
        length: width,
        start: true }), React.createElement(TimeLinesConnected, {
        zoom: this.props.timeZoom,
        length: height }));
    }
  }]);

  return Canvas;
}(React.Component);

var CanvasConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      pitchZoom: state.view.canvas.pitchZoom,
      timeZoom: state.view.canvas.timeZoom,
      pitchPos: state.view.canvas.pitchPos,
      timePos: state.view.canvas.timePos,
      beats: state.view.sections.byId[state.view.sections.current].beats,
      moveType: state.view.tool == tools.MOVE ? state.view.move : undefined
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      move: function (_move) {
        function move(_x) {
          return _move.apply(this, arguments);
        }

        move.toString = function () {
          return _move.toString();
        };

        return move;
      }(function (positions) {
        dispatch(move(positions));
      }),
      pitchZoomIn: function (_pitchZoomIn) {
        function pitchZoomIn(_x2) {
          return _pitchZoomIn.apply(this, arguments);
        }

        pitchZoomIn.toString = function () {
          return _pitchZoomIn.toString();
        };

        return pitchZoomIn;
      }(function (pitchPoint) {
        dispatch(pitchZoomIn(pitchPoint));
      }),
      pitchZoomOut: function (_pitchZoomOut) {
        function pitchZoomOut(_x3) {
          return _pitchZoomOut.apply(this, arguments);
        }

        pitchZoomOut.toString = function () {
          return _pitchZoomOut.toString();
        };

        return pitchZoomOut;
      }(function (pitchPoint) {
        dispatch(pitchZoomOut(pitchPoint));
      }),
      timeZoomIn: function (_timeZoomIn) {
        function timeZoomIn(_x4) {
          return _timeZoomIn.apply(this, arguments);
        }

        timeZoomIn.toString = function () {
          return _timeZoomIn.toString();
        };

        return timeZoomIn;
      }(function (timePoint) {
        dispatch(timeZoomIn(timePoint));
      }),
      timeZoomOut: function (_timeZoomOut) {
        function timeZoomOut(_x5) {
          return _timeZoomOut.apply(this, arguments);
        }

        timeZoomOut.toString = function () {
          return _timeZoomOut.toString();
        };

        return timeZoomOut;
      }(function (timePoint) {
        dispatch(timeZoomOut(timePoint));
      })
    };
  };
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

function recalculateCanvasSize() {
  store.dispatch(resizeCanvas(document.documentElement.clientWidth - document.getElementById("canvas").getBoundingClientRect().left - MARGIN_WIDTH - TABLE_WIGGLE_ROOM, document.documentElement.clientHeight - document.getElementById("canvas").getBoundingClientRect().top - MARGIN_WIDTH - TABLE_WIGGLE_ROOM));
}

document.addEventListener("DOMContentLoaded", function () {
  recalculateCanvasSize();
});

document.defaultView.addEventListener("resize", function () {
  recalculateCanvasSize();
});

var CanvasArea = function (_React$Component4) {
  _inherits(CanvasArea, _React$Component4);

  function CanvasArea(props) {
    _classCallCheck(this, CanvasArea);

    return _possibleConstructorReturn(this, (CanvasArea.__proto__ || Object.getPrototypeOf(CanvasArea)).call(this, props));
  }

  _createClass(CanvasArea, [{
    key: "render",
    value: function render() {
      return React.createElement("table", null, React.createElement("tr", { style: { height: MARGIN_WIDTH } }, React.createElement("td", { style: { width: MARGIN_WIDTH } }), React.createElement("td", null)), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, React.createElement("div", { id: "canvas-containing-div",
        style: {
          position: "relative",
          width: this.props.width,
          height: this.props.height,
          overflow: "hidden"
        } }, React.createElement(CanvasConnected, null)))));
    }
  }]);

  return CanvasArea;
}(React.Component);

var CanvasAreaConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      height: state.view.canvas.height,
      width: state.view.canvas.width
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {};
  };
  CanvasAreaConnected = connect(state2props, dispatch2props)(CanvasArea);
})();

var CanvasAreaWrapper = function (_React$Component5) {
  _inherits(CanvasAreaWrapper, _React$Component5);

  function CanvasAreaWrapper(props) {
    _classCallCheck(this, CanvasAreaWrapper);

    return _possibleConstructorReturn(this, (CanvasAreaWrapper.__proto__ || Object.getPrototypeOf(CanvasAreaWrapper)).call(this, props));
  }

  _createClass(CanvasAreaWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(CanvasAreaConnected, null));
    }
  }]);

  return CanvasAreaWrapper;
}(React.Component);

ReactDOM.render(React.createElement(CanvasAreaWrapper, null), document.getElementById("canvas"));