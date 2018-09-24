import React from 'react';
import {ResultCard} from './Cards.jsx';
import {numberWithCommas} from './Base.jsx';

import '../css/master.css'


class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            topMovies: [],
            popularMovies: []
        }
        this.getTopMoives();
        this.getPopularMovies();
    }

    getTopMoives(){
        fetch("/dbservice/topmovies?limit=10")
            .then(
                response => response.json()
            )
            .then(
                json => this.setState({topMovies : json})
            )
    }

    getPopularMovies(){
        fetch("/dbservice/popularmovies?limit=10")
            .then(
                response => response.json()
            )
            .then(
                json => this.setState({popularMovies : json})
            )
    }

    render () {

        let movies = this.state.topMovies.map(
            (val, num) => (
                <ResultCard person={false} imglink={val.poster_path} name={`${val.title} ($${numberWithCommas(val.revenue)})`} id={val.id} key={num}/>
            )
        )

        let popmovies = this.state.popularMovies.map(
            (val, num) => (
                <ResultCard person={false} imglink={val.poster_path} name={`${val.title} (Rating: ${val.vote_average})`} id={val.id} key={num}/>
            )
        )

        let poppeople = []

        return (
            <div>
                <div className="homebox">
                    <div className="title">
                        <h2> Search your favorite movies and cast members!</h2>
                        <p>Welcome to Fake IMdB where you can search your favorite movies and your favorite people. All you have to do is search in the top search bar.</p>
                    </div>
                    <div style={{justifyContent: "center",display: "flex", flexDirection: "row" }}>
                        <div className="cards">
                            <span className="highlight"> Popular Movies: </span>
                            {popmovies}
                        </div>
                        <div className="cards">
                            <span className="highlight"> Popular People: </span>
                            {poppeople}
                        </div>
                    </div>
                    <div className="cards" style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                        <span className="highlight" style={{textAlign: 'center', width: '100%'}}> Top Movies: </span>
                        {movies}
                    </div>
                </div>
            </div>
        )
    }
}

export {
    Home
}
