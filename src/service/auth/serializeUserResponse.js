function serializeUserResponse(user) {
  console.log(user);

  return {
    id: user._id.toString(),
    email: user.email,
    subscription: user.subscription,
  };
}

module.exports = { serializeUserResponse };
