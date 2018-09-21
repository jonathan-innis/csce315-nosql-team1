import React from 'react'


const queryMatcher = RegExp(/movie_id=([0-9]+)/g)

class Movie extends React.Component {
    constructor (props) {
        super(props)

        let find = queryMatcher.exec(window.location.search)
        let movieID = (find === null) 
            ? ("-1")
            : (find[1])
    
        this.state = {
            movie_id: movieID
        }
    }

    

    render() {
        return (
            <div>
                 We need to be displaying data from movieID <b  style={{"color" : "red"}}>{this.state.movie_id}</b> here right now
            </div>
        )
    }
}

export {
    Movie
}