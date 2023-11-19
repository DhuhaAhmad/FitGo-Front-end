// auth.service.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { User } from "../model/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem("authToken");
    // If not exist return false
    return token !== null;
  }

  authenticate(): Observable<User> {
    // Get the token from the local storage
    const storedToken: string | null = localStorage.getItem("authToken");

    if (storedToken === null) {
      throw null;
    }

    // Create the Authorization header
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${storedToken}`,
      }),
    };

    // Get logged user information
    return this.http.get<User>(`${this.API_URL}`, options);
  }


  login(username: string, password: string): Observable<any> {
    console.log(username,password)
    const params = { username, password };
    return this.http.get<any>(`${this.API_URL}/login`,{params})
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }
  

  logout(): void {
    // Remove the token and the user information from local storage to log a user out
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  }
}
