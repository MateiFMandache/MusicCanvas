class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.tool) {
      case tools.MOVE:
        return React.createElement(MovePanelConnected, null);
      case tools.SECTIONS:
        return React.createElement(SectionsPanelConnected, null);
      default:
        return null;
    }
  }
}

let ControlPanelConnected;

(function () {
  const state2props = state => ({
    tool: state.view.tool
  });
  ControlPanelConnected = connect(state2props, null)(ControlPanel);
})();

class ControlPanelWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(ControlPanelConnected, null)
    );
  }
}

ReactDOM.render(React.createElement(ControlPanelWrapper, null), document.getElementById("control-panel"));