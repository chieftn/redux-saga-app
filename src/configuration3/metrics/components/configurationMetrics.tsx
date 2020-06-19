import * as React from 'react';
import { StringMap, Metric } from '../state';
import { ConfigurationMetric } from './configurationMetric';

export interface ConfigurationMetricsProps {
    metrics: StringMap<Metric>;
    metricsNameValidation: StringMap<string>;
    metricsValueValidation: StringMap<string>;
    onMetricNameChange(key: string, value: string): void;
    onMetricValueChange(key: string, value: string): void;
}

export const ConfigurationMetrics: React.FC<ConfigurationMetricsProps> = ({ metrics, metricsNameValidation, metricsValueValidation, onMetricValueChange, onMetricNameChange }) => {
    const configurationMetrics = Object.keys(metrics).map((key: string) => {
        return (
            <ConfigurationMetric
                key={key}
                metricKey={key}
                metricName={metrics[key].name}
                metricValue={metrics[key].value}
                metricNameValidation={metricsNameValidation[key]}
                metricValueValidation={metricsValueValidation[key]}
                onMetricNameChange={onMetricNameChange}
                onMetricValueChange={onMetricValueChange}
            />
        );
    });

    return (
        <div>
            <div className="section-header">Configuration Metrics</div>
            <div className="field-list">
                <div className="field-list-row">
                    <div className="field-list-col field-list-col-header">Name</div>
                    <div className="field-list-col field-list-col-header">Criteria</div>
                </div>
                {configurationMetrics}
            </div>
        </div>
    );
};
