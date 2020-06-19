import * as React from 'react';
import { ConfigurationState, configurationStateInitial } from '../state';

// tslint:disable-next-line: no-any
const ConfigurationStateContext = React.createContext<{configurationState: ConfigurationState, dispatch?: (action: any) => void}>({ configurationState: configurationStateInitial() });
export const ConfigurationStateProvider = ConfigurationStateContext.Provider;
export const useConfigurationStateContext = () => React.useContext(ConfigurationStateContext);
