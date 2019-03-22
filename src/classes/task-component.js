import Component from "./component";

class TaskComponent extends Component {
  constructor(data, id) {
    super();

    this._id = id;

    this._description = data.description;
    this._dueDate = data.dueDate || null;
    this._hashtags = data.hashtags || null;
    this._repeatingDays = data.repeatingDays;
    this._picture = data.picture;
    this._color = data.color;

    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;

    this._state._isDate = null;
    this._state._isRepeated = null;
    this._state._isExpired = null;

    if (new.target === TaskComponent) {
      throw new Error(`Can't instantiate TaskComponent, only concrete one.`);
    }
  }

  _isDate() {
    return this._dueDate ? true : false;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  _isExpired() {
    if (this._dueDate) {
      return Date.now() > this._dueDate;
    }

    return false;
  }

  _updateState() {
    this._state.isDate = this._isDate();
    this._state.isRepeated = this._isRepeated();
    this._state.isExpired = this._isExpired();
  }

  /* TODO: Добавить dueTime, picture, isFavorite, isDone */
  update(data) {
    this._description = data.description;
    this._dueDate = data.dueDate;
    this._hashtags = data.hashtags;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._updateState();
  }
}

export default TaskComponent;
