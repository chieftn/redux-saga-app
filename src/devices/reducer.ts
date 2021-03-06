import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Map } from 'immutable';
import { fetchDevicesAction, setDevicesEdgeConfigurationAction, setServiceParametersAction } from './actions';
import { DevicesStateInterface, getInitialDevicesState } from './state';
import { Device } from './models/device';
import { DeviceEdgeConfiguration } from './models/deviceEdgeConfiguration';
import { SynchronizationWrapper, SynchronizationStatus } from './models/synchronizationWrapper';
import { SharedAccessAuthorizationRule } from './models/sharedAccessAuthorizationRule';

export const devicesReducer = reducerWithInitialState<DevicesStateInterface>(getInitialDevicesState())
    .case(fetchDevicesAction.started, (state: DevicesStateInterface) => {
        const updatedState = {...state};
        updatedState.devices = {
            payload: [],
            synchronizationStatus: SynchronizationStatus.working
        };

        updatedState.devicesEdgeConfiguration = Map();

        return updatedState;
    })

    .case(fetchDevicesAction.done, (state: DevicesStateInterface, payload: { result: Device[]}) => {
        const updatedState = {...state};
        updatedState.devices = {
            payload: payload.result,
            synchronizationStatus: SynchronizationStatus.fetched
        };

        return updatedState;
    })

    .case(fetchDevicesAction.failed, (state: DevicesStateInterface, payload: { error: Error}) => {
        const updatedState = {...state};
        updatedState.devices = {
            error: payload.error,
            payload: [],
            synchronizationStatus: SynchronizationStatus.failed
        };

        return updatedState;
    })

    .case(setDevicesEdgeConfigurationAction, (state: DevicesStateInterface, payload: Map<string, SynchronizationWrapper<DeviceEdgeConfiguration>>) => {
        const updatedState = {...state};
        updatedState.devicesEdgeConfiguration = payload;
        return updatedState;
    })

    .case(setServiceParametersAction, (state: DevicesStateInterface, payload: { hostName: string, sharedAccessAuthorizationRules: SharedAccessAuthorizationRule[]}) => {
        const updatedState = {...state};
        updatedState.serviceParameters = payload;

        return updatedState;
    });
