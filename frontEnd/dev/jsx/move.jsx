class MovePanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <span style={{margin: "2px", padding: "0 8px"}}
          className={
            (this.props.moveType == moveTypes.MOVE) ? "selected" : "clickable"
          } onClick={
            () => {this.props.newMoveType(moveTypes.MOVE)}
          }>Move</span>
        </div>
        <div>Pitch zoom
          <span style={{margin: "2px", padding: "0 8px"}}
          className={
            (this.props.moveType == moveTypes.PITCH_PLUS) ? "selected" : "clickable"
          } onClick={
            () => {this.props.newMoveType(moveTypes.PITCH_PLUS)}
          }>+</span>
          <span style={{margin: "2px", padding: "0 8px"}}
          className={
            (this.props.moveType == moveTypes.PITCH_MINUS) ? "selected" : "clickable"
          } onClick={
            () => {this.props.newMoveType(moveTypes.PITCH_MINUS)}
          }>-</span>
        </div>
        <div>Time zoom
          <span style={{margin: "2px", padding: "0 8px"}}
          className={
            (this.props.moveType == moveTypes.TIME_PLUS) ? "selected" : "clickable"
          } onClick={
            () => {this.props.newMoveType(moveTypes.TIME_PLUS)}
          }>+</span>
          <span style={{margin: "2px", padding: "0 8px"}}
          className={
            (this.props.moveType == moveTypes.TIME_MINUS) ? "selected" : "clickable"
          } onClick={
            () => {this.props.newMoveType(moveTypes.TIME_MINUS)}
          }>-</span>
        </div>
      </div>
    )
  }
}

let MovePanelConnected;

(function() {
  const state2props = state => ({
    moveType: state.view.move
  });
  const dispatch2props = dispatch => ({
    newMoveType: moveType => {dispatch(newMoveType(moveType))}
  });
  MovePanelConnected = connect(state2props, dispatch2props)(MovePanel);
})();
