import AbstractView from "./abstract.js";

const getDateMonthYear = (dates) => {
  let arrayFromEventsDates = dates.map(({year, month, date}) => year + `-` + month.toString().padStart(2, `0`) + `-` + date);
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
}
