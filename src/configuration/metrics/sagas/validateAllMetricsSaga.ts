import { select, call } from 'redux-saga/effects';
import { MetricsState } from '../state';
import { validateMetricName } from './validateMetricNameSaga';
import { validateMetricValue } from './validateMetricValueSaga';
import { validateMetricNameDuplicatesSaga } from './validateMetricNameDuplicatesSaga';

export function* validateAllMetricsSaga() {
    const metricsState: MetricsState = yield select((state: { metricsState: MetricsState}) => state.metricsState);

    yield call(validateMetricName, '0', metricsState.metrics['0'].name, metricsState.metrics, metricsState.metricsLastKey.toString());
    yield call(validateMetricValue, '0', metricsState.metrics['0'].value, metricsState.metrics, metricsState.metricsLastKey.toString(), false);

   /*  yield all(Object.keys(metricsState.metrics).map(key => {
        const metric = metricsState.metrics[key];
        // tslint:disable-next-line: no-console
        console.log('validating');
        validateMetricName(key, metric.name, metricsState.metrics, metricsState.metricsLastKey.toString());
        validateMetricValue(key, metric.value, metricsState.metrics, metricsState.metricsLastKey.toString(), false);
    })); */

    yield call(validateMetricNameDuplicatesSaga);

    // const result = yield call(getMetricValueValidation);
    // put metric value validations
}
