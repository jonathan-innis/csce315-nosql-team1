import React from 'react';
import {ResutlCard, ResultCard} from './Cards.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const queryMatcher = RegExp(/query=([a-zA-Z0-9%]+)/g)
const startMatcher = RegExp(/start=([0-9]+)/g);
const numMatcher = RegExp(/num=([0-9]+)/g);

class Results extends React.Component {
    constructor (props) {
        super(props)

        this.performSearch = this.performSearch.bind(this)

        //Finding the query
        let find = queryMatcher.exec(window.location.search)
        let query = (find === null) 
            ? ("")
            : (find[1])
        
        //Finding the start point
        let find2 = startMatcher.exec(window.location.search);
        let start = (find2 === null)
            ? ("")
            : (find2[1])
        
        //Finding the num point
        let find3 = numMatcher.exec(window.location.search);
        let num = (find3 === null)
            ? ("")
            : (find3[1])
        
        console.log(query)

        this.state = {
            query: query,
            start: parseInt(start),
            num: parseInt(num),
            query_data: {result: []},
        }

        this.performSearch(query)
    }

    performSearch (query) {
        console.log(this.state.current_page);
        fetch("/dbservice/search?q=" + encodeURIComponent(query.trim()) + `&start=${this.state.start}&num=${this.state.num}`)
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
        window.location.href =  "/present/results?query=" + this.state.query + "&start=" + (this.state.start + val) + "&num=" + this.state.num;
    }

    render() {
        let results = this.state.query_data.result.slice(0,this.state.num).map(
            (val, num) => (
                <ResultCard person={val.name ? true : false} imglink={val.poster_path ? val.poster_path : val.profile_path} name={val.title ? val.title : val.name} id={val.id} key={num}/>
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
                    <h1 className="result-header" style={{marginTop: 50}}>Results</h1>
                    <div className="row" style={{justifyContent: "center"}}>
                        {results}
                    </div>
                    </div>
                    : null}
                    <div class="page-number-wrapper">
                        {this.state.start >= this.state.num ? <FontAwesomeIcon onClick={() => this.changePageNumber(-10)} icon={faChevronLeft} className="chevron-icon"/> : null}
                        <p className={"page-number"}>Displaying Results: {this.state.start + 1}-{this.state.start + this.state.num - 1}</p>
                        {results.length == this.state.num ? <FontAwesomeIcon onClick={() => this.changePageNumber(10)} icon={faChevronRight} className="chevron-icon"/> : null}
                    </div>
                </div>
            )
        }
    }
}

export {
    Results
}