class SectionsPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table>
        <tr>
          <td className="clickable"
            style={{textAlign: "center"}}
            onClick={this.props.chooseSection}>
              {this.props.currentSection.name}</td>
          <td className="clickable"
            style={{textAlign: "center"}}
            onClick={this.props.newSection}>New section...</td>
        </tr>
        <tr>
          <td style={{textAlign: "right"}}>Scale:</td>
          <td className="clickable"
            onClick={this.props.chooseScale}>{this.props.currentSection.tonic.name +
            " " + this.props.currentSection.scaleType.name}
          </td>
        </tr>
        <tr>
          <td style={{textAlign: "right"}}>Timing:</td>
          <td className="clickable"
            onClick={this.props.chooseTiming}>TBA
          </td>
        </tr>
      </table>
    )
  }
}

let SectionsPanelConnected;

(function() {
  const state2props = state => ({
    currentSection: state.view.sections.byId[state.view.sections.current],
  })
  const dispatch2props = dispatch => ({
    chooseScale: () => {dispatch(chooseScale())},
    chooseTiming: () => {dispatch(chooseTiming())},
    chooseSection: () => {dispatch(chooseSection())},
    newSection: () => {dispatch(makeNewSection())}
  })
  SectionsPanelConnected = connect(state2props, dispatch2props)(SectionsPanel);
})();

class SelectScaleWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table className="in-border">
        <tr>
          <td>Tonic</td>
          <td>Scale type</td>
        </tr>
        <tr>
          <td>
            <div className="menu">
              {allScaleTonics.map((tonic, index) => (
                <p key={index}
                  className={(tonic == this.props.tonic) ? "selected" : "clickable"}
                  onClick={() => this.props.newTonic(tonic)}>{tonic.name}</p>
              ))}
            </div>
          </td>
          <td>
            <div className="menu">
              {allScaleTypes.map((scaleType, index) => (
                <p key={index}
                  className={(scaleType == this.props.scaleType) ? "selected" : "clickable"}
                  onClick={() => this.props.newScaleType(scaleType)}>{scaleType.name}</p>
              ))}
            </div>
          </td>
        </tr>
      </table>
    )
  }
}

let SelectScaleWindowConnected;

(function() {
  const state2props = state => ({
    tonic: state.view.sections.byId[state.view.sections.current].tonic,
    scaleType: state.view.sections.byId[state.view.sections.current].scaleType
  })
  const dispatch2props = dispatch => ({
    newTonic: tonic => {dispatch(newTonic(tonic))},
    newScaleType: scaleType => {dispatch(newScaleType(scaleType))}
  })
  SelectScaleWindowConnected = connect(state2props, dispatch2props)(SelectScaleWindow);
})();

class SelectTimingWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>tba</p>
    )
  }
}

let SelectTimingWindowConnected;

(function() {
  const state2props = state => ({

  })
  const dispatch2props = dispatch => ({

  })
  SelectTimingWindowConnected = connect(state2props, dispatch2props)(SelectTimingWindow);
})();

class SelectSectionWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>Tba</p>
    )
  }
}

let SelectSectionWindowConnected;

(function() {
  const state2props = state => ({
    allSections: state.view.sections.all.map(id => ({
      id,
      name: state.view.sections.byId[id].name
    }))
  })
  const dispatch2props = dispatch => ({

  })
  SelectSectionWindowConnected = connect(state2props, dispatch2props)(SelectSectionWindow);
})();

class NewSectionWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>TBa</p>
    )
  }
}

let NewSectionWindowConnected;

(function() {
  const state2props = state => ({

  })
  const dispatch2props = dispatch => ({

  })
  NewSectionWindowConnected = connect(state2props, dispatch2props)(NewSectionWindow);
})();
