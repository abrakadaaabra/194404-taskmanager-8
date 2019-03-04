// Возвращает шаблон фильтра
const getFilterTemplate = (caption, count, isChecked = false, isDisabled = false) => {
  caption = caption.toLowerCase();
  const attributes = {
    id: `filter__${caption}`,
    checked: isChecked ? `checked` : ``,
    disabled: isDisabled ? `disabled` : ``,
    class: `filter__input visually-hidden`,
  };

  const filterTemplate = `
    <input
      type="radio"
      id="${attributes.id}"
      class="${attributes.class}"
      name="filter"
      ${attributes.checked}
      ${attributes.disabled}
    />
    <label for="${attributes.id}" class="filter__label">
      ${caption.toUpperCase()} <span class="filter__${caption}-count">${count}</span>
    </label>
  `;

  return filterTemplate;
};

export default getFilterTemplate;
