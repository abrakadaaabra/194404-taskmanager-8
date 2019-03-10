import mockTaskData from '../mock-task-data';

class TaskEdit {
  constructor(data, id) {
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
  }

  get element() {
    return this._element;
  }

  set onSubmit(handler) {
    this._onSubmit = handler;
  }

  get template() {
    const isExpired = Date.now() > this._dueDate;

    const classes = {
      deadline: isExpired ? `card--deadline` : ``,
      repeated: this._isRepeated ? `card--repeat` : ``,
      color: this._color ? `card--${this._color}` : `card--black`,
      hasNoPicture: this._picture ? `` : `card__img-wrap--empty`
    };

    const hasDueDate = () => this._dueDate ? `yes` : `no`;
    const hasRepeatingDays = () => this._isRepeated ? `yes` : `no`;

    const getFormattedDateTime = () => {
      const date = new Date(this._dueDate);

      const dayAndMonth = date.toLocaleString(`ru`, {
        day: `numeric`,
        month: `long`
      });

      const time = date.toLocaleString(`ru`, {
        hour: `numeric`,
        minute: `numeric`
      });

      return {
        dayAndMonth,
        time
      };
    };

    const formattedDateTime = this._dueDate ? getFormattedDateTime() : null;

    const templateParts = {};

    templateParts.control = `
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
    `;

    templateParts.colorBar = `
      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
        </svg>
      </div>
    `;

    templateParts.textareaWrap = `
      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${this._description}</textarea>
        </label>
      </div>
    `;

    templateParts.dateDeadlineToggle = `
      <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${hasDueDate()}</span>
      </button>

      <fieldset class="card__date-deadline"${!this._dueDate ? ` disabled` : ``}>
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="23 September"
            name="date"
            value="${this._dueDate ? formattedDateTime.dayAndMonth : ``}"
          />
        </label>
        <label class="card__input-deadline-wrap">
          <input
            class="card__time"
            type="text"
            placeholder="11:15 PM"
            name="time"
            value="${this._dueDate ? formattedDateTime.time : ``}"
          />
        </label>
      </fieldset>
    `;

    templateParts.repeatDayInput = () => Object.keys(this._repeatingDays).map((day) => `
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

    templateParts.repeatToggle = `
      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${hasRepeatingDays()}</span>
      </button>

      <fieldset class="card__repeat-days"${!this._isRepeated ? ` disabled` : ``}>
        <div class="card__repeat-days-inner">
          ${templateParts.repeatDayInput()}
        </div>
      </fieldset>
    `;

    templateParts.dates = `
      <div class="card__dates">
        ${templateParts.dateDeadlineToggle}
        ${templateParts.repeatToggle}
      </div>
    `;

    templateParts.hashtagInner = () => [...this._hashtags].map((hashtag) => `
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

    templateParts.hashtag = `
      <div class="card__hashtag">
        <div class="card__hashtag-list">
          ${templateParts.hashtagInner()}
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
    `;

    templateParts.details = `
      <div class="card__details">
        ${templateParts.dates}
        ${templateParts.hashtag}
      </div>
    `;

    templateParts.imgWrap = `
      <label class="card__img-wrap ${classes.hasNoPicture}">
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
    `;

    templateParts.colorsInputs = mockTaskData.colors.map((inputColor) => `
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

    templateParts.colorsInner = `
      <div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          ${templateParts.colorsInputs}
        </div>
      </div>
    `;

    templateParts.settings = `
      <div class="card__settings">
        ${templateParts.details}
        ${templateParts.imgWrap}
        ${templateParts.colorsInner}
      </div>
    `;

    templateParts.statusBtns = `
      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    `;

    const template = `
      <article class="card card--edit ${classes.deadline} ${classes.repeated} ${classes.color}">
        <form class="card__form" method="get">
          <div class="card__inner">
            ${templateParts.control}
            ${templateParts.colorBar}
            ${templateParts.textareaWrap}
            ${templateParts.settings}
            ${templateParts.statusBtns}
          </div>
        </form>
      </article>
    `;

    return template;
  }

  _formSubmitHandler(e) {
    if (this._onSubmit && typeof this._onSubmit === `function`) {
      e.preventDefault();
      this._onSubmit();
    }
  }

  _createElement(template) {
    const tmpElement = document.createElement(`div`);
    tmpElement.innerHTML = template;

    const element = tmpElement.firstElementChild;

    return element;
  }

  render() {
    this._element = this._createElement(this.template);
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    const form = this._element.querySelector(`.card__form`);
    form.addEventListener(`submit`, this._formSubmitHandler.bind(this));
  }

  unbind() {
    const form = this._element.querySelector(`.card__form`);
    form.removeEventListener(`submit`, this._formSubmitHandler.bind(this));
  }
}

export default TaskEdit;
