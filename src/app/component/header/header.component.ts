import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/Exercise';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string  | null = null

  workoutData: any;
  muscleGroupMapping: Record<string, string> = {
   Chest: 'Push Day',
   Shoulders: 'Push Day',
   Triceps: 'Push Day',
   Back: 'Pull Day',
   Biceps: 'Pull Day',
   Quadriceps: 'Leg Day',
   Hamstrings: 'Leg Day',
   Glutes: 'Leg Day',
   Calves: 'Leg Day',
   'Full Body': 'Full Body',
   Abdominals: 'Full Body',
   Obliques: 'Full Body'
   // Add more mappings as needed
 };
scheduledWorkouts: Record<string, Exercise[]> = {};

  constructor(private authService: AuthService, private userService:UserService,private sharedService: SharedService,private router: Router) {}



  ngOnInit(): void {

    this.username = localStorage.getItem("username")
    console.log(this.username)
   this.getUserWorkout()
  }


  getUserWorkout():void{
    this.userService.fetchWorkoutofUser(this.username).subscribe({
      next: (res) => {
        console.log(res);
        this.workoutData=res
        // this.getUserWorkout()

      },
      error: (error) => console.log(error),
    });
  }


  stratWorkingOut():void{
      // Group exercises by muscleGroup
  const groupedExercises: Record<string, Exercise[]> = {};
 this.workoutData.exerciseDTOS.forEach((exercise: Exercise) => {
    const muscleGroup = exercise.muscleGroup || 'other'; // Use 'other' for exercises without a specified muscleGroup
    groupedExercises[muscleGroup] = groupedExercises[muscleGroup] || [];
    groupedExercises[muscleGroup].push(exercise);
  });
  
  // Assign workout days based on muscleGroup mapping
  Object.keys(groupedExercises).forEach((muscleGroup) => {
    const workoutDay = this.muscleGroupMapping[muscleGroup] || 'rest'; // Use 'rest' for unknown muscle groups
    this.scheduledWorkouts[workoutDay] = this.scheduledWorkouts[workoutDay] || [];
    this.scheduledWorkouts[workoutDay].push(...groupedExercises[muscleGroup]);
  });
  
  console.log(this.scheduledWorkouts);
  this.sharedService.setScheduledWorkouts(this.scheduledWorkouts);
  }



  logout(): void {
    // Log out
    this.authService.logout();
    // Redirect to login page
    this.router.navigate(["/signin"]);
    window.location.reload();
  }
}
