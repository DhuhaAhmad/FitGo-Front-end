import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exercise } from 'src/app/model/Exercise';
import { ExerciseService } from 'src/app/service/exercise.service';



@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit{


exerciseForm: FormGroup;
exerciseNameInput: FormControl;
descriptionInput: FormControl;
categoryInput: FormControl;
muscleGroupInput: FormControl;
imageInput: FormControl;


exercises: Exercise[] = [];
addMode: boolean = false;

constructor(private exerciseService: ExerciseService) {
  this.exerciseNameInput = new FormControl("", Validators.required);
  this.descriptionInput = new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(255)]);
  this.categoryInput = new FormControl("", Validators.required);
  this.muscleGroupInput = new FormControl("", Validators.required);
  this.imageInput = new FormControl("", Validators.required);

  this.exerciseForm = new FormGroup({
    exerciseName: this.exerciseNameInput,
    description: this.descriptionInput,
    category: this.categoryInput,
    muscleGroup: this.muscleGroupInput,
    image: this.imageInput,
  });
}

ngOnInit(): void {
    
  this.getExercises()
}

getExercises():void{
  this.exerciseService.fetchExercises().subscribe({
    next:res=>{
      this.exercises=res
      console.log(this.exercises)
    }  ,
    error: error => { // Error response
      console.log(error);
    }
  })
}



toggleEditMode():void{
  this.addMode=!this.addMode
}

handleAddExercise():void{
  const newExercise ={
    name:this.exerciseNameInput,
    description: this.descriptionInput,
    category: this.categoryInput,
      muscleGroup:this.muscleGroupInput,
     image: this.imageInput
  }

  console.log(newExercise)
  this.exerciseService.postExercise(newExercise).subscribe({
    next:res=>{
      console.log(res)
      this.getExercises();
    },error:error=> console.log(error)
  })

  this.addMode =false
}


}



