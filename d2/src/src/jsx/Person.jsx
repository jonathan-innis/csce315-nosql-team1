import React from 'react'
import '../css/master.css'
import {MetaDataTableRow} from './Cards.jsx';
import {aggregateMovieData} from './Base.jsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { PersonTabs } from './Tabs.jsx';


const queryMatcher = RegExp(/person_id=([0-9]+)/g)

function uniqjob(a) {
    var seen = [];
    a.map(function(val,num){
        if (seen.indexOf(val.job) === -1){
            seen.push(val.job)
        }
        else{
        }
        return seen;
        } 
    ) 
    return seen;
}


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
            person_data: {name:"", profile_path: "", crew_in : [], cast_in : [] }
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
                (json) =>{
                    let data = aggregateMovieData(json);
                    this.setState({person_data : data})
                }
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
            

            let jobTags = uniqjob(this.state.person_data.crew_in).map(
                job => (
                    <div className="classtag" >
                        <span> {job} </span>
                    </div>
                ) 
            )

            console.log(query)


        
        
            return ( 
                <div>
                    <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.person_data.profile_path} alt={this.state.person_data.name} onError={(e)=>e.target.src="/unisex_silhouette.png"}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white'}}>{this.state.person_data.name}</h1>
                        </div>
                    </div>
                </div>
                <PersonTabs cast_in={this.state.person_data.cast_in} crew_in={this.state.person_data.crew_in}/>
                </div>
            );
        }
        else {
            return <span> Error Loading Page</span>
        }

    }
}

export {
    Person
}