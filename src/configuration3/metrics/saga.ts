import { all, debounce, takeLatest } from 'redux-saga/effects';
import { setMetricNameAction, setMetricValueAction, validateMetricsAction } from './actions';
import { validateMetricNameSaga } from './sagas/validateMetricNameSaga';
import { validateMetricValueSaga } from './sagas/validateMetricValueSaga';
import { validateAllMetricsSaga } from './sagas/validateAllMetricsSaga';

const debounceDelay = 800;

export function* metricsSaga() {
    yield all([
        debounce(debounceDelay, setMetricNameAction.type, validateMetricNameSaga),
        debounce(debounceDelay, setMetricValueAction.type, validateMetricValueSaga),
        takeLatest(validateMetricsAction.started.type, validateAllMetricsSaga)
    ]);
}
