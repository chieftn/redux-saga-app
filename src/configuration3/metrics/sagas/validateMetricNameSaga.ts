import { Action } from 'typescript-fsa';
import { put } from 'redux-saga/effects';
import { setMetricNameValidationAction } from '../actions';

export function* validateMetricNameSaga(action: Action<{key: string, value: string}>) {
    let validationKey = '';

    try {
        if (!action.payload.value) {
            validationKey = 'blank is not allowed';
        }

    } finally {
        yield put(setMetricNameValidationAction({ key: action.payload.key, value: validationKey}));
    }
}
