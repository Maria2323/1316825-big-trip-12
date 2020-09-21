import AbstractView from "./abstract.js";
import moment from "moment";

const getDateMonthYear = (dates) => {
  let arrayFromEventsDates = dates.map(({year, month, date}) => year + `-` + ((month + 1).toString().padStart(2, `0`)) + `-` + date);
  arrayFromEventsDates = new Set(arrayFromEventsDates);
  return Array.from(arrayFromEventsDates);
};

const getDate = (dates) => {
  let arrayFromEventsDates = dates.map(({date}) => date);
  arrayFromEventsDates = new Set(arrayFromEventsDates);
  return Array.from(arrayFromEventsDates);
};

const getMonth = (dates) => {
  let arrayFromEventsDates = dates.points.map(({startDate}) => moment(startDate).format(`MMM`));
  arrayFromEventsDates = new Set(arrayFromEventsDates);
  return Array.from(arrayFromEventsDates);
};

const createEventsListTemplate = (date) => {
  let eventListTemplate = ``;
  for (let i = 0; i < date.length; i++) {
    eventListTemplate += `<li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${date[i].date ? i + 1 : ``}</span>
      <time class="day__date" datetime="${getDateMonthYear(date)[i]}">${date[i].date ? getMonth(date[i]) + ` ` + getDate(date)[i] : ``}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
      </li>`;
  }
  return (
    `<ul class="trip-days">
        ${eventListTemplate}
    </ul>`
  );
};

export default class EventList extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventsListTemplate(this._event);
  }

  getDayContainers() {
    return this.getElement().querySelectorAll(`.trip-events__list`);
  }
}
