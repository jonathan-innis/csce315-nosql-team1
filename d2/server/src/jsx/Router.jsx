import React from 'react'
import {Home} from './Home.jsx'

/*
Pages to route:

Home -> 0
Person -> 1
Movie -> 2
Results ?
*/



class Router extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.onPageSwitch = this.onPageSwitch.bind(this)

        this.state = {
            current_page : 0
        }
    } 

    onPageSwitch (newPageIndex) {
        this.setState({current_page: newPageIndex})
    }

    render() {
        switch (this.state.current_page) {
            case 0:
                var display_page = (
                    <Home />
                )
            /* case n:
                var display_page = (
                    some other page
                )
            */
        }

        var header_bar = (
            <div>
                <h1> Welcome to this site </h1>
            </div>
        )

        return (
            <div>
                {header_bar}
                {display_page}
            </div>
        )
    }
}


export {
    Router
}