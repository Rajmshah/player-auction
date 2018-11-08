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
        'minimumBaseValue.category': {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Teamdetail', schema, 'team minimumBaseValue.category', 'team minimumBaseValue.category');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);