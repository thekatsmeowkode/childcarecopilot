const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema(
    {
        classroomCount: {
            type: Number,
            required:true
        },
        costCoreProgram: {
            type: Number,
            required:true
        },
        costEarlyMorning: {
            type:Number,
            required:true
        },
        costExtendedDay: {
            type:Number,
            required:true
        },
        costLateDay: {
            type:Number,
            required:true
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
        totalSquareFootageSchool: {
            type:Number
        },
        squareFootageCrib: {
            type:Number
        },
        squareFootageNoCrib: {
            type:Number
        },
        numberBathrooms: {
            type:Number
        },
        oneToThreeYearSnack: {
            type:Object,
            required:true
        },
        oneToThreeYearSnack: {
            milk:Number,
            vegFruit: Number,
            grain: Number,
            protein: Number
        },
        oneToThreeYearLunch: {
            type:Object,
            required:true
        },
        oneToThreeYearLunch: {
            milk:Number,
            veg:Number,
            fruit:Number,
            grain:Number,
            protein:Number
        },
        ratioBirthToTwo: {
            type:Number,
            required:true
        },
        ratioTwotoThree: {
            type:Number,
            required:true
        },
        kidsPerEmergencyCrib: {
            type: Number,
            required:true
        },
    }
)

module.exports = mongoose.model("School", schoolSchema);
