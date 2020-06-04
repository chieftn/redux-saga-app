import * as IotHubService from '../services/iotHubService';
import * as DeviceService from '../services/deviceService';
import * as SharedAccessKeyHelper from '../helpers/sharedAccessKeyHelper';
import { getDeviceEntries } from './promiseHelper';

describe('getDeviceEntries', () => {
    const getHostNameSpy = jest.spyOn(IotHubService, 'getHostName');
    getHostNameSpy.mockResolvedValue(('hostName'));

    const getSharedAccessAuthorizationRulesSpy = jest.spyOn(IotHubService, 'getSharedAccessAuthorizationRules');
    getSharedAccessAuthorizationRulesSpy.mockResolvedValue([
        {
            name: 'rule1',
            permissions: 'read',
            primaryKey: 'rule1Key'
        }
    ]);

    const getDevicesSpy = jest.spyOn(DeviceService, 'getDevices');
    getDevicesSpy.mockResolvedValue([
        {
            authentication: 'auth',
            name: 'device1',
        },
        {
            authentication: 'auth',
            name: 'device2',
        }
    ]);

    const getDeviceEdgeConfigurationSpy = jest.spyOn(DeviceService, 'getDeviceEdgeConfiguration');
    getDeviceEdgeConfigurationSpy.mockResolvedValue({
            deviceName: 'device1',
            edgeAgentSchemaVersion: '1.0.0',
            edgeHubSchemaVersion: '1.0.0',
            edgeModules: [],
            status: 'bad'
    });

    const getCompatibleSharedAccessAuthorizationRuleSpy = jest.spyOn(SharedAccessKeyHelper, 'getCompatibleSharedAccessAuthorizationRule');
    getCompatibleSharedAccessAuthorizationRuleSpy.mockReturnValue({
        name: 'rule1',
        permissions: 'read',
        primaryKey: 'rule1key'
    });

    const generateSharedAccessKeySpy = jest.spyOn(SharedAccessKeyHelper, 'generateSharedAccessKey');
    generateSharedAccessKeySpy.mockReturnValue('value');

    it('returns expected data', async () => {
        const result = await getDeviceEntries();
        expect(result.devices.length).toEqual(2);
        expect(result.devicesEdgeConfiguration.get('device1')).toEqual({
            deviceName: 'device1',
            edgeAgentSchemaVersion: '1.0.0',
            edgeHubSchemaVersion: '1.0.0',
            edgeModules: [],
            status: 'bad'
        });
    });

    it('called the methods', async () => {
        const result = await getDeviceEntries();

        expect(getHostNameSpy).toHaveBeenCalledTimes(2);  // tslint:disable-line: no-magic-numbers
        expect(getSharedAccessAuthorizationRulesSpy).toHaveBeenCalledTimes(2);  // tslint:disable-line: no-magic-numbers
        expect(getDevicesSpy).toHaveBeenCalledTimes(2); // tslint:disable-line: no-magic-numbers

        // what's this madness?  4?
        expect(getDeviceEdgeConfigurationSpy).toHaveBeenCalledTimes(4); // tslint:disable-line: no-magic-numbers
        expect(getCompatibleSharedAccessAuthorizationRuleSpy).toHaveBeenCalledTimes(2); // tslint:disable-line: no-magic-numbers
        expect(generateSharedAccessKeySpy).toHaveBeenCalledTimes(2) // tslint:disable-line: no-magic-numbers
    });
});
