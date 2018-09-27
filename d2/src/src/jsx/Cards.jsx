import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb, faWikipediaW } from '@fortawesome/free-brands-svg-icons';

class MovieCard extends React.PureComponent { 
    render() {
        return (
            <div>
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} width={138} height={175} alt=""/>
                </div>
                <a href={"/present/movie?movie_id=" + this.props.id}>
                    {this.props.title}
                </a>
                <span>
                    {this.props.job}
                </span>
            </div>
        )
    }
}

class ResultCard extends React.PureComponent {
    render() {
        let name_link = "/present/movie?movie_id=" + this.props.id;
        let img_link = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.props.imglink;
        let linkIMDB = "";
        let linkWiki = "";
        let query = "";

        if (this.props.name !== ""){
            
            query =  this.props.name.split(" ").join("+")
            linkIMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
            linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
        }


        return (
            <div class="movie-wrapper">
                <a href={name_link}>   
                    <div class="movie">   
                        <div class="movie-hover-wrapper">
                            <div class="background"></div>
                            <div className="icon-wrapper">
                                {linkIMDB != "" ?<a href={linkIMDB}>
                                    <div className="hover-icon">
                                        <FontAwesomeIcon icon={faImdb} className="icon"/>
                                    </div>
                                </a> : null}
                                {linkWiki != "" ?<a href={linkWiki}>
                                    <div className="hover-icon">
                                        <FontAwesomeIcon icon={faWikipediaW} className="icon"/>
                                    </div>
                                </a> : null}
                            </div>
                        </div>    
                        <img  class="movie-img" src={img_link} onError={(e)=>e.target.src="/noposter.jpg"}></img>
                    </div>
                </a>
                <div class="text-movie-cont">
                    <h1 style={{color: "white"}}>{this.props.name}</h1>
                </div>
            </div>
          

        )
    }
}

export {
    MovieCard,
    ResultCard
}