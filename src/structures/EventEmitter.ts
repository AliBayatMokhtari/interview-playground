interface EventMap {
  "playground:updateUrl": (url: string) => void;
}

type EventCallback = (...args: any[]) => unknown;
type EventType = keyof EventMap;

class EventEmitter {
  constructor(private events: Map<EventType, EventCallback[]>) {}

  on<T extends EventType>(type: T, observer: EventMap[T]) {
    const observers = this.events.get(type) || [];
    observers.push(observer);
    this.events.set(type, observers);
  }

  off<T extends EventType>(type: T, observer: EventMap[T]) {
    let observers = this.events.get(type);
    if (observers) {
      observers = observers.filter((obs) => obs !== observer);
      this.events.set(type, observers);
    }
  }

  emit<T extends EventType>(type: T, ...args: Parameters<EventMap[T]>) {
    const observers = this.events.get(type);
    if (observers) {
      observers.forEach((observer) => {
        observer(...args);
      });
    }
  }
}

const eventEmitter = new EventEmitter(new Map());

export default eventEmitter;
