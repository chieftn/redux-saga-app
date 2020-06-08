import { Map } from 'immutable';
import { Device } from './models/device';
import { SynchronizationWrapper, SynchronizationStatus } from './models/synchronizationWrapper';
import { DeviceEdgeConfiguration } from './models/deviceEdgeConfiguration';

export interface DevicesStateInterface {
    devices: SynchronizationWrapper<Device[]>;
    devicesEdgeConfiguration: Map<string, SynchronizationWrapper<DeviceEdgeConfiguration | undefined>>;
}

export const getInitialDevicesState = (): DevicesStateInterface => {
    return {
        devices: { payload: [], synchronizationStatus: SynchronizationStatus.initialized},
        devicesEdgeConfiguration: Map<string, SynchronizationWrapper<DeviceEdgeConfiguration | undefined>>()
    };
};
