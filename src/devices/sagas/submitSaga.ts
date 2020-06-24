import { delay } from 'redux-saga/effects';

export function* submitSaga() {
    // tslint:disable-next-line: no-console
    console.log('submtting started');

    // tslint:disable-next-line: no-magic-numbers
    yield delay(500);

    // tslint:disable-next-line: no-console
    console.log('submitting done')

}