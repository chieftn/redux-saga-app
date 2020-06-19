import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useAsyncSagaReducer } from '../hooks/useAsyncSagaReducer';
import { configurationReducer } from '../reducer';
import { configurationStateInitial } from '../state';
import { setNameAction, setLabelNameAction, setLabelValueAction, removeLabelAction } from '../actions';
import { configurationSaga } from '../sagas';
import { ConfigurationLabels } from './configurationLabels';

import { TargetCondition } from '../../configuration3/targetCondition/components/targetCondition';
import { setTargetConditionAction } from '../../configuration3/targetCondition/actions';
import { targetConditionReducer } from '../../configuration3/targetCondition/reducer';
import { targetConditionSaga } from '../../configuration3/targetCondition/saga';
import { targetConditionInitialState } from '../../configuration3/targetCondition/state';


import { configuratio} from '../../configuration3/metrics/state';
import { } from '../../configuration3/metrics/actions';
import { } from '../../configuration3/metrics/reducer';
import { } from '../'

export const Configuration: React.FC = () => {
    const [ localState, dispatch ] = useAsyncSagaReducer(configurationReducer, configurationSaga, configurationStateInitial());

    const onNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        dispatch(setNameAction(newValue || ''));
    };

    const [ targetConditionState, dispatchTargetConditionState ] = useAsyncSagaReducer(targetConditionReducer, targetConditionSaga, targetConditionInitialState());

    const onTargetConditionChange = (value: string) => {
        dispatchTargetConditionState(setTargetConditionAction(value));
    };

    const onLabelNameChange = (key: string, value: string) => {
        dispatch(setLabelNameAction({key, value}));
    };

    const onLabelValueChange = (key: string, value: string) => {
        dispatch(setLabelValueAction({key, value}));
    };

    const onLabelDelete = (key: string) => {
        dispatch(removeLabelAction(key));
    };

    if (!localState) {
        return <div>Hello</div>;
    }

    return (
        <div>
            <TextField
                label="Name"
                value={localState.name}
                onChange={onNameChange}
            />

            <div>Labels</div>
            <ConfigurationLabels
                labels={localState.labels}
                labelsNameValidation={localState.labelsNameValidation}
                labelsValueValidation={localState.labelsValueValidation}
                onLabelDelete={onLabelDelete}
                onLabelNameChange={onLabelNameChange}
                onLabelValueChange={onLabelValueChange}

            />

            <div>Target Condition</div>
            {targetConditionState && (
                <TargetCondition
                    targetConditionState={targetConditionState}
                    onTargetConditionChange={onTargetConditionChange}
                />
            )}

        </div>
    );
};
