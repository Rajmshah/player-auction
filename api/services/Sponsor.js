var schema = new Schema({
    name: {
        type: String
    },
    ownerName: {
        type: String
    },
    sponsorType: {
        type: String
    },
    logo: {
        type: String
    },
    link: {
        type: String
    },
    order: {
        type: Number
    },
    active: {
        type: Boolean
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Sponsor', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);