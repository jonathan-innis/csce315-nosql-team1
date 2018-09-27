import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb, faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const MetaDataTableRow = (props) => {
    return (
        <div className="table-item-wrapper">
        <a href={"/present/person?person_id=" + props.id}>
        <div className="table-item">
            <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + props.imgLink} height={100} width={80} onError={(e)=>e.target.src="/unisex_silhouette.png"}/>
            <h5 style={{display: 'inline-block', marginLeft: 20, fontFamily: 'Raleway', color: 'white', fontWeight: 'bolder'}}>{props.name}</h5>
            <p style={{position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Raleway', color: 'white'}}>{props.title}</p>
        </div>
        </a>
        </div>
    );
}

class SortingSelect extends React.Component{
    state = {
        open: false,
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
      handleOpen = () => {
        this.setState({ open: true });
      };
    
      render() {
        const { classes } = this.props;
    
        return (
            <FormControl>
              <InputLabel htmlFor="demo-controlled-open-select" style={{color: 'white'}}>Sort By:</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.sortby}
                onChange={this.props.handleChange}
                style={{color: 'white'}}
                inputProps={{
                  name: 'sortby',
                  id: 'demo-controlled-open-select',
                }}
              >
                <MenuItem value={10}>Last Name</MenuItem>
                <MenuItem value={20}>First Name</MenuItem>
                <MenuItem value={30}>Character</MenuItem>
              </Select>
            </FormControl>
        );
      }
    }

class ResultCard extends React.PureComponent {
    render() {
        let name_link = "/present/movie?movie_id=" + this.props.id;
        let img_link = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.props.imglink;
        let linkIMDB = "";
        let linkWiki = "";
        let query = "";

        if (this.props.name !== ""){
            
            query =  this.props.name.split(" ").join("+")
            linkIMDB = "http://www.google.com/search?q=" + query + "+iMDB&btnI"
            linkWiki = "http://www.google.com/search?q=" + query + "+Wikipedia&btnI"
        }


        return (
            <div class="movie-wrapper">
                <a href={name_link}>   
                    <div class="movie">   
                        <div class="movie-hover-wrapper">
                            <div class="background"></div>
                            <div className="icon-wrapper">
                                {linkIMDB != "" ?<a href={linkIMDB}>
                                    <div className="hover-icon">
                                        <FontAwesomeIcon icon={faImdb} className="icon"/>
                                    </div>
                                </a> : null}
                                {linkWiki != "" ?<a href={linkWiki}>
                                    <div className="hover-icon">
                                        <FontAwesomeIcon icon={faWikipediaW} className="icon"/>
                                    </div>
                                </a> : null}
                            </div>
                        </div>    
                        <img  class="movie-img" src={img_link} onError={(e)=>e.target.src="/noposter.jpg"}></img>
                    </div>
                </a>
                <div class="text-movie-cont">
                    <h1 style={{color: "white"}}>{this.props.name}</h1>
                </div>
            </div>
          

        )
    }
}

export {
    MetaDataTableRow,
    ResultCard,
    SortingSelect
}