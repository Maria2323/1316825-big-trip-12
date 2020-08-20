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

const createEventsListTemplate = (event) => {
  const {startDate} = event;
  const randomStartDate = generateStartDate(startDate);
  const randomDate = generateDate(startDate);
  const randomMonth = generateMonth(startDate);
  return (
    `<ul class="trip-days">
            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">1</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>

            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">2</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>

            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">3</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>
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
