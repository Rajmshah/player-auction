myApp.controller('HomePageTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("homepage/table");
    $scope.menutitle = NavigationService.makeactive("Home Page");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('HomePageDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("homepage/detail");
    $scope.menutitle = NavigationService.makeactive("Home Page");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});