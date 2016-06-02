(function() {
    angular.module('userFactory', [])
        .factory('usersFactory', usersFactory)

    usersFactory.$inject = ['$http']

        function usersFactory ($http) {
            var userData = {};
            var usersUrl = '/api/users/';

            userData.all = function () {
                return $http.get(usersUrl)
            }
            userData.single = function (id) {
                return $http.get(usersUrl + id)
            }
            userData.create = function (user) {
                return $http.post(usersUrl, user)
            }
            userData.update = function (user, userInfo) {
                return $http.put(usersUrl + id, userInfo)
            }
            userData.delete = function (id) {
                return $http.delete(userUrl + id)
            }
            return userData;
        }
}());
