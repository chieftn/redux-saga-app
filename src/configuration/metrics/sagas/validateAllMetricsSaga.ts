import { select, call, all } from 'redux-saga/effects';
import { MetricsState } from '../state';
import { Metric } from '../models/metric';
import { StringMap } from '../../../devices/models/stringMap';
import { validateMetricName } from './validateMetricNameSaga';
import { validateMetricValue } from './validateMetricValueSaga';
import { validateMetricNameDuplicatesSaga } from './validateMetricNameDuplicatesSaga';

export function* validateAllMetricsSaga() {
    const metricsState: MetricsState = yield select((state: { metricsState: MetricsState}) => state.metricsState);

    yield all(Object.keys(metricsState.metrics).map(key => validateMetricSaga(metricsState.metrics, key, metricsState.metricsLastKey.toString())));
    yield call(validateMetricNameDuplicatesSaga);
}

export function* validateMetricSaga(metrics: StringMap<Metric>, key: string, lastKey: string) {
    const metric = metrics[key];
    yield call(validateMetricName, key, metric.name, metrics, lastKey);
    yield call(validateMetricValue, key, metric.value, metrics, lastKey, false);
}
