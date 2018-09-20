import React from 'react'
import {Input, Select, Icon} from 'antd'

const queryMatcher = RegExp(/person_id=([0-9]+)/g)

class Person extends React.Component {
    constructor (props) {
        super(props)

        let find = queryMatcher.exec(window.location.search)
        let personID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            person_id: personID
        }
    }

    

    render() {
        return (
            <div>
                 We need to be displaying data from personID <b  style={{"color" : "red"}}>{this.state.person_id}</b> here right now
            </div>
        )
    }
}

export {
    Person
}