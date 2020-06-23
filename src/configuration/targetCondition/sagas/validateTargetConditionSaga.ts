import { Action } from 'typescript-fsa';
import { put, call } from 'redux-saga/effects';
import { validateTargetConditionAction } from '../actions';

export function* validateTargetConditionSaga(action: Action<string>) {
    yield call(validateTargetCondition, action.payload, true);
}

export function* validateTargetCondition(targetCondition: string, serverValidation: boolean) {
  let validationKey = '';

  try {
    if (!targetCondition) {
      validationKey = 'blank';
      return;
    }

    if (serverValidation) {
       // const result = yield call serverValidation;
       validationKey = targetCondition === 'a' ? 'badServerValidation' : '';
    }

    yield put(validateTargetConditionAction.done({
      result: validationKey// empty implies successful validation
    }));

  } catch (error) {
    yield put(validateTargetConditionAction.failed({
      error: validationKey// empty implies successful validation
    }));
  }
}
