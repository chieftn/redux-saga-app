import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Application } from './application/components/application';

initializeIcons();
ReactDOM.render(<Application />, document.getElementById('reactTarget'));
