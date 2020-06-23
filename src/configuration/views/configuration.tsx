import * as React from 'react';
import { useAsyncSagaReducer } from '../hooks/useAsyncSagaReducer';
import { configurationEntryReducer } from '../reducer';
import { configurationEntrySagas } from '../sagas';
import { configurationEntryInitialState } from '../state';
import { TargetCondition } from '../targetCondition/components/targetCondition';
import { ConfigurationMetrics } from '../metrics/components/configurationMetrics';
import { setTargetConditionAction } from '../targetCondition/actions';
import { setMetricNameAction, setMetricValueAction, removeMetricAction } from '../metrics/actions';
import { initializeConfigurationAction } from '../status/actions';
import { FormState } from '../status/models/formState';
import './configuration.css';

export const Configuration: React.FC = () => {

    const [ {targetConditionState, metricsState, configurationEntryStatusState }, dispatch ] = useAsyncSagaReducer(configurationEntryReducer, configurationEntrySagas, configurationEntryInitialState());

    React.useEffect(() => {
        dispatch(initializeConfigurationAction.started());
    }, []);  // tslint:disable-line: align

    // tslint:disable-next-line: no-console
    console.log('rendering' + JSON.stringify(configurationEntryStatusState));

    const onTargetConditionChange = (value: string) => {
        dispatch(setTargetConditionAction(value));
    };

    const onMetricNameChange = (key: string, value: string) => {
        dispatch(setMetricNameAction({key, value}));
    };

    const onMetricValueChange = (key: string, value: string) => {
        dispatch(setMetricValueAction({key, value}));
    };

    const onMetricDelete = (key: string) => {
        dispatch(removeMetricAction(key));
    };

    if (configurationEntryStatusState.formState === FormState.INITIALIZING) {
        return <div>...initializing</div>;
    }

    if (configurationEntryStatusState.formState === FormState.VALIDATING) {
        return <div>...validating</div>;
    }

    return (
        <div className="configuration-form">
            {targetConditionState && (
                <TargetCondition
                    targetConditionState={targetConditionState}
                    onTargetConditionChange={onTargetConditionChange}
                />
            )}

            {metricsState && (
                <ConfigurationMetrics
                    metrics={metricsState.metrics}
                    metricsNameValidation={metricsState.metricsNameValidation}
                    metricsValueValidation={metricsState.metricsValueValidation}
                    onMetricNameChange={onMetricNameChange}
                    onMetricValueChange={onMetricValueChange}
                    onMetricDelete={onMetricDelete}
                />
            )}
        </div>
    );
};
