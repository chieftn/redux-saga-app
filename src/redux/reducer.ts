import { combineReducers, ReducersMapObject } from 'redux';
import { devicesReducer } from '../devices/reducer';
import { StateInterface } from './state';

export const reducerMap: ReducersMapObject<StateInterface> = {
   devices: devicesReducer
};

export default combineReducers(
    reducerMap
);
