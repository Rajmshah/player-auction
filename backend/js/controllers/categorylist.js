myApp.controller('CategoryListTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("categorylist/table");
    $scope.menutitle = NavigationService.makeactive("Category List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('CategoryListDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("categorylist/detail");
    $scope.menutitle = NavigationService.makeactive("Category List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});