app.controller('resultController', ['$scope', 'candidateFactory', function($scope, candidateFactory) {
    $scope.candidates = [];

    function getCandidates() {
        candidateFactory.index(function(data) {
            $scope.candidates = data;
        });
    }
    // getCandidates();
}])
