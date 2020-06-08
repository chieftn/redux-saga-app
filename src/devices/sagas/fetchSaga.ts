import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchDevicesAction, setDeviceEdgeConfigurationAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { Device } from '../models/device';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { SynchronizationWrapper, SynchronizationStatus } from '../models/synchronizationWrapper';

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

        const devices: Device[] = yield call(getDevices, {
            hostName,
            sasToken
        });

        const devicesEdgeConfigurationMap = new Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>();
        for (const device of devices) {
            // tslint:disable-next-line: no-console
            console.log(`fetching edge configuration for ${device.name}`);
            const deviceEdgeConfiguration = yield call(getDeviceEdgeConfiguration, {
                deviceName: device.name,
                hostName,
                sasToken,
            });

            devicesEdgeConfigurationMap.set(device.name, {
                payload: deviceEdgeConfiguration,
                synchronizationStatus: SynchronizationStatus.fetched
            });
        }

        yield put(fetchDevicesAction.done({ result: devices }));
        yield put(setDeviceEdgeConfigurationAction(devicesEdgeConfigurationMap));
        yield call(toast, 'Devices Loaded', { type: 'success' });

    } catch (error) {
        yield put(fetchDevicesAction.failed({error}));
        yield call(toast, 'An error occurred', { type: 'error' });
    }
}
