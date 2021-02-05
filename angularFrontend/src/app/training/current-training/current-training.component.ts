import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { TrainingService } from '../training/training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  //exit
  // @Output() trainingExit = new EventEmitter();

  progress = 0;
  timer: number;

  constructor(
    private store: Store<fromTraining.State>,
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();

    // this.timer = setInterval(()=>{
    //   this.progress = this.progress + 5;
    //   if(this.progress >= 100) {
    //     clearInterval(this.timer)
    //   }
    // }, 1000)
  }

  startOrResumeTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        const step = (ex.duration / 100) * 1000;
        this.timer = setInterval(
          () => {
            this.progress = this.progress + 1;
            if (this.progress >= 100) {
              this.trainingService.completeExercise();
              clearInterval(this.timer);
            }
          },
          // 1000
          step
        );
      });
    // const step =
    //     (this.trainingService.getRunningExercise().duration / 100) * 1000;
    //   this.timer = setInterval(
    //     () => {
    //       this.progress = this.progress + 1;
    //       if (this.progress >= 100) {
    //         this.trainingService.completeExercise();
    //         clearInterval(this.timer);
    //       }
    //     },
    //     // 1000
    //     step
    //   );
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Are you sure to quit: if selected is "yes" it will stop/terminated and go back to traning selectio
      if (result) {
        // this.trainingExit.emit();
        this.trainingService.cancelExcercise(this.progress);
      }
      // Are you sure to quit: if selected is "No" it will resume and continue progress bar
      else {
        this.startOrResumeTimer();
      }
    });
  }
}
