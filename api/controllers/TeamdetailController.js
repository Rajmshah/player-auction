module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getTeamDetail: function(req, res) {
    Teamdetail.findOne({
      team: req.body.id
    })
      .deepPopulate("team categoryValues.player categoryValues.player.category")
      .exec(res.callback);
  },

  allDelete: function(req, res) {
    if (req.body) {
      Teamdetail.allDelete(req.body, res.callback);
    } else {
      res.json({
        data: "File Not Found",
        value: false
      });
    }
  },

  getlist: function(req, res) {
    Teamdetail.find()
      .deepPopulate("team categoryValues.category")
      .exec(res.callback);
  }
};
module.exports = _.assign(module.exports, controller);
