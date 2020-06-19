import { all, debounce, takeLatest } from 'redux-saga/effects';
import { setTargetConditionAction, validateTargetConditionAction } from './actions';
import { validateTargetConditionSaga, validateTargetConditionStartSaga } from './sagas/validateTargetConditionSaga';

const debounceDelay = 800;

export function* targetConditionSaga() {
    yield all([
        debounce(debounceDelay, setTargetConditionAction.type, validateTargetConditionStartSaga),
        takeLatest(validateTargetConditionAction.started.type, validateTargetConditionSaga)
    ]);
}
