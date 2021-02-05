import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Excercise } from '../training/excercise.model';
import { TrainingService } from '../training/training.service';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExcercisesInFS$: Observable<Excercise[]>;
  isLoading$: Observable<boolean>;
  // exercise$: Observable<Excercise>;

  // availableExcercisesInFS: Observable<any[]>;
  // availableExcercisesInFS: Observable<Excercise[]>;
  // excerciseSubscription: Subscription;
  // private loadingSubs: Subscription;
  // isLoading = true;

  // @Output() trainingStart = new EventEmitter<void>();
  // excercises: Excercise[] = [];
  // excercises: Observable<any[]>;
  // excercises: Excercise[];

  constructor(
    private store: Store<fromRoot.State>,
    private trainingService: TrainingService,
    private fs: AngularFirestore,
    private uiService: UIService
  ) {
    // this.availableExcercisesInFS = fs.collection('availableExcercises').valueChanges();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableExcercisesInFS$ = this.store.select(
      fromTraining.getAvailableExercises
    );
    this.fetchExercises();

    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    // this.excerciseSubscription = this.trainingService.excercisesChanged.subscribe(
    //   (exercises) => {
    //     // this.isLoading = false;
    //     this.availableExcercisesInFS = exercises;
    //   }
    // );
    // this.fetchExercises();
    // this.trainingService.fetchAvailableExcercises();

    // this.fs is restructure and put to training services

    //  this.availableExcercisesInFS = this.fs
    //       .collection('availableExcercises')
    //       .snapshotChanges()
    //       .pipe(map(docArray =>{
    //         return docArray.map(doc =>{
    //           return {
    //             id: doc.payload.doc.id,
    //             name: doc.payload.doc.data()['name'],
    //             duration: doc.payload.doc.data()['duration'],
    //             calories: doc.payload.doc.data()['calories']
    //           }
    //         })

    //       }))
    // .subscribe(result =>{
    //   console.log(result)
    // })

    //  this.fs
    //   .collection('availableExcercises')
    //   .snapshotChanges()
    //   // .pipe(map(docArray =>{
    //   //   docArray.map(doc=>{
    //   //     return {
    //   //       id: doc.payload.doc.id,
    //   //       ...doc.payload.doc.data()
    //   //     }
    //   //   })
    //   // })
    //   // )
    //   .subscribe(result => {
    //     // for(const res of result){
    //     //   console.log(res.payload.doc.data())
    //     // }
    //     console.log(result);
    //   })

    // this.availableExcercisesInFS = this.fs
    // .collection('availableExcercises')
    // .valueChanges()

    // this.availableExcercisesInFS = this.fs
    // .collection('availableExcercises')
    // .valueChanges()
    //   .subscribe(result =>{
    //   console.log(result)
    // });
    // this.excercises = this.trainingService.getAvailableExcercises();
    // this.excercises = this.trainingService.availableExercise;
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    this.trainingService.startExcercise(form.value.excercise);
  }
  // onStartTraining(){
  //   // this.trainingStart.emit();
  //   this.trainingService.startExcercise();
  // }

  ngOnDestroy() {
    //   if (this.excerciseSubscription) {
    //     this.excerciseSubscription.unsubscribe();
    //   }
    //   if (this.loadingSubs) {
    //     this.loadingSubs.unsubscribe();
    //   }
    // }
  }
}
