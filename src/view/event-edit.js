import {MIN_COUNT_FOR_DATES} from "../const.js";
import {getOffersByPointType, destinations} from "../mock/point";
import SmartView from "./smart";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const availableCities = destinations.map((destination) => {
  return destination.city;
});

const typesTransfer = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];

const typesActivity = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const createEventEditOfferTemplate = (offers) => {
  return offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${offers === offer.fullTitle ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offer.title}-1">
    <span class="event__offer-title">${offer.fullTitle}</span>
    &plus;
&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`).join(``);
};

const createEventEditTypeTransferTemplate = (currentType) => {
  return typesTransfer.map((type, index) => `<div class="event__type-item">
                              <input id="event-type-${type.toLowerCase()}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${currentType === type.toLowerCase() ? `checked` : ``}>
                              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${index + 1}">${type}</label>
                            </div>`).join(``);
};
const createEventEditTypeActivityTemplate = (currentType) => {
  return typesActivity.map((type, index) => `<div class="event__type-item">
                              <input id="event-type-check-in-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${currentType === type.toLowerCase() ? `checked` : ``}>
                              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${index + 1}">${type}</label>
                            </div>`).join(``);
};

const generateStartDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (startMonth <= MIN_COUNT_FOR_DATES) {
    return startDay + `/` + `0` + (startMonth + 1) + `/` + startYear + ` ` + hours + `:` + minutes + ` `;
  } else {
    return startDay + `/` + (startMonth + 1) + `/` + startYear + ` ` + hours + `:` + minutes;
  }
};
const generateEndDate = (date) => {
  const endYear = date.getFullYear();
  const endMonth = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const endDay = date.getDate();
  if (endMonth <= MIN_COUNT_FOR_DATES) {
    return endDay + `/` + `0` + (endMonth + 1) + `/` + endYear + ` ` + hours + `:` + minutes;
  } else {
    return endDay + `/` + (endMonth + 1) + `/` + endYear + ` ` + hours + `:` + minutes;
  }
};

const getPhotosMarkup = (imageLinks) => {
  return imageLinks.map((link) => {
    return (
      `<img class="event__photo" src="${link}" alt="Event photo">`
    );
  }).join(``);
};

const createEventEditTemplate = (event) => {
  const {type, destination, offers, price, startDate, endDate, isFavorite} = event;
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
  const iconType = `${type}.png`;
  const offerTemplate = createEventEditOfferTemplate(offers);
  const typeTransferTemplate = createEventEditTypeTransferTemplate(type);
  const typeActivityTemplate = createEventEditTypeActivityTemplate(type);
  const randomStartDate = generateStartDate(startDate);
  const randomEndDate = generateEndDate(endDate);
  const favoriteChecked = isFavorite ? `checked` : ``;

  return (
    `<li class="trip-events__item opened">
                  <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${iconType}" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>

                            ${typeTransferTemplate}

                          </fieldset>

                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>

                            ${typeActivityTemplate}

                          </fieldset>
                        </div>
                      </div>

                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                           ${type} ${eventTypeArticle}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          <option value="Amsterdam"></option>
                          <option value="Geneva"></option>
                          <option value="Chamonix"></option>
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${randomStartDate}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${randomEndDate}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteChecked}>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>

                    <section class="event__details">
                      <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">

                          ${offerTemplate}

                        </div>
                      </section>
                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${destination.description}</p>
                        <div class="event__photos-container">
                           <div class="event__photos-tape">
                             ${getPhotosMarkup(destination.images)}
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>
                </li>`
  );
};

export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._event = event;
    this._datepicker = null;
    this._setInnerHandlers();
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._setDatepicker();
  }
  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, this._favoriteClickHandler);
  }
  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
    if (this._event.startDate) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            enableTime: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._event.startDate,
            onChange: this._startDateChangeHandler
          }
      );
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            enableTime: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._event.endDate,
            onChange: this._endDateChangeHandler
          }
      );
    }
  }

  _startDateChangeHandler(selectedDates) {
    this.updateData({
      startDate: selectedDates[0]
    });
  }

  _endDateChangeHandler(selectedDates) {
    this.updateData({
      endDate: selectedDates[0]
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      const target = evt.target;
      const typeCheckbox = target && target.closest(`.event__type-input`) ? target : null;

      if (typeCheckbox) {

        const type = typeCheckbox.value;
        const offers = getOffersByPointType(type);

        this.updateData({
          type,
          offers
        });
      }
    });

    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      const destinationInput = evt.currentTarget;

      if (availableCities.includes(destinationInput.value)) {
        const city = destinationInput.value;
        const cityIndex = destinations.findIndex((destination) => {
          return destination.city === city;
        });
        const destination = destinations[cityIndex];

        this.updateData({
          destination
        });
      }
    });

    this.getElement().querySelector(`.event__input--destination`).addEventListener(`click`, (evt) => {
      const destinationInput = evt.currentTarget;

      destinationInput.value = ``;
    });
  }
}
