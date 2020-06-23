import { select, put } from 'redux-saga/effects';
import { validateTargetConditionAction } from '../actions';
import { TargetConditionState } from '../state';

export function* validateTargetConditionStartSaga() {
  yield put(validateTargetConditionAction.started());
}

export function* validateTargetConditionSaga() {
  try {
    const targetCondition = yield select((state: TargetConditionState) => state.targetCondition);

    if (!targetCondition) {
      yield put(validateTargetConditionAction.done({
        result: 'blank'
      }));

      return;
    }

    yield put(validateTargetConditionAction.done({
      result: targetCondition === 'asdf' ? 'badValue' : '' // empty implies successful validation
    }));
  } catch (error) {
    yield put(validateTargetConditionAction.failed({
      error: 'unableToValidateKey'
    }));
  }
}
