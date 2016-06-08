angular.module('itinHelper')
    .controller('calendarC', calendarC);

function calendarC(Storage, $http) {
    var self = this;

    self.showConfig;

    // self.name = "Stevens";

    self.cal = Storage.get('calendar') || [
        {
            breakfast: 'Cafe Mickey',
            morning: 'Epcot',
            lunch: 'Quick Service',
            afternoon: 'Magic Kingdom',
            dinner: 'Ohana',
            evening: 'Fireworks'
        }
    ];


    // adds row object
    self.add = function() {
        self.cal.push({
            breakfast: 'Cafe Mickey',
            morning: 'Epcot',
            lunch: 'Quick Service',
            afternoon: 'Magic Kingdom',
            dinner: 'Ohana',
            evening: 'Fireworks'
        });
    };


    //removes row selected
    self.remove = function (index) {
        self.cal.splice(index, 1);
        self.showConfig = null;
    };

     // pushing keys to store in local storage
    self.addItin = function() {
        Storage.set('calendar', self.cal);
        console.log(self.cal)
        $http.put('/api/itineraries', {itinerary: self.cal})
            .then(function(res){
                console.log(res);
            })
    };
}
