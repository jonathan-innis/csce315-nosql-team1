import React from 'react'
import {Input, Select, Icon} from 'antd'

const Option = Select.Option;

class Home extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        
        return (
            <div>
                Welcome to the Home page
            </div>
        )
    }
}

export {
    Home
}
