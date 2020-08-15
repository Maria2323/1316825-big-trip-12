import {events} from "../main.js";

export const createTripInfoTemplate = () => {
  const pricesPoints = events.map(({price, offers}) => price + offers.reduce((a, b) => {
    return (a.price || 0) + (b.price || 0);
  }, 0)).reduce((a, b) => {
    return a + b;
  });
  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${pricesPoints}</span>
            </p>
          </section>`
  );
};
