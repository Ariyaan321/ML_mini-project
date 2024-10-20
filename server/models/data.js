const mongoose = require('mongoose')
const { Schema } = mongoose;

const dataSchema = new Schema(
    {
        Lat: {
            type: Number,
            required: true
        },
        Lng: {
            type: Number,
            required: true
        },
        Type: {
            type: String,
            required: true
        },
        Bhk: {
            type: Number,
            required: true
        },
        Sqft: {
            type: Number,
            required: true
        },
    },
    {
        versionKey: false,
    }
)

const Data = mongoose.model('data', dataSchema)
module.exports = Data