import React from 'react'

import '../css/home.css'


class Home extends React.Component {
    constructor (props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)

        this.state = {
            search_query : ""
        }
    }

    onSearch () {
        console.log(this.state.search_query)
    }

    render () {

        return (
            <div className="searchbar">
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h2 className=' searchtitle'>Search your favorite movies and cast members!</h2>
                    </div>
                </div>
                <div style={{"height" : "200px"}}>
                    
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" style={{textAlign : "center"}} aria-label="enter a movie or cast member" onChange={(e)=> this.setState({search_query : e.target.value})} value={this.state.search_query}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.onSearch}>
                                Go!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    Home
}
