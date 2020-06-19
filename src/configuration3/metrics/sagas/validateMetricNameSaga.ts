import { Action } from 'typescript-fsa';
import { put, call, select } from 'redux-saga/effects';
import { setMetricNameValidationAction, setMetricValueValidationAction } from '../actions';
import { validateMetricSetSaga } from './validateMetricSetSaga';
import { blankValidationKey } from '../contants';
import { MetricsStateInterface } from '../state';

export function* validateMetricNameSaga(action: Action<{key: string, value: string}>) {
    let validationKey = '';
    const { metricsLastKey, metrics} = yield select((state: MetricsStateInterface) => state);

    if (!action.payload.value) {
        if (action.payload.key === metricsLastKey.toString() && !metrics[action.payload.key].value) {
            yield put(setMetricNameValidationAction([{ key: action.payload.key, value: validationKey}]));
            yield put(setMetricValueValidationAction([{ key: action.payload.key, value: validationKey}]));
            yield call(validateMetricSetSaga);
            return;
        }

        validationKey = blankValidationKey;
    }

    yield put(setMetricNameValidationAction([{ key: action.payload.key, value: validationKey}]));
    yield call(validateMetricSetSaga);
}
