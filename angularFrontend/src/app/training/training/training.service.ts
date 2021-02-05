import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Excercise } from './excercise.model';

import { Store } from '@ngrx/store';
import { UIService } from 'src/app/shared/ui.service';
import * as UI from '../../shared/ui.actions';
import * as fromRoot from '../../app.reducer';
import * as Training from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';

@Injectable()
export class TrainingService {
  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExercisesChanged = new Subject<Excercise[]>();
  private availableExcercises: Excercise[] = [];
  private runningExcercise: Excercise;
  private excercises: Excercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(
    private fs: AngularFirestore,
    private uiService: UIService,
    // private store: Store<fromRoot.State>,
    private store: Store<fromTraining.State>
  ) {}

  // private availableExercise: Excercise[] = [
  //     { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
  //     { id: 'touch-toes', name: 'Touch Toes', duration: 130, calories: 28},
  //     { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 38},
  //     { id: 'burpess', name: 'Burpees', duration: 60, calories: 238}
  // ];

  // constructor(private afs: AngularFirestore){}

  // reference type problematic object this one .slice() fixes  the issue

  // getAvailableExcercises(){
  //     return this.availableExercise.slice();
  // }

  fetchAvailableExcercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.fs
        .collection('availableExcercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            // throw new Error();
            // transform array?
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories'],
              };
            });
          })
        )
        .subscribe(
          (exercises: Excercise[]) => {
            // console.log(exercises);
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            // this.availableExcercises = exercises;
            // // event emitter
            // this.excercisesChanged.next([...this.availableExcercises]);
          },
          (error) => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Excercise failed, please try again later',
              null,
              3000
            );
            this.excerciseChanged.next(null);
          }
          // (error) => {
          //   // console.log(error());
          // }
        )
    );
  }

  startExcercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
    // // this.fs.doc('availableExcercises/' + selectedId ).update({lastSelected: new Date()})
    // this.runningExcercise = this.availableExcercises.find(
    //   (ex) => ex.id === selectedId
    // );
    // this.excerciseChanged.next({ ...this.runningExcercise });
    // // const selectedExcercise = this.availableExercise.find(ex=> ex.id === selectedId)
    // // this.runningExcercise = selectedExcercise;
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExcercise,
      date: new Date(),
      state: 'completed',
    });
    // this.excercises.push({
    //     ...this.runningExcercise,
    //     date: new Date(),
    //     state: 'completed'
    // });
    // this.runningExcercise = null;
    // this.excerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    // this.excercises.push({
    //     ...this.runningExcercise,
    //     duration: this.runningExcercise.duration * (progress/100),
    //     calories: this.runningExcercise.calories * (progress/100) ,
    //     date: new Date(),
    //     state: 'cancelled'
    // });
    // this.runningExcercise = null;
    // this.excerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExcercise };
  }

  fetchCompletedOrCancelledExcercise() {
    this.fbSubs.push(
      this.fs
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Excercise[]) => {
          // this.excercises = excercises;
          // this.finishedExercisesChanged.next(excercises);
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }
  // getCompletedOrCancelledExcercise(){
  //     return this.excercises.slice()
  // }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(excercise: Excercise) {
    this.fs.collection('finishedExercises').add(excercise);
  }
}
