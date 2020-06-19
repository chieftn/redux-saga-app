import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TargetConditionState, TargetConditionValidationState } from '../state';

export interface TargetConditionProps {
    targetConditionState: TargetConditionState;
    onTargetConditionChange(value: string): void;
}

export const TargetCondition: React.FC<TargetConditionProps> = ({ targetConditionState, onTargetConditionChange }) => {
    const { targetCondition, targetConditionValidation } = targetConditionState;

    const onTargetConditionTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onTargetConditionChange(newValue || '');
    };

    return (
        <div>
            <div className="section-header">Target Condition</div>
            <TextField
                name="Target Condition"
                value={targetCondition}
                onChange={onTargetConditionTextChange}
                errorMessage={targetConditionValidation}
            />
            {targetConditionState.targetConditionValidationState === TargetConditionValidationState.VALIDATING && (
                <Spinner
                    size={SpinnerSize.large}
                />
            )}

            {(targetConditionState.targetConditionValidationState === TargetConditionValidationState.VALIDATED && !targetConditionValidation) && (
                <PrimaryButton
                    text="Load Devices"
                />
            )}
        </div>
    );
};
