import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
});
const User = mongoose.model('User', userSchema);
export default User; // Ensure you are exporting the model as default
