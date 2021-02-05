import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining$ = new Observable<boolean>();
  // ongoingTraining = false;
  // excerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.excerciseSubscription = this.trainingService.excerciseChanged.subscribe(
    //   (excercise) => {
    //     if (excercise) {
    //       this.ongoingTraining = true;
    //     } else {
    //       this.ongoingTraining = false;
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    // if (this.excerciseSubscription) {
    //   this.excerciseSubscription.unsubscribe();
    // }
  }
}
