import { FormState } from './models/formState';
import { ConfigurationEntry } from './models/configurationEntry';
import { ConfigurationScenario } from './models/configurationScenario';
import { ErrorReport } from './models/errorReport';

export interface ConfigurationEntryStatusState {
    configuration?: ConfigurationEntry;
    configurationScenario: ConfigurationScenario;
    formState: FormState;
    formStateError?: ErrorReport;
    formIsDirty?: boolean;
}

export const configurationEntryStatusStateInitial = (): ConfigurationEntryStatusState => {
    return {
        configurationScenario: ConfigurationScenario.NONE,
        formState: FormState.INITIALIZING,
    };
};
