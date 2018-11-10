module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getlist: function (req, res) {
        Teamlist.find().exec(res.callback);
    }
};
module.exports = _.assign(module.exports, controller);