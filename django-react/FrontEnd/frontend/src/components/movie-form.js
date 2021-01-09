import React, { Component } from 'react';
import axios from 'axios';

class MovieForm extends Component {
    state = {
        title: '',
        description: '',
        id: '',
    };

    componentDidMount() {
        if (this.props.movieEdit.length === 1) {
            this.props.movieEdit.map((mov) => {
                return this.setState({
                    title: mov.title,
                    description: mov.description,
                    id: mov.id,
                });
            });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitForm = (e) => {
        if (e.target.innerHTML === 'Save') {
            axios
                .post(
                    `http://127.0.0.1:8000/api/movies/`,
                    {
                        title: this.state.title,
                        description: this.state.description,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${this.props.token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    this.props.movieCreate(res.data);
                    this.setState({ title: '', description: '' });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .put(
                    `http://127.0.0.1:8000/api/movies/${this.state.id}/`,
                    {
                        title: this.state.title,
                        description: this.state.description,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${this.props.token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    this.props.movieCreate(res.data);
                    this.props.cancelForm();
                    this.setState({ title: '', description: '' });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    render() {
        let disabled = true;
        if (this.state.title !== '' && this.state.description !== '') {
            disabled = false;
        }
        return (
            <div>
                <span>Title : </span>
                <input
                    value={this.state.title}
                    name="title"
                    className="form-control mt-2"
                    onChange={this.handleChange}
                />
                <span>Description : </span>
                <textarea
                    value={this.state.description}
                    name="description"
                    className="form-control mt-2"
                    onChange={this.handleChange}
                />
                <br />
                <button
                    onClick={this.submitForm}
                    className="btn btn-success"
                    disabled={disabled}
                >
                    {this.props.movieEdit.length === 1 ? 'Update' : 'Save'}
                </button>
                <button
                    onClick={this.props.cancelForm}
                    className="btn btn-danger ml-3"
                >
                    Cancel
                </button>
            </div>
        );
    }
}

export default MovieForm;
