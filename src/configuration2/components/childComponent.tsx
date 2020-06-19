import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface ChildComponentProps {
    targetConditionChange(value: string | undefined): void;
    targetCondition?: string;
    targetConditionError?: string;
}

export const ChildComponent: React.FC<ChildComponentProps> = props => {
    const { targetConditionChange, targetCondition } = props;

    const onTargetConditionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        targetConditionChange(newValue);
    };

    return (
        <TextField
            label="Target Condition"
            value={targetCondition}
            onChange={onTargetConditionChange}
        />
    );
};
