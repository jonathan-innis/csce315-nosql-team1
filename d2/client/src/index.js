import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './jsx/App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
registerServiceWorker();
