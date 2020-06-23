import actionCreatorFactory from 'typescript-fsa';

export const METRIC = 'METRIC';
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
export const setMetricNameAction = actionCreator<KeyValue>('NAME/SET_VALUE');
export const setMetricValueAction = actionCreator<KeyValue>('VALUE/SET_VALUE');
export const setMetricNameDuplicatesAction = actionCreator<Set<string>>('NAME_DUPLICATE/SET');
export const setMetricNameValidationAction = actionCreator<KeyValue[]>('NAME_VALIDATION/SET');
export const setMetricValueValidationAction = actionCreator<KeyValue[]>('VALUE_VALIDATION/SET');
export const validateMetricsAction = actionCreator.async<void, ValidationResult, string>('VALIDATE');
