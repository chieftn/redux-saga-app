import { Action } from 'typescript-fsa';
import { put, call, select } from 'redux-saga/effects';
import { Metric } from '../models/metric';
import { StringMap } from '../../../devices/models/stringMap';
import { setMetricNameValidationAction, setMetricValueValidationAction } from '../actions';
import { validateMetricNameDuplicatesSaga } from './validateMetricNameDuplicatesSaga';
import { blankValidationKey } from '../contants';
import { MetricsState } from '../state';

export function* validateMetricNameSaga(action: Action<{key: string, value: string}>) {
    // tslint:disable-next-line: no-console
    console.log('action: ' + action.type);

    const { metricsLastKey, metrics} = yield select((state: MetricsState) => state);

    yield call(validateMetricName, action.payload.key, action.payload.value, metrics, metricsLastKey);
    yield call(validateMetricNameDuplicatesSaga);
}

export function* validateMetricName(key: string, metricName: string, metrics: StringMap<Metric>, metricsLastKey: string) {
    let validationKey = '';

    if (!metricName) {
        if (key === metricsLastKey.toString() && !metrics[key].value) {
            yield put(setMetricNameValidationAction([{ key, value: validationKey}]));
            yield put(setMetricValueValidationAction([{ key, value: validationKey}]));
            return;
        }

        validationKey = blankValidationKey;
    }

    yield put(setMetricNameValidationAction([{ key, value: validationKey}]));
}
