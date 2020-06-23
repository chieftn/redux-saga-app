import { Action } from 'typescript-fsa';
import { takeLatest } from 'redux-saga/effects';
import { takeFirst } from '../effects/takeFirst';
import { initializeConfigurationAction, submitConfigurationAction, validateConfigurationAction } from './actions';
import { validateConfigurationSaga } from './sagas/validateConfigurationSaga';
import { initializeConfigurationSaga  } from './sagas/initializeConfigurationSaga';
import { submitConfigurationSaga } from './sagas/submitConfigurationSaga';
import { setDirtyFlagSaga } from './sagas/setDirtyFlagSaga';

export const statusSagas = () => {
    return [
        takeLatest(initializeConfigurationAction.started, initializeConfigurationSaga),
        takeLatest(submitConfigurationAction.started, submitConfigurationSaga),
        takeLatest(validateConfigurationAction.started, validateConfigurationSaga),
        takeFirst((action: Action<any>) => /SET_VALUE$/.test(action.type), setDirtyFlagSaga) // tslint:disable-line: no-any
    ];
};
