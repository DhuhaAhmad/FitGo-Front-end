import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit{
  
  remainingTime: number = 60000

  @Output() timerOver: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
    // Set the initial time (in milliseconds)
    this.remainingTime = 6000; // 1 minute

    // Start the timer
    this.startTimer();
  }

  startTimer(): void {
    // Set up a timer to decrease the remaining time every second
    const timerInterval = 1000; // 1 second

    setInterval(() => {
      // Decrease the remaining time
      this.remainingTime -= timerInterval;

      // Check if the time has run out
      if (this.remainingTime <= 0) {
        // Do something when the time is up
        console.log('Time is up!');
        this.timerOver.emit()
      }
    }, timerInterval);
  }
}
