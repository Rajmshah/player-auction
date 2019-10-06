var schema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Teamlist"
  },
  logo: {
    type: String
  },
  banner: {
    type: String
  },
  description: {
    type: String
  },
  purseValue: {
    type: Number
  },
  playerCount: {
    type: Number
  },
  moneySpent: {
    type: Number,
    default: 0
  },
  categoryValues: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: "Categorydetail"
      },
      baseValue: {
        type: Number
      },
      status: {
        type: Boolean
      }
    }
  ],
  minimumBaseValue: {
    type: Number,
    default: 0
  },
  maxBidValue: {
    type: Number,
    default: 0
  }
});

schema.plugin(deepPopulate, {
  populate: {
    team: {
      select: ""
    },
    "categoryValues.player": {
      select: ""
    },
    "categoryValues.player.category": {
      select: ""
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Teamdetail", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(
    schema,
    "team categoryValues.player",
    "team categoryValues.player"
  )
);
var model = {
  allDelete: function(data, callback) {
    var categoryClone = _.cloneDeep(data.team.categoryValues);
    var categoryData = _.cloneDeep(data.category);
    var teamData = _.cloneDeep(data.team);
    var saveTeam = {};
    var saveCategory = {};
    var temp = [];
    var temp1 = [];
    // console.log("data", data);
    // console.log("categoryClone", categoryClone);
    console.log("categoryData soldValue", categoryData.soldValue);
    console.log(
      "categoryData minimumBasePriceValue",
      categoryData.minimumBasePriceValue
    );
    console.log("categoryData _id", categoryData._id);
    console.log("teamData._id", teamData._id);
    console.log("teamData.moneySpent", teamData.moneySpent);
    console.log("teamData.minimumBaseValue", teamData.minimumBaseValue);
    console.log("teamData.maxBidValue", teamData.maxBidValue);
    console.log("teamData.purseValue", teamData.purseValue);

    async.waterfall(
      [
        function(callback) {
          Categorydetail.deleteData(
            {
              _id: categoryData._id
            },
            function(err, deleted) {
              if (err) {
                callback(err, null);
              } else if (_.isEmpty(deleted)) {
                callback(null, []);
              } else if (deleted) {
                saveCategory.playerName = categoryData.playerName;
                saveCategory.playerAge = categoryData.playerAge;
                saveCategory.playerImage = categoryData.playerImage;
                saveCategory.playerVillage = categoryData.playerVillage;
                saveCategory.category = categoryData.category._id;
                saveCategory.baseValue = categoryData.baseValue;
                Categorydetail.saveData(saveCategory, function(
                  err,
                  categoryDetail
                ) {
                  if (err) {
                    callback(err, null);
                  } else {
                    callback(null, categoryDetail);
                  }
                });
              }
            }
          );
        },
        function(secondFunction, callback) {
          //******************OLD CODE********************//
          //   saveTeam.minimumBaseValue = 0;
          //   saveTeam.categoryValues = [];
          //   var i = 0;
          //   _.each(categoryClone, function(vals) {
          //     if (vals.status) {
          //       vals.order = i;
          //       i++;
          //     }
          //   });
          //   var j = i - 1;
          //   _.each(categoryClone, function(val) {
          //     if (val.order == j) {
          //       saveTeam.categoryValues.push({
          //         category: val.category,
          //         baseValue: val.baseValue
          //       });
          //     } else {
          //       saveTeam.categoryValues.push(val);
          //     }
          //   });
          //   _.each(saveTeam.categoryValues, function(n, key) {
          //     saveTeam.minimumBaseValue = saveTeam.minimumBaseValue + n.baseValue;
          //   });
          //******************OLD CODE END********************//
          saveTeam._id = teamData._id;
          saveTeam.moneySpent = teamData.moneySpent - categoryData.soldValue;
          saveTeam.minimumBaseValue =
            teamData.minimumBaseValue + categoryData.minimumBasePriceValue;
          saveTeam.categoryValues = [];
          _.each(categoryClone, function(val) {
            if (val.player) {
              console.log(
                "player",
                val.player._id,
                "categoryData",
                categoryData._id,
                val._id
              );
              if (val.player._id == categoryData._id) {
                console.log("enter if");
                delete val.status;
                delete val.player;
                var baseValue = val.baseValue;
                var id = val._id;
                val = {};
                val.baseValue = baseValue;
                val._id = id;
                saveTeam.categoryValues.push(val);
              } else {
                console.log("enter else");
                saveTeam.categoryValues.push(val);
              }
            } else {
              console.log("enter else 1st");
              saveTeam.categoryValues.push(val);
            }
          });
          saveTeam.maxBidValue =
            teamData.purseValue -
            saveTeam.moneySpent -
            saveTeam.minimumBaseValue;
          console.log("saveTeam", saveTeam);

          Teamdetail.update(
            {
              _id: teamData._id
            },
            saveTeam
          ).exec(function(err, match) {
            console.log("updated", match);
            callback(null, "Updated");
          });
        }
      ],
      function(err, result) {
        callback(null, result);
      }
    );
  }
};
module.exports = _.assign(module.exports, exports, model);
