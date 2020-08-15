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

const dateNow = new Date();
const dateNowPlusOneDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1);
const dateNowPlusSomeDays = new Date(dateNowPlusOneDay.getFullYear(), dateNowPlusOneDay.getMonth(), dateNowPlusOneDay.getDate() + Math.floor(Math.random() * 5));
const dateNowPlusOneDayInMS = new Date(dateNowPlusOneDay).getTime();
const dateNowPlusSomeDaysInMS = new Date(dateNowPlusSomeDays).getTime();

const getRandomDates = () => {
  const randomDateInMS = getRandomInt(dateNowPlusOneDayInMS, dateNowPlusSomeDaysInMS);
  const randomDate = new Date(randomDateInMS);
  return new Date(randomDate.getFullYear(), randomDate.getMonth(), randomDate.getDate());
};

console.log(dateNow);
console.log(dateNowPlusOneDay);
console.log(dateNowPlusSomeDays);
console.log(dateNowPlusOneDayInMS);
console.log(getRandomDates());

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
    startDate: getRandomDates(),
    endDate: getRandomDates(),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    durationTime: generateDurationTime(),
    destination: {
      image: generatePhoto(),
      description: generateDescription(),
    },
  };
};
