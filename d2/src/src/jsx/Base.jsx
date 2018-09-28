import React from 'react'
import Search from './Search.jsx';
import '../css/master.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

//Coppied from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function aggregateCrewData(json){
    let crew = json.crew;
    let new_crew = {};
    for (let member of crew){
        if (member.name in new_crew){
            new_crew[member.name].job += `, ${member.job}`;
        }
        else{
            new_crew[member.name] = member;
        }
    }
    let data = json;
    data.crew = Object.values(new_crew);
    return data
}

function aggregateMovieData(json){
    let {crew_in, cast_in} = json;
    let new_crew_in = {};
    let new_cast_in = {};
    for (let member of crew_in){
        if (member.movie.title in new_crew_in){
            new_crew_in[member.movie.title].job += `, ${member.job}`;
        }
        else{
            new_crew_in[member.movie.title] = member;
        }
    }
    for (let member of cast_in){
        if (member.movie.title in new_cast_in){
            new_cast_in[member.movie.title].character += `, ${member.character}`;
        }
        else{
            new_cast_in[member.movie.title] = member;
        }
    }
    let data = json;
    data.crew_in = Object.values(new_crew_in);
    data.cast_in = Object.values(new_cast_in);
    console.log(data);
    return data;
}

class Base extends React.Component {
    constructor (props) {
        super(props)
        this.onTextChange = this.onTextChange.bind(this)
        this.state = {
            search_query : ""
        }
    }

    onTextChange (e) {
        this.setState({
            search_query : e.target.value
        })
    }

    render () {

        return (
            <div>
            <div className='title-bar'>
                <a href="/"><h1 className="title">IMDb</h1></a>
                <Search/> 
                <FontAwesomeIcon icon={faUserCircle} style={{color: 'white', position: 'absolute', right: 20, top: 20, fontSize: '2rem'}}/>
            </div>
            <div className='container-fluid' style={{paddingBottom: 20}}>
                {this.props.children}
            </div>
            <div className="background-wrapper"></div>
            </div>
        )
    }
}

export {
    Base, numberWithCommas, aggregateCrewData, aggregateMovieData
}
