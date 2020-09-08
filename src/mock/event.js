import {getRandomInt, getRandomElementFromArray} from "../utils/utils.js";
import {types, cities, descriptions} from "../const.js";
import {generateOffers} from "./offers";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
const dateNowPlusOneDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1, dateNow.getHours(), dateNow.getMinutes());
const dateNowPlusSomeDays = new Date(dateNowPlusOneDay.getFullYear(), dateNowPlusOneDay.getMonth(), dateNowPlusOneDay.getDate() + Math.floor(Math.random() * 5), dateNowPlusOneDay.getHours(), dateNowPlusOneDay.getMinutes());
const dateNowPlusOneDayInMS = new Date(dateNowPlusOneDay).getTime();
const dateNowPlusSomeDaysInMS = new Date(dateNowPlusSomeDays).getTime();

const getRandomDate = () => {
  const randomDateInMS = getRandomInt(dateNowPlusOneDayInMS, dateNowPlusSomeDaysInMS);
  const randomDate = new Date(randomDateInMS);
  return randomDate;
};

export const generateEvent = () => {
  return {
    id: generateId(),
    type: getRandomElementFromArray(types),
    city: getRandomElementFromArray(cities),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    price: generatePrice(),
    startDate: getRandomDate(),
    endDate: getRandomDate(),
    destination: {
      image: generatePhoto(),
      description: generateDescription(),
    },
  };
};
