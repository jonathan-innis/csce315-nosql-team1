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
                This is the current path
                <div>
                    {window.location.pathname}
                </div>
            </div>
        )
    }
}

export {
    Home
}
