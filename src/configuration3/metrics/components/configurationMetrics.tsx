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

export const Configurationmetrics: React.FC<ConfigurationMetricsProps> = ({ metrics, metricsNameValidation, metricsValueValidation, onMetricValueChange, onMetricNameChange }) => {
    const configurationMetrics = Object.keys(metrics).map((key: string) => {
        return (
            <ConfigurationMetric
                key={key}
                metricKey={key}
                metricName={metrics[key].name}
                metricValue={metrics[key].value}
                metricsNameValidation={metricsNameValidation[key]}
                metricsValueValidation={metricsValueValidation[key]}
                onMetricNameChange={onMetricNameChange}
                onMetricValueChange={onMetricValueChange}
            />
        );
    });

    return (
        <div>
            <div>Configuration Metrics</div>
            <div>{configurationMetrics}</div>
        </div>
    );
};
