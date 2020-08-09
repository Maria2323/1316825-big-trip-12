import {getRandomInteger} from "../utils.js";
import {types, offers} from "../const.js";

const generateOffers = () => {
  const randomIndex = getRandomInteger(0, offers.length - 1);
  let randomOffers = [];
  for (let i = Math.random(); i < Math.random() && i <= 5; i++) {
    randomOffers.push(offers[randomIndex]);
  }
  return randomOffers;
};
const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

export const generateOffer = () => {
  return {
    type: generateType(),
    offer: generateOffers(),
  };
};
