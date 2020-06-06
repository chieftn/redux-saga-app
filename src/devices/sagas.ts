import { takeLatest } from 'redux-saga/effects';
import { fetchDevicesAction } from './actions';
import { fetchSaga } from './sagas/fetchSaga';

export default [
    takeLatest(fetchDevicesAction.started.type, fetchSaga)
];
