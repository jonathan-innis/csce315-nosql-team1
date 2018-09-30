import React from 'react'
import '../css/master.css'
import {aggregateMovieData, like, unlike} from './Base.jsx';
import { PersonTabs } from './Tabs.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb, faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';



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
            person_data: {name:"", profile_path: "", crew_in : [], cast_in : [] },
            cookies: new Cookies(),
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

    handleLike = () => {
        if (this.state.liked){
            unlike('person', this.state.person_id, this.state.cookies.get('token'));
            this.setState({liked : false});
        }
        else{
            like('person', this.state.person_id, this.state.cookies.get('token'));
            this.setState({liked: true});
        }
    }

    render() {
        if (this.state.person_data !== null){
            let query = ""
            let linkIMDB = ""
            let linkWiki = ""

            if (this.state.person_data.name !== ""){
            
                query =  this.state.person_data.name.split(" ").join("+")
                linkIMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
                linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
            }
            

            let jobTags = uniqjob(this.state.person_data.crew_in).map(
                job => (
                    <div className="classtag" >
                        <span> {job} </span>
                    </div>
                ) 
            )
            const heartIcon = this.state.liked ? <FontAwesomeIcon icon={solidHeart} onClick={() => this.handleLike()} className="heart-icon"/> : <FontAwesomeIcon icon={regularHeart} onClick={() => this.handleLike()} className="heart-icon"/>;
            const icons = 
            <div className="icon-wrapper">
                {linkIMDB != "" ?<a href={linkIMDB} target="_blank">
                    <div className="hover-icon">
                        <FontAwesomeIcon icon={faImdb} className="icon"/>
                    </div>
                </a> : null}
                {linkWiki != "" ?<a href={linkWiki} target="_blank">
                    <div className="hover-icon">
                        <FontAwesomeIcon icon={faWikipediaW} className="icon"/>
                    </div>
                </a> : null}
                {heartIcon}
            </div>;

            console.log(query)


        
        
            return ( 
                <div>
                    <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.person_data.profile_path} alt={this.state.person_data.name} onError={(e)=>e.target.src="/unisex_silhouette.png"}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white', display: 'inline-block'}}>{this.state.person_data.name}</h1>
                            {icons}
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