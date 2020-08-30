import SortView from "../view/sort.js";
import EventListView from "../view/events-list.js";
import EventEditView from "../view/event-edit.js";
import EventView from "../view/event.js";
import NoPointsView from "../view/no-points.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortEventsPrice, sortEventsTime} from "../utils/utils.js";

export default class Trip {
  constructor(tripContainerComponent, arrayFromEvents) {
    this._tripContainerComponent = tripContainerComponent;
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView(arrayFromEvents);
    this._noPointsComponent = new NoPointsView();
    this._dayContainers = this._eventListComponent.getDayContainers();
    this._arrayFromEvents = arrayFromEvents;
    this._currentSortType = SortType.EVENT;
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTripContainer();
  }

  _eventsSort(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    switch (sortType) {
      case SortType.PRICE:
        this._tripEvents.sort(sortEventsPrice);
        break;
      case SortType.TIME:
        this._tripEvents.sort(sortEventsTime);
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
    }
    this._currentSortType = sortType;
  }
  _handleSortTypeChange(sortType) {
    this._eventsSort(sortType);
  }
  _renderSort() {
    render(this._tripContainerComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
  _renderEvent(dayContainer, event) {
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

    render(dayContainer, eventComponent, RenderPosition.BEFOREEND);
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
    Array.from(this._dayContainers).forEach((dayContainer, index) => {
      for (let i = 0; i < this._arrayFromEvents[index].points.length; i++) {
        this._renderEvent(dayContainer, this._arrayFromEvents[index].points[i]);
      }
    });
  }
}
