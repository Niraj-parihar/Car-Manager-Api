const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
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
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hiding unwanted data using toJSON method
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.user_password;
  delete userObject.tokens;

  return userObject;
};

//methods are accessible on Users's Instances
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisiscarapi");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//model methods
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
    user.user_password = await bcrypt.hash(user.user_password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
