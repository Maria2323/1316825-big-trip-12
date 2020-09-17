import TripInfoView from "./view/trip-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import {points as events} from "./mock/point.js";
import {RenderPosition, render} from "./utils/render.js";

events.sort((a, b) => {
  return a.startDate - b.startDate;
});

const mainHeaderElement = document.querySelector(`.trip-main`);
const menuAndFilterElement = mainHeaderElement.querySelector(`.trip-main__trip-controls`);

render(mainHeaderElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
render(menuAndFilterElement, new MenuView(), RenderPosition.BEFOREEND);
render(menuAndFilterElement, new FilterView(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElements = pageMainElement.querySelector(`.trip-events`);

const tripContainerElement = new TripPresenter(tripEventsElements);
tripContainerElement.init(events);
