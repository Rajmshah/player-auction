myApp.controller("AboutCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  toastr,
  $http
) {
  $scope.template = TemplateService.getHTML("content/about.html");
  TemplateService.title = "About Us"; // This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  $scope.adminurl = adminurl;
});
