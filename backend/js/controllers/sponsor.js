myApp.controller('SponsorTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sponsor/table");
    $scope.menutitle = NavigationService.makeactive("Sponsor");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // CODE START
    // VAR
    $scope.formData = {};
    $scope.formData.page = 1;
    $scope.formData.type = '';
    $scope.formData.keyword = '';

    // SEARCHTABLE
    $scope.searchInTable = function (data) {
        $scope.formData.page = 1;
        if (data.length >= 2) {
            $scope.formData.keyword = data;
            $scope.viewTable();
        } else if (data.length == '') {
            $scope.formData.keyword = data;
            $scope.viewTable();
        }
    }

    // VIEW TABLE
    $scope.viewTable = function () {
        $scope.url = "Sponsor/search";
        $scope.formData.page = $scope.formData.page++;
        NavigationService.apiCall($scope.url, $scope.formData, function (data) {
            // console.log("data.value", data);
            $scope.items = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
        });
    }
    $scope.viewTable();
    // VIEW TABLE


    // DELETE
    $scope.crudService = crudService;
    var url = "Sponsor/delete";
    $scope.confirmDelete = function (data) {
        crudService.confirmDelete(data, url, $scope);
    }
    // DELETE END
    // CODE END
});
myApp.controller('SponsorDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sponsor/detail");
    $scope.menutitle = NavigationService.makeactive("Sponsor");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // CODE START
    // URL
    var url = 'Sponsor';
    // VARIABLES
    $scope.title = 'Create';
    $scope.formData = {};
    $scope.formData.active = true;

    // GET ONE
    if ($stateParams.id) {
        $scope.title = 'Edit';
        var id = $stateParams.id;
        crudService.getOneData(url, id, function (data) {
            if (data) {
                $scope.formData = data;
            }
        })
    }
    // GET ONE END


    // SAVE FUNCTION
    var state = 'sponsor'
    $scope.saveData = function (data) {
        crudService.saveData(data, url, state);
    }
    // SAVE FUNCTION END
});