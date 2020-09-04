import SortView from "../view/sort.js";
import EventListView from "../view/events-list.js";
import EventEditView from "../view/event-edit.js";
import EventView from "../view/event.js";
import NoPointsView from "../view/no-points.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortEventsPrice, sortEventsTime} from "../utils/utils.js";
import {events} from "../main";

export const createSortedEvents = () => {
  const sortedEvents = [];
  const counter = {
    date: ``,
    month: ``,
    year: ``
  };
  for (let i = 0; i < events.length; i++) {
    if (events[i].startDate.getFullYear() === counter.year
      && events[i].startDate.getMonth() === counter.month
      && events[i].startDate.getDate() === counter.date) {
      sortedEvents[sortedEvents.length - 1].points.push(events[i]);
    } else {
      counter.date = events[i].startDate.getDate();
      counter.month = events[i].startDate.getMonth();
      counter.year = events[i].startDate.getFullYear();
      sortedEvents.push(Object({
        year: events[i].startDate.getFullYear(),
        month: events[i].startDate.getMonth(),
        date: events[i].startDate.getDate(),
        points: [events[i]]
      }));
    }
  }
  return sortedEvents;
};

export default class Trip {
  constructor(tripContainerComponent) {
    this._tripContainerComponent = tripContainerComponent;
    this._sortComponent = new SortView();
    this._sortedEvents = createSortedEvents();
    this._eventListComponent = new EventListView(this._sortedEvents);
    this._noPointsComponent = new NoPointsView();
    this._dayContainers = this._eventListComponent.getDayContainers();
    this._currentSortType = SortType.EVENT;
    this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._renderedEvents = this._sortedEvents;
    this._tripEvents = tripEvents.slice();
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderSort();
    this._renderTripContainer();
    this._sortComponent.setDayText(`day`);
  }

  _eventsSort(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._renderedEvents = [{points: this._tripEvents.sort(sortEventsPrice), date: ``, month: ``}];
        break;
      case SortType.TIME:
        this._renderedEvents = [{points: this._tripEvents.sort(sortEventsTime), date: ``, month: ``}];
        break;
      default:
        this._renderedEvents = this._sortedEvents.slice();
    }
    this._currentSortType = sortType;
  }

  handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._eventsSort(sortType);
    this._clearEventsList();
    this._eventListComponent = new EventListView(this._renderedEvents);
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._dayContainers = this._eventListComponent.getDayContainers();
    this._sortComponent.setDayText(``);
    this._renderTripContainer();
  }

  _renderSort() {
    render(this._tripContainerComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this.handleSortTypeChange);
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

  _renderNoPoints() {
    render(this._tripContainerComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    this._eventListComponent.getElement().remove();
  }

  _renderTripContainer() {
    if (this._tripEvents.length === 0) {
      this._renderNoPoints();
      return;
    }
    this._dayContainers.forEach((dayContainer, index) => {
      for (let i = 0; i < this._renderedEvents[index].points.length; i++) {
        this._renderEvent(dayContainer, this._renderedEvents[index].points[i]);
      }
    });
  }
}
