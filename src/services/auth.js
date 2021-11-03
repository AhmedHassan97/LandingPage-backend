const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async ({ userName, password }) => {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, userName: user.userName },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  createUser: async (args) => {
    const existingUser = await User.findOne({
      userName: args.userInput.userName,
    });
    if (existingUser) {
      throw new Error("User exists already.");
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const user = new User({
      userName: args.userInput.userName,
      password: hashedPassword,
    });
    try {
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
