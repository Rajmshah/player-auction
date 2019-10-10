myApp.controller("LiveStatsCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  toastr,
  $http,
  $uibModal
) {
  $scope.template = TemplateService.getHTML("content/livestats.html");
  TemplateService.title = "Live Stats"; // This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  $scope.showList = false;

  $scope.show = function(type) {
    if (type == "grid") {
      $scope.showList = false;
    } else {
      $scope.showList = true;
    }
  };

  // GET Team
  $scope.getAllPlayers = function() {
    $scope.url = "Teamlist/getList";
    $scope.constraints = {};
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      $scope.team = data.data;
      // $scope.team = _.groupBy($scope.allPlayers, 'team.name');
      $scope.teams = [];
      // // console.log($scope.team);
      _.forEach($scope.team, function(value) {
        $scope.teams.push({
          name: value.name,
          teamId: value._id
        });
      });
      _.each($scope.teams, function(value) {
        var url = "Teamdetail/getTeamDetail";
        var constraints = {
          id: value.teamId
        };
        NavigationService.apiCall(url, constraints, function(data) {
          if (data.value) {
            value.logo = data.data.logo;
            value.bid = data.data.moneySpent;
//             value.bid = data.data.maxBidValue;
            value.categoryValues = data.data.categoryValues;
          } else {
            value.logo = "";
            value.bid = 0;
            value.categoryValues = [];
          }
        });
      });
      _.each($scope.teams, function(value) {
        var url = "Categorydetail/getTeamPlayers";
        var constraints = {
          id: value.teamId
        };
        NavigationService.apiCall(url, constraints, function(data) {
          // console.log(data);
          if (data.value) {
            value.playerCount = data.data.length;
          } else {
            value.playerCount = 0;
          }
        });
      });
      // console.log($scope.teams);
    });
  };
  $scope.getAllPlayers();
  // GET  Team END
  $scope.openPlayerList = function(players, teamName) {
    console.log(players, teamName);
    $scope.players = players;
    $scope.teamName = teamName;
    $uibModal.open({
      animation: true,
      scope: $scope,
      templateUrl: "views/modal/playerList.html",
      size: "lg",
      windowClass: ""
    });
  };
});
