import { takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchDevicesAction } from './actions';
import { fetchDevicesSaga, fetchDevicesEdgeConfigurationSaga } from './sagas/fetchSagaBetter';

export default [
    takeEvery(fetchDevicesAction.started.type, fetchDevicesSaga),
    takeLatest(fetchDevicesAction.done.type, fetchDevicesEdgeConfigurationSaga),
];

// import { takeEvery, takeLatest } from 'redux-saga/effects';
// import { fetchDevicesAction, setDevicesEdgeConfigurationAction } from './actions';
// import { fetchDevicesSaga, fetchDevicesEdgeConfigurationSaga, fetchDevicesDoneSaga } from './sagas/fetchSagaBetter';

// export default [
//     takeEvery(fetchDevicesAction.started.type, fetchDevicesSaga),
//     takeLatest(fetchDevicesAction.done.type, fetchDevicesEdgeConfigurationSaga),
//     takeEvery(setDevicesEdgeConfigurationAction, fetchDevicesDoneSaga)
// ];
