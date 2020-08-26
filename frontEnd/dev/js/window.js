class Window extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let innerElement;
    switch (this.props.windowState) {
      case windowStates.TITLE:
        innerElement = React.createElement(TitleWindowConnected, null);
        break;
      case windowStates.NONE:
        return React.createElement("div", null);
    }
    return React.createElement(
      "div",
      { className: "windowContainer" },
      React.createElement(
        "div",
        { className: "window" },
        React.createElement(
          "div",
          { className: "exit", onClick: this.props.exit },
          React.createElement("i", { className: "fa fa-times" })
        ),
        innerElement
      )
    );
  }
}

let WindowConnected;

(function () {
  const state2props = state => ({
    windowState: state.view.window.windowState
  });
  const dispatch2props = dispatch => ({
    exit: () => {
      dispatch(closeWindow());
    }
  });
  WindowConnected = connect(state2props, dispatch2props)(Window);
})();

class WindowWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(WindowConnected, null)
    );
  }
}

ReactDOM.render(React.createElement(WindowWrapper, null), document.getElementById("window"));