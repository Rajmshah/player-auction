myApp.controller('HomePageTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("homepage/table");
    $scope.menutitle = NavigationService.makeactive("Home Page");
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
        $scope.url = "Homepage/search";
        $scope.formData.page = $scope.formData.page++;
        NavigationService.apiCall($scope.url, $scope.formData, function (data) {
            console.log("data.value", data);
            $scope.items = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
        });
    }
    $scope.viewTable();
    // VIEW TABLE


    // DELETE
    $scope.crudService = crudService;
    var url = "Homepage/delete";
    $scope.confirmDelete = function (data) {
        crudService.confirmDelete(data, url, $scope);
    }
    // DELETE END
    // CODE END
});
myApp.controller('HomePageDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("homepage/detail");
    $scope.menutitle = NavigationService.makeactive("Home Page");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // VARIABLES
    var url = "Homepage";
    $scope.formData = {};
    // VARIABLES END



    // GALLERY ADD 
    $scope.add = function (formData, type) {
        if (!formData.banner) {
            formData.banner = [];
        }
        if (!formData.media) {
            formData.media = [];
        }
        if (!formData) {
            if (type === 'banner') {
                $scope.formData.banner.push({
                    "image": '',
                    "title": '',
                    "link": '',
                    "linkType": 'internal',
                    "active": true
                })
            } else {
                $scope.formData.media.push({
                    "mediaType": '',
                    "image": '',
                    "title": '',
                    "link": '',
                    "linkType": 'internal',
                    "active": true
                })
            }

        } else {
            if (type === 'banner') {
                formData.banner.push({
                    "image": '',
                    "title": '',
                    "link": '',
                    "linkType": 'internal',
                    "active": true
                })
            } else {
                formData.media.push({
                    "mediaType": '',
                    "image": '',
                    "title": '',
                    "link": '',
                    "linkType": 'internal',
                    "active": true
                })
            }
        }
    }
    // GALLERY  END

    //  DELETE
    $scope.deleteAdded = function (index, type) {
        $scope.formData[type].splice(index, 1);
    }
    //  DELETE END


    // SAVE FUNCTION

    var state = 'homepage'
    $scope.saveData = function (data) {
        crudService.saveData(data, url, state);
    }
    // SAVE BUTTON END
    console.log("$stateParams.id", $stateParams.id);
    if ($stateParams.id) {
        $scope.title = 'Edit';
        var id = $stateParams.id;
        crudService.getOneData(url, id, function (data) {
            if (data) {
                console.log(data, "edit")
                $scope.formData = data;
            }
        });
    }
});