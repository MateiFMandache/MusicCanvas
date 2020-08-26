const NEW_TITLE = "NEW_TITLE";
const TITLE_CLICK = "TITLE_CLICK";
const CLOSE_WINDOW = "CLOSE_WINDOW";
const SELECT_TOOL = "SELECT_TOOL";
const WINDOW_RESIZE = "WINDOW_RESIZE";

function newTitle(title) {
  return {
    type: NEW_TITLE,
    title
  }
}

function titleClick() {
  return {
    type: TITLE_CLICK
  }
}

function closeWindow() {
  return {
    type: CLOSE_WINDOW
  }
}

function selectTool(tool) {
  return {
    type: SELECT_TOOL,
    tool
  }
}

function windowResize() {
  return {
    type: WINDOW_RESIZE,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }
}
