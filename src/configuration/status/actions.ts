import actionCreatorFactory from 'typescript-fsa';
import { ErrorReport } from './models/errorReport';

export const STATUS = 'STATUS';
const actionCreator = actionCreatorFactory(STATUS);

export const initializeConfigurationAction = actionCreator.async<void, void, ErrorReport>('SET');
export const submitConfigurationAction = actionCreator.async<void, void, ErrorReport>('POST');
export const validateConfigurationAction = actionCreator.async<void, void, ErrorReport>('VALIDATE');
