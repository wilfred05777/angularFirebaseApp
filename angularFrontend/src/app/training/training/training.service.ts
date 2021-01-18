import { Subject } from 'rxjs';

import { Excercise } from './excercise.model';

export class TrainingService {
    excerciseChanged = new Subject<Excercise>();

    private availableExercise: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
        { id: 'touch-toes', name: 'Touch Toes', duration: 130, calories: 28},
        { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 38},
        { id: 'burpess', name: 'Burpees', duration: 60, calories: 238}
    ];

    private runningExcercise: Excercise;
    private excercises: Excercise[] = [];

    // reference type problematic object this one .slice() fixes  the issue
    getAvailableExcercises(){
        return this.availableExercise.slice();
    }

    startExcercise(selectedId: string){

        this.runningExcercise = this.availableExercise.find(
            ex=> ex.id === selectedId)
        this.excerciseChanged.next({ ...this.runningExcercise });
        // const selectedExcercise = this.availableExercise.find(ex=> ex.id === selectedId)
        // this.runningExcercise = selectedExcercise;
    }

    completeExercise(){
        this.excercises.push({
            ...this.runningExcercise, 
            date: new Date(),
            state: 'completed'
        });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    cancelExcercise(progress: number){
        this.excercises.push({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress/100),
            calories: this.runningExcercise.duration * (progress/100) , 
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    getRunningExercise(){
        return {...this.runningExcercise};    
    }
}

