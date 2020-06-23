import { delay, put } from 'redux-saga/effects';
import { initializeConfigurationAction } from '../actions';

export function* initializeConfigurationSaga() {
    // tslint:disable-next-line: no-console
    console.log('initializing form');

    // tslint:disable-next-line: no-magic-numbers
    yield delay(2000);

    try {
        // fetch data parameters from parent blade (e.g. clone / scenario type / et al)
        // fetch configuration if clone
        // parse configuration
        // set values for target condition, metrics, labels
        // parse edge values;

        yield put(initializeConfigurationAction.done({}));
    } catch (error) {
        yield put(initializeConfigurationAction.failed({
            error: {
                key: 'initializationFailedKey'
            }
        }));
    }
}
