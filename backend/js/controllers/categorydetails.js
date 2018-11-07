myApp.controller('CategoryDetailsTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("categorydetails/table");
    $scope.menutitle = NavigationService.makeactive("Category Details");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('CategoryDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("categorydetails/detail");
    $scope.menutitle = NavigationService.makeactive("Category Details");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});