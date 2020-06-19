import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TargetConditionState, targetConditionInitialState, TargetConditionValidationState } from './state';
import {
    setTargetConditionAction,
    validateTargetConditionAction
} from './actions';

export const targetConditionReducer = reducerWithInitialState<TargetConditionState>(targetConditionInitialState())
    .case(setTargetConditionAction, (state: TargetConditionState, payload: string) => {
        const updatedState = {...state};
        updatedState.targetCondition = payload;
        updatedState.targetCount = '';
        updatedState.targetEntries = [];
        updatedState.targetEntriesNextToken = '';

        return updatedState;
    })
    .case(validateTargetConditionAction.started, (state: TargetConditionState) => {
        const updatedState = {...state};
        updatedState.targetConditionValidationState = TargetConditionValidationState.VALIDATING;
        return updatedState;
    })
    .case(validateTargetConditionAction.done, (state: TargetConditionState, payload: { result: string}) => {
        const updatedState = {...state};
        updatedState.targetConditionValidationState = TargetConditionValidationState.VALIDATED;
        updatedState.targetConditionValidation = payload.result;
        return updatedState;
    })
    .case(validateTargetConditionAction.failed, (state: TargetConditionState, payload: { error: string}) => {
        const updatedState = {...state};
        updatedState.targetConditionValidationState = TargetConditionValidationState.NOT_VALIDATED;
        updatedState.targetConditionValidation = payload.error;
        return updatedState;
    });
