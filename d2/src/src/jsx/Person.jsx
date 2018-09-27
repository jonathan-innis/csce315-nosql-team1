import React from 'react'
import '../css/master.css'
import {MetaDataTableRow} from './Cards.jsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.person_data.profile_path} alt={this.state.person_data.name}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white'}}>{this.state.person_data.name}</h1>
                        </div>
                    </div>
                </div>
                <MetaTabs cast_in={this.state.person_data.cast_in} crew_in={this.state.person_data.crew_in}/>
                </div>
            );
        }
        else {
            return <span> Error Loading Page</span>
        }

    }
}

const TableRow = (props) => {
    return (
        <div className="table-item-wrapper">
        <a href={"/present/movie?movie_id=" + props.id}>
        <div className="table-item">
            <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + props.imgLink} height={100} width={80} onError={(e)=>e.target.src="/noposter.jpg"}/>
            <h5 style={{display: 'inline-block', marginLeft: 20, fontFamily: 'Raleway', color: 'white', fontWeight: 'bolder'}}>{props.name}</h5>
            <p style={{position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Raleway', color: 'white'}}>{props.title}</p>
        </div>
        </a>
        </div>
    );
}

class MetaTabs extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { value } = this.state;
      const {crew_in, cast_in} = this.props;
        
      return (
        <div style={{marginTop: 30}}>
            <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Movies Cast In" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
                <Tab label="Movies Crew In" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
            </Tabs>
            {value === 0 && 
            <div>
                {cast_in.map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.character} id={val.movie.id} key={num} imgLink={val.movie.poster_path}/>
                ))}
            </div>}
            {value === 1 && 
            <div>
                {crew_in.map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.job} id={val.movie.id} key={num} imgLink={val.movie.poster_path}/>
                ))}
            </div>}
        </div>
      );
    }
  }

export {
    Person
}