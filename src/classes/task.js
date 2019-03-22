import TaskComponent from './task-component';
import moment from 'moment';

class Task extends TaskComponent {
  constructor(data, id) {
    super(data, id);

    this._onEdit = null;

    this._clickEditBtnHandler = this._clickEditBtnHandler.bind(this);

    this._updateState();
  }

  get _template() {
    const isDisabled = (property) => !property ? ` disabled` : ``;

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

    const hashtagListItems = () => [...this._hashtags].map((hashtag) => `
      <span class="card__hashtag-inner">
        <button type="button" class="card__hashtag-name">
          #${hashtag}
        </button>
      </span>
    `).join(``);

    const template = `
      <article class="card ${computedClassesToString(computedClasses.card)}">
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
                  <fieldset class="card__date-deadline"${isDisabled(this._state.isDate)}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${this._dueDate ? moment(this._dueDate).format(`D MMMM`) : ``}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
                      />
                    </label>
                  </fieldset>
                </div>
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${this._hashtags ? hashtagListItems() : ``}
                  </div>
                </div>
              </div>
              <label class="card__img-wrap ${computedClasses.others.hasNoPicture}">
                <img
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>
            </div>
          </div>
        </form>
      </article>
    `;

    return template;
  }

  set onEdit(handler) {
    this._onEdit = handler;
  }

  _clickEditBtnHandler() {
    if (this._onEdit && typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _addEventHandlers() {
    const editBtn = this._element.querySelector(`.card__btn--edit`);
    editBtn.addEventListener(`click`, this._clickEditBtnHandler);
  }

  _removeEventHandlers() {
    const editBtn = this._element.querySelector(`.card__btn--edit`);
    editBtn.removeEventListener(`click`, this._clickEditBtnHandler);
  }
}

export default Task;
