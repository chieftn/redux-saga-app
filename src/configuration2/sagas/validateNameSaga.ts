import { Action } from 'typescript-fsa';
import { select } from 'redux-saga/effects';

export function* validateNameSaga(action: Action<string>) {
  const myState = yield select(state => state);
  // tslint:disable-next-line: no-console
  console.log(JSON.stringify(myState));

  // tslint:disable-next-line: no-console
  console.log('debounced' + action.payload);
}
