import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  putWorkoutToUser(workoutPlan: string): Observable<any> {
    const header = {
      headers: this.getAuthHeader(),
    };
    
    return this.http.put<any>(
      `${this.API_URL}/assign-user-to-plan?planName=${workoutPlan}`,null,header);
  }

  fetchWorkoutofUser(usename: any): Observable<any> {
    const header = {
      headers: this.getAuthHeader(),
    };

    return this.http.get<any>(
      `${this.API_URL}/${usename}/view-plan`,header);
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
