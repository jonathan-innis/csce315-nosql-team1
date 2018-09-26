import React from 'react';
import {ResultCard} from './Cards.jsx';
import {numberWithCommas} from './Base.jsx';
import Slider from "react-slick";

import '../css/master.css'

class SimpleSlider extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 1,
            initialSlide: 0,
            autoplay: true,
            autoplaySpeed: 5000,

            responsive: [
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  infinite: true
                }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true
                }
              },
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true
                }
              }
            ]
          };
        return (
            <div className="container-fluid">
            <Slider {...settings}>
                {this.props.items}
            </Slider>
            </div>
        );
    }
  } 


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
                <ResultCard person={false} imglink={val.poster_path} name={val.title} id={val.id} key={num}/>
            )
        )

        let popmovies = this.state.popularMovies.map(
            (val, num) => (
                <ResultCard person={false} imglink={val.poster_path} name={val.title} id={val.id} key={num}/>
            )
        )

        let poppeople = []

        return (
            <div>
                <h1 className="result-header" style={{marginTop: 50, marginLeft: 10}}>Top Ranking Movies</h1>
                <SimpleSlider items={popmovies}/>
                <h1 className="result-header" style={{marginTop: 50, marginLeft: 10}}>Top Grossing Movies</h1>
                <SimpleSlider items={movies}/>
            </div>
        )
    }
}

export {
    Home
}
