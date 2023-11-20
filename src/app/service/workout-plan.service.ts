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
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.get<any>(`${this.API_URL}/view-all-plans`,header)
  }

  PostWorkoutPlan(newWorkout:any): Observable<any>{
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.post<any>(`${this.API_URL}/create-plan`,newWorkout,header)
  }

  putWorkout( workoutPlan: any): Observable<any> {
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.put<any>(`${this.API_URL}/update-workout-plan`, workoutPlan,header);
  }

  deleteWorkout(workoutName: string): Observable<any> {
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.delete<any>(`${this.API_URL}/delete-workout-plan?name=${workoutName}`,header);
  }

  private getAuthHeader(): HttpHeaders {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem("authToken");
    if (token === null) {
      throw null;
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
