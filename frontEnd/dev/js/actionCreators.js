const NEW_TITLE = "NEW_TITLE";
const TITLE_CLICK = "TITLE_CLICK";
const CLOSE_WINDOW = "CLOSE_WINDOW";
const SELECT_TOOL = "SELECT_TOOL";
const WINDOW_RESIZE = "WINDOW_RESIZE";
const NEW_TONIC = "NEW_TONIC";
const NEW_SCALE_TYPE = "NEW_SCALE_TYPE";
const CHOOSE_SCALE = "CHOOSE_SCALE";
const CHOOSE_TIMING = "CHOOSE_TIMING";
const CHOOSE_SECTION = "CHOOSE_SECTION";
const MAKE_NEW_SECTION = "MAKE_NEW_SECTION";

function newTitle(title) {
  return {
    type: NEW_TITLE,
    title
  };
}

function titleClick() {
  return {
    type: TITLE_CLICK
  };
}

function closeWindow() {
  return {
    type: CLOSE_WINDOW
  };
}

function selectTool(tool) {
  return {
    type: SELECT_TOOL,
    tool
  };
}

function windowResize() {
  return {
    type: WINDOW_RESIZE,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}

function newTonic(tonic) {
  return {
    type: NEW_TONIC,
    tonic
  };
}

function newScaleType(scaleType) {
  return {
    type: NEW_SCALE_TYPE,
    scaleType
  };
}

function chooseScale() {
  return {
    type: CHOOSE_SCALE
  }
}

function chooseTiming() {
  return {
    type: CHOOSE_TIMING
  }
}

function chooseSection() {
  return {
    type: CHOOSE_SECTION
  }
}

function makeNewSection() {
  return {
    type: MAKE_NEW_SECTION
  }
}
