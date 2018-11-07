myApp.controller('MinimumBaseValueTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("minimumbasevalue/table");
    $scope.menutitle = NavigationService.makeactive("Minimum Base Value");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('MinimumBaseValueDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("minimumbasevalue/detail");
    $scope.menutitle = NavigationService.makeactive("Minimum Base Value");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});