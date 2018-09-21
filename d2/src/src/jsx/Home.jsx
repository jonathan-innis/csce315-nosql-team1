import React from 'react'

import '../css/master.css'


class Home extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div>
                <div className="homebox">
                    <div className="title">
                        <h2> Search your favorite movies and cast members!</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    Home
}
