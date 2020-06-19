import { all, debounce, takeLatest } from 'redux-saga/effects';
import { setMetricNameAction, setMetricValueAction, validateMetricsAction, removeMetricAction } from './actions';
import { validateMetricNameSaga } from './sagas/validateMetricNameSaga';
import { validateMetricValueSaga } from './sagas/validateMetricValueSaga';
import { validateAllMetricsSaga } from './sagas/validateAllMetricsSaga';
import { validateMetricSetSaga } from './sagas/validateMetricSetSaga';

const debounceDelay = 800;

export function* metricsSaga() {
    yield all([
        debounce(debounceDelay, setMetricNameAction.type, validateMetricNameSaga),
        debounce(debounceDelay, setMetricValueAction.type, validateMetricValueSaga),
        takeLatest(removeMetricAction.type, validateMetricSetSaga),
        takeLatest(validateMetricsAction.started.type, validateAllMetricsSaga)
    ]);
}
