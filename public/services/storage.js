angular.module('itinHelper')
    .factory('Storage', Storage);

function Storage($window) {
    var self = this;

    self.get = function(key) {
        var temp = $window.localStorage.getItem(key);
        if (!temp) return temp;
        var item = JSON.parse(temp);
        return item.value;
    };
    
    self.set = function(key, value) {
        var item = {
            value: value
        };
    
        return $window.localStorage.setItem(key, JSON.stringify(item));     
    };
    
    self.delete = function(key) {
        return $window.localStorage.deleteItem(key);     
    };
    
    return self;
}