import { MetricsState, metricsInitialState } from '../metrics/state';
import { TargetConditionState, targetConditionInitialState } from '../targetCondition/state';
import { ConfigurationEntry } from './models/configurationEntry';

export interface ConfigurationEntryState {
    configurationEntry?: ConfigurationEntry;
    metricsState: MetricsState;
    targetConditionState: TargetConditionState;
}

export const configurationEntryInitialState = (): ConfigurationEntryState => {
    return {
        metricsState: metricsInitialState(),
        targetConditionState: targetConditionInitialState()
    };
};
