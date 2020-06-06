import { getHostName, getSharedAccessAuthorizationRules } from '../services/iotHubService';
import { getDevices, getDeviceEdgeConfiguration } from '../services/deviceService';
import { getCompatibleSharedAccessAuthorizationRule, generateSharedAccessKey } from '../helpers/sharedAccessKeyHelper';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { Device } from '../models/device';

export const getDeviceEntries = (): Promise<{devices: Device[], devicesEdgeConfiguration: Map<string, DeviceEdgeConfiguration>}> => {
    let hostName: string = '';
    let devices: Device[] = [];
    let sasToken: string = '';

    return getHostName()
        .then(returnedHostName => {
            hostName = returnedHostName;
            return getSharedAccessAuthorizationRules();
        }).then(sharedAccessAuthorizationRules => {
            const sharedAccessAuthorizationRule = getCompatibleSharedAccessAuthorizationRule({
                permissionEnumeration: 'read',
                sharedAccessAuthorizationRules
            });

            sasToken = generateSharedAccessKey({
                durationInSeconds: 200,
                sharedAccessAuthorizationRule,
            });

            return getDevices({
                hostName,
                sasToken
            });
        }).then(retrievedDevices => {
            devices = retrievedDevices;
            const deviceEdgeConfigurationPromises = devices.map(device => getDeviceEdgeConfiguration({
                deviceName: device.name,
                hostName,
                sasToken,
            }));

            return Promise.all(deviceEdgeConfigurationPromises);
        }).then(edgeConfigurations => {
            const devicesEdgeConfiguration = new Map<string, DeviceEdgeConfiguration>();
            edgeConfigurations.forEach(edgeConfiguration => devicesEdgeConfiguration.set(edgeConfiguration.deviceName, edgeConfiguration));

            return {
                devices,
                devicesEdgeConfiguration
            };
        }).catch(error => {
            // something went wwrong ... but where?
            // tslint:disable-next-line: no-console
            console.log(`something bad happened, somewhere: ${error}`);

            // good luck user
            throw error;
        });
};
