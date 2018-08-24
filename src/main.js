//Entry point for project

import TaskApp from "./TaskApp.js";

//===================================
// Start Project
//===================================

$(document).ready(function() {
  $("body").bootstrapMaterialDesign();
});

chrome.storage.local.get("todolist", function(value) {
  //renders TaskApp Component to root div
  const app = <TaskApp initList = {value.todolist}/>;
  const root = document.getElementById("root");

  ReactDOM.render(app, root);
});
