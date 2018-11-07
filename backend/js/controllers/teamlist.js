myApp.controller('TeamListTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamlist/table");
    $scope.menutitle = NavigationService.makeactive("Team List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('TeamListDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamlist/detail");
    $scope.menutitle = NavigationService.makeactive("Team List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});