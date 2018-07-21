var Schema = {};

// ra.0721 3. database schema change
Schema.createSchema = function (mongoose) {
    var UserSchema = mongoose.Schema({
        email: { type: String, 'default': '' },
        name: { type: String, 'default': '' },
        password: { type: String, required: true, 'default': '' }
    });

    // check email value for null
    UserSchema.path('email').validate(function (email) {
        return email.length;
    }, 'no email value');

    UserSchema.path('password').validate(function (password) {
        return password.length;
    }, 'no email value');

    // declare static function
    UserSchema.static('findByEmail', function (email, callback) {
        return this.find({ email: email }, callback);
    });

    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });
    return UserSchema;
}

module.exports = Schema;