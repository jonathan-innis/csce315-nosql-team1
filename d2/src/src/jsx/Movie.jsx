import React from 'react';
import {numberWithCommas} from './Base.jsx';
import ReactStars from 'react-stars';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


const styles = {
    boldMetaData : {
        color: 'white',
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    metaData : {
        color: 'white',
        display: 'inline-block',
        fontSize: '1.2rem'
    }
}

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
        if (this.state.movie_data !== null){
            let query = ""
            let linkiMDB = ""
            let linkWiki = ""


            if (this.state.movie_data.title !== ""){
            
                query =  this.state.movie_data.title.split(" ").join("+")
                linkiMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
                linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
            }

            let producerTags = this.state.movie_data.production_companies.map(
                function (val, num) {
                    if (val != null){
                        return (
                            <div className="classtag" key={num}>
                                <span> {val.name} </span>
                            </div>
                        )
                    }
                    else {
                        return <div/>
                    }
                }
            )

            const year = this.state.movie_data.release_date ? new Date(this.state.movie_data.release_date).getFullYear() : null;
            const reviewsWord = this.state.movie_data.vote_count == 1 ? "Review" : "Reviews";
            const runtime = this.state.movie_data.runtime ? <p style={styles.boldMetaData}>{Math.floor(this.state.movie_data.runtime / 60)}h {this.state.movie_data.runtime % 60}m</p> : null;
            const vote_count = this.state.movie_data.vote_count ? <p style={styles.boldMetaData}>&nbsp;{this.state.movie_data.vote_count} {reviewsWord}</p> : null;
            const budget = this.state.movie_data.budget ? <p style={styles.metaData}>Budget: ${numberWithCommas(this.state.movie_data.budget)}</p> : null;
            const overview = this.state.movie_data.overview ? <p style={{color: 'white'}}>{this.state.movie_data.overview}</p> : null;
            const pipe = <p style={styles.metaData}>&nbsp;|&nbsp;</p>;

            const producers = this.state.movie_data.production_companies.map((val, num) => {
                if (num == this.state.movie_data.production_companies.length - 1){
                    return <p style={styles.metaData} key={num}>{val.name}</p>
                }
                if (val != null){
                    return (
                        <div><p style={styles.metaData} key={num}>{val.name}</p>{pipe}</div>
                    )
                }
            })
            
            return (  
                <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.movie_data.poster_path} alt={this.state.movie_data.title}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white'}}>{this.state.movie_data.title}</h1>
                            {year ? <p style={styles.boldMetaData}>{year}</p> : null}
                            {pipe}
                            {runtime}
                            {pipe}
                            <ReactStars
                                count={10}
                                size={24}
                                value={this.state.movie_data.vote_average}
                                style={{display: 'inline-block'}}
                                edit={false}
                                className='stars'
                            />
                            {vote_count}
                            <br/>
                            {budget}
                            <h4 style={{color: 'white', textWeight: 'bold'}}>Summary</h4>
                            {overview}
                            {this.state.movie_data.genres.map(genre => 
                                <p className="genre-circle" style={{color: '#e42045'}}>{genre.name}</p>
                            )}
                        </div>
                    </div>
                    <SimpleTabs cast={this.state.movie_data.cast} crew={this.state.movie_data.crew}/>
                        {/*
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
                                    Budget:
                                </span>    
                                &nbsp;${this.state.movie_data.budget ? numberWithCommas(this.state.movie_data.budget) : null}
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
                        </div>*/}
                    </div>
            )
        }
        else {
            return <span> Error Loading Page</span>
        }
    }
}

const TableRow = (props) => {
    return (
        <div className="table-item-wrapper">
        <a href={"/present/person?person_id=" + props.id}>
        <div className="table-item">
            <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + props.imgLink} height={100} width={80} onError={(e)=>e.target.src="/unisex_silhouette.png"}/>
            <h5 style={{display: 'inline-block', marginLeft: 20, fontFamily: 'Raleway', color: 'white', fontWeight: 'bolder'}}>{props.name}</h5>
            <p style={{position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Raleway', color: 'white'}}>{props.title}</p>
        </div>
        </a>
        </div>
    );
}

class SimpleTabs extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { value } = this.state;
      const {crew, cast} = this.props;
      console.log(crew, cast)
        
      return (
        <div style={{marginTop: 30}}>
            <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Cast" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
              <Tab label="Crew" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
            </Tabs>
            {value === 0 && 
            <div>
                {cast.map((val, num) => (
                    <TableRow name={val.name} title={val.character} id={val.id} key={num} imgLink={val.profile_path}/>
                ))}
            </div>}
            {value === 1 && 
            <div>
                {crew.map((val, num) => (
                    <TableRow name={val.name} title={val.job} id={val.id} key={num} imgLink={val.profile_path}/>
                ))}
            </div>}
        </div>
      );
    }
  }

export {
    Movie
}