import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { MetricsState } from './state';
import { maxMetricCount, duplicationValidationKey } from './contants';
import {
    KeyValue,
    setMetricNameAction,
    setMetricValueAction,
    setMetricNameDuplicatesAction,
    setMetricNameValidationAction,
    setMetricValueValidationAction,
    removeMetricAction
} from './actions';

export const metricsReducer = reducerWithoutInitialState<MetricsState>()
    .case(setMetricNameAction, (state: MetricsState, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metrics = {...updatedState.metrics};
        updatedState.metrics[payload.key] = { name: payload.value, value: updatedState.metrics[payload.key].value };

        if (Object.keys(updatedState.metrics).length >= maxMetricCount) {
            return updatedState;
        }

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
    .case(setMetricValueAction, (state: MetricsState, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.metrics = {...updatedState.metrics};
        updatedState.metrics[payload.key] = { name: updatedState.metrics[payload.key].name, value: payload.value};

        if (Object.keys(updatedState.metrics).length >= maxMetricCount) {
            return updatedState;
        }

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
    .case(setMetricNameValidationAction, (state: MetricsState, payload: KeyValue[]) => {
        const updatedState = {...state};
        updatedState.metricsNameValidation = {...updatedState.metricsNameValidation};
        payload.forEach(keyValue => updatedState.metricsNameValidation[keyValue.key] = keyValue.value);

        return updatedState;
    })
    .case(setMetricValueValidationAction, (state: MetricsState, payload: KeyValue[]) => {
        const updatedState = {...state};
        updatedState.metricsValueValidation = {...updatedState.metricsValueValidation};
        payload.forEach(keyValue => updatedState.metricsValueValidation[keyValue.key] = keyValue.value);

        return updatedState;
    })
    .case(removeMetricAction, (state: MetricsState, payload: string) => {
        const updatedState = {...state};
        updatedState.metrics = {...updatedState.metrics};

        // add new entry iff the max allowed count had been reached
        const lastMetric = updatedState.metrics[updatedState.metricsLastKey];

        if (Object.keys(updatedState.metrics).length === maxMetricCount && (lastMetric.name || lastMetric.value )) {
            const newKey = updatedState.metricsLastKey + 1;
            updatedState.metricsLastKey = newKey;
            updatedState.metrics[newKey.toString()] = {
                name: '',
                value: '',
            };
        }

        delete(updatedState.metrics[payload]);
        return updatedState;
    })
    .case(setMetricNameDuplicatesAction, (state: MetricsState, payload: Set<string>) => {
        // tslint:disable-next-line: no-console
        console.log('here' + payload.has('a'));

        const updatedState = {...state};
        updatedState.metricsNameValidation = {...updatedState.metricsNameValidation};

        Object.keys(updatedState.metrics).forEach(key => {
            if (payload.has(updatedState.metrics[key].name)) {
                // retain existing error key if defined
                updatedState.metricsNameValidation[key] = updatedState.metricsNameValidation[key] || duplicationValidationKey;
            } else if (updatedState.metricsNameValidation[key] === duplicationValidationKey) {
                // remove duplicate key
                updatedState.metricsNameValidation[key] = '';
            }
        });

        return updatedState;
    });
