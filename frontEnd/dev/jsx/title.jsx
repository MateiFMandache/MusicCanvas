class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1 onClick={this.props.clicked}>{this.props.title || "Untitled"}</h1>
    );
  }
}

let TitleConnected;

(function() {
  const state2props = state => ({
    title: state.title
  })
  const dispatch2props = dispatch => ({
    clicked: () => {dispatch(titleClick())}
  })
  TitleConnected = connect(state2props, dispatch2props)(Title);
})();

class TitleWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <TitleConnected />
      </Provider>
    )
  }
}

ReactDOM.render(<TitleWrapper />, document.getElementById("title"));

// Change title of window when title changes
store.subscribe(() => {
  const title = store.getState().title;
  document.title = (title) ? `${title} - Music Canvas` : "Music Canvas";
});

// title change window
class TitleWindow extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.newTitle(event.target.value);
  }
  render() {
    return (
      <label for="title-entry">
        <p>Enter new title below:</p>
        <input
          id="title-entry"
          className="text-entry"
          type="text"
          value={this.props.title}
          onChange={this.handleChange} />
      </label>
    )
  }
}

let TitleWindowConnected;

(function() {
  const state2props = state => ({
    title: state.title
  })
  const dispatch2props = dispatch => ({
    newTitle: title => {dispatch(newTitle(title))},
  })
  TitleWindowConnected = connect(state2props, dispatch2props)(TitleWindow);
})();
