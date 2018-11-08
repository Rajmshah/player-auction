var schema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorylist'
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
        type: Boolean
    },
    soldValue: {
        type: Number
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Teamlist'
    },
    remarks: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Categorydetail', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);