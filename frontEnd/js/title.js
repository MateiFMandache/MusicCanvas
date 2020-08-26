"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title(props) {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, props));
  }

  _createClass(Title, [{
    key: "render",
    value: function render() {
      return React.createElement("h1", { onClick: this.props.clicked }, this.props.title || "Untitled");
    }
  }]);

  return Title;
}(React.Component);

var TitleConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      title: state.title
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      clicked: function clicked() {
        dispatch(titleClick());
      }
    };
  };
  TitleConnected = connect(state2props, dispatch2props)(Title);
})();

var TitleWrapper = function (_React$Component2) {
  _inherits(TitleWrapper, _React$Component2);

  function TitleWrapper(props) {
    _classCallCheck(this, TitleWrapper);

    return _possibleConstructorReturn(this, (TitleWrapper.__proto__ || Object.getPrototypeOf(TitleWrapper)).call(this, props));
  }

  _createClass(TitleWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, { store: store }, React.createElement(TitleConnected, null));
    }
  }]);

  return TitleWrapper;
}(React.Component);

ReactDOM.render(React.createElement(TitleWrapper, null), document.getElementById("title"));

// Change title of window when title changes
store.subscribe(function () {
  var title = store.getState().title;
  document.title = title ? title + " - Music Canvas" : "Music Canvas";
});

// title change window

var TitleWindow = function (_React$Component3) {
  _inherits(TitleWindow, _React$Component3);

  function TitleWindow(props) {
    _classCallCheck(this, TitleWindow);

    var _this3 = _possibleConstructorReturn(this, (TitleWindow.__proto__ || Object.getPrototypeOf(TitleWindow)).call(this, props));

    _this3.handleChange = _this3.handleChange.bind(_this3);
    return _this3;
  }

  _createClass(TitleWindow, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.props.newTitle(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("label", { "for": "title-entry" }, React.createElement("p", null, "Enter new title below:"), React.createElement("input", {
        id: "title-entry",
        className: "text-entry",
        type: "text",
        value: this.props.title,
        onChange: this.handleChange }));
    }
  }]);

  return TitleWindow;
}(React.Component);

var TitleWindowConnected = void 0;

(function () {
  var state2props = function state2props(state) {
    return {
      title: state.title
    };
  };
  var dispatch2props = function dispatch2props(dispatch) {
    return {
      newTitle: function (_newTitle) {
        function newTitle(_x) {
          return _newTitle.apply(this, arguments);
        }

        newTitle.toString = function () {
          return _newTitle.toString();
        };

        return newTitle;
      }(function (title) {
        dispatch(newTitle(title));
      })
    };
  };
  TitleWindowConnected = connect(state2props, dispatch2props)(TitleWindow);
})();