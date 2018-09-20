import React from 'react'
import {Input, Select, Icon} from 'antd'
import '../css/home.css'

const Option = Select.Option;

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
    }

    onSearch () {
        console.log("Something was searched")
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
                        <input type="text" className="form-control" aria-label="enter a movie or cast member"/>
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
