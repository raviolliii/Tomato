//main App file

import TaskList from "./TaskList.js";

//===================================
// Helper Functions
//===================================



//===================================
// TaskApp React Component
//===================================

export default class TaskApp extends React.Component {
  //constructor
  constructor(props) {
    super(props);

    //initialize state with tasks from getCookie() or []
    this.state = {
      tasks: this.props.initList.map((e, i) => ({
        key: "t" + i,
        id: "t" + i,
        text: e
      })),
      taskCount: (1 || this.props.initList.length) - 1,
      tempList: null
    };

    this.inputRef = React.createRef();

    //bind handlers to object
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState((prevState, props) => ({
      tempList: prevState.tasks.filter(e => e.text.includes(value))
    }));
  }

  //keypress handler, to be passed down to child components
  handleKeyPress(e) {
    //if the trimmed input exists and the user hit "enter"
    let value = e.target.value.trim();
    if (value && e.key === "Enter") {
      //set state to the updated list
      this.setState((prevState, props) => {
        let task = {
          key: "t" + (prevState.taskCount + 1),
          id: "t" + (prevState.taskCount + 1),
          text: value
        };
        let list = prevState.tasks.concat([task]);

        return {
          tasks: list,
          taskCount: prevState.taskCount + 1,
          tempList: null
        };
      });

      //clear the input field
      e.target.value = "";
    }
  }

  //handles the delete button click
  handleDeleteClick(id) {
    //removes the task matching id
    this.setState((prevState, props) => ({
      tasks: prevState.tasks.filter(e => e.id !== id),
      tempList: null
    }));
    this.inputRef.current.value = "";
  }

  //render method
  render() {
    chrome.storage.local.set({
      todolist: this.state.tasks.map(e => e.text)
    });
    let list = this.state.tempList || this.state.tasks;

    //return container, passing event handlers to children
    //and tasks list to TaskList component
    return (
      <div>
        <div id = "taskInputContainer" className="form-group animated fadeInUp">
          <label htmlFor="taskInput" className="bmd-label-floating"> Add / Search Task </label>
          <input ref = {this.inputRef}
                onChange = {this.handleChange}
                onKeyPress = {this.handleKeyPress}
                className="form-control" id="taskInput"
          />
        </div>
        <TaskList tasks = {list} onDeleteClick = {this.handleDeleteClick}/>
      </div>
    );
  }
}
