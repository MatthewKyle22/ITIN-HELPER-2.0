angular.module('itinHelper')
    .controller('itinControl', itinControl)

    function itinControl($http) {
        var self = this;
        $http.get('api/itineraries')
            .then(function(res){
                console.log('check',res);
                self.itineraries = res.data;
            })
    }
