import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './components/auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

// export interface State {
//   // type definition
//   isLoading: boolean;
// }

// const initialState = {
//   isLoading: false,
// };

// export function appReducer(state = initialState, action) {
//   //   return state;
//   switch (action.type) {
//     case 'START_LOADING':
//       return {
//         isLoading: true,
//       };
//     case 'STOP_LOADING':
//       return {
//         isLoading: false,
//       };
//     default:
//       return state;
//   }
// }
