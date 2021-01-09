import React, { Component } from 'react';
import axios from 'axios';

class MovieDetail extends Component {
    state = {
        rate: -1,
    };

    rateClick = (star, id, movie) => {
        const movieId = id;
        const starnum = star + 1;
        axios
            .post(
                `http://127.0.0.1:8000/api/movies/${movieId}/rate_movie/`,
                {
                    stars: starnum,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${this.props.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                this.getMovieDetail(movieId);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    getMovieDetail = (movieId) => {
        axios
            .get(`http://127.0.0.1:8000/api/movies/${movieId}`, {
                headers: {
                    Authorization: `Token ${this.props.token}`,
                },
            })
            .then((res) => {
                this.props.movies_Update_after_rate(res.data);
                this.props.updateMoviesRate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    starEnterClick = (i) => {
        this.setState({ check: true, rate: i });
    };

    starLeaveClick = () => {
        this.setState({ rate: -1 });
    };

    render() {
        return (
            <div>
                {this.props.movie
                    ? this.props.movie.map((mo) => {
                          return (
                              <div key={mo.id}>
                                  <i
                                      className={
                                          mo.avg_rating > 0
                                              ? 'fa fa-star text-warning'
                                              : 'fa fa-star text-white'
                                      }
                                      aria-hidden="true"
                                  ></i>
                                  <i
                                      className={
                                          mo.avg_rating > 1
                                              ? 'fa fa-star text-warning'
                                              : 'fa fa-star text-white'
                                      }
                                      aria-hidden="true"
                                  ></i>
                                  <i
                                      className={
                                          mo.avg_rating > 2
                                              ? 'fa fa-star text-warning'
                                              : 'fa fa-star text-white'
                                      }
                                      aria-hidden="true"
                                  ></i>
                                  <i
                                      className={
                                          mo.avg_rating > 3
                                              ? 'fa fa-star text-warning'
                                              : 'fa fa-star text-white'
                                      }
                                      aria-hidden="true"
                                  ></i>
                                  <i
                                      className={
                                          mo.avg_rating > 4
                                              ? 'fa fa-star text-warning'
                                              : 'fa fa-star text-white'
                                      }
                                      aria-hidden="true"
                                  ></i>
                                  <i className="pl-2">
                                      ({mo.number_of_rating})
                                  </i>
                                  <h3 className="mt-3">{mo.title}</h3>
                                  <p>{mo.description}</p>
                                  <h3>Rate It ..!!</h3>
                                  {[1, 2, 3, 4, 5].map((star, index) => {
                                      return (
                                          <i
                                              key={index}
                                              style={{ cursor: 'pointer' }}
                                              onClick={() =>
                                                  this.rateClick(
                                                      index,
                                                      mo.id,
                                                      mo
                                                  )
                                              }
                                              onMouseEnter={() =>
                                                  this.starEnterClick(index)
                                              }
                                              onMouseLeave={this.starLeaveClick}
                                              className={
                                                  index < this.state.rate + 1
                                                      ? 'fa fa-star text-warning pl-1'
                                                      : 'fa fa-star text-white pl-1'
                                              }
                                              aria-hidden="true"
                                          ></i>
                                      );
                                  })}
                              </div>
                          );
                      })
                    : null}
            </div>
        );
    }
}

export default MovieDetail;
