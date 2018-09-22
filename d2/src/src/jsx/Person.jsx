import React from 'react'
import '../css/master.css'

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
            person_data: {name:"", profile_path: ""}
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
        if (this.state.person_data !== null){
            let query = ""
            let linkiMDB = ""
            let linkWiki = ""

            if (this.state.person_data.name !== ""){
            
                query =  this.state.person_data.name.split(" ").join("+")
                linkiMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
                linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
            }
            
            
            console.log(query)


        
        
            return ( 
                <div>   
                    <div className="personSummary">
                        <div className="personImage">
                            <img src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.person_data.profile_path} alt={this.state.person_data.name} height="600" width="400"/>
                        </div>
                        <div className="personLinks">
                            <h2>
                                {this.state.person_data.name}
                            </h2>
                            <a href={linkWiki}> Wikipedia </a> 
                            <a href={linkiMDB}> iMDB </a>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            )
        }
        else {
            return <span> Error Loading Page</span>
        }

    }
}

export {
    Person
}