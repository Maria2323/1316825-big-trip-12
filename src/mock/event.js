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

const startTime = new Date(2019, 3, 19, 11, 20);
const endTime = new Date(2019, 3, 19, 13, 0);

const generateStartDate = () => {
  const startYear = startTime.getFullYear();
  const startMonth = startTime.getMonth();
  const startDay = startTime.getDate();
  if (startMonth <= 9) {
    return startDay + `/` + `0` + startMonth + `/` + startYear;
  } else {
    return startDay + `/` + startMonth + `/` + startYear;
  }
};
const generateEndDate = () => {
  const endYear = endTime.getFullYear();
  const endMonth = endTime.getMonth();
  const endDay = endTime.getDate();
  if (endMonth <= 9) {
    return endDay + `/` + `0` + endMonth + `/` + endYear;
  } else {
    return endDay + `/` + endMonth + `/` + endYear;
  }
};

const generateStartTime = () => {
  return startTime.toLocaleTimeString().slice(0, -3);
};
const generateEndTime = () => {
  return endTime.toLocaleTimeString().slice(0, -3);
};

const generateDurationTime = () => {
  const duration = endTime - startTime;
  const minutes = ((duration / (1000 * 60)) % 60);
  const hours = ((duration / (1000 * 60 * 60)) % 24);
  const days = (duration / (1000 * 60 * 60 * 24));
  if (Math.floor(days) > 0) {
    return Math.floor(days) + `D ` + Math.floor(hours) + `H ` + minutes + `M`;
  } else if (Math.floor(days) <= 0 && Math.floor(hours) > 0) {
    return Math.floor(hours) + `H ` + minutes + `M`;
  } else if (Math.floor(days) <= 0 && Math.floor(hours) <= 0 && minutes > 0) {
    return minutes + `M`;
  } else {
    return ``;
  }
};

export const generateEvent = () => {
  return {
    type: getRandomElementFromArray(types),
    city: getRandomElementFromArray(cities),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    price: generatePrice(),
    startDate: generateStartDate(),
    endDate: generateEndDate(),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    durationTime: generateDurationTime(),
    destination: {
      image: generatePhoto(),
      description: generateDescription(),
    },
  };
};
