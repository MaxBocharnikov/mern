import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} =  useHttp();
    const [form, setForm] = useState({
       email: '',
       password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
    };

    const loginHandler = async () => {
        try {
            const url = '/api/auth/login';
            const data = await request(url, 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch(e) {}
    };

    const registerHandler = async () => {
      try {
          const url = '/api/auth/register';
          const data = await request(url, 'POST', {...form});
          message(data.message);
      } catch(e) {
      }
    };


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make link short</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value = {form.email}
                                    className="validate yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    value = {form.password}
                                    name="password"
                                    className="validate yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            onClick = {loginHandler}
                            style={{marginRight: 10}}
                            disabled = {loading}
                        >
                            Sign In
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick = {registerHandler}
                            disabled = {loading}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};