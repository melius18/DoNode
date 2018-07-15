var Schema = {};

Schema.createSchema = function (mongoose) {
    var UserSchema = mongoose.Schema({
        id: String,
        name: String,
        password: String
    });

    UserSchema.static('findAll', function(callback) {
		return this.find({}, callback);
    });
    
    return UserSchema;
}

module.exports = Schema;