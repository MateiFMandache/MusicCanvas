const MARGIN_WIDTH = 45;
const TABLE_WIGGLE_ROOM = 10;

class PitchLines extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // arrays which hold the positions of pitch lines in the canvas's
    // y direction
    let linePositions = [];
    let tonicPositions = [];
    for(let octave = 0; octave <= OCTAVE_RANGE; octave++) {
      for(let i = 0; i < this.props.scale.length; i++) {
        let degree = this.props.scale[i];
        if(octave == OCTAVE_RANGE && degree.pitch > 0) break;
        if(degree.tonic) {
          tonicPositions.push((OCTAVE_RANGE - (octave + degree.pitch))
                              * STANDARD_OCTAVE_SIZE * this.props.zoom)
        } else {
          linePositions.push((OCTAVE_RANGE - (octave + degree.pitch))
                              * STANDARD_OCTAVE_SIZE * this.props.zoom)
        }
      }
    }
    return (
      <g>
        {linePositions.map((pos, index) => (
          <line key={index}
            x1={0 + CANVAS_MARGIN}
            x2={this.props.length + CANVAS_MARGIN}
            y1={pos + CANVAS_MARGIN}
            y2={pos + CANVAS_MARGIN}
            style={{stroke: "var(--main-grey)", strokeWidth: 1}}/>
        ), this)}
        {tonicPositions.map((pos, index) => (
          <line key={-1-index} // positive numbers already used up, so use
                               // negative numbers
            x1={0 + CANVAS_MARGIN}
            x2={this.props.length + CANVAS_MARGIN}
            y1={pos + CANVAS_MARGIN}
            y2={pos + CANVAS_MARGIN}
            style={{stroke: "var(--main-grey)", strokeWidth: 2}}/>
        ), this)}
      </g>
    )
  }
}

let PitchLinesConnected;

(function() {
  const state2props = state => ({
    scale: state.view.sections.byId[state.view.sections.current].scale
  })
  PitchLinesConnected = connect(state2props, null)(PitchLines);
})();

class TimeLines extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // Arrays which hold the positions of time divisions in the
    // canvas's x direction
    let barLinePositions = [];
    let linePositions = [];
    const beatSize = STANDARD_BEAT_SIZE * this.props.zoom;
    barLoop:
    for (let bar = 0; bar <= this.props.bars; bar++) {
      for (let beat = 0; beat < this.props.beatsPerBar; beat++) {
        for (let subbeat = 0; subbeat < this.props.subdivisionsPerBeat; subbeat++) {
          if (beat == 0 && subbeat == 0) {
            barLinePositions.push(bar
                                  * this.props.beatsPerBar
                                  * beatSize);
          } else {
            if (bar == this.props.bars) break barLoop;
            linePositions.push((bar * this.props.beatsPerBar
                                 + beat
                                 + subbeat / this.props.subdivisionsPerBeat
                               ) * beatSize);
          }
        }
      }
    }
    return (
      <g>
        {linePositions.map((pos, index) => (
          <line key={index}
            x1={pos + CANVAS_MARGIN}
            x2={pos + CANVAS_MARGIN}
            y1={0 + CANVAS_MARGIN}
            y2={this.props.length + CANVAS_MARGIN}
            style={{stroke: "var(--main-grey)", strokeWidth: 1}}/>
        ), this)}
        {barLinePositions.map((pos, index) => (
          <line key={-1-index} // positive numbers already used up, so use
                               // negative numbers
            x1={pos + CANVAS_MARGIN}
            x2={pos + CANVAS_MARGIN}
            y1={0 + CANVAS_MARGIN}
            y2={this.props.length + CANVAS_MARGIN}
            style={{stroke: "var(--main-grey)", strokeWidth: 2}}/>
        ), this)}
      </g>
    )
  }
}

let TimeLinesConnected;

(function() {
  const state2props = state => ({
    bars: state.view.sections.byId[state.view.sections.current].bars,
    beatsPerBar: state.view.sections.byId[state.view.sections.current].beatsPerBar,
    subdivisionsPerBeat:
      state.view.sections.byId[state.view.sections.current].subdivisionsPerBeat
  })
  TimeLinesConnected = connect(state2props, null)(TimeLines);
})();

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.grab = this.grab.bind(this);
  }
  grab(e) {
    const canvas = e.target;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPitchPos = this.props.pitchPos;
    const startTimePos = this.props.timePos;
    const docElem = document.documentElement;
    docElem.style.setProperty("cursor", "grabbing");
    canvas.style.setProperty("cursor", "grabbing");
    const release = () => {
      docElem.style.removeProperty("cursor");
      canvas.style.setProperty("cursor", "grab");
      docElem.removeEventListener("mouseup", release);
      docElem.removeEventListener("mousemove", move);
    }
    let move = event => {
      this.props.move({
        timePos: - (event.clientX - startX) + startTimePos,
        pitchPos: - (event.clientY - startY) + startPitchPos
      });
    }
    move = move.bind(this);
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
        moveStyle = {cursor: "grab"};
        clickCallback = this.grab;
        break;
      case moveTypes.PITCH_PLUS:
        moveStyle = {cursor: "zoom-in"};
        clickCallback = event => {this.props.pitchZoomIn(
          event.clientY - canvasDiv.getBoundingClientRect().top
        )};
        break;
      case moveTypes.PITCH_MINUS:
        moveStyle = {cursor: "zoom-out"};
        clickCallback = event => {this.props.pitchZoomOut(
          event.clientY - canvasDiv.getBoundingClientRect().top
        )};
        break;
      case moveTypes.TIME_PLUS:
        moveStyle = {cursor: "zoom-in"};
        clickCallback = event => {this.props.timeZoomIn(
          event.clientX - canvasDiv.getBoundingClientRect().left
        )};
        break;
      case moveTypes.TIME_MINUS:
        moveStyle = {cursor: "zoom-out"};
        clickCallback = event => {this.props.timeZoomOut(
          event.clientX - canvasDiv.getBoundingClientRect().left
        )};
        break;
    }
    return (
      <svg width={width + 2*CANVAS_MARGIN} height={height + 2*CANVAS_MARGIN}
        style={Object.assign({
          position: "absolute",
          top: - (CANVAS_MARGIN + this.props.pitchPos),
          left: - (CANVAS_MARGIN + this.props.timePos)
        }, moveStyle)}
        onMouseDown={clickCallback}>
        <PitchLinesConnected zoom={this.props.pitchZoom} length={width} />
        <TimeLinesConnected zoom={this.props.timeZoom} length={height} />
      </svg>
    );
  }
}

let CanvasConnected;

(function() {
  const state2props = state => ({
    pitchZoom: state.view.canvas.pitchZoom,
    timeZoom: state.view.canvas.timeZoom,
    pitchPos: state.view.canvas.pitchPos,
    timePos: state.view.canvas.timePos,
    beats: state.view.sections.byId[state.view.sections.current].beats,
    moveType: (state.view.tool == tools.MOVE) ? state.view.move : undefined
  })
  const dispatch2props = dispatch => ({
    move: positions => {dispatch(move(positions))},
    pitchZoomIn: pitchPoint => {dispatch(pitchZoomIn(pitchPoint))},
    pitchZoomOut: pitchPoint => {dispatch(pitchZoomOut(pitchPoint))},
    timeZoomIn: timePoint => {dispatch(timeZoomIn(timePoint))},
    timeZoomOut: timePoint => {dispatch(timeZoomOut(timePoint))}
  })
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

function recalculateCanvasSize() {
  store.dispatch(resizeCanvas(
    document.documentElement.clientWidth
      -document.getElementById("canvas").getBoundingClientRect().left
      -MARGIN_WIDTH
      -TABLE_WIGGLE_ROOM,
    document.documentElement.clientHeight
      -document.getElementById("canvas").getBoundingClientRect().top
      -MARGIN_WIDTH
      -TABLE_WIGGLE_ROOM
  ))
}

recalculateCanvasSize();

document.defaultView.addEventListener("resize", () => {
  recalculateCanvasSize();
});

class CanvasArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table>
        <tr style={{height: MARGIN_WIDTH}}>
          <td style={{width: MARGIN_WIDTH}}></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div id="canvas-containing-div"
            style={{
              position: "relative",
              width: this.props.width,
              height: this.props.height,
              overflow: "hidden"
            }}>
              <CanvasConnected />
            </div>
          </td>
        </tr>
      </table>
    )
  }
}

let CanvasAreaConnected;

(function() {
  const state2props = state => ({
    height: state.view.canvas.height,
    width: state.view.canvas.width
  })
  const dispatch2props = dispatch => ({

  })
  CanvasAreaConnected = connect(state2props, dispatch2props)(CanvasArea);
})();

class CanvasAreaWrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <CanvasAreaConnected />
      </Provider>
    )
  }
}

ReactDOM.render(<CanvasAreaWrapper />, document.getElementById("canvas"));
