const mongoose = require("mongoose");
const validator = require("validator");
const SoldVehicle = require("./soldvehicles");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    user_password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password');
        }
      },
    },
    user_location: {
      type: String,
      trim: true,
      required: true,
    },
    user_info: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    vehicle_info: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoldVehicle",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByCredentials = async (user_email, user_password) => {
  const user = await User.findOne({ user_email });

  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(user_password, user.user_password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("user_password")) {
    user.user_password= await bcrypt.hash(user.user_password, 8);
  }

  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
