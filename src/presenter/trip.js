import SortView from "../view/sort.js";
import EventListView from "../view/events-list.js";
import EventEditView from "../view/event-edit.js";
import EventView from "../view/event.js";
import NoPointsView from "../view/no-points.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripContainerComponent, arrayFromEvents) {
    this._tripContainerComponent = tripContainerComponent;
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView(arrayFromEvents);
    this._noPointsComponent = new NoPointsView();
  }
  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
  }
  _renderSort() {
    render(this._tripContainerComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }
  _renderEvent(event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const closeEventEdit = () => {
      const openedEventEdit = document.querySelector(`.opened`);
      if (openedEventEdit) {
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      closeEventEdit();
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._eventListComponent, eventComponent, RenderPosition.BEFOREEND);
  }
  _renderEvents(from, to) {
    this._tripEvents
      .slice(from, to)
      .forEach((tripEvent) => this._renderEvent(tripEvent));
  }
  _renderNoPoints() {
    render(this._tripContainerComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }
  _renderTripContainer() {
    if (this._tripEvents.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}
