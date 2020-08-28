import TripInfoView from "./view/trip-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
/*import SortView from "./view/sort.js";
import EventListView from "./view/events-list.js";
import EventEditView from "./view/event-edit.js";
import EventView from "./view/event.js";
import NoPointsView from "./view/no-points.js";*/
import {generateEvent} from "./mock/event.js";
import {RenderPosition, render} from "./utils/render.js";

const EVENTS_COUNT = 20;

export const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

events.sort((a, b) => {
  return a.startDate - b.startDate;
});

const arrayFromEvents = [];
const counter = {
  date: ``,
  month: ``,
  year: ``
};
for (let i = 0; i < events.length; i++) {
  if (events[i].startDate.getFullYear() === counter.year
    && events[i].startDate.getMonth() === counter.month
    && events[i].startDate.getDate() === counter.date) {
    arrayFromEvents[arrayFromEvents.length - 1].points.push(events[i]);
  } else {
    counter.date = events[i].startDate.getDate();
    counter.month = events[i].startDate.getMonth();
    counter.year = events[i].startDate.getFullYear();
    arrayFromEvents.push(Object({
      year: events[i].startDate.getFullYear(),
      month: events[i].startDate.getMonth(),
      date: events[i].startDate.getDate(),
      points: [events[i]]
    }));
  }
}

/*export const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
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

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};*/

const mainHeaderElement = document.querySelector(`.trip-main`);
const menuAndFilterElement = mainHeaderElement.querySelector(`.trip-main__trip-controls`);

render(mainHeaderElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
render(menuAndFilterElement, new MenuView(), RenderPosition.BEFOREEND);
render(menuAndFilterElement, new FilterView(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElements = pageMainElement.querySelector(`.trip-events`);

const tripContainerElement = new TripPresenter(tripEventsElements, arrayFromEvents);
tripContainerElement.init(events);

/*if (events.length === 0) {
  render(pageMainElement, new NoPointsView(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElements, new SortView(), RenderPosition.BEFOREEND);
  render(tripEventsElements, new EventListView(arrayFromEvents), RenderPosition.BEFOREEND);

  const eventListElements = pageMainElement.querySelectorAll(`.trip-events__list`);

  Array.from(eventListElements).forEach((eventListElement, index) => {
    for (let i = 0; i < arrayFromEvents[index].points.length; i++) {
      renderEvent(eventListElement, arrayFromEvents[index].points[i]);
    }
  });
}*/
