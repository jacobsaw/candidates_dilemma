app.factory('candidateFactory', ['$http', function($http) {
    function CandidatesFactory() {
        var candidates = [];

        this.index = function(callback) {
            $http.get('/candidates').then(function(result) {
                console.log("INDEX results:", result);
                candidates = result.data;
                callback(candidates)
            });
        }
    }
    return new CandidatesFactory();
}])
