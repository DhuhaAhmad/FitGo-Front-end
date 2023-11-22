import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm: FormGroup;
  usernameInput: FormControl;
  passwordInput: FormControl;
 
  externalErrorMsg: string;
 
  constructor(private router: Router, private authService: AuthService) {
    this.usernameInput = new FormControl("",  Validators.required);
    this.passwordInput = new FormControl("", [Validators.required]);
    this.loginForm = new FormGroup({
      username: this.usernameInput,
      password: this.passwordInput,
    });
    this.externalErrorMsg = "";
  }
 
  ngOnInit(): void {}
 
  login() {
    // Attempt to login
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          console.log("Login successful");
          console.log(response.access_token)
 
          // Store user in local storage to keep a user logged in between page refreshes
          localStorage.removeItem("authToken");
          localStorage.removeItem("username")
          localStorage.removeItem("workoutplan")
          localStorage.setItem("authToken", response.access_token);
          localStorage.setItem("username",this.usernameInput.value)
             // Use Router to navigate to the home route
        this.router.navigate(["/"]).then(() => {
          // Reload the page after navigating
          window.location.reload();
        });
        
    
        },
        error: (error) => {
          console.log(error, error.status);
          if (error.status === 403) {
            this.externalErrorMsg = "Wrong username/password";
          }
        },
      });
  }


}
