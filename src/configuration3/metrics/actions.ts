import actionCreatorFactory from 'typescript-fsa';

const METRIC = 'METRIC';
const actionCreator = actionCreatorFactory(METRIC);

export interface KeyValue {
    key: string;
    value: string;
}

export interface ValidationResult {
    nameValidations: KeyValue[];
    valueValidations: KeyValue[];
}

export const removeMetricAction = actionCreator<string>('REMOVE');
export const setMetricNameAction = actionCreator<KeyValue>('_NAME/SET');
export const setMetricValueAction = actionCreator<KeyValue>('_VALUE/SET');
export const setMetricNameDuplicatesAction = actionCreator<Set<string>>('_NAME_DUPLICATE/SET');
export const setMetricNameValidationAction = actionCreator<KeyValue[]>('_NAME_VALIDATION/SET');
export const setMetricValueValidationAction = actionCreator<KeyValue[]>('_VALUE_VALIDATION/SET');
export const validateMetricsAction = actionCreator.async<void, ValidationResult, string>('VALIDATE');
