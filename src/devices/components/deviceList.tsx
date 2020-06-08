import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Device } from '../models/device';
import { fetchDevicesAction } from '../actions';
import { StateInterface } from '../../redux/state';
import './deviceList.css';
import { SynchronizationStatus } from '../models/synchronizationWrapper';

export const DeviceList: React.FC = () => {
    const dispatch = useDispatch();
    const devicesState = useSelector((state: StateInterface) => state.devices);
    const devices = devicesState.devices.payload;

    React.useEffect(() => {
        dispatch(fetchDevicesAction.started(undefined));
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

export interface DeviceListTileProps {
    device: Device;
}

export const DeviceListTile: React.FC<DeviceListTileProps> = props => {
    const { device } = props;

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
            <DeviceEdgeConfiguration deviceName={device.name} />
        </div>
    );
};

export const DeviceEdgeConfiguration: React.FC<{deviceName: string}> = props => {
    const { deviceName } = props;
    const devicesState = useSelector((state: StateInterface) => state.devices);
    const deviceEdgeConfigurationWrapper = devicesState.devicesEdgeConfiguration.get(deviceName);
    const deviceEdgeConfiguration = deviceEdgeConfigurationWrapper?.payload;

    if (deviceEdgeConfigurationWrapper &&
        deviceEdgeConfiguration &&
        deviceEdgeConfigurationWrapper.synchronizationStatus === SynchronizationStatus.fetched) {
            return (
                <>
                    <div className="device-list-tile-row">
                        <div className="device-list-tile-row-header">Agent Schema:</div>
                        <div>{deviceEdgeConfiguration.edgeAgentSchemaVersion}</div>
                    </div>
                    <div className="device-list-tile-row">
                        <div className="device-list-tile-row-header">Hub Schema:</div>
                        <div>{deviceEdgeConfiguration.edgeHubSchemaVersion}</div>
                    </div>
                    <div className="device-list-tile-row">
                        <div className="device-list-tile-row-header">Module Count:</div>
                        <div>{deviceEdgeConfiguration.edgeModules.length}</div>
                    </div>
                    <div className="device-list-tile-row">
                        <div className="device-list-tile-row-header">Status:</div>
                        <div>{deviceEdgeConfiguration.status}</div>
                    </div>
                </>
            );
    }

    return (
        <div>loading Edge information</div>
    );
};
