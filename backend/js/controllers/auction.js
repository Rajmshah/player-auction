myApp.controller('AuctionCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, crudService) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("auction");
    $scope.menutitle = NavigationService.makeactive("Auction");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})