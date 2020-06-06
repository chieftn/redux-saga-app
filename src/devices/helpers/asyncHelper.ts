import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { Device } from '../models/device';

export const getDeviceEntries = async (): Promise<{devices: Device[], devicesEdgeConfiguration: Map<string, DeviceEdgeConfiguration>}> => {
    try {
        const hostName: string = await getHostName();
        const sharedAccessAuthorizationRules = await getSharedAccessAuthorizationRules();

        const sharedAccessAuthorizationRule = getCompatibleSharedAccessAuthorizationRule({
            permissionEnumeration: 'read',
            sharedAccessAuthorizationRules
        });

        const sasToken = generateSharedAccessKey({
            durationInSeconds: 200,
            sharedAccessAuthorizationRule,
        });

        const devices = await getDevices({
            hostName,
            sasToken
        });

        const devicesEdgeConfigurationPromises = devices.map(device => getDeviceEdgeConfiguration({
            deviceName: device.name,
            hostName,
            sasToken,
        }));

        const devicesEdgeConfigurationArray = await Promise.all(devicesEdgeConfigurationPromises);
        const devicesEdgeConfiguration = new Map<string, DeviceEdgeConfiguration>();
        devicesEdgeConfigurationArray.forEach(edgeConfiguration => devicesEdgeConfiguration.set(edgeConfiguration.deviceName, edgeConfiguration));

        return {
            devices,
            devicesEdgeConfiguration
        };
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.log(`something bad happened, somewhere: ${error}`);

        // good luck user
        throw error;
    }
};
