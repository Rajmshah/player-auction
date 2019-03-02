myApp.controller("CategoryDetailsTableCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  $state,
  crudService
) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("categorydetails/table");
  $scope.menutitle = NavigationService.makeactive("Category Details");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // CODE START
  // VAR
  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = "";
  $scope.formData.keyword = "";
  $scope.form = {};

  // SEARCHTABLE
  $scope.searchInTable = function(data) {
    $scope.formData.page = 1;
    if (data.length >= 2) {
      $scope.formData.keyword = data;
      $scope.viewTable();
    } else if (data.length == "") {
      $scope.formData.keyword = data;
      $scope.viewTable();
    }
  };

  // VIEW TABLE
  $scope.viewTable = function() {
    $scope.url = "Categorydetail/search";
    $scope.formData.page = $scope.formData.page++;
    NavigationService.apiCall($scope.url, $scope.formData, function(data) {
      $scope.items = data.data.results;
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });
  };
  $scope.viewTable();
  // VIEW TABLE

  // DELETE
  $scope.crudService = crudService;
  var url = "Categorydetail/delete";
  $scope.confirmDelete = function(data) {
    crudService.confirmDelete(data, url, $scope);
  };
  // DELETE END

  $scope.excelUploaded = function() {
    NavigationService.uploadExcel(
      "Categorydetail/uploadExcel",
      $scope.form,
      function(data) {
        // console.log(data);
        $scope.data = data.data;
        $scope.viewTable();
      }
    );
  };

  $scope.generateExcel = function() {
    $scope.url = "Categorydetail/generateExcel";
    NavigationService.generateCategoryDetailExcel($scope.url, function(data) {
      window.location.href = adminurl + $scope.url;
    });
  };
  // CODE END

  $scope.deleteAll = function() {
    var url = "Categorydetail/deleteAll";
    crudService.confirmAllDelete(url, $scope);
  };
});
myApp.controller("CategoryDetailsCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  $state,
  crudService,
  $stateParams
) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("categorydetails/detail");
  $scope.menutitle = NavigationService.makeactive("Category Details");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // VARIABLES
  var url = "Categorydetail";
  $scope.formData = {};
  // VARIABLES END

  // GET Team
  $scope.getTeam = function() {
    $scope.url = "Teamlist/search";
    $scope.constraints = {};
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      $scope.TeamList = data.data.results;
    });
  };
  $scope.getTeam();
  // GET  Team END

  // GET Category
  $scope.getCategory = function() {
    $scope.url = "Categorylist/search";
    $scope.constraints = {};
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      $scope.CategoryList = data.data.results;
    });
  };
  $scope.getCategory();
  // GET  Category END

  // SAVE FUNCTION
  var state = "categorydetails";
  $scope.saveData = function(data) {
    crudService.saveData(data, url, state);
  };
  // SAVE BUTTON END

  if ($stateParams.id) {
    $scope.title = "Edit";
    var id = $stateParams.id;
    crudService.getOneData(url, id, function(data) {
      if (data) {
        $scope.formData = data;
      }
    });
  }
});
myApp.controller("ViewCategoryDetailsCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  $state,
  crudService,
  $stateParams
) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("categorydetails/view");
  $scope.menutitle = NavigationService.makeactive("Category Details");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // VARIABLES
  var url = "Categorydetail";
  $scope.formData = {};
  // VARIABLES END

  // GET Team
  $scope.getTeam = function() {
    $scope.url = "Teamlist/search";
    $scope.constraints = {};
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      $scope.TeamList = data.data.results;
    });
  };
  $scope.getTeam();
  // GET  Team END

  // GET Category
  $scope.getCategory = function() {
    $scope.url = "Categorylist/search";
    $scope.constraints = {};
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      $scope.CategoryList = data.data.results;
    });
  };
  $scope.getCategory();
  // GET  Category END

  if ($stateParams.id) {
    $scope.title = "View";
    var id = $stateParams.id;
    crudService.getOneData(url, id, function(data) {
      if (data) {
        $scope.formData = data;
      }
    });
  }
});
