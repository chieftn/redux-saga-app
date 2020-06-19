import * as React from 'react';
import { StringMap } from '../../../devices/models/stringMap';
import { Metric } from '../models/metric';
import { ConfigurationMetric } from './configurationMetric';

export interface ConfigurationMetricsProps {
    metrics: StringMap<Metric>;
    metricsNameValidation: StringMap<string>;
    metricsValueValidation: StringMap<string>;
    onMetricNameChange(key: string, value: string): void;
    onMetricValueChange(key: string, value: string): void;
    onMetricDelete(key: string): void;
}

export const ConfigurationMetrics: React.FC<ConfigurationMetricsProps> = ({ metrics, metricsNameValidation, metricsValueValidation, onMetricDelete, onMetricValueChange, onMetricNameChange }) => {
    const lastIndex = Object.keys(metrics).length - 1;
    const configurationMetrics = Object.keys(metrics).map((key: string, index) => {
        return (
            <ConfigurationMetric
                canRemove={index !== lastIndex}
                key={key}
                metricKey={key}
                metricName={metrics[key].name}
                metricValue={metrics[key].value}
                metricNameValidation={metricsNameValidation[key]}
                metricValueValidation={metricsValueValidation[key]}
                onMetricNameChange={onMetricNameChange}
                onMetricValueChange={onMetricValueChange}
                onMetricDelete={onMetricDelete}
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
