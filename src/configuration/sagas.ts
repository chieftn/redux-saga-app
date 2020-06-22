import { all } from 'redux-saga/effects';
import { metricsSagas } from './metrics/sagas';
import { targetConditionSagas } from './targetCondition/sagas';
import { statusSagas } from './status/sagas';

export function* configurationEntrySagas() {
    yield all([
        ...statusSagas(),
        ...metricsSagas(),
        ...targetConditionSagas(),
    ]);
}
