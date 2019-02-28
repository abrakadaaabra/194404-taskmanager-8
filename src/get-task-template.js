import mockTaskData from './mock-task-data';
import {
  objectHasValue
} from './utils';

// Возвращает шаблон карточки задачи
const getTaskTemplate = (data, id) => {
  const {
    description,
    dueDate,
    hashtags,
    picture,
    color,
    repeatingDays
  } = data;

  const isExpired = Date.now() > dueDate;
  const isRepeated = objectHasValue(repeatingDays, true);

  const classes = {
    deadline: isExpired ? `card--deadline` : ``,
    repeated: isRepeated ? `card--repeat` : ``,
    color: color ? `card--${color}` : `card--black`,
    hasNoPicture: picture ? `` : `card__img-wrap--empty`
  };

  const hasDueDate = () => dueDate ? `yes` : `no`;
  const hasRepeatingDays = () => isRepeated ? `yes` : `no`;

  const taskTemplateParts = {};

  taskTemplateParts.control = `
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

  taskTemplateParts.colorBar = `
    <div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
      </svg>
    </div>
  `;

  taskTemplateParts.textareaWrap = `
    <div class="card__textarea-wrap">
      <label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="text"
        >${description}</textarea>
      </label>
    </div>
  `;

  taskTemplateParts.dateDeadlineToggle = `
      <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${hasDueDate()}</span>
      </button>

      <fieldset class="card__date-deadline" disabled>
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="23 September"
            name="date"
          />
        </label>
        <label class="card__input-deadline-wrap">
          <input
            class="card__time"
            type="text"
            placeholder="11:15 PM"
            name="time"
          />
        </label>
      </fieldset>
    `;

  taskTemplateParts.repeatDayInput = () => Object.keys(repeatingDays).map((day) => `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${id}"
        name="repeat"
        value="${day}"
      />
      <label class="card__repeat-day" for="repeat-${day}-${id}"
        >${day}</label
      >
    `).join(``);

  taskTemplateParts.repeatToggle = `
      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${hasRepeatingDays()}</span>
      </button>

      <fieldset class="card__repeat-days" disabled>
        <div class="card__repeat-days-inner">
          ${taskTemplateParts.repeatDayInput()}
        </div>
      </fieldset>
    `;

  taskTemplateParts.dates = `
    <div class="card__dates">
      ${taskTemplateParts.dateDeadlineToggle}
      ${taskTemplateParts.repeatToggle}
    </div>
  `;

  taskTemplateParts.hashtagInner = () => [...hashtags].map((hashtag) => `
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

  taskTemplateParts.hashtag = `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${taskTemplateParts.hashtagInner()}
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

  taskTemplateParts.details = `
    <div class="card__details">
      ${taskTemplateParts.dates}
      ${taskTemplateParts.hashtag}
    </div>
  `;

  taskTemplateParts.imgWrap = `
    <label class="card__img-wrap ${classes.hasNoPicture}">
      <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
      />
      <img
        src="${picture}"
        alt="task picture"
        class="card__img"
      />
    </label>
  `;

  taskTemplateParts.colorsInputs = mockTaskData.colors.map((inputColor) => `
    <input
      type="radio"
      id="color-${inputColor}-${id}"
      class="card__color-input card__color-input--${inputColor} visually-hidden"
      name="color"
      value="${inputColor}"
      checked
    />
    <label
      for="color-${inputColor}-${id}"
      class="card__color card__color--${inputColor}"
      >${inputColor}</label
    >
  `).join(``);

  taskTemplateParts.colorsInner = `
    <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${taskTemplateParts.colorsInputs}
      </div>
    </div>
  `;

  taskTemplateParts.settings = `
    <div class="card__settings">
      ${taskTemplateParts.details}
      ${taskTemplateParts.imgWrap}
      ${taskTemplateParts.colorsInner}
    </div>
  `;

  taskTemplateParts.statusBtns = `
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  `;

  const taskTemplate = `
    <article class="card ${classes.deadline} ${classes.repeated} ${classes.color}">
      <form class="card__form" method="get">
        <div class="card__inner">
          ${taskTemplateParts.control}
          ${taskTemplateParts.colorBar}
          ${taskTemplateParts.textareaWrap}
          ${taskTemplateParts.settings}
          ${taskTemplateParts.statusBtns}
        </div>
      </form>
    </article>
  `;

  return taskTemplate;
};

export default getTaskTemplate;
