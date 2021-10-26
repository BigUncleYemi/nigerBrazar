import fetch from '../config/FetchInterceptor';

const Services = {};

Services.signUp = function (data) {
  return fetch({
    url: '/auth/register',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};

Services.login = function (data) {
  return fetch({
    url: '/auth/login',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};

Services.getCategories = function (params) {
  return fetch({
    url: '/category',
    method: 'GET',
    params: {},
  });
};

Services.getSubCategories = function (params) {
  return fetch({
    url: `/category/${params}`,
    method: 'GET',
    params: {},
  });
};

Services.facebook = function (data) {
  return fetch({
    url: '/auth/facebook',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};

Services.google = function (data) {
  return fetch({
    url: '/auth/google',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};

Services.resetPassword = function (data) {
  return fetch({
    url: `/user/password-change/${data.id}`,
    method: 'post',
    data: {
      oldPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });
};

Services.getUser = function (id) {
  return fetch({
    url: `/user/${id}`,
    method: 'get',
  });
};

Services.updateProfile = function (data, id) {
  return fetch({
    url: `/user/profile/${id}`,
    method: 'post',
    data: data,
  });
};

Services.postAdvert = function (data, id) {
  return fetch({
    url: '/product',
    method: 'post',
    data: data,
  });
};

Services.getAllUserAds = function (params, id) {
  return fetch({
    url: `/product/user/${id}`,
    method: 'GET',
    params,
  });
};

Services.getAllAds = function (params) {
  //TODO: to use
  return fetch({
    url: '/product',
    method: 'GET',
  });
};

Services.getAdsByCategory = function (params) {
  return fetch({
    url: `/product/category/${params}`,
    method: 'GET',
    params: {
      status: 'approved',
    },
  });
};

Services.getAdsBySubCategory = function (params) {
  return fetch({
    url: `/product/sub_category/${params}`,
    method: 'GET',
    params: {
      status: 'approved',
    },
  });
};

Services.getAllUserFeedBack = function (params) {
  return fetch({
    url: '/feedback/user',
    method: 'GET',
    params,
  });
};

Services.getAllAdFeedBacks = function (params) {
  return fetch({
    url: `/feedback/advert/${params}`,
    method: 'GET',
  });
};

Services.postUserFeedbackReply = function (data, id) {
  return fetch({
    url: `/feedback/reply/${id}`,
    method: 'post',
    data: data,
  });
};

Services.postUserFeedback = function (data, id) {
  return fetch({
    url: `/feedback/advert/${id}`,
    method: 'post',
    data: data,
  });
};

export default Services;
