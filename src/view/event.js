const createOfferTemplate = (offers) => {
  return offers.slice(0, 3).map(({name, price}) => `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;
&euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`).join(``);
};

const durationTimeDisplay = (endTime, startTime) => {
  const duration = new Date(endTime) - new Date(startTime);
  const minutes = ((duration / (1000 * 60)) % 60);
  const hours = ((duration / (1000 * 60 * 60)) % 24);
  const days = (duration / (1000 * 60 * 60 * 24));
  if (Math.floor(days) > 0) {
    return Math.floor(days) + `D ` + Math.floor(hours) + `H ` + Math.floor(minutes) + `M`;
  } else if (Math.floor(days) <= 0 && Math.floor(hours) > 0) {
    return Math.floor(hours) + `H ` + Math.floor(minutes) + `M`;
  } else if (Math.floor(days) <= 0 && Math.floor(hours) <= 0 && Math.floor(minutes) > 0) {
    return Math.floor(minutes) + `M`;
  } else {
    return ``;
  }
};

const generateStartDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  if (startMonth <= 9) {
    return startYear + `-` + `0` + startMonth + `-` + startDay;
  } else {
    return startYear + `-` + startMonth + `-` + startDay;
  }
};
const generateEndDate = (date) => {
  const endYear = date.getFullYear();
  const endMonth = date.getMonth();
  const endDay = date.getDate() < 21 ? date.getDate() + Math.floor(Math.random() * 10) : date.getDate() + Math.floor(Math.random() * 3);
  if (endMonth <= 9) {
    return endYear + `-` + `0` + endMonth + `-` + endDay;
  } else {
    return endYear + `-` + endMonth + `-` + endDay;
  }
};
const generateTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes < 10) {
    return hours + `:` + `0` + minutes;
  } else {
    return hours + `:` + minutes;
  }
};

export const createEventTemplate = (event) => {
  const {type, city, destination, price, offers, startDate, endDate, startTime, endTime} = event;
  let eventTypeArticle = ``;
  switch (type) {
    case `Taxi`:
    case `Bus`:
    case `Train`:
    case `Ship`:
    case `Transport`:
    case `Drive`:
    case `Flight`:
      eventTypeArticle = `to`;
      break;
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      eventTypeArticle = `in`;
      break;
  }

  const durationTimeTemplate = durationTimeDisplay(endTime, startTime);
  const randomStartDate = generateStartDate(startDate);
  const randomEndDate = generateEndDate(endDate);
  const randomStartTime = generateTime(startDate);
  const randomEndTime = generateTime(endDate);
  const offerTemplate = createOfferTemplate(offers);
  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src=${destination.image} alt="Event type icon">
                    </div>
                    <h3 class="event__title">${type} ${eventTypeArticle} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${randomStartDate}T${randomStartTime}">${randomStartTime}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${randomEndDate}T${randomEndTime}">${randomEndTime}</time>
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
