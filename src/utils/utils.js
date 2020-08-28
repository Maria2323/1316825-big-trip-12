export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
};
