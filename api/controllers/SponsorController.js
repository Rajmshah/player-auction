module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getlist: function(req, res) {
    Sponsor.find({ active: true })
      .sort({ order: 1 })
      .exec(res.callback);
  }
};
module.exports = _.assign(module.exports, controller);
