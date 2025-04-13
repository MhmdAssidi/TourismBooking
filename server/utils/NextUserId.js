const User = require('../models/User');

async function getNextUserId() {
  const lastUser = await User.findOne().sort({ userId: -1 });

  if (lastUser && lastUser.userId) {
    return lastUser.userId + 1;
  } else {
    return 1;
  }
}

module.exports = getNextUserId;
