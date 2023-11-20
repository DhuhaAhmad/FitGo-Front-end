
export interface WorkoutPlanExercise{
  exerciseName: string,
  repetitions: number,
  sets: number
}

export interface Workout {
    name: string;
    duration: number;
    exercises: WorkoutPlanExercise[];
  }

 