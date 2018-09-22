import React from 'react';
import ReactDOM from 'react-dom';
import {Base} from './jsx/Base.jsx';
import {Person} from './jsx/Person.jsx';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/master.css';

ReactDOM.render(
    <Base>
        <Person/>
    </Base>, 
    document.getElementById('root')
);
registerServiceWorker();
