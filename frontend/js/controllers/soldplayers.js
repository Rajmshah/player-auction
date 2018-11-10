myApp.controller('SoldPlayersCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/soldplayers.html");
    TemplateService.title = "Sold Players"; // This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    // GET Team 
    $scope.getAllPlayers = function () {
        $scope.url = 'Categorydetail/getAllPlayers';
        $scope.constraints = {};
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            $scope.allPlayers = data.data;
        });
    }
    $scope.getAllPlayers();
    // GET  Team END
});