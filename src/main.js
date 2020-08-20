import TripInfoView from "./view/trip-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import EventListView from "./view/events-list.js";
import EventEditView from "./view/event-edit.js";
import EventView from "./view/event.js";
import {generateEvent} from "./mock/event.js";
import {RenderPosition, render} from "./utils.js";

const EVENTS_COUNT = 20;

export const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const arrayFromEvents = [];
const arraySameEvents = [];
for (let i = 0; i < events.length; i++) {
  arrayFromEvents.push(Object({month: events[i].startDate.getMonth(), date: events[i].startDate.getDate(), sameEvents: arraySameEvents}));
}

const renderEvent = (eventListElement, event) => {
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

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainHeaderElement = document.querySelector(`.trip-main`);
const menuAndFilterElement = mainHeaderElement.querySelector(`.trip-main__trip-controls`);

render(mainHeaderElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
render(menuAndFilterElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(menuAndFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElements = pageMainElement.querySelector(`.trip-events`);

render(tripEventsElements, new SortView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElements, new EventListView().getElement(events[0]), RenderPosition.BEFOREEND);
const eventListComponent = new EventListView();

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}
