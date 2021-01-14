import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  //exit
  @Output() trainingExit = new EventEmitter();

  progress = 0;
  timer: number;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

    this.startOrResumeTimer();
    // this.timer = setInterval(()=>{
    //   this.progress = this.progress + 5;
    //   if(this.progress >= 100) {
    //     clearInterval(this.timer)
    //   }
    // }, 1000)

  }

  startOrResumeTimer(){
    this.timer = setInterval(()=>{
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop(){
    clearInterval(this.timer);
      const dialogRef = this.dialog.open(StopTrainingComponent, {
          data: {
          progress: this.progress
        }
      });
      
      dialogRef.afterClosed().subscribe(result =>{
        // Are you sure to quit: if selected is "yes" it will stop/terminated and go back to traning selectio
        if(result){
          this.trainingExit.emit();
        } 
        // Are you sure to quit: if selected is "No" it will resume and continue progress bar
        else{
          this.startOrResumeTimer();
        }
      });
  }

}
