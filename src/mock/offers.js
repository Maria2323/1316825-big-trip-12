import {getRandomInt} from "../utils/utils.js";
import {offers} from "../const.js";

export const generateOffers = () => {
  let randomOffers = [];
  for (let i = 0; i < getRandomInt(0, 5); i++) {
    const randomIndex = getRandomInt(0, offers.length - 1);
    randomOffers.push(offers[randomIndex]);
  }
  return randomOffers;
};
