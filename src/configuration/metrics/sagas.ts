import { debounce, takeLatest } from 'redux-saga/effects';
import { setMetricNameAction, setMetricValueAction, validateMetricsAction, removeMetricAction } from './actions';
import { validateMetricNameSaga } from './sagas/validateMetricNameSaga';
import { validateMetricValueSaga } from './sagas/validateMetricValueSaga';
import { validateAllMetricsSaga } from './sagas/validateAllMetricsSaga';
import { validateMetricNameDuplicatesSaga } from './sagas/validateMetricNameDuplicatesSaga';

const debounceDelay = 800;

export const metricsSagas = () => {
    return [
        debounce(debounceDelay, setMetricNameAction.type, validateMetricNameSaga),
        debounce(debounceDelay, setMetricValueAction.type, validateMetricValueSaga),
        takeLatest(removeMetricAction.type, validateMetricNameDuplicatesSaga),
        takeLatest(validateMetricsAction.started.type, validateAllMetricsSaga)
    ];
};
