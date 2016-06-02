angular.module('itinHelper')
    .factory('auth', auth)
    .factory('authToken', authToken)
    .factory('authInterceptor', authInterceptor)


// function for authenticate Interceptor
    function authInterceptor($q, $location, $window) {
        var interceptorFactory = {};

        interceptorFactory.request = function(config) {
             var token = $window.localStorage.getItem('token');
                if (token){
                    config.headers['x-access-token'] = token;
                 }
                    return config;
         };

        interceptorFactory.responseError = function(response) {
               if (response.status == 403) {
                    $window.localStorage.removeItem('token')
                    $location.path('/login');
                }
                    return $q.reject(response);
        };

               return interceptorFactory;

    }
    function authToken($window) {
        var authTokenfactory = {};

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        authTokenFactory.setToken = function (token) {
            if(token) {
                window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.remove.Item('token');
            }
            return authTokenFactory;
        };
    }
    function auth($http, $q, authToken) {
        var authFactory = {};
        authFactory.login = function(username, password) {
            return $http.post('/api/authenticate', {
                username: username,
                password: password
            })
            .success(function(data) {
                authToken.setToken(data.token);
                return data;
            })
        };
        //clearing token on logout
        authFactory.logout = function() {
            authToken.setToken();
        };
        //checking if user is logged in by token check
        authFactory.isLoggedIn = function() {
            if (authToken.getToken()) {
                return true;
            } else {
                return false;
            }
        };
        authFactory.getUser = function() {
            if (authToken.getToken()) {
                return $http.get('/api/me');
            } else {
                return $q.reject({message: "User has no token."})
            }
        };
        return authFactory;
    }
