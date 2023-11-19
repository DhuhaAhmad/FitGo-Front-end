import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private readonly API_URL = "http://localhost:8080"
  constructor(private http:HttpClient ) {}

  fetchExercises(): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/exercises`)
  }


  postExercise(newExercise:any):Observable<any>{

    return this.http.post<any>(`${this.API_URL}/add-exercise`,newExercise)
  }


  
}
