import { Device } from '../models/device';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';

const delay = (milliseconds: number) => new Promise(delayedFunction => setTimeout(delayedFunction, milliseconds));
const DELAY = 200;

export const getHostName = async (): Promise<string> => {
    return delay(DELAY).then(() => 'hostName');
};

export interface GetDevicesParameters {
    hostName: string;
    sasToken: string;
}

export const getDevices = async (parameters: GetDevicesParameters): Promise<Device[]> => {
    const size = 150;
    const devices: Device[] = Array(size).fill(null).map((value, index) => {

        const authentication = (index % 3 === 0) ? 'x509' : (index % 5 === 0) ? 'Self Signed' : 'Shared Access Secret';  // tslint:disable-line: no-magic-numbers
        return {
            authentication,
            name: `device_${index.toString()}`,
        };
    });

    return delay(DELAY).then(() => devices);
};

export interface GetDeviceEdgeConfigurationParameters {
    hostName: string;
    sasToken: string;
    deviceName: string;
}
// tslint:disable-next-line: cyclomatic-complexity
export const getDeviceEdgeConfiguration = async (parameters: GetDeviceEdgeConfigurationParameters): Promise<DeviceEdgeConfiguration> => {
    const { deviceName } = parameters;
    const seed = Math.floor(Math.random() * 100); // tslint:disable-line: no-magic-numbers

    const edgeAgentSchemaVersion = (seed % 3 === 0) ? '1.0.0' : (seed % 5 === 0) ? '1.1.0' : '2.0.0';  // tslint:disable-line: no-magic-numbers
    const edgeHubSchemaVersion = (seed % 3 === 0) ? '1.0.1' : (seed % 5 === 0) ? '2.1.1' : '2.1.0';  // tslint:disable-line: no-magic-numbers
    const status =  (seed % 3 === 0) ? 'Running' : (seed % 5 === 0) ? 'Stopped' : 'Error';  // tslint:disable-line: no-magic-numbers

    return delay(DELAY).then(() => {
        return {
            deviceName,
            edgeAgentSchemaVersion,
            edgeHubSchemaVersion,
            edgeModules: Array(seed),
            status
        };
    });
};
