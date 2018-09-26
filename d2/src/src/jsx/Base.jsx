import React from 'react'
import Search from './Search.jsx';
import '../css/master.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

//Coppied from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

class Base extends React.Component {
    constructor (props) {
        super(props)
        this.onTextChange = this.onTextChange.bind(this)
        this.state = {
            search_query : ""
        }
    }

    onTextChange (e) {
        this.setState({
            search_query : e.target.value
        })
    }

    render () {

        return (
            <div>
            <div className='title-bar'>
                <a href="/"><h1 className="title">IMDb</h1></a>
                <Search/> 
                <FontAwesomeIcon icon={faUserCircle} style={{color: 'white', position: 'absolute', right: 20, top: 20, fontSize: '2rem'}}/>
            </div>
            <div className='container-fluid'>
                {this.props.children}
            </div>
            </div>
        )
    }
}

export {
    Base, numberWithCommas
}
