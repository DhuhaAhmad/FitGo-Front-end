import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './component/home/home.component';
import { ExerciseListComponent } from './component/exercise-list/exercise-list.component';
import { WorkoutPlanListComponent } from './component/workout-plan-list/workout-plan-list.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { PlayWorkoutComponent } from './component/play-workout/play-workout.component';

const routes: Routes = [
  {
    path: "", // Default home page
    component: HomeComponent,
  },
  {
    path: "exercises",
    component: ExerciseListComponent,
  },
  {
    path: "workout-plans",
    component: WorkoutPlanListComponent,
  },
  {
    path: 'signin',
    component: SignInComponent
  },{
    path: 'play-workout',
    component: PlayWorkoutComponent
  }
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
