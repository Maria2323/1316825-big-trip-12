const EVENT_LIST_ITEMS = 3;
const generateStartDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  if (startMonth <= 9) {
    return startYear + `-` + `0` + startMonth + `-` + startDay;
  } else {
    return startYear + `-` + startMonth + `-` + startDay;
  }
};
const generateDate = (date) => {
  return date.getDate();
};
const generateMonth = (date) => {
  return date.toLocaleString(`en-us`, {month: `short`});
};
for (let i = 0; i < EVENT_LIST_ITEMS; i++) {
  const creatorEventListItems = (startDate) => {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">1 += 1</span>
                <time class="day__date" datetime="${generateStartDate(startDate)}">${generateMonth(startDate)} ${generateDate(startDate)}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>`.join(``);
  };
}

export const createEventsListTemplate = (event) => {
  const {startDate} = event;
  const randomStartDate = generateStartDate(startDate);
  const randomDate = generateDate(startDate);
  const randomMonth = generateMonth(startDate);
  return (
    `<ul class="trip-days">
            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">1</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>

            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">2</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>

            <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">3</span>
                <time class="day__date" datetime="${randomStartDate}">${randomMonth} ${randomDate}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>
          </ul>`
  );
};
