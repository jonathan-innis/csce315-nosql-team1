import React from 'react';

class CrewCard extends React.PureComponent {
    render() {
        return (
            <div className="card">
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} onError={(e)=>e.target.src="/unisex_silhouette.png"} width={138} height={175} alt=""/>
                </div>
                <a href={"/present/person?person_id=" + this.props.id}>
                    {this.props.name}
                </a>
                <span>
                    {this.props.department} : {this.props.job}
                </span>
            </div>
        )
    }
}

class CastCard extends React.PureComponent { 
    render() {
        return (
            <div className="card">
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} onError={(e)=>e.target.src="/unisex_silhouette.png"} width={138} height={175} alt=""/>
                </div>
                <a href={"/present/person?person_id=" + this.props.id}>
                    {this.props.name}
                </a>
                <span>
                    {this.props.role}
                </span>
            </div>
        )
    }
}

class ResultCard extends React.PureComponent {
    render() {
        let name;
        let img;
        if(this.props.person){
            name = (
                <a href={"/present/person?person_id=" + this.props.id}>
                    {this.props.name}
                </a>
            )
            img = (
                <div>
                    <img src={"https://image.tmdb.org/t/p/w138_and_h175_face" + this.props.imglink} onError={(e)=>e.target.src="/unisex_silhouette.png"} width={150} height={225} alt=""/>
                </div>
            )
        }

        else {
            name = (
                <a href={"/present/movie?movie_id=" + this.props.id}>
                    {this.props.name}
                </a>
            )

            img = (
                <div>
                    <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.props.imglink} width={150} height={225} alt=""/>
                </div>
            )
        }


        return (
            <div className="card">
                {name}
                {img}
            </div>
        )
    }
}

export {
    CrewCard,
    CastCard,
    ResultCard
}