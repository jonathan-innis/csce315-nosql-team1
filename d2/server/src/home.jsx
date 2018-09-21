import React from 'react';
import ReactDOM from 'react-dom';
import {Base} from './jsx/Base.jsx';
import {Home} from './jsx/Home.jsx';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Base>
        <Home/>
    </Base>, 
    document.getElementById('root')
);
registerServiceWorker();
