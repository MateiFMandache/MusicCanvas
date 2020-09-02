class Window extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let innerElement;
    switch (this.props.windowState) {
      case windowStates.TITLE:
        innerElement = <TitleWindowConnected />
        break;
      case windowStates.SELECT_SCALE:
        innerElement = <SelectScaleWindowConnected />
        break;
      case windowStates.SELECT_TIMING:
        innerElement = <SelectTimingWindowConnected />
        break;
      case windowStates.SELECT_SECTION:
        innerElement = <SelectSectionWindowConnected />
        break;
      case windowStates.NEW_SECTION:
        innerElement = <NewSectionWindowConnected />
        break;
      case windowStates.NONE:
        return <div />
    }
    return (
      <div className="windowContainer">
        <div className="window">
          <div className="exit" onClick={this.props.exit}>
            <i className="fa fa-times"></i>
          </div>
          {innerElement}
        </div>
      </div>
    )
  }
}

let WindowConnected;

(function() {
  const state2props = state => ({
    windowState: state.view.window.windowState
  })
  const dispatch2props = dispatch => ({
    exit: () => {dispatch(closeWindow())}
  })
  WindowConnected = connect(state2props, dispatch2props)(Window);
})();

class WindowWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <WindowConnected />
      </Provider>
    )
  }
}

ReactDOM.render(<WindowWrapper />, document.getElementById("window"));
