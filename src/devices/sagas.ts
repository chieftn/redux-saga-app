import { takeLatest } from 'redux-saga/effects';
import { fetchDevicesAction } from './actions';
// import { fetchSaga } from './sagas/fetchSaga';
import { fetchSagaAll as fetchSaga } from './sagas/fetchSagaAll';

export default [
    takeLatest(fetchDevicesAction.started.type, fetchSaga)
];
