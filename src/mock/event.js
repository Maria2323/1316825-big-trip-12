import {getRandomInt, getRandomElementFromArray} from "../utils.js";
import {types, cities, descriptions} from "../const.js";
import {generateOffers} from "./offers";

const generatePrice = () => {
  return Math.ceil(getRandomInt(30, 150));
};

const generateDescription = () => {
  const randomIndex = getRandomInt(0, descriptions.length - 1);
  let randomDescriptions = [];
  for (let i = Math.random(); i < Math.random() && i <= 5; i++) {
    randomDescriptions.push(descriptions[randomIndex]);
  }
  return randomDescriptions;
};

const generatePhoto = () => {
  const photo = `http://picsum.photos/248/152?r=${Math.random()}`;
  return photo;
};
const randomStartDate = new Date(2019, 2 + Math.floor(Math.random() * 2), 2 + Math.ceil(Math.random() * 20), 11, 20);
const randomEndDate = new Date(randomStartDate.getFullYear() + Math.floor(Math.random()), randomStartDate.getMonth() + Math.floor(Math.random() * 2), randomStartDate.getDate() + Math.ceil(Math.random() * 10), 13, 0);
const startTime = new Date(2019, 3, 19, 11, 20);
const endTime = new Date(2019, 3, 19, 13, 0);

const generateStartTime = () => {
  return startTime.toLocaleTimeString().slice(0, -3);
};
const generateEndTime = () => {
  return endTime.toLocaleTimeString().slice(0, -3);
};

const generateDurationTime = () => {
  return endTime - startTime;
};

export const generateEvent = () => {
  return {
    type: getRandomElementFromArray(types),
    city: getRandomElementFromArray(cities),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    price: generatePrice(),
    startDate: randomStartDate,
    endDate: randomEndDate,
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    durationTime: generateDurationTime(),
    destination: {
      image: generatePhoto(),
      description: generateDescription(),
    },
  };
};
