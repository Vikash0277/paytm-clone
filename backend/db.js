import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import {z} from 'zod';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error : ${error.message}`);
    }
}


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    }
    
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);



export  {connectDB, User, Account};