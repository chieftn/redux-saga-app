import actionCreatorFactory from 'typescript-fsa';
import { Metric } from './state';

const CONFIGURATION = 'CONFIGURATION';
const actionCreator = actionCreatorFactory(CONFIGURATION);

export const setNameAction = actionCreator<string>('SET_NAME');
export const setTargetConditionAction = actionCreator<string>('SET_TARGETCONDITION');
export const removeLabelAction = actionCreator<string>('REMOVE_LABEL');
export const setLabelNameAction = actionCreator<{ key: string, value: string}>('SET_LABEL_NAME');
export const setLabelValueAction = actionCreator<{ key: string, value: string}>('SET_LABEL_VALUE');
export const addMetricAction = actionCreator('ADD_METRIC');
export const removeMetricAction = actionCreator<string>('REMOVE_METRIC');
export const setMetricNameAction = actionCreator<{ key: string, metric: Metric}>('SET_METRIC_NAME');
export const setMetricValueAction = actionCreator<{ key: string, metric: Metric}>('SET_METRIC_VALUE');
export const setPriorityAction = actionCreator<string>('SET_PRIORITY');
export const fetchNameValidation = actionCreator('GET_NAMEVALIDATION');
