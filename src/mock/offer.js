import {getRandomArrayElements} from './utils';

const OFFERS = [
  {title: `luggage`, fullTitle: `Add luggage`, price: 30},
  {title: `comfort`, fullTitle: `Switch to comfort class`, price: 100},
  {title: `meal`, fullTitle: `Add meal`, price: 15},
  {title: `seats`, fullTitle: `Choose seats`, price: 5},
  {title: `train`, fullTitle: `Travel by train`, price: 40},
];

const POINT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const offersByPointTypes = POINT_TYPES.map((pointType) => {
  return {
    type: pointType,
    offers: getRandomArrayElements(OFFERS),
  };
});

export {offersByPointTypes};
