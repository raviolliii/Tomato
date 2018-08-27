//Task Component file

import DeleteButton from "./DeleteButton.js";
import ProgressBar from "./ProgressBar.js";

//===================================
// Task React Component
//===================================

export default class Task extends React.Component {
  //constructor
  constructor(props) {
    super(props);

    //create React reference to card for later use
    this.card = React.createRef();
    //bind handlers to object
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  //component did mount
  componentDidMount() {
    //if the due date has passed, add the expired class to the task's card
    if (this.props.due <= Date.now()) {
      this.card.current.classList.add("expired");
    }
  }

  //handle delete button click
  handleDeleteClick(e) {
    //references the card containing the button clicked and adds
    //class to animate out
    this.card.current.classList.add("flipOutX");
    //calls click handler passed through props with the task's id
    setTimeout(this.props.onDeleteClick, 550, this.props.id);
  }

  //render method
  render() {
    //returns card container with task info and delete button
    return (
      <div className = "card animated fadeInUp delay-4s" ref = {this.card}>
        <div className = "card-body">
          <div className = "card-text"> {this.props.text} </div>
          <ProgressBar created = {this.props.created} due = {this.props.due} />
        </div>
        <DeleteButton onClick = {this.handleDeleteClick} />
      </div>
    );
  }
}
