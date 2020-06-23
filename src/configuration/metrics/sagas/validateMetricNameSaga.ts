import { Action } from 'typescript-fsa';
import { put, call, select } from 'redux-saga/effects';
import { Metric } from '../models/metric';
import { StringMap } from '../../../devices/models/stringMap';
import { setMetricNameValidationAction, setMetricValueValidationAction } from '../actions';
import { validDictionaryEntry } from '../../utils/validationHelper';
import { validateMetricNameDuplicatesSaga } from './validateMetricNameDuplicatesSaga';
import { blankValidationKey, invalidDictionaryEntry } from '../contants';
import { MetricsState } from '../state';

export function* validateMetricNameSaga(action: Action<{key: string, value: string}>) {
    const { metricsLastKey, metrics} = yield select((state: { metricsState: MetricsState}) => state.metricsState);

    yield call(validateMetricName, action.payload.key, action.payload.value, metrics, metricsLastKey);
    yield call(validateMetricNameDuplicatesSaga);
}

export function* validateMetricName(key: string, metricName: string, metrics: StringMap<Metric>, metricsLastKey: string) {
    let validationKey = '';
    // tslint:disable-next-line: no-console
    console.log('here we are 1');

    try {
        if (!metricName) {
            if (key === metricsLastKey.toString() && !metrics[key].value) {
                yield put(setMetricNameValidationAction([{ key, value: validationKey}]));
                yield put(setMetricValueValidationAction([{ key, value: validationKey}]));
                return;
            }

            validationKey = blankValidationKey;
            return;
        }

        if (!validDictionaryEntry(metricName)) {
            validationKey = invalidDictionaryEntry;
            return;
        }
    } finally {
        yield put(setMetricNameValidationAction([{ key, value: validationKey}]));
    }
}
