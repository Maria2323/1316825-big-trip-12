import {getRandomBool, getRandomInteger, getRandomArrayElement, getRandomArrayElements} from './utils';
import {offersByPointTypes} from "./offer";

const MILLISECONDS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const POINT_AMOUNT = 25;

const CITIES = [
  `Amsterdam`,
  `Moscow`,
  `Paris`,
  `Beijing`,
  `Seoul`,
  `Anatananarivu`,
  `Toronto`,
  `Chamonix`,
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

const OFFERS = [
  {title: `luggage`, fullTitle: `Add luggage`, price: 30},
  {title: `comfort`, fullTitle: `Switch to comfort class`, price: 100},
  {title: `meal`, fullTitle: `Add meal`, price: 15},
  {title: `seats`, fullTitle: `Choose seats`, price: 5},
  {title: `train`, fullTitle: `Travel by train`, price: 40},
];

const DESTINATION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
;

let nextStartTime = new Date();

const getRandomSentences = (text) => {
  const allSentences = text.split(`.`).map((sentence) => sentence.trim()).filter((sentence) => Boolean(sentence));
  const randomSentences = getRandomArrayElements(allSentences, 1, 5);

  return `${randomSentences.join(`. `)}.`;
};

const getRandomImages = () => {
  const images = [];

  for (let i = 0; i < getRandomInteger(0, 7); i++) {
    images.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return images;
};

const getRandomDate = (fromTime) => {
  const minuteFactor = MILLISECONDS * SECONDS_IN_MINUTE;
  const hourFactor = MILLISECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
  const hoursDifference = getRandomBool() ? getRandomInteger(0, 16) * hourFactor : 0;
  const additionalDifference = getRandomBool() ? hoursDifference : 0;

  const currentTimestamp = fromTime ? fromTime.getTime() : (new Date()).getTime();
  const randomTimestamp = currentTimestamp + getRandomInteger(0, 59) * minuteFactor + additionalDifference;

  return new Date(randomTimestamp);
};

const getPointDates = () => {
  const startTime = getRandomDate(nextStartTime);
  const endTime = getRandomDate(startTime);

  nextStartTime = endTime;

  return {
    startTime,
    endTime,
  };
};

const getOffersByPointType = (pointType) => {
  const pointTypeIndex = offersByPointTypes.findIndex(({type}) => {
    return type === pointType;
  });

  return offersByPointTypes[pointTypeIndex].offers;
};

const destinations = CITIES.map((city) => {
  return {
    city,
    description: getRandomSentences(DESTINATION_TEXT),
    images: getRandomImages(),
  };
});

const generatePoint = (index) => {
  const {startTime, endTime} = getPointDates();
  const pointTitle = getRandomArrayElement(POINT_TYPES);

  return {
    id: index + 1,
    type: pointTitle,
    destination: getRandomArrayElement(destinations),
    startDate: startTime,
    endDate: endTime,
    price: getRandomInteger(50, 500),
    offers: getOffersByPointType(pointTitle),
    isFavorite: getRandomBool(),
  };
};

const generatePoints = () => {
  let points = [];

  for (let i = 0; i < POINT_AMOUNT; i++) {
    points.push(generatePoint(i));
  }

  return points;
};

const points = generatePoints();

export {OFFERS, points, CITIES, destinations, getOffersByPointType};
