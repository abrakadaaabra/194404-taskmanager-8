import TaskComponent from './task-component';

class Task extends TaskComponent {
  constructor(data, id) {
    super(data, id);

    this._clickEditBtnHandler = this._clickEditBtnHandler.bind(this);
  }

  set onEdit(handler) {
    this._onEdit = handler;
  }

  get _template() {
    const isExpired = Date.now() > this._dueDate;
    const isDateDeadlineDisabled = !this._dueDate ? ` disabled` : ``;

    const computedClasses = {
      card: {
        deadline: isExpired ? `card--deadline` : ``,
        repeated: this._isRepeated ? `card--repeat` : ``,
        color: this._color ? `card--${this._color}` : `card--black`,
      },
      others: {
        hasNoPicture: this._picture ? `` : `card__img-wrap--empty`
      }
    };

    const computedClassesToString = (classesObj) => {
      return Object.values(classesObj)
        .join(` `)
        .trim()
        .replace(/\s+/g, ` `);
    };

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
                  <fieldset class="card__date-deadline"${isDateDeadlineDisabled}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${formattedDateTime ? formattedDateTime.dayAndMonth : ``}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${formattedDateTime ? formattedDateTime.time : ``}"
                      />
                    </label>
                  </fieldset>
                </div>
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${hashtagListItems()}
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

  _clickEditBtnHandler() {
    if (this._onEdit && typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _createListeners() {
    const editBtn = this._element.querySelector(`.card__btn--edit`);
    editBtn.addEventListener(`click`, this._clickEditBtnHandler);
  }

  _removeListeners() {
    const editBtn = this._element.querySelector(`.card__btn--edit`);
    editBtn.removeEventListener(`click`, this._clickEditBtnHandler);
  }
}

export default Task;
