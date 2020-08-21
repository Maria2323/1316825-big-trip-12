import {createElement} from "../utils.js";
import {MIN_COUNT_FOR_DATES} from "../const.js";

const getDateMonthYear = (dates) => {
  let arrayFromEventsDates = dates.map(({year, month, date}) => year + `-` + (month < MIN_COUNT_FOR_DATES ? `0` + month : month) + `-` + date);
  arrayFromEventsDates = new Set(arrayFromEventsDates);
  return Array.from(arrayFromEventsDates);
};

const getDate = (dates) => {
  let arrayFromEventsDates = dates.map(({date}) => date);
  arrayFromEventsDates = new Set(arrayFromEventsDates);
  return Array.from(arrayFromEventsDates);
};

const createEventsListTemplate = (date) => {
  let eventListTemplate = ``;
  for (let i = 0; i < getDateMonthYear(date).length; i++) {
    eventListTemplate += `<li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${i + 1}</span>
      <time class="day__date" datetime="${getDateMonthYear(date)[i]}">${getDateMonthYear(date)[i].substr(5, 2)} ${getDate(date)[i]}</time>
      </div>

      <ul class="trip-events__list ${date[i].year} ${date[i].month} ${date[i].date}">
      </ul>
      </li>`;
  }
  return (
    `<ul class="trip-days">
        ${eventListTemplate}
    </ul>`
  );
};

export default class EventList {
  constructor(event) {
    this._event = event;
    this._element = null;
  }
  getTemplate() {
    return createEventsListTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

/*
import {MIN_COUNT_FOR_DATES} from "../const.js";
import {createElement} from "../utils.js";

const generateStartDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  if (startMonth <= MIN_COUNT_FOR_DATES) {
    return startYear + `-` + `0` + startMonth + `-` + startDay;
  } else {
    return startYear + `-` + startMonth + `-` + startDay;
  }
};
const generateDate = (date) => {
  return date.getDate();
};
const generateMonth = (date) => {
  return date.toLocaleString(`en-us`, {month: `short`});
};

const createEventListTemplate = (date, index) => {
  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index}</span>
                <time class="day__date" datetime="${generateStartDate(date)}">${generateMonth(date)} ${generateDate(date)}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>`;
};

const createEventsListTemplate = (event) => {
  const {startDate} = event;
  let eventListTemplate = ``;
  for (let i = 1; i < 4; i++) {

    eventListTemplate += createEventListTemplate(startDate, i);
  }
  return (
    `<ul class="trip-days">
        ${eventListTemplate}
    </ul>`
  );
};

export default class EventList {
  constructor(event) {
    this._event = event;
    this._element = null;
  }
  getTemplate() {
    return createEventsListTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
*/
