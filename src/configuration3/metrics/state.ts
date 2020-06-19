export interface StringMap<T> {
    [key: string]: T;
}

export interface Metric {
    name: string;
    value: string;
}

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
