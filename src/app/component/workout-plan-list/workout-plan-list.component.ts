import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exercise } from 'src/app/model/Exercise';
import { WExercise, Workout } from 'src/app/model/WorkoutPlan';
import { ExerciseService } from 'src/app/service/exercise.service';
import { UserService } from 'src/app/service/user.service';
import { WorkoutPlanService } from 'src/app/service/workout-plan.service';

@Component({
  selector: 'app-workout-plan-list',
  templateUrl: './workout-plan-list.component.html',
  styleUrls: ['./workout-plan-list.component.scss'],
})
export class WorkoutPlanListComponent implements OnInit {
  workoutForm: FormGroup;
  workoutPlanInput: FormControl;
  durationInput: FormControl;
  


  addMode: boolean = false;
  editMode: boolean = false;
  isExerciseAdded: boolean = false;

  // fetched
  exercises: Exercise[] = [];
  workoutPlans: Workout[] = [];


  // to create
  wexercies: WExercise[] = [];
newWorkout: Workout ={
  name: '', // Initialize with an empty string or provide a default value
  duration: 0,
  exercises: [],
};

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private exerciseService: ExerciseService,
    private userService:UserService
  ) {
    this.workoutPlanInput = new FormControl('', Validators.required);
    this.durationInput = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]);
    // this.exerciesInput = new FormControl('', Validators.required);
    // this.setsInput = new FormControl('', Validators.required);
    // this.repsInput = new FormControl('', Validators.required);

    this.workoutForm = new FormGroup({
      workoutPlan: this.workoutPlanInput,
      duration: this.durationInput,
      // exercies: this.exerciesInput,
      // sets: this.setsInput,
      // reps: this.repsInput,
    });
  }

  ngOnInit(): void {
    this.getWorkoutPlans()
  }
  

  getWorkoutPlans():void{
    this.workoutPlanService.fetchWorkoutPlans().subscribe({
      next: (res) => {
        this.workoutPlans = res;
        console.log(this.workoutPlans);
      },
      error: (error) => {
        // Error response
        console.log(error);
      },
    });
  }

  toggleAddMode(): void {
    this.addMode = !this.addMode;
    // console.log('toggle');
// fetch all exercies when adding new workout plan
    this.getExercises();
    this.wexercies=[]
    this.workoutForm.reset({})

  }

  toggleEditMode(): void {
    // this.newWorkout = w
    this.editMode = !this.editMode;
    // console.log(this.newWorkout===w)
    this.wexercies=[]
    this.workoutForm.reset({})



  }
  handleAddWorkout(): void {
    console.log(this.wexercies)
    this.newWorkout!.name = this.workoutPlanInput.value
    this.newWorkout!.duration = this.durationInput.value
    this.newWorkout!.exercises = this.wexercies

    console.log(this.newWorkout)
    this.workoutPlanService.PostWorkoutPlan(this.newWorkout).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
    });
    this.addMode=false
    this.wexercies=[]
    this.workoutForm.reset({})
    this.getWorkoutPlans()


  }

  // handleUpdateWorkout(): void {
  //   this.workoutPlanService.putWorkout(this.newWorkout).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }
  handleDeleteWorkout(workoutPlan:string): void {
    this.workoutPlanService.deleteWorkout(workoutPlan).subscribe({
      next: (res) => {
        console.log(res); 
        this.getWorkoutPlans()
      },
      error: (error) => console.log(error),
    });
   
  }

  getExercises(): void {
    this.exerciseService.fetchExercises().subscribe({
      next: (res) => {
        this.exercises = res;
        console.log(this.exercises);
      },
      error: (error) => {
        // Error response
        console.log(error);
      },
    });
  }

  addToWExercie(name: string): void {
    const exerciseObj = {
      exerciseName: name,
      repetitions: 0,
      sets: 0,
    };
    this.wexercies.push(exerciseObj);
  }

  removeExercise(exerciseNameToRemove: string): void {
    this.wexercies = this.wexercies.filter(
      (item) => item.exerciseName !== exerciseNameToRemove
    );
  }
  isExerciseInWexercies(exerciseName: string): boolean {
    // console.log(
    //   this.wexercies.some((item) => item.exerciseName === exerciseName)
    // );
    return this.wexercies.some((item) => item.exerciseName === exerciseName);
  }

  handleChange(event: any, exerciseToUpdate: string, whatToUpdate: string): void {
    // Find the index of the exercise in the wexercies array
    const index = this.wexercies.findIndex((item) => item.exerciseName === exerciseToUpdate);
  
    if (index !== -1) {
      // Update the specified property based on whatToUpdate
      if (whatToUpdate === 'reps') {
        this.wexercies[index].repetitions =parseInt( event.target.value);
      } else if (whatToUpdate === 'sets') {
        this.wexercies[index].sets =parseInt( event.target.value);
      }
  
      // Log the updated wexercies array
      console.log('Updated wexercies:', this.wexercies);
    } else {
      console.log('Exercise not found in wexercies array');
    }
  }



  getWorkout(w: Workout): void {

    this.editMode =true
  this.workoutPlanInput.setValue(w.name)
  this.durationInput.setValue(w.duration)
  this.wexercies = w.exercises

  this.getExercises()
   
  }
  
  // ...
  
  handleUpdateWorkout(): void {
    console.log(this.wexercies);
  
    // Retrieve the updated values from the form
    const updatedWorkout: Workout = {
      name: this.workoutForm.value.workoutPlan,
      duration: this.workoutForm.value.duration,
      exercises: this.wexercies
    }
  
    // Update the workout plan
    this.workoutPlanService.putWorkout(updatedWorkout).subscribe({
      next: (res) => {
        console.log(res);
        this.editMode = false; // Exit edit mode after successful update
      },
      error: (error) => console.log(error),
    });
    this.editMode=false

    this.wexercies=[]
    this.workoutForm.reset({})
    this.getWorkoutPlans()


  }
  


  assignUserToWorkout(workout:string):void{
    this.userService.putWorkoutToUser(workout).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
    });
  }
  
}
