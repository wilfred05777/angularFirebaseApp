import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material.module';
import { WelcomeComponent } from './welcome/welcome.component';

// import { LoginComponent } from './components/auth/login/login.component';
// import { NewTrainingComponent } from './training/new-training/new-training.component';
// import { CurrentTrainingComponent } from './training/current-training/current-training.component';
// import { PastTrainingComponent } from './training/past-training/past-training.component';
// import { TrainingComponent } from './training/training/training.component';
// import { SignupComponent } from './components/auth/signup/signup.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TrainingModule } from './training/training.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './components/auth/auth.services';
import { TrainingService } from './training/training/training.service';

// import { firebase } from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './components/auth/auth.modules';

import { StoreModule } from '@ngrx/store';
// import { appReducer } from './app.reducer';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupComponent,
    // NewTrainingComponent,
    // CurrentTrainingComponent,
    // PastTrainingComponent,
    // TrainingComponent,
    // StopTrainingComponent,

    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    // ReactiveFormsModule,
    // FormsModule,
    // AngularFireAuthModule,
    // TrainingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AuthModule,
    // StoreModule.forRoot({ ui: appReducer }),
    StoreModule.forRoot(reducers),
  ],
  providers: [TrainingService, AuthService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
