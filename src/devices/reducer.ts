import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetchDevicesAction } from './actions';
import { DevicesStateInterface, getInitialDevicesState } from './state';
import { Device } from './models/device';
import { Error } from './models/error';
import { SynchronizationStatus } from './models/synchronizationWrapper';

export const devicesReducer = reducerWithInitialState<DevicesStateInterface>(getInitialDevicesState())
    .case(fetchDevicesAction.started, (state: DevicesStateInterface) => {
        const updatedState = {...state};
        updatedState.devices = {
            payload: [],
            syncronizationStatus: SynchronizationStatus.working
        };

        return updatedState;
    })

    .case(fetchDevicesAction.done, (state: DevicesStateInterface, payload: { result: Device[]}) => {
        const updatedState = {...state};
        updatedState.devices = {
            payload: payload.result,
            syncronizationStatus: SynchronizationStatus.fetched
        };

        return updatedState;
    })

    .case(fetchDevicesAction.failed, (state: DevicesStateInterface, payload: { error: Error}) => {
        const updatedState = {...state};
        updatedState.devices = {
            error: payload.error,
            payload: [],
            syncronizationStatus: SynchronizationStatus.failed
        };

        return updatedState;
    });
