import { all, debounce } from 'redux-saga/effects';
import { setNameAction } from './actions';
import { validateNameSaga } from './sagas/validateNameSaga';

const debounceDelay = 800;

export function* configurationSaga() {
    yield all([
        // tslint:disable-next-line: no-magic-numbers
        debounce(debounceDelay, setNameAction, validateNameSaga)
    ]);
}
