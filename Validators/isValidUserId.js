const isValidUserId = async (userId) => {
  const userIdInt = parseInt(userId);

  if (!Number.isInteger(userIdInt) || !userIdInt > 0) {
    throw Error("userId should be more than 0 and should be integer only");
  }
};

module.exports = isValidUserId;
