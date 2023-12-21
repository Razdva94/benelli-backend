const { Schema, model } = require('mongoose');

const bannerSchema = new Schema(
  {
    bannerLinks: {
      type: Array,
    },
  },
  { versionKey: false },
);

const BannerModel = model('Banner', bannerSchema);

module.exports = BannerModel;
