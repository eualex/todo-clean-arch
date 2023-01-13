import { Observable } from "./Observable";

export class Todo extends Observable {
  constructor(readonly description: string, public done: boolean = false) {
    super()
  }

  toggleDone() {
    this.done = !this.done;

    this.notify('toggleDone', this)
  }
}
