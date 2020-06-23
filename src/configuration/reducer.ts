import { Action } from 'typescript-fsa';
import { ConfigurationEntryState } from './state';
import { METRIC } from './metrics/actions';
import { metricsReducer } from './metrics/reducer';
import { STATUS } from './status/actions';
import { configurationStatusReducer } from './status/reducer';
import { TARGET_CONDITION } from './targetCondition/actions';
import { targetConditionReducer } from './targetCondition/reducer';

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

    if (action.type.startsWith(STATUS)) {
      const updatedState = {...state};
      updatedState.configurationEntryStatusState = configurationStatusReducer(state.configurationEntryStatusState, action);
      return updatedState;
    }

    return state;
};
