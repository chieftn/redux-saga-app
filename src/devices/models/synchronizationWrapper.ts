import { Error } from './error';

export enum SynchronizationStatus {
    initialized,
    deleted,
    fetched,
    upserted,
    working,
    failed
}

export interface SynchronizationWrapper<T> {
    synchronizationStatus: SynchronizationStatus;
    payload: T;
    error?: Error;
}
