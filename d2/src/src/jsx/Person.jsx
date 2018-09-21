import React from 'react'

const queryMatcher = RegExp(/person_id=([0-9]+)/g)

class Person extends React.Component {
    constructor (props) {
        super(props)

        this.getPersonById = this.getPersonById.bind(this)
        
        let find = queryMatcher.exec(window.location.search)
        let personID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            person_id: personID,
            person_data: []
        }
        
        this.getPersonById()

        console.log(this.state.person_data)
    }
    
    getPersonById (id) {   
        fetch("/dbservice/person?person_id=" + this.state.person_id)
            .then(
                (response) => response.json() //returns peopl
            )
            .then(
                (json) => this.setState({person_data : json})
            )
    } 

    render() {

        return (
            <div>
                 We need to be displaying data from personID <b  style={{"color" : "red"}}>{this.state.person_id}</b> here right now
                 Here it is:
                 {this.state.person_data}
            </div>
        )
    }
}

export {
    Person
}