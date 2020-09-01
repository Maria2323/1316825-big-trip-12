import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortInputTemplate = (type, currentType) => {
  const checked = type === currentType ? `checked` : ``;
  return `<input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${checked}>`;
};

const createSortTemplate = (currentType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">Day</span>

            <div class="trip-sort__item  trip-sort__item--event">
              ${createSortInputTemplate(SortType.EVENT, currentType)}
              <label class="trip-sort__btn" for="sort-${SortType.EVENT}" data-sort-type="${SortType.EVENT}">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              ${createSortInputTemplate(SortType.TIME, currentType)}
              <label class="trip-sort__btn" for="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}">
                Time
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              ${createSortInputTemplate(SortType.PRICE, currentType)}
              <label class="trip-sort__btn" for="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}">
                Price
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortTemplate();
  }
  _sortTypeChangeHandler(evt) {
    if (!evt.target.classList.contains(`trip-sort__btn`)) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
