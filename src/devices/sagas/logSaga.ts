import { Action } from 'typescript-fsa';

// tslint:disable-next-line: no-any
export function* logSaga(action: Action<any>) {
    // tslint:disable-next-line: no-console
    console.log(`Logging action ${action.type}`);
}
