class Tools extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "table",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.MOVE),
            className: this.props.selected == tools.MOVE ? "selected" : ""
          },
          "Move"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.NEW_NOTE),
            className: this.props.selected == tools.NEW_NOTE ? "selected" : ""
          },
          "New note"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.SELECT_NOTES),
            className: this.props.selected == tools.SELECT_NOTES ? "selected" : ""
          },
          "Select notes"
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.SELECT_TIME),
            className: this.props.selected == tools.SELECT_TIME ? "selected" : ""
          },
          "Select time"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.VOICES),
            className: this.props.selected == tools.VOICES ? "selected" : ""
          },
          "Voices"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.SECTIONS),
            className: this.props.selected == tools.SECTIONS ? "selected" : ""
          },
          "Sections"
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.SPEED),
            className: this.props.selected == tools.SPEED ? "selected" : ""
          },
          "Speed"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.DYNAMICS),
            className: this.props.selected == tools.DYNAMICS ? "selected" : ""
          },
          "Dynamics"
        ),
        React.createElement(
          "td",
          {
            onClick: () => this.props.selectTool(tools.MIXING),
            className: this.props.selected == tools.MIXING ? "selected" : ""
          },
          "Mixing"
        )
      )
    );
  }
}

let ToolsConnected;

(function () {
  const state2props = state => ({
    selected: state.view.tool
  });
  const dispatch2props = dispatch => ({
    selectTool: tool => {
      dispatch(selectTool(tool));
    }
  });
  ToolsConnected = connect(state2props, dispatch2props)(Tools);
})();

class ToolsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(ToolsConnected, null)
    );
  }
}

ReactDOM.render(React.createElement(ToolsWrapper, null), document.getElementById("tools"));