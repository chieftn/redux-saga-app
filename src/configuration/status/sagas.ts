import { takeLatest } from 'redux-saga/effects';
import { initializeConfigurationAction, submitConfigurationAction, validateConfigurationAction } from './actions';
import { validateConfigurationSaga } from './sagas/validateConfigurationSaga';
import { initializeConfigurationSaga  } from './sagas/initializeConfigurationSaga';
import { submitConfigurationSaga } from './sagas/submitConfigurationSaga';

export const statusSagas = () => {
    return [
        takeLatest(initializeConfigurationAction.started, initializeConfigurationSaga),
        takeLatest(submitConfigurationAction.started, submitConfigurationSaga),
        takeLatest(validateConfigurationAction.started, validateConfigurationSaga)
    ];
};
