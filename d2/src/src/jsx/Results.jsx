import React from 'react';
import {ResutlCard, ResultCard} from './Cards.jsx';


const queryMatcher = RegExp(/query=([a-zA-Z0-9%]+)/g)

class Results extends React.Component {
    constructor (props) {
        super(props)

        this.performSearch = this.performSearch.bind(this)

        let find = queryMatcher.exec(window.location.search)
        let query = (find === null) 
            ? ("")
            : (find[1])
        
        console.log(query)

        this.state = {
            query_data: {movies : [], people: []}
        }

        this.performSearch(query)
    }

    performSearch (query) {
        fetch("/dbservice/search?q=" + query + "&num=100")
            .then(
                (response) => response.json() 
            )
            .then(
                (json) => this.setState({query_data : json})
            )
    }

    render() {
        console.log(this.state.query_data)
        let movies = this.state.query_data.movies.map(
            (val, num) => (
                <ResultCard person={false} imglink={val.poster_path} name={val.title} id={val.id} key={num}/>
            )
        )

        let people = this.state.query_data.people.map(
            (val, num) => (
                <ResultCard person={true} imglink={val.profile_path} name={val.name} id={val.id} key={num}/>
            )
        )

        if (movies.length === 0 && people.length === 0){
            return (
                <div style={{justifyContent: "center",display: "flex", flexDirection: "row" }}>
                    <div>
                        Loading...
                        <img alt="" src='/filmreel.png' width="100" height="92" border="0" className='spinner'></img>
                    </div>
                </div>
            )
        }

        else{
            return (
                <div>
                    <h1 className="result-header" style={{marginTop: 50}}>Movies</h1>
                    <div className="row" style={{justifyContent: "center"}}>
                        {movies}
                    </div>
                    <h1 className="result-header" style={{marginTop: 50}}>People</h1>
                    <div className="row" style={{justifyContent: "center"}}>
                        {people}
                    </div>
                </div>
            )
        }
    }
}

export {
    Results
}