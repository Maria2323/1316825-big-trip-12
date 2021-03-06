import SortView from "../view/sort.js";
import EventPresenter from "../presenter/event.js";
import EventListView from "../view/events-list.js";
import NoPointsView from "../view/no-points.js";
import {RenderPosition, render} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortEventsPrice, sortEventsTime, updateItem} from "../utils/utils.js";
import {points} from "../mock/point.js";

export const createSortedEvents = () => {
  const sortedEvents = [];
  const counter = {
    date: ``,
    month: ``,
    year: ``
  };
  for (let i = 0; i < points.length; i++) {
    if (points[i].startDate.getFullYear() === counter.year
      && points[i].startDate.getMonth() === counter.month
      && points[i].startDate.getDate() === counter.date) {
      sortedEvents[sortedEvents.length - 1].points.push(points[i]);
    } else {
      counter.date = points[i].startDate.getDate();
      counter.month = points[i].startDate.getMonth();
      counter.year = points[i].startDate.getFullYear();
      sortedEvents.push(Object({
        year: points[i].startDate.getFullYear(),
        month: points[i].startDate.getMonth(),
        date: points[i].startDate.getDate(),
        points: [points[i]]
      }));
    }
  }
  return sortedEvents;
};

export default class Trip {
  constructor(tripContainerComponent) {
    this._tripContainerComponent = tripContainerComponent;
    this._eventPresenter = {};
    this._sortComponent = new SortView();
    this._sortedEvents = createSortedEvents();
    this._eventListComponent = new EventListView(this._sortedEvents);
    this._noPointsComponent = new NoPointsView();
    this._dayContainers = this._eventListComponent.getDayContainers();
    this._currentSortType = SortType.EVENT;
    this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
    this._handleTaskChange = this._handleTaskChange.bind(this);
  }

  init(tripEvents) {
    this._renderedEvents = this._sortedEvents.slice();
    this._tripEvents = tripEvents.slice();
    render(this._tripContainerComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderSort();
    this._renderTripContainer();
    this._sortComponent.setDayText(`day`);
  }

  _handleTaskChange(updatedTask) {
    this._tripEvents = updateItem(this._tripEvents, updatedTask);
    this._renderedEvents = updateItem(this._renderedEvents, updatedTask);
    this._eventPresenter[updatedTask.id].init(updatedTask);
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
    const eventPresenter = new EventPresenter(dayContainer, this._handleTaskChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
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
