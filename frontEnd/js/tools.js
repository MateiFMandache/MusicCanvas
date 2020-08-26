"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tools = function (_React$Component) {
  _inherits(Tools, _React$Component);

  function Tools(props) {
    _classCallCheck(this, Tools);

    return _possibleConstructorReturn(this, (Tools.__proto__ || Object.getPrototypeOf(Tools)).call(this, props));
  }

  _createClass(Tools, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("table", null, React.createElement("tr", null, React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.MOVE);
        },
        className: this.props.selected == tools.MOVE ? "selected" : ""
      }, "Move"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.NEW_NOTE);
        },
        className: this.props.selected == tools.NEW_NOTE ? "selected" : ""
      }, "New note"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.SELECT_NOTES);
        },
        className: this.props.selected == tools.SELECT_NOTES ? "selected" : ""
      }, "Select notes")), React.createElement("tr", null, React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.SELECT_TIME);
        },
        className: this.props.selected == tools.SELECT_TIME ? "selected" : ""
      }, "Select time"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.VOICES);
        },
        className: this.props.selected == tools.VOICES ? "selected" : ""
      }, "Voices"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.SECTIONS);
        },
        className: this.props.selected == tools.SECTIONS ? "selected" : ""
      }, "Sections")), React.createElement("tr", null, React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.SPEED);
        },
        className: this.props.selected == tools.SPEED ? "selected" : ""
      }, "Speed"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.DYNAMICS);
        },
        className: this.props.selected == tools.DYNAMICS ? "selected" : ""
      }, "Dynamics"), React.createElement("td", {
        onClick: function onClick() {
          return _this2.props.selectTool(tools.MIXING);
        },
        className: this.props.selected == tools.MIXING ? "selected" : ""
      }, "Mixing")));
    }
  }]);

  return Tools;
}(React.Component);

var ToolsConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      selected: state.view.tool
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      selectTool: function (_selectTool) {
        function selectTool(_x) {
          return _selectTool.apply(this, arguments);
        }

        selectTool.toString = function () {
          return _selectTool.toString();
        };

        return selectTool;
      }(function (tool) {
        dispatch(selectTool(tool));
      })
    };
  };
  ToolsConnected = connect(state2props, dispatch2props)(Tools);
})();

var ToolsWrapper = function (_React$Component2) {
  _inherits(ToolsWrapper, _React$Component2);

  function ToolsWrapper(props) {
    _classCallCheck(this, ToolsWrapper);

    return _possibleConstructorReturn(this, (ToolsWrapper.__proto__ || Object.getPrototypeOf(ToolsWrapper)).call(this, props));
  }

  _createClass(ToolsWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(ToolsConnected, null));
    }
  }]);

  return ToolsWrapper;
}(React.Component);

ReactDOM.render(React.createElement(ToolsWrapper, null), document.getElementById("tools"));