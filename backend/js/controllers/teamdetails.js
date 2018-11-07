myApp.controller('TeamDetailsTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamdetails/table");
    $scope.menutitle = NavigationService.makeactive("Team Details");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('TeamDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamdetails/detail");
    $scope.menutitle = NavigationService.makeactive("Team Details");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});