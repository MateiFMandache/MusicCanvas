"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_React$Component) {
  _inherits(Window, _React$Component);

  function Window(props) {
    _classCallCheck(this, Window);

    return _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, props));
  }

  _createClass(Window, [{
    key: "render",
    value: function render() {
      var innerElement = void 0;
      switch (this.props.windowState) {
        case windowStates.TITLE:
          innerElement = React.createElement(TitleWindowConnected, null);
          break;
        case windowStates.NONE:
          return React.createElement("div", null);
      }
      return React.createElement("div", { className: "windowContainer" }, React.createElement("div", { className: "window" }, React.createElement("div", { className: "exit", onClick: this.props.exit }, React.createElement("i", { className: "fa fa-times" })), innerElement));
    }
  }]);

  return Window;
}(React.Component);

var WindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      windowState: state.view.window.windowState
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      exit: function exit() {
        dispatch(closeWindow());
      }
    };
  };
  WindowConnected = connect(state2props, dispatch2props)(Window);
})();

var WindowWrapper = function (_React$Component2) {
  _inherits(WindowWrapper, _React$Component2);

  function WindowWrapper(props) {
    _classCallCheck(this, WindowWrapper);

    return _possibleConstructorReturn(this, (WindowWrapper.__proto__ || Object.getPrototypeOf(WindowWrapper)).call(this, props));
  }

  _createClass(WindowWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(WindowConnected, null));
    }
  }]);

  return WindowWrapper;
}(React.Component);

ReactDOM.render(React.createElement(WindowWrapper, null), document.getElementById("window"));