myApp.controller('SponsorTableCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sponsor/table");
    $scope.menutitle = NavigationService.makeactive("Sponsor");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
myApp.controller('SponsorDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sponsor/detail");
    $scope.menutitle = NavigationService.makeactive("Sponsor");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});