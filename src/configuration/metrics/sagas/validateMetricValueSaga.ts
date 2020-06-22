import { Action } from 'typescript-fsa';
import { put, select } from 'redux-saga/effects';
import { setMetricNameValidationAction, setMetricValueValidationAction } from '../actions';
import { blankValidationKey } from '../contants';
import { MetricsState } from '../state';

export function* validateMetricValueSaga(action: Action<{key: string, value: string}>) {
    let validationKey = '';

    if (!action.payload.value) {
        const { metricsLastKey, metrics} = yield select((state: { metricsState: MetricsState}) => state);

        if (action.payload.key === metricsLastKey.toString() && !metrics[action.payload.key].name) {
            yield put(setMetricNameValidationAction([{ key: action.payload.key, value: validationKey}]));
            yield put(setMetricValueValidationAction([{ key: action.payload.key, value: validationKey}]));
            return;
        }

        validationKey = blankValidationKey;
    }

    yield put(setMetricValueValidationAction([{ key: action.payload.key, value: validationKey}]));
}
