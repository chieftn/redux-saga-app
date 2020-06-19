import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ConfigurationState, configurationStateInitial } from './state';
import {
    setLabelNameAction,
    setLabelValueAction,
    setNameAction,
    // setPriorityAction,
    setTargetConditionAction
} from './actions';

export const configurationReducer = reducerWithInitialState<ConfigurationState>(configurationStateInitial())
    .case(setNameAction, (state: ConfigurationState, payload: string) => {
        const updatedState = {...state};
        updatedState.name = payload;

        return updatedState;
    })
    .case(setTargetConditionAction, (state: ConfigurationState, payload: string) => {
        const updatedState = {...state};
        updatedState.targetCondition = payload;

        return updatedState;
    })
    .case(setLabelNameAction, (state: ConfigurationState, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.labels = { ...updatedState.labels};
        updatedState.labels[payload.key] = { name: payload.value, value: updatedState.labels[payload.key].value};

        return updatedState;
    })
    .case(setLabelValueAction, (state: ConfigurationState, payload: {key: string, value: string}) => {
        const updatedState = {...state};
        updatedState.labels = { ...updatedState.labels};
        updatedState.labels[payload.key] = { name: updatedState.labels[payload.key].name, value: payload.value};

        return updatedState;
    });
