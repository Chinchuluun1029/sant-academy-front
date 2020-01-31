import axios from 'axios';
import auth from '../utils/auth';

export const getLogin = (username, password) => {
  auth.destroyToken();
  return axios.post('/signin', {userlog: username, password}).then(({data}) => {
    auth.setToken(data.token);
    auth.setId(data.user.role);
    auth.setUser(JSON.stringify(data.user));
    return data;
  });
};

export const getSignup = info => {
  auth.destroyToken();
  return axios.post('/signup', info).then(({data}) => {
   // auth.setToken(data.token);
    return data;
  });
};

export const getUpdateUser = info => {
  return axios.post('/user/update', info).then(({data}) => data);
};

export const getVerify = id => {
  return axios.get(`/verify/${id}`).then(({data}) => {
    return data;
  });
};

export const getAllMentor = id => {
  return axios.get(`/mentor/all`);
};

export const getAllTime = id => {
  return axios.get(`/time/all`);
};

export const addOrder = info => {
  return axios.post('/student/request', info).then(({data}) => {
    return data;
  });
};


export const doPayment = id => {
  return axios.get(`/student/payment/verify/${id}`).then(({data}) => {
    return data;
  });
};

export const doAccept = id => {
  return axios.get(`/student/accept/${id}`).then(({data}) => {
    return data;
  });
};

export const getAllOrder = () => {
  return axios.get(`/order/all`);
};

export const getUsers = id => {
  return axios.get(`/users`);
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
