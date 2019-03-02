module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getBannerByPageName: function(req, res) {
    Banner.find(req.body).exec(res.callback);
  }
};
module.exports = _.assign(module.exports, controller);
