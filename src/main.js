//Entry point for project

import TaskApp from "./TaskApp.js";

//===================================
// Start Project
//===================================

$(document).ready(function() {
  $("body").bootstrapMaterialDesign();
});

//load the to do list in from Chrome Storage
chrome.storage.local.get("todolist", function(value) {
    //renders TaskApp Component to root div
    var list = [];
    if (value.todolist) {
        list = value.todolist;
    }
    const app = <TaskApp initList = {list}/>;
    const root = document.getElementById("root");

    ReactDOM.render(app, root);
});
