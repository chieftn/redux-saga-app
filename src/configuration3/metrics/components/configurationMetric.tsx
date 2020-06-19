import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface ConfigurationMetricProps {
    metricKey: string;
    metricName: string;
    metricValue: string;
    metricNameValidation?: string;
    metricValueValidation?: string;
    onMetricNameChange(key: string, value: string): void;
    onMetricValueChange(key: string, value: string): void;
}

export const ConfigurationMetric: React.FC<ConfigurationMetricProps> = ({ metricKey, metricName, metricValue, metricNameValidation, metricValueValidation, onMetricNameChange, onMetricValueChange }) => {
    const t = (localizationKey: string) => {
        return localizationKey;
    };

    const onMetricNameTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onMetricNameChange(metricKey, newValue || '');
    };

    const onMetricValueTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        onMetricValueChange(metricKey, newValue || '');
    };

    // const onLabelDeleteClick = () => {
    //     onLabelDelete(key);
    // };

    return (
        <div>
            <TextField
                label="Name"
                value={metricName}
                onChange={onMetricNameTextChange}
                errorMessage={metricNameValidation && t(metricNameValidation) || ''}
            />

            <TextField
                label="Value"
                value={metricValue}
                onChange={onMetricValueTextChange}
                errorMessage={metricValueValidation && t(metricValueValidation) || ''}
            />
        </div>
    );
};
