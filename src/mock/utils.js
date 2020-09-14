const getRandomBool = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayElements = (array, min, max) => {
  const allElements = [...array];
  const selectedElements = [];
  const maxElements = getRandomInteger(min || 0, max || array.length);

  for (let i = 0; i < maxElements; i++) {
    const randomIndex = getRandomInteger(0, array.length - i - 1);
    selectedElements.push(allElements[randomIndex]);
    allElements.splice(randomIndex, 1);
  }

  return selectedElements;
};

export {getRandomBool, getRandomInteger, getRandomArrayElement, getRandomArrayElements};
