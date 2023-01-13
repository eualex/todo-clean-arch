import { Observer } from "./Observer";

export class Observable {
  private observers: Observer[] = [];

  register(observer: Observer) {
    const registerAlreadyExists = this.observers.some(
      (obs) => obs.event === observer.event
    );

    if (registerAlreadyExists) return;

    this.observers.push(observer);
  }

  protected notify(event: string, data: any) {
    this.observers.forEach((observer) => {
      if (observer.event === event) {
        observer.callback(data);
      }
    });
  }
}
