import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private scheduledWorkoutsSource = new BehaviorSubject<any>(null);
  scheduledWorkouts$ = this.scheduledWorkoutsSource.asObservable();
  constructor() { }



  setScheduledWorkouts(data: any) {
    this.scheduledWorkoutsSource.next(data);
  }
}
