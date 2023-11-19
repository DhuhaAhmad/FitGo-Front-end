import { Component,OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/Exercise';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercises:Exercise[] = []

  constructor(private exerciseService: ExerciseService) {}
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
    
}
