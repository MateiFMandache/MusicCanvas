"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovePanel = function (_React$Component) {
  _inherits(MovePanel, _React$Component);

  function MovePanel(props) {
    _classCallCheck(this, MovePanel);

    return _possibleConstructorReturn(this, (MovePanel.__proto__ || Object.getPrototypeOf(MovePanel)).call(this, props));
  }

  _createClass(MovePanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", null, React.createElement("div", { style: { textAlign: "center" } }, React.createElement("span", { style: { margin: "2px", padding: "0 8px" },
        className: this.props.moveType == moveTypes.MOVE ? "selected" : "clickable", onClick: function onClick() {
          _this2.props.newMoveType(moveTypes.MOVE);
        } }, "Move")), React.createElement("div", null, "Pitch zoom", React.createElement("span", { style: { margin: "2px", padding: "0 8px" },
        className: this.props.moveType == moveTypes.PITCH_PLUS ? "selected" : "clickable", onClick: function onClick() {
          _this2.props.newMoveType(moveTypes.PITCH_PLUS);
        } }, "+"), React.createElement("span", { style: { margin: "2px", padding: "0 8px" },
        className: this.props.moveType == moveTypes.PITCH_MINUS ? "selected" : "clickable", onClick: function onClick() {
          _this2.props.newMoveType(moveTypes.PITCH_MINUS);
        } }, "-")), React.createElement("div", null, "Time zoom", React.createElement("span", { style: { margin: "2px", padding: "0 8px" },
        className: this.props.moveType == moveTypes.TIME_PLUS ? "selected" : "clickable", onClick: function onClick() {
          _this2.props.newMoveType(moveTypes.TIME_PLUS);
        } }, "+"), React.createElement("span", { style: { margin: "2px", padding: "0 8px" },
        className: this.props.moveType == moveTypes.TIME_MINUS ? "selected" : "clickable", onClick: function onClick() {
          _this2.props.newMoveType(moveTypes.TIME_MINUS);
        } }, "-")));
    }
  }]);

  return MovePanel;
}(React.Component);

var MovePanelConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      moveType: state.view.move
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      newMoveType: function (_newMoveType) {
        function newMoveType(_x) {
          return _newMoveType.apply(this, arguments);
        }

        newMoveType.toString = function () {
          return _newMoveType.toString();
        };

        return newMoveType;
      }(function (moveType) {
        dispatch(newMoveType(moveType));
      })
    };
  };
  MovePanelConnected = connect(state2props, dispatch2props)(MovePanel);
})();