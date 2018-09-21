import React from 'react'


const queryMatcher = RegExp(/movie_id=([0-9]+)/g)

class Results extends React.Component {
    constructor (props) {
        super(props)
        /*
        let find = queryMatcher.exec(window.location.search)
        let movieID = (find === null) 
            ? ("-1")
            : (find[1])
        */
        this.state = {
            movie_id: ""
        }
        
    }

    

    render() {
        return (
            <div>
                 I have no clue what we should be displaying right now
            </div>
        )
    }
}

export {
    Results
}