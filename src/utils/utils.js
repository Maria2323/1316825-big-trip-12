export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
};
const getWeightForNullPrice = (priceA, priceB) => {
  if (priceA === null && priceB === null) {
    return 0;
  }

  if (priceA === null) {
    return 1;
  }

  if (priceB === null) {
    return -1;
  }

  return null;
};

export const sortEventsPrice = (eventA, eventB) => {
  const weight = getWeightForNullPrice(eventA.price, eventB.price);

  if (weight !== null) {
    return weight;
  }

  return eventB.price - eventA.price;
};

export const sortEventsTime = (eventA, eventB) => {
  const weight = getWeightForNullPrice((eventA.endDate - eventA.startDate), (eventB.endDate - eventB.startDate));

  if (weight !== null) {
    return weight;
  }

  return (eventB.endDate - eventB.startDate) - (eventA.endDate - eventA.startDate);
};
