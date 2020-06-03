import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares)
    )
);
sagaMiddleware.run(rootSaga);

export default store;
