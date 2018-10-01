import React from 'react';
import {ResutlCard, ResultCard} from './Cards.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';


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
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <div>
                          <CircularProgress/>
                    </div>
                </div>
            )
        }

        else{
            return (
                <div className="container">
                    {movies.length != 0 ?
                    <div>
                    <h1 className="result-header" style={{marginTop: 50}}>Movies</h1>
                    <div className="row" style={{justifyContent: "center"}}>
                        {movies}
                    </div>
                    </div>
                    : null}
                    {people.length != 0 ?
                    <div>
                    <h1 className="result-header" style={{marginTop: 50}}>People</h1>
                    <div className="row" style={{marginLeft: 5}}>
                        {people}
                    </div>
                    </div>
                    : null}
                </div>
            )
        }
    }
}

export {
    Results
}