export interface TargetEntry {
    name: string;
    status: string;
}

export enum TargetConditionValidationState {
    NOT_VALIDATED,
    VALIDATING,
    VALIDATED
}

export interface TargetConditionState {
    targetCondition: string;
    targetConditionValidation: string;
    targetConditionValidationState: TargetConditionValidationState;
    targetCount: string;
    targetEntries: TargetEntry[];
    targetEntriesNextToken: string;
}

export const targetConditionInitialState = () => {
    return {
        targetCondition: '',
        targetConditionValidation: '',
        targetConditionValidationState: TargetConditionValidationState.VALIDATED, // empty is allowed and valid.
        targetCount: '',
        targetEntries: [],
        targetEntriesNextToken: '',
    };
};
