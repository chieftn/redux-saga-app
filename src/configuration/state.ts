import { MetricsState, metricsInitialState } from './metrics/state';
import { TargetConditionState, targetConditionInitialState } from './targetCondition/state';
import { ConfigurationEntryStatusState, configurationEntryStatusStateInitial } from './status/state';

export interface ConfigurationEntryState {
    configurationEntryStatusState: ConfigurationEntryStatusState;
    metricsState: MetricsState;
    targetConditionState: TargetConditionState;
}

export const configurationEntryInitialState = (): ConfigurationEntryState => {
    return {
        configurationEntryStatusState: configurationEntryStatusStateInitial(),
        metricsState: metricsInitialState(),
        targetConditionState: targetConditionInitialState()
    };
};
