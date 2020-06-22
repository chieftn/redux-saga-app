import { takeLatest } from 'redux-saga/effects';
import { initializeConfigurationEntryAction, submitConfigurationEntryAction, validateConfigurationEntryAction } from './actions';
import { validateConfigurationEntrySaga } from './sagas/validateConfigurationEntrySaga';
import { initializeConfigurationEntrySaga  } from './sagas/initializeConfigurationEntrySaga';
import { submitConfigurationEntrySaga } from './sagas/submitConfigurationEntrySaga';

export const statusSagas = () => {
    return [
        takeLatest(initializeConfigurationEntryAction.started, initializeConfigurationEntrySaga),
        takeLatest(submitConfigurationEntryAction.started, submitConfigurationEntrySaga),
        takeLatest(validateConfigurationEntryAction.started, validateConfigurationEntrySaga)
    ];
};
