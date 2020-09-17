import AbstractView from "./abstract";

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._event = {};
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    let oldElement = this.getElement();
    const parent = oldElement.parentNode;
    this.removeElement();
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
    oldElement = null;

    this.restoreHandlers();
  }

  updateData(updatedData, justUpdating) {
    if (!updatedData) {
      return;
    }

    this._event = Object.assign(
        {},
        this._event,
        updatedData
    );

    if (justUpdating) {
      return;
    }

    this.updateElement();
  }
}
