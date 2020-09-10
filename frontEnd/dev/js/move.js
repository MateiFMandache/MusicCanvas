class MovePanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { style: { textAlign: "center" } },
        React.createElement(
          "span",
          { style: { margin: "2px", padding: "0 8px" },
            className: this.props.moveType == moveTypes.MOVE ? "selected" : "clickable", onClick: () => {
              this.props.newMoveType(moveTypes.MOVE);
            } },
          "Move"
        )
      ),
      React.createElement(
        "div",
        null,
        "Pitch zoom",
        React.createElement(
          "span",
          { style: { margin: "2px", padding: "0 8px" },
            className: this.props.moveType == moveTypes.PITCH_PLUS ? "selected" : "clickable", onClick: () => {
              this.props.newMoveType(moveTypes.PITCH_PLUS);
            } },
          "+"
        ),
        React.createElement(
          "span",
          { style: { margin: "2px", padding: "0 8px" },
            className: this.props.moveType == moveTypes.PITCH_MINUS ? "selected" : "clickable", onClick: () => {
              this.props.newMoveType(moveTypes.PITCH_MINUS);
            } },
          "-"
        )
      ),
      React.createElement(
        "div",
        null,
        "Time zoom",
        React.createElement(
          "span",
          { style: { margin: "2px", padding: "0 8px" },
            className: this.props.moveType == moveTypes.TIME_PLUS ? "selected" : "clickable", onClick: () => {
              this.props.newMoveType(moveTypes.TIME_PLUS);
            } },
          "+"
        ),
        React.createElement(
          "span",
          { style: { margin: "2px", padding: "0 8px" },
            className: this.props.moveType == moveTypes.TIME_MINUS ? "selected" : "clickable", onClick: () => {
              this.props.newMoveType(moveTypes.TIME_MINUS);
            } },
          "-"
        )
      )
    );
  }
}

let MovePanelConnected;

(function () {
  const state2props = state => ({
    moveType: state.view.move
  });
  const dispatch2props = dispatch => ({
    newMoveType: moveType => {
      dispatch(newMoveType(moveType));
    }
  });
  MovePanelConnected = connect(state2props, dispatch2props)(MovePanel);
})();