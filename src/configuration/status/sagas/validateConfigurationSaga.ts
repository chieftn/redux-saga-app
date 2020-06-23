import { call, put, select } from 'redux-saga/effects';
import { validateConfigurationAction } from '../actions';
import { validateTargetCondition } from '../../targetCondition/sagas/validateTargetConditionSaga';
import { validateAllMetricsSaga } from '../../metrics/sagas/validateAllMetricsSaga';
import { TargetConditionState } from '../../targetCondition/state';

export function* validateConfigurationSaga() {
      try {
            const targetCondition = yield select((state: { targetConditionState: TargetConditionState}) => state.targetConditionState.targetCondition);
            yield call(validateTargetCondition, targetCondition, false);
            yield call(validateAllMetricsSaga);

            yield put(validateConfigurationAction.done);

      } catch (error) {
            yield put(validateConfigurationAction.failed({
                  error: { key: 'badness happened' }
            }));
      }
}
