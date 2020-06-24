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
//     takeEvery(setDevicesEdgeConfigurationAction, fetchDevicesDoneSaga),
// ];

// import { takeEvery, takeLatest, debounce } from 'redux-saga/effects';
// import { fetchDevicesAction, setDevicesEdgeConfigurationAction, submitDeviceAction } from './actions';
// import { fetchDevicesSaga, fetchDevicesEdgeConfigurationSaga, fetchDevicesDoneSaga } from './sagas/fetchSagaBetter';
// import { submitDeviceSaga } from './sagas/submitDeviceSaga';
// import { logSaga } from './sagas/logSaga';

// export default [
//     takeEvery(fetchDevicesAction.started.type, fetchDevicesSaga),
//     takeLatest(fetchDevicesAction.done.type, fetchDevicesEdgeConfigurationSaga),
//     takeEvery(setDevicesEdgeConfigurationAction, fetchDevicesDoneSaga),
//     takeEvery('*', logSaga),
//     debounce(500, submitDeviceAction, submitDeviceSaga)  // tslint:disable-line: no-magic-numbers
// ];
