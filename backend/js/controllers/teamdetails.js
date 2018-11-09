myApp.controller('TeamDetailsTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamdetails/table");
    $scope.menutitle = NavigationService.makeactive("Team Details");
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
        $scope.url = "Teamdetail/search";
        $scope.formData.page = $scope.formData.page++;
        NavigationService.apiCall($scope.url, $scope.formData, function (data) {
            $scope.items = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
        });
    }
    $scope.viewTable();
    // VIEW TABLE


    // DELETE
    $scope.crudService = crudService;
    var url = "Teamdetail/delete";
    $scope.confirmDelete = function (data) {
        crudService.confirmDelete(data, url, $scope);
    }
    // DELETE END
    // CODE END
});
myApp.controller('TeamDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamdetails/detail");
    $scope.menutitle = NavigationService.makeactive("Team Details");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // VARIABLES
    var url = "Teamdetail";
    $scope.formData = {};
    // VARIABLES END

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

    // GET Category 
    $scope.getCategory = function () {
        $scope.url = 'Categorylist/search';
        $scope.constraints = {};
        NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
            $scope.CategoryList = data.data.results;
        });
    }
    $scope.getCategory();
    // GET  Category END

    //Base Value
    $scope.add = function (formData) {
        $scope.formData.categoryValues = [{
            category: '',
            baseValue: ''
        }];
        for (var i = 1; i < formData; i++) {
            $scope.formData.categoryValues.push({
                category: '',
                baseValue: ''
            })
        }
    }
    //Base Value End

    // SAVE FUNCTION
    var state = 'teamdetails'
    $scope.saveData = function (data) {
        if (data.moneySpent == 0 || !data.moneySpent) {
            data.minimumBaseValue = 0;
            _.each(data.categoryValues, function (n) {
                data.minimumBaseValue = n.baseValue + data.minimumBaseValue;
            })
        }
        data.maxBidValue = data.purseValue - data.moneySpent - data.minimumBaseValue;
        crudService.saveData(data, url, state);
    }
    // SAVE BUTTON END

    if ($stateParams.id) {
        $scope.title = 'Edit';
        var id = $stateParams.id;
        crudService.getOneData(url, id, function (data) {
            if (data) {
                $scope.formData = data;
            }
        });
    }
});