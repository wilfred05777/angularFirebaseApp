import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './components/auth/auth.services';
// import { TrainingModule } from './training/training.module';
// import { LoginComponent } from './components/auth/login/login.component';
// import { SignupComponent } from './components/auth/signup/signup.component';
// import { TrainingComponent } from './training/training.component';
import { TrainingComponent } from './training/training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    // https://angular.io/guide/lazy-loading-ngmodules
    path: 'training',
    loadChildren: () =>
      import('./../app/training/training.module').then((m) => m.TrainingModule),
  },
  // no longer works it has deferent syntax in official docs https://angular.io/guide/lazy-loading-ngmodules
  // {
  //   path: 'trainingModule',
  //   loadChildren: './training/training.module#TrainingModule',
  // },

  // { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'signup', component: SignupComponent },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
