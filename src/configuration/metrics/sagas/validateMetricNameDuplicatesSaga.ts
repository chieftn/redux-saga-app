import { Action } from 'typescript-fsa';
import { put, select } from 'redux-saga/effects';
import { MetricsState } from '../state';
import { setMetricNameDuplicatesAction } from '../actions';
import { getDuplicateNames } from '../../utils/validationHelper';

export function* validateMetricNameDuplicatesSaga(action?: Action<string>) {
    const metrics = {...yield select((state: { metricsState: MetricsState}) => state.metricsState.metrics)};

    if (action) {
        // tslint:disable-next-line: no-console
        console.log('deleting');
        // if the validation triggered by a delete action -- that entry is no longer part of the set.
        delete(metrics[action.payload]);
    }

    const duplicates = getDuplicateNames(metrics);
    yield put(setMetricNameDuplicatesAction(duplicates));
}
