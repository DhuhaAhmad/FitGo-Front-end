import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './component/home/home.component';
import { ExerciseListComponent } from './component/exercise-list/exercise-list.component';
import { WorkoutPlanListComponent } from './component/workout-plan-list/workout-plan-list.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { PlayWorkoutComponent } from './component/play-workout/play-workout.component';
import { AuthGuardService } from './service/auth-guard-service.service';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  {
    path: "", // Default home page
    component: HomeComponent,
  },
  
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: "exercises",
     canActivate: [AuthGuardService],
    component: ExerciseListComponent,
  },
  {
    path: "workout-plans",
     canActivate: [AuthGuardService],
    component: WorkoutPlanListComponent,
  },{
    path: 'play-workout',
     canActivate: [AuthGuardService],
    component: PlayWorkoutComponent
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
