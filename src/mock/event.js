import {getRandomInteger} from "../utils.js";
import {types, cities, descriptions} from "../const.js";

const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
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
    description: generateDescription(),
    type: generateType(),
    city: generateCity(),
    image: generatePhoto(),
  };
};
