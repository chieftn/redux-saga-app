import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { StringMap, Label } from '../state';

export interface ConfigurationLabelsProps {
    labels: StringMap<Label>;
    labelsNameValidation: StringMap<string>;
    labelsValueValidation: StringMap<string>;
    onLabelDelete(key: string): void;
    onLabelNameChange(key: string, value: string): void;
    onLabelValueChange(key: string, value: string): void;
}

export const ConfigurationLabels: React.FC<ConfigurationLabelsProps> = ({ labels, labelsNameValidation, labelsValueValidation, onLabelValueChange, onLabelNameChange, onLabelDelete}) => {
    // tslint:disable-next-line: no-console
    console.log('rerendering orthagonal');

    const configurationLabels = Object.keys(labels).map((key: string) => {
        return (
            <ConfigurationLabel
                key={key}
                labelKey={key}
                labelName={labels[key].name}
                labelValue={labels[key].value}
                labelNameValidation={labelsNameValidation[key]}
                labelValueValidation={labelsValueValidation[key]}
                onLabelNameChange={onLabelNameChange}
                onLabelValueChange={onLabelValueChange}
                onLabelDelete={onLabelDelete}
            />
        );
    });

    return (
        <div>
            <div className="section-header">Configuration Labels</div>
            <div className="field-list">
                <div className="field-list-row">
                    <div className="field-list-col field-list-col-header">Name</div>
                    <div className="field-list-col field-list-col-header">Value</div>
                </div>
                {configurationLabels}
            </div>
        </div>
    );
};

export interface ConfigurationLabelProps {
    labelKey: string;
    labelName: string;
    labelValue: string;
    labelNameValidation?: string;
    labelValueValidation?: string;
    onLabelNameChange(key: string, value: string): void;
    onLabelValueChange(key: string, value: string): void;
    onLabelDelete(key: string): void;
}

export const ConfigurationLabel: React.FC<ConfigurationLabelProps> = ({ labelKey, labelName, labelValue, labelNameValidation, labelValueValidation, onLabelNameChange, onLabelValueChange }) => {
    const t = (localizationKey: string) => {
        return localizationKey;
    };

    const onLabelNameTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onLabelNameChange(labelKey, newValue || '');
    };

    const onLabelValueTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onLabelValueChange(labelKey, newValue || '');
    };

    // const onLabelDeleteClick = () => {
    //     onLabelDelete(key);
    // };

    return (
        <div className="field-list-row">
            <div className="field-list-col">
                <TextField
                    value={labelName}
                    onChange={onLabelNameTextChange}
                    errorMessage={labelNameValidation && t(labelNameValidation) || ''}
                />
            </div>

            <div className="field-list-col">
                <TextField
                    value={labelValue}
                    onChange={onLabelValueTextChange}
                    errorMessage={labelValueValidation && t(labelValueValidation) || ''}
                />
            </div>
        </div>
    );
};
