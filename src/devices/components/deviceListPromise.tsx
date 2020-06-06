import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Device } from '../models/device';
import { DeviceEdgeConfiguration } from '../models/deviceEdgeConfiguration';
import { getDeviceEntries } from '../helpers/asyncHelper';
import './deviceList.css';

export const DeviceList: React.FC = props => {
    const [ devices, setDevices ] = React.useState<Device[]>([]);
    const [ devicesEdgeConfiguration, setDevicesEdgeConfiguration ] = React.useState<Map<string, DeviceEdgeConfiguration>>(new Map());

    React.useEffect(() => {
       getDeviceEntries()
        .then(result => {
            setDevices(result.devices);
            setDevicesEdgeConfiguration(result.devicesEdgeConfiguration);
            toast('Devices Loaded', { type: 'success' });
        })
        .catch(error => {
            toast(`I am Error.  ${JSON.stringify(error)}`, { type: 'error' });
        });
    }, []);  // tslint:disable-line: align

    const renderDeviceTiles = () => {
        return devices.map(device => (
            <DeviceListTile
                key={device.name}
                device={device}
                deviceEdgeConfiguration={devicesEdgeConfiguration.get(device.name)}
            />
        ));
    };

    return (
        <div className="device-list">
          <div className="device-list-tiles">{renderDeviceTiles()}</div>
        </div>
    );
};

export interface DeviceListTileProps {
    device: Device;
    deviceEdgeConfiguration?: DeviceEdgeConfiguration;

}
export const DeviceListTile: React.FC<DeviceListTileProps> = props => {
    const { device, deviceEdgeConfiguration } = props;

    return (
        <div className="device-list-tile">
            <div className="device-list-tile-name">
                <NavLink to={`/devices/${device.name}`}>
                    {device.name}
                </NavLink>
            </div>

            <div className="device-list-tile-row">
                <div className="device-list-tile-row-header">Auth:</div>
                <div>{device.authentication}</div>
            </div>

            <div className="device-list-tile-row-section-header">Edge Statistics</div>

            <div className="device-list-tile-row">
                <div className="device-list-tile-row-header">Agent Schema:</div>
                <div>{deviceEdgeConfiguration?.edgeAgentSchemaVersion || 'NA'}</div>
            </div>
            <div className="device-list-tile-row">
                <div className="device-list-tile-row-header">Hub Schema:</div>
                <div>{deviceEdgeConfiguration?.edgeHubSchemaVersion || 'NA'}</div>
            </div>
            <div className="device-list-tile-row">
                <div className="device-list-tile-row-header">Module Count:</div>
                <div>{deviceEdgeConfiguration?.edgeModules.length || 'NA'}</div>
            </div>
            <div className="device-list-tile-row">
                <div className="device-list-tile-row-header">Status:</div>
                <div>{deviceEdgeConfiguration?.status || 'NA'}</div>
            </div>
        </div>
    );
};
