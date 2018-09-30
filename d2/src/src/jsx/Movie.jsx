import React from 'react';
import {numberWithCommas, aggregateCrewData, like, unlike} from './Base.jsx';
import ReactStars from 'react-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MovieTabs } from './Tabs.jsx';
import { faImdb, faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';



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
            movie_data: {title:"", poster_path: "", genres : [], production_companies: [], belongs_to_collection: {}, crew: [], cast: []},
            cookies: new Cookies(),
            liked: false,
        }

        this.getMovieById();
    }

    getMovieById (id) {   
        fetch("/dbservice/movie?movie_id=" + this.state.movie_id)
            .then(
                (response) => response.json() //returns peopl
            )
            .then(
                (json) => {
                    let data = aggregateCrewData(json);
                    
                    this.setState({movie_data : data});
                }
            )
    }

    handleLike = () => {
        if (this.state.liked){
            unlike('movie', this.state.movie_id, this.state.cookies.get('token'));
            this.setState({liked : false});
        }
        else{
            like('movie', this.state.movie_id, this.state.cookies.get('token'));
            this.setState({liked: true});
        }
    }

    render() {
        if (this.state.movie_data !== null){
            let query = ""
            let linkIMDB = ""
            let linkWiki = ""


            if (this.state.movie_data.title !== ""){
            
                query =  this.state.movie_data.title.split(" ").join("+")
                linkIMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
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

            /*
            const producers = this.state.movie_data.production_companies.map((val, num) => {
                if (num == this.state.movie_data.production_companies.length - 1){
                    return <p style={styles.metaData} key={num}>{val.name}</p>
                }
                if (val != null){
                    return (
                        <div><p style={styles.metaData} key={num}>{val.name}</p>{pipe}</div>
                    )
                }
            })*/
            
            return (  
                <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.movie_data.poster_path} alt={this.state.movie_data.title}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white', display: 'inline-block'}}>{this.state.movie_data.title}</h1>
                            {icons}
                            <br/>
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
                    <MovieTabs cast={this.state.movie_data.cast} crew={this.state.movie_data.crew}/>
                    </div>
            )
        }
        else {
            return <span> Error Loading Page</span>
        }
    }
}

export {
    Movie
}