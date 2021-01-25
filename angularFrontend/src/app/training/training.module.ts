import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training/training.component';
// import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    // CommonModule,
    // MaterialModule,
    // ReactiveFormsModule,
    // FormsModule,
    // FlexLayoutModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
