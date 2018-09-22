import React from 'react';
import {CrewCard, CastCard} from './Cards.jsx';


const queryMatcher = RegExp(/movie_id=([0-9]+)/g)

class Movie extends React.Component {
    constructor (props) {
        super(props)

        let find = queryMatcher.exec(window.location.search)
        let movieID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            movie_id: movieID,
            movie_data: {title:"", poster_path: "", genres : [], production_companies: [], belongs_to_collection: {}, crew: [], cast: []}
        }

        this.getMovieById()
    }

    getMovieById (id) {   
        fetch("/dbservice/movie?movie_id=" + this.state.movie_id)
            .then(
                (response) => response.json() //returns peopl
            )
            .then(
                (json) => this.setState({movie_data : json})
            )
    } 

    render() {

        let query = ""
        let linkiMDB = ""
        let linkWiki = ""


        if (this.state.movie_data.title !== ""){
        
            query =  this.state.movie_data.title.split(" ").join("+")
            linkiMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
            linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
        }
        
        
        let genresTags = this.state.movie_data.genres.map(
            (val, num) => (
                <div className="classtag" key={num}>
                    <span> {val.name} </span>
                </div>
            ) 
        )

        let producerTags = this.state.movie_data.production_companies.map(
            (val, num) => (
                <div className="classtag" key={num}>
                    <span> {val.name} </span>
                </div>
            ) 
        )

        let crew = this.state.movie_data.crew.map(
            (val, num) => (
                <CrewCard name={val.name} department={val.department} job={val.job} imglink={val.profile_path} id={val.id} key={num}/>
            )  
        )
        let cast = this.state.movie_data.cast.map(
            (val, num) => (
                <CastCard name={val.name} role={val.character} imglink={val.profile_path} id={val.id} key={num}/>
            )  
        )
        

        

        return (  
            <div>   
                <div className="movieSummary">
                    <div className="movieImage">
                        <img src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.movie_data.poster_path} alt={this.state.movie_data.title} height="600" width="400"/>
                    </div>
                    <div className="movieDesc">
                        <div>
                            <h2>
                                {this.state.movie_data.title}
                            </h2>
                            <a href={linkWiki}> Wikipedia </a> 
                            <a href={linkiMDB}> iMDB </a>
                        </div>
                        <div>
                            {this.state.movie_data.tagline}
                        </div>
                        <div>
                            <span className="highlight"> Genres: </span>
                        </div>
                        <div  className="tagbox">
                            {genresTags}
                        </div>
                        <div>
                            <span className="highlight"> Production: </span>
                        </div>   
                        <div  className="tagbox">
                            {producerTags}
                        </div>
                        <div> 
                        <span className="highlight">Summary:</span>{this.state.movie_data.overview}
                        </div>   
                        <div> 
                            <span className="highlight">
                                Release Date: 
                            </span>    
                            {this.state.movie_data.release_date}
                        </div>   
                        <div> 
                            <span className="highlight">
                                Budget: 
                            </span>    
                            {this.state.movie_data.budget}
                        </div>                         
                    </div>
                </div>
                <div style={{justifyContent: "center",display: "flex", flexDirection: "row" }}>
                    <div className="cards">
                        <span className="highlight"> Crew: </span>
                        {crew}
                    </div>
                    <div className="cards">
                        <span className="highlight"> Cast: </span>
                        {cast}
                    </div>
                </div>
            </div>
        )
    }
}

export {
    Movie
}