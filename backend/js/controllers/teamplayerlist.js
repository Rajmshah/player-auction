myApp.controller('TeamPlayerListTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamplayerlist/table");
    $scope.menutitle = NavigationService.makeactive("Team Player List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('TeamPlayerListDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("teamplayerlist/detail");
    $scope.menutitle = NavigationService.makeactive("Team Player List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});