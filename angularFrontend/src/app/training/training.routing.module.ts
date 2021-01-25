import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/auth/auth.guard';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  //   { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
