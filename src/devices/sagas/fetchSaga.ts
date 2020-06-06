import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchDevicesAction, fetchDeviceEdgeConfigurationAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';

export function* fetchSaga() {
    try {
        const hostName: string = yield call(getHostName);
        const sharedAccessAuthorizationRules = yield call(getSharedAccessAuthorizationRules);

        const sharedAccessAuthorizationRule = yield call(getCompatibleSharedAccessAuthorizationRule, {
            permissionEnumeration: 'read',
            sharedAccessAuthorizationRules
        });

        const sasToken = yield call(generateSharedAccessKey, {
            durationInSeconds: 200,
            sharedAccessAuthorizationRule,
        });

        const devices = yield call(getDevices, {
            hostName,
            sasToken
        });

        for (const device of devices) {
            const deviceEdgeConfiguration = yield call(getDeviceEdgeConfiguration, {
                deviceName: device.deviceName,
                hostName,
                sasToken,
            });

            yield put(fetchDeviceEdgeConfigurationAction.done({
                params: device.deviceName,
                result: deviceEdgeConfiguration
            }));
        }

        yield put(fetchDevicesAction.done({ result: devices }));
        yield call(toast, 'Devices Loaded', { type: 'success' });

    } catch (error) {
        yield put(fetchDevicesAction.failed(error));
        yield call(toast, 'An Error occurred', { type: 'error' });
    }
}
