import Autosuggest from 'react-autosuggest';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + suggestion.data[1]} onError={(e)=>e.target.src="/unisex_silhouette.png"} className="suggestion-img"/>
    <p className="suggestion"><b>{suggestion.word}</b> ({new Date(suggestion.data[3]).getFullYear()})</p>
  </div>
);

export default class Search extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      movies: [],
      people: [],
    };
  }

  getMovieSuggestions (value) {   
    fetch(`/dbservice/movieautocomplete?q=${value}`)
      .then(
          (response) => response.json() //returns peopl
      )
      .then(
          (json) => {
              this.setState({movies : json});
          }
      )
  }   

  getPeopleSuggestions (value) {   
    fetch(`/dbservice/personautocomplete?q=${value}`)
      .then(
          (response) => response.json() //returns peopl
      )
      .then(
          (json) => {
              this.setState({people : json});
          }
      )
  }   

  getSuggestions = value => {
    this.getMovieSuggestions(value);
    //this.getPeopleSuggestions(value);
    console.log(this.state.movies)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 || this.state.movies == "No Matches" ? [] : this.state.movies;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onKeyPress = (e) => {
    if (e.key == 'Enter'){
      window.location.href =  "/present/results?query=" + this.state.value + "&start=0&num=10";
    }
  }

  onSuggestionSelected = (event, {suggestion}) => {
    window.location.href = "/present/movie?movie_id=" + suggestion.data[0];
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search Movies and People...',
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    // Finally, render it!
    return (
      <div class="search" style={{zIndex: 20}}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </div>
    );
  }
}
