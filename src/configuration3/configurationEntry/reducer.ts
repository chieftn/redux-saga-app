import { Action } from 'typescript-fsa';
import { ConfigurationEntryState } from './state';
import { metricsReducer } from '../metrics/reducer';
import { METRIC } from '../metrics/actions';
import { TARGET_CONDITION } from '../targetCondition/actions';
import { targetConditionReducer } from '../targetCondition/reducer';

// tslint:disable-next-line: no-any
export const configurationEntryReducer = (state: ConfigurationEntryState, action: Action<any>): ConfigurationEntryState => {
    if (action.type.startsWith(TARGET_CONDITION)) {
      const updatedState = {...state};
      updatedState.targetConditionState = targetConditionReducer(state.targetConditionState, action);
      return updatedState;
    }

    if (action.type.startsWith(METRIC)) {
      const updatedState = {...state};
      updatedState.metricsState = metricsReducer(state.metricsState, action);
      return updatedState;
    }

    return state;
};
