const MARGIN_WIDTH = 30;
const TABLE_WIGGLE_ROOM = 10;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "svg",
      { width: "100", height: "100" },
      React.createElement("circle", { cx: "50", cy: "50", r: "40", stroke: "green", "stroke-width": "4", fill: "yellow" })
    );
  }
}

let CanvasConnected;

(function () {
  const state2props = state => ({});
  const dispatch2props = dispatch => ({});
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

class CanvasArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "table",
      { style: {
          width: this.props.viewportSize.width - document.getElementById("canvas").getBoundingClientRect().left - TABLE_WIGGLE_ROOM,
          height: this.props.viewportSize.height - document.getElementById("canvas").getBoundingClientRect().top - TABLE_WIGGLE_ROOM
        } },
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
          React.createElement(CanvasConnected, null)
        )
      )
    );
  }
}

let CanvasAreaConnected;

(function () {
  const state2props = state => ({
    viewportSize: state.view.viewportSize
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