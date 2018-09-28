import React from 'react'
import '../css/master.css'
import {MetaDataTableRow} from './Cards.jsx';
import {aggregateMovieData} from './Base.jsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const queryMatcher = RegExp(/person_id=([0-9]+)/g)

function uniqjob(a) {
    var seen = [];
    a.map(function(val,num){
        if (seen.indexOf(val.job) === -1){
            seen.push(val.job)
        }
        else{
        }
        return seen;
        } 
    ) 
    return seen;
}


class Person extends React.Component {
    constructor (props) {
        super(props)

        this.getPersonById = this.getPersonById.bind(this)
        
        let find = queryMatcher.exec(window.location.search)
        let personID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            person_id: personID,
            person_data: {name:"", profile_path: "", crew_in : [], cast_in : [] }
        }
         
        this.getPersonById()

        console.log(this.state.person_data)
    }
    
    getPersonById (id) {   
        fetch("/dbservice/person?person_id=" + this.state.person_id)
            .then(
                (response) => response.json() //returns peopl
            )
            .then(
                (json) =>{
                    let data = aggregateMovieData(json);
                    this.setState({person_data : data})
                }
            )
    } 

    render() {
        if (this.state.person_data !== null){
            let query = ""
            let linkiMDB = ""
            let linkWiki = ""

            if (this.state.person_data.name !== ""){
            
                query =  this.state.person_data.name.split(" ").join("+")
                linkiMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
                linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
            }
            

            let jobTags = uniqjob(this.state.person_data.crew_in).map(
                job => (
                    <div className="classtag" >
                        <span> {job} </span>
                    </div>
                ) 
            )

            console.log(query)


        
        
            return ( 
                <div>
                    <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.person_data.profile_path} alt={this.state.person_data.name}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white'}}>{this.state.person_data.name}</h1>
                        </div>
                    </div>
                </div>
                <MetaTabs cast_in={this.state.person_data.cast_in} crew_in={this.state.person_data.crew_in}/>
                </div>
            );
        }
        else {
            return <span> Error Loading Page</span>
        }

    }
}

class MetaTabs extends React.Component {
    state = {
        value: 0,
        sortby: 'year',
        open: false,
        crew_in: [],
        cast_in: []
      };
  
      handleClose = () => {
          this.setState({ open: false });
      };
  
      handleOpen = () => {
          this.setState({ open: true });
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
  
      componentWillReceiveProps(nextProps){
          if (nextProps.crew_in !== this.props.crew_in){
              let sort_function = function(a,b){return new Date(a.movie.release_date).getFullYear() < new Date(b.movie.release_date).getFullYear() ? 1 : -1}
              nextProps.crew_in.sort(sort_function);
              nextProps.cast_in.sort(sort_function);
              this.setState({crew_in: nextProps.crew_in, cast_in: nextProps.cast_in});
          }
      }
    
      handleSortChange = event => {
          let {crew_in, cast_in} = this.state;
          let sort_function;
          this.setState({ [event.target.name]: event.target.value });
          switch (event.target.value){
              case 'year':
                  sort_function = function(a,b){return new Date(a.movie.release_date).getFullYear() < new Date(b.movie.release_date).getFullYear() ? 1 : -1}
                  break;
              case 'genre':
                  sort_function = function(a,b){return a.name.split(" ")[0] > b.name.split(" ")[0] ? 1 : -1}
                  break;
              case 'popularity':
                  sort_function = function(a,b){return a.movie.popularity < b.movie.popularity ? 1 : -1}
                  break;
          }
          crew_in.sort(sort_function);
          cast_in.sort(sort_function)
          this.setState({crew_in: crew_in, cast_in: cast_in});
        };
  
    render() {
      const { value } = this.state;
      const {crew_in, cast_in} = this.state;
        
      return (
        <div style={{marginTop: 30}} className="container">
            <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Movies Cast In" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
                <Tab label="Movies Crew In" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
                <div style={{position: 'absolute', right: 5}} className="sorting">
                <FormControl>
                    <InputLabel htmlFor="demo-controlled-open-select" style={{color: 'white'}}>Sort By:</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.sortby}
                        onChange={this.handleSortChange}
                        style={{color: 'white'}}
                        inputProps={{
                        name: 'sortby',
                        id: 'demo-controlled-open-select',
                        }}
                    >
                        <MenuItem value={'year'}>Year</MenuItem>
                        <MenuItem value={'genre'}>Genre</MenuItem>
                        <MenuItem value={'popularity'}>Popularity</MenuItem>
                    </Select>
                </FormControl>
              </div>
            </Tabs>
            {value === 0 && 
            <div style={{marginTop: 10}}>
                {cast_in.map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.character} id={val.movie.id} key={num} imgLink={val.movie.poster_path} year={new Date(val.movie.release_date).getFullYear()}/>
                ))}
            </div>}
            {value === 1 && 
            <div style={{marginTop: 10}}>
                {crew_in.map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.job} id={val.movie.id} key={num} imgLink={val.movie.poster_path} year={new Date(val.movie.release_date).getFullYear()}/>
                ))}
            </div>}
        </div>
      );
    }
  }

export {
    Person
}