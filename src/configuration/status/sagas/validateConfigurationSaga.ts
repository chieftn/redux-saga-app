import { call, put } from 'redux-saga/effects';
import { validateConfigurationAction } from '../actions';
import { validateTargetConditionSaga } from '../../targetCondition/sagas/validateTargetConditionSaga';
import { validateAllMetricsSaga } from '../../metrics/sagas/validateAllMetricsSaga';

export function* validateConfigurationSaga() {
      try {
            yield call(validateTargetConditionSaga);
            yield call(validateAllMetricsSaga);
            yield put(validateConfigurationAction.done);
      } catch (error) {
            yield put(validateConfigurationAction.failed({
                  error: { key: 'badness happened' }
            }));
      }
}
