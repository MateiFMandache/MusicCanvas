class Tools extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <table>
        <tr>
          <td
            onClick={() => this.props.selectTool(tools.MOVE)}
            className={(this.props.selected == tools.MOVE)
              ? "selected" : ""}
          >Move</td>
          <td
            onClick={() => this.props.selectTool(tools.NEW_NOTE)}
            className={(this.props.selected == tools.NEW_NOTE)
              ? "selected" : ""}
          >New note</td>
          <td
            onClick={() => this.props.selectTool(tools.SELECT_NOTES)}
            className={(this.props.selected == tools.SELECT_NOTES)
              ? "selected" : ""}
          >Select notes</td>
        </tr>
        <tr>
          <td
            onClick={() => this.props.selectTool(tools.SELECT_TIME)}
            className={(this.props.selected == tools.SELECT_TIME)
              ? "selected" : ""}
          >Select time</td>
          <td
            onClick={() => this.props.selectTool(tools.VOICES)}
            className={(this.props.selected == tools.VOICES)
              ? "selected" : ""}
          >Voices</td>
          <td
            onClick={() => this.props.selectTool(tools.SECTIONS)}
            className={(this.props.selected == tools.SECTIONS)
              ? "selected" : ""}
          >Sections</td>
        </tr>
        <tr>
          <td
            onClick={() => this.props.selectTool(tools.SPEED)}
            className={(this.props.selected == tools.SPEED)
              ? "selected" : ""}
          >Speed</td>
          <td
            onClick={() => this.props.selectTool(tools.DYNAMICS)}
            className={(this.props.selected == tools.DYNAMICS)
              ? "selected" : ""}
          >Dynamics</td>
          <td
            onClick={() => this.props.selectTool(tools.MIXING)}
            className={(this.props.selected == tools.MIXING)
              ? "selected" : ""}
          >Mixing</td>
        </tr>
      </table>
    )
  }
}

let ToolsConnected;

(function() {
  const state2props = state => ({
    selected: state.view.tool
  })
  const dispatch2props = dispatch => ({
    selectTool: tool => {dispatch(selectTool(tool))}
  })
  ToolsConnected = connect(state2props, dispatch2props)(Tools);
})();

class ToolsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ToolsConnected />
      </Provider>
    )
  }
}

ReactDOM.render(<ToolsWrapper />, document.getElementById("tools"))
