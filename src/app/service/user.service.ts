import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  putWorkoutToUser(workoutPlan: any): Observable<any> {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIiwicm9sZXMiOlsiVFJBSU5FUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvbG9naW4iLCJleHAiOjE3MDE5MzIzNjB9.EvdhAG4pys8qHPXu6Ozu5Vm5DSYoyws0sCIydFLPeCc';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include your authentication token here
    });

    return this.http.put<any>(
      `${this.API_URL}/assign-user-to-plan?planName=${workoutPlan}`,
      null // Pass null as the body since it's a query parameter
    );
  }

  fetchWorkoutofUser(usename: any): Observable<any> {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIiwicm9sZXMiOlsiVFJBSU5FUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvbG9naW4iLCJleHAiOjE3MDE5MzIzNjB9.EvdhAG4pys8qHPXu6Ozu5Vm5DSYoyws0sCIydFLPeCc';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include your authentication token here
    });

    return this.http.get<any>(
      `${this.API_URL}/${usename}/view-plan`
    );
  }
}
