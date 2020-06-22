import { debounce, takeLatest } from 'redux-saga/effects';
import { setTargetConditionAction, validateTargetConditionAction } from './actions';
import { validateTargetConditionSaga, validateTargetConditionStartSaga } from './sagas/validateTargetConditionSaga';

const debounceDelay = 800;

export const targetConditionSagas = () => {
    return [
        debounce(debounceDelay, setTargetConditionAction.type, validateTargetConditionStartSaga),
        takeLatest(validateTargetConditionAction.started.type, validateTargetConditionSaga)
    ];
};
