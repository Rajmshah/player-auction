var schema = new Schema({
  banner: {
    type: String
  },
  isWhole: {
    type: Boolean
  },
  pageName: {
    type: String,
    enum: ["Sponsor", "About"]
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Banner", schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
