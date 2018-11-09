var schema = new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Teamlist'
    },
    logo: {
        type: String
    },
    banner: {
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
    categoryValues: [{
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Categorylist'
        },
        baseValue: {
            type: Number
        },
        status: {
            type: Boolean
        }
    }],
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
        'team': {
            select: ''
        },
        'categoryValues.category': {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Teamdetail', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "team categoryValues.category",
    "team categoryValues.category"));
var model = {
    allDelete: function (data, callback) {
        var categoryClone = _.cloneDeep(data.team.categoryValues);
        var saveTeam = {};
        var saveCategory = {};
        var temp = [];
        var temp1 = [];
        async.waterfall([
            function (callback) {
                Categorydetail.deleteData({
                    _id: data.category._id
                }, function (err, deleted) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(deleted)) {
                        callback(null, []);
                    } else if (deleted) {
                        saveCategory.playerName = data.category.playerName;
                        saveCategory.playerAge = data.category.playerAge;
                        saveCategory.playerImage = data.category.playerImage;
                        saveCategory.playerVillage = data.category.playerVillage;
                        saveCategory.category = data.category.category._id;
                        saveCategory.baseValue = data.category.baseValue;
                        Categorydetail.saveData(saveCategory, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, data);
                            }
                        })
                    }
                })
            },
            function (secondFunction, callback) {
                console.log(secondFunction);
                console.log('CATEGORY', data.category);
                console.log('TEAM', data.team);
                saveTeam._id = data.team._id;
                saveTeam.minimumBaseValue = 0;
                saveTeam.moneySpent = data.team.moneySpent - data.category.soldValue;
                saveTeam.categoryValues = [];
                var i = 0;
                _.each(categoryClone, function (vals) {
                    if (vals.status) {
                        vals.order = i;
                        i++;
                    }
                });
                var j = i - 1
                _.each(categoryClone, function (val) {
                    if (val.order == j) {
                        saveTeam.categoryValues.push({
                            'category': val.category,
                            'baseValue': val.baseValue
                        })
                    } else {
                        saveTeam.categoryValues.push(val)
                    }
                });
                _.each(saveTeam.categoryValues, function (n) {
                    saveTeam.minimumBaseValue = saveTeam.minimumBaseValue + n.baseValue
                })
                saveTeam.maxBidValue = data.team.purseValue - saveTeam.moneySpent - saveTeam.minimumBaseValue;
                console.log('SAVE TEAM', saveTeam);
                Teamdetail.update({
                    _id: data.team._id
                }, saveTeam).exec(
                    function (err, match) {
                        console.log("updated", match);
                    });
            }
        ], function (err, result) {
            callback(null, result);
        });

    }
};
module.exports = _.assign(module.exports, exports, model);