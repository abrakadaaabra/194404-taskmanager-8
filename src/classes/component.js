class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get _template() {
    throw new Error(`You have to define template.`);
  }

  _createElement() {
    const tmpElement = document.createElement(`div`);
    tmpElement.innerHTML = this._template;

    const element = tmpElement.firstElementChild;

    return element;
  }

  render() {
    this._element = this._createElement();
    this._addEventHandlers();

    return this._element;
  }

  unrender() {
    this._removeEventHandlers();
    this._element.remove();
    this._element = null;
  }

  _addEventHandlers() {}

  _removeEventHandlers() {}

  update() {}
}

export default Component;
