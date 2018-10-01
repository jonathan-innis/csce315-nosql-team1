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
            query_data: {result: []},
            current_page: 1,
            totalResults: [1,2,3],
        }

        this.performSearch(query)
    }

    performSearch (query) {
        fetch("/dbservice/search?q=" + encodeURIComponent(query.trim()) + "&start=0&num=10")
            .then(
                (response) => response.json() 
            )
            .then(
                (json) =>{
                    this.setState({query_data : json});
                    console.log(json);
                }
            )
    }

    changePageNumber(val){
        this.setState({current_page: val});
    }

    render() {
        console.log(this.state.query_data)
        let results = this.state.query_data.result.slice(0,10).map(
            (val, num) => (
                <ResultCard person={val.name ? true : false} imglink={val.poster_path ? val.poster_path : val.profile_path} name={val.title ? val.title : val.name} id={val.id} key={num}/>
            )
        )

        let pageNumbers = this.state.totalResults.map(
            (val, num) => (
                <p className={this.state.current_page == val ? "page-number selected" : "page-number"} onClick={() => this.changePageNumber(val)}>{val}</p>
            )

        )

        if (results.length === 0){
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
                    {results.length != 0 ?
                    <div>
                    <h1 className="result-header" style={{marginTop: 50}}>Movies</h1>
                    <div className="row" style={{justifyContent: "center"}}>
                        {results}
                    </div>
                    </div>
                    : null}
                    <div class="page-number-wrapper">
                        {pageNumbers}
                    </div>
                </div>
            )
        }
    }
}

export {
    Results
}