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

  _createElement(template) {
    const tmpElement = document.createElement(`div`);
    tmpElement.innerHTML = template;

    const element = tmpElement.firstElementChild;

    return element;
  }

  render() {
    this._element = this._createElement(this._template);
    this._createListeners();

    return this._element;
  }

  unrender() {
    this._removeListeners();
    this._element.remove();
    this._element = null;
  }

  _createListeners() {}

  _removeListeners() {}
}

export default Component;
