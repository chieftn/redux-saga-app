import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { useAsyncSagaReducer } from '../hooks/useAsyncSagaReducer';
import { configurationEntryReducer } from '../reducer';
import { configurationEntrySagas } from '../sagas';
import { configurationEntryInitialState } from '../state';
import { TargetCondition } from '../targetCondition/components/targetCondition';
import { ConfigurationMetrics } from '../metrics/components/configurationMetrics';
import { setTargetConditionAction } from '../targetCondition/actions';
import { setMetricNameAction, setMetricValueAction, removeMetricAction } from '../metrics/actions';
import { initializeConfigurationAction, validateConfigurationAction } from '../status/actions';
import { FormState } from '../status/models/formState';
import './configuration.css';

export const Configuration: React.FC = () => {

    const [ {targetConditionState, metricsState, configurationEntryStatusState }, dispatch ] = useAsyncSagaReducer(configurationEntryReducer, configurationEntrySagas, configurationEntryInitialState());

    React.useEffect(() => {
        dispatch(initializeConfigurationAction.started());
    }, []);  // tslint:disable-line: align

    const { targetCondition } = targetConditionState;
    const useTargetCondition = React.useMemo(() => {
        const onTargetConditionChange = (value: string) => {
            dispatch(setTargetConditionAction(value));
        };

        return (
            <TargetCondition
                targetConditionState={targetConditionState}
                onTargetConditionChange={onTargetConditionChange}
            />
        );
    },                                       [targetCondition]);

    const onMetricNameChange = (key: string, value: string) => {
        dispatch(setMetricNameAction({key, value}));
    };

    const onMetricValueChange = (key: string, value: string) => {
        dispatch(setMetricValueAction({key, value}));
    };

    const onMetricDelete = (key: string) => {
        dispatch(removeMetricAction(key));
    };

    const onSubmitClick = () => {
        dispatch(validateConfigurationAction.started());
    };

    if (configurationEntryStatusState.formState === FormState.INITIALIZING) {
        return <div>...initializing</div>;
    }

    if (configurationEntryStatusState.formState === FormState.VALIDATING) {
        return <div>...validating</div>;
    }

    return (
        <div className="configuration-form">
            {useTargetCondition}

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

            <PrimaryButton
                text="Submit"
                onClick={onSubmitClick}
            />
        </div>
    );
};
