export default {
  _observers: [],
  addObserver(newObserver) {
    this._observers.push(newObserver);
  },
  removeObserver(observer) {
    this._observers = this._observers
      .filter((observerInStock) => observerInStock !== observer);
  },
  notify() {
    this._observers.forEach((observer) => observer());
  }
};
