"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MARGIN_WIDTH = 30;
var TABLE_WIGGLE_ROOM = 10;

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));
  }

  _createClass(Canvas, [{
    key: "render",
    value: function render() {
      return React.createElement("svg", { width: "100", height: "100" }, React.createElement("circle", { cx: "50", cy: "50", r: "40", stroke: "green", "stroke-width": "4", fill: "yellow" }));
    }
  }]);

  return Canvas;
}(React.Component);

var CanvasConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {};
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {};
  };
  CanvasConnected = connect(state2props, dispatch2props)(Canvas);
})();

var CanvasArea = function (_React$Component2) {
  _inherits(CanvasArea, _React$Component2);

  function CanvasArea(props) {
    _classCallCheck(this, CanvasArea);

    return _possibleConstructorReturn(this, (CanvasArea.__proto__ || Object.getPrototypeOf(CanvasArea)).call(this, props));
  }

  _createClass(CanvasArea, [{
    key: "render",
    value: function render() {
      return React.createElement("table", { style: {
          width: this.props.viewportSize.width - document.getElementById("canvas").getBoundingClientRect().left - TABLE_WIGGLE_ROOM,
          height: this.props.viewportSize.height - document.getElementById("canvas").getBoundingClientRect().top - TABLE_WIGGLE_ROOM
        } }, React.createElement("tr", { style: { height: MARGIN_WIDTH } }, React.createElement("td", { style: { width: MARGIN_WIDTH } }), React.createElement("td", null)), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, React.createElement(CanvasConnected, null))));
    }
  }]);

  return CanvasArea;
}(React.Component);

var CanvasAreaConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      viewportSize: state.view.viewportSize
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {};
  };
  CanvasAreaConnected = connect(state2props, dispatch2props)(CanvasArea);
})();

var CanvasAreaWrapper = function (_React$Component3) {
  _inherits(CanvasAreaWrapper, _React$Component3);

  function CanvasAreaWrapper(props) {
    _classCallCheck(this, CanvasAreaWrapper);

    return _possibleConstructorReturn(this, (CanvasAreaWrapper.__proto__ || Object.getPrototypeOf(CanvasAreaWrapper)).call(this, props));
  }

  _createClass(CanvasAreaWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(CanvasAreaConnected, null));
    }
  }]);

  return CanvasAreaWrapper;
}(React.Component);

ReactDOM.render(React.createElement(CanvasAreaWrapper, null), document.getElementById("canvas"));