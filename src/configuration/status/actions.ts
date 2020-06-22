import actionCreatorFactory from 'typescript-fsa';
import { ErrorReport } from './models/errorReport';

export const STATUS = 'STATUS';
const actionCreator = actionCreatorFactory(STATUS);

export const initializeConfigurationEntryAction = actionCreator.async<void, void, ErrorReport>('SET');
export const submitConfigurationEntryAction = actionCreator.async<void, void, ErrorReport>('POST');
export const validateConfigurationEntryAction = actionCreator.async<void, void, ErrorReport>('VALIDATE');
