angular.module('itinHelper')
    .controller('calendarC', calendarC);
    
function calendarC(Storage) {
    var self = this;
    
    self.showConfig;
    
    self.name = "Stevens";
    
    self.cal = Storage.get('calendar') || [
        {
            breakfast: 'Cafe Mickey',
            lunch: 'Momma Melrose',
            dinner: 'Tepan edo'
        },
        {
            breakfast: 'Cafe Mickey2',
            lunch: 'Momma Melrose2',
            dinner: 'Tepan edo2'
        },
        {
            breakfast: 'Cafe Mickey3',
            lunch: 'Momma Melrose3',
            dinner: 'Tepan edo3'
        }    
    ];
    
    self.add = function () {
        self.cal.push({
            <div class="week">
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
            </div>
        })
    }
    
    
    // adds row object
    self.add = function() {
        self.cal.push({
            breakfast: 'Hello',
            lunch: 'world',
            dinner: 'dinner'
        });
    };
    
    // pushing keys to store in local storage
    self.email = function() {
        Storage.set('calendar', self.cal);
    };
    
}