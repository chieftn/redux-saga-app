import actionCreatorFactory from 'typescript-fsa';
import { Device } from './models/device';
import { DeviceEdgeConfiguration } from './models/deviceEdgeConfiguration';
import { Error } from './models/error';

const actionCreator = actionCreatorFactory('DEVICES');
export const fetchDevicesAction = actionCreator.async<undefined, Device[], Error>('GET');
export const fetchDeviceEdgeConfigurationAction = actionCreator.async<string, DeviceEdgeConfiguration, Error>('GET_EDGE');
