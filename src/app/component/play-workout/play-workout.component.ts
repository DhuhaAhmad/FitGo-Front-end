import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
interface Exercise {
  exerciseName: string;
  repetitions: number | null;
  sets: number;
  muscleGroup: string | null;
  image: string | null;
}


@Component({
  selector: 'app-play-workout',
  templateUrl: './play-workout.component.html',
  styleUrls: ['./play-workout.component.scss'],
  providers: [KeyValuePipe],
})
export class PlayWorkoutComponent implements OnInit {
  scheduledWorkouts: any;


  neededArray: any[] = [];

  currentExercise: Exercise = {
    exerciseName: '',
    repetitions: 0,
    sets: 0,
    muscleGroup: '',
    image: '',
  };

  // New variables
  currentSet: number = 1;
  currentDay: any;
  completedSets: Record<string, number[]> = {};

  isTimer: boolean=false

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.scheduledWorkouts$.subscribe((data) => {
      // Use the received data
      this.scheduledWorkouts = data;

      console.log(this.scheduledWorkouts);
    });

    this.convertToNeededArray();
  }

  convertToNeededArray(): void {
    if (this.scheduledWorkouts != null) {
      const scheduledWorkoutsProperties = Object.keys(this.scheduledWorkouts);
      console.log(scheduledWorkoutsProperties);
      for (const prop of scheduledWorkoutsProperties) {
        this.neededArray.push({
          name: prop,
          exercises: this.scheduledWorkouts[prop],
        });
      }

      console.log(this.neededArray);
    }
  }

  selectedExercise(e: any): void {
    console.log(e);
    this.currentExercise = {
      exerciseName: e.exerciseName,
      repetitions: e.repetitions,
      sets: e.sets,
      muscleGroup: e.muscleGroup,
      image: e.image,
    };

    // Load completed sets for the selected exercise
    this.currentSet = 1;
  }

  // New function
  markSetCompleted(): void {
    if (!this.completedSets[this.currentExercise.exerciseName]) {
      this.completedSets[this.currentExercise.exerciseName] = [];
    }

    this.completedSets[this.currentExercise.exerciseName].push(this.currentSet);

    if (this.currentSet < this.currentExercise.sets) {
      this.currentSet++;
    } else {
      this.moveToNextExercise();
    }
    this.isTimer=true
  }

  // New function
  moveToNextExercise(): void {
    if (this.hasNextExercise() < this.currentDay.exercises.length - 1) {
      // Move to the next exercise
      this.currentSet = 1; // Reset current set for the next exercise
      this.completedSets[this.currentExercise.exerciseName] = []; // Reset completed sets for the next exercise

      // Find the index of the current exercise in neededArray
      const currentIndex = this.hasNextExercise();

      console.log(this.currentDay.exercises);

      console.log('current', currentIndex);
      // Update this.currentExercise with the next exercise details
      this.currentExercise = {
        exerciseName: this.currentDay.exercises[currentIndex + 1].exerciseName,
        repetitions: this.currentDay.exercises[currentIndex + 1].repetitions,
        sets: this.currentDay.exercises[currentIndex + 1].sets,
        muscleGroup: this.currentDay.exercises[currentIndex + 1].muscleGroup,
        image: this.currentDay.exercises[currentIndex + 1].image,
      };

      console.log(this.currentExercise, '888888888888');
    } else {
      // If all exercises are completed, you can redirect to a summary page or perform any other action
      console.log('All exercises completed!');
    }
  }

  hasNextExercise(): number {
    // Find the index of the current exercise in neededArray
    const currentIndex = this.currentDay.exercises.findIndex(
      (exercise: { exerciseName: string }) => {
        // console.log(
        //   'in foreach ',
        //   exercise.exerciseName,
        //   this.currentExercise.exerciseName
        // );
        return exercise.exerciseName === this.currentExercise.exerciseName;
      }
    );

    return currentIndex;
  }

  updateCurrentDay(day: any): void {
    this.currentDay = day;
    console.log(day);
  }

//to create number of element(sets) in html and loop through
  getNumberArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }


  // Timer Part

  handleTimerOver():void{
    this.isTimer=false
  }
} //End -component
