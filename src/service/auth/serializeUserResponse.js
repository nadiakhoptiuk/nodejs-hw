function serializeUserResponse(user) {
  return {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };
}

function serializeUserSignIn(user, token) {
  return {
    user: serializeUserResponse(user),
    token,
  };
}

function serializeCurrentUser(user, token) {
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
