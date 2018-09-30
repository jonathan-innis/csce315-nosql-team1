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

class Base extends React.Component {

    constructor (props) {
        super(props)

        this.onTextChange = this.onTextChange.bind(this)
        this.onLogin  = this.onLogin.bind(this)
        this.like = this.like.bind(this)
        this.state = {
            search_query : "",
            logged_in : false,
            cookies : new Cookies()
        }
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

    like() {
        
        fetch('/profile/getProfile', {
            method: 'POST',
            body: JSON.stringify({
                token : this.state.cookies.get('token')
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
        
        
    }

    render () {


        let loginbutton = (!this.state.logged_in)
            ? (
                <GoogleLogin
                    clientId="61301743792-kpgmt4gnscti2tren89sc5t4nfk7iq15.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onLogin}
                    onFailure={this.onLogin}
                />
            ) : (
                <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={() => this.setState({logged_in : false})}
                />
            )

        return (
          /*{           
                <div>
                    <div className='titlebar'>
                        <div className="headerbox">
                            <div style={{flexGrow : 1}}>        
                                <img alt="" src='NULL'></img>
                                <h1 className='headertitle'>
                                    <a href={"/"}>
                                        Fake iMDB
                                    </a>
                                </h1>
                                <img alt="image failed to load" src='/filmreel.png' width="100" height="92" border="0" className='spinner'></img>
                            </div>
                            <div style={{flexGrow : 4}}>
                                <div className='searchbar'>
                                    <input 
                                        type="text" 
                                        placeholder="Search Here!"
                                        onChange={this.onTextChange} 
                                        value={this.state.search_query}
                                    />
                                    <a href={"/present/results?query=" + this.state.search_query.split(" ").join("%20")}>
                                        Go
                                    </a>
                                </div>
                            </div>
                            <div>
                                {loginbutton}
                            </div>
                            <div>
                                <button onClick={this.like} buttonText={"Like"} />
                            </div>
                        </div>
                        
                        <div className='body'>
                            {this.props.children}
                        </div>
                        
                    </div>
                </div> } */
              
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
