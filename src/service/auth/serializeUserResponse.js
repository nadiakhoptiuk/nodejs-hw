function serializeUserResponse(user) {
  return {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };
}

function serializeUserSignIn(user) {
  return {
    user: serializeUserResponse(user),
    token: user.token,
  };
}

function serializeCurrentUser(user) {
  return {
    email: user.email,
    subscription: user.subscription,
  };
}

module.exports = {
  serializeUserResponse,
  serializeUserSignIn,
  serializeCurrentUser,
};
