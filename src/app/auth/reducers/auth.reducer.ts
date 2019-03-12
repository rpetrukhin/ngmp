import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }

    case AuthActionTypes.Logout: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }

    default: {
      return state;
    }
  }
}

const selectFeature = createFeatureSelector<State>('auth');

export const getIsAuthenticated = createSelector(
  selectFeature,
  (state: State) => state.isAuthenticated
);
