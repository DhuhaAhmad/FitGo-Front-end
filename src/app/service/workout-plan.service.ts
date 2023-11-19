import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutPlanService {

  private readonly API_URL = "http://localhost:8080"
  constructor(private http:HttpClient ) {}

  fetchWorkoutPlans(): Observable<any>{
    const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIiwicm9sZXMiOlsiVFJBSU5FUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvbG9naW4iLCJleHAiOjE3MDE5MzIzNjB9.EvdhAG4pys8qHPXu6Ozu5Vm5DSYoyws0sCIydFLPeCc"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include your authentication token here
    });
    return this.http.get<any>(`${this.API_URL}/view-all-plans`)
  }

  PostWorkoutPlan(newWorkout:any): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/create-plan`,newWorkout)
  }

  putWorkout( workoutPlan: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/update-workout-plan`, workoutPlan);
  }

  deleteWorkout(workoutName: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/delete-workout-plan?name=${workoutName}`);
  }
}
