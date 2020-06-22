import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { ConfigurationEntryStatusState } from './state';
import { ErrorReport } from './models/errorReport';
import {
    initializeConfigurationEntryAction,
    submitConfigurationEntryAction,
    validateConfigurationEntryAction
} from './actions';
import { FormState } from './models/formState';

export const configurationStatusReducer = reducerWithoutInitialState<ConfigurationEntryStatusState>()
    .case(initializeConfigurationEntryAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.INITIALIZING;

        return updatedState;
    })
    .case(initializeConfigurationEntryAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.EDITING;

        return updatedState;
    })
    .case(initializeConfigurationEntryAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR;

        return updatedState;
    })
    .case(validateConfigurationEntryAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.VALIDATING;

        return updatedState;
    })
    .case(validateConfigurationEntryAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.VALIDATED;

        return updatedState;
    })
    .case(validateConfigurationEntryAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR;

        return updatedState;
    })
    .case(submitConfigurationEntryAction.started, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.SUBMITTING;

        return updatedState;
    })
    .case(submitConfigurationEntryAction.done, (state: ConfigurationEntryStatusState) => {
        const updatedState = {...state};
        updatedState.formStateError = undefined;
        updatedState.formState = FormState.SUBMITTED;

        return updatedState;
    })
    .case(submitConfigurationEntryAction.failed, (state: ConfigurationEntryStatusState, payload: { error: ErrorReport}) => {
        const updatedState = {...state};
        updatedState.formStateError = payload.error;
        updatedState.formState = FormState.ERROR;

        return updatedState;
    });
