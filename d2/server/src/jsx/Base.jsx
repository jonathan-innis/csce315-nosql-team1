import React from 'react'
import '../css/base.css'

class Base extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div>
                <div className='titlebar'>
                    <img alt="" src='NULL'></img>
                    <h1 className='headertitle'>Fake iMDB</h1>
                    <img alt="image failed to load" src='/filmreel.png' width="100" height="92" border="0" className='fuckedupface'></img>
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
