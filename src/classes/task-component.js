import Component from "./component";

class TaskComponent extends Component {
  constructor(data, id) {
    super();

    this._id = id;

    this._description = data.description;
    this._dueDate = data.dueDate;
    this._hashtags = data.hashtags;
    this._picture = data.picture;
    this._color = data.color;
    this._isRepeated = data.isRepeated;
    this._repeatingDays = data.repeatingDays;

    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;

    if (new.target === TaskComponent) {
      throw new Error(`Can't instantiate TaskComponent, only concrete one.`);
    }
  }
}

export default TaskComponent;
