import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { metricsInitialState, MetricsStateInterface } from './state';
import {
    setMetricNameAction,
    setMetricValueAction,
    setMetricNameValidationAction,
    setMetricValueValidationAction
} from './actions';

export const targetConditionReducer = reducerWithInitialState<MetricsStateInterface>(metricsInitialState())
    .case(setMetricNameAction, (state: MetricsStateInterface, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metrics = {...updatedState.metrics};
        updatedState.metrics[payload.key] = { name: payload.value, value: updatedState.metrics[payload.key].value };

        if (payload.key === updatedState.metricsLastKey.toString()) {
            const newKey = updatedState.metricsLastKey + 1;
            updatedState.metricsLastKey = newKey;
            updatedState.metrics[newKey.toString()] = {
                name: '',
                value: '',
            };
        }

        return updatedState;
    })
    .case(setMetricValueAction, (state: MetricsStateInterface, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metrics = {...updatedState.metrics};
        updatedState.metrics[payload.key] = { name: updatedState.metrics[payload.key].name, value: payload.value};

        if (payload.key === updatedState.metricsLastKey.toString()) {
            const newKey = updatedState.metricsLastKey + 1;
            updatedState.metricsLastKey = newKey;
            updatedState.metrics[newKey.toString()] = {
                name: '',
                value: '',
            };
        }

        return updatedState;
    })
    .case(setMetricNameValidationAction, (state: MetricsStateInterface, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metricsNameValidation = {...updatedState.metricsNameValidation};
        updatedState.metricsNameValidation[payload.key] = payload.value;

        return updatedState;

    })
    .case(setMetricValueValidationAction, (state: MetricsStateInterface, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metricsNameValidation = {...updatedState.metricsValueValidation};
        updatedState.metricsNameValidation[payload.key] = payload.value;

        return updatedState;
    });
