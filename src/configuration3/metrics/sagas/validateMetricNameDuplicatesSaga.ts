import { Action } from 'typescript-fsa';
import { put, select } from 'redux-saga/effects';
import { MetricsState } from '../state';
import { setMetricNameDuplicatesAction } from '../actions';
import { getDuplicateNames } from '../../utils/validationHelper';

export function* validateMetricNameDuplicatesSaga(action?: Action<string>) {
    const metrics = {...yield select((state: MetricsState) => state.metrics)};

    if (action) {
        // if the validation triggered by a delete action -- that entry is no longer part of the set.
        delete(metrics[action.payload]);
    }

    const duplicates = getDuplicateNames(metrics);
    yield put(setMetricNameDuplicatesAction(duplicates));
}
