import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Excercise } from './excercise.model';
import * as fromRoot from '../../app.reducer';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';

export interface TrainingState {
  availableExercises: Excercise[];
  finishedExcercises: Excercise[];
  activeTraining: Excercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExcercises: [],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExcercises: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        // activeTraining: action.payload,
        activeTraining: {
          ...state.availableExercises.find((ex) => ex.id === action.payload),
        },
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

export const getTrainingState = createFeatureSelector<TrainingState>(
  'training'
);
export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExcercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExcercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
