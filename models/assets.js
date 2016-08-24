const moongoose = require('mongoose');
const category  = require('./category')
var schema =  moongoose.Schema;

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
        required : true
    },

    andela_serial_no : {
        type : String,
        required : true
    },

    belongsTo : category.categorySchema,

    date_bought : Date,

    created_at : {
        type : Date,
        default : Date().now

    },

    updated_at : {
        type : Date,
        set : function () {
            this.updated_at =  Date().now;
            return this
        }
    }

});

module.exports = moongoose.model('assets', assetsSchema);

