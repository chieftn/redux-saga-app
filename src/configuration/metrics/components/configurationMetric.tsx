import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export interface ConfigurationMetricProps {
    canRemove: boolean;
    metricKey: string;
    metricName: string;
    metricValue: string;
    metricNameValidation?: string;
    metricValueValidation?: string;
    onMetricNameChange(key: string, value: string): void;
    onMetricValueChange(key: string, value: string): void;
    onMetricDelete(key: string): void;
}

// tslint:disable-next-line: cyclomatic-complexity
export const ConfigurationMetric: React.FC<ConfigurationMetricProps> = ({ canRemove, metricKey, metricName, metricValue, metricNameValidation, metricValueValidation, onMetricDelete, onMetricNameChange, onMetricValueChange }) => {
    const t = (localizationKey: string) => {
        return localizationKey;
    };

    const onMetricNameTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onMetricNameChange(metricKey, newValue || '');
    };

    const onMetricValueTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onMetricValueChange(metricKey, newValue || '');
    };

    const onMetricDeleteClick = () => {
        onMetricDelete(metricKey);
    };

    return (
        <div className="field-list-row">
            <div className="field-list-col">
                <TextField
                    value={metricName}
                    onChange={onMetricNameTextChange}
                    errorMessage={metricNameValidation && t(metricNameValidation) || ''}
                />
            </div>

            <div className="field-list-col">
                <TextField
                    value={metricValue}
                    onChange={onMetricValueTextChange}
                    errorMessage={metricValueValidation && t(metricValueValidation) || ''}
                />
            </div>

            <div className="field-list-col-command">
                {canRemove && (
                    <IconButton
                        iconProps={{ iconName: 'Delete' }}
                        onClick={onMetricDeleteClick}
                    />
                )}
            </div>
        </div>
    );
};