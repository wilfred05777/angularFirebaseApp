import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Excercise } from '../training/excercise.model';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  
  @Output() trainingStart = new EventEmitter<void>();
  excercises: Excercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailableExcercises();
    // this.excercises = this.trainingService.availableExercise;
  }

  onStartTraining(){
    // this.trainingStart.emit();
    this.trainingService.startExcercise();
  }
}
