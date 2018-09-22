import React from 'react';
import ReactDOM from 'react-dom';
import {Base} from './jsx/Base.jsx';
import {Results} from './jsx/Results.jsx';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/master.css';

ReactDOM.render(
    <Base>
        <Results/>
    </Base>, 
    document.getElementById('root')
);
registerServiceWorker();
