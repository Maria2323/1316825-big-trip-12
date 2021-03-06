import {MIN_COUNT_FOR_DATES} from "../const.js";
import AbstractView from "./abstract.js";
import moment from "moment";

const createOfferTemplate = (offers) => {
  return offers.slice(0, 3).map((offer) => `<li class="event__offer">
    <span class="event__offer-title">${offer.fullTitle}</span>
    &plus;
&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`).join(``);
};

const durationTimeDisplay = (endDate, startDate) => {
  const duration = new Date(endDate).getTime() - new Date(startDate).getTime();
  const days = new Date(duration).getDate();
  const hours = new Date(duration).getHours();
  const minutes = new Date(duration).getMinutes();
  if (Math.floor(days) > 0 && Math.floor(hours) > 0) {
    return moment(duration).format(`DD\\D\\ HH\\H\\:ii\\M\\`);
  } else if (Math.floor(days) <= 0 && Math.floor(hours) > 0) {
    return moment(duration).format(`HH\\H\\:ii\\M\\`);
  } else if (Math.floor(days) <= 0 && Math.floor(hours) <= 0 && Math.floor(minutes) > 0) {
    return moment(duration).format(`ii\\M\\`);
  } else {
    return ``;
  }
};

const generateDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (startMonth <= MIN_COUNT_FOR_DATES && minutes > MIN_COUNT_FOR_DATES) {
    return startYear + `-` + `0` + startMonth + `-` + startDay + `T` + hours + `:` + minutes;
  } else if (startMonth <= MIN_COUNT_FOR_DATES && minutes <= MIN_COUNT_FOR_DATES) {
    return startYear + `-` + `0` + startMonth + `-` + startDay + `T` + hours + `:` + `0` + minutes;
  } else if (startMonth > MIN_COUNT_FOR_DATES && minutes <= MIN_COUNT_FOR_DATES) {
    return startYear + `-` + startMonth + `-` + startDay + `T` + hours + `:` + `0` + minutes;
  } else {
    return startYear + `-` + startMonth + `-` + startDay + `T` + hours + `:` + minutes;
  }
};

const generateTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes <= MIN_COUNT_FOR_DATES) {
    return hours + `:` + `0` + minutes;
  } else {
    return hours + `:` + minutes;
  }
};

const createEventTemplate = (event) => {
  const {type, destination, price, offers, startDate, endDate} = event;
  const {city} = destination;
  let eventTypeArticle = ``;
  switch (type) {
    case `taxi`:
    case `bus`:
    case `train`:
    case `ship`:
    case `transport`:
    case `drive`:
    case `flight`:
      eventTypeArticle = `to`;
      break;
    case `check-in`:
    case `sightseeing`:
    case `restaurant`:
      eventTypeArticle = `in`;
      break;
  }

  const randomStartDate = generateDate(startDate);
  const randomEndDate = generateDate(endDate);
  const randomStartTime = generateTime(startDate);
  const randomEndTime = generateTime(endDate);
  const durationTimeTemplate = durationTimeDisplay(endDate, startDate);
  const offerTemplate = createOfferTemplate(offers);
  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src=${destination.images} alt="Event type icon">
                    </div>
                    <h3 class="event__title">${type} ${eventTypeArticle} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${randomStartDate}">${randomStartTime}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${randomEndDate}">${randomEndTime}</time>
                      </p>
                      <p class="event__duration">${durationTimeTemplate}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${offerTemplate}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`
  );
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }
  getTemplate() {
    return createEventTemplate(this._event);
  }
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
