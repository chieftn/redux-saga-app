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
    syncronizationStatus: SynchronizationStatus;
    payload: T;
    error?: Error;
}
