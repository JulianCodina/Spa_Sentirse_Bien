import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    service: {
        type: String,
        trim: true,
        require: true
    },
    treatment: {
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
        required: true,
    },
    info: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
},    {
    timestamps: true
})

export default mongoose.model('Booking', bookingSchema)