import React, {Component} from 'react';
import axios from 'axios'




class Movie extends Component {
    state = {  }

    movieClick = (m) => {
        this.props.movieClick(m);
    }

    handleDelete = (movieId) => {
        axios
            .delete(`http://127.0.0.1:8000/api/movies/${movieId}`, {
                headers: {
                    Authorization:
                    `Token ${this.props.token}`,
                },
            })
            .then((res) => {
                console.log(res)
                this.props.movieDelete(movieId)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleUpdate = (movieId) => {
        this.props.movieForm(movieId)
    }

    render() { 
        return (
            <div>
                {this.props.movies.map((movie, index) => {
                    return (
                        <div key={movie.id}>
                            <h5
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.movieClick(movie)}
                            >
                                <i className="fa fa-check mr-3 text-success" aria-hidden="true"></i>
                                {movie.title}
                            </h5>
                            <i style={{cursor:'pointer'}} onClick={() => this.handleDelete(movie.id)} className="fa fa-trash text-danger" aria-hidden="true"></i>
                            <i style={{cursor:'pointer'}} onClick={() => this.handleUpdate(movie.id)} className="fa fa-pencil-square-o ml-4" aria-hidden="true"></i>
                            <br />
                            <br/>
                        </div>
                    );
                })}
            </div>
        );
    }
}
 
export default Movie;
