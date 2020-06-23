import { debounce } from 'redux-saga/effects';
import { setTargetConditionAction } from './actions';
import { validateTargetConditionSaga } from './sagas/validateTargetConditionSaga';

const debounceDelay = 800;

export const targetConditionSagas = () => {
    return [
        debounce(debounceDelay, setTargetConditionAction.type, validateTargetConditionSaga),
    ];
};
