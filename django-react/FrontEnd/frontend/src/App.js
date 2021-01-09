import React, { Component } from 'react';
import axios from 'axios';
import Movie from './components/movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import MovieDetail from './components/movie-detail';
import './App.css';
import MovieForm from './components/movie-form';
import { withCookies } from 'react-cookie';

class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        form: false,
        movieEdit: null,
        token: this.props.cookies.get('token'),
    };

    componentDidMount() {
        if (this.state.token) {
            axios
                .get('http://127.0.0.1:8000/api/movies/', {
                    headers: {
                        Authorization: `Token ${this.state.token}`,
                    },
                })
                .then((res) => {
                    this.setState({ movies: res.data });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            window.location.href = '/';
        }
    }

    movies_Update_after_rate = (movie) => {
        this.setState((prevstate) => ({
            movies: prevstate.movies.map((mov) =>
                mov.id === movie.id ? movie : mov
            ),
        }));
    };

    movieDelete = (movieId) => {
        const movies = this.state.movies.filter(
            (movie) => movie.id !== movieId
        );
        this.setState({ movies, selectedMovie: null });
    };

    movieClick = (movie) => {
        this.setState({ form: false, selectedMovie: [movie] });
    };

    movieForm = (id = null) => {
        this.setState({ form: true });
        const movieEdit = this.state.movies.filter((movie) => movie.id === id);
        console.log(movieEdit);
        this.setState({ movieEdit });
    };

    cancelForm = () => {
        this.setState({ form: false });
    };

    movieCreate = (movie) => {
        let id = [];
        this.state.movies.map((movie) => {
            return id.push(movie.id);
        });

        if (id.includes(movie.id)) {
            this.setState((prevstate) => ({
                movies: prevstate.movies.map((mov) =>
                    mov.id === movie.id ? movie : mov
                ),
            }));
            this.setState({
                selectedMovie: this.state.movies.filter((mov) => {
                    return mov.id === movie.id;
                }),
            });
        } else {
            this.setState((prevState) => {
                return {
                    movies: [...prevState.movies, movie],
                };
            });
        }
    };

    handleLogout = () => {
        this.props.cookies.remove('token');
        window.location.href = '/';
        localStorage.removeItem('username')
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className='col-3'>
                        <span> Hello {localStorage.getItem('username')} !</span>
                        <button
                            className="btn btn-info logout ml-2"
                            onClick={this.handleLogout}
                        >
                            Log Out...
                        </button>
                    </div>
                    <h1>
                        <i
                            className="fa fa-film mr-3 text-info"
                            style={{ transform: 'rotate(20deg)' }}
                            aria-hidden="true"
                        ></i>
                        Movies :
                    </h1>
                    <div className="mt-5 row w-50">
                        <div className="col-md-6">
                            <Movie
                                movieClick={this.movieClick}
                                movies={this.state.movies}
                                movieDelete={this.movieDelete}
                                movieForm={this.movieForm}
                                token={this.state.token}
                            />
                            <button
                                onClick={this.movieForm}
                                className="btn btn-info"
                            >
                                Add Movie
                            </button>
                        </div>
                        <div className="col-md-6">
                            {this.state.form ? (
                                <MovieForm
                                    movieEdit={this.state.movieEdit}
                                    cancelForm={this.cancelForm}
                                    movieCreate={this.movieCreate}
                                    token={this.state.token}
                                />
                            ) : (
                                <MovieDetail
                                    movies_Update_after_rate={
                                        this.movies_Update_after_rate
                                    }
                                    movie={this.state.selectedMovie}
                                    updateMoviesRate={this.movieClick}
                                    token={this.state.token}
                                />
                            )}
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withCookies(App);
