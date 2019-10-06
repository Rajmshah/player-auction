module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  saveSoldPlayer: function(req, res) {
    if (req.body) {
      console.log("Save Team", req.body.saveTeam);
      console.log("Save Category", req.body.saveCategory);
      async.waterfall(
        [
          function(callback) {
            if (req.body.saveTeam) {
              Teamdetail.findOneAndUpdate(
                {
                  _id: req.body.saveTeam._id
                },
                req.body.saveTeam,
                function(err, data2) {
                  if (err) {
                    callback(err, null);
                  } else {
                    callback(null, data2);
                  }
                }
              );
            }
          },
          function(secondFunction, callback) {
            if (req.body.saveCategory) {
              Categorydetail.findOneAndUpdate(
                {
                  _id: req.body.saveCategory._id
                },
                req.body.saveCategory,
                function(err, data2) {
                  if (err) {
                    callback(err, null);
                  } else {
                    callback(null, data2);
                  }
                }
              );
            }
          }
        ],
        res.callback
      );
    } else {
      res.json({
        data: "File Not Found",
        value: false
      });
    }
  }
};
module.exports = _.assign(module.exports, controller);
