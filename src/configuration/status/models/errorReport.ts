import { StringMap } from '../../../devices/models/stringMap';

export interface ErrorReport {
    key: string;
    interpolation?: StringMap<string>;
}
