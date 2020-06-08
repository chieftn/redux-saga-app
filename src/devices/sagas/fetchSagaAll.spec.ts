import { call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { Map } from 'immutable';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchSagaAll, fetchDeviceEdgeConfigurationSaga } from './fetchSagaAll';
import { fetchDevicesAction, setDevicesEdgeConfigurationAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { SynchronizationWrapper, SynchronizationStatus } from '../models/synchronizationWrapper';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { Device } from '../models/device';

const fetchSagaGenerator = cloneableGenerator(fetchSagaAll)();
describe('fetchSaga', () => {
    it('yields call getHostName', () => {
        expect(fetchSagaGenerator.next()).toEqual({
            done: false,
            value: call(getHostName)
        });
    });

    describe('getHostName throws', () => {
        let sagaInFailure;
        it('yields put to fetchDevicesAction.failed', () => {
            const error = new Error('badness');
            sagaInFailure = fetchSagaGenerator.clone();
            expect(sagaInFailure.throw(error)).toEqual({
                done: false,
                value: put(fetchDevicesAction.failed({error}))
            });
        });

        it('yields call to toast', () => {
            expect(sagaInFailure.next()).toEqual({
                done: false,
                value: call(toast, 'An error occurred.', {type: 'error'})
            });
        });

        it('finishes', () => {
            expect(sagaInFailure.next()).toEqual({
                done: true
            });
        });
    });

    it('yields call getSharedAccessAuthorizationRules', () => {
        expect(fetchSagaGenerator.next(hostName)).toEqual({
            done: false,
            value: call(getSharedAccessAuthorizationRules)
        });
    });

    it('yields call getCompatibleSharedAccessAuthorizationRule', () => {
        expect(fetchSagaGenerator.next(sharedAccessAuthorizationRules)).toEqual({
            done: false,
            value: call(getCompatibleSharedAccessAuthorizationRule, {
                permissionEnumeration: 'read',
                sharedAccessAuthorizationRules
            })
        });
    });

    it('yields call generateSharedAccessKey', () => {
        expect(fetchSagaGenerator.next(sharedAccessAuthorizationRule)).toEqual({
            done: false,
            value: call(generateSharedAccessKey, {
                durationInSeconds: 200,
                sharedAccessAuthorizationRule
            })
        });
    });

    it('yields call getDevices', () => {
        expect(fetchSagaGenerator.next(sasToken)).toEqual({
            done: false,
            value: call(getDevices, {
                hostName,
                sasToken
            })
        });
    });

    it('yields all to getEdgeDeviceConfiguration', () => {
        expect(fetchSagaGenerator.next(devices)).toMatchObject({
            done: false,
            value: all(devices.map((device: Device) => fetchDeviceEdgeConfigurationSaga(device, sasToken, hostName)))
        });
    });

    it('yields put to fetchDevicesAction.done', () => {
        expect(fetchSagaGenerator.next([
            deviceEdgeConfigurationMap.get(devices[0].name),
            deviceEdgeConfigurationMap.get(devices[1].name)
        ])).toEqual({
            done: false,
            value: put(fetchDevicesAction.done({result: devices}))
        });
    });

    it('yields put to setDevicesEdgeConfigurationAction', () => {
        expect(fetchSagaGenerator.next()).toEqual({
            done: false,
            value: put(setDevicesEdgeConfigurationAction(deviceEdgeConfigurationMap))
        });
    });

    it('yields call to toast', () => {
        expect(fetchSagaGenerator.next()).toEqual({
            done: false,
            value: call(toast, 'Devices Loaded', { type: 'success' })
        });
    });

    it('finishes', () => {
        expect(fetchSagaGenerator.next()).toEqual({
            done: true
        });
    });
});

const hostName = 'hostName';
const sharedAccessAuthorizationRules = [
    {
        name: 'rule1',
        permissions: 'read',
        primaryKey: 'primaryKey'
    }
];
const sharedAccessAuthorizationRule = sharedAccessAuthorizationRules[0];
const sasToken = 'sasToken';
const devices = [
    {
        authentication: 'auth',
        name: 'device1'
    },
    {
        authentication: 'auth',
        name: 'device2'
    }
];

const deviceEdgeConfigurationMap = Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>();
deviceEdgeConfigurationMap.set('device1', {
    payload: {
        deviceName: 'device1',
        edgeAgentSchemaVersion: '1.0.0',
        edgeHubSchemaVersion: '1.0.0',
        edgeModules: [],
        status: 'running'
    },
    synchronizationStatus: SynchronizationStatus.fetched,
});

deviceEdgeConfigurationMap.set('device2', {
    payload: {
        deviceName: 'device2',
        edgeAgentSchemaVersion: '1.0.1',
        edgeHubSchemaVersion: '1.0.1',
        edgeModules: [],
        status: 'running'
    },
    synchronizationStatus: SynchronizationStatus.fetched,
});
