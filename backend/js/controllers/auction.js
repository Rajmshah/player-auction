myApp.controller("AuctionCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  $state,
  crudService,
  $stateParams,
  toastr
) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("auction");
  $scope.menutitle = NavigationService.makeactive("Auction");
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

  $scope.getTeamDetail = function(teamId) {
    $scope.url = "Teamdetail/getTeamDetail";
    $scope.constraints = {
      id: teamId
    };
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      // console.log("data", data);
      if (data.value == true) {
        if (data.data.length == 0) {
          toastr.info("No team details for selected team.");
        } else {
          $scope.formData.teamDetail = data.data;
        }
      } else {
        toastr.info("Something is Wrong.");
      }
    });
  };
  $scope.getPlayers = function(categoryId) {
    $scope.url = "Categorydetail/getPlayers";
    $scope.constraints = {
      id: categoryId
    };
    NavigationService.apiCall($scope.url, $scope.constraints, function(data) {
      // console.log("data", data);
      if (data.value == true) {
        if (data.data.length == 0) {
          toastr.info("No players for selected category.");
        } else {
          $scope.PlayerList = data.data;
        }
      } else {
        toastr.info("Something is Wrong.");
      }
    });
  };
  // SAVE FUNCTION
  var state = "categorydetails";
  $scope.saveData = function(data) {
    var categoryClone = _.cloneDeep(data.teamDetail.categoryValues);
    var saveTeam = {};
    var saveCategory = {};
    var temp = [];
    var temp1 = [];
    // // console.log("ACTUAL DATA TO SAVE", data);
    // // console.log(data.soldValue);
    // // console.log(data.player.baseValue);
    // // console.log(data.soldValue >= data.player.baseValue);
    if (
      data.soldValue == 0 ||
      (data.soldValue &&
        data.soldValue >= data.player.baseValue &&
        data.soldValue <= data.teamDetail.maxBidValue)
    ) {
      saveCategory.soldValue = data.soldValue;
      saveCategory.isSold = true;
      if (data.remarks) {
        saveCategory.remarks = data.remarks;
      }
      saveCategory.team = data.team;
      saveCategory._id = data.player._id;
      saveTeam._id = data.teamDetail._id;
      saveTeam.minimumBaseValue = 0;
      saveTeam.moneySpent = data.teamDetail.moneySpent + data.soldValue;
      _.each(categoryClone, function(value, key) {
        if (key == 0 && !value.status) {
          value.status = true;
        }
      });
      temp = _.filter(categoryClone, function(val) {
        if (!val.status) {
          return val;
        }
      });
      if (temp.length > 0) {
        _.each(temp, function(value, key) {
          if (key !== 0) {
            temp1.push(value);
          }
        });
        _.each(temp1, function(vals, key) {
          saveTeam.minimumBaseValue =
            saveTeam.minimumBaseValue + vals.baseValue;
        });
        _.each(data.teamDetail.categoryValues, function(value, key) {
          if (value._id == temp[0]._id && !value.status) {
            value.status = true;
            value.player = data.player._id;
            saveCategory.minimumBasePriceValue = value.baseValue;
          }
        });
      } else {
        temp1.push({});
      }
      if (temp1.length > 0) {
        saveTeam.maxBidValue =
          data.teamDetail.purseValue -
          saveTeam.moneySpent -
          saveTeam.minimumBaseValue;
        saveTeam.categoryValues = data.teamDetail.categoryValues;
        if (saveTeam && saveCategory) {
          saveCategory.soldDate = new Date();
          var constraints = {
            saveTeam: saveTeam,
            saveCategory: saveCategory
          };
          $scope.url = "Auction/saveSoldPlayer";
          //   // console.log("constraints", constraints);
          NavigationService.apiCall($scope.url, constraints, function(data) {
            // console.log("data.value", data);
            if (data.value) {
              toastr.success(" Updated Successfully");
              $state.reload();
            }
          });
        } else {
          toastr.error("Invalid Data", "SportList Message");
        }
      }
    } else {
      delete $scope.formData.soldValue;
      toastr.error("Invalid Data");
    }
  };
  // SAVE BUTTON END
  $scope.refresh = function() {
    $state.reload();
  };
});
