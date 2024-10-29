import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    friends: string[];
    thoughts: string[];
}

const userSchema = new Schema<IUser>({
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

const User = mongoose.model<IUser>('User', userSchema);
export default User; // Ensure you are exporting the model as default
