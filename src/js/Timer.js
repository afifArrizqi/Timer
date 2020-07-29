class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.interval = 0;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.tick = this.tick.bind(this);

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  start() {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.interval = setInterval(this.tick, 50);
  }

  pause() {
    clearInterval(this.interval);
  }

  onDurationChange() {}

  tick() {
    if (this.timeRemaining <= 0 || isNaN(this.timeRemaining)) {
      if (this.onComplete) this.onComplete();
      this.pause();
    } else {
      if (this.onTick) this.onTick(this.timeRemaining);
      this.timeRemaining -= 0.05;
    }
  }
}
