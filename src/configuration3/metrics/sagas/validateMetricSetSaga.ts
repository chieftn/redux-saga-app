import { Action } from 'typescript-fsa';
import { put, select } from 'redux-saga/effects';
import { MetricsStateInterface } from '../state';
import { setMetricNameDuplicatesAction } from '../actions';
import { getDuplicateNames } from '../../utils/validationHelper';

export function* validateMetricSetSaga(action?: Action<string>) {
    const metrics = {...yield select((state: MetricsStateInterface) => state.metrics)};

    if (action) {
        // tslint:disable-next-line: no-console
        delete(metrics[action.payload]);
    }

    const duplicates = getDuplicateNames(metrics);
    yield put(setMetricNameDuplicatesAction(duplicates));
}
