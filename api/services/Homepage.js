var schema = new Schema({
    logo: {
        type: String
    },
    banner: [{
        image: String,
        title: String,
        link: String,
        linkType: String,
        active: Boolean
    }],
    media: [{
        mediaType: String,
        image: String,
        title: String,
        link: String,
        linkType: String,
        active: Boolean
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Homepage', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);