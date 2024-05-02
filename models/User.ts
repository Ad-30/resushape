import { model, Schema, models, Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    image: string;
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    image: {
        type: String
    },
});

const User = models.User || model("User", userSchema);

export default User;
