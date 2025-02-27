const User = require('../service/schemas/user.js');

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const addToken = async (id, token) =>
  await User.findByIdAndUpdate(id, { token });

const logOut = async (id) => await User.findByIdAndUpdate(id, { token: null });

const updateSubscription = async (id, body) =>
  User.findByIdAndUpdate(id, { subscription: body }, { new: true });

const updateAvatar = async (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });

const verifyToken = (verificationToken) =>
  User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

module.exports = {
  findUserByEmail,
  addToken,
  logOut,
  updateSubscription,
  updateAvatar,
  verifyToken,
};
