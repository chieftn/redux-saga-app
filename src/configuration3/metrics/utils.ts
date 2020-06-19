import { Metric } from './models/metric';

export const metricIsBlank = (metric: Metric): boolean => {
    if (metric.name || metric.value) {
        return true;
    }

    return false;
};
