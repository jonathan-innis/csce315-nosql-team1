import React from 'react'
import '../css/master.css'

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
            <div className='titlebar'>
                        <div className="headerbox">
                            <div style={{flexGrow : 1}}>        
                                <img alt="" src='NULL'></img>
                                <h1 className='headertitle'>
                                    <a href={"/"}>
                                            Fake iMDB
                                    </a>
                                </h1>
                                <img alt="image failed to load" src='/filmreel.png' width="100" height="92" border="0" className='spinner'></img>
                            </div>
                            <div style={{flexGrow : 4}}>
                                <div className='searchbar'>
                                    <input 
                                        type="text" 
                                        placeholder="Search Here!"
                                        onChange={this.onTextChange} 
                                        value={this.state.search_query}
                                    />
                                    <a href={"/present/results?query=" + this.state.search_query.split(" ").join("%20")}>
                                        Go
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                   
                <div className='body'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export {
    Base, numberWithCommas
}
