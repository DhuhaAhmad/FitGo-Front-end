import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"; //new
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ExerciseComponent } from './component/exercise/exercise.component';
import { ExerciseListComponent } from './component/exercise-list/exercise-list.component';
import { AppRoutingModule } from './app-routing.module';
import { WorkoutPlanListComponent } from './component/workout-plan-list/workout-plan-list.component';
import { PlayWorkoutComponent } from './component/play-workout/play-workout.component';
import { TimerComponent } from './component/timer/timer.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignInComponent,
    ExerciseComponent,
    ExerciseListComponent,
    WorkoutPlanListComponent,
    PlayWorkoutComponent,
    TimerComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
        }), // ToastrModule added



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
