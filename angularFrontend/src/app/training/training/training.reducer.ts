import { Action } from '@ngrx/store';
import { Excercise } from './excercise.model';
// import {
//   AuthActions,
//   SET_AUTHENTICATED,
//   SET_UNAUTHENTICATED,
// } from './training.actions';
import * as fromRoot from '../../app.reducer';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';

export interface TrainingState {
  availableExcercises: Excercise[];
  finishedExcercises: Excercise[];
  activeTraining: Excercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExcercises: [],
  finishedExcercises: [],
  activeTraining: null,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExcercises: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExcercises: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload,
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return state;
  }
}

export const getAvailableExcercises = (state: TrainingState) =>
  state.availableExcercises;
export const getFinishedExcercises = (state: TrainingState) =>
  state.finishedExcercises;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;
