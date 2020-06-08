import { takeEvery } from 'redux-saga/effects';
import { fetchDevicesAction } from './actions';
import { fetchSaga  } from './sagas/fetchSaga';

export default [
    takeEvery(fetchDevicesAction.started.type, fetchSaga),
];
