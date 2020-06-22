import { select, put, delay } from 'redux-saga/effects';
import { validateTargetConditionAction } from '../actions';
import { TargetConditionState } from '../state';

export function* validateTargetConditionStartSaga() {
  yield put(validateTargetConditionAction.started());
}

export function* validateTargetConditionSaga() {
  try {
    const targetCondition = yield select((state: TargetConditionState) => state.targetCondition);
    // tslint:disable-next-line: no-console
    console.log(`validating ${targetCondition}`);

    // tslint:disable-next-line: no-magic-numbers
    yield delay(2000);

    yield put(validateTargetConditionAction.done({
      result: targetCondition === 'asdf' ? 'badValue' : '' // empty implies successful validation
    }));

  } catch (error) {
    yield put(validateTargetConditionAction.failed({
      error: 'unableToValidateKey'
    }));
  }
}
