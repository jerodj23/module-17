import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: mongoose.Types.ObjectId[];
    friends: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/, // Simple email validation
    },
    thoughts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
});

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

// Export the User model
export default User;
