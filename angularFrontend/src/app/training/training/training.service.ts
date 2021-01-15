import { Excercise } from './excercise.model';

export class TrainingService {
    public availableExercise: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
        { id: 'touch-toes', name: 'Touch Toes', duration: 130, calories: 28},
        { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 38},
        { id: 'burpess', name: 'Burpees', duration: 60, calories: 238}
    ];

    // reference type problematic object this one .slice() fixes  the issue
    getAvailableExcercises(){
        return this.availableExercise.slice();
    }
}

