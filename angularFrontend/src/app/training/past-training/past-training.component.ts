import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Excercise } from '../training/excercise.model';
import { TrainingService } from '../training/training.service';
import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  private exChangedSubscription: Subscription;

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 20];

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedExcercises)
      .subscribe((exercises: Excercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchCompletedOrCancelledExcercise();

    // this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
    //   (exercises: Excercise[]) => {
    //     this.dataSource.data = exercises;
    //   }
    // );
    // this.trainingService.fetchCompletedOrCancelledExcercise();
    // this.dataSource.data = this.trainingService.getCompletedOrCancelledExcercise();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
