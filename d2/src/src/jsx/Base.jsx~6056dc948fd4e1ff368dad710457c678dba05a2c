import React from 'react'
import '../css/master.css'

class Base extends React.Component {
    constructor (props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
        this.state = {
            search_query : ""
        }
    }

    onSearch () {
        console.log(this.state.search_query)
    }

    render () {

        return (
            <div className='titlebar'>
                        <div className="headerbox">
                            <div style={{flexGrow : 1}}>        
                                <img alt="" src='NULL'></img>
                                <h1 className='headertitle'>Fake iMDB</h1>
                                <img alt="image failed to load" src='/filmreel.png' width="100" height="92" border="0" className='fuckedupface'></img>
                            </div>
                            <div style={{flexGrow : 4}}>
                                <div className='searchbar'>
                                    <input 
                                        type="text" 
                                        placeholder="Search Here!"
                                        onChange={(e)=> this.setState({search_query : e.target.value})} 
                                        value={this.state.search_query}
                                    />
                                    <button onClick={this.onSearch}>
                                        Go
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                   
                <div className='body container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export {
    Base
}
