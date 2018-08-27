//Progress Bar Component file

//===================================
// Helper Functions
//===================================

//returns difference between two dates in days
function daysBetween(d1, d2) {
  let oneDay = 1000 * 60 * 60 * 24; //ms * seconds * minutes * hours
  let diff = Math.ceil((d2.getTime() - d1.getTime()) / oneDay);
  return diff;
}

//===================================
// Progress Bar Component
//===================================

export default class ProgressBar extends React.Component {
  //render method
  render() {
    //create Dates for when the task is created/due, and now
    let now = new Date();
    let created = new Date();
    created.setTime(this.props.created);
    let due = new Date();
    due.setTime(this.props.due);

    //get the number of days between when it was created and when it's due
    //minimum 7 days (a week, just for progress bar staying somewhat consistent)
    let diff = daysBetween(created, due);
    diff = Math.max(7, diff);

    //get the number of days left until task is due
    //minimum 0 days (account for expired tasks - negative days left)
    let daysLeft = daysBetween(now, due);
    daysLeft = Math.max(0, daysLeft);

    //returns progress bar with info
    return (
      <div className="card-footer text-muted">
        <div className = "days">
          {daysLeft + " day" + (daysLeft !== 1 ? "s" : "")} left
        </div>
        <div className="progress">
          <div className="progress-bar"
                role="progressbar"
                aria-valuenow = {daysLeft}
                aria-valuemin="0"
                aria-valuemax = {diff}
                style = {{width: (100 * daysLeft / diff) + "%"}}>
          </div>
        </div>
      </div>
    );
  }
}
