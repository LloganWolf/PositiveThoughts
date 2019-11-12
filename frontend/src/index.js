import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './Store/combinedReducers';
import Routes from './Routes';

import * as serviceWorker from './serviceWorker';

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes />
        </PersistGate>
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
