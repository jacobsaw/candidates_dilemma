app.controller('indexController', ['$scope', 'candidateFactory', 'socketFactory', function($scope, candidateFactory, socketFactory) {
    $scope.candidates = [];

    function getCandidates() {
        candidateFactory.index(function(data) {
            $scope.candidates = data;
        });
    }

    socketFactory.init();
    // getCandidates();
}])
