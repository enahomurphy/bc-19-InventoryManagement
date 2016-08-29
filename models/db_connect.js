

module.exports = function (mongoose, db_name) {
    mongoose.connect("mongodb://127.0.0.1:27017/"+ db_name);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "error could not connect"));
    db.once('open', function () {
        console.log("we are connected " + db_name)
    });

};
