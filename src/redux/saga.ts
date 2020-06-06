import { all } from 'redux-saga/effects';
import deviceSagas from '../devices/sagas';

export default function* rootSaga() {
    yield all([
        ...deviceSagas
    ]);
}
