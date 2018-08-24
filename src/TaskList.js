//TaskList Component file

import Task from "./Task.js";

//===================================
// TaskList React Component
//===================================

export default class TaskList extends React.Component {
  //constructor
  constructor(props) {
    super(props);

    //create React reference to task container for later use
    this.listContainer = React.createRef();
    //bind handlers to object
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  //fires every time a component updates
  componentDidUpdate() {
    //references task container and scrolls to the bottom when a new task is added
    this.listContainer.current.scrollTop = this.listContainer.current.scrollHeight;
  }

  //handles delete button click
  handleDeleteClick(id) {
    //calls the click handler passed in props with the task's id
    this.props.onDeleteClick(id);
  }

  //render method
  render() {
    //for every object in the tasks array (passed in props)
    //turn it into a Task Component, passing key, id, text, and click handler
    let tasks = this.props.tasks.map(e => {
      return <Task
        key = {e.key}
        id = {e.id}
        text = {e.text}
        onDeleteClick = {this.handleDeleteClick}
      />
    });

    //return task container with the React reference created earlier and tasks list
    return (
      <div id = "taskContainer" ref = {this.listContainer}> {tasks} </div>
    );
  }
}
