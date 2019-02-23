var schema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categorylist"
  },
  baseValue: {
    type: Number
  },
  playerName: {
    type: String
  },
  playerAge: {
    type: Number
  },
  playerImage: {
    type: String
  },
  playerVillage: {
    type: String
  },
  isSold: {
    type: Boolean,
    default: false
  },
  soldValue: {
    type: Number
  },
  minimumBasePriceValue: {
    type: Number
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Teamlist"
  },
  remarks: {
    type: String
  }
});

schema.plugin(deepPopulate, {
  populate: {
    team: {
      select: ""
    },
    category: {
      select: ""
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Categorydetail", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "team category", "team category")
);
var model = {
  uploadExcel: function(importData, callback) {
    var errorFound = false;
    async.waterfall(
      [
        function(callback) {
          async.concatSeries(
            importData,
            function(singleData, callback) {
              Categorylist.findOne({
                name: singleData.Category
              }).exec(function(err, list) {
                if (err) {
                  callback(err, null);
                } else {
                  if (_.isEmpty(list)) {
                    callback(null, []);
                  } else {
                    singleData.category = list._id;
                    callback(null, singleData);
                  }
                }
              });
            },
            callback
          );
        },
        function(saveInfo, callback) {
          async.concatSeries(
            saveInfo,
            function(singleData, callback) {
              // console.log("SAVINGs", singleData);
              var obj = {};
              obj.playerName = singleData.Name;
              obj.playerAge = singleData.Age;
              obj.playerImage = singleData.Image;
              obj.playerVillage = singleData.Village;
              obj.category = singleData.category;
              obj.baseValue = singleData["Base Price"];
              Categorydetail.saveData(obj, function(err, data) {
                if (err) {
                  errorFound = true;
                  callback(null, {
                    error: true,
                    data: err
                  });
                } else {
                  callback(null, {
                    error: false,
                    data: data
                  });
                }
              });
            },
            function(err, result) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, result);
                if (errorFound) {
                  async.each(
                    result,
                    function(singleData, callback) {
                      if (!singleData.error && singleData.data._id) {
                        Categorydetail.deleteData(
                          {
                            _id: singleData.data._id
                          },
                          function(err, deleted) {
                            callback(null);
                          }
                        );
                      } else {
                        callback(null);
                      }
                    },
                    function(err) {
                      if (err) {
                      } else {
                        // console.log("Successfully Deleted");
                      }
                    }
                  );
                }
              }
            }
          );
        }
      ],
      function(err, finalResult) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, finalResult);
        }
      }
    );
  },

  generateExcel: function(data, res) {
    var arrJsonExcel = [];
    var obj = {};
    name = "samplecategorydetail";
    obj.Name = "Raj Shah";
    obj.Age = 26;
    obj.Image =
      "https://storage.googleapis.com/auction-player/d8e7cc68-bcbb-4118-a5c1-8353dc44601f.jpg";
    obj.Village = "Kutch";
    obj.Category = "Ghi";
    obj["Base Price"] = 20000;
    // obj.isSold = 'yes'
    // obj.team = 'Abc'
    // obj.soldValue = 30000
    // obj.remarks = 'Hello Moto'
    arrJsonExcel.push(obj);
    Config.generateExcel(name, arrJsonExcel, res);
  },

  search: function(data, callback) {
    var Model = this;
    var Const = this(data);
    var maxRow = Config.maxRow;

    var page = 1;
    if (data.page) {
      page = data.page;
    }
    var field = data.field;
    var deepSearch = "team category";
    var options = {
      field: data.field,
      filters: {
        keyword: {
          fields: ["name", "playerName", "playerVillage"],
          term: data.keyword
        }
      },
      sort: {
        asc: "name"
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };

    var Search = Model.find(data.filter)
      .order(options)
      .deepPopulate(deepSearch)
      .keyword(options)
      .page(options, callback);
  }
};
module.exports = _.assign(module.exports, exports, model);
