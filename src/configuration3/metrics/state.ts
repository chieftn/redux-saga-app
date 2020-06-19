import { StringMap } from '../../devices/models/stringMap';
import { Metric } from './models/metric';

export interface MetricsStateInterface {
    metrics: StringMap<Metric>;
    metricsNameValidation: StringMap<string>;
    metricsValueValidation: StringMap<string>;
    metricsLastKey: number;
}

export const metricsInitialState = () => {
    return {
        metrics: {
            0: {
                name: '',
                value: ''
            }
        },
        metricsLastKey: 0,
        metricsNameValidation: {},
        metricsValueValidation: {}
    };
};
