import React from 'react'
import '../css/master.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
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

function like(type, id, token) {
    switch (type){
        case 'movie':
            fetch('/profile/favoriteMovie', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    movie_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
        break;
        case 'person':
            fetch('/profile/favoritePerson', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    person_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
            break;
    }
}

function unlike(type, id, token){
    switch (type){
        case 'movie':
            fetch('/profile/unfavoriteMovie', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    movie_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
        break;
        case 'person':
            fetch('/profile/unfavoritePerson', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    person_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
            break;
    }
}

function check(type, id, token){
    switch (type){
        case 'movie':
            fetch('/profile/checkMovie', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    movie_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
        break;
        case 'person':
            fetch('/profile/checkPerson', {
                method: 'POST',
                body: JSON.stringify({
                    token : token,
                    person_id: id
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then( 
                (r) => r.json()
            ).then( 
                (j) => console.log(j)
            )
            break;
    }
}

class Base extends React.Component {

    constructor (props) {
        super(props)

        this.onTextChange = this.onTextChange.bind(this)
        this.onLogin  = this.onLogin.bind(this)
        this.state = {
            search_query : "",
            logged_in : false,
            cookies : new Cookies()
        }
        console.log(this.state.cookies.get("token"));   
    }

    componentDidMount(){
        if (this.state.cookies.get('token') !== null) this.setState({logged_in: true});
    }

    onTextChange (e) {
        this.setState({
            search_query : e.target.value
        })
    }

    onLogin (res) {
        this.state.cookies.set('token', res.tokenId, { path: '/' })
        this.setState({logged_in : true})
        console.log(res)
    }

    render () {
        console.log(this.state.logged_in)

        let loginbutton = (!this.state.logged_in)
            ? (
                <GoogleLogin
                    clientId="61301743792-kpgmt4gnscti2tren89sc5t4nfk7iq15.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onLogin}
                    style={{backgroundColor: 'transparent', border: '1px solid white', padding: '10px 30px', borderRadius: 10, color: 'white', cursor: 'pointer'}}
                />
            ) : (
                <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={() => this.setState({logged_in : false})}
                    style={{backgroundColor: 'transparent', border: '1px solid white', padding: '10px 30px', borderRadius: 10, color: 'white', cursor: 'pointer'}}
                />
            )

        return (
              
          <div>
            <div className='title-bar'>
                <a href="/"><h1 className="title">IMDb</h1></a>
                <Search/> 
                <div style={{right: 20, top: 20, position: 'absolute'}} className="user-login">
                    {loginbutton}
                    <FontAwesomeIcon icon={faUserCircle} style={{marginLeft: 20, color: 'white', fontSize: '2rem'}}/>
                </div>
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
    Base, numberWithCommas, aggregateCrewData, aggregateMovieData, like, unlike, check
}
