import { Action } from 'typescript-fsa';
import { put } from 'redux-saga/effects';
import { setMetricValueValidationAction } from '../actions';

export function* validateMetricValueSaga(action: Action<{key: string, value: string}>) {
    let validationKey = '';

    try {
        if (!action.payload.value) {
            validationKey = 'blank is not allowed';
        }

    } finally {
        yield put(setMetricValueValidationAction({ key: action.payload.key, value: validationKey}));
    }
}
