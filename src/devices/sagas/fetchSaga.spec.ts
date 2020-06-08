import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchSaga } from './fetchSaga';
import { fetchDevicesAction, setDeviceEdgeConfigurationAction } from '../actions';
import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { SynchronizationWrapper, SynchronizationStatus } from '../models/synchronizationWrapper';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';

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
                value: call(toast, 'An error occurred', {type: 'error'})
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
                value: call(toast, 'An error occurred', {type: 'error'})
            });
        });

        it('finishes', () => {
            expect(sagaInFailure.next()).toEqual({
                done: true
            });
        });
    });

    it('yields call getCompatibleSharedAccessAuthorizationRule', () => {
    });

});

const fetchSagaGenerator = cloneableGenerator(fetchSaga)();
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

const deviceEdgeConfigurationMap = new Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>();
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
