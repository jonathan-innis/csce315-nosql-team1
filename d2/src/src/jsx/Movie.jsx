import React from 'react';
import {numberWithCommas, aggregateCrewData} from './Base.jsx';
import ReactStars from 'react-stars';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MetaDataTableRow, SortingSelect } from './Cards.jsx';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const styles = {
    boldMetaData : {
        color: 'white',
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    metaData : {
        color: 'white',
        display: 'inline-block',
        fontSize: '1.2rem'
    }
}

const queryMatcher = RegExp(/movie_id=([0-9]+)/g)

class Movie extends React.Component {
    constructor (props) {
        super(props)

        let find = queryMatcher.exec(window.location.search)
        let movieID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            movie_id: movieID,
            movie_data: {title:"", poster_path: "", genres : [], production_companies: [], belongs_to_collection: {}, crew: [], cast: []}
        }

        this.getMovieById();
    }

    getMovieById (id) {   
        fetch("/dbservice/movie?movie_id=" + this.state.movie_id)
            .then(
                (response) => response.json() //returns peopl
            )
            .then(
                (json) => {
                    let data = aggregateCrewData(json);
                    
                    this.setState({movie_data : data});
                }
            )
    }

    render() {
        if (this.state.movie_data !== null){
            let query = ""
            let linkiMDB = ""
            let linkWiki = ""


            if (this.state.movie_data.title !== ""){
            
                query =  this.state.movie_data.title.split(" ").join("+")
                linkiMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
                linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
            }

            let producerTags = this.state.movie_data.production_companies.map(
                function (val, num) {
                    if (val != null){
                        return (
                            <div className="classtag" key={num}>
                                <span> {val.name} </span>
                            </div>
                        )
                    }
                    else {
                        return <div/>
                    }
                }
            )

            const year = this.state.movie_data.release_date ? new Date(this.state.movie_data.release_date).getFullYear() : null;
            const reviewsWord = this.state.movie_data.vote_count == 1 ? "Review" : "Reviews";
            const runtime = this.state.movie_data.runtime ? <p style={styles.boldMetaData}>{Math.floor(this.state.movie_data.runtime / 60)}h {this.state.movie_data.runtime % 60}m</p> : null;
            const vote_count = this.state.movie_data.vote_count ? <p style={styles.boldMetaData}>&nbsp;{this.state.movie_data.vote_count} {reviewsWord}</p> : null;
            const budget = this.state.movie_data.budget ? <p style={styles.metaData}>Budget: ${numberWithCommas(this.state.movie_data.budget)}</p> : null;
            const overview = this.state.movie_data.overview ? <p style={{color: 'white'}}>{this.state.movie_data.overview}</p> : null;
            const pipe = <p style={styles.metaData}>&nbsp;|&nbsp;</p>;

            /*
            const producers = this.state.movie_data.production_companies.map((val, num) => {
                if (num == this.state.movie_data.production_companies.length - 1){
                    return <p style={styles.metaData} key={num}>{val.name}</p>
                }
                if (val != null){
                    return (
                        <div><p style={styles.metaData} key={num}>{val.name}</p>{pipe}</div>
                    )
                }
            })*/
            
            return (  
                <div className="container" style={{paddingTop: 80}}>  
                    <div className="row">
                        <div style={{width: 266}}>
                            <img className="big-movie-img" src = {"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.movie_data.poster_path} alt={this.state.movie_data.title}/>
                        </div>
                        <div className="col" style={{marginLeft: 20}}>
                            <h1 style={{color: 'white'}}>{this.state.movie_data.title}</h1>
                            {year ? <p style={styles.boldMetaData}>{year}</p> : null}
                            {pipe}
                            {runtime}
                            {pipe}
                            <ReactStars
                                count={10}
                                size={24}
                                value={this.state.movie_data.vote_average}
                                style={{display: 'inline-block'}}
                                edit={false}
                                className='stars'
                            />
                            {vote_count}
                            <br/>
                            {budget}
                            <h4 style={{color: 'white', textWeight: 'bold'}}>Summary</h4>
                            {overview}
                            {this.state.movie_data.genres.map(genre => 
                                <p className="genre-circle" style={{color: '#e42045'}}>{genre.name}</p>
                            )}
                        </div>
                    </div>
                    <MetaTabs cast={this.state.movie_data.cast} crew={this.state.movie_data.crew}/>
                    </div>
            )
        }
        else {
            return <span> Error Loading Page</span>
        }
    }
}

class MetaTabs extends React.Component {
    state = {
      value: 0,
      sortby: 'lastname',
      open: false,
      crew: [],
      cast: [],
      showAll: false,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
      if (value === 0 && this.state.sortby === 'department') this.state.sortby = 'character';
      else if (value === 1 && this.state.sortby === 'character') this.state.sortby = 'department';
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.crew !== this.props.crew){
            let sort_function = function(a,b){return a.name.split(" ")[1] > b.name.split(" ")[1] ? 1 : -1}
            nextProps.crew.sort(sort_function);
            nextProps.cast.sort(sort_function);
            this.setState({crew:nextProps.crew, cast: nextProps.cast});
        }
    }
  

    handleSortChange = event => {
        let cast = this.state.cast;
        let crew = this.state.crew;
        let sort_function;
        this.setState({ [event.target.name]: event.target.value });
        switch (event.target.value){
            case 'lastname':
                sort_function = function(a,b){return a.name.split(" ")[1] > b.name.split(" ")[1] ? 1 : -1}
                break;
            case 'firstname':
                sort_function = function(a,b){return a.name.split(" ")[0] > b.name.split(" ")[0] ? 1 : -1}
                break;
            case 'department':
                sort_function = function(a,b){return a.department > b.department ? 1 : -1}
                break;
            case 'character':
                sort_function = function(a,b){return a.character > b.character ? 1 : -1}
        }
        crew.sort(sort_function);
        cast.sort(sort_function)
        this.setState({crew: crew, cast: cast});
      };

    render() {
      const { value } = this.state;
      const {crew, cast} = this.state;

      let cast_rendered, crew_rendered;

      if (cast.length < 3 || this.state.showAll){
        cast_rendered = cast.map((val, num) => (
            <MetaDataTableRow name={val.name} title={val.character} id={val.id} key={num} imgLink={val.profile_path}/>
        ))
      }
      else{
        console.log("Hello")
        cast_rendered = cast.slice(0, 3).map((val, num) => (
            <MetaDataTableRow name={val.name} title={val.character} id={val.id} key={num} imgLink={val.profile_path}/>
        ))
      }

      if (crew.length < 3 || this.state.showAll){
        crew_rendered = crew.map((val, num) => (
            <MetaDataTableRow name={val.name} title={val.character} id={val.id} key={num} imgLink={val.profile_path}/>
        ))
      }
      else{
        crew_rendered = crew.slice(1,3).map((val, num) => (
            <MetaDataTableRow name={val.name} title={val.character} id={val.id} key={num} imgLink={val.profile_path}/>
        ))
      } 
        
      return (
        <div style={{marginTop: 30}}>
            <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Cast" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
              <Tab label="Crew" style={{color: 'white', borderBottom: '2px solid gray', fontFamily: 'Raleway'}}/>
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
                        <MenuItem value={'lastname'}>Last Name</MenuItem>
                        <MenuItem value={'firstname'}>First Name</MenuItem>
                        {this.state.value == 0 ? <MenuItem value={'character'}>Character</MenuItem>: <MenuItem value={'department'}>Department</MenuItem>}
                    </Select>
                </FormControl>
              </div>
            </Tabs>
            {value === 0 && 
            <div style={{marginTop: 10}}>
                {cast_rendered}
            </div>}
            {value === 1 && 
            <div style={{marginTop: 10}}>
                {crew_rendered}
            </div>}
        </div>
      );
    }
  }

export {
    Movie
}