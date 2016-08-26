const mongoose = require('mongoose');
const category  = require('./category');
var schema =  mongoose.Schema;



var assetsSchema = new schema({

   name : {
       type : String,
       required : true
   },

    description : {
        type : String,
        required : true
    },

    serial_no :{
        type : String,
        required : true,
        unique : true
    },
    price : Number,

    andela_serial_no : {
        type : String,
        required : true,
        unique : true
    },

    category : String,

    date_bought : Date,

    created_at : Date,

    updated_at :  Date

});

assetsSchema.pre('save', function (next) {
    var currentDate = Date();

    this.updated_at = currentDate;

    if(!this.created_at){
        this.created_at = currentDate;
    }
    next()
});
module.exports = mongoose.model('assets', assetsSchema);
module.exports.assetsSchema = assetsSchema;

