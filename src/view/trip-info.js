import {points} from "../mock/point.js";
import AbstractView from "./abstract.js";

const createTripInfoTemplate = () => {
  const pricesPoints = points.length === 0 ? 0 : points.map(({price, offers}) => price + offers.reduce((a, b) => {
    return (a.price || 0) + (b.price || 0);
  }, 0)).reduce((a, b) => {
    return a + b;
  });
  return points.length === 0 ? (
    `<section class="trip-main__trip-info  trip-info">
           <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${pricesPoints}</span>
            </p>
          </section>`) : (
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

export default class TripInfo extends AbstractView {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
