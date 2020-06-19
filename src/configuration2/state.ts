export interface StringMap<T> {
    [key: string]: T;
}

export interface Metric {
    name: string;
    value: string;
}

export interface Label {
    name: string;
    value: string;
}

export interface ConfigurationState {
    labels: StringMap<Label>;
    labelsLastKey: number;
    labelsNameValidation: StringMap<string>;
    labelsValueValidation: StringMap<string>;
    metrics: StringMap<Metric>;
    metricsNameValidation: StringMap<string>;
    metricsValueValidation: StringMap<string>;
    metricsLastKey: number;
    name: string;
    nameValidation?: string;
    targetCondition: string;
    targetConditionValidation?: string;
    priority: string;
    priorityValidation?: string;
}

export const configurationStateInitial = (): ConfigurationState => {
    return {
        labels: {
            0: {
                name: '',
                value: ''
            }
        },
        labelsLastKey: 0,
        labelsNameValidation: {},
        labelsValueValidation: {},
        metrics: {
            0: {
                name: '',
                value: ''
            }
        },
        metricsLastKey: 0,
        metricsNameValidation: {},
        metricsValueValidation: {},
        name: '',
        priority: '',
        targetCondition: '',
    };
};
