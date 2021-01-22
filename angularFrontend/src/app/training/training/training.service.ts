import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Excercise } from './excercise.model';

@Injectable()
export class TrainingService {
  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExercisesChanged = new Subject<Excercise[]>();
  private availableExcercises: Excercise[] = [];
  private runningExcercise: Excercise;
  private excercises: Excercise[] = [];

  constructor(private fs: AngularFirestore) {}

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
    this.fs
      .collection('availableExcercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
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
      .subscribe((exercises: Excercise[]) => {
        // console.log(exercises);
        this.availableExcercises = exercises;
        this.excercisesChanged.next([...this.availableExcercises]);
      });
  }

  startExcercise(selectedId: string) {
    // this.fs.doc('availableExcercises/' + selectedId ).update({lastSelected: new Date()})
    this.runningExcercise = this.availableExcercises.find(
      (ex) => ex.id === selectedId
    );
    this.excerciseChanged.next({ ...this.runningExcercise });
    // const selectedExcercise = this.availableExercise.find(ex=> ex.id === selectedId)
    // this.runningExcercise = selectedExcercise;
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
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
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
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExcercise };
  }

  fetchCompletedOrCancelledExcercise() {
    this.fs
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((excercises: Excercise[]) => {
        // this.excercises = excercises;
        this.finishedExercisesChanged.next(excercises);
      });
  }
  // getCompletedOrCancelledExcercise(){
  //     return this.excercises.slice()
  // }

  private addDataToDatabase(excercise: Excercise) {
    this.fs.collection('finishedExercises').add(excercise);
  }
}
