import { Action } from 'typescript-fsa';
import { put, call } from 'redux-saga/effects';
import { validateTargetConditionAction } from '../actions';

export function* validateTargetConditionSaga(action: Action<string>) {
    yield call(validateTargetCondition, action.payload, true);
}

export function* validateTargetCondition(targetCondition: string, serverValidation: boolean) {
  try {
    if (!targetCondition) {
      yield put(validateTargetConditionAction.done({
        result: 'blank' // empty implies successful validation
      }));

      return;
    }

    if (serverValidation) {
      yield put(validateTargetConditionAction.done({
        result: targetCondition === 'a' ? 'badServerValidation' : '' // empty implies successful validation
      }));

      return;
    }
  } catch (error) {
    yield put(validateTargetConditionAction.failed({
      error: 'couldNotValidate'
    }));
  }
}
