import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private readonly API_URL = "http://localhost:8080"
  constructor(private http:HttpClient, private sharedService:SharedService ) {}

  fetchExercises(): Observable<any>{
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.get<any>(`${this.API_URL}/exercises`,header)
  }


  postExercise(newExercise:any):Observable<any>{
    const header = {
      headers: this.getAuthHeader(),
    };
    return this.http.post<any>(`${this.API_URL}/add-exercise`,newExercise,header)
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
