import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { ConfigurationEntryStatusState } from './state';
import { ErrorReport } from './models/errorReport';
import {
    initializeConfigurationAction,
    submitConfigurationAction,
    validateConfigurationAction
} from './actions';
import { FormState } from './models/formState';

export const configurationStatusReducer = reducerWithoutInitialState<ConfigurationEntryStatusState>()
    .case(initializeConfigurationAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.INITIALIZING;

        return updatedState;
    })
    .case(initializeConfigurationAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.INITIALIZED;

        return updatedState;
    })
    .case(initializeConfigurationAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR_INITIALIZING;

        return updatedState;
    })
    .case(validateConfigurationAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.VALIDATING;

        return updatedState;
    })
    .case(validateConfigurationAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.VALIDATED;

        return updatedState;
    })
    .case(validateConfigurationAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR_VALIDATING;

        return updatedState;
    })
    .case(submitConfigurationAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.SUBMITTING;

        return updatedState;
    })
    .case(submitConfigurationAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.SUBMITTED;

        return updatedState;
    })
    .case(submitConfigurationAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR_SUBMITTING;

        return updatedState;
    });
