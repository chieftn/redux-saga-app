import { call, fork, take } from 'redux-saga/effects';

// tslint:disable-next-line: no-any
export function* takeFirst(pattern: any, saga: any, ...args: any) {
    let called: boolean = false;
    yield fork(function*() {
        while (true) {
            if (!called) {
                const action = yield take(pattern);
                yield call(saga, ...args.concat(action));
                called = true;
            } else {
                yield;
            }
        }
    });
}
