myApp.controller("TeamCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  toastr,
  $http,
  $state,
  $stateParams
) {
  $scope.template = TemplateService.getHTML("content/team.html");
  TemplateService.title = "Team"; // This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  $scope.showStats = true;
  $scope.showSquad = false;

  $scope.changeSection = function(type) {
    if (type == "Squad") {
      $scope.showStats = false;
      $scope.showSquad = true;
      $(window).scrollTop(0);
    } else {
      $scope.showStats = true;
      $scope.showSquad = false;
      $(window).scrollTop(0);
    }
  };

  $scope.getTeamDetail = function(teamId) {
    $scope.url = "Teamdetail/getTeamDetail";
    $scope.constraints = {
      id: teamId
    };
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      // // console.log('data', data);
      if (data.value == true) {
        if (data.data.length == 0) {
          toastr.info("No team details for selected team.");
          $scope.teamDetail = {};
          $state.go("home");
        } else {
          $scope.teamDetail = data.data;
          $scope.banner = {
            banner: data.data.banner
          };
        }
      } else {
        toastr.info("Something is Wrong.");
        $state.go("home");
      }
    });
  };

  $scope.getPlayersTeamWise = function(team) {
    $scope.url = "Categorydetail/getPlayersTeamWise";
    $scope.constraints = {
      teamId: team
    };
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      // // console.log('data', data);
      if (data.value == true) {
        if (data.data.length == 0) {
          toastr.info("No team details for selected team.");
          $scope.playerDetail = {};
          $state.go("home");
        } else {
          $scope.playerDetail = data.data;
        }
      } else {
        toastr.info("Something is Wrong.");
        $state.go("home");
      }
    });
  };

  $scope.showTable = function(formData) {
    if (formData) {
      $scope.url = "Categorydetail/getTeamPlayers";
      var constraints = {};
      constraints.id = formData;
      NavigationService.apiCall($scope.url, constraints, function(data) {
        if (data.value) {
          $scope.playerList = data.data;
          // // console.log('playerlist', $scope.playerList);
        } else {
          $scope.playerList = [];
        }
      });
    }
  };

  if ($stateParams.id) {
    $scope.showTable($stateParams.id);
    $scope.getTeamDetail($stateParams.id);
    $scope.getPlayersTeamWise($stateParams.id);
    $scope.teamId = $stateParams.id;
  } else {
    toastr.info("No Details Found");
    $state.go("home");
  }
});
