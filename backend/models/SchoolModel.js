const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema(
    {
        costCoreProgram: {
            type: Number
        },
        costEarlyMorning: {
            type:Number
        },
        costExtendedDay: {
            type:Number
        },
        costLateDay: {
            type:Number
        },
        squareFootageInfants: {
            type:Number,
        },
        squareFootageToddlers: {
            type:Number
        },
        squareFootageCrawlers: {
            type:Number
        },
        squareFootageTwos: {
            type:Number
        },
        squareFootageCrib: {
            type:Number
        },
        squareFootageNoCrib: {
            type:Number
        },
        oneTo3SnackVegFruit: {
            type:Number
        },
        oneTo3SnackMilk: {
            type:Number
        },
        oneTo3SnackProtein: {
            type:Number
        },
        oneTo3SnackGrains: {
            type:Number
        },
        ratioBirthToTwo: {
            type:Number
        },
        ratioTwoToThree: {
            type:Number
        },
        kidsPerEmergencyCrib: {
            type: Number
        },
    }
)

module.exports = mongoose.model("School", schoolSchema);
