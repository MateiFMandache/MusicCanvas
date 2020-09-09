class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch(this.props.tool) {
      case tools.MOVE:
        return <MovePanelConnected />
      case tools.SECTIONS:
        return <SectionsPanelConnected />;
      default:
        return null;
    }
  }
}

let ControlPanelConnected;

(function() {
  const state2props = state => ({
    tool: state.view.tool
  })
  ControlPanelConnected = connect(state2props, null)(ControlPanel);
})();

class ControlPanelWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ControlPanelConnected />
      </Provider>
    );
  }
}

ReactDOM.render(<ControlPanelWrapper />,
                document.getElementById("control-panel"));
