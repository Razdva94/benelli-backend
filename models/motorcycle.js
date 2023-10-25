const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const motoSchema = new Schema(
  {
    motoName: {
      type: String,
      required: true,
    },
    motoPrice: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
      validate: [isURL, 'Неверный формат URL постера'],
    },
    motoPerformance: {
      mass: {
        type: String,
        required: true,
      },
      sizes: {
        type: String,
        required: true,
      },
      wheel: {
        type: String,
        required: true,
      },
      seatHeight: {
        type: String,
        required: true,
      },
      gazValue: {
        type: String,
        required: true,
      },
      operatedValue: {
        type: String,
        required: true,
      },
      compressionRation: {
        type: String,
        required: true,
      },
      power: {
        type: String,
        required: true,
      },
      torque: {
        type: String,
        required: true,
      },
    },
    description: {
      type: Array,
    },
    catalog: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false },
);

const MotoModel = model('Moto', motoSchema);

module.exports = MotoModel;
