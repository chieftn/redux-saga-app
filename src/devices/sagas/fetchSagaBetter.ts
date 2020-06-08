import { call, put, all, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fetchDevicesAction, setDeviceEdgeConfigurationAction, setServiceParametersAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { Device } from '../models/device';
import { SynchronizationStatus } from '../models/synchronizationWrapper';
import { StateInterface } from '../../redux/state';

export function* fetchDevicesSaga() {
    try {
        const { hostName, sasToken } = yield call(fetchDataPlaneParameters, 'read');
        const devices: Device[] = yield call(getDevices, {
            hostName,
            sasToken
        });

        yield put(fetchDevicesAction.done({ result: devices }));
    }
    catch (error) {
        yield put(fetchDevicesAction.failed({error}));
    }
}

export function* fetchDeviceEdgeConfigurationSaga(device: Device) {
    try {
        const { hostName, sasToken } = yield call(fetchDataPlaneParameters, 'read');
        const payload = yield call(getDeviceEdgeConfiguration, {
            deviceName: device.name,
            hostName,
            sasToken
        });

        yield put(setDeviceEdgeConfigurationAction({
            name: device.name,
            value: {
                payload,
                synchronizationStatus: SynchronizationStatus.fetched
            }
        }));

    }
    catch (error) {
        yield put(setDeviceEdgeConfigurationAction({
            name: device.name,
            value: {
                error,
                payload: undefined,
                synchronizationStatus: SynchronizationStatus.failed
            }
        }));
    }
}

export function* fetchDevicesEdgeConfigurationSaga() {
    const devices: Device[] = yield select((state: StateInterface) => state.devices.devices.payload);
    yield all(devices.map((device: Device) => fetchDeviceEdgeConfigurationSaga(device)));
    yield call(toast, 'Devices Loaded', { type: 'success' });
}

export function* fetchDataPlaneParameters(permissionEnumeration: string) {
    try {
        const { hostName, sharedAccessAuthorizationRules} = yield call(fetchServiceParametersSaga);
        // const hostName: string = yield call(getHostName);
        // const sharedAccessAuthorizationRules = yield call(getSharedAccessAuthorizationRules);

        const sharedAccessAuthorizationRule = yield call(getCompatibleSharedAccessAuthorizationRule, {
            permissionEnumeration,
            sharedAccessAuthorizationRules
        });

        const sasToken = yield call(generateSharedAccessKey, {
            durationInSeconds: 2000,
            sharedAccessAuthorizationRule,
        });

        return {
            hostName,
            sasToken
        };
    } catch (error) {
        throw new Error('Unable to retrieve necessary information for data plane call.  Please ensure a permission with is available.');
    }
}

export function* fetchServiceParametersSaga() {
    const { hostName, sharedAccessAuthorizationRules } = yield select((state: StateInterface) => state.devices.serviceParameters);

    if (hostName) {
        return {
            hostName,
            sharedAccessAuthorizationRules
        };
    }

    const result = {
        hostName: yield call(getHostName),
        sharedAccessAuthorizationRules: yield call(getSharedAccessAuthorizationRules)
    };

    // tslint:disable-next-line: no-console
    console.log('blr' + result.hostName);
    yield put(setServiceParametersAction(result));
    return result;
}
