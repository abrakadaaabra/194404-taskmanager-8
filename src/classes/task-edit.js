import mockTaskData from '../mock-task-data';
import TaskComponent from './task-component';
import flatpickr from 'flatpickr';
import moment from 'moment';

// TODO: jsDoc
class TaskEdit extends TaskComponent {
  constructor(data, id) {
    super(data, id);

    this._onSubmit = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeDueDateToggleHandler = this._changeDueDateToggleHandler.bind(this);
    this._changeRepeatedToggleHandler = this._changeRepeatedToggleHandler.bind(this);

    this._updateState();
  }

  get _template() {
    const isDisabled = (property) => !property ? ` disabled` : ``;
    const isExists = (property) => property ? `yes` : `no`;

    const Colors = {
      black: `card--black`,
      green: `card--green`,
      yellow: `card--yellow`,
      pink: `card--pink`,
      blue: `card--blue`
    };

    const computedClasses = {
      card: {
        deadline: this._state.isExpired ? `card--deadline` : ``,
        repeated: this._state.isRepeated ? `card--repeat` : ``,
        color: Colors[this._color],
      },
      others: {
        hasNoPicture: !this._picture ? `card__img-wrap--empty` : ``
      }
    };

    const computedClassesToString = (classesObj) => {
      return Object.values(classesObj)
        .join(` `)
        .trim()
        .replace(/\s+/g, ` `);
    };

    const repeatDaysInputs = () => Object.keys(this._repeatingDays).map((day) => `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${this._id}"
        name="repeat"
        value="${day}"
        ${this._repeatingDays[day] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-${this._id}"
        >${day}</label
      >
    `).join(``);

    const hashtagListItems = () => [...this._hashtags].map((hashtag) => `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${hashtag}"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${hashtag}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `).join(``);

    const colorsInputs = () => mockTaskData.colors.map((inputColor) => `
      <input
        type="radio"
        id="color-${inputColor}-${this._id}"
        class="card__color-input card__color-input--${inputColor} visually-hidden"
        name="color"
        value="${inputColor}"
        ${this._color === inputColor ? `checked` : ``}
      />
      <label
        for="color-${inputColor}-${this._id}"
        class="card__color card__color--${inputColor}"
        >${inputColor}</label
      >
    `).join(``);

    const template = `
      <article class="card card--edit ${computedClassesToString(computedClasses.card)}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
                favorites
              </button>
            </div>
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
              </svg>
            </div>
            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${isExists(this._state.isDate)}</span>
                  </button>

                  <fieldset class="card__date-deadline"${isDisabled(this._state.isDate)}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="${moment(Date.now()).format(`D MMMM`)}"
                        name="date"
                        value="${this._dueDate ? moment(this._dueDate).format(`D MMMM`) : ``}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="${moment(Date.now()).format(`hh:mm A`)}"
                        name="time"
                        value="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
                      />
                    </label>
                  </fieldset>
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isExists(this._state.isRepeated)}</span>
                  </button>

                  <fieldset class="card__repeat-days"${isDisabled(this._state.isRepeated)}>
                    <div class="card__repeat-days-inner">
                      ${repeatDaysInputs()}
                    </div>
                  </fieldset>
                </div>
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${this._hashtags ? hashtagListItems() : ``}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
              <label class="card__img-wrap ${computedClasses.others.hasNoPicture}">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsInputs()}
                </div>
              </div>
            </div>
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;

    return template;
  }

  /* TODO: Добавить dueTime, picture, isFavorite, isDone */
  _convertFormDataToTaskData(formData) {
    const newTaskData = {
      description: ``,
      dueDate: null,
      hashtags: new Set(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      },
      color: ``
    };

    const taskEditMapper = TaskEdit.createMapper(newTaskData);

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (taskEditMapper.hasOwnProperty(key)) {
        taskEditMapper[key](value);
      }
    }

    return newTaskData;
  }

  set onSubmit(handler) {
    this._onSubmit = handler;
  }

  _formSubmitHandler(e) {
    e.preventDefault();

    const form = this._element.querySelector(`.card__form`);
    const formData = new FormData(form);
    const newTaskData = this._convertFormDataToTaskData(formData);

    if (this._onSubmit && typeof this._onSubmit === `function`) {
      this._onSubmit(newTaskData);
    }

    this.update(newTaskData);
  }

  _changeDueDateToggleHandler() {
    this._state.isDate = !this._state.isDate;
    this._updateElement();
  }

  _changeRepeatedToggleHandler() {
    this._state.isRepeated = !this._state.isRepeated;
    this._updateElement();
  }

  _addEventHandlers() {
    const form = this._element.querySelector(`.card__form`);
    const dueDateToggle = this._element.querySelector(`.card__date-deadline-toggle`);
    const repeatedToggle = this._element.querySelector(`.card__repeat-toggle`);
    const dueDatePicker = this._element.querySelector(`.card__date`);
    const dueTimePicker = this._element.querySelector(`.card__time`);

    form.addEventListener(`submit`, this._formSubmitHandler);
    dueDateToggle.addEventListener(`click`, this._changeDueDateToggleHandler);
    repeatedToggle.addEventListener(`click`, this._changeRepeatedToggleHandler);

    if (this._state.isDate) {
      flatpickr(dueDatePicker, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });
      flatpickr(dueTimePicker, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }
  }

  _removeEventHandlers() {
    const form = this._element.querySelector(`.card__form`);
    const dueDateToggle = this._element.querySelector(`.card__date-deadline-toggle`);
    const repeatedToggle = this._element.querySelector(`.card__repeat-toggle`);
    const flatpickrElements = document.querySelectorAll(`.flatpickr-calendar`);

    form.removeEventListener(`submit`, this._formSubmitHandler);
    dueDateToggle.removeEventListener(`click`, this._changeDueDateToggleHandler);
    repeatedToggle.removeEventListener(`click`, this._changeRepeatedToggleHandler);
    if (flatpickrElements.length > 0) {
      [...flatpickrElements].forEach((element) => element.remove());
    }
  }

  _updateElement() {
    const newElement = this._createElement();

    this._removeEventHandlers();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._addEventHandlers();
  }

  /* TODO: Добавить dueTime, picture, isFavorite, isDone */
  static createMapper(target) {
    return {
      text: (value) => (target.description = value),
      date: (value) => (target.dueDate = value),
      hashtag: (value) => target.hashtags.add(value),
      repeat: (value) => (target.repeatingDays[value] = true),
      color: (value) => (target.color = value),
    };
  }

}

export default TaskEdit;
