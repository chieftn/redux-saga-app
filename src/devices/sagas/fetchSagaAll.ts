import { call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchDevicesAction, setDevicesEdgeConfigurationAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { Device } from '../models/device';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { SynchronizationWrapper, SynchronizationStatus } from '../models/synchronizationWrapper';

export function* fetchSagaAll() {
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

        const devices: Device[] = yield call(getDevices, {
            hostName,
            sasToken
        });

        const devicesEdgeConfigurationMap = new Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>();
        const result: Array<SynchronizationWrapper<DeviceEdgeConfiguration>> = yield all(devices.map((device: Device) => fetchDeviceEdgeConfigurationSaga(device, sasToken, hostName)));
        result.forEach(s => devicesEdgeConfigurationMap.set(s.payload.deviceName, s));

        yield put(fetchDevicesAction.done({ result: devices }));
        yield put(setDevicesEdgeConfigurationAction(devicesEdgeConfigurationMap));
        yield call(toast, 'Devices Loaded', { type: 'success' });

    } catch (error) {
        yield put(fetchDevicesAction.failed({error}));
        yield call(toast, 'An error occurred.', { type: 'error' });
    }
}

export function* fetchDeviceEdgeConfigurationSaga(device: Device, sasToken: string, hostName: string) {
    const payload = yield call(getDeviceEdgeConfiguration, {
        deviceName: device.name,
        hostName,
        sasToken
    });

    return {
        payload,
        synchronizationStatus: SynchronizationStatus.fetched
    };
}
