import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Device } from '../models/device';
import { SynchronizationStatus } from '../models/synchronizationWrapper';
import { fetchDevicesAction } from '../actions';
import { StateInterface } from '../../redux/state';
import './deviceList.css';

export interface DeviceListProps {
    devices: Device[];
    devicesStatus: SynchronizationStatus;
    fetchDevices(): void;
}

export const DeviceList: React.FC<DeviceListProps> = props => {
    const { devices, fetchDevices } = props;

    React.useEffect(() => {
        fetchDevices();
    }, []);  // tslint:disable-line: align

    const renderDeviceTiles = () => {
        return devices.map(device => (
            <DeviceListTile
                key={device.name}
                device={device}
            />
        ));
    };

    return (
        <div className="device-list">
            <div className="device-list-tiles">{renderDeviceTiles()}</div>
        </div>
    );
};

export const DeviceListReduxWrapper: React.FC = () => {
    const dispatch = useDispatch();
    const devicesState = useSelector((state: StateInterface) => state.devices);

    const dispatchFetchDevices = () => {
        dispatch(fetchDevicesAction.started(undefined));
    };

    return (
        <DeviceList
            devices={devicesState.devices.payload}
            devicesStatus={devicesState.devices.synchronizationStatus}
            fetchDevices={dispatchFetchDevices}
        />
    );
};

export interface DeviceListTileProps {
    device: Device;
}

export const DeviceListTile: React.FC<DeviceListTileProps> = props => {
    const { device } = props;
    const devicesState = useSelector((state: StateInterface) => state.devices);
    const deviceEdgeConfigurationWrapper = devicesState.devicesEdgeConfiguration.get(device.name);
    const deviceEdgeConfiguration = deviceEdgeConfigurationWrapper?.payload;

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
