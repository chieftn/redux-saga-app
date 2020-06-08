import actionCreatorFactory from 'typescript-fsa';
import { Device } from './models/device';
import { DeviceEdgeConfiguration } from './models/deviceEdgeConfiguration';
import { SynchronizationWrapper } from './models/synchronizationWrapper';

const actionCreator = actionCreatorFactory('DEVICES');
export const fetchDevicesAction = actionCreator.async<undefined, Device[], Error>('GET');
export const setDevicesEdgeConfigurationAction = actionCreator<Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>>('SET_EDGE');
