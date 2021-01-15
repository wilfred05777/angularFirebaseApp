import { Excercise } from './excercise.model';

export class TrainingService {
    private availableExercise: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
        { id: 'touch-toes', name: 'Touch Toes', duration: 130, calories: 28},
        { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 38},
        { id: 'burpess', name: 'Burpees', duration: 60, calories: 238}
    ];

    private runningExcercise: Excercise;

    // reference type problematic object this one .slice() fixes  the issue
    getAvailableExcercises(){
        return this.availableExercise.slice();
    }

    startExcercise(selectedId: string){
        const selectedExcercise = this.availableExercise.find(ex=> ex.id === selectedId)
        this.runningExcercise = selectedExcercise;
    }
}

