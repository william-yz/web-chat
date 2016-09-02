
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('User', UserSchema);
