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

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // availableExcercisesInFS: Observable<any[]>;
  // availableExcercisesInFS: Observable<Excercise[]>;
  availableExcercisesInFS: Excercise[];
  excerciseSubscription: Subscription;

  @Output() trainingStart = new EventEmitter<void>();
  // excercises: Excercise[] = [];
  // excercises: Observable<any[]>;
  // excercises: Excercise[];

  constructor(
    private trainingService: TrainingService,
    private fs: AngularFirestore
  ) {
    // this.availableExcercisesInFS = fs.collection('availableExcercises').valueChanges();
  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExcercises();
    this.excerciseSubscription = this.trainingService.excercisesChanged.subscribe(
      (exercises) => (this.availableExcercisesInFS = exercises)
    );

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

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    this.trainingService.startExcercise(form.value.excercise);
  }
  // onStartTraining(){
  //   // this.trainingStart.emit();
  //   this.trainingService.startExcercise();
  // }

  ngOnDestroy() {
    this.excerciseSubscription.unsubscribe();
  }
}
