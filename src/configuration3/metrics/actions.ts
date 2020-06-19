import actionCreatorFactory from 'typescript-fsa';
import { StringMap } from './state';

const METRIC = 'METRIC';
const actionCreator = actionCreatorFactory(METRIC);

export const removeMetricAction = actionCreator<string>('REMOVE');
export const setMetricNameAction = actionCreator<{ key: string, value: string}>('_NAME/SET');
export const setMetricValueAction = actionCreator<{ key: string, value: string}>('_VALUE/SET');
export const setMetricNameValidationAction = actionCreator<{key: string, value: string}>('_NAME_VALIDATION/SET');
export const setMetricValueValidationAction = actionCreator<{key: string, value: string}>('_VALUE_VALIDATION/SET');
export const validateMetricsAction = actionCreator.async<void, StringMap<string>, string>('VALIDATE');
