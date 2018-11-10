module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    uploadExcel: function (req, res) {
        if (req.body.file) {
            Config.importGS(req.body.file, function (err, importData) {
                if (err || _.isEmpty(importData)) {
                    res.json({
                        data: err,
                        value: false
                    });
                } else {
                    Categorydetail.uploadExcel(importData, res.callback);
                }
            });
        } else {
            res.json({
                data: "File Not Found",
                value: false
            });
        }
    },

    generateExcel: function (req, res) {
        Categorydetail.generateExcel(req.query, res);
    },

    getPlayers: function (req, res) {
        Categorydetail.find({
            category: req.body.id,
            isSold: false
        }).deepPopulate('team category').exec(res.callback);
    },

    getAllPlayers: function (req, res) {
        Categorydetail.find({
            isSold: true
        }).deepPopulate('team category').exec(res.callback);
    },

    getTeamPlayers: function (req, res) {
        Categorydetail.find({
            team: req.body.id
        }).deepPopulate('team category').exec(res.callback);
    },

    getlist: function (req, res) {
        Categorydetail.find().deepPopulate('team category').exec(res.callback);
    }
};
module.exports = _.assign(module.exports, controller);