myApp.controller('TeamPlayerListTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService, toastr, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamplayerlist/table");
    $scope.menutitle = NavigationService.makeactive("Team Player List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // VARIABLES
    var url = "Categorydetail";
    $scope.formData = {};
    $scope.teamDetail = {};
    // VARIABLES END

    // GET Team 
    $scope.getAllPlayers = function () {
        $scope.url = 'Categorydetail/getAllPlayers';
        $scope.constraints = {};
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            $scope.allPlayers = data.data;
            $scope.team = _.groupBy($scope.allPlayers, 'team.name');
            $scope.items = []
            _.forEach($scope.team, function (value, key) {
                $scope.items.push({
                    'name': key,
                    'playerCount': value.length,
                    'teamId': value[0].team._id
                })
            });
            console.log($scope.items);
        });
    }
    $scope.getAllPlayers();
    // GET  Team END

    // GET Team 
    $scope.getTeam = function () {
        $scope.url = 'Teamlist/search';
        $scope.constraints = {};
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            $scope.TeamList = data.data.results;
        });
    }
    $scope.getTeam();
    // GET  Team END

    // VIEW TABLE
    $scope.showTable = function (formData) {
        if (formData) {
            $scope.url = "Categorydetail/getTeamPlayers";
            var constraints = {}
            constraints.id = formData;
            NavigationService.apiCall($scope.url, constraints, function (data) {
                $scope.playerList = data.data;
                modalInstances = $uibModal.open({
                    animation: true,
                    scope: $scope,
                    keyboard: false,
                    templateUrl: 'views/modal/playerlist.html',
                    size: 'lg',
                    windowClass: ''
                })
            });
        } else {
            toastr.info('No teams with players');
        }
    }
    // VIEW TABLE

    $scope.getTeamDetail = function (teamId) {
        $scope.url = 'Teamdetail/getTeamDetail';
        $scope.constraints = {
            id: teamId
        };
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            console.log('data', data);
            if (data.value == true) {
                if (data.data.length == 0) {
                    toastr.info('No team details for selected team.');
                } else {
                    $scope.teamDetail = data.data;
                }
            } else {
                toastr.info('Something is Wrong.');
            }
        });
    };

    // DELETE

    // $scope.confirmDelete = function (category) {
    //     $scope.url = 'Teamdetail/allDelete';
    //     $scope.constraints = {
    //         category: category,
    //         team: $scope.teamDetail
    //     };
    //     NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
    //         // console.log('data', data);
    //         toastr.info('Deleted Successfully.');
    //         $state.reload();
    //     });
    // }


    $scope.confirmDelete = function (category) {
        $scope.category = category;
        modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'views/modal/playerdelete.html',
            size: 'sm',
            windowClass: ''
        })
    }

    // CLICK YES ON MODAL
    $scope.confirmYes = function (category) {
        $scope.url = 'Teamdetail/allDelete';
        $scope.constraints = {
            category: category,
            team: $scope.teamDetail
        };
        console.log('hello');
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            // console.log('data', data);
            modalInstance.close();
            toastr.info('Deleted Successfully.');
            $state.reload();
        });
    }


    // CLICK NO ON MODAL
    $scope.confirmNo = function () {
        console.log("no click")
        modalInstance.close();
    }
    // CLICK NO ON MODAL
    $scope.noShow = function () {
        console.log("no click")
        modalInstances.close();
    }
    // DELETE END
});