app.factory('socketFactory', ['$rootScope', '$window', function($rootScope, $window) {
    var socket;
    var services = {
        init: init,
        on: on,
        emit: emit
    }
    return services;

    function init() {
        $window.socket = io.connect();
    }
    function on(eventName, callback) {
        $window.socket.on(eventname, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                callback.apply($window.socket, args);
            });
        });
    }
    function emit(eventName, data, callback) {
        $window.socket.emit(eventName, data, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                if (callback) {
                    callback.apply($window.socket, args);
                }
            });
        });
    }
}]);
