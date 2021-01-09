import React, { Component } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { ctxConsumer } from '../index';

class Login extends Component {
    state = {
        isCheckPage: false,
        mouseEnter: false,
        auth: {
            username: '',
            password: '',
            re_password: '',
            email: '',
        },
        reg_errorMessage: '',
        log_errorMessage: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        if (e.target.innerHTML === 'Login') {
            if (this.state.username && this.state.password ) {
                axios
                    .post(
                        `http://127.0.0.1:8000/auth/`,
                        {
                            username: this.state.username,
                            password: this.state.password,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    .then((res) => {
                        this.props.cookies.set('token', res.data.token);
                        window.location.href = '/movies';
                        localStorage.setItem('username', this.state.username);
                        this.setState({ username: '', password: '' });
                    })
                    .catch((err) => {
                        if (
                            err.message ===
                            'Request failed with status code 400'
                        ) {
                            this.setState({
                                log_errorMessage:
                                    'Username or Password is Wrong',
                            });
                        }
                    });
            } else {
                this.setState({
                    log_errorMessage: 'Fill in all the items',
                });
            }
        } else {
            if (
                this.state.username &&
                this.state.password &&
                this.state.re_password &&
                this.state.email
            ) {
                if (this.state.password === this.state.re_password) {
                    axios
                        .post(
                            `http://127.0.0.1:8000/api/users/`,
                            {
                                username: this.state.username,
                                password: this.state.password,
                                email: this.state.email,
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                        .then((res) => {
                            console.log(res);
                            window.location.href = '/';
                            this.setState({
                                username: '',
                                password: '',
                                email: '',
                            });
                        })
                        .catch((err) => {
                            console.log(JSON.stringify(err));
                            if (
                                err.message ===
                                'Request failed with status code 400'
                            ) {
                                this.setState({
                                    reg_errorMessage: 'Username is exist',
                                });
                            }
                        });
                } else {
                    this.setState({
                        reg_errorMessage: 'password does not match',
                    });
                }
            } else {
                this.setState({
                    reg_errorMessage: 'Fill in all the items',
                });
            }
        }
    };

    TogglePage = () => {
        this.setState({
            reg_errorMessage: '',
            log_errorMessage: '',
            username:'',
            password:'',
            re_password:'',
            email:'',
            isCheckPage: !this.state.isCheckPage,
        });
    };

    mouseEnter = () => {
        this.setState({ mouseEnter: !this.state.mouseEnter });
    };

    render() {
        return (
            <div
                className="w-50 mt-5 mr-auto ml-auto bg-light p-4"
                style={{ border: '1px solid green' }}
            >
                <div className="w-50 mr-auto ml-auto">
                    <h1 className="text-center text-warning">
                        {this.state.isCheckPage ? 'Register' : 'Login'}
                    </h1>
                    <span className="font-weight-bold">Username : </span>
                    <br />
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                    <br />
                    <span className="font-weight-bold">Password : </span>
                    <br />
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                    <br />
                    {this.state.log_errorMessage ? (
                        <React.Fragment>
                            <span className="alert alert-danger">
                                {this.state.log_errorMessage}
                            </span>
                            <br />
                            <br />
                        </React.Fragment>
                    ) : null}
                    {this.state.isCheckPage ? (
                        <React.Fragment>
                            <span className="font-weight-bold">
                                Confirm Password :{' '}
                            </span>
                            <br />
                            <input
                                name="re_password"
                                type="password"
                                value={this.state.re_password}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                            <br />
                            <span className="font-weight-bold">Email : </span>
                            <br />
                            <input
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                            <br />
                            {this.state.reg_errorMessage ? (
                                <React.Fragment>
                                    <span className="alert alert-danger">
                                        {this.state.reg_errorMessage}
                                    </span>
                                    <br />
                                    <br />
                                </React.Fragment>
                            ) : null}
                        </React.Fragment>
                    ) : null}
                    <button
                        className="btn btn-success"
                        onClick={this.handleSubmit}
                    >
                        {this.state.isCheckPage ? 'Register' : 'Login'}
                    </button>
                    <br />
                    <br />
                    <span
                        onClick={this.TogglePage}
                        style={{ cursor: 'pointer' }}
                        className={this.state.mouseEnter ? 'text-warning' : ''}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseEnter}
                    >
                        {this.state.isCheckPage
                            ? 'Go to Login'
                            : 'Please Register'}
                    </span>
                </div>
            </div>
        );
    }
}

export default withCookies(Login);
