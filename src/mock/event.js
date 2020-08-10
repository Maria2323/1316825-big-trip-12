import {getRandomInteger, getRandomInt} from "../utils.js";
import {types, cities, descriptions} from "../const.js";
import {generateOffer} from "./offers";

const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex].name + types[randomIndex].article;
};

const generatePrice = () => {
  return Math.ceil(getRandomInt(30, 150));
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
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

export const generateEvent = () => {
  return {
    type: generateType(),
    city: generateCity(),
    offer: generateOffer(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    price: generatePrice(),
    destination: {
      image: generatePhoto(),
      description: generateDescription(),
    },
  };
};
