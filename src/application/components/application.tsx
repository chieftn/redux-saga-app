import 'react-toastify/dist/ReactToastify.css'; // tslint:disable-line: no-submodule-imports
import * as React from 'react';
import { Route, BrowserRouter, Switch  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import store from '../../redux/store';
import { DeviceList } from '../../devices/components/deviceListPromise';
// import { DeviceList } from '../../devices/components/deviceList';
import { Device } from '../../devices/components/device';
import { DetailsListExperiment } from './grid';
import { Configuration } from '../../configuration2/components/configuration';
import './application.css';

export const Application: React.FC = () => {
    return (
        <Provider store={store}>
            <Fabric>
                <div>
                    <h2 className="header">Devices View</h2>
                    <div className="content">
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" component={DeviceList} exact={true} />
                                <Route path="/devices/:id" component={Device} />
                                <Route path="/grid" component={DetailsListExperiment} />
                                <Route path="/form" component={Configuration} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                    <ToastContainer />
                </div>
            </Fabric>
        </Provider>
    );
};
