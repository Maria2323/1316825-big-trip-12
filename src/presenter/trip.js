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
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._renderEvents = this._renderEvents.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTripContainer();
  }

  _eventsSort(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._tripEvents = {points: this._tripEvents.sort(sortEventsPrice), day: ``, month: ``};
        break;
      case SortType.TIME:
        this._tripEvents = {points: this._tripEvents.sort(sortEventsTime), day: ``, month: ``};
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._eventsSort(sortType);
    this._sortComponent.setSomeMarkup(``);
    this._clearEventsList();
    this._renderEvents();
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
    this._tripEvents.points
      .slice(from, to)
      .forEach((tripEvent) => this._renderEvent(this._eventListComponent, tripEvent));
  }

  _renderNoPoints() {
    render(this._tripContainerComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    this._eventListComponent.innerHTML = ``;
  }

  _renderTripContainer() {
    if (this._tripEvents.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._sortComponent.setSomeMarkup(`day`);
    Array.from(this._dayContainers).forEach((dayContainer, index) => {
      for (let i = 0; i < this._arrayFromEvents[index].points.length; i++) {
        this._renderEvent(dayContainer, this._arrayFromEvents[index].points[i]);
      }
    });
  }
}
