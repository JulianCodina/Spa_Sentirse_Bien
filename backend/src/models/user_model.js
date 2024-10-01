import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    names: {
        type: String,
    },
    surnames: {
        type: String,
    },
    profilepic: {
       // type: ImageBitmap
    },
    sex: {
        type: Boolean,
    },
    rol: {
        type: String,
        required: true,
        default: "user",
    }

},    {
    timestamps: true
})

export default model('User', userSchema)