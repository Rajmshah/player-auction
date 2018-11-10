myApp.controller('LiveStatsCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/livestats.html");
    TemplateService.title = "Live Stats"; // This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    // GET Team 
    $scope.getAllPlayers = function () {
        $scope.url = 'Categorydetail/getAllPlayers';
        $scope.constraints = {};
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            $scope.allPlayers = data.data;
            $scope.team = _.groupBy($scope.allPlayers, 'team.name');
            $scope.teams = []
            // console.log($scope.team);
            _.forEach($scope.team, function (value, key) {
                $scope.teams.push({
                    'name': key,
                    'playerCount': value.length,
                    'teamId': value[0].team._id
                })
            });
            _.each($scope.teams, function (value) {

                var url = 'Teamdetail/getTeamDetail';
                var constraints = {
                    'id': value.teamId
                };
                NavigationService.apiCall(url, constraints, function (data) {
                    if (data.value) {
                        value.logo = data.data.logo;
                        value.bid = data.data.maxBidValue
                    } else {
                        value.logo = '';
                        value.bid = 0;
                    }
                });
            })
            // console.log($scope.teams);
        });
    }
    $scope.getAllPlayers();
    // GET  Team END
});