import actionCreatorFactory from 'typescript-fsa';
import { StringMap } from '../../devices/models/stringMap';

const CONFIGURATION = 'CONFIGURATION';
const actionCreator = actionCreatorFactory(CONFIGURATION);

export interface ErrorReport {
    key: string;
    interpolation: StringMap<string>;
}

export const initializeConfigurationEntryAction = actionCreator.async<void, void, ErrorReport>('SET');
export const submitConfigurationEntryAction = actionCreator.async<void, void, ErrorReport>('POST');
