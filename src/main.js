import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventsListTemplate} from "./view/events-list.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventTemplate} from "./view/event.js";

const EVENTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainHeaderElement = document.querySelector(`.trip-main`);
const menuAndFilterElement = mainHeaderElement.querySelector(`.trip-main__trip-controls`);

render(mainHeaderElement, createTripInfoTemplate(), `afterbegin`);
render(menuAndFilterElement, createMenuTemplate(), `beforeend`);
render(menuAndFilterElement, createFilterTemplate(), `beforeend`);

const pageMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElements = pageMainElement.querySelector(`.trip-events`);

render(tripEventsElements, createSortTemplate(), `beforeend`);
render(tripEventsElements, createEventsListTemplate(), `beforeend`);

const tripEventsListElement = pageMainElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createEventEditTemplate(), `beforeend`);
for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsListElement, createEventTemplate(), `beforeend`);
}
