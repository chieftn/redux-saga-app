import * as React from 'react';
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
        // tslint:disable-next-line: no-console
        console.log('here');
        dispatch(fetchDevicesAction.started(undefined));
    };

    return (
        <DeviceList
            devices={devicesState.devices.payload}
            devicesStatus={devicesState.devices.syncronizationStatus}
            fetchDevices={dispatchFetchDevices}
        />
    );
};

export interface DeviceListTileProps {
    device: Device;
}

export const DeviceListTile: React.FC<DeviceListTileProps> = props => {
    return (
        <div className="device-list-tile">
            Hello Device
        </div>
    );
};
