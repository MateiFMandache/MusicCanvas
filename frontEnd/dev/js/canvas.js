const MARGIN_WIDTH = 45;
const TABLE_WIGGLE_ROOM = 10;

class PitchLines extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // arrays which hold the positions of pitch lines in the canvas's
    // y direction
    let linePositions = [];
    let tonicPositions = [];
    for (let octave = 0; octave <= OCTAVE_RANGE; octave++) {
      for (let i = 0; i < this.props.scale.length; i++) {
        let degree = this.props.scale[i];
        if (octave == OCTAVE_RANGE && degree.pitch > 0) break;
        if (degree.tonic) {
          tonicPositions.push((OCTAVE_RANGE - (octave + degree.pitch)) * STANDARD_OCTAVE_SIZE * this.props.zoom);
        } else {
          linePositions.push((OCTAVE_RANGE - (octave + degree.pitch)) * STANDARD_OCTAVE_SIZE * this.props.zoom);
        }
      }
    }
    return React.createElement(
      "g",
      null,
      linePositions.map((pos, index) => React.createElement("line", { key: index,
        x1: 0 + CANVAS_MARGIN,
        x2: this.props.length + CANVAS_MARGIN,
        y1: pos + CANVAS_MARGIN,
        y2: pos + CANVAS_MARGIN,
        style: { stroke: "var(--main-grey)", strokeWidth: 1 } }), this),
      tonicPositions.map((pos, index) => React.createElement("line", { key: -1 - index // positive numbers already used up, so use
        // negative numbers
        , x1: 0 + CANVAS_MARGIN,
        x2: this.props.length + CANVAS_MARGIN,
        y1: pos + CANVAS_MARGIN,
        y2: pos + CANVAS_MARGIN,
        style: { stroke: "var(--main-grey)", strokeWidth: 2 } }), this)
    );
  }
}

let PitchLinesConnected;

(function () {
  const state2props = state => ({
    scale: state.view.sections.byId[state.view.sections.current].scale
  });
  PitchLinesConnected = connect(state2props, null)(PitchLines);
})();

class TimeLines extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Arrays which hold the positions of time divisions in the
    // canvas's x direction
    let barLinePositions = [];
    let linePositions = [];
    const beatSize = STANDARD_BEAT_SIZE * this.props.zoom;
    const barSize = beatSize * this.props.beatsPerBar;
    // We caculate the first and last bars in view so that we only have
    // to draw the bars in view. This gives us a big performance boost.
    const startBar = Math.max(0, Math.floor(this.props.viewTimeStart / barSize));
    const endBar = Math.min(this.props.bars, Math.ceil((this.props.viewTimeStart + this.props.viewWidth) / barSize));
    barLoop: for (let bar = startBar; bar <= endBar; bar++) {
      for (let beat = 0; beat < this.props.beatsPerBar; beat++) {
        for (let subbeat = 0; subbeat < this.props.subdivisionsPerBeat; subbeat++) {
          if (beat == 0 && subbeat == 0) {
            barLinePositions.push(bar * this.props.beatsPerBar * beatSize);
          } else {
            if (bar == endBar) break barLoop;
            linePositions.push((bar * this.props.beatsPerBar + beat + subbeat / this.props.subdivisionsPerBeat) * beatSize);
          }
        }
      }
    }
    return React.createElement(
      "g",
      null,
      linePositions.map((pos, index) => React.createElement("line", { key: index,
        x1: pos + CANVAS_MARGIN,
        x2: pos + CANVAS_MARGIN,
        y1: 0 + CANVAS_MARGIN,
        y2: this.props.length + CANVAS_MARGIN,
        style: { stroke: "var(--main-grey)", strokeWidth: 1 } }), this),
      barLinePositions.map((pos, index) => React.createElement("line", { key: -1 - index // positive numbers already used up, so use
        // negative numbers
        , x1: pos + CANVAS_MARGIN,
        x2: pos + CANVAS_MARGIN,
        y1: 0 + CANVAS_MARGIN,
        y2: this.props.length + CANVAS_MARGIN,
        style: { stroke: "var(--main-grey)", strokeWidth: 2 } }), this)
    );
  }
}

let TimeLinesConnected;

(function () {
  const state2props = state => ({
    bars: state.view.sections.byId[state.view.sections.current].bars,
    beatsPerBar: state.view.sections.byId[state.view.sections.current].beatsPerBar,
    subdivisionsPerBeat: state.view.sections.byId[state.view.sections.current].subdivisionsPerBeat,
    viewWidth: state.view.canvas.width,
    viewTimeStart: state.view.canvas.timePos
  });
  TimeLinesConnected = connect(state2props, null)(TimeLines);
})();

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.grab = this.grab.bind(this);
    this.state = { grabbing: false };
  }
  grab(e) {
    const canvas = e.target;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPitchPos = this.props.pitchPos;
    const startTimePos = this.props.timePos;
    const docElem = document.documentElement;
    this.setState({ grabbing: true });
    docElem.style.setProperty("cursor", "grabbing");
    let release = () => {
      this.setState({ grabbing: false });
      docElem.style.removeProperty("cursor");
      docElem.removeEventListener("mouseup", release);
      docElem.removeEventListener("mousemove", move);
    };
    let move = event => {
      this.props.move({
        timePos: -(event.clientX - startX) + startTimePos,
        pitchPos: -(event.clientY - startY) + startPitchPos
      });
    };
    move = move.bind(this);
    release = release.bind(this);
    docElem.addEventListener("mouseup", release);
    docElem.addEventListener("mousemove", move);
  }
  render() {
    const width = this.props.beats * this.props.timeZoom * STANDARD_BEAT_SIZE;
    const height = OCTAVE_RANGE * this.props.pitchZoom * STANDARD_OCTAVE_SIZE;
    let moveStyle, clickCallback;
    const canvasDiv = document.getElementById("canvas-containing-div");
    switch (this.props.moveType) {
      case undefined:
        moveStyle = {};
        clickCallback = () => {};
        break;
      case moveTypes.MOVE:
        moveStyle = { cursor: this.state.grabbing ? "grabbing" : "grab" };
        clickCallback = this.grab;
        break;
      case moveTypes.PITCH_PLUS:
        moveStyle = { cursor: "zoom-in" };
        clickCallback = event => {
          this.props.pitchZoomIn(event.clientY - canvasDiv.getBoundingClientRect().top);
        };
        break;
      case moveTypes.PITCH_MINUS:
        moveStyle = { cursor: "zoom-out" };
        clickCallback = event => {
          this.props.pitchZoomOut(event.clientY - canvasDiv.getBoundingClientRect().top);
        };
        break;
      case moveTypes.TIME_PLUS:
        moveStyle = { cursor: "zoom-in" };
        clickCallback = event => {
          this.props.timeZoomIn(event.clientX - canvasDiv.getBoundingClientRect().left);
        };
        break;
      case moveTypes.TIME_MINUS:
        moveStyle = { cursor: "zoom-out" };
        clickCallback = event => {
          this.props.timeZoomOut(event.clientX - canvasDiv.getBoundingClientRect().left);
        };
        break;
    }
    return React.createElement(
      "svg",
      { width: width + 2 * CANVAS_MARGIN, height: height + 2 * CANVAS_MARGIN,
        style: Object.assign({
          position: "absolute",
          top: -(CANVAS_MARGIN + this.props.pitchPos),
          left: -(CANVAS_MARGIN + this.props.timePos)
        }, moveStyle),

        key: /* use unique key to fix display bug in chrome */
        `${this.props.pitchPos} ${this.props.timePos}`,
        onMouseDown: clickCallback },
      React.createElement(PitchLinesConnected, {
        zoom: this.props.pitchZoom,
        length: width,
        start: true }),
      React.createElement(TimeLinesConnected, {
        zoom: this.props.timeZoom,
        length: height })
    );
  }
}

let CanvasConnected;

(function () {
  const state2props = state => ({
    pitchZoom: state.view.canvas.pitchZoom,
    timeZoom: state.view.canvas.timeZoom,
    pitchPos: state.view.canvas.pitchPos,
    timePos: state.view.canvas.timePos,
    beats: state.view.sections.byId[state.view.sections.current].beats,
    moveType: state.view.tool == tools.MOVE ? state.view.move : undefined
  });
  const dispatch2props = dispatch => ({
    move: positions => {
      dispatch(move(positions));
    },
    pitchZoomIn: pitchPoint => {
      dispatch(pitchZoomIn(pitchPoint));
    },
    pitchZoomOut: pitchPoint => {
      dispatch(pitchZoomOut(pitchPoint));
    },
    timeZoomIn: timePoint => {
      dispatch(timeZoomIn(timePoint));
    },
    timeZoomOut: timePoint => {
      dispatch(timeZoomOut(timePoint));
    }
  });
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

function recalculateCanvasSize() {
  store.dispatch(resizeCanvas(document.documentElement.clientWidth - document.getElementById("canvas").getBoundingClientRect().left - MARGIN_WIDTH - TABLE_WIGGLE_ROOM, document.documentElement.clientHeight - document.getElementById("canvas").getBoundingClientRect().top - MARGIN_WIDTH - TABLE_WIGGLE_ROOM));
}

document.addEventListener("DOMContentLoaded", () => {
  recalculateCanvasSize();
});

document.defaultView.addEventListener("resize", () => {
  recalculateCanvasSize();
});

class CanvasArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "table",
      null,
      React.createElement(
        "tr",
        { style: { height: MARGIN_WIDTH } },
        React.createElement("td", { style: { width: MARGIN_WIDTH } }),
        React.createElement("td", null)
      ),
      React.createElement(
        "tr",
        null,
        React.createElement("td", null),
        React.createElement(
          "td",
          null,
          React.createElement(
            "div",
            { id: "canvas-containing-div",
              style: {
                position: "relative",
                width: this.props.width,
                height: this.props.height,
                overflow: "hidden"
              } },
            React.createElement(CanvasConnected, null)
          )
        )
      )
    );
  }
}

let CanvasAreaConnected;

(function () {
  const state2props = state => ({
    height: state.view.canvas.height,
    width: state.view.canvas.width
  });
  const dispatch2props = dispatch => ({});
  CanvasAreaConnected = connect(state2props, dispatch2props)(CanvasArea);
})();

class CanvasAreaWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(CanvasAreaConnected, null)
    );
  }
}

ReactDOM.render(React.createElement(CanvasAreaWrapper, null), document.getElementById("canvas"));