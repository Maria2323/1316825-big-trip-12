import EventEditView from "../view/event-edit.js";
import EventView from "../view/event.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {remove} from "../utils/utils.js";

export default class Event {
  constructor(tripContainerComponent, changeData) {
    this._tripContainerComponent = tripContainerComponent;
    this._changeData = changeData;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;
    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._tripContainerComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripContainerComponent.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._tripContainerComponent.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToEvent();
  }
}
