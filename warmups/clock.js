class Clock {
  constructor() {
    const time = new Date();
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();
    // this.printTime();
    this._tick();
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    setTimeout(this._tick.bind(this), 1000);
    this.seconds += 1;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
    }
    if (this.minutes >= 60) {
      this.hours++;
    }
    if (this.hours >= 24) {
      this.hours = 0;
    }
    this.printTime();
  }
}

const clock = new Clock();
