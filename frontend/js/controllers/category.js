myApp.controller('CategoryCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $stateParams, $state) {
    $scope.template = TemplateService.getHTML("content/category.html");
    TemplateService.title = "Category"; // This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();


    // GET Category 
    $scope.getCategory = function (categoryId) {
        $scope.url = 'Categorylist/getOne';
        $scope.constraints = {
            _id: categoryId
        };
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            if (data.value) {
                $scope.banner = data.data;
            } else {
                $scope.banner = '';
            }
        });
    }

    // GET  Category END

    $scope.getPlayers = function (categoryId) {
        $scope.url = 'Categorydetail/getPlayers';
        $scope.constraints = {
            id: categoryId
        };
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            // console.log('data', data);
            if (data.value == true) {
                if (data.data.length == 0) {
                    toastr.info('No players for selected category.');
                    $scope.playerList = [];
                } else {
                    $scope.playerList = data.data;
                }
            } else {
                toastr.info('Something is Wrong.');
            }
        });
    };
    if ($stateParams.id) {
        $scope.getCategory($stateParams.id);
        $scope.getPlayers($stateParams.id);
    } else {
        toastr.info('No Details Found');
        $state.go('home');
    }
});