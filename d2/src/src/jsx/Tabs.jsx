import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MetaDataTableRow, SortingSelect } from './Cards.jsx';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class MovieTabs extends React.Component {
    state = {
      value: 0,
      sortby: 'lastname',
      open: false,
      crew: [],
      cast: [],
      showAllCast: false,
      showAllCrew: false,
      cast_sliced_index: 3,
      crew_sliced_index: 3,
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
            let sort_function = function(a,b){return a.name.split(" ")[a.name.split(" ").length - 1] > b.name.split(" ")[b.name.split(" ").length - 1] ? 1 : -1}
            nextProps.crew.sort(sort_function);
            nextProps.cast.sort(sort_function);
            this.setState({crew: nextProps.crew, cast: nextProps.cast});
            if (nextProps.cast.length < 4) this.setState({cast_sliced_index: nextProps.cast.length});
            if (nextProps.crew.length < 4) this.setState({crew_sliced_index: nextProps.crew.length});
        }
    }
  

    handleSortChange = event => {
        let {cast, crew} = this.state;
        let sort_function;
        this.setState({ [event.target.name]: event.target.value });
        switch (event.target.value){
            case 'lastname':
                sort_function = function(a,b){return a.name.split(" ")[a.name.split(" ").length - 1] > b.name.split(" ")[b.name.split(" ").length - 1] ? 1 : -1}
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

        //Produces the table of items where only a certain number of components are shown initially
        cast_rendered = 
            <div>
                {cast.slice(0, this.state.cast_sliced_index).map((val, num) => (
                    <MetaDataTableRow name={val.name} title={val.character} pageLink={"/present/person?person_id=" + val.id} key={num} imgLink={val.profile_path}/>
                ))}
                {!this.state.showAllCast && cast.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCast: true, cast_sliced_index: cast.length})}>
                    <p>Show More...</p>
                </div>: null}
                {this.state.showAllCast && cast.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCast: false, cast_sliced_index: 3})}>
                    <p>Show Less...</p>
                </div>: null}
            </div>
    

        //Produces the table of items where only a certain number of components are shown initially
        crew_rendered = 
            <div>
                {crew.slice(0, this.state.crew_sliced_index).map((val, num) => (
                    <MetaDataTableRow name={val.name} title={val.job} pageLink={"/present/person?person_id=" + val.id} key={num} imgLink={val.profile_path} department={val.department}/>
                ))}
                {!this.state.showAllCrew && crew.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCrew: true, crew_sliced_index: crew.length})}>
                    <p>Show More...</p>
                </div>: null}
                {this.state.showAllCrew && crew.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCrew: false, crew_sliced_index: 3})}>
                    <p>Show Less...</p>
                </div>: null}
            </div>
        
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

  class PersonTabs extends React.Component {
    state = {
        value: 0,
        sortby: 'year',
        open: false,
        crew_in: [],
        cast_in: [],
        showAllCastIn: false,
        showAllCrewIn: false,
        cast_in_sliced_index: 3,
        crew_in_sliced_index: 3,
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
                  sort_function = function(a,b){
                        if(a.movie.genres[0] === null){
                            return 1;
                        }
                        else if(b.movie.genres[0] === null){
                            return -1;
                        }
                        return a.movie.genres[0].name > b.movie.genres[0].name ? 1 : -1
                        }
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

      let cast_in_rendered, crew_in_rendered;

        //Produces the table of items where only a certain number of components are shown initially
        cast_in_rendered = 
            <div>
                {cast_in.slice(0, this.state.cast_in_sliced_index).map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.character} pageLink={"/present/movie?movie_id=" + val.movie.id} key={num} imgLink={val.movie.poster_path} year={new Date(val.movie.release_date).getFullYear()} genre={val.movie.genres[0] ? val.movie.genres[0].name : null}/>
                ))}
                {!this.state.showAllCastIn && cast_in.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCastIn: true, cast_in_sliced_index: cast_in.length})}>
                    <p>Show More...</p>
                </div>: null}
                {this.state.showAllCastIn && cast_in.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCastIn: false, cast_in_sliced_index: 3})}>
                    <p>Show Less...</p>
                </div>: null}
            </div>
    

        //Produces the table of items where only a certain number of components are shown initially
        crew_in_rendered = 
            <div>
                {crew_in.slice(0, this.state.crew_in_sliced_index).map((val, num) => (
                    <MetaDataTableRow name={val.movie.title} title={val.job} pageLink={"/present/movie?movie_id=" + val.movie.id} key={num} imgLink={val.movie.poster_path} year={new Date(val.movie.release_date).getFullYear()} genre={val.movie.genres[0] ? val.movie.genres[0].name : null}/>
                ))}
                {!this.state.showAllCrewIn && crew_in.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCrewIn: true, crew_in_sliced_index: crew_in.length})}>
                    <p>Show More...</p>
                </div>: null}
                {this.state.showAllCrewIn && crew_in.length >= 4 ? <div className="show-table-icon-wrapper table-item-wrapper" onClick={() => this.setState({showAllCrewIn: false, crew_in_sliced_index: 3})}>
                    <p>Show Less...</p>
                </div>: null}
            </div>
        
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
                    {cast_in_rendered}
                </div>
            }
            {value === 1 && 
                <div style={{marginTop: 10}}>
                    {crew_in_rendered}
                </div>
            }
        </div>
      );
    }
  }

  export {
    MovieTabs,PersonTabs
}