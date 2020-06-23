import actionCreatorFactory from 'typescript-fsa';

export const TARGET_CONDITION = 'TARGET_CONDITION';
const actionCreator = actionCreatorFactory(TARGET_CONDITION);

export const setTargetConditionAction = actionCreator<string>('SET_VALUE');
export const validateTargetConditionAction = actionCreator.async<void, string, string>('VALIDATE');
