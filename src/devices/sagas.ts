import { takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchDevicesAction } from './actions';
import { fetchDevicesSaga, fetchDevicesEdgeConfigurationSaga } from './sagas/fetchSagaBetter';
export default [
    takeEvery(fetchDevicesAction.started.type, fetchDevicesSaga),
    takeLatest(fetchDevicesAction.done.type, fetchDevicesEdgeConfigurationSaga )
];
