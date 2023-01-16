export class Subscriber {
  protected readonly observers: Set<Function>

  constructor() {
    this.observers = new Set()
  }

  subscribe(observer: Function) {
    this.observers.add(observer);
  }

  unsubscribe(observer: Function) {
    this.observers.delete(observer)
  }
}
