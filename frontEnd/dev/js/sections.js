class SectionsPanel extends React.Component {
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
          { className: "clickable",
            style: { textAlign: "center" },
            onClick: this.props.chooseSection },
          this.props.currentSection.name
        ),
        React.createElement(
          "td",
          { className: "clickable",
            style: { textAlign: "center" },
            onClick: this.props.newSection },
          "New section..."
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: { textAlign: "right" } },
          "Scale:"
        ),
        React.createElement(
          "td",
          { className: "clickable",
            onClick: this.props.chooseScale },
          this.props.currentSection.tonic.name + " " + this.props.currentSection.scaleType.name
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: { textAlign: "right" } },
          "Timing:"
        ),
        React.createElement(
          "td",
          { className: "clickable",
            onClick: this.props.chooseTiming },
          "TBA"
        )
      )
    );
  }
}

let SectionsPanelConnected;

(function () {
  const state2props = state => ({
    currentSection: state.view.sections.byId[state.view.sections.current]
  });
  const dispatch2props = dispatch => ({
    chooseScale: () => {
      dispatch(chooseScale());
    },
    chooseTiming: () => {
      dispatch(chooseTiming());
    },
    chooseSection: () => {
      dispatch(chooseSection());
    },
    newSection: () => {
      dispatch(makeNewSection());
    }
  });
  SectionsPanelConnected = connect(state2props, dispatch2props)(SectionsPanel);
})();

class SelectScaleWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "table",
      { className: "in-border" },
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          "Tonic"
        ),
        React.createElement(
          "td",
          null,
          "Scale type"
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          React.createElement(
            "div",
            { className: "menu" },
            allScaleTonics.map((tonic, index) => React.createElement(
              "p",
              { key: index,
                className: tonic == this.props.tonic ? "selected" : "clickable",
                onClick: () => this.props.newTonic(tonic) },
              tonic.name
            ))
          )
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "div",
            { className: "menu" },
            allScaleTypes.map((scaleType, index) => React.createElement(
              "p",
              { key: index,
                className: scaleType == this.props.scaleType ? "selected" : "clickable",
                onClick: () => this.props.newScaleType(scaleType) },
              scaleType.name
            ))
          )
        )
      )
    );
  }
}

let SelectScaleWindowConnected;

(function () {
  const state2props = state => ({
    tonic: state.view.sections.byId[state.view.sections.current].tonic,
    scaleType: state.view.sections.byId[state.view.sections.current].scaleType
  });
  const dispatch2props = dispatch => ({
    newTonic: tonic => {
      dispatch(newTonic(tonic));
    },
    newScaleType: scaleType => {
      dispatch(newScaleType(scaleType));
    }
  });
  SelectScaleWindowConnected = connect(state2props, dispatch2props)(SelectScaleWindow);
})();

class SelectTimingWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "p",
      null,
      "tba"
    );
  }
}

let SelectTimingWindowConnected;

(function () {
  const state2props = state => ({});
  const dispatch2props = dispatch => ({});
  SelectTimingWindowConnected = connect(state2props, dispatch2props)(SelectTimingWindow);
})();

class SelectSectionWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "p",
      null,
      "Tba"
    );
  }
}

let SelectSectionWindowConnected;

(function () {
  const state2props = state => ({
    allSections: state.view.sections.all.map(id => ({
      id,
      name: state.view.sections.byId[id].name
    }))
  });
  const dispatch2props = dispatch => ({});
  SelectSectionWindowConnected = connect(state2props, dispatch2props)(SelectSectionWindow);
})();

class NewSectionWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "p",
      null,
      "TBa"
    );
  }
}

let NewSectionWindowConnected;

(function () {
  const state2props = state => ({});
  const dispatch2props = dispatch => ({});
  NewSectionWindowConnected = connect(state2props, dispatch2props)(NewSectionWindow);
})();