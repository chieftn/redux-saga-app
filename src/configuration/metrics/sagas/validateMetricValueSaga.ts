import { Action } from 'typescript-fsa';
import { call, put, select } from 'redux-saga/effects';
import { StringMap } from '../../../devices/models/stringMap';
import { Metric } from '../models/metric';
import { setMetricNameValidationAction, setMetricValueValidationAction } from '../actions';
import { blankValidationKey } from '../contants';
import { MetricsState } from '../state';

export function* validateMetricValueSaga(action: Action<{key: string, value: string}>) {
    const { metricsLastKey, metrics} = yield select((state: { metricsState: MetricsState}) => state.metricsState);

    yield call(validateMetricValue, action.payload.key, action.payload.value, metrics, metricsLastKey, true);
}

export function* validateMetricValue(key: string, metricValue: string, metrics: StringMap<Metric>, metricsLastKey: string, serverValidation: boolean = false) {
    let validationKey = '';
    // tslint:disable-next-line: no-console
    console.log('here we are 2');

    try {
        if (!metricValue) {
            // tslint:disable-next-line: no-console
            console.log('here we go');
            if (key === metricsLastKey.toString() && !metrics[key].name) {
                yield put(setMetricNameValidationAction([{ key, value: validationKey}]));
                yield put(setMetricValueValidationAction([{ key, value: validationKey}]));
                return;
            }

            validationKey = blankValidationKey;
            return;
        }

        if (serverValidation) {
            // const result = yield call serverValidation;
            validationKey = 'badServerValidation';
        }
    }
    catch (error) {
        validationKey = 'unableToValidate';
    }
    finally {
        yield put(setMetricValueValidationAction([{ key, value: validationKey}]));
    }
}
