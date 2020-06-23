import { put } from 'redux-saga/effects';
import { setDirtyFlagAction } from '../actions';

export function* setDirtyFlagSaga() {
    // tslint:disable-next-line: no-console
    console.log('setting dirty flag');
    yield put(setDirtyFlagAction());
}
