import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class CrewCard extends React.PureComponent {
    render() {
        return (
            <div className="card">
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} onError={(e)=>e.target.src="/unisex_silhouette.png"} width={138} height={175} alt=""/>
                </div>
                <a href={"/present/person?person_id=" + this.props.id}>
                    {this.props.name}
                </a>
                <span>
                    {this.props.department} : {this.props.job}
                </span>
            </div>
        )
    }
}

class CastCard extends React.PureComponent { 
    render() {
        return (
            <div className="card">
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} onError={(e)=>e.target.src="/unisex_silhouette.png"} width={138} height={175} alt=""/>
                </div>
                <a href={"/present/person?person_id=" + this.props.id}>
                    {this.props.name}
                </a>
                <span>
                    {this.props.role}
                </span>
            </div>
        )
    }
}

class MovieCard extends React.PureComponent { 
    render() {
        return (
            <div className="card">
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
        let name_link;
        let img_link;
        if(this.props.person){
            name_link = "/present/person?person_id=" + this.props.id;
            img_link = "https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink;
        }

        else {
            name_link = "/present/movie?movie_id=" + this.props.id;
            img_link = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.props.imglink;
        }


        return (
            <div class="cellphone-container"> 
                <a href={name_link}>   
                <div class="movie">       
                  <img  class="movie-img" src={img_link}></img>
                  <div class="text-movie-cont">
                    <div class="mr-grid">
                      <div class="col1">
                        <h1 style={{color: "white"}}>{this.props.name}</h1>
                      </div>
                    </div>
                  </div>
                  <div class="like-circle">
                    <FontAwesomeIcon icon={faHeart} style={{position: 'relative', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', color: 'lightgray'}}/>
                  </div>
                </div>
                </a>
            </div>
          

        )
    }
}

export {
    CrewCard,
    CastCard,
    MovieCard,
    ResultCard
}