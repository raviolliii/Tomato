//main App file

import TaskList from "./TaskList.js";

//===================================
// Helper Functions
//===================================

//parses a user input to find date and returns it
function parseDateInput(input) {
  let today = new Date();
  let due = new Date(today.getUTCFullYear(), today.getMonth(), today.getDate());
  let oneDay = 1000 * 60 * 60 * 24; //ms * seconds * minutes * hours

  let keywords = {
    date: function(phrase) {
      let month = parseInt(phrase.split("/")[0]) - 1;
      let day = parseInt(phrase.split("/")[1]);
      return new Date(today.getUTCFullYear(), month, day);
    },
    days: function(count) {
      due.setTime(due.getTime() + (count * oneDay));
      return due;
    },
    weeks: function(count) {
      due.setTime(due.getTime() + (count * 7 * oneDay));
      return due;
    },
    months: function(count) {
      due.setTime(due.getTime() + (count * 30 * oneDay));
      return due;
    }
  };

  if (input.includes("/")) {
    return keywords.date(input);
  }
  else if (input.includes("day") || input.includes("week") || input.includes("month")) {
    let count = input.split(" ")[0];
    let term = input.split(" ")[1];
    term += term[term.length - 1] !== "s" ? "s" : "";
    return keywords[term](count);
  }
  else if (input.includes("tomorrow")) {
    return keywords.days(1);
  }
  return due;
}

//===================================
// TaskApp React Component
//===================================

export default class TaskApp extends React.Component {
  //constructor
  constructor(props) {
    super(props);

    //initialize state with tasks from or []
    this.state = {
      tasks: this.props.initList.map((e, i) => ({
        key: "t" + i,
        id: "t" + i,
        text: e.text,
        created: e.created,
        due: e.due
      })),
      taskCount: (this.props.initList.length || 1) - 1,
      tempList: null
    };

    //create React Reference to input field for later use
    this.inputRef = React.createRef();

    //bind handlers to object
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  //input change handler
  handleChange(e) {
    //create a temporary list of tasks that match the searched phrase
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
      //create Dates for when task is created (today) and due
      let today = new Date();
      let due = new Date(today.getUTCFullYear(), today.getMonth(), today.getDate());

      //when the task contains @, there's a date
      if (value.includes("@")) {
        //get the month/day the m/d format
        let input = value.substring(value.indexOf("@") + 1).trim().toLowerCase();
        due = parseDateInput(input);

        //cut the input down to just the task (not including due date)
        value = value.substring(0, value.indexOf("@")).trim();
      }

      //set state to the updated list
      this.setState((prevState, props) => {
        let task = {
          key: "t" + (prevState.taskCount + 1),
          id: "t" + (prevState.taskCount + 1),
          text: value,
          created: today.getTime(),
          due: due.getTime()
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
    //store the updated task list in Chrome Storage
    chrome.storage.local.set({
      todolist: this.state.tasks.map(e => ({
        text: e.text,
        created: e.created,
        due: e.due
      }))
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
          <div id = "tip"> Tip: Type "@" to add a due date (ex. @tomorrow, @3 weeks) </div>
        </div>
        <TaskList tasks = {list} onDeleteClick = {this.handleDeleteClick}/>
      </div>
    );
  }
}
