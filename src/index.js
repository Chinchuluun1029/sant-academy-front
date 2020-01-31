import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import UserLayout from 'views/User/User.jsx';
import 'assets/css/nucleo-icons.css';
import 'assets/scss/blk-design-system-react.scss?v=1.0.0';
import 'assets/demo/demo.css';
import axios from 'axios';
import auth from './utils/auth';

import Index from 'views/Common/Index.jsx';

import LandingPage from 'views/Landing/LandingPage.jsx';
import RegisterPage from 'views/Landing/RegisterPage.jsx';
import LoginPage from 'views/Landing/LoginPage.jsx';
import Counselors from 'views/Landing/Counselors.jsx';

import AdminLayout from 'views/Admin/Admin.jsx';
import Verify from './views/User/Verify';

import Chat from './views/User/Chat';
//axios.defaults.baseURL = 'http://localhost:4000/api/v1';

axios.defaults.baseURL = 'http://167.71.223.162:4000/api/v1';
axios.interceptors.request.use(
  function(config) {
    const token = auth.getToken();
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  },
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" render={props => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />
      <Route path="/login-page" render={props => <LoginPage {...props} />} />

      <Route
        path="/counselors"
        render={props => {
          if (auth.loggedIn()) {
            return Number(auth.getId()) === 3 ? (
              <Redirect to="/user/counselors" />
            ) : (
              <Redirect to="/admin/counselors" />
            );
          } else {
            return <Counselors {...props} />;
          }
        }}
      />

      <Route path="/verify" render={props => <Verify id={8} {...props} />} />
      <Route path="/chat/:id" render={props => <Chat {...props} />} />
      <Route path="/user" render={props => <UserLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />

      {Number(auth.getId()) === 1 ? (
        <Redirect from="/profile" to="/admin" />
      ) : (
        <Redirect from="/profile" to="/user" />
      )}

      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
