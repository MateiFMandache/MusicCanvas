const MARGIN_WIDTH = 30;
const TABLE_WIGGLE_ROOM = 10;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
      </svg>
    );
  }
}

let CanvasConnected;

(function() {
  const state2props = state => ({

  })
  const dispatch2props = dispatch => ({

  })
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

class CanvasArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table style={{
        width: this.props.viewportSize.width
          -document.getElementById("canvas").getBoundingClientRect().left
          -TABLE_WIGGLE_ROOM,
        height: this.props.viewportSize.height
          -document.getElementById("canvas").getBoundingClientRect().top
          -TABLE_WIGGLE_ROOM
      }}>
        <tr style={{height: MARGIN_WIDTH}}>
          <td style={{width: MARGIN_WIDTH}}></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><CanvasConnected /></td>
        </tr>
      </table>
    )
  }
}

let CanvasAreaConnected;

(function() {
  const state2props = state => ({
    viewportSize: state.view.viewportSize
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
