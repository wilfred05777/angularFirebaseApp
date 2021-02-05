import { Action } from '@ngrx/store';
import { Excercise } from './excercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Set Start Training';
export const STOP_TRAINING = '[Training] Set Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  //payload
  constructor(public payload: Excercise[]) {}
}
export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Excercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: Excercise[]) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
  //   constructor(public payload: Excercise[]) {}
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
