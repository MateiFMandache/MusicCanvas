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
            onClick={this.props.chooseTiming}>
            {`${this.props.currentSection.bars} bars of
              ${this.props.currentSection.beatsPerBar} beats`.replace(/\s{2,}/, " ")
            /* get rid of excess whitespace */}
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
    this.barNumberChange = this.barNumberChange.bind(this);
    this.beatsPerBarChange = this.beatsPerBarChange.bind(this);
    this.subdivisionsChange = this.subdivisionsChange.bind(this);
    this.state = {
      // flags showing whether each entry is blank
      barsBlank: false,
      beatsPerBarBlank: false,
      subdivisionsBlank: false
    }
  }
  barNumberChange(event) {
    const newValue = event.target.value;
    if (newValue == "") {
      this.setState({barsBlank: true})
    } else {
      const number = Number(newValue);
      if (isNaN(number)) {
        alert("Entry must be a number");
      } else if (number > 300 || number < 1 || !Number.isInteger(number)) {
        alert("Number of bars must be a whole number between 1 and 300");
      } else {
        this.setState({barsBlank: false});
        this.props.newNumberOfBars(number);
      }
    }
  }
  beatsPerBarChange(event) {
    const newValue = event.target.value;
    if (newValue == "") {
      this.setState({beatsPerBarBlank: true})
    } else {
      const number = Number(newValue);
      if (isNaN(number)) {
        alert("Entry must be a number");
      } else if (number > 12 || number < 1 || !Number.isInteger(number)) {
        alert("Number of beats per bar must be a whole number between 1 and 12");
      } else {
        this.setState({beatsPerBarBlank: false});
        this.props.newBeatsPerBar(number);
      }
    }
  }
  subdivisionsChange(event) {
    const newValue = event.target.value;
    if (newValue == "") {
      this.setState({subdivisionsBlank: true})
    } else {
      const number = Number(newValue);
      if (isNaN(number)) {
        alert("Entry must be a number");
      } else if (number > 8 || number < 1 || !Number.isInteger(number)) {
        alert("Number of subdivisions must be a whole number between 1 and 8");
      } else {
        this.setState({subdivisionsBlank: false});
        this.props.newSubdivisionsPerBeat(number);
      }
    }
  }
  render() {
    return (
      <table>
        <tr>
          <td style={{textAlign: "right"}}>
            <label for="number-bars-entry">Number of bars:</label>
          </td>
          <td>
            <input
              type="text"
              className="text-entry"
              id="number-bars-entry"
              style={{marginRight: 30, width: 100}}
              value={this.state.barsBlank ? "" : this.props.bars}
              onChange={this.barNumberChange}/>
          </td>
        </tr>
        <tr>
          <td style={{textAlign: "right"}}>
            <label for="beats-per-bar-entry">Beats per bar:</label>
          </td>
          <td>
            <input
              type="text"
              className="text-entry"
              id="beats-per-bar-entry"
              style={{marginRight: 30, width: 100}}
              value={this.state.beatsPerBarBlank ? "" : this.props.beatsPerBar}
              onChange={this.beatsPerBarChange}/>
          </td>
        </tr><tr>
          <td style={{textAlign: "right"}}>
            <label for="subdivisions-per-beat-entry">Subdivisions per beat:</label>
          </td>
          <td>
            <input
              type="text"
              className="text-entry"
              id="subdivisions-per-beat-entry"
              style={{marginRight: 30, width: 100}}
              value={this.state.subdivisionsBlank ? "" : this.props.subdivisionsPerBeat}
              onChange={this.subdivisionsChange}/>
          </td>
        </tr>
      </table>
    )
  }
}

let SelectTimingWindowConnected;

(function() {
  const state2props = state => ({
    bars: state.view.sections.byId[state.view.sections.current].bars,
    beatsPerBar: state.view.sections.byId[state.view.sections.current].beatsPerBar,
    subdivisionsPerBeat: state.view.sections.byId[state.view.sections.current].subdivisionsPerBeat,
  })
  const dispatch2props = dispatch => ({
    newNumberOfBars: bars => {dispatch(newNumberOfBars(bars))},
    newBeatsPerBar: beatsPerBar => {dispatch(newBeatsPerBar(beatsPerBar))},
    newSubdivisionsPerBeat: subdivisions => {dispatch(newSubdivisionsPerBeat(subdivisions))}
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
