import actionCreatorFactory from 'typescript-fsa';
import { Map } from 'immutable';
import { Device } from './models/device';
import { DeviceEdgeConfiguration } from './models/deviceEdgeConfiguration';
import { SynchronizationWrapper } from './models/synchronizationWrapper';
import { SharedAccessAuthorizationRule } from './models/sharedAccessAuthorizationRule';

const actionCreator = actionCreatorFactory('DEVICES');
export const fetchDevicesAction = actionCreator.async<undefined, Device[], Error>('GET');
export const setDevicesEdgeConfigurationAction = actionCreator<Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>>('SET_EDGE');
export const setDeviceEdgeConfigurationAction = actionCreator<{name: string, value: SynchronizationWrapper<DeviceEdgeConfiguration | undefined>}>('SET_EDGE_DEVICE');
export const setServiceParametersAction = actionCreator<{ hostName: string, sharedAccessAuthorizationRules: SharedAccessAuthorizationRule[]}>('SET_SERVICE');
