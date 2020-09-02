"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlPanel = function (_React$Component) {
  _inherits(ControlPanel, _React$Component);

  function ControlPanel(props) {
    _classCallCheck(this, ControlPanel);

    return _possibleConstructorReturn(this, (ControlPanel.__proto__ || Object.getPrototypeOf(ControlPanel)).call(this, props));
  }

  _createClass(ControlPanel, [{
    key: "render",
    value: function render() {
      switch (this.props.tool) {
        case tools.SECTIONS:
          return React.createElement(SectionsPanelConnected, null);
        default:
          return null;
      }
    }
  }]);

  return ControlPanel;
}(React.Component);

var ControlPanelConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      tool: state.view.tool
    };
  };
  ControlPanelConnected = connect(state2props, null)(ControlPanel);
})();

var ControlPanelWrapper = function (_React$Component2) {
  _inherits(ControlPanelWrapper, _React$Component2);

  function ControlPanelWrapper(props) {
    _classCallCheck(this, ControlPanelWrapper);

    return _possibleConstructorReturn(this, (ControlPanelWrapper.__proto__ || Object.getPrototypeOf(ControlPanelWrapper)).call(this, props));
  }

  _createClass(ControlPanelWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(ControlPanelConnected, null));
    }
  }]);

  return ControlPanelWrapper;
}(React.Component);

ReactDOM.render(React.createElement(ControlPanelWrapper, null), document.getElementById("control-panel"));