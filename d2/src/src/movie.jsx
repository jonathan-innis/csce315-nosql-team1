import React from 'react';
import ReactDOM from 'react-dom';
import {Base} from './jsx/Base.jsx';
import {Movie} from './jsx/Movie.jsx';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/master.css';

ReactDOM.render(
    <Base>
        <Movie/>
    </Base>, 
    document.getElementById('root')
);
registerServiceWorker();